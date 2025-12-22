import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Equipment {
  id: string;
  name: string;
  powerType: 'eletrico' | 'gas';
  powerValue: number; // Watts for electric, or 0 for gas (since gas consumption is managed elsewhere)
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

  // Load data from localStorage on mount
  useEffect(() => {
    const loadEquipmentData = () => {
      try {
        const storedEquipment = localStorage.getItem('equipment');
        if (storedEquipment) {
          setEquipment(JSON.parse(storedEquipment));
        } else {
          // Start with an empty array if nothing is saved
          setEquipment([]);
        }
      } catch (error) {
        console.error('Error loading equipment data:', error);
        setEquipment([]);
      }
    };
    loadEquipmentData();
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (equipment.length >= 0) {
      localStorage.setItem('equipment', JSON.stringify(equipment));
    }
  }, [equipment]);

  // Helper function to calculate costPerHour (simplified mock logic)
  const calculateCostPerHour = (powerType: 'eletrico' | 'gas', powerValue: number): number => {
    // NOTE: In a real app, this would use settings from ConfiguracoesAdmin (energyCost, gasPrice, etc.)
    if (powerType === 'eletrico') {
      // Assuming energy cost is R$ 0.80/kWh (from ConfiguracoesAdmin mock)
      const energyCostPerKWh = 0.80;
      const powerInKW = powerValue / 1000;
      return powerInKW * energyCostPerKWh;
    }
    // Assuming gas cost is R$ 0.74/hour (from DetalhesReceita mock)
    return 0.74; 
  };

  const addEquipment = (newEquipment: Omit<Equipment, 'id' | 'costPerHour'>) => {
    const costPerHour = calculateCostPerHour(newEquipment.powerType, newEquipment.powerValue);
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
        // Recalculate cost if power type or value changes
        if (updates.powerType !== undefined || updates.powerValue !== undefined) {
          // Ensure powerValue is 0 if powerType is gas
          const finalPowerValue = updatedItem.powerType === 'gas' ? 0 : updatedItem.powerValue;
          updatedItem.powerValue = finalPowerValue;
          updatedItem.costPerHour = calculateCostPerHour(updatedItem.powerType, finalPowerValue);
        }
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