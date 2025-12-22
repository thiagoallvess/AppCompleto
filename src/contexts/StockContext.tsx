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
  addIngredient: (ingredient: Ingredient) => void;
  addPackagingItem: (packagingItem: PackagingItem) => void;
  addStockMovement: (movement: StockMovement) => Promise<void>;
  updateStockMovement: (id: string, updates: Partial<StockMovement>) => Promise<void>;
  deleteStockMovement: (id: string) => Promise<void>;
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
        const storedIngredients = localStorage.getItem('ingredients');
        if (storedIngredients) {
          setIngredients(JSON.parse(storedIngredients));
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
        const storedPackagingItems = localStorage.getItem('packagingItems');
        if (storedPackagingItems) {
          setPackagingItems(JSON.parse(storedPackagingItems));
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
        const storedStockMovements = localStorage.getItem('stockMovements');
        if (storedStockMovements) {
          setStockMovements(JSON.parse(storedStockMovements));
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

  const addStockMovement = async (movement: StockMovement) => {
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

  const updateStockMovement = async (id: string, updates: Partial<StockMovement>) => {
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
      await addStockMovement(updatedMovement);
    }
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

  return (
    <StockContext.Provider value={{
      ingredients,
      packagingItems,
      stockMovements,
      isLoadingIngredients,
      isLoadingPackaging,
      isLoadingStockMovements,
      addIngredient,
      addPackagingItem,
      addStockMovement,
      updateStockMovement,
      deleteStockMovement
    }}>
      {children}
    </StockContext.Provider>
  );
};