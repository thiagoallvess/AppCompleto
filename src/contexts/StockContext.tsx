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
  lastUpdated?: string;
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
  lastUpdated?: string;
}

export interface StockMovement {
  id: string;
  item_id: string;
  item_type: "ingredient" | "packaging";
  quantity: number;
  cost_type: "unitario" | "pacote";
  cost_value: number;
  description?: string;
  date: string;
}

export interface StockMovementForDisplay extends StockMovement {
  itemName: string;
  itemUnit: string;
  unitCost: number;
}

interface StockContextType {
  ingredients: Ingredient[];
  packagingItems: PackagingItem[];
  stockMovements: StockMovement[];
  isLoadingIngredients: boolean;
  isLoadingPackaging: boolean;
  isLoadingStockMovements: boolean;
  addStockMovement: (movement: Omit<StockMovement, 'id'>) => Promise<void>;
  updateStockMovement: (id: string, movement: Omit<StockMovement, 'id'>) => Promise<void>;
  deleteStockMovement: (id: string) => Promise<void>;
  refreshData: () => void;
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
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(true);
  const [isLoadingPackaging, setIsLoadingPackaging] = useState(true);
  const [isLoadingStockMovements, setIsLoadingStockMovements] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadIngredients = () => {
      try {
        const storedIngredients = localStorage.getItem('inventoryItems');
        if (storedIngredients) {
          const items = JSON.parse(storedIngredients);
          const ingredientsList = items
            .filter((item: any) => item.category === "Ingredientes")
            .map((item: any) => ({
              id: item.id,
              name: item.name,
              unit: item.unit,
              quantity: parseFloat(item.quantity || "0"),
              unitCost: item.unitCost || 0,
              minQuantity: item.minQuantity ? parseFloat(item.minQuantity) : undefined,
              category: item.category,
              icon: item.icon,
              status: item.status || "Em dia",
              lastUpdated: item.lastUpdated
            }));
          setIngredients(ingredientsList);
        } else {
          setIngredients([]);
        }
      } catch (error) {
        console.error('Error loading ingredients:', error);
        setIngredients([]);
      } finally {
        setIsLoadingIngredients(false);
      }
    };

    const loadPackagingItems = () => {
      try {
        const storedPackaging = localStorage.getItem('inventoryItems');
        if (storedPackaging) {
          const items = JSON.parse(storedPackaging);
          const packagingList = items
            .filter((item: any) => item.category === "Embalagens")
            .map((item: any) => ({
              id: item.id,
              name: item.name,
              unit: item.unit,
              quantity: parseFloat(item.quantity || "0"),
              unitCost: item.unitCost || 0,
              minQuantity: item.minQuantity ? parseFloat(item.minQuantity) : undefined,
              category: item.category,
              icon: item.icon,
              status: item.status || "Em dia",
              lastUpdated: item.lastUpdated
            }));
          setPackagingItems(packagingList);
        } else {
          setPackagingItems([]);
        }
      } catch (error) {
        console.error('Error loading packaging items:', error);
        setPackagingItems([]);
      } finally {
        setIsLoadingPackaging(false);
      }
    };

    const loadStockMovements = () => {
      try {
        const storedMovements = localStorage.getItem('stockMovements');
        if (storedMovements) {
          setStockMovements(JSON.parse(storedMovements));
        } else {
          setStockMovements([]);
        }
      } catch (error) {
        console.error('Error loading stock movements:', error);
        setStockMovements([]);
      } finally {
        setIsLoadingStockMovements(false);
      }
    };

