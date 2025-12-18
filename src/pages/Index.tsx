import { Menu, ShoppingCart, Home, Search, Heart, User, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Index = () => {
  const { addItem, totalItems } = useCart();
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());

  const handleAddToCart = (product: { id: string; name: string; price: number; image: string }) => {
    addItem(product);
    setAddedProducts(prev => new Set(prev).add(product.id));
  };

  const products = [
    {
      id: 'morango-nordeste',
      name: 'Morango do Nordeste',
      price: 5.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQJMZDkn5s2Q1Rhu7VTT0wSbpu0Zs2136hUamFu3BKQVuVxBYqmKfH536oC5A6GdhLNWW4d1969s1kG6Ls7kvpSWoUspr5Fuj8dyZGJ4PD7EMMXpJ_PPxtQh65cra50RKLF_NdMNiXBiDXDJnu0grwaF4pBkZGWF6nJi1cxo0vD9NzqnzvF4uofppwoWVyz0YP8VYPnbnueXZdTm401ZQF_B-qNF4fCtm7TQHb-fMOHEiGp-FoBNbKl2Lnst7IIgnMCMOoitX7Bw',
      description: 'Feito com pedaços reais da fruta e água de coco. Refrescante e natural.',
      badge: 'FRUTA REAL',
      ingredients: ['Morango', 'Água de Coco', 'Açúcar']
    },
    {
      id: 'trufa-belga',
      name: 'Trufa Belga',
      price: 7.50,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBus_8lGRett6zFf-4fJSGldJ0STWFEBw_SZekfBqNyynVNaF4_WfGunFT5v6pWRrj9Pzhsd61_G02tUFdYTkYIFdLW6PC2p5u4tRg33ImZbPqGATzcYXfZBaf3LSZFAWMLZYzu7yPTQFP4_fpbq7jajeIOqhencVB0NOcy9h5Wj5iitogBDGF1VM5gVdeVIfeSEcCQiScnF4HZBGdQkaeTxGTJYQgHSGDMTK02POz4eov40OlLEWZxBYwCvktcnawn6WXisLBeQ',
      description: 'Chocolate 70% cacau com um recheio de ganache cremoso. Intenso e sofisticado.',
      ingredients: ['Chocolate 70%', 'Ganache', 'Creme de Leite']
    },
    {
      id: 'coco-puro',
      name: 'Coco Puro',
      price: 6.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYiu7ZJdFq90OvDRaoPkf5fEtK5ccvx5kSeRWpJRtIUqya8o6rgneU4E7-AXsnmk9hbopLSGiKYvUGig4LbbrLXjBBF44tQDuacjFT6Tj2AWl5i1cFRcAyGDXlOoITqEZGyBmUlmwu-7VOAilZSUw_jZFDFafa3DlQGenUdVsh120uhLW8CjBPrzXV2uofK17BsO1UcH7cZFsimmzRJRbXdntZgdmO52bxy8TA00MudEggA9q5bcEEhW6BbSNNGOvnUtD0rUeshA',
      description: 'Receita tradicional cremosa feita com leite de coco fresco artesanal.',
      ingredients: ['Leite de Coco', 'Creme de Leite', 'Açúcar']
    },
    {
      id: 'caipirinha-limao',
      name: 'Caipirinha de Limão',
      price: 8.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBok8yIrORTI6Lo3PMIFfA8VyYPJJbpOBOGlPKTfImRR7lXWzt1dF7QTX5rloeO_onQ_0PjKst-vOmUW9HAfoY2hEfU4H9X5EmpCsvH5JjcsZo7P_siNi6s9-sYHONHRpV9Ce7wa0KMeJpXssUSp6JObGbp4Nr5c6cYQ8l29CkiYpYGC0cF7l1o6-rcUJPldtRh2ZqkOetma7OIWV6r-jEbcEfv7xhvi1A6nwwRhZBgvLCoFN5FAcvjgyM6PV_ue3onI8bp--iOYg',
      description: 'O clássico brasileiro em forma de geladinho. Cachaça, limão taiti e açúcar na medida.',
      badge: '+18',
      ingredients: ['Cachaça', 'Limão Taiti', 'Açúcar', 'Gelo']
    }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-text-primary pb-24 min-h-screen">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md transition-colors duration-300">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto lg:max-w-none lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <button className="text-slate-900 dark:text-text-primary flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">G</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">Geladinhos Gourmet</h2>
                    <p className="text-sm text-muted-foreground">Bem-vindo de volta!</p>
                  </div>
                </div>
                <nav className="flex flex-col gap-2">
                  <Link
                    to="/"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <Home size={20} />
                    <span>Início</span>
                  </Link>
                  <Link
                    to="/cashback"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <DollarSign size={20} />
                    <span>Meu Cashback</span>
                  </Link>
                  <Link
                    to="/indicacao"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <Heart size={20} />
                    <span>Indicação</span>
                  </Link>
                  <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
                    <Search size={20} />
                    <span>Buscar</span>
                  </button>
                  <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
                    <Heart size={20} />
                    <span>Favoritos</span>
                  </button>
                  <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
                    <User size={20} />
                    <span>Perfil</span>
                  </button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-slate-900 dark:text-text-primary text-lg font-bold leading-tight tracking-tight flex-1 text-center">
            Geladinhos Gourmet
          </h1>
          <Link to="/cart" className="flex size-10 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors relative">
            <ShoppingCart className="text-slate-900 dark:text-text-primary" size={24} />
            {totalItems > 0 && (
              <span className="absolute top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm ring-2 ring-background-light dark:ring-background-dark">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </header>
      <main className="max-w-md mx-auto lg:max-w-7xl flex flex-col gap-6 p-4">
        {/* Categories (Chips) */}
        <section className="w-full overflow-hidden">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {/* Active Chip */}
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary px-5 shadow-sm shadow-primary/25 transition-transform active:scale-95">
              <span className="text-white text-sm font-semibold">Todos</span>
            </button>
            {/* Inactive Chips */}
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 px-5 transition-transform active:scale-95 hover:bg-gray-50 dark:hover:bg-gray-800">
              <span className="text-slate-600 dark:text-text-secondary text-sm font-medium">Cremosos</span>
            </button>
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 px-5 transition-transform active:scale-95 hover:bg-gray-50 dark:hover:bg-gray-800">
              <span className="text-slate-600 dark:text-text-secondary text-sm font-medium">Frutas</span>
            </button>
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 px-5 transition-transform active:scale-95 hover:bg-gray-50 dark:hover:bg-gray-800">
              <span className="text-slate-600 dark:text-text-secondary text-sm font-medium">Detox</span>
            </button>
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 px-5 transition-transform active:scale-95 hover:bg-gray-50 dark:hover:bg-gray-800">
              <span className="text-slate-600 dark:text-text-secondary text-sm font-medium">Alcoólicos</span>
            </button>
          </div>
        </section>
        {/* Product List */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product-details?id=${product.id}`}
              className="block"
            >
              <div className="@container">
                <div className="flex flex-col sm:flex-row items-stretch rounded-xl bg-white dark:bg-surface-dark shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md cursor-pointer">
                  <div
                    className="w-full sm:w-32 h-40 sm:h-auto bg-center bg-no-repeat bg-cover shrink-0 relative"
                    style={{
                      backgroundImage: `url("${product.image}")`,
                    }}
                  >
                    {/* Badge on image for mobile view */}
                    {product.badge && (
                      <div className={`absolute top-2 left-2 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-white sm:hidden ${
                        product.badge === '+18' ? 'bg-purple-600/80' : 'bg-black/60'
                      }`}>
                        {product.badge}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-between p-4 grow">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-slate-900 dark:text-text-primary text-lg font-bold leading-tight">{product.name}</h3>
                      </div>
                      <p className="text-slate-500 dark:text-text-secondary text-sm font-medium leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-slate-900 dark:text-text-primary text-lg font-bold">R$ {product.price.toFixed(2)}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className={`flex items-center justify-center h-9 px-4 rounded-lg text-white text-sm font-bold shadow-sm transition-all active:scale-95 ${
                          addedProducts.has(product.id)
                            ? 'bg-green-500 hover:bg-green-600 shadow-green-500/30'
                            : 'bg-primary hover:bg-primary/90 shadow-primary/30'
                        }`}
                      >
                        {addedProducts.has(product.id) ? (
                          <>
                            <span>✓</span>
                            Adicionado
                          </>
                        ) : (
                          'Adicionar'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </main>
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg pb-safe">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto lg:max-w-none lg:px-6">
          <button className="flex flex-col items-center justify-center w-full h-full text-primary space-y-1">
            <Home size={24} />
            <span className="text-[10px] font-medium">Início</span>
          </button>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <Search size={24} />
            <span className="text-[10px] font-medium">Buscar</span>
          </button>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <Heart size={24} />
            <span className="text-[10px] font-medium">Favoritos</span>
          </button>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <User size={24} />
            <span className="text-[10px] font-medium">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;