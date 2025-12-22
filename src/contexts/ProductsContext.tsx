import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  stock: number; // Novo campo para controlar o estoque
  isActive: boolean; // Novo campo para controlar se o produto está ativo
}

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  updateStock: (productId: string, quantity: number) => void; // Novo método para atualizar estoque
  getAvailableProducts: () => Product[]; // Novo método para produtos disponíveis (estoque > 0 e ativo)
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

  // Load products from localStorage on mount
  useEffect(() => {
    const loadProducts = () => {
      try {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts));
        } else {
          // Initialize with default products if none exist
          const defaultProducts: Product[] = [
            {
              id: 'morango-nordeste',
              name: 'Morango do Nordeste',
              price: 5.00,
              image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQJMZDkn5s2Q1Rhu7VTT0wSbpu0Zs2136hUamFu3BKQVuVxBYqmKfH536oC5A6GdhLNWW4d1969s1kG6Ls7kvpSWoUspr5Fuj8dyZGJ4PD7EMMXpJ_PPxtQh65cra50RKLF_NdMNiXBiDXDJnu0grwaF4pBkZGWF6nJi1cxo0vD9NzqnzvF4uofppwoWVyz0YP8VYPnbnueXZdTm401ZQF_B-qNF4fCtm7TQHb-fMOHEiGp-FoBNbKl2Lnst7IIgnMCMOoitX7Bw',
              description: 'Uma combinação cremosa de pedaços reais de morango do nordeste com água de coco fresca. Refrescante e natural, feito com frutas selecionadas.',
              rating: 4.8,
              reviews: 120,
              stock: 0, // Inicialmente sem estoque
              isActive: true
            },
            {
              id: 'trufa-belga',
              name: 'Trufa Belga',
              price: 7.50,
              image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBus_8lGRett6zFf-4fJSGldJ0STWFEBw_SZekfBqNyynVNaF4_WfGunFT5v6pWRrj9Pzhsd61_G02tUFdYTkYIFdLW6PC2p5u4tRg33ImZbPqGATzcYXfZBaf3LSZFAWMLZYzu7yPTQFP4_fpbq7jajeIOqhencVB0NOcy9h5Wj5iitogBDGF1VM5gVdeVIfeSEcCQiScnF4HZBGdQkaeTxGTJYQgHSGDMTK02POz4eov40OlLEWZxBYwCvktcnawn6WXisLBeQ',
              description: 'Chocolate belga 70% cacau com um recheio de ganache cremoso. Intenso e sofisticado, perfeito para os amantes de chocolate.',
              rating: 4.9,
              reviews: 85,
              stock: 0,
              isActive: true
            },
            {
              id: 'coco-puro',
              name: 'Coco Puro',
              price: 6.00,
              image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYiu7ZJdFq90OvDRaoPkf5fEtK5ccvx5kSeRWpJRtIUqya8o6rgneU4E7-AXsnmk9hbopLSGiKYvUGig4LbbrLXjBBF44tQDuacjFT6Tj2AWl5i1cFRcAyGDXlOoITqEZGyBmUlmwu-7VOAilZSUw_jZFDFafa3DlQGenUdVsh120uhLW8CjBPrzXV2uofK17BsO1UcH7cZFsimmzRJRbXdntZgdmO52bxy8TA00MudEggA9q5bcEEhW6BbSNNGOvnUtD0rUeshA',
              description: 'Receita tradicional cremosa feita com leite de coco fresco artesanal. O equilíbrio perfeito entre o doce e o sabor marcante.',
              rating: 4.7,
              reviews: 95,
              stock: 0,
              isActive: true
            },
            {
              id: 'caipirinha-limao',
              name: 'Caipirinha de Limão',
              price: 8.00,
              image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBok8yIrORTI6Lo3PMIFfA8VyYPJJbpOBOGlPKTfImRR7lXWzt1dF7QTX5rloeO_onQ_0PjKst-vOmUW9HAfoY2hEfU4H9X5EmpCsvH5JjcsZo7P_siNi6s9-sYHONHRpV9Ce7wa0KMeJpXssUSp6JObGbp4Nr5c6cYQ8l29CkiYpYGC0cF7l1o6-rcUJPldtRh2ZqkOetma7OIWV6r-jEbcEfv7xhvi1A6nwwRhZBgvLCoFN5FAcvjgyM6PV_ue3onI8bp--iOYg',
              description: 'O clássico brasileiro em forma de geladinho. Cachaça, limão taiti e açúcar na medida certa para refrescar seu dia.',
              rating: 4.6,
              reviews: 78,
              stock: 0,
              isActive: true
            }
          ];
          setProducts(defaultProducts);
          localStorage.setItem('products', JSON.stringify(defaultProducts));
        }
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      }
    };

    loadProducts();
  }, []);

  // Save to localStorage whenever products change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product =>
      product.id === id ? { ...product, ...updates } : product
    ));
  };

  const removeProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const updateStock = (productId: string, quantity: number) => {
    setProducts(prev => prev.map(product =>
      product.id === productId ? { ...product, stock: Math.max(0, product.stock + quantity) } : product
    ));
  };

  const getAvailableProducts = () => {
    return products.filter(product => product.stock > 0 && product.isActive);
  };

  return (
    <ProductsContext.Provider value={{
      products,
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