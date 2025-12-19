import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Receipt, Users, IceCream, BarChart, Settings, Home, Search, Heart, User } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { showSuccess } from "../utils/toast";

const Index = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [addedProducts, setAddedProducts] = useState(new Set());
  const { addItem } = useCart();

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
      description: 'O clássico brasileiro em forma de geladinho.',
      rating: 4.6,
      reviews: 78
    }
  ];

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    setAddedProducts(prev => new Set(prev).add(product.id));
    showSuccess(`${product.name} adicionado ao carrinho!`);
    setTimeout(() => {
      setAddedProducts(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 1500);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-text-primary antialiased">
      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-80 transform bg-background-light dark:bg-background-dark shadow-xl transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-bold">Menu</h2>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={20} />
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

      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex size-10 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
          <Menu className="text-slate-900 dark:text-white" size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Geladinho Gourmet</h1>
        <Link to="/cart" className="relative flex size-10 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
          <Heart className="text-slate-900 dark:text-white" size={24} />
        </Link>
      </header>

      {/* Hero Section */}
      <div className="relative w-full h-[45vh] shrink-0">
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h2 className="text-4xl font-bold mb-2 text-center">Sabores Artesanais</h2>
          <p className="text-lg text-center">Geladinhos gourmet feitos com amor</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 px-4 py-6 pb-24">
        <h3 className="text-2xl font-bold mb-4">Nossos Sabores</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-surface-dark rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800">
              <Link to={`/product-details?id=${product.id}`}>
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url('${product.image}')` }}
                ></div>
              </Link>
              <div className="p-4">
                <Link to={`/product-details?id=${product.id}`}>
                  <h4 className="text-lg font-bold mb-2">{product.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{product.description}</p>
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">R$ {product.price.toFixed(2)}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      addedProducts.has(product.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                  >
                    {addedProducts.has(product.id) ? '✓ Adicionado' : 'Adicionar'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg pb-safe">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto lg:max-w-none lg:px-6">
          <Link to="/" className="flex flex-col items-center justify-center w-full h-full text-primary space-y-1">
            <Home size={24} />
            <span className="text-[10px] font-medium">Início</span>
          </Link>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <Search size={24} />
            <span className="text-[10px] font-medium">Buscar</span>
          </button>
          <Link to="/cashback" className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <div className="material-symbols-outlined">savings</div>
            <span className="text-[10px] font-medium">Cashback</span>
          </Link>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <Heart size={24} />
            <span className="text-[10px] font-medium">Favoritos</span>
          </button>
          <Link to="/perfil" className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <User size={24} />
            <span className="text-[10px] font-medium">Perfil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Index;