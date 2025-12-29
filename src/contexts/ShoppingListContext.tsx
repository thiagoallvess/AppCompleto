import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  priority: 'high' | 'medium' | 'low';
  source: string;
  estimatedCost?: number;
  supplier?: string;
  notes?: string;
  addedAt: string;
  completed: boolean;
}

interface ShoppingListContextType {
  items: ShoppingListItem[];
  addItem: (item: Omit<ShoppingListItem, 'id' | 'addedAt' | 'completed'>) => void;
  addItems: (items: Omit<ShoppingListItem, 'id' | 'addedAt' | 'completed'>[]) => void;
  updateItem: (id: string, updates: Partial<ShoppingListItem>) => void;
  removeItem: (id: string) => void;
  toggleCompleted: (id: string) => void;
  clearCompleted: () => void;
  clearAll: () => void;
  getTotalItems: () => number;
  getTotalCost: () => number;
  getItemsByPriority: (priority: 'high' | 'medium' | 'low') => ShoppingListItem[];
  getItemsBySource: (source: string) => ShoppingListItem[];
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  return context;
};

interface ShoppingListProviderProps {
  children: ReactNode;
}

export const ShoppingListProvider: React.FC<ShoppingListProviderProps> = ({ children }) => {
  const [items, setItems] = useState<ShoppingListItem[]>(() => {
    const saved = localStorage.getItem('shoppingList');
    if (saved) return JSON.parse(saved);
    return [];
  });

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<ShoppingListItem, 'id' | 'addedAt' | 'completed'>) => {
    const newItem: ShoppingListItem = {
      ...item,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      addedAt: new Date().toISOString(),
      completed: false
    };
    setItems(prev => [newItem, ...prev]);
  };

  const addItems = (newItems: Omit<ShoppingListItem, 'id' | 'addedAt' | 'completed'>[]) => {
    const itemsToAdd = newItems.map(item => ({
      ...item,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      addedAt: new Date().toISOString(),
      completed: false
    }));
    setItems(prev => [...itemsToAdd, ...prev]);
  };

  const updateItem = (id: string, updates: Partial<ShoppingListItem>) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleCompleted = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const clearCompleted = () => {
    setItems(prev => prev.filter(item => !item.completed));
  };

  const clearAll = () => {
    setItems([]);
  };

  const getTotalItems = () => items.filter(item => !item.completed).length;

  const getTotalCost = () => items
    .filter(item => !item.completed)
    .reduce((sum, item) => sum + (item.estimatedCost || 0), 0);

  const getItemsByPriority = (priority: 'high' | 'medium' | 'low') => 
    items.filter(item => item.priority === priority);

  const getItemsBySource = (source: string) => 
    items.filter(item => item.source === source);

  return (
    <ShoppingListContext.Provider value={{
      items,
      addItem,
      addItems,
      updateItem,
      removeItem,
      toggleCompleted,
      clearCompleted,
      clearAll,
      getTotalItems,
      getTotalCost,
      getItemsByPriority,
      getItemsBySource
    }}>
      {children}
    </ShoppingListContext.Provider>
  );
};