import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Ingredient {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  unitCost: number;
  minQuantity?: number;
  category: string;
  icon: string;
  status: string;
}

export interface PackagingItem {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  unitCost: number;
  minQuantity?: number;
  category: string;
  icon: string;
  status: string;
}

export interface StockMovement {
  id: string;
  item_id: string;
  item_type: 'ingredient' | 'packaging';
  quantity: number;
  cost_type: 'unitario' | 'pacote';
  cost_value: number;
  description?: string;
  date: string;
}

export interface StockMovementForDisplay extends StockMovement {
  itemName: string;
  itemUnit: string;
}

interface StockContextType {
  ingredients: Ingredient[];
  packagingItems: PackagingItem[];
  loading: boolean;
  addIngredient: (item: Omit<Ingredient, 'id'>) => Promise<void>;
  updateIngredient: (id: string, updates: Partial<Ingredient>) => Promise<void>;
  addPackagingItem: (item: Omit<PackagingItem, 'id'>) => Promise<void>;
  updatePackagingItem: (id: string, updates: Partial<PackagingItem>) => Promise<void>;
  addStockMovement: (movement: StockMovement) => Promise<void>;
  updateStockMovement: (id: string, movement: StockMovement) => Promise<void>;
  deleteStockMovement: (id: string) => Promise<void>;
  getStockMovementsForDisplay: () => StockMovementForDisplay[];
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export const StockProvider = ({ children }: { children: ReactNode }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [packagingItems, setPackagingItems] = useState<PackagingItem[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStock = async () => {
    setLoading(true);
    try {
      const { data: ingData } = await supabase.from('ingredients').select('*');
      const { data: packData } = await supabase.from('packaging').select('*');
      const { data: movData } = await supabase.from('stock_movements').select('*');

      if (ingData) setIngredients(ingData);
      if (packData) setPackagingItems(packData);
      if (movData) setMovements(movData);
    } catch (error) {
      console.error("Erro ao buscar estoque:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const addIngredient = async (item: Omit<Ingredient, 'id'>) => {
    const { error } = await supabase.from('ingredients').insert([item]);
    if (error) throw error;
    await fetchStock();
  };

  const updateIngredient = async (id: string, updates: Partial<Ingredient>) => {
    const { error } = await supabase.from('ingredients').update(updates).eq('id', id);
    if (error) throw error;
    await fetchStock();
  };

  const addPackagingItem = async (item: Omit<PackagingItem, 'id'>) => {
    const { error } = await supabase.from('packaging').insert([item]);
    if (error) throw error;
    await fetchStock();
  };

  const updatePackagingItem = async (id: string, updates: Partial<PackagingItem>) => {
    const { error } = await supabase.from('packaging').update(updates).eq('id', id);
    if (error) throw error;
    await fetchStock();
  };

  const addStockMovement = async (movement: StockMovement) => {
    const { error } = await supabase.from('stock_movements').insert([movement]);
    if (error) throw error;
    await fetchStock();
  };

  const updateStockMovement = async (id: string, movement: StockMovement) => {
    const { error } = await supabase.from('stock_movements').update(movement).eq('id', id);
    if (error) throw error;
    await fetchStock();
  };

  const deleteStockMovement = async (id: string) => {
    const { error } = await supabase.from('stock_movements').delete().eq('id', id);
    if (error) throw error;
    await fetchStock();
  };

  const getStockMovementsForDisplay = (): StockMovementForDisplay[] => {
    return movements.map(m => {
      const item = m.item_type === 'ingredient' 
        ? ingredients.find(i => i.id === m.item_id)
        : packagingItems.find(p => p.id === m.item_id);
      
      return {
        ...m,
        itemName: item?.name || 'Item removido',
        itemUnit: item?.unit || ''
      };
    });
  };

  return (
    <StockContext.Provider value={{ 
      ingredients, 
      packagingItems, 
      loading,
      addIngredient,
      updateIngredient,
      addPackagingItem,
      updatePackagingItem,
      addStockMovement,
      updateStockMovement,
      deleteStockMovement,
      getStockMovementsForDisplay
    }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) throw new Error('useStock must be used within a StockProvider');
  return context;
};

export default StockProvider;