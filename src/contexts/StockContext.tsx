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

// Helper to generate unique ID if needed
const generateUniqueId = () => Date.now().toString() + Math.random().toString(36).substring(2, 9);

// Default mock data with unique string IDs
const defaultIngredients: Ingredient[] = [
  { id: 'ing-1', name: 'Leite Condensado', unit: 'un', quantity: 15, unitCost: 5.50, minQuantity: 5, category: 'Ingredientes', icon: 'Cookie', status: 'Em dia' },
  { id: 'ing-2', name: 'Morango Congelado', unit: 'kg', quantity: 2.5, unitCost: 12.00, minQuantity: 3, category: 'Ingredientes', icon: 'Cookie', status: 'Baixo' },
  { id: 'ing-3', name: 'Nutella', unit: 'kg', quantity: 0.1, unitCost: 45.00, minQuantity: 0.5, category: 'Ingredientes', icon: 'Cookie', status: 'Crítico' },
];

const defaultPackagingItems: PackagingItem[] = [
  { id: 'pack-1', name: 'Saquinho 6x24', unit: 'un', quantity: 500, unitCost: 0.05, minQuantity: 100, category: 'Embalagens', icon: 'Package', status: 'Em dia' },
  { id: 'pack-2', name: 'Adesivo Logo', unit: 'un', quantity: 80, unitCost: 0.10, minQuantity: 100, category: 'Embalagens', icon: 'Package', status: 'Baixo' },
];

