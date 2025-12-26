import { ArrowLeft, Filter, Edit, AlertTriangle, Package, Factory, IceCream, ChefHat, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface CriticalStockItem {
  id: string;
  name: string;
  type: 'Insumo' | 'Produto Final' | 'Embalagem';
  status: 'Crítico' | 'Alerta';
  statusColor: 'red' | 'amber';
  currentStock: string;
  minStock: string;
  reorderPoint: string;
  safetyStock: string;
  unit: string;
  leadTime?: string;
}

const mockItems: CriticalStockItem[] = [
  {
    id: '1',
    name: 'Leite Condensado',
    type: 'Insumo',
    status: 'Crítico',
    statusColor: 'red',
    currentStock: '18kg',
    minStock: '20kg',
    reorderPoint: '35kg',
    safetyStock: '5kg',
    unit: 'kg',
  },
  {
    id: '2',
    name: 'Emulsificante Neutro',
    type: 'Insumo',
    status: 'Alerta',
    statusColor: 'amber',
    currentStock: '2.1kg',
    minStock: '2.0kg',
    reorderPoint: '3.5kg',
    safetyStock: '0.5kg',
    unit: 'kg',
  },
  {
    id: '3',
    name: 'Geladinho Gourmet Ninho',
    type: 'Produto Final',
    status: 'Crítico',
    statusColor: 'red',
    currentStock: '12 un',
    minStock: '20 un',
    reorderPoint: '50 un',
    safetyStock: '0 un',
    unit: 'un',
    leadTime: '1 dia',
  },
  {
    id: '4',
    name: 'Saquinho 5x24',
    type: 'Embalagem',
    status: 'Alerta',
    statusColor: 'amber',
    currentStock: '1050 un',
    minStock: '1000 un',
    reorderPoint: '2000 un',
    safetyStock: '200 un',
    unit: 'un',
  },
];

const EstoqueCritico = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const filters = ["Todos", "Insumos", "Produtos Finais", "Embalagens"];

  const filteredItems = mockItems.filter(item => {
    if (activeFilter === "Todos") return true;
    if (activeFilter === "Insumos" && item.type === "Insumo") return true;
    if (activeFilter === "Produtos Finais" && item.type === "Produto Final") return true;
    if (activeFilter === "Embalagens" && item.type === "Embalagem") return true;
    return false;
  });

  const totalCritical = mockItems.filter(item => item.status === 'Crítico').length;
  const totalAlert = mockItems.filter(item => item.status === 'Alerta').length;

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

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-6 p-4 pb-24 max-w-4xl mx-auto">
        {/* Stats Overview */}
        <section aria-label="Resumo de Status">
          <div className="grid grid-cols-2 gap-3">
            {/* Critical Card */}
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
                <p className="text-xs text-red-600 dark:text-red-400 font-medium mt-1">Itens abaixo do mínimo</p>
              </div>
            </div>
            {/* Alert Card */}
            <div className="flex flex-col gap-3 p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700/50 shadow-sm relative overflow-hidden group">
              <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <AlertTriangle className="text-amber-500" size={40} />
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-amber-500"></div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Em Alerta</p>
              </div>
              <div>
                <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{totalAlert}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Próximos ao limite</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filters (Chips) */}
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

        {/* Inventory List */}
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
                  <Link to={`/detalhes-insumo?id=${item.id}`}>
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <Edit size={20} />
                    </button>
                  </Link>
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
                    <span className="text-[10px] uppercase text-slate-500 font-semibold mb-0.5">Ressup. (Calc)</span>
                    <span className="text-sm font-bold text-primary">{item.reorderPoint}</span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-slate-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">shield</span>
                  Segurança: {item.safetyStock}
                  {item.leadTime && (
                    <>
                      <span className="ml-3 material-symbols-outlined text-[14px]">timer</span>
                      Lead Time: {item.leadTime}
                    </>
                  )}
                </div>
              </div>
            );
          })}
          
          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              Nenhum item encontrado com o filtro ativo.
            </div>
          )}
        </section>
      </main>

      {/* Floating Action Button for Adding New Item/Rule */}
      <div className="fixed bottom-20 right-6 z-40">
        <Link to="/add-insumo">
          <button className="group flex items-center justify-center size-14 rounded-full bg-primary text-white shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background-dark">
            <Plus size={28} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </Link>
      </div>

      {/* Bottom Navigation (Simplified for Context) */}
      <nav className="fixed bottom-0 w-full bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-30">
        <Link to="/visao-geral" className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-medium">Painel</span>
        </Link>
        <Link to="/gestao-estoque" className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined fill">inventory_2</span>
          <span className="text-[10px] font-bold">Estoque</span>
        </Link>
        <Link to="/gestao-pedidos" className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="text-[10px] font-medium">Pedidos</span>
        </Link>
        <Link to="/configuracoes-admin" className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-medium">Ajustes</span>
        </Link>
      </nav>
    </div>
  );
};

export default EstoqueCritico;