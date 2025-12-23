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

interface RecipesProviderProps {
  children: ReactNode;
}

export const RecipesProvider: React.FC<RecipesProviderProps> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Load recipes from localStorage on mount
  useEffect(() => {
    const loadRecipes = () => {
      try {
        const storedRecipes = localStorage.getItem('recipes');
        if (storedRecipes) {
          setRecipes(JSON.parse(storedRecipes));
        } else {
          // Inicia vazio para produção
          setRecipes([]);
        }
      } catch (error) {
        console.error('Error loading recipes:', error);
        setRecipes([]);
      }
    };

    loadRecipes();
  }, []);

  // Save to localStorage whenever recipes change
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