import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Equipment {
  id: string;
  name: string;
  powerType: 'eletrico' | 'gas';
  powerValue: number;
  gasConsumptionLow?: number;
  gasConsumptionMedium?: number;
  gasConsumptionHigh?: number;
  icon: string;
  costPerHour: number;
}

interface EquipmentContextType {
  equipment: Equipment[];
  loading: boolean;
  addEquipment: (equipment: Omit<Equipment, 'id' | 'costPerHour'>) => Promise<void>;
  updateEquipment: (id: string, updates: Partial<Equipment>) => Promise<void>;
  removeEquipment: (id: string) => Promise<void>;
  getEquipmentById: (id: string) => Equipment | undefined;
}

const EquipmentContext = createContext<EquipmentContextType | undefined>(undefined);

export const useEquipment = () => {
  const context = useContext(EquipmentContext);
  if (!context) {
    throw new Error('useEquipment must be used within an EquipmentProvider');
  }
  return context;
};

interface EquipmentProviderProps {
  children: ReactNode;
}

export const EquipmentProvider: React.FC<EquipmentProviderProps> = ({ children }) => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEquipment = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('[EquipmentContext] Erro ao buscar equipamentos:', error);
        throw new Error(`Erro ao buscar equipamentos: ${error.message}`);
      }
      
      if (data) {
        const formattedEquipment: Equipment[] = data.map(item => ({
          id: item.id,
          name: item.name,
          powerType: item.power_type as 'eletrico' | 'gas',
          powerValue: Number(item.power_value || 0),
          gasConsumptionLow: item.gas_consumption_low ? Number(item.gas_consumption_low) : undefined,
          gasConsumptionMedium: item.gas_consumption_medium ? Number(item.gas_consumption_medium) : undefined,
          gasConsumptionHigh: item.gas_consumption_high ? Number(item.gas_consumption_high) : undefined,
          icon: 'kitchen',
          costPerHour: Number(item.cost_per_hour || 0)
        }));
        setEquipment(formattedEquipment);
      }
    } catch (error: any) {
      console.error('[EquipmentContext] Erro crítico ao buscar equipamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  const calculateCostPerHour = (item: Omit<Equipment, 'id' | 'costPerHour'> | Partial<Equipment>): number => {
    if (item.powerType === 'eletrico') {
      const energyCostPerKWh = 0.80;
      const powerInKW = (item.powerValue || 0) / 1000;
      return powerInKW * energyCostPerKWh;
    }
    
    const gasPricePerKg = 120 / 13;
    const mediumCons = item.gasConsumptionMedium || 0;
    return mediumCons * gasPricePerKg;
  };

  const addEquipment = async (newEquipment: Omit<Equipment, 'id' | 'costPerHour'>) => {
    try {
      console.log('[EquipmentContext] Adicionando equipamento:', newEquipment);
      
      const costPerHour = calculateCostPerHour(newEquipment);
      
      const insertData = {
        name: newEquipment.name,
        power_type: newEquipment.powerType,
        power_value: newEquipment.powerValue || null,
        gas_consumption_low: newEquipment.gasConsumptionLow || null,
        gas_consumption_medium: newEquipment.gasConsumptionMedium || null,
        gas_consumption_high: newEquipment.gasConsumptionHigh || null,
        cost_per_hour: costPerHour
      };

      console.log('[EquipmentContext] Dados a inserir:', insertData);

      const { data, error } = await supabase
        .from('equipment')
        .insert([insertData])
        .select()
        .single();

      if (error) {
        console.error('[EquipmentContext] Erro do Supabase ao inserir:', error);
        throw new Error(`Erro ao adicionar equipamento: ${error.message}`);
      }

      console.log('[EquipmentContext] Equipamento adicionado com sucesso:', data);
      await fetchEquipment();
    } catch (error: any) {
      console.error('[EquipmentContext] Erro ao adicionar equipamento:', error);
      throw new Error(error.message || 'Erro desconhecido ao adicionar equipamento');
    }
  };

  const updateEquipment = async (id: string, updates: Partial<Equipment>) => {
    try {
      console.log('[EquipmentContext] Atualizando equipamento:', id, updates);
      
      const currentItem = equipment.find(e => e.id === id);
      if (!currentItem) {
        throw new Error('Equipamento não encontrado');
      }

      const updatedItem = { ...currentItem, ...updates };
      const costPerHour = calculateCostPerHour(updatedItem);

      const updateData: any = {};
      if (updates.name !== undefined) updateData.name = updates.name;
      if (updates.powerType !== undefined) updateData.power_type = updates.powerType;
      if (updates.powerValue !== undefined) updateData.power_value = updates.powerValue || null;
      if (updates.gasConsumptionLow !== undefined) updateData.gas_consumption_low = updates.gasConsumptionLow || null;
      if (updates.gasConsumptionMedium !== undefined) updateData.gas_consumption_medium = updates.gasConsumptionMedium || null;
      if (updates.gasConsumptionHigh !== undefined) updateData.gas_consumption_high = updates.gasConsumptionHigh || null;
      updateData.cost_per_hour = costPerHour;

      console.log('[EquipmentContext] Dados a atualizar:', updateData);

      const { error } = await supabase
        .from('equipment')
        .update(updateData)
        .eq('id', id);

      if (error) {
        console.error('[EquipmentContext] Erro do Supabase ao atualizar:', error);
        throw new Error(`Erro ao atualizar equipamento: ${error.message}`);
      }

      console.log('[EquipmentContext] Equipamento atualizado com sucesso');
      await fetchEquipment();
    } catch (error: any) {
      console.error('[EquipmentContext] Erro ao atualizar equipamento:', error);
      throw new Error(error.message || 'Erro desconhecido ao atualizar equipamento');
    }
  };

  const removeEquipment = async (id: string) => {
    try {
      console.log('[EquipmentContext] Removendo equipamento:', id);
      
      const { error } = await supabase
        .from('equipment')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('[EquipmentContext] Erro do Supabase ao remover:', error);
        throw new Error(`Erro ao remover equipamento: ${error.message}`);
      }

      console.log('[EquipmentContext] Equipamento removido com sucesso');
      await fetchEquipment();
    } catch (error: any) {
      console.error('[EquipmentContext] Erro ao remover equipamento:', error);
      throw new Error(error.message || 'Erro desconhecido ao remover equipamento');
    }
  };

  const getEquipmentById = (id: string) => {
    return equipment.find(item => item.id === id);
  };

  return (
    <EquipmentContext.Provider value={{
      equipment,
      loading,
      addEquipment,
      updateEquipment,
      removeEquipment,
      getEquipmentById
    }}>
      {children}
    </EquipmentContext.Provider>
  );
};