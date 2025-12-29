"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface OperationalConfig {
  gasPrice: number;
  energyCost: number;
  laborCost: number;
  cashbackPercent: number;
}

interface OperationalConfigContextType {
  config: OperationalConfig;
  updateConfig: (updates: Partial<OperationalConfig>) => void;
}

const OperationalConfigContext = createContext<OperationalConfigContextType | undefined>(undefined);

export const useOperationalConfig = () => {
  const context = useContext(OperationalConfigContext);
  if (!context) {
    throw new Error('useOperationalConfig must be used within a OperationalConfigProvider');
  }
  return context;
};

interface OperationalConfigProviderProps {
  children: ReactNode;
}

export const OperationalConfigProvider: React.FC<OperationalConfigProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<OperationalConfig>(() => {
    const saved = localStorage.getItem('operationalConfig');
    if (saved) return JSON.parse(saved);
    
    return {
      gasPrice: 120,
      energyCost: 0.8,
      laborCost: 30,
      cashbackPercent: 3
    };
  });

  useEffect(() => {
    localStorage.setItem('operationalConfig', JSON.stringify(config));
  }, [config]);

  const updateConfig = (updates: Partial<OperationalConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  return (
    <OperationalConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </OperationalConfigContext.Provider>
  );
};