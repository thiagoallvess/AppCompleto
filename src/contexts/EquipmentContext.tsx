import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Equipment {
  id: string;
  name: string;
  powerType: 'eletrico' | 'gas';
  powerValue: number; // Watts for electric
  gasConsumptionLow?: number; // kg/h
  gasConsumptionMedium?: number; // kg/h
  gasConsumptionHigh?: number; // kg/h
  icon: string; // Material Symbols icon name
  costPerHour: number; // Calculated cost per hour based on admin settings
}

interface EquipmentContextType {
  equipment: Equipment[];
  addEquipment: (equipment: Omit<Equipment, 'id' | 'costPerHour'>) => void;
  updateEquipment: (id: string, updates: Partial<Equipment>) => void;
  removeEquipment: (id: string) => void;
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

  useEffect(() => {
    const loadEquipmentData = () => {
      try {
        const storedEquipment = localStorage.getItem('equipment');
        if (storedEquipment) {
          setEquipment(JSON.parse(storedEquipment));
        } else {
          setEquipment([]);
        }
      } catch (error) {
        console.error('Error loading equipment data:', error);
        setEquipment([]);
      }
    };
    loadEquipmentData();
  }, []);

  useEffect(() => {
    localStorage.setItem('equipment', JSON.stringify(equipment));
  }, [equipment]);

  const calculateCostPerHour = (item: Omit<Equipment, 'id' | 'costPerHour'> | Partial<Equipment>): number => {
    if (item.powerType === 'eletrico') {
      const energyCostPerKWh = 0.80;
      const powerInKW = (item.powerValue || 0) / 1000;
      return powerInKW * energyCostPerKWh;
    }
    
    // Para gás, usamos o consumo médio como base para o custo/h padrão
    // Preço do botijão (13kg) = R$ 120,00 -> R$ 9,23 por kg
    const gasPricePerKg = 120 / 13;
    const mediumCons = item.gasConsumptionMedium || 0;
    return mediumCons * gasPricePerKg;
  };

  const addEquipment = (newEquipment: Omit<Equipment, 'id' | 'costPerHour'>) => {
    const costPerHour = calculateCostPerHour(newEquipment);
    const equipmentToAdd: Equipment = {
      ...newEquipment,
      id: Date.now().toString(),
      costPerHour,
    };
    setEquipment(prev => [...prev, equipmentToAdd]);
  };

  const updateEquipment = (id: string, updates: Partial<Equipment>) => {
    setEquipment(prev => prev.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, ...updates };
        updatedItem.costPerHour = calculateCostPerHour(updatedItem);
        return updatedItem;
      }
      return item;
    }));
  };

  const removeEquipment = (id: string) => {
    setEquipment(prev => prev.filter(item => item.id !== id));
  };

  const getEquipmentById = (id: string) => {
    return equipment.find(item => item.id === id);
  };

  return (
    <EquipmentContext.Provider value={{
      equipment,
      addEquipment,
      updateEquipment,
      removeEquipment,
      getEquipmentById
    }}>
      {children}
    </EquipmentContext.Provider>
  );
};