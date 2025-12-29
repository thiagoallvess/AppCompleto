import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Promotion {
  id: string;
  name: string;
  code: string;
  type: 'percentage' | 'fixed' | 'shipping';
  value: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  maxUses?: number;
  currentUses: number;
  minOrderValue?: number;
  applicableProducts?: string[];
  description: string;
  createdAt: string;
}

interface PromotionsContextType {
  promotions: Promotion[];
  addPromotion: (promotion: Omit<Promotion, 'id' | 'currentUses' | 'createdAt'>) => void;
  updatePromotion: (id: string, updates: Partial<Promotion>) => void;
  removePromotion: (id: string) => void;
  getPromotionByCode: (code: string) => Promotion | undefined;
  validateCoupon: (code: string, orderValue: number) => { valid: boolean; discount: number; promotion?: Promotion };
  incrementUsage: (id: string) => void;
}

const PromotionsContext = createContext<PromotionsContextType | undefined>(undefined);

export const usePromotions = () => {
  const context = useContext(PromotionsContext);
  if (!context) {
    throw new Error('usePromotions must be used within a PromotionsProvider');
  }
  return context;
};

interface PromotionsProviderProps {
  children: ReactNode;
}

export const PromotionsProvider: React.FC<PromotionsProviderProps> = ({ children }) => {
  const [promotions, setPromotions] = useState<Promotion[]>(() => {
    const saved = localStorage.getItem('promotions');
    if (saved) return JSON.parse(saved);
    
    // Default promotions
    return [
      {
        id: '1',
        name: 'Verão 2024',
        code: 'VERAO2024',
        type: 'percentage',
        value: 20,
        startDate: '2024-01-01',
        endDate: '2024-12-30',
        isActive: true,
        currentUses: 42,
        description: '20% off em todos os produtos',
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        name: 'Cliente VIP',
        code: 'CLIENTEVIP',
        type: 'fixed',
        value: 10,
        startDate: '2024-01-01',
        endDate: '2024-11-15',
        isActive: true,
        currentUses: 156,
        description: 'R$ 10,00 off na primeira compra',
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '3',
        name: 'Frete Grátis',
        code: 'ENTREGAFREE',
        type: 'shipping',
        value: 50,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        isActive: true,
        currentUses: 89,
        minOrderValue: 50,
        description: 'Frete grátis acima de R$50',
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '4',
        name: 'Flash 20%',
        code: 'FLASH20',
        type: 'percentage',
        value: 20,
        startDate: '2024-09-01',
        endDate: '2024-10-01',
        isActive: false,
        currentUses: 12,
        description: '20% off relâmpago',
        createdAt: '2024-09-01T00:00:00Z'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('promotions', JSON.stringify(promotions));
  }, [promotions]);

  const addPromotion = (promotion: Omit<Promotion, 'id' | 'currentUses' | 'createdAt'>) => {
    const newPromotion: Promotion = {
      ...promotion,
      id: Date.now().toString(),
      currentUses: 0,
      createdAt: new Date().toISOString()
    };
    setPromotions(prev => [newPromotion, ...prev]);
  };

  const updatePromotion = (id: string, updates: Partial<Promotion>) => {
    setPromotions(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const removePromotion = (id: string) => {
    setPromotions(prev => prev.filter(p => p.id !== id));
  };

  const getPromotionByCode = (code: string) => {
    return promotions.find(p => p.code.toUpperCase() === code.toUpperCase() && p.isActive);
  };

  const validateCoupon = (code: string, orderValue: number) => {
    const promotion = getPromotionByCode(code);
    if (!promotion) {
      return { valid: false, discount: 0 };
    }

    const now = new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);

    if (now < startDate || now > endDate) {
      return { valid: false, discount: 0 };
    }

    if (promotion.maxUses && promotion.currentUses >= promotion.maxUses) {
      return { valid: false, discount: 0 };
    }

    if (promotion.minOrderValue && orderValue < promotion.minOrderValue) {
      return { valid: false, discount: 0 };
    }

    let discount = 0;
    if (promotion.type === 'percentage') {
      discount = (orderValue * promotion.value) / 100;
    } else if (promotion.type === 'fixed') {
      discount = Math.min(promotion.value, orderValue);
    } else if (promotion.type === 'shipping') {
      discount = promotion.value; // Fixed shipping discount
    }

    return { valid: true, discount, promotion };
  };

  const incrementUsage = (id: string) => {
    setPromotions(prev => prev.map(p => 
      p.id === id ? { ...p, currentUses: p.currentUses + 1 } : p
    ));
  };

  return (
    <PromotionsContext.Provider value={{
      promotions,
      addPromotion,
      updatePromotion,
      removePromotion,
      getPromotionByCode,
      validateCoupon,
      incrementUsage
    }}>
      {children}
    </PromotionsContext.Provider>
  );
};