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
          // Initialize with default recipes if none exist
          const defaultRecipes: Recipe[] = [
            {
              id: 1,
              name: "Ninho com Nutella",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQI5Bd-HQhMa0roL66f0M780HWmmqj98bmIZaQjBCeGYe5rZ31qkJu43AOVL3u8tAt_AWdZ_tAhbDsirOp9nG8KG_S_Sc0AraSlLL5HDsJg6pkxcfIxrGbnsJrrpRxgWxiLWlOT1-m21pyJhpZEsu1JDIZt-ewzQQ8Ng8B93krfEByXuYSH5XCAwVUVSJ0BUkY5K1lNRYF1Jokck2SkgLRA9Iw28BqZB63RyZloSS3PukeRI-NHlmXR3NulS-tiLx-fi6mm71LjQ",
              time: "45 min",
              quantity: 20,
              cost: 1.50,
              isTop: true
            },
            {
              id: 2,
              name: "Morango Cremoso",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCM3cfAeatmEUtNaDEnz796M7L7_1N-EtyXmykGuHogX2Bqw0GLmlvYa3HPA8Wz1_4o9F5wPSUrzWkU8Yp7doalaFscT5306YI3bZgNz9gTLuFuBl4eyymE72I2oud60ide53rz4tw6ycGt2mAau951TpWIjxrfxMQg_NpEJUwcm1qol_S5JpSoZbGnw8au7eUWzH4lvezL2wocDTs541UOAWtFuVwleVW5xacABNhs7r5_Xla2rV2_GgGzX6Ol3wbDpTujEKBi_A",
              time: "30 min",
              quantity: 25,
              cost: 1.20
            },
            {
              id: 3,
              name: "Maracujá Trufado",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoZ4WrJnviJNuxDALva68IEx8BdGnHIjNAHbiCD9c4LdL8-hJlme5-_jxH6yK45w60ONtc-wS1X4YRBtWIaMoT-ulkjkHFRp2qqXBLfOkCCCkwdQaWLx2-89611q0649qzVgnLg86WrY-Ea70L22N2sX9RqBAfGRPY9V-lGLiw6-mIc2syzuhmzeimcROK7NbRdCxSJMIFrOkJSzh4puGnvIZiAPSOVeuwwrqMUlMvOWxuvH8MJKoEM1-UH9iaFBbmLGPUy3smQQ",
              time: "40 min",
              quantity: 18,
              cost: 1.35
            },
            {
              id: 4,
              name: "Paçoca (Rascunho)",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuUrbHMUtHkPnVX8zU4WTK_fS48HXn4xbB-GWsANxTetZelRGWCv8GGtFbOW1rSMzJMmjpipwp7Gl3gqsCOYYVDWAUiyeWGqZJxNjQXnkAHeP7S_ZqXwSDjg4JVnouLg6AfqUFvjhUweXGJ0kw1ToEhnvATVYkwQW7s9pw03oj-2z3_hwbeSleVWMqoVSXzli2QKu6II52TermU5LB1vtYSEPTyigw2rxM9sS-RcxsSJw9On0AT31sB50pWY5wpP81CCHvt0E32Q",
              time: "-- min",
              quantity: 0,
              cost: 0.90,
              isDraft: true
            },
            {
              id: 5,
              name: "Coco Cremoso",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeVtLOwl0ATHwAcr5evKM61DHAzUInDA4rNayZup2RLN2_bQCfTnVNR_l-DTdXOBvhL9WAaX87UftAK2U7sB2U6JTa7r8wpWfiDPIEbAtGGv-5CrecYaZuuD9l1b4s01XjoNpc5t9qaYh4dzSCTxZXGQq2UVC2yLgyUnmioy-w9jEP6S31faZwIlo68d951DTN_-oos0ZbKhyHyEGxSHXFfW4gxKyg2e9ICHwtS3Beq_3-2wSvZVjYKvOLPZI2_nP6TbsWYvi__Q",
              time: "35 min",
              quantity: 22,
              cost: 1.15
            }
          ];
          setRecipes(defaultRecipes);
          localStorage.setItem('recipes', JSON.stringify(defaultRecipes));
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
    if (recipes.length > 0) {
      localStorage.setItem('recipes', JSON.stringify(recipes));
    }
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