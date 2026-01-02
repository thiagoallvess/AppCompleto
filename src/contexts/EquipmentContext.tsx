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
        console.error('Erro ao buscar equipamentos:', error);
      } else if (data) {
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
    } catch (error) {
      console.error('Erro ao buscar equipamentos:', error);
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
      const costPerHour = calculateCostPerHour(newEquipment);
      
      const { data, error } = await supabase
        .from('equipment')
        .insert([{
          name: newEquipment.name,
          power_type: newEquipment.powerType,
          power_value: newEquipment.powerValue,
          gas_consumption_low: newEquipment.gasConsumptionLow,
          gas_consumption_medium: newEquipment.gasConsumptionMedium,
          gas_consumption_high: newEquipment.gasConsumptionHigh,
          cost_per_hour: costPerHour
        }])
        .select()
        .single();

      if (error) throw error;
      await fetchEquipment();
    } catch (error: any) {
      console.error('Erro ao adicionar equipamento:', error);
      throw error;
    }
  };

  const updateEquipment = async (id: string, updates: Partial<Equipment>) => {
    try {
      const currentItem = equipment.find(e => e.id === id);
      if (!currentItem) return;

      const updatedItem = { ...currentItem, ...updates };
      const costPerHour = calculateCostPerHour(updatedItem);

      const updateData: any = {};
      if (updates.name !== undefined) updateData.name = updates.name;
      if (updates.powerType !== undefined) updateData.power_type = updates.powerType;
      if (updates.powerValue !== undefined) updateData.power_value = updates.powerValue;
      if (updates.gasConsumptionLow !== undefined) updateData.gas_consumption_low = updates.gasConsumptionLow;
      if (updates.gasConsumptionMedium !== undefined) updateData.gas_consumption_medium = updates.gasConsumptionMedium;
      if (updates.gasConsumptionHigh !== undefined) updateData.gas_consumption_high = updates.gasConsumptionHigh;
      updateData.cost_per_hour = costPerHour;

      const { error } = await supabase
        .from('equipment')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      await fetchEquipment();
    } catch (error: any) {
      console.error('Erro ao atualizar equipamento:', error);
      throw error;
    }
  };

  const removeEquipment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('equipment')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchEquipment();
    } catch (error: any) {
      console.error('Erro ao remover equipamento:', error);
      throw error;
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