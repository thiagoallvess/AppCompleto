import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const StockContext = createContext<StockContextType | undefined>(undefined);

const StockContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [packagingItems, setPackagingItems] = useState<PackagingItem[]>([]);

  const addIngredient = async (ingredient: Ingredient) => {
    try {
      const { data, error } = await supabase
        .from('ingredients')
        .insert([
          {
            name: ingredient.name,
            unit: ingredient.unit,
            quantity: ingredient.quantity,
            min_quantity: ingredient.minQuantity,
            unit_cost: ingredient.unitCost,
            category: ingredient.category,
            icon: ingredient.icon,
            status: ingredient.status
          }
        ]);

      if (error) throw error;
      if (data) setIngredients(prev => [ ...prev, ...(data as any) ]);
    } catch (error: any) {
      console.error("[StockContext] Erro ao adicionar ingrediente:", error);
    }
  };

  const addPackagingItem = async (packagingItem: PackagingItem) => {
    try {
      const { data, error } = await supabase
        .from('packaging')
        .insert([
          {
            name: packagingItem.name,
            unit: packagingItem.unit,
            quantity: packagingItem.quantity,
            min_quantity: packagingItem.minQuantity,
            unit_cost: packagingItem.unitCost,
            category: packagingItem.category,
            icon: packagingItem.icon,
            status: packagingItem.status
          }
        ]);

      if (error) throw error;
      if (data) setPackagingItems(prev => [ ...prev, ...(data as any) ]);
    } catch (error: any) {
      console.error("[StockContext] Erro ao adicionar item de embalagem:", error);
    }
  };

  const StockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <StockContext.Provider value={{ ingredients, packagingItems, addIngredient, addPackagingItem, }}>
        {children}
      </StockContext.Provider>
    );
  };

  export const useStock = () => useContext(StockContext);
  export default StockProvider;

  // ... add other hooks and methods if there