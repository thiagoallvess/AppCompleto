import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Marketplace {
  id: string;
  name: string;
  commissionRate: number; // Percentual
}

interface MarketplacesContextType {
  marketplaces: Marketplace[];
  addMarketplace: (marketplace: Omit<Marketplace, 'id'>) => void;
  updateMarketplace: (id: string, updates: Partial<Marketplace>) => void;
  removeMarketplace: (id: string) => void;
  getMarketplaceById: (id: string) => Marketplace | undefined;
}

const MarketplacesContext = createContext<MarketplacesContextType | undefined>(undefined);

export const useMarketplaces = () => {
  const context = useContext(MarketplacesContext);
  if (!context) {
    throw new Error('useMarketplaces must be used within a MarketplacesProvider');
  }
  return context;
};

interface MarketplacesProviderProps {
  children: ReactNode;
}

export const MarketplacesProvider: React.FC<MarketplacesProviderProps> = ({ children }) => {
  const [marketplaces, setMarketplaces] = useState<Marketplace[]>(() => {
    const saved = localStorage.getItem('marketplaces');
    if (saved) return JSON.parse(saved);
    
    return [
      {
        id: '1',
        name: 'Mercado Livre',
        commissionRate: 12.5
      },
      {
        id: '2',
        name: 'Shopee',
        commissionRate: 15.0
      },
      {
        id: '3',
        name: 'Amazon',
        commissionRate: 10.0
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('marketplaces', JSON.stringify(marketplaces));
  }, [marketplaces]);

  const addMarketplace = (marketplace: Omit<Marketplace, 'id'>) => {
    const newMarketplace = { ...marketplace, id: Date.now().toString() };
    setMarketplaces(prev => [...prev, newMarketplace]);
  };

  const updateMarketplace = (id: string, updates: Partial<Marketplace>) => {
    setMarketplaces(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const removeMarketplace = (id: string) => {
    setMarketplaces(prev => prev.filter(m => m.id !== id));
  };

  const getMarketplaceById = (id: string) => {
    return marketplaces.find(m => m.id === id);
  };

  return (
    <MarketplacesContext.Provider value={{
      marketplaces,
      addMarketplace,
      updateMarketplace,
      removeMarketplace,
      getMarketplaceById
    }}>
      {children}
    </MarketplacesContext.Provider>
  );
};