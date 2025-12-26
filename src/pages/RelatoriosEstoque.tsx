import { ArrowLeft, Calendar, Filter, Package, TrendingUp, DollarSign, AlertTriangle, Trash2, Warehouse, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const RelatoriosEstoque = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30days");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const periodFilters = [
    { key: "30days", label: "30 Dias" },
    { key: "month", label: "Este Mês" },
    { key: "quarter", label: "Trimestre" },
  ];

  const categoryFilters = [
    { key: "Todos", label: "Todos" },
    { key: "Insumos", label: "Insumos" },
    { key: "Produtos Finais", label: "Produtos Finais" },
    { key: "Embalagens", label: "Embalagens" },
  ];

  // Mock Data
  const kpis = [
    { label: "Ocupação", value: "85%", trend: "+5% vs mês ant.", trendColor: "text-emerald-500", icon: "inventory_2", iconColor: "text-primary" },
    { label: "Perdas", value: "R$ 45,00", trend: "Vencimentos", trendColor: "text-red-500", icon: "delete_forever", iconColor: "text-red-500" },
    { label: "Custos Arm.", value: "R$ 340", trend: "Estável", trendColor: "text-slate-400", icon: "warehouse", iconColor: "text-slate-400" },
    { label: "Giro Estoque", value: "4.2x", trend: "Alta rotatividade", trendColor: "text-emerald-500", icon: "autorenew", iconColor: "text-emerald-500" },
  ];

  const alerts = [
    { id: 1, name: "Leite Condensado", detail: "Estoque Crítico (2 un)", color: "red", icon: "warning" },
    { id: 2, name: "Geladinho Ninho", detail: "Vence em 3 dias", color: "orange", icon: "history" },
    { id: 3, name: "Pedido #1209", detail: "Insumos chegando hoje", color: "blue", icon: "shopping_cart" },
  ];

  const getAlertColor = (color: string) => {
    switch (color) {
      case 'red': return { border: 'border-l-red-500', bg: 'bg-red-500/10', text: 'text-red-500', detailText: 'text-red-400' };
      case 'orange': return { border: 'border-l-orange-500', bg: 'bg-orange-500/10', text: 'text-orange-500', detailText: 'text-orange-400' };
      case 'blue': return { border: 'border-l-blue-500', bg: 'bg-blue-500/10', text: 'text-blue-500', detailText: 'text-blue-400' };
      default: return { border: 'border-l-slate-500', bg: 'bg-slate-500/10', text: 'text-slate-500', detailText: 'text-slate-400' };
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <Link
          to="/visao-geral"
          className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
        >
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white">Desempenho de Estoque</h1>
        <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300">
          <Calendar size={24} />
        </button>
      </header>

      {/* Filters (Chips) */}
      <div className="w-full overflow-x-auto no-scrollbar py-4 pl-4">
        <div className="flex gap-3 pr-4">
          {periodFilters.map(filter => (
            <button
              key={filter.key}
              onClick={() => setSelectedPeriod(filter.key)}
              className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 transition-transform active:scale-95 ${
                selectedPeriod === filter.key
                  ? "bg-primary text-white shadow-lg shadow-primary/20 font-bold"
                  : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {filter.label}
            </button>
          ))}
          {categoryFilters.map(filter => (
            <button
              key={filter.key}
              onClick={() => setActiveCategory(filter.key)}
              className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 transition-transform active:scale-95 ${
                activeCategory === filter.key
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold"
                  : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Grid */}
      <main className="px-4 pb-2 space-y-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 gap-3">
          {kpis.map((kpi, index) => (
            <div key={index} className="flex flex-col gap-2 rounded-xl bg-white dark:bg-surface-dark p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{kpi.label}</span>
                <span className={`material-symbols-outlined ${kpi.iconColor}`} style={{ fontSize: '20px' }}>{kpi.icon}</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{kpi.value}</p>
                <p className={`text-xs font-medium flex items-center gap-1 mt-1 ${kpi.trendColor}`}>
                  {kpi.trendColor !== 'text-slate-400' && (
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                      {kpi.trendColor === 'text-emerald-500' ? 'trending_up' : 'trending_down'}
                    </span>
                  )}
                  {kpi.trend}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Chart: Consumption Trend */}
        <section className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Tendência de Consumo</h2>
            <button className="text-primary text-sm font-semibold hover:underline">Detalhes</button>
          </div>
          <div className="rounded-2xl bg-white dark:bg-surface-dark p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-end gap-3 mb-6">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Consumido</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">2.450 un</p>
              </div>
              <div className="mb-1 rounded-full bg-emerald-500/10 px-2 py-0.5">
                <p className="text-xs font-bold text-emerald-500">+15%</p>
              </div>
            </div>
            {/* SVG Chart */}
            <div className="relative h-40 w-full">
              <svg className="h-full w-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 300 100">
                {/* Grid Lines */}
                <line opacity="0.3" stroke="#334155" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="300" y1="0" y2="0"></line>
                <line opacity="0.3" stroke="#334155" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="300" y1="50" y2="50"></line>
                <line opacity="0.3" stroke="#334155" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="300" y1="100" y2="100"></line>
                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#1173d4" stopOpacity="0.3"></stop>
                    <stop offset="100%" stopColor="#1173d4" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                {/* Area Path */}
                <path d="M0,70 C40,70 40,30 80,30 C120,30 120,60 160,60 C200,60 200,20 240,20 C280,20 280,50 300,50 V100 H0 Z" fill="url(#chartGradient)"></path>
                {/* Stroke Path */}
                <path d="M0,70 C40,70 40,30 80,30 C120,30 120,60 160,60 C200,60 200,20 240,20 C280,20 280,50 300,50" fill="none" stroke="#1173d4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                {/* Data Points */}
                <circle cx="80" cy="30" fill="#1173d4" r="4" stroke="#101922" strokeWidth="2"></circle>
                <circle cx="160" cy="60" fill="#1173d4" r="4" stroke="#101922" strokeWidth="2"></circle>
                <circle cx="240" cy="20" fill="#1173d4" r="4" stroke="#101922" strokeWidth="2"></circle>
              </svg>
            </div>
            <div className="mt-4 flex justify-between px-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sem 1</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sem 2</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sem 3</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sem 4</span>
            </div>
          </div>
        </section>

        {/* Alerts / Action Items */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Alertas de Estoque</h2>
          <div className="flex flex-col gap-3">
            {alerts.map(alert => {
              const classes = getAlertColor(alert.color);
              return (
                <div key={alert.id} className={`flex items-center gap-4 rounded-xl bg-white dark:bg-surface-dark p-3 pr-4 border-l-4 ${classes.border} border border-slate-200 dark:border-slate-800 shadow-sm`}>
                  <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${classes.bg}`}>
                    <span className={`material-symbols-outlined ${classes.text}`}>{alert.icon}</span>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="text-base font-bold text-slate-900 dark:text-white">{alert.name}</p>
                    <p className={`text-sm ${classes.detailText}`}>{alert.detail}</p>
                  </div>
                  <Link to="/alertas-reposicao">
                    <button className="flex size-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 active:bg-slate-200 dark:active:bg-slate-700">
                      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_right</span>
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Bottom Navigation (Simplified for Context) */}
      <nav className="fixed bottom-0 w-full bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-30">
        <Link to="/visao-geral" className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-medium">Painel</span>
        </Link>
        <Link to="/gestao-estoque" className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="text-[10px] font-medium">Estoque</span>
        </Link>
        <Link to="/relatorios" className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined fill">bar_chart</span>
          <span className="text-[10px] font-bold">Relatórios</span>
        </Link>
        <Link to="/configuracoes-admin" className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-medium">Ajustes</span>
        </Link>
      </nav>
    </div>
  );
};

export default RelatoriosEstoque;