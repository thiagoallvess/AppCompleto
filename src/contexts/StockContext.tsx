import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  addIngredient: (ingredient: Ingredient) => void;
  addPackagingItem: (packagingItem: PackagingItem) => void;
  updateIngredient: (id: string, updates: Partial<Ingredient>) => void;
  updatePackagingItem: (id: string, updates: Partial<PackagingItem>) => void;
  removeIngredient: (id: string) => void;
  removePackagingItem: (id: string) => void;
  addStockMovement: (movement: StockMovement) => void;
  updateStockMovement: (id: string, updates: Partial<StockMovement>) => void;
  deleteStockMovement: (id: string) => void;
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

const generateUniqueId = () => Date.now().toString() + Math.random().toString(36).substring(2, 9);

export const StockProvider: React.FC<StockProviderProps> = ({ children }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [packagingItems, setPackagingItems] = useState<PackagingItem[]>([]);
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);

  useEffect(() => {
    const loadStockData = () => {
      try {
        const storedIngredients = localStorage.getItem('ingredients');
        const storedPackagingItems = localStorage.getItem('packagingItems');
        const storedMovements = localStorage.getItem('stockMovements');

        if (storedIngredients) setIngredients(JSON.parse(storedIngredients));
        if (storedPackagingItems) setPackagingItems(JSON.parse(storedPackagingItems));
        if (storedMovements) setStockMovements(JSON.parse(storedMovements));
      } catch (error) {
        console.error('Error loading stock data:', error);
      }
    };

    loadStockData();
  }, []);

  useEffect(() => {
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
  }, [ingredients]);

  useEffect(() => {
    localStorage.setItem('packagingItems', JSON.stringify(packagingItems));
  }, [packagingItems]);

  useEffect(() => {
    localStorage.setItem('stockMovements', JSON.stringify(stockMovements));
  }, [stockMovements]);

  const addIngredient = (ingredient: Ingredient) => {
    setIngredients(prev => [...prev, ingredient]);
  };

  const addPackagingItem = (packagingItem: PackagingItem) => {
    setPackagingItems(prev => [...prev, packagingItem]);
  };

  const updateIngredient = (id: string, updates: Partial<Ingredient>) => {
    setIngredients(prev => prev.map(item =>
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const updatePackagingItem = (id: string, updates: Partial<PackagingItem>) => {
    setPackagingItems(prev => prev.map(item =>
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const removeIngredient = (id: string) => {
    setIngredients(prev => prev.filter(item => item.id !== id));
  };

  const removePackagingItem = (id: string) => {
    setPackagingItems(prev => prev.filter(item => item.id !== id));
  };

  const addStockMovement = (movement: StockMovement) => {
    if (movement.item_type === "ingredient") {
      setIngredients(prev => prev.map(item => {
        if (item.id === movement.item_id) {
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

          return { ...item, quantity: newQuantity, unitCost: newUnitCost, status: newStatus };
        }
        return item;
      }));
    } else {
      setPackagingItems(prev => prev.map(item => {
        if (item.id === movement.item_id) {
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

          return { ...item, quantity: newQuantity, unitCost: newUnitCost, status: newStatus };
        }
        return item;
      }));
    }
    setStockMovements(prev => [...prev, movement]);
  };

  const updateStockMovement = (id: string, updates: Partial<StockMovement>) => {
    const oldMovement = stockMovements.find(m => m.id === id);
    if (oldMovement) {
      deleteStockMovement(id);
      const updatedMovement = { ...oldMovement, ...updates };
      addStockMovement(updatedMovement);
    }
  };

  const deleteStockMovement = (id: string) => {
    const movement = stockMovements.find(m => m.id === id);
    if (movement) {
      if (movement.item_type === "ingredient") {
        setIngredients(prev => prev.map(item => {
          if (item.id === movement.item_id) {
            const currentQuantity = item.quantity;
            const currentTotalCost = currentQuantity * item.unitCost;
            let totalCostToSubtract = movement.cost_type === "unitario" ? movement.quantity * movement.cost_value : movement.cost_value;
            const newTotalCost = currentTotalCost - totalCostToSubtract;
            const newQuantity = currentQuantity - movement.quantity;
            const newUnitCost = newQuantity > 0 ? newTotalCost / newQuantity : 0;
            let newStatus = "Em dia";
            if (item.minQuantity && newQuantity <= item.minQuantity) newStatus = "Baixo";
            return { ...item, quantity: newQuantity, unitCost: newUnitCost, status: newStatus };
          }
          return item;
        }));
      } else {
        setPackagingItems(prev => prev.map(item => {
          if (item.id === movement.item_id) {
            const currentQuantity = item.quantity;
            const currentTotalCost = currentQuantity * item.unitCost;
            let totalCostToSubtract = movement.cost_type === "unitario" ? movement.quantity * movement.cost_value : movement.cost_value;
            const newTotalCost = currentTotalCost - totalCostToSubtract;
            const newQuantity = currentQuantity - movement.quantity;
            const newUnitCost = newQuantity > 0 ? newTotalCost / newQuantity : 0;
            let newStatus = "Em dia";
            if (item.minQuantity && newQuantity <= item.minQuantity) newStatus = "Baixo";
            return { ...item, quantity: newQuantity, unitCost: newUnitCost, status: newStatus };
          }
          return item;
        }));
      }
      setStockMovements(prev => prev.filter(m => m.id !== id));
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