export const StockProvider: React.FC<StockProviderProps> = ({ children }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [packagingItems, setPackagingItems] = useState<PackagingItem[]>([]);
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadStockData = () => {
      try {
        const storedIngredients = localStorage.getItem('ingredients');
        const storedPackagingItems = localStorage.getItem('packagingItems');
        const storedMovements = localStorage.getItem('stockMovements');

        const loadedIngredients = storedIngredients ? JSON.parse(storedIngredients) : defaultIngredients;
        const loadedPackagingItems = storedPackagingItems ? JSON.parse(storedPackagingItems) : defaultPackagingItems;
        const loadedMovements = storedMovements ? JSON.parse(storedMovements) : [];

        // Normalize IDs to ensure they are strings and unique (if they came from old storage)
        const normalizeItems = (items: (Ingredient | PackagingItem)[]) => items.map(item => ({
          ...item,
          id: item.id ? item.id.toString() : generateUniqueId()
        }));

        setIngredients(normalizeItems(loadedIngredients) as Ingredient[]);
        setPackagingItems(normalizeItems(loadedPackagingItems) as PackagingItem[]);
        setStockMovements(loadedMovements);
      } catch (error) {
        console.error('Error loading stock data:', error);
        setIngredients(defaultIngredients);
        setPackagingItems(defaultPackagingItems);
        setStockMovements([]);
      }
    };

    loadStockData();
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (ingredients.length >= 0) {
      localStorage.setItem('ingredients', JSON.stringify(ingredients));
    }
  }, [ingredients]);

  useEffect(() => {
    if (packagingItems.length >= 0) {
      localStorage.setItem('packagingItems', JSON.stringify(packagingItems));
    }
  }, [packagingItems]);

  useEffect(() => {
    if (stockMovements.length >= 0) {
      localStorage.setItem('stockMovements', JSON.stringify(stockMovements));
    }
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
    // Update stock levels based on movement
    if (movement.item_type === "ingredient") {
      setIngredients(prev => prev.map(item => {
        if (item.id === movement.item_id) {
          const currentQuantity = item.quantity;
          const currentTotalCost = currentQuantity * item.unitCost;

          // Calculate new cost based on movement type
          let newTotalCost = currentTotalCost;
          let newQuantity = currentQuantity + movement.quantity;

          if (movement.cost_type === "unitario") {
            // cost_value is per unit
            newTotalCost = currentTotalCost + (movement.quantity * movement.cost_value);
          } else if (movement.cost_type === "pacote") {
            // cost_value is total package cost
            newTotalCost = currentTotalCost + movement.cost_value;
          }

          const newUnitCost = newQuantity > 0 ? newTotalCost / newQuantity : 0;

          // Determine status
          let newStatus = "Em dia";
          if (item.minQuantity && newQuantity <= item.minQuantity) {
            newStatus = "Baixo";
          }
          if (item.minQuantity && newQuantity <= (item.minQuantity * 0.5)) {
            newStatus = "Crítico";
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

          // Calculate new cost based on movement type
          let newTotalCost = currentTotalCost;
          let newQuantity = currentQuantity + movement.quantity;

          if (movement.cost_type === "unitario") {
            // cost_value is per unit
            newTotalCost = currentTotalCost + (movement.quantity * movement.cost_value);
          } else if (movement.cost_type === "pacote") {
            // cost_value is total package cost
            newTotalCost = currentTotalCost + movement.cost_value;
          }

          const newUnitCost = newQuantity > 0 ? newTotalCost / newQuantity : 0;

          // Determine status
          let newStatus = "Em dia";
          if (item.minQuantity && newQuantity <= item.minQuantity) {
            newStatus = "Baixo";
          }
          if (item.minQuantity && newQuantity <= (item.minQuantity * 0.5)) {
            newStatus = "Crítico";
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

    setStockMovements(prev => [...prev, movement]);
  };

  const updateStockMovement = (id: string, updates: Partial<StockMovement>) => {
    const oldMovement = stockMovements.find(m => m.id === id);
    if (oldMovement) {
      // First, revert the old movement
      if (oldMovement.item_type === "ingredient") {
        setIngredients(prev => prev.map(item => {
          if (item.id === oldMovement.item_id) {
            const currentQuantity = item.quantity;
            const currentTotalCost = currentQuantity * item.unitCost;

            // Calculate the cost to subtract based on old movement cost type
            let totalCostToSubtract = 0;

            if (oldMovement.cost_type === "unitario") {
              totalCostToSubtract = oldMovement.quantity * oldMovement.cost_value;
            } else if (oldMovement.cost_type === "pacote") {
              totalCostToSubtract = oldMovement.cost_value;
            }

            const newTotalCost = currentTotalCost - totalCostToSubtract;
            const newQuantity = currentQuantity - oldMovement.quantity;
            const newUnitCost = newQuantity > 0 ? newTotalCost / newQuantity : 0;

            let newStatus = "Em dia";
            if (item.minQuantity && newQuantity <= item.minQuantity) {
              newStatus = "Baixo";
            }
            if (item.minQuantity && newQuantity <= (item.minQuantity * 0.5)) {
              newStatus = "Crítico";
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

            // Calculate the cost to subtract based on old movement cost type
            let totalCostToSubtract = 0;

            if (oldMovement.cost_type === "unitario") {
              totalCostToSubtract = oldMovement.quantity * oldMovement.cost_value;
            } else if (oldMovement.cost_type === "pacote") {
              totalCostToSubtract = oldMovement.cost_value;
            }

            const newTotalCost = currentTotalCost - totalCostToSubtract;
            const newQuantity = currentQuantity - oldMovement.quantity;
            const newUnitCost = newQuantity > 0 ? newTotalCost / newQuantity : 0;

            let newStatus = "Em dia";
            if (item.minQuantity && newQuantity <= item.minQuantity) {
              newStatus = "Baixo";
            }
            if (item.minQuantity && newQuantity <= (item.minQuantity * 0.5)) {
              newStatus = "Crítico";
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

      // Update the movement
      setStockMovements(prev => prev.map(m =>
        m.id === id ? { ...m, ...updates } : m
      ));

      // Apply the updated movement
      const updatedMovement = { ...oldMovement, ...updates };
      addStockMovement(updatedMovement);
    }
  };

  const deleteStockMovement = (id: string) => {
    const movement = stockMovements.find(m => m.id === id);
    if (movement) {
      // Revert the stock changes
      if (movement.item_type === "ingredient") {
        setIngredients(prev => prev.map(item => {
          if (item.id === movement.item_id) {
            const currentQuantity = item.quantity;
            const currentTotalCost = currentQuantity * item.unitCost;

            // Calculate the cost to subtract based on movement cost type
            let totalCostToSubtract = 0;

            if (movement.cost_type === "unitario") {
              totalCostToSubtract = movement.quantity * movement.cost_value;
            } else if (movement.cost_type === "pacote") {
              totalCostToSubtract = movement.cost_value;
            }

            const newTotalCost = currentTotalCost - totalCostToSubtract;
            const newQuantity = currentQuantity - movement.quantity;
            const newUnitCost = newQuantity > 0 ? newTotalCost / newQuantity : 0;

            let newStatus = "Em dia";
            if (item.minQuantity && newQuantity <= item.minQuantity) {
              newStatus = "Baixo";
            }
            if (item.minQuantity && newQuantity <= (item.minQuantity * 0.5)) {
              newStatus = "Crítico";
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

            // Calculate the cost to subtract based on movement cost type
            let totalCostToSubtract = 0;

            if (movement.cost_type === "unitario") {
              totalCostToSubtract = movement.quantity * movement.cost_value;
            } else if (movement.cost_type === "pacote") {
              totalCostToSubtract = movement.cost_value;
            }

            const newTotalCost = currentTotalCost - totalCostToSubtract;
            const newQuantity = currentQuantity - movement.quantity;
            const newUnitCost = newQuantity > 0 ? newTotalCost / newQuantity : 0;

            let newStatus = "Em dia";
            if (item.minQuantity && newQuantity <= item.minQuantity) {
              newStatus = "Baixo";
            }
            if (item.minQuantity && newQuantity <= (item.minQuantity * 0.5)) {
              newStatus = "Crítico";
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

  const getStockMovementsForDisplay = (): StockMovementForDisplay[] => {
    const allItemsMap = new Map([...ingredients, ...packagingItems].map(item => [item.id, item]));

    return stockMovements.map(movement => {
      const item = allItemsMap.get(movement.item_id);
      let itemName = item?.name || "Item Desconhecido";
      let itemUnit = item?.unit || "un";

      return {
        ...movement,
        itemName,
        itemUnit
      };
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