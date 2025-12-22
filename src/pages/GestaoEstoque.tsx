import { ArrowLeft, Search, Package, AlertTriangle, CheckCircle, MoreVertical, Edit, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { showSuccess, showError } from "@/utils/toast";

const GestaoEstoque = () => {
  const [activeTab, setActiveTab] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [inventoryItems, setInventoryItems] = useState([]);
  const [products, setProducts] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const loadInventoryItems = () => {
      try {
        const storedItems = localStorage.getItem('inventoryItems');
        if (storedItems) {
          setInventoryItems(JSON.parse(storedItems));
        } else {
          setInventoryItems([]);
        }
      } catch (error) {
        console.error('Error loading inventory items:', error);
        setInventoryItems([]);
      }
    };

    const loadProducts = () => {
      try {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts));
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      }
    };

    loadInventoryItems();
    loadProducts();
  }, []);

  const filteredItems = () => {
    let items = [];
    if (activeTab === "Todos") {
      items = [...inventoryItems, ...products];
    } else if (activeTab === "Insumos") {
      items = inventoryItems;
    } else if (activeTab === "Produtos") {
      items = products;
    }

    return items.filter(item => {
      const name = item.name || item.title || "";
      return name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  const getIcon = (iconName) => {
    const icons = {
      Cookie: "cookie",
      Package: "inventory_2",
      ChefHat: "restaurant",
      Archive: "archive",
      IceCream: "icecream",
      Tag: "tag"
    };
    return icons[iconName] || "inventory_2";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Baixo":
        return "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/10";
      case "Crítico":
        return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-500/10";
      default:
        return "";
    }
  };

  const getStatusIcon = (status) => {
    if (status === "Baixo" || status === "Crítico") {
      return <AlertTriangle className="w-3 h-3" />;
    }
    return null;
  };

  const totalItems = inventoryItems.length + products.length;
  const lowStockItems = inventoryItems.filter(item => item.status === "Baixo" || item.status === "Crítico").length;
  const outOfStockProducts = products.filter(product => product.stock === 0).length;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            to="/visao-geral"
            className="flex items-center justify-center size-10 rounded-full text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col flex-1 text-center">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Administração</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Gestão de Estoque</h1>
          </div>
          <Button size="sm" className="size-10 rounded-full p-0" asChild>
            <Link to="/add-insumo">
              <Plus size={24} />
            </Link>
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
            placeholder="Buscar no estoque..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 lg:px-0 max-w-7xl mx-auto">
        <div className="flex justify-center gap-2 lg:gap-8">
          <button
            onClick={() => setActiveTab("Todos")}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 flex-1 lg:flex-none lg:px-6 transition-colors ${
              activeTab === "Todos" ? "border-b-primary text-primary dark:text-primary" : "border-b-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">Todos</p>
          </button>
          <button
            onClick={() => setActiveTab("Insumos")}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 flex-1 lg:flex-none lg:px-6 transition-colors ${
              activeTab === "Insumos" ? "border-b-primary text-primary dark:text-primary" : "border-b-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">Insumos</p>
          </button>
          <button
            onClick={() => setActiveTab("Produtos")}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 flex-1 lg:flex-none lg:px-6 transition-colors ${
              activeTab === "Produtos" ? "border-b-primary text-primary dark:text-primary" : "border-b-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">Produtos</p>
          </button>
        </div>
      </div>

      {/* Summary Status */}
      <div className="px-4 mb-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Visão Geral</p>
        <div className="flex gap-4 mt-2">
          <div className="flex flex-1 flex-col gap-1 rounded-xl bg-white dark:bg-surface-dark p-3 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="text-emerald-500" size={20} />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Em dia</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{totalItems - lowStockItems - outOfStockProducts}</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-1 rounded-xl bg-white dark:bg-surface-dark p-3 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="text-amber-500" size={20} />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Repor</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{lowStockItems + outOfStockProducts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* List Section Header */}
      <div className="px-4 mt-4 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Itens em Estoque</p>
        <button className="text-xs font-medium text-primary hover:underline">Ordenar por</button>
      </div>

      {/* Inventory List */}
      <div className="flex-1 px-4 pb-24 space-y-3">
        {filteredItems().length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="flex items-center justify-center size-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <Package className="text-slate-400 dark:text-slate-500" size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Nenhum item encontrado</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-xs mb-6">
              {searchTerm ? "Tente ajustar sua busca." : "Comece adicionando insumos ou produtos ao estoque."}
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30">
              <Link to="/add-insumo">
                <Plus size={20} className="mr-2" />
                Adicionar Item
              </Link>
            </Button>
          </div>
        ) : (
          filteredItems().map((item) => {
            const isProduct = item.hasOwnProperty('stock');
            const IconComponent = getIcon(item.icon);
            return (
              <div
                key={item.id}
                className="group relative flex items-center gap-4 px-4 py-3 hover:bg-slate-50 dark:hover:bg-surface-dark/50 transition-colors border-b border-slate-100 dark:border-slate-800/50"
              >
                <div className="relative shrink-0">
                  <div className="flex items-center justify-center rounded-xl bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-slate-700 shrink-0 size-14 text-slate-500 dark:text-slate-400">
                    <span className="material-symbols-outlined text-[24px]">{IconComponent}</span>
                  </div>
                  {(item.status === "Baixo" || item.status === "Crítico" || (isProduct && item.stock === 0)) && (
                    <div className={`absolute -bottom-1 -right-1 size-5 rounded-full flex items-center justify-center border-2 border-white dark:border-background-dark ${
                      item.status === "Crítico" || (isProduct && item.stock === 0) ? "bg-red-500" : "bg-amber-500"
                    }`}>
                      {getStatusIcon(item.status)}
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className={`text-base font-semibold truncate pr-2 ${
                      (item.status === "Esgotado" || (isProduct && item.stock === 0)) ? "text-slate-400 dark:text-slate-500" : "text-slate-800 dark:text-slate-100"
                    }`}>
                      {item.name}
                    </p>
                    {(item.status === "Baixo" || item.status === "Crítico" || (isProduct && item.stock === 0)) && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${getStatusColor(item.status || "Crítico")}`}>
                        {item.status || "Esgotado"}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                      {isProduct ? `${item.stock} un` : `${item.quantity} ${item.unit}`}
                    </p>
                    {item.minQuantity && (
                      <>
                        <span className="size-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                        <p className="text-slate-400 dark:text-slate-500 text-xs">Mín: {item.minQuantity}</p>
                      </>
                    )}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-white p-2">
                      <MoreVertical size={20} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="cursor-pointer">
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Excluir</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 w-full bg-white/90 dark:bg-surface-dark/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-50">
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <ArrowLeft size={20} />
          <span className="text-[10px] font-medium">Início</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-primary">
          <Package size={20} />
          <span className="text-[10px] font-medium">Estoque</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <CheckCircle size={20} />
          <span className="text-[10px] font-medium">Pedidos</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <MoreVertical size={20} />
          <span className="text-[10px] font-medium">Ajustes</span>
        </button>
      </nav>
    </div>
  );
};

export default GestaoEstoque;