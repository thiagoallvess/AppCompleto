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
        return "";
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

  const profitabilityData = [
    {
      name: "Ninho c/ Nutella",
      cost: 4.50,
      sale: 10.00,
      profit: 5.50,
      margin: 55,
      color: "emerald"
    },
    {
      name: "Morango Gourmet",
      cost: 5.20,
      sale: 9.00,
      profit: 3.80,
      margin: 42,
      color: "emerald"
    },
    {
      name: "Maracujá Cremoso",
      cost: 5.80,
      sale: 8.00,
      profit: 2.20,
      margin: 27,
      color: "amber"
    },
    {
      name: "Promoção Kinder",
      cost: 8.50,
      sale: 9.50,
      profit: 1.00,
      margin: 10,
      color: "rose"
    }
  ];

  const getProfitColor = (color: string) => {
    switch (color) {
      case "emerald":
        return "bg-emerald-500";
      case "amber":
        return "bg-amber-500";
      case "rose":
        return "bg-rose-500";
      default:
        return "bg-gray-500";
    }
  };

  const getProfitTextColor = (color: string) => {
    switch (color) {
      case "emerald":
        return "text-emerald-600 dark:text-emerald-400";
      case "amber":
        return "text-amber-600 dark:text-amber-500";
      case "rose":
        return "text-rose-600 dark:text-rose-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const getProfitBgColor = (color: string) => {
    switch (color) {
      case "emerald":
        return "bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-300";
      case "amber":
        return "bg-amber-100 dark:bg-amber-500/20 dark:text-amber-300";
      case "rose":
        return "bg-rose-100 dark:bg-rose-500/20 dark:text-rose-300";
      default:
        return "bg-gray-100 dark:bg-gray-500/20 dark:text-gray-300";
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
        <div className="w-full flex justify-start px-4 py-4 gap-2 overflow-x-auto no-scrollbar">
          <button className="flex-none px-4 py-1.5 rounded-full bg-slate-800 text-white text-xs font-semibold shadow-md transition-all">
            Diário
          </button>
          <button className="flex-none px-4 py-1.5 rounded-full bg-gray-200 dark:bg-surface-dark text-slate-600 dark:text-gray-400 text-xs font-medium border border-transparent hover:bg-gray-300 dark:hover:bg-surface-dark-highlight transition-all">
            Semanal
          </button>
          <button className="flex-none px-4 py-1.5 rounded-full bg-gray-200 dark:bg-surface-dark text-slate-600 dark:text-gray-400 text-xs font-medium border border-transparent hover:bg-gray-300 dark:hover:bg-surface-dark-highlight transition-all">
            Mensal
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

        {viewMode === "billing" ? (
          <>
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
          </>
        ) : (
          <>
            {/* Profitability View */}
            <div className="px-4 pb-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 flex flex-col gap-1 p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
                  <div className="absolute right-0 top-0 p-4 opacity-5">
                    <span className="material-symbols-outlined text-[64px]">account_balance_wallet</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Lucro Líquido Total</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">R$ 2.450,00</span>
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center">
                      <span className="material-symbols-outlined text-[12px] mr-0.5">trending_up</span> 12%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Comparado ao período anterior</p>
                </div>
                <div className="flex flex-col gap-1 p-3 rounded-xl bg-white dark:bg-surface-dark border-l-4 border-emerald-500 shadow-sm">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">Margem Média</span>
                  <p className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">35.4%</p>
                  <p className="text-[10px] text-slate-500 dark:text-gray-400">Meta: 30%</p>
                </div>
                <div className="flex flex-col gap-1 p-3 rounded-xl bg-white dark:bg-surface-dark border-l-4 border-primary shadow-sm">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">Faturamento</span>
                  <p className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">R$ 6.8k</p>
                  <p className="text-[10px] text-slate-500 dark:text-gray-400">920 vendas</p>
                </div>
              </div>
            </div>

            {/* Daily Evolution Chart */}
            <div className="px-4 pb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Evolução Diária (Lucro)</h3>
                <span className="text-[10px] text-slate-500 bg-slate-100 dark:bg-surface-dark-highlight px-2 py-1 rounded-md">Últimos 7 dias</span>
              </div>
              <div className="h-32 w-full bg-white dark:bg-surface-dark rounded-xl p-4 flex items-end justify-between gap-2 shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex flex-col items-center gap-1 w-full group">
                  <div className="w-full bg-emerald-500/20 dark:bg-emerald-500/10 rounded-t-sm relative h-[40%] group-hover:bg-emerald-500/40 transition-colors">
                    <div className="absolute bottom-0 left-0 right-0 bg-emerald-500 rounded-t-sm h-[60%] bar-animate" style={{ height: '60%' }}></div>
                  </div>
                  <span className="text-[9px] text-slate-400">Seg</span>
                </div>
                <div className="flex flex-col items-center gap-1 w-full group">
                  <div className="w-full bg-emerald-500/20 dark:bg-emerald-500/10 rounded-t-sm relative h-[55%] group-hover:bg-emerald-500/40 transition-colors">
                    <div className="absolute bottom-0 left-0 right-0 bg-emerald-500 rounded-t-sm h-[100%] bar-animate" style={{ height: '100%' }}></div>
                  </div>
                  <span className="text-[9px] text-slate-400">Ter</span>
                </div>
                <div className="flex flex-col items-center gap-1 w-full group">
                  <div className="w-full bg-emerald-500/20 dark:bg-emerald-500/10 rounded-t-sm relative h-[45%] group-hover:bg-emerald-500/40 transition-colors">
                    <div className="absolute bottom-0 left-0 right-0 bg-emerald-500 rounded-t-sm h-[80%] bar-animate" style={{ height: '80%' }}></div>
                  </div>
                  <span className="text-[9px] text-slate-400">Qua</span>
                </div>
                <div className="flex flex-col items-center gap-1 w-full group">
                  <div className="w-full bg-emerald-500/20 dark:bg-emerald-500/10 rounded-t-sm relative h-[30%] group-hover:bg-emerald-500/40 transition-colors">
                    <div className="absolute bottom-0 left-0 right-0 bg-emerald-500 rounded-t-sm h-[50%] bar-animate" style={{ height: '50%' }}></div>
                  </div>
                  <span className="text-[9px] text-slate-400">Qui</span>
                </div>
                <div className="flex flex-col items-center gap-1 w-full group">
                  <div className="w-full bg-emerald-500/20 dark:bg-emerald-500/10 rounded-t-sm relative h-[70%] group-hover:bg-emerald-500/40 transition-colors">
                    <div className="absolute bottom-0 left-0 right-0 bg-emerald-500 rounded-t-sm h-[85%] bar-animate" style={{ height: '85%' }}></div>
                  </div>
                  <span className="text-[9px] text-slate-400 font-bold text-emerald-500">Sex</span>
                </div>
                <div className="flex flex-col items-center gap-1 w-full group">
                  <div className="w-full bg-emerald-500/20 dark:bg-emerald-500/10 rounded-t-sm relative h-[90%] group-hover:bg-emerald-500/40 transition-colors">
                    <div className="absolute bottom-0 left-0 right-0 bg-emerald-500 rounded-t-sm h-[92%] bar-animate" style={{ height: '92%' }}></div>
                  </div>
                  <span className="text-[9px] text-slate-400">Sáb</span>
                </div>
                <div className="flex flex-col items-center gap-1 w-full group">
                  <div className="w-full bg-emerald-500/20 dark:bg-emerald-500/10 rounded-t-sm relative h-[80%] group-hover:bg-emerald-500/40 transition-colors">
                    <div className="absolute bottom-0 left-0 right-0 bg-emerald-500 rounded-t-sm h-[75%] bar-animate" style={{ height: '75%' }}></div>
                  </div>
                  <span className="text-[9px] text-slate-400">Dom</span>
                </div>
              </div>
            </div>

            {/* Profitability by Item */}
            <div className="flex flex-col gap-4 px-4">
              <div className="flex items-center justify-between">
                <h3 className="text-slate-900 dark:text-white text-lg font-bold">
                  Lucratividade por Item
                </h3>
                <button className="text-primary text-sm font-medium flex items-center gap-1">
                  Filtrar <span className="material-symbols-outlined text-[16px]">filter_list</span>
                </button>
              </div>
              <div className="bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-surface-dark-highlight/50 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">Produto / Custo vs Venda</span>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">Lucro / Margem</span>
                </div>
                {profitabilityData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 last:border-0 relative hover:bg-gray-50 dark:hover:bg-surface-dark-highlight/20 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`w-1 h-10 rounded-full ${getProfitColor(item.color)}`}></div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{item.name}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-slate-500 dark:text-gray-400">Custo: <span className="font-medium text-rose-500">R$ {item.cost.toFixed(2)}</span></span>
                          <span className="text-[10px] text-slate-300 dark:text-gray-600">|</span>
                          <span className="text-[10px] text-slate-500 dark:text-gray-400">Venda: <span className="font-medium text-slate-700 dark:text-gray-300">R$ {item.sale.toFixed(2)}</span></span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`text-sm font-bold ${getProfitTextColor(item.color)}`}>+ R$ {item.profit.toFixed(2)}</span>
                      <span className={`text-[10px] font-bold ${getProfitBgColor(item.color)} px-1.5 py-0.5 rounded mt-0.5`}>{item.margin}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent z-20">
        <Button className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-gray-200 text-white dark:text-slate-900 font-semibold py-3.5 rounded-xl shadow-lg active:scale-[0.98] transition-all">
          <Download size={20} />
          Relatório de Lucros
        </Button>
      </div>
    </div>
  );
};

export default CurvaABC;