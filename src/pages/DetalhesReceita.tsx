import { ArrowLeft, Edit } from "lucide-react";
import { Link } from "react-router-dom";

const DetalhesReceita = () => {
  const ingredients = [
    { name: "Leite Integral 1L", quantity: "1 Un", cost: 4.99 },
    { name: "Saborizante de Morango 100g", quantity: "20 g", cost: 2.34 },
    { name: "Leite Condensado", quantity: "1 Un", cost: 5.84 },
    { name: "Liga Neutra", quantity: "15 g", cost: 1.34 },
    { name: "Creme de Leite", quantity: "1 Un", cost: 2.99 },
    { name: "Açúcar 5kg", quantity: "50 g", cost: 0.17 },
    { name: "Morango Bandeja 200g", quantity: "2 Un", cost: 16.00 }
  ];

  const packaging = [
    { name: "Embalagem Viagem Térmica", quantity: "12 Un", cost: 4.62 },
    { name: "Embalagem Higiênica", quantity: "12 Un", cost: 1.11 },
    { name: "Saquinho Interno", quantity: "12 Un", cost: 1.32 }
  ];

  const equipment = [
    { name: "Liquidificador 1400w", quantity: "3 min", cost: 0.06 },
    { name: "Fogão", quantity: "40 min - Consumo: Médio", cost: 0.74 }
  ];

  const costs = {
    ingredients: 33.67,
    packaging: 7.05,
    equipment: 0.79,
    labor: 30.00,
    total: 71.51,
    unit: 5.96,
    profitTotal: 36.49,
    profitUnit: 3.04,
    margin: 51.0
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white max-w-md mx-auto shadow-2xl">
      {/* TopAppBar */}
      <header className="sticky top-0 z-50 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 border-b border-gray-200 dark:border-gray-800 justify-between">
        <Link
          to="/gestao-receitas"
          className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-start cursor-pointer hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={24} />
        </Link>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Detalhes da Receita</h2>
        <button className="flex size-12 items-center justify-end cursor-pointer hover:opacity-70 transition-opacity">
          <Edit className="text-primary text-2xl" />
        </button>
      </header>

      {/* Content Scroll Area */}
      <div className="flex-1 overflow-y-auto pb-8">
        {/* Section: Ingredientes */}
        <div className="pt-2">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">grocery</span>
              <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Ingredientes</h3>
            </div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-surface-dark px-2 py-1 rounded">{ingredients.length} itens</span>
          </div>
          <div className="flex flex-col">
            {ingredients.map((item, index) => (
              <div key={index} className="flex items-center gap-4 px-4 min-h-[3.5rem] justify-between border-b border-gray-200 dark:border-gray-800 last:border-0 hover:bg-gray-100 dark:hover:bg-surface-dark/50 transition-colors">
                <div className="flex flex-col flex-1 truncate pr-2">
                  <p className="text-slate-900 dark:text-white text-sm font-medium leading-normal truncate">{item.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-normal">{item.quantity}</p>
                </div>
                <div className="shrink-0">
                  <p className="text-slate-900 dark:text-white text-sm font-semibold leading-normal">R$ {item.cost.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-2 bg-gray-100 dark:bg-black/20 mt-2"></div>

        {/* Section: Embalagens */}
        <div className="pt-2">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">inventory_2</span>
              <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Embalagens</h3>
            </div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-surface-dark px-2 py-1 rounded">{packaging.length} itens</span>
          </div>
          <div className="flex flex-col">
            {packaging.map((item, index) => (
              <div key={index} className="flex items-center gap-4 px-4 min-h-[3.5rem] justify-between border-b border-gray-200 dark:border-gray-800 last:border-0 hover:bg-gray-100 dark:hover:bg-surface-dark/50 transition-colors">
                <div className="flex flex-col flex-1 truncate pr-2">
                  <p className="text-slate-900 dark:text-white text-sm font-medium leading-normal truncate">{item.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-normal">{item.quantity}</p>
                </div>
                <div className="shrink-0">
                  <p className="text-slate-900 dark:text-white text-sm font-semibold leading-normal">R$ {item.cost.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-2 bg-gray-100 dark:bg-black/20 mt-2"></div>

        {/* Section: Equipamentos */}
        <div className="pt-2">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">kitchen</span>
              <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Equipamentos</h3>
            </div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-surface-dark px-2 py-1 rounded">{equipment.length} itens</span>
          </div>
          <div className="flex flex-col">
            {equipment.map((item, index) => (
              <div key={index} className="flex items-center gap-4 px-4 min-h-[3.5rem] justify-between border-b border-gray-200 dark:border-gray-800 last:border-0 hover:bg-gray-100 dark:hover:bg-surface-dark/50 transition-colors">
                <div className="flex flex-col flex-1 truncate pr-2">
                  <p className="text-slate-900 dark:text-white text-sm font-medium leading-normal truncate">{item.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-normal">{item.quantity}</p>
                </div>
                <div className="shrink-0">
                  <p className="text-slate-900 dark:text-white text-sm font-semibold leading-normal">R$ {item.cost.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-2 bg-gray-100 dark:bg-black/20 mt-2"></div>

        {/* Section: Sumário */}
        <div className="pt-4 px-4 pb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary text-xl">calculate</span>
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Sumário de Custos e Lucros</h3>
          </div>
          <div className="bg-white dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-800 space-y-4">
            {/* Breakdown */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-400 text-xs">Ingredientes</span>
                <span className="text-slate-900 dark:text-white font-medium">R$ {costs.ingredients.toFixed(2)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-400 text-xs">Embalagens</span>
                <span className="text-slate-900 dark:text-white font-medium">R$ {costs.packaging.toFixed(2)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-400 text-xs">Equipamentos</span>
                <span className="text-slate-900 dark:text-white font-medium">R$ {costs.equipment.toFixed(2)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-400 text-xs">Mão de Obra</span>
                <span className="text-slate-900 dark:text-white font-medium">R$ {costs.labor.toFixed(2)}</span>
              </div>
            </div>
            <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
            {/* Totals */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300 font-medium">Custo Total</span>
              <span className="text-slate-900 dark:text-white font-bold text-base">R$ {costs.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300 font-medium">Custo Unitário</span>
              <span className="text-slate-900 dark:text-white font-bold text-base">R$ {costs.unit.toFixed(2)}</span>
            </div>
            <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
            {/* Profits (Highlighted) */}
            <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-3 -mx-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-primary text-xs font-bold uppercase tracking-wider mb-1">Lucro Total</span>
                  <span className="text-slate-900 dark:text-white font-bold text-xl">R$ {costs.profitTotal.toFixed(2)}</span>
                </div>
                <div className="flex flex-col border-l border-primary/20 pl-4">
                  <span className="text-primary text-xs font-bold uppercase tracking-wider mb-1">Lucro Unit.</span>
                  <span className="text-slate-900 dark:text-white font-bold text-xl">R$ {costs.profitUnit.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-primary/20 flex justify-between items-center">
                <span className="text-primary text-xs font-bold uppercase tracking-wider">Margem (%)</span>
                <span className="text-slate-900 dark:text-white font-bold text-lg">{costs.margin.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesReceita;