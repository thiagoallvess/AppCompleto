import { ArrowLeft, Filter, TrendingUp, TrendingDown, Star, Clock, Truck, Search, Calendar, ChevronRight, BarChart3, Download, Package, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const RelatoriosEstoque = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [itemType, setItemType] = useState<"products" | "supplies">("products");

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            to="/visao-geral"
            className="flex items-center justify-center size-10 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Análise</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Relatórios de Estoque</h1>
          </div>
        </div>
      </header>

      {/* Period Filter Chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 pl-4 pr-4 pt-4">
        <button
          onClick={() => setSelectedPeriod("month")}
          className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition active:scale-95 ${
            selectedPeriod === "month"
              ? "bg-primary text-white shadow-lg shadow-primary/20"
              : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
        >
          <span className="text-xs font-medium whitespace-nowrap">Este Mês</span>
        </button>
        <button
          onClick={() => setSelectedPeriod("quarter")}
          className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition active:scale-95 ${
            selectedPeriod === "quarter"
              ? "bg-primary text-white shadow-lg shadow-primary/20"
              : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
        >
          <span className="text-xs font-bold whitespace-nowrap">Último Trimestre</span>
        </button>
        <button
          onClick={() => setSelectedPeriod("year")}
          className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition active:scale-95 ${
            selectedPeriod === "year"
              ? "bg-primary text-white shadow-lg shadow-primary/20"
              : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
        >
          <span className="text-xs font-medium whitespace-nowrap">Este Ano</span>
        </button>
        <button
          onClick={() => setSelectedPeriod("custom")}
          className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition active:scale-95 ${
            selectedPeriod === "custom"
              ? "bg-primary text-white shadow-lg shadow-primary/20"
              : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
        >
          <Calendar size={16} />
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-4 pb-32 space-y-6">
        {/* Segmented Control (Item Type) */}
        <div className="flex w-full">
          <div className="flex h-12 w-full items-center justify-center rounded-xl bg-slate-200 dark:bg-surface-dark p-1">
            <label className="flex cursor-pointer h-full flex-1 items-center justify-center overflow-hidden rounded-lg px-2 transition-all has-[:checked]:bg-white dark:has-[:checked]:bg-background-dark has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-slate-400">
              <span className="text-sm font-semibold leading-normal">Produtos Finais</span>
              <input 
                checked={itemType === "products"} 
                className="invisible w-0 h-0 absolute" 
                name="type_filter" 
                type="radio" 
                value="products"
                onChange={() => setItemType("products")}
              />
            </label>
            <label className="flex cursor-pointer h-full flex-1 items-center justify-center overflow-hidden rounded-lg px-2 transition-all has-[:checked]:bg-white dark:has-[:checked]:bg-background-dark has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-slate-400">
              <span className="text-sm font-semibold leading-normal">Insumos</span>
              <input 
                checked={itemType === "supplies"} 
                className="invisible w-0 h-0 absolute" 
                name="type_filter" 
                type="radio" 
                value="supplies"
                onChange={() => setItemType("supplies")}
              />
            </label>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="flex flex-col items-center justify-center py-12">
          <div className="flex items-center justify-center size-16 rounded-full bg-primary/10 mb-4">
            <BarChart3 className="text-primary" size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Relatórios de Estoque</h2>
          <p className="text-slate-500 dark:text-slate-400 text-center max-w-md">
            {itemType === "products"
              ? "Análise detalhada do movimento de produtos finais, giro e tendências de vendas."
              : "Análise de consumo de insumos, frequência de reposição e custos."
            }
          </p>
        </div>
      </main>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
        <Button className="w-full max-w-md mx-auto bg-primary hover:bg-blue-600 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
          <Download size={20} />
          <span>Exportar Relatório</span>
        </Button>
      </div>
    </div>
  );
};

export default RelatoriosEstoque;