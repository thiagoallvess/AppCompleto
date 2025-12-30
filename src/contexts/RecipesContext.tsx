import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Recipe {
  id: number;
  name: string;
  image: string;
  time: string;
  quantity: number;
  cost: number;
  isTop?: boolean;
  isDraft?: boolean;
  ingredientsList?: any[];
  packagingList?: any[];
  equipmentList?: any[];
  sellingPrice?: number;
  linkedProductId?: string;
}

interface RecipesContextType {
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (id: number, updates: Partial<Recipe>) => void;
  removeRecipe: (id: number) => void;
  getRecipeById: (id: number) => Recipe | undefined;
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export const useRecipes = () => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipesProvider');
  }
  return context;
};

export const RecipesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('recipes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (recipe: Recipe) => {
    setRecipes(prev => [...prev, recipe]);
  };

  const updateRecipe = (id: number, updates: Partial<Recipe>) => {
    setRecipes(prev => prev.map(recipe =>
      recipe.id === id ? { ...recipe, ...updates } : recipe
    ));
  };

  const removeRecipe = (id: number) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== id));
  };

  const getRecipeById = (id: number) => {
    return recipes.find(recipe => recipe.id === id);
  };

  return (
    <RecipesContext.Provider value={{
      recipes,
      addRecipe,
      updateRecipe,
      removeRecipe,
      getRecipeById
    }}>
      {children}
    </RecipesContext.Provider>
  );
};