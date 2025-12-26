import { ArrowLeft, TrendingUp, Calendar, Package, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const PrevisaoProducao = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            to="/visao-geral"
            className="flex items-center justify-center size-10 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Produção</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Previsão de Produção</h1>
          </div>
        </div>
      </header>

      {/* Period Selector */}
      <div className="px-4 py-6">
        <div className="flex h-12 w-full items-center justify-center rounded-xl bg-gray-200 dark:bg-surface-dark p-1">
          <label className="flex-1 cursor-pointer h-full relative flex items-center justify-center">
            <input
              checked={selectedPeriod === "week"}
              className="peer sr-only"
              name="period"
              type="radio"
              value="week"
              onChange={() => setSelectedPeriod("week")}
            />
            <div className="absolute inset-0 rounded-lg bg-gray-300 dark:bg-surface-dark-highlight shadow-sm opacity-0 peer-checked:opacity-100 transition-all duration-200"></div>
            <span className="relative z-10 text-xs sm:text-sm font-medium text-slate-500 dark:text-gray-400 peer-checked:text-slate-900 dark:peer-checked:text-white transition-colors">
              Próxima Semana
            </span>
          </label>
          <label className="flex-1 cursor-pointer h-full relative flex items-center justify-center">
            <input
              checked={selectedPeriod === "month"}
              className="peer sr-only"
              name="period"
              type="radio"
              value="month"
              onChange={() => setSelectedPeriod("month")}
            />
            <div className="absolute inset-0 rounded-lg bg-gray-300 dark:bg-surface-dark-highlight shadow-sm opacity-0 peer-checked:opacity-100 transition-all duration-200"></div>
            <span className="relative z-10 text-xs sm:text-sm font-medium text-slate-500 dark:text-gray-400 peer-checked:text-slate-900 dark:peer-checked:text-white transition-colors">
              Próximo Mês
            </span>
          </label>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 pb-32">
        {/* Placeholder Content */}
        <div className="flex flex-col items-center justify-center py-12">
          <div className="flex items-center justify-center size-16 rounded-full bg-primary/10 mb-4">
            <TrendingUp className="text-primary" size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Previsão de Produção</h2>
          <p className="text-slate-500 dark:text-slate-400 text-center max-w-md">
            Planeje sua produção com base em dados históricos e tendências de vendas.
          </p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 flex h-20 pb-4 items-center justify-around bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 backdrop-blur-lg bg-opacity-95">
        <Link to="/visao-geral" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-medium">Início</span>
        </Link>
        <Link to="/gestao-producao" className="flex flex-col items-center gap-1 p-2 w-16 text-primary">
          <span className="material-symbols-outlined fill-current">conveyor_belt</span>
          <span className="text-[10px] font-medium">Produção</span>
        </Link>
        <Link to="/gestao-estoque" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="text-[10px] font-medium">Estoque</span>
        </Link>
        <Link to="/relatorios" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">payments</span>
          <span className="text-[10px] font-medium">Finanças</span>
        </Link>
      </nav>
    </div>
  );
};

export default PrevisaoProducao;