import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const StockContext = createContext<StockContextType | undefined>(undefined);

const StockContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [packagingItems, setPackagingItems] = useState<PackagingItem[]>([]);

    // ... Your code for addIngredient, addPackagingItem, StockProvider, ...

    return (
        <StockContext.Provider value={{ ingredients, packagingItems, addIngredient, addPackagingItem, }}>
            {children}
        </StockContext.Provider>
    );
};

export const useStock = () => useContext(StockContext) as StockContextType;
export default StockContextProvider;