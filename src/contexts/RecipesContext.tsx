import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
  loading: boolean;
  addRecipe: (recipe: Omit<Recipe, 'id'>) => Promise<void>;
  updateRecipe: (id: number, updates: Partial<Recipe>) => Promise<void>;
  removeRecipe: (id: number) => Promise<void>;
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
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;

      if (data) {
        const formattedRecipes: Recipe[] = data.map(item => ({
          id: item.id,
          name: item.name,
          image: item.image || '',
          time: item.time || '',
          quantity: item.quantity,
          cost: Number(item.cost),
          isTop: item.is_top,
          isDraft: item.is_draft,
          ingredientsList: item.ingredients_list,
          packagingList: item.packaging_list,
          equipmentList: item.equipment_list,
          sellingPrice: Number(item.selling_price),
          linkedProductId: item.linked_product_id
        }));
        setRecipes(formattedRecipes);
      }
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const addRecipe = async (recipeData: Omit<Recipe, 'id'>) => {
    try {
      const { error } = await supabase
        .from('recipes')
        .insert([{
          name: recipeData.name,
          image: recipeData.image,
          time: recipeData.time,
          quantity: recipeData.quantity,
          cost: recipeData.cost,
          is_top: recipeData.isTop,
          is_draft: recipeData.isDraft,
          ingredients_list: recipeData.ingredientsList,
          packaging_list: recipeData.packagingList,
          equipment_list: recipeData.equipmentList,
          selling_price: recipeData.sellingPrice,
          linked_product_id: recipeData.linkedProductId === 'none' ? null : recipeData.linkedProductId
        }]);

      if (error) throw error;
      await fetchRecipes();
    } catch (error) {
      console.error('Erro ao adicionar receita:', error);
      throw error;
    }
  };

  const updateRecipe = async (id: number, updates: Partial<Recipe>) => {
    try {
      const updateData: any = {};
      if (updates.name !== undefined) updateData.name = updates.name;
      if (updates.image !== undefined) updateData.image = updates.image;
      if (updates.time !== undefined) updateData.time = updates.time;
      if (updates.quantity !== undefined) updateData.quantity = updates.quantity;
      if (updates.cost !== undefined) updateData.cost = updates.cost;
      if (updates.isTop !== undefined) updateData.is_top = updates.isTop;
      if (updates.isDraft !== undefined) updateData.is_draft = updates.isDraft;
      if (updates.ingredientsList !== undefined) updateData.ingredients_list = updates.ingredientsList;
      if (updates.packagingList !== undefined) updateData.packaging_list = updates.packagingList;
      if (updates.equipmentList !== undefined) updateData.equipment_list = updates.equipmentList;
      if (updates.sellingPrice !== undefined) updateData.selling_price = updates.sellingPrice;
      if (updates.linkedProductId !== undefined) {
        updateData.linked_product_id = updates.linkedProductId === 'none' ? null : updates.linkedProductId;
      }

      const { error } = await supabase
        .from('recipes')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      await fetchRecipes();
    } catch (error) {
      console.error('Erro ao atualizar receita:', error);
      throw error;
    }
  };

  const removeRecipe = async (id: number) => {
    try {
      const { error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchRecipes();
    } catch (error) {
      console.error('Erro ao remover receita:', error);
      throw error;
    }
  };

  const getRecipeById = (id: number) => {
    return recipes.find(recipe => recipe.id === id);
  };

  return (
    <RecipesContext.Provider value={{
      recipes,
      loading,
      addRecipe,
      updateRecipe,
      removeRecipe,
      getRecipeById
    }}>
      {children}
    </RecipesContext.Provider>
  );
};