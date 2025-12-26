"use client";

import { ArrowLeft, Share2, TrendingUp, Calendar, ChevronDown, Plus, Minus, Percent, Landmark, GripHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const DRECompleta = () => {
  const [period, setPeriod] = useState("Mensal");

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-white/5 p-4 pb-2">
        <div className="flex items-center h-12 justify-between max-w-4xl mx-auto">
          <Link
            to="/relatorios"
            className="flex size-12 items-center justify-start hover:opacity-70 transition-opacity"
          >
            <ArrowLeft size={24} className="text-gray-900 dark:text-white" />
          </Link>
          <h1 className="text-gray-900 dark:text-white tracking-tight text-lg font-bold absolute left-1/2 -translate-x-1/2">
            DRE Gerencial
          </h1>
          <div className="flex size-12 items-center justify-end">
            <button className="flex items-center justify-center rounded-lg size-10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <Share2 size={24} className="text-gray-900 dark:text-white" />
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 py-3 overflow-x-auto no-scrollbar items-center max-w-4xl mx-auto">
          {["Mensal", "Trimestral", "Anual"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex h-9 min-w-[80px] shrink-0 items-center justify-center px-4 rounded-full text-sm font-semibold transition-all active:scale-95 ${
                period === p
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-gray-200 dark:bg-surface-dark text-gray-600 dark:text-text-secondary hover:bg-gray-300 dark:hover:bg-white/10"
              }`}
            >
              {p}
            </button>
          ))}
          <div className="w-px h-6 bg-gray-300 dark:bg-white/10 mx-1 shrink-0"></div>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-text-secondary font-medium shrink-0">
            <Calendar size={16} />
            Out 2023
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 flex flex-col gap-4">
        {/* Hero Stats Card */}
        <div className="flex flex-col gap-1 rounded-2xl p-6 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-surface-dark dark:to-[#1a232e] shadow-lg border border-gray-200 dark:border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="flex justify-between items-start z-10">
            <div className="flex flex-col gap-1">
              <p className="text-gray-400 dark:text-text-secondary text-sm font-medium uppercase tracking-wider">Lucro Líquido</p>
              <h2 className="text-white text-3xl font-extrabold tracking-tight tabular-nums">R$ 12.450,00</h2>
            </div>
            <div className="flex items-center justify-center size-10 rounded-full bg-green-500/10 text-green-500 dark:text-green-400">
              <TrendingUp size={24} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700/50 dark:border-white/10 flex items-center justify-between z-10">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-text-secondary">Margem Líquida</span>
              <span className="text-sm font-bold text-white tabular-nums">15.2%</span>
            </div>
            <div className="h-8 w-px bg-gray-700/50 dark:bg-white/10 mx-4"></div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-text-secondary">Resultado Previsto</span>
              <span className="text-sm font-bold text-white tabular-nums">102% da meta</span>
            </div>
          </div>
        </div>

        {/* DRE List */}
        <div className="flex flex-col gap-2 pb-10">
          {/* 1. Receita Bruta */}
          <details className="group bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-white/5 overflow-hidden transition-all duration-200 open:shadow-lg">
            <summary className="flex cursor-pointer items-center justify-between p-4 bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 transition-colors select-none">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                  <Plus size={18} />
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">Receita Bruta</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-900 dark:text-white tabular-nums">R$ 55.000,00</span>
                <ChevronDown size={20} className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform duration-300" />
              </div>
            </summary>
            <div className="px-4 pb-4 pt-0 bg-gray-50/50 dark:bg-black/20 border-t border-gray-100 dark:border-white/5">
              <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 dark:border-white/10 last:border-0">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Vendas de Produtos</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 tabular-nums">R$ 55.000,00</span>
              </div>
            </div>
          </details>

          {/* 2. Deduções */}
          <details className="group bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-white/5 overflow-hidden transition-all duration-200">
            <summary className="flex cursor-pointer items-center justify-between p-4 bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 transition-colors select-none">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-lg bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400">
                  <Minus size={18} />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Deduções da Receita</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900 dark:text-white tabular-nums">- R$ 2.000,00</span>
                <ChevronDown size={20} className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform duration-300" />
              </div>
            </summary>
            <div className="px-4 pb-4 pt-0 bg-gray-50/50 dark:bg-black/20 border-t border-gray-100 dark:border-white/5">
              <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 dark:border-white/10">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Descontos Concedidos</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 tabular-nums">R$ 1.200,00</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 dark:border-white/10">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Cashback Utilizado</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 tabular-nums">R$ 500,00</span>
              </div>
              <div className="flex justify-between items-center py-2 last:border-0">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Devoluções</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 tabular-nums">R$ 300,00</span>
              </div>
            </div>
          </details>

          {/* Subtotal: Receita Líquida */}
          <div className="flex justify-between items-center px-4 py-3 bg-gray-100 dark:bg-[#1f2b36] rounded-lg mx-1 my-1 border-l-4 border-gray-400 dark:border-gray-500">
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">(=) Receita Líquida</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white tabular-nums">R$ 53.000,00</span>
          </div>

          {/* 3. Custos (CMV) */}
          <details className="group bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-white/5 overflow-hidden transition-all duration-200">
            <summary className="flex cursor-pointer items-center justify-between p-4 bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 transition-colors select-none">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-lg bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400">
                  <Minus size={18} />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Custos (CMV)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900 dark:text-white tabular-nums">- R$ 18.000,00</span>
                <ChevronDown size={20} className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform duration-300" />
              </div>
            </summary>
            <div className="px-4 pb-4 pt-0 bg-gray-50/50 dark:bg-black/20 border-t border-gray-100 dark:border-white/5">
              <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 dark:border-white/10">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Insumos (Ingredientes)</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 tabular-nums">R$ 12.000,00</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 dark:border-white/10">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Mão de Obra Direta</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 tabular-nums">R$ 5.000,00</span>
              </div>
              <div className="flex justify-between items-center py-2 last:border-0">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Equipamentos</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 tabular-nums">R$ 1.000,00</span>
              </div>
            </div>
          </details>

          {/* Subtotal: Lucro Bruto */}
          <div className="flex flex-col gap-1 px-4 py-3 bg-gray-100 dark:bg-[#1f2b36] rounded-lg mx-1 my-1 border-l-4 border-primary">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">(=) Lucro Bruto</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white tabular-nums">R$ 35.000,00</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-500 dark:text-text-secondary">Margem Bruta</span>
              <span className="text-xs font-bold text-primary tabular-nums">66%</span>
            </div>
          </div>

          {/* 4. Despesas Operacionais */}
          <details className="group bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-white/5 overflow-hidden transition-all duration-200">
            <summary className="flex cursor-pointer items-center justify-between p-4 bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 transition-colors select-none">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-lg bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400">
                  <Minus size={18} />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Despesas Operacionais</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900 dark:text-white tabular-nums">- R$ 15.000,00</span>
                <ChevronDown size={20} className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform duration-300" />
              </div>
            </summary>
            <div className="px-4 pb-4 pt-0 bg-gray-50/50 dark:bg-black/20 border-t border-gray-100 dark:border-white/5">
              <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 dark:border-white/10">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Entregadores (Taxas)</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 tabular-nums">R$ 4.500,00</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 dark:border-white/10">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Marketing e Vendas</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 tabular-nums">R$ 3.000,00</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 dark:border-white/10">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Administrativas</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 tabular-nums">R$ 6.000,00</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 dark:border-white/10">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Energia Elétrica</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 tabular-nums">R$ 800,00</span>
              </div>
              <div className="flex justify-between items-center py-2 last:border-0">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Gás</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 tabular-nums">R$ 700,00</span>
              </div>
            </div>
          </details>

          {/* Subtotal: EBIT */}
          <div className="flex justify-between items-center px-4 py-3 bg-gray-100 dark:bg-[#1f2b36] rounded-lg mx-1 my-1 border-l-4 border-gray-400 dark:border-gray-500">
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">(=) EBIT Operacional</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white tabular-nums">R$ 20.000,00</span>
          </div>

          {/* 5. Não Operacionais */}
          <details className="group bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-white/5 overflow-hidden transition-all duration-200">
            <summary className="flex cursor-pointer items-center justify-between p-4 bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 transition-colors select-none">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  <Percent size={18} />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Result. Financeiro</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-red-500 dark:text-red-400 tabular-nums">- R$ 500,00</span>
                <ChevronDown size={20} className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform duration-300" />
              </div>
            </summary>
            <div className="px-4 pb-4 pt-0 bg-gray-50/50 dark:bg-black/20 border-t border-gray-100 dark:border-white/5">
              <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 dark:border-white/10">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Receitas de Juros</span>
                <span className="text-xs font-medium text-green-600 dark:text-green-400 tabular-nums">+ R$ 100,00</span>
              </div>
              <div className="flex justify-between items-center py-2 last:border-0">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Despesas Bancárias</span>
                <span className="text-xs font-medium text-red-600 dark:text-red-400 tabular-nums">- R$ 600,00</span>
              </div>
            </div>
          </details>

          {/* Subtotal: LAIR */}
          <div className="flex justify-between items-center px-4 py-2 mx-1 mt-1 opacity-70">
            <span className="text-xs font-semibold text-gray-600 dark:text-text-secondary uppercase tracking-wide">(=) LAIR (Antes Impostos)</span>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 tabular-nums">R$ 19.500,00</span>
          </div>

          {/* 6. Impostos */}
          <div className="flex items-center justify-between p-4 bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-white/5 mx-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-8 rounded-lg bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400">
                <Landmark size={18} />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Impostos (IR/CSLL)</span>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white tabular-nums">- R$ 7.050,00</span>
          </div>

          {/* Final Calculation Visual Divider */}
          <div className="flex items-center justify-center gap-4 py-2">
            <div className="h-px bg-gray-300 dark:bg-white/10 flex-1"></div>
            <div className="size-6 rounded-full bg-gray-200 dark:bg-surface-dark flex items-center justify-center border border-gray-300 dark:border-white/10">
              <GripHorizontal size={14} className="text-gray-500" />
            </div>
            <div className="h-px bg-gray-300 dark:bg-white/10 flex-1"></div>
          </div>

          {/* Final Result */}
          <div className="flex flex-col gap-1 rounded-2xl p-6 bg-gradient-to-br from-primary to-[#0f6bcc] shadow-lg shadow-blue-500/20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="flex justify-between items-center z-10">
              <span className="text-sm font-bold uppercase tracking-wide opacity-90">Resultado do Exercício</span>
              <div className="px-2 py-1 rounded bg-white/20 text-xs font-bold backdrop-blur-sm">Lucro</div>
            </div>
            <div className="flex justify-between items-end mt-2 z-10">
              <h2 className="text-3xl font-extrabold tracking-tight tabular-nums">R$ 12.450,00</h2>
            </div>
            <div className="mt-4 pt-3 border-t border-white/20 flex items-center gap-4 z-10">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase opacity-80">Margem Líquida</span>
                <span className="text-sm font-bold">15.2%</span>
              </div>
              <div className="h-6 w-px bg-white/20"></div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase opacity-80">Rentabilidade</span>
                <span className="text-sm font-bold">Alta</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DRECompleta;