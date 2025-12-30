import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from './ProductsContext';

interface SupabaseProductsContextType {
  products: Product[];
  loading: boolean;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  updateStock: (productId: string, quantity: number) => Promise<void>;
  getAvailableProducts: () => Product[];
}

const SupabaseProductsContext = createContext<SupabaseProductsContextType | undefined>(undefined);

export const useSupabaseProducts = () => {
  const context = useContext(SupabaseProductsContext);
  if (!context) {
    throw new Error('useSupabaseProducts must be used within a SupabaseProductsProvider');
  }
  return context;
};

interface SupabaseProductsProviderProps {
  children: ReactNode;
}

export const SupabaseProductsProvider: React.FC<SupabaseProductsProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedProducts = data.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        description: item.description,
        rating: item.rating,
        reviews: item.reviews,
        stock: item.stock,
        isActive: item.is_active,
        recipeId: item.recipe_id
      }));

      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Product) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          rating: product.rating,
          reviews: product.reviews,
          stock: product.stock,
          is_active: product.isActive,
          recipe_id: product.recipeId
        }])
        .select()
        .single();

      if (error) throw error;

      const newProduct = {
        id: data.id,
        name: data.name,
        price: data.price,
        image: data.image,
        description: data.description,
        rating: data.rating,
        reviews: data.reviews,
        stock: data.stock,
        isActive: data.is_active,
        recipeId: data.recipe_id
      };

      setProducts(prev => [newProduct, ...prev]);
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const updateData: any = {};
      if (updates.name !== undefined) updateData.name = updates.name;
      if (updates.price !== undefined) updateData.price = updates.price;
      if (updates.image !== undefined) updateData.image = updates.image;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.rating !== undefined) updateData.rating = updates.rating;
      if (updates.reviews !== undefined) updateData.reviews = updates.reviews;
      if (updates.stock !== undefined) updateData.stock = updates.stock;
      if (updates.isActive !== undefined) updateData.is_active = updates.isActive;
      if (updates.recipeId !== undefined) updateData.recipe_id = updates.recipeId;

      const { error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      setProducts(prev => prev.map(product =>
        product.id === id ? { ...product, ...updates } : product
      ));
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const removeProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProducts(prev => prev.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error removing product:', error);
      throw error;
    }
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const updateStock = async (productId: string, quantity: number) => {
    try {
      const currentProduct = products.find(p => p.id === productId);
      if (!currentProduct) return;

      const newStock = Math.max(0, currentProduct.stock + quantity);

      await updateProduct(productId, { stock: newStock });
    } catch (error) {
      console.error('Error updating stock:', error);
      throw error;
    }
  };

  const getAvailableProducts = () => {
    return products.filter(product => product.stock > 0 && product.isActive);
  };

  return (
    <SupabaseProductsContext.Provider value={{
      products,
      loading,
      addProduct,
      updateProduct,
      removeProduct,
      getProductById,
      updateStock,
      getAvailableProducts
    }}>
      {children}
    </SupabaseProductsContext.Provider>
  );
};