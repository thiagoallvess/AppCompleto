import { ArrowLeft, Filter, TrendingUp, TrendingDown, Star, Clock, Truck, Search, Calendar, ChevronRight, BarChart3, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useStock } from "@/contexts/StockContext";
import { useProducts } from "@/contexts/ProductsContext";
import { useOrders } from "@/contexts/OrdersContext";
import { useExpenses } from "@/contexts/ExpensesProvider";
import { useDrivers } from "@/contexts/DriversContext";

const RelatoriosEstoque = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock stats for demonstration
  const stats = [
    { label: "Valor em Estoque", value: "R$ 2.4k", trend: "+8%", icon: BarChart3, trendUp: true },
    { label: "Itens em Estoque", value: "156", trend: "+12%", icon: Package, trendUp: true },
    { label: "Itens Críticos", value: "8", trend: "-3%", icon: AlertTriangle, trendUp: false },
    { label: "Giro Médio", value: "4.2x", trend: "+5%", icon: TrendingUp, trendUp: true },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-white font-display antialiased">
      <div className="max-w-4xl mx-auto w-full border-x border-neutral-800/20 dark:border-neutral-800">
        
        {/* Header */}
        <header className="sticky top-0 z-50 flex items-center justify-between p-4 pb-2 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-neutral-800/10 dark:border-neutral-800/50">
          <Link
            to="/visao-geral"
            className="flex size-10 items-center justify-center rounded-full hover:bg-neutral-200 dark:hover:bg-white/5 transition-all active:scale-95"
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">Relatórios de Estoque</h1>
          <button className="flex size-10 items-center justify-center rounded-full hover:bg-neutral-200 dark:hover:bg-white/5 transition-colors">
            <Filter size={24} />
          </button>
        </header>

        {/* Period Filters */}
        <div className="flex gap-3 p-4 overflow-x-auto no-scrollbar">
          {["Hoje", "Esta Semana", "Este Mês", "Este Ano"].map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period.toLowerCase())}
              className={`flex h-9 shrink-0 items-center justify-center px-5 rounded-full transition-all active:scale-95 text-sm font-bold ${
                selectedPeriod === period.toLowerCase() 
                ? "bg-slate-900 dark:bg-white text-white dark:text-background-dark" 
                : "bg-slate-200 dark:bg-surface-highlight text-slate-600 dark:text-neutral-300"
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* KPI Grid */}
        <div className="px-4 pb-2">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex min-w-[140px] flex-1 flex-col gap-3 rounded-xl p-5 bg-white dark:bg-surface-dark border border-neutral-800/10 dark:border-neutral-800 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-slate-100 dark:bg-neutral-700/50 rounded-md">
                    <stat.icon className="text-slate-500 dark:text-neutral-300" size={18} />
                  </div>
                  <p className="text-slate-500 dark:text-neutral-400 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {stat.trendUp ? <TrendingUp size={14} className="text-emerald-500" /> : <TrendingDown size={14} className="text-red-500" />}
                    <p className={`text-[10px] font-bold ${stat.trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
                      {stat.trend} vs. período anterior
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Section */}
        <div className="px-4 py-2">
          <div className="flex flex-col gap-2 rounded-xl bg-white dark:bg-surface-dark p-5 border border-neutral-800/10 dark:border-neutral-800 shadow-sm">
            <div className="flex justify-between items-end mb-2">
              <div className="flex flex-col">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Movimentação de Estoque</p>
                <p className="text-2xl font-bold mt-1">+24 Itens</p>
              </div>
              <div className="bg-slate-100 dark:bg-neutral-800 px-2 py-1 rounded text-[10px] font-bold text-slate-500 dark:text-neutral-300">Últimos 30 dias</div>
            </div>
            
            {/* SVG Chart Simulation */}
            <div className="w-full h-[120px] relative overflow-hidden mt-4">
              <svg className="h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 478 150" width="100%">
                <defs>
                  <linearGradient id="stockChartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"></stop>
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                <path d="M0 120 L0 90 L40 85 L80 95 L120 70 L160 75 L200 60 L240 65 L280 50 L320 55 L360 40 L400 45 L440 30 L478 35 L478 150 L0 150 Z" fill="url(#stockChartGradient)" />
                <path d="M0 90 L40 85 L80 95 L120 70 L160 75 L200 60 L240 65 L280 50 L320 55 L360 40 L400 45 L440 30 L478 35" fill="none" stroke="#10b981" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
              </svg>
            </div>
            <div className="flex justify-between mt-2 px-1">
              {["Sem 1", "Sem 2", "Sem 3", "Sem 4"].map(s => (
                <p key={s} className="text-slate-400 dark:text-neutral-500 text-[10px] font-bold uppercase tracking-wider">{s}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-t border-neutral-800/10 dark:border-neutral-800 z-50">
          <div className="max-w-4xl mx-auto flex gap-3">
             <Button className="flex-1 h-12 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold gap-2">
                <Download size={18} />
                Exportar Relatório
             </Button>
             <Button variant="outline" className="size-12 rounded-xl p-0 border-neutral-800/20 dark:border-neutral-800">
                <BarChart3 size={20} />
             </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RelatoriosEstoque;