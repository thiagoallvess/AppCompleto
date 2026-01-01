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
  item_type: "ingredient" | "packaging";
  quantity: number;
  cost_type: "unitario" | "pacote";
  cost_value: number;
  description: string;
  date: string;
}

export interface StockMovementForDisplay extends StockMovement {
  itemName: string;
  itemUnit: string;
}

interface StockContextType {
  ingredients: Ingredient[];
  packagingItems: PackagingItem[];
  stockMovements: StockMovement[];
  loading: boolean;
  addIngredient: (ingredient: Omit<Ingredient, 'id'>) => Promise<void>;
  addPackagingItem: (packagingItem: Omit<PackagingItem, 'id'>) => Promise<void>;
  updateIngredient: (id: string, updates: Partial<Ingredient>) => Promise<void>;
  updatePackagingItem: (id: string, updates: Partial<PackagingItem>) => Promise<void>;
  removeIngredient: (id: string) => Promise<void>;
  removePackagingItem: (id: string) => Promise<void>;
  addStockMovement: (movement: Omit<StockMovement, 'id'>) => Promise<void>;
  updateStockMovement: (id: string, updates: Partial<StockMovement>) => Promise<void>;
  deleteStockMovement: (id: string) => Promise<void>;
  getStockMovementsForDisplay: () => StockMovementForDisplay[];
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
};

interface StockProviderProps {
  children: ReactNode;
}

export const StockProvider: React.FC<StockProviderProps> = ({ children }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [packagingItems, setPackagingItems] = useState<PackagingItem[]>([]);
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ingRes, packRes, movRes] = await Promise.all([
        supabase.from('ingredients').select('*').order('name'),
        supabase.from('packaging').select('*').order('name'),
        supabase.from('stock_movements').select('*').order('date', { ascending: false })
      ]);

      if (ingRes.data) {
        setIngredients(ingRes.data.map(i => ({
          id: i.id,
          name: i.name,
          unit: i.unit,
          quantity: Number(i.quantity),
          unitCost: Number(i.unit_cost),
          minQuantity: i.min_quantity ? Number(i.min_quantity) : undefined,
          category: i.category,
          icon: i.icon,
          status: i.status
        })));
      }

      if (packRes.data) {
        setPackagingItems(packRes.data.map(p => ({
          id: p.id,
          name: p.name,
          unit: p.unit,
          quantity: Number(p.quantity),
          unitCost: Number(p.unit_cost),
          minQuantity: p.min_quantity ? Number(p.min_quantity) : undefined,
          category: p.category,
          icon: p.icon,
          status: p.status
        })));
      }

      if (movRes.data) {
        setStockMovements(movRes.data.map(m => ({
          id: m.id,
          item_id: m.item_id,
          item_type: m.item_type,
          quantity: Number(m.quantity),
          cost_type: m.cost_type,
          cost_value: Number(m.cost_value),
          description: m.description,
          date: m.date
        })));
      }
    } catch (error) {
      console.error('Erro ao carregar dados de estoque:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addIngredient = async (ingredient: Omit<Ingredient, 'id'>) => {
    try {
      const { error } = await supabase.from('ingredients').insert([{
        name: ingredient.name,
        unit: ingredient.unit,
        quantity: ingredient.quantity,
        unit_cost: ingredient.unitCost,
        min_quantity: ingredient.minQuantity,
        category: ingredient.category,
        icon: ingredient.icon,
        status: ingredient.status
      }]);
      if (error) throw error;
      await fetchData();
    } catch (error) {
      console.error('Erro ao adicionar ingrediente:', error);
      throw error;
    }
  };

  const addPackagingItem = async (packagingItem: Omit<PackagingItem, 'id'>) => {
    try {
      const { error } = await supabase.from('packaging').insert([{
        name: packagingItem.name,
        unit: packagingItem.unit,
        quantity: packagingItem.quantity,
        unit_cost: packagingItem.unitCost,
        min_quantity: packagingItem.minQuantity,
        category: packagingItem.category,
        icon: packagingItem.icon,
        status: packagingItem.status
      }]);
      if (error) throw error;
      await fetchData();
    } catch (error) {
      console.error('Erro ao adicionar embalagem:', error);
      throw error;
    }
  };

  const updateIngredient = async (id: string, updates: Partial<Ingredient>) => {
    const updateData: any = {};
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.unit !== undefined) updateData.unit = updates.unit;
    if (updates.quantity !== undefined) updateData.quantity = updates.quantity;
    if (updates.unitCost !== undefined) updateData.unit_cost = updates.unitCost;
    if (updates.minQuantity !== undefined) updateData.min_quantity = updates.minQuantity;
    if (updates.status !== undefined) updateData.status = updates.status;

    const { error } = await supabase.from('ingredients').update(updateData).eq('id', id);
    if (error) throw error;
    await fetchData();
  };

  const updatePackagingItem = async (id: string, updates: Partial<PackagingItem>) => {
    const updateData: any = {};
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.unit !== undefined) updateData.unit = updates.unit;
    if (updates.quantity !== undefined) updateData.quantity = updates.quantity;
    if (updates.unitCost !== undefined) updateData.unit_cost = updates.unitCost;
    if (updates.minQuantity !== undefined) updateData.min_quantity = updates.minQuantity;
    if (updates.status !== undefined) updateData.status = updates.status;

    const { error } = await supabase.from('packaging').update(updateData).eq('id', id);
    if (error) throw error;
    await fetchData();
  };

  const removeIngredient = async (id: string) => {
    const { error } = await supabase.from('ingredients').delete().eq('id', id);
    if (error) throw error;
    await fetchData();
  };

  const removePackagingItem = async (id: string) => {
    const { error } = await supabase.from('packaging').delete().eq('id', id);
    if (error) throw error;
    await fetchData();
  };

  const addStockMovement = async (movement: Omit<StockMovement, 'id'>) => {
    const { error } = await supabase.from('stock_movements').insert([{
      item_id: movement.item_id,
      item_type: movement.item_type,
      quantity: movement.quantity,
      cost_type: movement.cost_type,
      cost_value: movement.cost_value,
      description: movement.description,
      date: movement.date
    }]);
    if (error) throw error;

    // Atualizar o item correspondente
    const table = movement.item_type === 'ingredient' ? 'ingredients' : 'packaging';
    const items = movement.item_type === 'ingredient' ? ingredients : packagingItems;
    const item = items.find(i => i.id === movement.item_id);

    if (item) {
      const currentQuantity = item.quantity;
      const currentTotalCost = currentQuantity * item.unitCost;
      let newTotalCost = currentTotalCost;
      let newQuantity = currentQuantity + movement.quantity;

      if (movement.cost_type === "unitario") {
        newTotalCost = currentTotalCost + (movement.quantity * movement.cost_value);
      } else if (movement.cost_type === "pacote") {
        newTotalCost = currentTotalCost + movement.cost_value;
      }

      const newUnitCost = newQuantity > 0 ? newTotalCost / newQuantity : 0;
      let newStatus = "Em dia";
      if (item.minQuantity && newQuantity <= item.minQuantity) newStatus = "Baixo";
      if (item.minQuantity && newQuantity <= (item.minQuantity * 0.5)) newStatus = "Crítico";

      await supabase.from(table).update({
        quantity: newQuantity,
        unit_cost: newUnitCost,
        status: newStatus
      }).eq('id', item.id);
    }

    await fetchData();
  };

  const updateStockMovement = async (id: string, updates: Partial<StockMovement>) => {
    // Para simplificar, deletamos e adicionamos novamente para recalcular o estoque
    const oldMov = stockMovements.find(m => m.id === id);
    if (oldMov) {
      await deleteStockMovement(id);
      const newMov = { ...oldMov, ...updates };
      await addStockMovement(newMov);
    }
  };

  const deleteStockMovement = async (id: string) => {
    const movement = stockMovements.find(m => m.id === id);
    if (movement) {
      const table = movement.item_type === 'ingredient' ? 'ingredients' : 'packaging';
      const items = movement.item_type === 'ingredient' ? ingredients : packagingItems;
      const item = items.find(i => i.id === movement.item_id);

      if (item) {
        const currentQuantity = item.quantity;
        const currentTotalCost = currentQuantity * item.unitCost;
        let totalCostToSubtract = movement.cost_type === "unitario" ? movement.quantity * movement.cost_value : movement.cost_value;
        const newTotalCost = currentTotalCost - totalCostToSubtract;
        const newQuantity = currentQuantity - movement.quantity;
        const newUnitCost = newQuantity > 0 ? newTotalCost / newQuantity : 0;
        
        let newStatus = "Em dia";
        if (item.minQuantity && newQuantity <= item.minQuantity) newStatus = "Baixo";
        if (item.minQuantity && newQuantity <= (item.minQuantity * 0.5)) newStatus = "Crítico";

        await supabase.from(table).update({
          quantity: newQuantity,
          unit_cost: newUnitCost,
          status: newStatus
        }).eq('id', item.id);
      }

      const { error } = await supabase.from('stock_movements').delete().eq('id', id);
      if (error) throw error;
      await fetchData();
    }
  };

  const getStockMovementsForDisplay = (): StockMovementForDisplay[] => {
    const allItemsMap = new Map([...ingredients, ...packagingItems].map(item => [item.id, item]));
    return stockMovements.map(movement => {
      const item = allItemsMap.get(movement.item_id);
      return { ...movement, itemName: item?.name || "Item Desconhecido", itemUnit: item?.unit || "un" };
    });
  };

  return (
    <StockContext.Provider value={{
      ingredients,
      packagingItems,
      stockMovements,
      loading,
      addIngredient,
      addPackagingItem,
      updateIngredient,
      updatePackagingItem,
      removeIngredient,
      removePackagingItem,
      addStockMovement,
      updateStockMovement,
      deleteStockMovement,
      getStockMovementsForDisplay
    }}>
      {children}
    </StockContext.Provider>
  );
};