import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, Home, Receipt, Users, Settings, BarChart, IceCream, Heart, ShoppingCart, Star } from "lucide-react";
import { useCart } from "../contexts/CartContext";

const Index = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { totalItems } = useCart();

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
      description: 'O clássico brasileiro em forma de geladinho. Cachaça, limão taiti e açúcar na medida certa.',
      rating: 4.6,
      reviews: 78
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto lg:max-w-7xl lg:px-6">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <Menu className="text-slate-900 dark:text-white" size={24} />
          </button>
          <h1 className="text-lg font-bold leading-tight tracking-tight">Geladinhos Gourmet</h1>
          <Link
            to="/cart"
            className="relative flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <ShoppingCart className="text-slate-900 dark:text-white" size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-4 max-w-md mx-auto lg:max-w-7xl lg:px-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Buscar geladinhos..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Products Grid */}
      <main className="px-4 pb-24 max-w-md mx-auto lg:max-w-7xl lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product-details?id=${product.id}`}
              className="block"
            >
              <article className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-all active:scale-[0.99]">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2">{product.name}</h3>
                    <div className="text-right ml-2">
                      <span className="text-xl font-bold text-primary">R$ {product.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">{product.description}</p>
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-500 fill-current" size={16} />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{product.rating}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">({product.reviews} avaliações)</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
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
          <Link to="/cart" className="relative flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <ShoppingCart size={24} />
            <span className="text-[10px] font-medium">Carrinho</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 right-1/2 translate-x-1/2 bg-primary text-white text-xs font-bold rounded-full min-w-[18px] h-4 flex items-center justify-center px-1">
                {totalItems}
              </span>
            )}
          </Link>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <Heart size={24} />
            <span className="text-[10px] font-medium">Favoritos</span>
          </button>
          <Link to="/perfil" className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <span className="text-[10px] font-medium">Perfil</span>
          </Link>
        </div>
      </nav>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-surface-dark shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Menu</h2>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="flex size-8 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="text-slate-900 dark:text-white" size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
          <div className="p-4">
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
                  to="/visao-geral"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <BarChart size={20} />
                  <span>Visão Geral</span>
                </Link>
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
                  to="/add-produto"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <div className="material-symbols-outlined">add</div>
                  <span>Adicionar Produto</span>
                </Link>
                <Link
                  to="/gestao-receitas"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <div className="material-symbols-outlined">receipt_long</div>
                  <span>Receitas</span>
                </Link>
                <Link
                  to="/gestao-producao"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <div className="material-symbols-outlined">conveyor_belt</div>
                  <span>Produção</span>
                </Link>
                <Link
                  to="/gestao-insumos"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <div className="material-symbols-outlined">inventory_2</div>
                  <span>Insumos</span>
                </Link>
                <Link
                  to="/clientes"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <Users size={20} />
                  <span>Clientes</span>
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