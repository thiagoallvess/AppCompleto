import { ArrowLeft, Plus, Search, CheckCircle, AlertTriangle, MoreVertical, Cookie, Package, ChefHat, Archive, IceCream, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const GestaoInsumos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filters = ["Todos", "Ingredientes", "Embalagens", "Baixo Estoque"];

  const inventoryItems = [
    {
      id: 1,
      name: "Leite Ninho",
      quantity: "2.5 kg",
      minQuantity: "3 kg",
      status: "Baixo",
      statusColor: "amber",
      icon: Cookie,
      category: "Ingredientes"
    },
    {
      id: 2,
      name: "Leite Condensado",
      quantity: "12 caixas (395g)",
      minQuantity: null,
      status: "Normal",
      statusColor: "normal",
      icon: Package,
      category: "Ingredientes"
    },
    {
      id: 3,
      name: "Nutella",
      quantity: "3 kg",
      minQuantity: null,
      status: "Normal",
      statusColor: "normal",
      icon: ChefHat,
      category: "Ingredientes"
    },
    {
      id: 4,
      name: "Saquinho 5x24",
      quantity: "50 un",
      minQuantity: "200 un",
      status: "Crítico",
      statusColor: "red",
      icon: Archive,
      category: "Embalagens"
    },
    {
      id: 5,
      name: "Liga Neutra",
      quantity: "1 kg",
      minQuantity: null,
      status: "Normal",
      statusColor: "normal",
      icon: IceCream,
      category: "Ingredientes"
    },
    {
      id: 6,
      name: "Fita de Cetim",
      quantity: "5 rolos",
      minQuantity: null,
      status: "Normal",
      statusColor: "normal",
      icon: Tag,
      category: "Embalagens"
    }
  ];

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "Todos" ||
                         (activeFilter === "Baixo Estoque" && (item.status === "Baixo" || item.status === "Crítico")) ||
                         item.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    if (status === "Baixo" || status === "Crítico") {
      return <AlertTriangle className="w-3 h-3" />;
    }
    return null;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Baixo":
        return "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/10";
      case "Crítico":
        return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-500/10";
      default:
        return "";
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/50">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center justify-center size-10 rounded-full text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
        </div>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">Gestão de Insumos</h1>
        <div className="flex items-center gap-2">
          <Button size="sm" className="size-10 rounded-full p-0" asChild>
            <Link to="/add-insumo">
              <Plus size={20} />
            </Link>
          </Button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            className="pl-10 h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
            placeholder="Buscar insumo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 px-4 py-2 overflow-x-auto no-scrollbar pb-4">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            size="sm"
            className={`h-9 shrink-0 px-4 ${
              activeFilter === filter
                ? "bg-primary hover:bg-primary/90"
                : "bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
            } ${filter === "Baixo Estoque" ? "border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Summary Status */}
      <div className="px-4 mb-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Visão Geral</p>
        <div className="flex gap-4 mt-2">
          <div className="flex-1 bg-white dark:bg-surface-dark p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-3">
            <div className="size-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">24</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Em dia</p>
            </div>
          </div>
          <div className="flex-1 bg-white dark:bg-surface-dark p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-3">
            <div className="size-8 rounded-lg bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <AlertTriangle size={20} className="fill-current" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">3</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Repor</p>
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
      <div className="flex flex-col pb-24">
        {filteredItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="group relative flex items-center gap-4 px-4 py-3 hover:bg-slate-50 dark:hover:bg-surface-dark/50 transition-colors border-b border-slate-100 dark:border-slate-800/50"
            >
              <div className="relative shrink-0">
                <div className="flex items-center justify-center rounded-xl bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-slate-700 shrink-0 size-14 text-slate-500 dark:text-slate-400">
                  <IconComponent size={24} />
                </div>
                {(item.status === "Baixo" || item.status === "Crítico") && (
                  <div className={`absolute -bottom-1 -right-1 size-5 rounded-full flex items-center justify-center border-2 border-white dark:border-background-dark ${
                    item.statusColor === "red" ? "bg-red-500" : "bg-amber-500"
                  }`}>
                    {getStatusIcon(item.status)}
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="text-slate-900 dark:text-white text-base font-semibold leading-tight truncate pr-2">{item.name}</p>
                  {(item.status === "Baixo" || item.status === "Crítico") && (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{item.quantity}</p>
                  {item.minQuantity && (
                    <>
                      <span className="size-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                      <p className="text-slate-400 dark:text-slate-500 text-xs">Mín: {item.minQuantity}</p>
                    </>
                  )}
                </div>
              </div>
              <button className="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-white p-2">
                <MoreVertical size={20} />
              </button>
            </div>
          );
        })}
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
          <div className="size-10 -mt-8 bg-primary rounded-full shadow-lg shadow-primary/30 flex items-center justify-center text-white mb-1 border-4 border-background-light dark:border-background-dark">
            <Plus size={20} />
          </div>
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

export default GestaoInsumos;