import { ArrowLeft, Download, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const CurvaABC = () => {
  const [viewMode, setViewMode] = useState<"billing" | "profitability">("billing");

  const abcData = {
    A: {
      items: 12,
      revenue: 15000,
      percentage: 20,
      color: "emerald",
      products: [
        {
          id: "GN-001",
          name: "Ninho c/ Nutella",
          sales: 450,
          revenue: 3250,
          percentage: 22,
          progress: 85
        },
        {
          id: "GM-004",
          name: "Morango Gourmet",
          sales: 310,
          revenue: 2100,
          percentage: 14,
          progress: 60
        },
        {
          id: "GO-012",
          name: "Oreo Supremo",
          sales: 280,
          revenue: 1950,
          percentage: 12,
          progress: 45
        }
      ]
    },
    B: {
      items: 25,
      revenue: 4000,
      percentage: 30,
      color: "amber",
      products: [
        {
          id: "GM-022",
          name: "Maracujá Cremoso",
          sales: 85,
          revenue: 450,
          percentage: 3,
          progress: 20
        }
      ]
    },
    C: {
      items: 48,
      revenue: 800,
      percentage: 50,
      color: "slate",
      products: [
        {
          id: "GS-009",
          name: "Groselha Simples",
          sales: 15,
          revenue: 80,
          percentage: 0.5,
          progress: 5
        }
      ]
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "emerald":
        return {
          bg: "bg-emerald-500/5 dark:bg-emerald-500/10",
          text: "text-emerald-600 dark:text-emerald-400",
          bgBadge: "bg-emerald-500/10",
          border: "border-emerald-500"
        };
      case "amber":
        return {
          bg: "bg-amber-500/5 dark:bg-amber-500/10",
          text: "text-amber-600 dark:text-amber-500",
          bgBadge: "bg-amber-500/10",
          border: "border-amber-500"
        };
      case "slate":
        return {
          bg: "bg-slate-500/5 dark:bg-slate-500/10",
          text: "text-slate-600 dark:text-slate-400",
          bgBadge: "bg-slate-500/10",
          border: "border-slate-500"
        };
      default:
        return {
          bg: "bg-gray-500/5 dark:bg-gray-500/10",
          text: "text-gray-600 dark:text-gray-400",
          bgBadge: "bg-gray-500/10",
          border: "border-gray-500"
        };
    }
  };

  const getClassTitle = (className: string) => {
    switch (className) {
      case "A":
        return "Classe A (Alta Prioridade)";
      case "B":
        return "Classe B (Média Importância)";
      case "C":
        return "Classe C (Baixo Impacto)";
      default:
        return "";
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex flex-col px-4 pt-2 pb-2">
          <div className="flex items-center h-12 justify-between">
            <Link
              to="/visao-geral"
              className="text-slate-600 dark:text-gray-300 flex size-12 shrink-0 items-center justify-start hover:text-primary transition-colors"
            >
              <ArrowLeft size={24} />
            </Link>
            <div className="flex items-center justify-end">
              <button className="flex items-center justify-center rounded-lg h-10 w-10 text-slate-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-surface-dark transition-colors">
                <Filter size={24} />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <h1 className="text-slate-900 dark:text-white text-[28px] font-bold leading-tight">Curva ABC</h1>
            <span className="text-xs font-medium text-slate-500 dark:text-gray-400 mb-1">Atualizado: Hoje, 08:00</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col pb-24">
        {/* Period Selector */}
        <div className="w-full flex justify-center py-4">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-200 dark:bg-surface-dark text-xs font-medium text-slate-600 dark:text-gray-400 border border-transparent hover:border-primary/50 transition-colors">
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            <span>Período: Últimos 30 dias</span>
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </button>
        </div>

        {/* Segmented Control */}
        <div className="px-4 pb-6">
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
              <div className="absolute inset-0 rounded-lg bg-white dark:bg-surface-dark-highlight shadow-sm opacity-0 peer-checked:opacity-100 transition-all duration-200"></div>
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
              <div className="absolute inset-0 rounded-lg bg-white dark:bg-surface-dark-highlight shadow-sm opacity-0 peer-checked:opacity-100 transition-all duration-200"></div>
              <span className="relative z-10 text-xs sm:text-sm font-medium text-slate-500 dark:text-gray-400 peer-checked:text-slate-900 dark:peer-checked:text-white transition-colors">
                Por Lucratividade
              </span>
            </label>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="px-4 pb-6">
          <div className="grid grid-cols-3 gap-3">
            {/* Stat A */}
            <div className="flex flex-col gap-1 p-3 rounded-xl bg-white dark:bg-surface-dark border-l-4 border-emerald-500 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Classe A</span>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  {abcData.A.percentage}%
                </span>
              </div>
              <p className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">
                R$ {abcData.A.revenue.toLocaleString()}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-gray-400">{abcData.A.items} itens</p>
            </div>
            {/* Stat B */}
            <div className="flex flex-col gap-1 p-3 rounded-xl bg-white dark:bg-surface-dark border-l-4 border-amber-500 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Classe B</span>
                <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">
                  {abcData.B.percentage}%
                </span>
              </div>
              <p className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">
                R$ {abcData.B.revenue.toLocaleString()}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-gray-400">{abcData.B.items} itens</p>
            </div>
            {/* Stat C */}
            <div className="flex flex-col gap-1 p-3 rounded-xl bg-white dark:bg-surface-dark border-l-4 border-slate-500 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Classe C</span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-500/10 px-1.5 py-0.5 rounded">
                  {abcData.C.percentage}%
                </span>
              </div>
              <p className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">
                R$ {abcData.C.revenue.toLocaleString()}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-gray-400">{abcData.C.items} itens</p>
            </div>
          </div>
        </div>

        {/* Lists Sections */}
        <div className="flex flex-col gap-6 px-4">
          {/* Classe A Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-900 dark:text-white text-lg font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {getClassTitle("A")}
              </h3>
              <button className="text-primary text-sm font-medium">Ver todos</button>
            </div>
            <div className="bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm">
              {abcData.A.products.map((product, index) => {
                const colorClasses = getColorClasses("emerald");
                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 last:border-0 relative overflow-hidden group"
                  >
                    {/* Progress Bar Background */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 ${colorClasses.bg} z-0`}
                      style={{ width: `${product.progress}%` }}
                    ></div>
                    <div className="flex items-center gap-3 z-10 relative">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-surface-dark-highlight ${colorClasses.text} font-bold text-sm`}>
                        #{index + 1}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{product.name}</span>
                        <span className="text-xs text-slate-500 dark:text-gray-400">
                          ID: {product.id} • {product.sales} vendas
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end z-10 relative">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        R$ {product.revenue.toLocaleString()}
                      </span>
                      <span className={`text-xs font-medium ${colorClasses.text}`}>
                        {product.percentage}% Total
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Classe B Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-900 dark:text-white text-lg font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                {getClassTitle("B")}
              </h3>
              <span className="material-symbols-outlined text-slate-500 dark:text-gray-400 transform rotate-90">chevron_right</span>
            </div>
            {/* Collapsed view preview */}
            <div className="bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm opacity-80">
              {abcData.B.products.map((product, index) => {
                const colorClasses = getColorClasses("amber");
                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 relative overflow-hidden"
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 ${colorClasses.bg} z-0`}
                      style={{ width: `${product.progress}%` }}
                    ></div>
                    <div className="flex items-center gap-3 z-10 relative">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-surface-dark-highlight ${colorClasses.text} font-bold text-sm`}>
                        #{index + 13}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{product.name}</span>
                        <span className="text-xs text-slate-500 dark:text-gray-400">ID: {product.id}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end z-10 relative">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        R$ {product.revenue.toLocaleString()}
                      </span>
                      <span className={`text-xs font-medium ${colorClasses.text}`}>
                        {product.percentage}% Total
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Classe C Section */}
          <div className="flex flex-col gap-3 pb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-900 dark:text-white text-lg font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                {getClassTitle("C")}
              </h3>
              <span className="material-symbols-outlined text-slate-500 dark:text-gray-400 transform rotate-90">chevron_right</span>
            </div>
            <div className="bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm opacity-60">
              {abcData.C.products.map((product, index) => {
                const colorClasses = getColorClasses("slate");
                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 relative overflow-hidden"
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 ${colorClasses.bg} z-0`}
                      style={{ width: `${product.progress}%` }}
                    ></div>
                    <div className="flex items-center gap-3 z-10 relative">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-surface-dark-highlight ${colorClasses.text} font-bold text-sm`}>
                        #{index + 38}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{product.name}</span>
                        <span className="text-xs text-slate-500 dark:text-gray-400">ID: {product.id}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end z-10 relative">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        R$ {product.revenue.toLocaleString()}
                      </span>
                      <span className={`text-xs font-medium ${colorClasses.text}`}>
                        {product.percentage}% Total
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent z-20">
        <Button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all">
          <Download size={20} />
          Exportar Relatório PDF
        </Button>
      </div>
    </div>
  );
};

export default CurvaABC;