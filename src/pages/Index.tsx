import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, ShoppingCart, Home, Search as SearchIcon, Heart, User, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../contexts/ProductsContext";
import { showSuccess } from "../utils/toast";
import MainDrawer from "../components/MainDrawer";
import StoreStatusBanner from "../components/StoreStatusBanner";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const { addItem } = useCart();
  const { products } = useProducts();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    setAddedItems(prev => new Set(prev).add(product.id));
    showSuccess(`${product.name} adicionado ao carrinho!`);

    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 2000);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center p-4 pb-2 justify-between max-w-md mx-auto lg:max-w-7xl lg:px-6 w-full">
          <div className="flex items-center gap-3">
            <MainDrawer />
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Geladinhos Gourmet</h1>
          </div>
          <Link to="/cart" className="relative">
            <div className="flex size-10 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
              <ShoppingCart className="text-slate-900 dark:text-white" size={24} />
            </div>
          </Link>
        </div>
      </header>

      <StoreStatusBanner />

      <div className="px-4 py-4 w-full">
        <div className="relative flex items-center w-full h-12 rounded-xl bg-white dark:bg-surface-dark shadow-sm border border-slate-200 dark:border-slate-800 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
          <div className="grid place-items-center h-full w-12 text-slate-400 dark:text-slate-500">
            <SearchIcon size={20} />
          </div>
          <input
            className="peer h-full w-full outline-none text-sm text-slate-700 dark:text-slate-200 pr-2 bg-transparent placeholder-slate-400 dark:placeholder-slate-600 font-medium border-none focus:ring-0"
            placeholder="Buscar geladinhos..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <main className="flex-1 px-4 pb-24">
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:max-w-7xl lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              <Link to={`/product-details?id=${product.id}`} className="flex-1 flex flex-col">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2 flex-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-3 mt-auto">
                    <span className="text-xl font-bold text-primary">
                      R$ {product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="px-4 pb-4">
                <Button
                  onClick={() => handleAddToCart(product)}
                  className={`w-full h-10 rounded-lg font-semibold text-sm transition-all duration-300 ${
                    addedItems.has(product.id)
                      ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30'
                      : 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {addedItems.has(product.id) ? (
                      <>
                        <span className="text-green-100">✓</span>
                        <span>Adicionado</span>
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        <span>Adicionar</span>
                      </>
                    )}
                  </div>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg pb-safe">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto lg:max-w-none lg:px-6">
          <button className="flex flex-col items-center justify-center w-full h-full text-primary space-y-1">
            <Home size={24} />
            <span className="text-[10px] font-medium">Início</span>
          </button>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <SearchIcon size={24} />
            <span className="text-[10px] font-medium">Buscar</span>
          </button>
          <Link to="/cashback" className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <DollarSign size={24} />
            <span className="text-[10px] font-medium">Cashback</span>
          </Link>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <Heart size={24} />
            <span className="text-[10px] font-medium">Favoritos</span>
          </button>
          <Link to="/perfil" className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <User size={24} />
            <span className="text-[10px] font-medium">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;