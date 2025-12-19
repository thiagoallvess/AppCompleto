import { useState } from "react";
import { Link } from "react-router-dom";

const GestaoProducao = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filters = [
    { label: "Todos", count: null },
    { label: "Esta Semana", count: null },
    { label: "Mês Passado", count: null },
    { label: "Finalizados", count: null }
  ];

  const productionLots = [
    {
      id: 1,
      name: "Ninho com Nutella",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkd8lB5c2Vaw9ZupDeGKA8CqQrsuCbv1IVWtjP1Pgq6N5JYAMjwdcNFdmTh7yXGKKGPykrJKJC3EQGvyud_4OcMgbqUKbbJxg_HMmq1DxGVHqG67Xx_g_O1nhM68hW_zb8fX5mpqZq1K6sshICrQCxa8oV61kN1WUpqDp5PiU3Ww7K_MZF2TOu-iy-FqWeK-zibAFwgP0IvVgMX4QnpBYdPUzoUzGQaTcXvNfJTbTCUlmXc25qyIc3GuUHXF19vX4tEBWm0AYdEA",
      date: "12/08/2023",
      produced: 50,
      cost: 75.00,
      status: "Finalizado",
      statusColor: "green"
    },
    {
      id: 2,
      name: "Morango Gourmet",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqVk8SMO1ewrqfBfb-7DbV3pYaduHuQQCUS6cyyskyk_vMuPhOH5YkjHT7b4_8L2p4-DXY5pG5yxSdxKaTDievreCs66jGW_XLejFaHqvLm8b3ZrYojpR4mZcRuXfFTEPDRxVFUs2l4MfTr_V4BLGBR2CVZU_gHGKRF15loMFVJMygzdLzOHCtazt6eWrYGxN6mbReSsH42Q6OP1Ml2Nf3oh0_YnGsYnc0DwSrnnbW_e_trqD-JxL41sToyrq0AtTJs_ZFxmWl7A",
      date: "11/08/2023",
      produced: 30,
      cost: 45.00,
      status: "Em Estoque",
      statusColor: "yellow"
    },
    {
      id: 3,
      name: "Maracujá Cremoso",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuClXN97cpaE3Nu2y3nLPiXcSd7e4IhHvNiE-bMU8zky0nU4wRbW0gUBQhF6qObEibejnzY0v3UYM1gNsW6odJkUqmFnj7WRm0W4y-0TZ5q_xQpcPDC4d81MDzOZ5kmJwiOOpg46p9_nbBg9AIFKNqXW_i2ZPBq7BZCoyFPxG8Rq_e2FG54LQvngzEUz8_dRFGRl1uUYAvLHknl3yjF1-0LlHh20rDhDP_rL58l-yh39VqLynB_C5eYkqdnj1-z_8zFUJBMLTqexvQ",
      date: "10/08/2023",
      produced: 100,
      cost: 120.00,
      status: "Finalizado",
      statusColor: "green"
    },
    {
      id: 4,
      name: "Chocolate Belga",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbEviK9KT0E9h3QEbPLsiBOx3ZHKNIWd52qzii4oNRBeZ7WQINE2KnatvqY8O2XspgsFwVYrAvvbntLzhKghfwaPlh2P9oNgzYp2ypPeNu6bmUi4LV7xlv_9DYAVmpThYsxQG2xtR_dp1XNo55sERlrTINgqe3B4FdftLwUosvBAWZNoDIWY84nAp7gNkDNjoR1X6W8yzcK3iEg_OC1VFYOIJTRE0_FxtaQMUs6yS9db4WuqjlwtcKMi4nkZpmmh7s-gXcnrU3Sg",
      date: "09/08/2023",
      produced: 45,
      cost: 90.00,
      status: "Produzindo",
      statusColor: "blue"
    }
  ];

  const filteredLots = productionLots.filter(lot => {
    if (activeFilter === "Todos") return true;
    if (activeFilter === "Esta Semana") return true; // Mock filter
    if (activeFilter === "Mês Passado") return true; // Mock filter
    if (activeFilter === "Finalizados") return lot.status === "Finalizado";
    return true;
  });

  const getStatusColor = (color: string) => {
    switch (color) {
      case "green": return "bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 ring-green-600/20";
      case "yellow": return "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 ring-yellow-600/20";
      case "blue": return "bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-500 ring-blue-500/20";
      default: return "bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400 ring-gray-600/20";
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col pb-24 bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-x-hidden antialiased">
      {/* Top App Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-white/90 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 border-b border-slate-200 dark:border-slate-800">
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">menu</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center text-slate-900 dark:text-white">Gestão de Produção</h1>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">filter_list</span>
        </button>
      </header>

      {/* Filters / Chips */}
      <div className="w-full pt-4 pb-2">
        <div className="flex gap-2 overflow-x-auto px-4 no-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter.label}
              onClick={() => setActiveFilter(filter.label)}
              className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-colors ${
                activeFilter === filter.label
                  ? "bg-primary text-white"
                  : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <span className="text-xs font-semibold">{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Headline */}
      <div className="px-4 py-4 flex items-baseline justify-between">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Lotes Recentes</h2>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total: {filteredLots.length}</span>
      </div>

      {/* List Items */}
      <div className="flex flex-col gap-4 px-4">
        {filteredLots.map((lot) => (
          <div
            key={lot.id}
            className="group relative flex flex-col gap-3 rounded-xl bg-white dark:bg-surface-dark p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800/60"
          >
            <div className="flex items-start gap-4">
              {/* Image */}
              <div className="shrink-0 relative size-[72px] overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${lot.image}')` }}
                ></div>
              </div>
              {/* Content */}
              <div className="flex flex-1 flex-col h-[72px] justify-between">
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight pr-2">{lot.name}</h3>
                  <button className="text-slate-400 hover:text-primary transition-colors -mr-2 -mt-2 p-2 rounded-full active:bg-slate-100 dark:active:bg-slate-800">
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                    <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                    <span className="text-xs font-medium">{lot.date}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Metrics Row */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-black/20 rounded-lg p-3 mt-1">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">Produzido</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">{lot.produced} un</span>
              </div>
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">Custo</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">R$ {lot.cost.toFixed(2)}</span>
              </div>
              <div className="flex-1"></div>
              <div>
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide ring-1 ring-inset ${getStatusColor(lot.statusColor)}`}>
                  {lot.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAB */}
      <button className="fixed bottom-24 right-5 z-20 flex size-14 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30 hover:bg-blue-600 transition-all active:scale-95">
        <span className="material-symbols-outlined text-white" style={{ fontSize: "28px" }}>add</span>
      </button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 flex h-20 pb-4 items-center justify-around bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800/80 backdrop-blur-lg bg-opacity-95">
        <Link to="/visao-geral" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <span className="material-symbols-outlined text-[24px]">dashboard</span>
          <span className="text-[10px] font-medium">Início</span>
        </Link>
        <button className="flex flex-col items-center gap-1 p-2 w-16 text-primary">
          <span className="material-symbols-outlined fill-current text-[24px]">conveyor_belt</span>
          <span className="text-[10px] font-medium">Produção</span>
        </button>
        <Link to="/gestao-insumos" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <span className="material-symbols-outlined text-[24px]">inventory_2</span>
          <span className="text-[10px] font-medium">Estoque</span>
        </Link>
        <Link to="/relatorios" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <span className="material-symbols-outlined text-[24px]">payments</span>
          <span className="text-[10px] font-medium">Finanças</span>
        </Link>
      </nav>
    </div>
  );
};

export default GestaoProducao;