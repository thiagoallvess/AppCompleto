"use client";

import { ArrowLeft, Filter, Edit, AlertTriangle, Package, IceCream, ChefHat } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useStock } from "@/contexts/StockContext";
import { useProducts } from "@/contexts/ProductsContext";
import EditStockParamsModal from "@/components/EditStockParamsModal";

const EstoqueCritico = () => {
  const { ingredients, packagingItems } = useStock();
  const { products } = useProducts();
  
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isParamsModalOpen, setIsParamsModalOpen] = useState(false);
  
  const filters = ["Todos", "Insumos", "Produtos Finais", "Embalagens"];

  // Processamento dos dados reais
  const criticalItems = useMemo(() => {
    const list: any[] = [];

    // 1. Insumos (Ingredientes)
    ingredients.forEach(item => {
      if (item.status === "Baixo" || item.status === "Crítico") {
        list.push({
          id: item.id,
          name: item.name,
          type: 'Insumo',
          status: item.status,
          statusColor: item.status === 'Crítico' ? 'red' : 'amber',
          currentStock: `${item.quantity} ${item.unit}`,
          minStock: `${item.minQuantity || 0} ${item.unit}`,
          unit: item.unit,
          raw: item
        });
      }
    });

    // 2. Embalagens
    packagingItems.forEach(item => {
      if (item.status === "Baixo" || item.status === "Crítico") {
        list.push({
          id: item.id,
          name: item.name,
          type: 'Embalagem',
          status: item.status,
          statusColor: item.status === 'Crítico' ? 'red' : 'amber',
          currentStock: `${item.quantity} ${item.unit}`,
          minStock: `${item.minQuantity || 0} ${item.unit}`,
          unit: item.unit,
          raw: item
        });
      }
    });

    // 3. Produtos Finais (Regra: < 10 unidades é crítico)
    products.forEach(item => {
      if (item.isActive && (item.stock || 0) <= 10) {
        list.push({
          id: item.id,
          name: item.name,
          type: 'Produto Final',
          status: item.stock <= 5 ? 'Crítico' : 'Baixo',
          statusColor: item.stock <= 5 ? 'red' : 'amber',
          currentStock: `${item.stock || 0} un`,
          minStock: '10 un',
          unit: 'un',
          raw: item
        });
      }
    });

    return list;
  }, [ingredients, packagingItems, products]);

  const filteredItems = criticalItems.filter(item => {
    if (activeFilter === "Todos") return true;
    if (activeFilter === "Insumos" && item.type === "Insumo") return true;
    if (activeFilter === "Produtos Finais" && item.type === "Produto Final") return true;
    if (activeFilter === "Embalagens" && item.type === "Embalagem") return true;
    return false;
  });

  const totalCritical = criticalItems.filter(item => item.status === 'Crítico').length;
  const totalAlert = criticalItems.filter(item => item.status === 'Baixo').length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'Insumo': return <ChefHat size={20} />;
      case 'Produto Final': return <IceCream size={20} />;
      case 'Embalagem': return <Package size={20} />;
      default: return <Package size={20} />;
    }
  };

  const getStatusClasses = (statusColor: 'red' | 'amber') => {
    if (statusColor === 'red') {
      return {
        iconBg: 'bg-red-500/10 dark:bg-red-500/20',
        iconColor: 'text-red-600 dark:text-red-400',
        border: 'border-l-red-500',
        stockColor: 'text-red-600 dark:text-red-400'
      };
    }
    return {
      iconBg: 'bg-amber-500/10 dark:bg-amber-500/20',
      iconColor: 'text-amber-600 dark:text-amber-400',
      border: 'border-l-amber-500',
      stockColor: 'text-amber-600 dark:text-amber-400'
    };
  };

  const handleEditParams = (item: any) => {
    setSelectedItem(item);
    setIsParamsModalOpen(true);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white min-h-screen">
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <Link
          to="/gestao-estoque"
          className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
        >
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold tracking-tight text-center flex-1 truncate px-2">Estoque Crítico</h1>
        <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300">
          <Filter size={24} />
        </button>
      </header>

      <main className="flex-1 flex flex-col gap-6 p-4 pb-12 max-w-4xl mx-auto">
        <section aria-label="Resumo de Status">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-3 p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700/50 shadow-sm relative overflow-hidden group">
              <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <AlertTriangle className="text-red-500" size={40} />
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-red-500 animate-pulse"></div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Críticos</p>
              </div>
              <div>
                <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{totalCritical}</p>
                <p className="text-xs text-red-600 dark:text-red-400 font-medium mt-1">Abaixo do mínimo</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700/50 shadow-sm relative overflow-hidden group">
              <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <AlertTriangle className="text-amber-500" size={40} />
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-amber-500"></div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Baixo</p>
              </div>
              <div>
                <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{totalAlert}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Próximos ao limite</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Filtros" className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold shrink-0 transition-colors active:scale-95 ${
                activeFilter === filter
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {filter}
            </button>
          ))}
        </section>

        <section aria-label="Lista de Itens" className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Itens Monitorados ({filteredItems.length})</h2>
            <Link to="/relatorios" className="text-xs font-medium text-primary hover:underline">Ver Relatório</Link>
          </div>

          {filteredItems.map((item) => {
            const classes = getStatusClasses(item.statusColor);
            return (
              <div key={item.id} className={`flex flex-col bg-white dark:bg-surface-dark rounded-xl p-4 border-l-4 ${classes.border} border-y border-r border-slate-200 dark:border-r-slate-700 dark:border-y-slate-700 shadow-sm`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start gap-3">
                    <div className={`${classes.iconBg} p-2.5 rounded-lg ${classes.iconColor} flex items-center justify-center`}>
                      {getIcon(item.type)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">{item.name}</h3>
                      <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        {item.type}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleEditParams(item)}
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    <Edit size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-slate-500 font-semibold mb-0.5">Estoque Atual</span>
                    <span className={`text-sm font-bold ${classes.stockColor}`}>{item.currentStock}</span>
                  </div>
                  <div className="flex flex-col border-l border-slate-100 dark:border-slate-800 pl-3">
                    <span className="text-[10px] uppercase text-slate-500 font-semibold mb-0.5">Mínimo</span>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.minStock}</span>
                  </div>
                  <div className="flex flex-col border-l border-slate-100 dark:border-slate-800 pl-3">
                    <span className="text-[10px] uppercase text-slate-500 font-semibold mb-0.5">Tipo</span>
                    <span className="text-sm font-bold text-primary truncate">{item.type}</span>
                  </div>
                </div>
              </div>
            );
          })}
          
          {filteredItems.length === 0 && (
            <div className="text-center py-12 opacity-50">
               <Package size={48} className="mx-auto mb-3" />
               <p>Nenhum item com estoque baixo no momento.</p>
            </div>
          )}
        </section>
      </main>

      <EditStockParamsModal 
        isOpen={isParamsModalOpen} 
        onClose={() => setIsParamsModalOpen(false)} 
        item={selectedItem} 
      />
    </div>
  );
};

export default EstoqueCritico;