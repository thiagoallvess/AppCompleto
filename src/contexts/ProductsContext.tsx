import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  stock: number;
  isActive: boolean;
  recipeId?: string;
}

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  updateStock: (productId: string, quantity: number) => Promise<void>;
  getAvailableProducts: () => Product[];
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Erro ao buscar produtos:', error);
    } else if (data) {
      const formattedProducts: Product[] = data.map(item => ({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        image: item.image || '',
        description: item.description || '',
        rating: Number(item.rating || 5),
        reviews: item.reviews || 0,
        stock: item.stock || 0,
        isActive: item.is_active,
        recipeId: item.recipe_id
      }));
      setProducts(formattedProducts);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    const { data, error } = await supabase
      .from('products')
      .insert([{
        name: productData.name,
        price: productData.price,
        image: productData.image,
        description: productData.description,
        rating: productData.rating,
        reviews: productData.reviews,
        stock: productData.stock,
        is_active: productData.isActive,
        recipe_id: productData.recipeId
      }])
      .select()
      .single();

    if (error) throw error;
    if (data) await fetchProducts();
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    const updateData: any = {};
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.price !== undefined) updateData.price = updates.price;
    if (updates.image !== undefined) updateData.image = updates.image;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.stock !== undefined) updateData.stock = updates.stock;
    if (updates.isActive !== undefined) updateData.is_active = updates.isActive;
    if (updates.recipeId !== undefined) updateData.recipe_id = updates.recipeId;

    const { error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id);

    if (error) throw error;
    await fetchProducts();
  };

  const removeProduct = async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    await fetchProducts();
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const updateStock = async (productId: string, quantity: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const newStock = Math.max(0, product.stock + quantity);
    await updateProduct(productId, { stock: newStock });
  };

  const getAvailableProducts = () => {
    return products.filter(product => product.stock > 0 && product.isActive);
  };

  return (
    <ProductsContext.Provider value={{
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
    </ProductsContext.Provider>
  );
};