import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, IceCream, Receipt, Settings, BarChart, ShoppingCart, Users, Plus } from "lucide-react";
import { useCart } from "../contexts/CartContext";

const Index = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { totalItems, addItem } = useCart();

  const products = [
    {
      id: 'morango-nordeste',
      name: 'Morango do Nordeste',
      price: 5.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQJMZDkn5s2Q1Rhu7VTT0wSbpu0Zs2136hUamFu3BKQVuVxBYqmKfH536oC5A6GdhLNWW4d1969s1kG6Ls7kvpSWoUspr5Fuj8dyZGJ4PD7EMMXpJ_PPxtQh65cra50RKLF_NdMNiXBiDXDJnu0grwaF4pBkZGWF6nJi1cxo0vD9NzqnzvF4uofppwoWVyz0YP8VYPnbnueXZdTm401ZQF_B-qNF4fCtm7TQHb-fMOHEiGp-FoBNbKl2Lnst7IIgnMCMOoitX7Bw',
      description: 'Uma combinação cremosa de pedaços reais de morango do nordeste com água de coco fresca.',
      rating: 4.8,
      reviews: 120
    },
    {
      id: 'trufa-belga',
      name: 'Trufa Belga',
      price: 7.50,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBus_8lGRett6zFf-4fJSGldJ0STWFEBw_SZekfBqNyynVNaF4_WfGunFT5v6pWRrj9Pzhsd61_G02tUFdYTkYIFdLW6PC2p5u4tRg33ImZbPqGATzcYXfZBaf3LSZFAWMLZYzu7yPTQFP4_fpbq7jajeIOqhencVB0NOcy9h5Wj5iitogBDGF1VM5gVdeVIfeSEcCQiScnF4HZBGdQkaeTxGTJYQgHSGDMTK02POz4eov40OlLEWZxBYwCvktcnawn6WXisLBeQ',
      description: 'Chocolate belga 70% cacau com um recheio de ganache cremoso.',
      rating: 4.9,
      reviews: 85
    },
    {
      id: 'coco-puro',
      name: 'Coco Puro',
      price: 6.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYiu7ZJdFq90OvDRaoPkf5fEtK5ccvx5kSeRWpJRtIUqya8o6rgneU4E7-AXsnmk9hbopLSGiKYvUGig4LbbrLXjBBF44tQDuacjFT6Tj2AWl5i1cFRcAyGDXlOoITqEZGyBmUlmwu-7VOAilZSUw_jZFDFafa3DlQGenUdVsh120uhLW8CjBPrzXV2uofK17BsO1UcH7cZFsimmzRJRbXdntZgdmO52bxy8TA00MudEggA9q5bcEEhW6BbSNNGOvnUtD0rUeshA',
      description: 'Receita tradicional cremosa feita com leite de coco fresco artesanal.',
      rating: 4.7,
      reviews: 95
    },
    {
      id: 'caipirinha-limao',
      name: 'Caipirinha de Limão',
      price: 8.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBok8yIrORTI6Lo3PMIFfA8VyYPJJbpOBOGlPKTfImRR7lXWzt1dF7QTX5rloeO_onQ_0PjKst-vOmUW9HAfoY2hEfU4H9X5EmpCsvH5JjcsZo7P_siNi6s9-sYHONHRpV9Ce7wa0KMeJpXssUSp6JObGbp4Nr5c6cYQ8l29CkiYpYGC0cF7l1o6-rcUJPldtRh2ZqkOetma7OIWV6r-jEbcEfv7xhvi1A6nwwRhZBgvLCoFN5FAcvjgyM6PV_ue3onI8bp--iOYg',
      description: 'O clássico brasileiro em forma de geladinho. Cachaça, limão taiti e açúcar.',
      rating: 4.6,
      reviews: 78
    }
  ];

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-text-primary min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto lg:max-w-7xl lg:px-6 w-full">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex size-10 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <Menu className="text-slate-900 dark:text-text-primary" size={24} />
          </button>
          <h1 className="text-slate-900 dark:text-text-primary text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">
            Geladinho Gourmet
          </h1>
          <Link
            to="/cart"
            className="relative flex size-10 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <ShoppingCart className="text-slate-900 dark:text-text-primary" size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto lg:max-w-7xl p-4 lg:px-6">
        {/* Hero Section */}
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold mb-2">Bem-vindo ao Geladinho Gourmet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Escolha seu geladinho favorito
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <Link to={`/product-details?id=${product.id}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{product.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{product.rating}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">({product.reviews})</span>
                  </div>
                  <span className="text-xl font-bold text-primary">R$ {product.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Plus size={20} />
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-surface-dark shadow-xl z-50 transform transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Menu</h2>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="flex size-8 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="text-slate-900 dark:text-white" size={20} />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Cliente Section */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                Cliente
              </h3>
              <nav className="space-y-1">
                <Link
                  to="/"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <Home size={20} />
                  <span>Início</span>
                </Link>
                <Link
                  to="/meus-pedidos"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <Receipt size={20} />
                  <span>Meus Pedidos</span>
                </Link>
                <Link
                  to="/perfil"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <div className="material-symbols-outlined">person</div>
                  <span>Perfil</span>
                </Link>
                <Link
                  to="/indicacao"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <Users size={20} />
                  <span>Indicação</span>
                </Link>
                <Link
                  to="/cashback"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <div className="material-symbols-outlined">savings</div>
                  <span>Cashback</span>
                </Link>
              </nav>
            </div>

            {/* Admin Section */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                Administração
              </h3>
              <nav className="space-y-1">
                <Link
                  to="/gestao-pedidos"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <Receipt size={20} />
                  <span>Pedidos</span>
                </Link>
                <Link
                  to="/gestao-produtos"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <IceCream size={20} />
                  <span>Produtos</span>
                </Link>
                <Link
                  to="/gestao-insumos"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <div className="material-symbols-outlined">inventory</div>
                  <span>Insumos</span>
                </Link>
                <Link
                  to="/relatorios"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <BarChart size={20} />
                  <span>Relatórios</span>
                </Link>
                <Link
                  to="/configuracoes-admin"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <Settings size={20} />
                  <span>Configurações</span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;