    loadIngredients();
    loadPackagingItems();
    loadStockMovements();
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (ingredients.length >= 0) {
      const allItems = [...ingredients, ...packagingItems];
      localStorage.setItem('inventoryItems', JSON.stringify(allItems));
    }
  }, [ingredients, packagingItems]);

  useEffect(() => {
    if (stockMovements.length >= 0) {
      localStorage.setItem('stockMovements', JSON.stringify(stockMovements));
    }
  }, [stockMovements]);

  const addStockMovement = async (movement: Omit<StockMovement, 'id'>) => {
    const newMovement: StockMovement = {
      ...movement,
      id: Date.now().toString()
    };

    // Update stock quantities and costs
    if (movement.item_type === "ingredient") {
      setIngredients(prev => prev.map(item => {
        if (item.id === movement.item_id) {
          const currentQuantity = item.quantity;
          const currentTotalCost = currentQuantity * item.unitCost;
          const newTotalCost = currentTotalCost + (movement.quantity * movement.cost_value);
          const newQuantity = currentQuantity + movement.quantity;
          const newUnitCost = newTotalCost / newQuantity;

          let newStatus = "Em dia";
          if (item.minQuantity && newQuantity <= item.minQuantity) {
            newStatus = "Baixo";
          }

          return {
            ...item,
            quantity: newQuantity,
            unitCost: newUnitCost,
            lastUpdated: movement.date,
            status: newStatus
          };
        }
        return item;
      }));
    } else {
      setPackagingItems(prev => prev.map(item => {
        if (item.id === movement.item_id) {
          const currentQuantity = item.quantity;
          const currentTotalCost = currentQuantity * item.unitCost;
          const newTotalCost = currentTotalCost + (movement.quantity * movement.cost_value);
          const newQuantity = currentQuantity + movement.quantity;
          const newUnitCost = newTotalCost / newQuantity;

          let newStatus = "Em dia";
          if (item.minQuantity && newQuantity <= item.minQuantity) {
            newStatus = "Baixo";
          }

          return {
            ...item,
            quantity: newQuantity,
            unitCost: newUnitCost,
            lastUpdated: movement.date,
            status: newStatus
          };
        }
        return item;
      }));
    }

    setStockMovements(prev => [...prev, newMovement]);
  };

  const updateStockMovement = async (id: string, movement: Omit<StockMovement, 'id'>) => {
    // First, revert the old movement
    const oldMovement = stockMovements.find(m => m.id === id);
    if (oldMovement) {
      if (oldMovement.item_type === "ingredient") {
        setIngredients(prev => prev.map(item => {
          if (item.id === oldMovement.item_id) {
            const currentQuantity = item.quantity;
            const currentTotalCost = currentQuantity * item.unitCost;
            const oldTotalCost = oldMovement.quantity * oldMovement.cost_value;
            const newTotalCost = currentTotalCost - oldTotalCost;
            const newQuantity = currentQuantity - oldMovement.quantity;
            const newUnitCost = newQuantity > 0 ? newTotalCost / newQuantity : 0;

            let newStatus = "Em dia";
            if (item.minQuantity && newQuantity <= item.minQuantity) {
              newStatus = "Baixo";
            }

            return {
              ...item,
              quantity: newQuantity,
              unitCost: newUnitCost,
              status: newStatus
            };
          }
          return item;
        }));
      } else {
        setPackagingItems(prev => prev.map(item => {
          if (item.id === oldMovement.item_id) {
            const currentQuantity = item.quantity;
            const currentTotalCost = currentQuantity * item.unitCost;
            const oldTotalCost = oldMovement.quantity * oldMovement.cost_value;
            const newTotalCost = currentTotalCost - oldTotalCost;
            const newQuantity = currentQuantity - oldMovement.quantity;
            const newUnitCost = newQuantity > 0 ? newTotalCost / newQuantity : 0;

            let newStatus = "Em dia";
            if (item.minQuantity && newQuantity <= item.minQuantity) {
              newStatus = "Baixo";
            }

            return {
              ...item,
              quantity: newQuantity,
              unitCost: newUnitCost,
              status: newStatus
            };
          }
          return item;
        }));
      }
    }

    // Then apply the new movement
    await addStockMovement(movement);

    // Remove the old movement
    setStockMovements(prev => prev.filter(m => m.id !== id));
  };

  const deleteStockMovement = async (id: string) => {
    const movement = stockMovements.find(m => m.id === id);
    if (movement) {
      // Revert the stock changes
      if (movement.item_type === "ingredient") {
        setIngredients(prev => prev.map(item => {
          if (item.id === movement.item_id) {
            const currentQuantity = item.quantity;
            const currentTotalCost = currentQuantity * item.unitCost;
            const movementTotalCost = movement.quantity * movement.cost_value;
            const newTotalCost = currentTotalCost - movementTotalCost;
            const newQuantity = currentQuantity - movement.quantity;
            const newUnitCost = newQuantity > 0 ? newTotalCost / newQuantity : 0;

            let newStatus = "Em dia";
            if (item.minQuantity && newQuantity <= item.minQuantity) {
              newStatus = "Baixo";
            }

            return {
              ...item,
              quantity: newQuantity,
              unitCost: newUnitCost,
              status: newStatus
            };
          }
          return item;
        }));
      } else {
        setPackagingItems(prev => prev.map(item => {
          if (item.id === movement.item_id) {
            const currentQuantity = item.quantity;
            const currentTotalCost = currentQuantity * item.unitCost;
            const movementTotalCost = movement.quantity * movement.cost_value;
            const newTotalCost = currentTotalCost - movementTotalCost;
            const newQuantity = currentQuantity - movement.quantity;
            const newUnitCost = newQuantity > 0 ? newTotalCost / newQuantity : 0;

            let newStatus = "Em dia";
            if (item.minQuantity && newQuantity <= item.minQuantity) {
              newStatus = "Baixo";
            }

            return {
              ...item,
              quantity: newQuantity,
              unitCost: newUnitCost,
              status: newStatus
            };
          }
          return item;
        }));
      }

      setStockMovements(prev => prev.filter(m => m.id !== id));
    }
  };

  const refreshData = () => {
    // Reload data from localStorage
    const loadIngredients = () => {
      try {
        const storedIngredients = localStorage.getItem('inventoryItems');
        if (storedIngredients) {
          const items = JSON.parse(storedIngredients);
          const ingredientsList = items
            .filter((item: any) => item.category === "Ingredientes")
            .map((item: any) => ({
              id: item.id,
              name: item.name,
              unit: item.unit,
              quantity: parseFloat(item.quantity || "0"),
              unitCost: item.unitCost || 0,
              minQuantity: item.minQuantity ? parseFloat(item.minQuantity) : undefined,
              category: item.category,
              icon: item.icon,
              status: item.status || "Em dia",
              lastUpdated: item.lastUpdated
            }));
          setIngredients(ingredientsList);
        }
      } catch (error) {
        console.error('Error loading ingredients:', error);
      }
    };

    const loadPackagingItems = () => {
      try {
        const storedPackaging = localStorage.getItem('inventoryItems');
        if (storedPackaging) {
          const items = JSON.parse(storedPackaging);
          const packagingList = items
            .filter((item: any) => item.category === "Embalagens")
            .map((item: any) => ({
              id: item.id,
              name: item.name,
              unit: item.unit,
              quantity: parseFloat(item.quantity || "0"),
              unitCost: item.unitCost || 0,
              minQuantity: item.minQuantity ? parseFloat(item.minQuantity) : undefined,
              category: item.category,
              icon: item.icon,
              status: item.status || "Em dia",
              lastUpdated: item.lastUpdated
            }));
          setPackagingItems(packagingList);
        }
      } catch (error) {
        console.error('Error loading packaging items:', error);
      }
    };

    const loadStockMovements = () => {
      try {
        const storedMovements = localStorage.getItem('stockMovements');
        if (storedMovements) {
          setStockMovements(JSON.parse(storedMovements));
        }
      } catch (error) {
        console.error('Error loading stock movements:', error);
      }
    };

    loadIngredients();
    loadPackagingItems();
    loadStockMovements();
  };

  return (
    <StockContext.Provider value={{
      ingredients,
      packagingItems,
      stockMovements,
      isLoadingIngredients,
      isLoadingPackaging,
      isLoadingStockMovements,
      addStockMovement,
      updateStockMovement,
      deleteStockMovement,
      refreshData
    }}>
      {children}
    </StockContext.Provider>
  );
};