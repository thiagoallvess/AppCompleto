import { useState } from "react";
import { ArrowLeft, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const CurvaABC = () => {
  const [viewMode, setViewMode] = useState<"billing" | "profitability">("billing");

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
            <h1 className="text-xl font-bold leading-tight tracking-tight">Curva ABC</h1>
          </div>
        </div>
      </header>

      {/* Segmented Control */}
      <div className="px-4 py-6">
        <div className="flex h-12 w-full items-center justify-center rounded-xl bg-gray-200 dark:bg-surface-dark p-1">
          <label className="flex-1 cursor-pointer h-full relative flex items-center justify-center">
            <input
              checked={viewMode === "billing"}
              className="peer sr-only"
              name="view-mode"
              type="radio"
              value="billing"
              onChange={() => setViewMode("billing")}
            />
            <div className="absolute inset-0 rounded-lg bg-gray-300 dark:bg-surface-dark-highlight shadow-sm opacity-0 peer-checked:opacity-100 transition-all duration-200"></div>
            <span className="relative z-10 text-xs sm:text-sm font-medium text-slate-500 dark:text-gray-400 peer-checked:text-slate-900 dark:peer-checked:text-white transition-colors">
              Por Faturamento
            </span>
          </label>
          <label className="flex-1 cursor-pointer h-full relative flex items-center justify-center">
            <input
              checked={viewMode === "profitability"}
              className="peer sr-only"
              name="view-mode"
              type="radio"
              value="profitability"
              onChange={() => setViewMode("profitability")}
            />
            <div className="absolute inset-0 rounded-lg bg-gray-300 dark:bg-surface-dark-highlight shadow-sm opacity-0 peer-checked:opacity-100 transition-all duration-200"></div>
            <span className="relative z-10 text-xs sm:text-sm font-medium text-slate-500 dark:text-gray-400 peer-checked:text-slate-900 dark:peer-checked:text-white transition-colors">
              Por Lucratividade
            </span>
          </label>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 pb-32">
        {/* Placeholder Content */}
        <div className="flex flex-col items-center justify-center py-12">
          <div className="flex items-center justify-center size-16 rounded-full bg-primary/10 mb-4">
            <BarChart3 className="text-primary" size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Análise Curva ABC</h2>
          <p className="text-slate-500 dark:text-slate-400 text-center max-w-md">
            {viewMode === "billing"
              ? "Visualize seus produtos classificados por faturamento para identificar os itens mais importantes para seu negócio."
              : "Analise a lucratividade de cada produto para otimizar sua margem de lucro."
            }
          </p>
          <div className="mt-6 flex gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
              <div className="size-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium">Classe A</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400">
              <div className="size-2 rounded-full bg-yellow-500"></div>
              <span className="text-sm font-medium">Classe B</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400">
              <div className="size-2 rounded-full bg-red-500"></div>
              <span className="text-sm font-medium">Classe C</span>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 flex h-20 pb-4 items-center justify-around bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 backdrop-blur-lg bg-opacity-95">
        <Link to="/visao-geral" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-medium">Início</span>
        </Link>
        <Link to="/gestao-pedidos" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">list_alt</span>
          <span className="text-[10px] font-medium">Pedidos</span>
        </Link>
        <Link to="/gestao-produtos" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">inventory</span>
          <span className="text-[10px] font-medium">Produtos</span>
        </Link>
        <button className="flex flex-col items-center gap-1 p-2 w-16 text-primary">
          <span className="material-symbols-outlined fill-current">analytics</span>
          <span className="text-[10px] font-medium">Análise</span>
        </button>
      </nav>
    </div>
  );
};

export default CurvaABC;