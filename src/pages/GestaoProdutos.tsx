import { ArrowLeft, Plus, Search, MoreVertical, IceCream, Receipt, Settings, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddProdutoModal from "@/components/AddProdutoModal";
import { useProducts } from "@/contexts/ProductsContext";

const GestaoProdutos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { products, removeProduct } = useProducts();

  const filters = ["Todos", "Em estoque", "Esgotado", "Rascunhos"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "Todos" ||
                         (activeFilter === "Em estoque" && product.price > 0) ||
                         (activeFilter === "Esgotado" && product.price === 0) ||
                         (activeFilter === "Rascunhos" && product.price === 0);
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (price: number) => {
    if (price === 0) return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-500/10";
    return "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10";
  };

  const getStatusDotColor = (price: number) => {
    if (price === 0) return "bg-red-500";
    return "bg-emerald-500";
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      removeProduct(productId);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            to="/"
            className="flex items-center justify-center size-10 rounded-full text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col flex-1 text-center">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Administração</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Produtos</h1>
          </div>
          <Button size="sm" className="size-10 rounded-full p-0 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30" onClick={() => setIsModalOpen(true)}>
            <Plus size={24} />
          </Button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-4 w-full">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl text-sm font-medium bg-gray-100 dark:bg-surface-dark text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
            placeholder="Buscar por sabor, ID ou categoria..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="w-full overflow-x-auto no-scrollbar pb-2 pl-4 pr-4">
        <div className="flex gap-3 min-w-max">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-none px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                  : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="flex-1 flex flex-col gap-1 px-4 py-2 pb-24">
        {/* List Header Stats */}
        <div className="flex items-center justify-between py-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>Total: {filteredProducts.length} produtos</span>
          <button className="flex items-center gap-1 cursor-pointer hover:text-primary">
            <span>Ordenar</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>

        {/* Product Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`group relative flex flex-col gap-3 bg-white dark:bg-surface-dark p-3 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all ${
                product.price === 0 ? "opacity-75 grayscale-[50%]" : ""
              }`}
            >
              <div className="flex gap-3">
                <div
                  className="shrink-0 w-20 h-20 bg-gray-200 dark:bg-slate-800 rounded-lg bg-cover bg-center overflow-hidden relative"
                  style={{
                    backgroundImage: `url("${product.image}")`,
                  }}
                >
                  {product.price === 0 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-1 min-w-0 justify-center">
                  <div className="flex items-start justify-between">
                    <h3 className={`text-base font-semibold truncate pr-2 ${
                      product.price === 0 ? "text-slate-400 dark:text-slate-500" : "text-slate-800 dark:text-slate-100"
                    }`}>
                      {product.name}
                    </h3>
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 -m-1 -mt-2">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className={`text-sm font-bold ${
                      product.price === 0 ? "text-slate-400 dark:text-slate-500" : "text-primary dark:text-blue-400"
                    }`}>
                      R$ {product.price.toFixed(2)}
                    </span>
                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${getStatusColor(product.price)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(product.price)}`}></span>
                      {product.price === 0 ? "Esgotado" : "Em estoque"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 w-full bg-white/90 dark:bg-surface-dark/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-50">
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <ArrowLeft size={20} />
          <span className="text-[10px] font-medium">Início</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-primary">
          <IceCream size={20} />
          <span className="text-[10px] font-medium">Produtos</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <Receipt size={20} />
          <span className="text-[10px] font-medium">Pedidos</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <Settings size={20} />
          <span className="text-[10px] font-medium">Ajustes</span>
        </button>
      </nav>
      {/* Safe area spacer for bottom nav */}
      <div className="h-6 w-full bg-white dark:bg-background-dark"></div>

      {/* Add Product Modal */}
      <AddProdutoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default GestaoProdutos;