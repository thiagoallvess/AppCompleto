import { useState } from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, Heart, User, Menu, ShoppingCart, Star, DollarSign, Receipt, Plus, Check } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { MadeWithDyad } from "../components/made-with-dyad";
import { showSuccess } from "../utils/toast";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const { totalItems, addItem } = useCart();

  const products = [
    {
      id: 'morango-nordeste',
      name: 'Morango do Nordeste',
      price: 5.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQJMZDkn5s2Q1Rhu7VTT0wSbpu0Zs2136hUamFu3BKQVuVxBYqmKfH536oC5A6GdhLNWW4d1969s1kG6Ls7kvpSWoUspr5Fuj8dyZGJ4PD7EMMXpJ_PPxtQh65cra50RKLF_NdMNiXBiDXDJnu0grwaF4pBkZGWF6nJi1cxo0vD9NzqnzvF4uofppwoWVyz0YP8VYPnbnueXZdTm401ZQF_B-qNF4fCtm7TQHb-fMOHEiGp-FoBNbKl2Lnst7IIgnMCMOoitX7Bw',
      description: 'Uma combinação cremosa de pedaços reais de morango do nordeste com água de coco fresca. Refrescante e natural, feito com frutas selecionadas.',
      rating: 4.8,
      reviews: 120
    },
    {
      id: 'trufa-belga',
      name: 'Trufa Belga',
      price: 7.50,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBus_8lGRett6zFf-4fJSGldJ0STWFEBw_SZekfBqNyynVNaF4_WfGunFT5v6pWRrj9Pzhsd61_G02tUFdYTkYIFdLW6PC2p5u4tRg33ImZbPqGATzcYXfZBaf3LSZFAWMLZYzu7yPTQFP4_fpbq7jajeIOqhencVB0NOcy9h5Wj5iitogBDGF1VM5gVdeVIfeSEcCQiScnF4HZBGdQkaeTxGTJYQgHSGDMTK02POz4eov40OlLEWZxBYwCvktcnawn6WXisLBeQ',
      description: 'Chocolate belga 70% cacau com um recheio de ganache cremoso. Intenso e sofisticado, perfeito para os amantes de chocolate.',
      rating: 4.9,
      reviews: 85
    },
    {
      id: 'coco-puro',
      name: 'Coco Puro',
      price: 6.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYiu7ZJdFq90OvDRaoPkf5fEtK5ccvx5kSeRWpJRtIUqya8o6rgneU4E7-AXsnmk9hbopLSGiKYvUGig4LbbrLXjBBF44tQDuacjFT6Tj2AWl5i1cFRcAyGDXlOoITqEZGyBmUlmwu-7VOAilZSUw_jZFDFafa3DlQGenUdVsh120uhLW8CjBPrzXV2uofK17BsO1UcH7cZFsimmzRJRbXdntZgdmO52bxy8TA00MudEggA9q5bcEEhW6BbSNNGOvnUtD0rUeshA',
      description: 'Receita tradicional cremosa feita com leite de coco fresco artesanal. O equilíbrio perfeito entre o doce e o sabor marcante.',
      rating: 4.7,
      reviews: 95
    },
    {
      id: 'caipirinha-limao',
      name: 'Caipirinha de Limão',
      price: 8.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBok8yIrORTI6Lo3PMIFfA8VyYPJJbpOBOGlPKTfImRR7lXWzt1dF7QTX5rloeO_onQ_0PjKst-vOmUW9HAfoY2hEfU4H9X5EmpCsvH5JjcsZo7P_siNi6s9-sYHONHRpV9Ce7wa0KMeJpXssUSp6JObGbp4Nr5c6cYQ8l29CkiYpYGC0cF7l1o6-rcUJPldtRh2ZqkOetma7OIWV6r-jEbcEfv7xhvi1A6nwwRhZBgvLCoFN5FAcvjgyM6PV_ue3onI8bp--iOYg',
      description: 'O clássico brasileiro em forma de geladinho. Cachaça, limão taiti e açúcar na medida certa para refrescar seu dia.',
      rating: 4.6,
      reviews: 78
    }
  ];

  const handleAddToCart = async (product: typeof products[0]) => {
    setAddingToCart(product.id);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    
    showSuccess(`${product.name} adicionado ao carrinho!`);
    setAddingToCart(null);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-text-primary antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto lg:max-w-7xl lg:px-6">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="size-10 rounded-full p-0">
                <Menu size={24} className="text-slate-900 dark:text-text-primary" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
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
                    to="/meus-pedidos"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <Receipt size={20} />
                    <span>Meus Pedidos</span>
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
                  <Link
                    to="/perfil"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <User size={20} />
                    <span>Meu Perfil</span>
                  </Link>
                  <div className="border-t border-border my-2"></div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-1">
                    Administração
                  </div>
                  <Link
                    to="/gestao-pedidos"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <Receipt size={20} />
                    <span>Gestão de Pedidos</span>
                  </Link>
                  <Link
                    to="/gestao-insumos"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="material-symbols-outlined">inventory</div>
                    <span>Gestão de Insumos</span>
                  </Link>
                  <Link
                    to="/gestao-produtos"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="material-symbols-outlined">icecream</div>
                    <span>Gestão de Produtos</span>
                  </Link>
                  <Link
                    to="/configuracoes-admin"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="material-symbols-outlined">settings</div>
                    <span>Configurações Admin</span>
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex flex-col items-center">
            <h1 className="text-lg font-bold leading-tight tracking-tight">Geladinhos Gourmet</h1>
            <p className="text-xs text-slate-500 dark:text-text-secondary">São Paulo, SP</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="size-10 rounded-full p-0 relative">
              <Search size={24} className="text-slate-900 dark:text-text-primary" />
            </Button>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="sm" className="size-10 rounded-full p-0 relative">
                <ShoppingCart size={24} className="text-slate-900 dark:text-text-primary" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 size-5 rounded-full bg-primary text-white text-xs flex items-center justify-center p-0">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-24">
        {/* Hero Section */}
        <section className="px-4 py-6 max-w-md mx-auto lg:max-w-7xl lg:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Bem-vindo ao Geladinhos Gourmet</h2>
            <p className="text-slate-600 dark:text-text-secondary">Descubra nossos sabores artesanais feitos com ingredientes frescos</p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-all duration-200 border-slate-200 dark:border-slate-800">
                <CardContent className="p-0">
                  <Link to={`/product-details?id=${product.id}`}>
                    <div className="aspect-square overflow-hidden rounded-t-lg bg-gray-100 dark:bg-surface-dark">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-lg leading-tight">{product.name}</h3>
                        <div className="text-right">
                          <p className="text-xl font-bold text-primary">R$ {product.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-text-secondary mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-slate-500 dark:text-text-secondary">({product.reviews} avaliações)</span>
                      </div>
                    </div>
                  </Link>
                  <div className="px-4 pb-4">
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      disabled={addingToCart === product.id}
                      className={`w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 transition-all duration-200 ${
                        addingToCart === product.id ? 'scale-95 opacity-80' : 'hover:scale-105'
                      }`}
                    >
                      {addingToCart === product.id ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          <span>Adicionando...</span>
                        </>
                      ) : (
                        <>
                          <Plus size={16} />
                          <span>Adicionar</span>
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 pb-safe">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto lg:max-w-none lg:px-6">
          <Link to="/" className="flex flex-col items-center justify-center w-full h-full text-primary space-y-1">
            <Home size={24} />
            <span className="text-[10px] font-medium">Início</span>
          </Link>
          <button className="flex flex-col items-center justify-center w-full h-full text-slate-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <Search size={24} />
            <span className="text-[10px] font-medium">Buscar</span>
          </button>
          <Link to="/cart" className="flex flex-col items-center justify-center w-full h-full text-slate-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1 relative">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 right-1/2 translate-x-1/2 size-5 rounded-full bg-primary text-white text-xs flex items-center justify-center p-0">
                {totalItems}
              </Badge>
            )}
            <span className="text-[10px] font-medium">Carrinho</span>
          </Link>
          <button className="flex flex-col items-center justify-center w-full h-full text-slate-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <Heart size={24} />
            <span className="text-[10px] font-medium">Favoritos</span>
          </button>
          <Link to="/perfil" className="flex flex-col items-center justify-center w-full h-full text-slate-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <User size={24} />
            <span className="text-[10px] font-medium">Perfil</span>
          </Link>
        </div>
      </nav>

      <MadeWithDyad />
    </div>
  );
};

export default Index;