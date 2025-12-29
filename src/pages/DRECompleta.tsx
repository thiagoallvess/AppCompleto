"use client";

import { ArrowLeft, Share2, TrendingUp, Calendar, ChevronDown, Plus, Minus, Percent, Landmark, GripHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import DREFilterModal from "@/components/DREFilterModal";
import { useOrders } from "@/contexts/OrdersContext";
import { useExpenses } from "@/contexts/ExpensesProvider";

const DRECompleta = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState("Mensal");
  const [currentDateRange, setCurrentDateRange] = useState("Out 2023");
  const { orders } = useOrders();
  const { expenses } = useExpenses();

  const handleApplyFilters = (period: string, startDate?: string, endDate?: string) => {
    setCurrentPeriod(period);
    if (period === "Intervalo Personalizado" && startDate && endDate) {
      setCurrentDateRange(`${startDate} a ${endDate}`);
    } else if (period === "Mensal") {
      setCurrentDateRange("Out 2023");
    } else if (period === "Trimestral") {
      setCurrentDateRange("Jul - Set 2023");
    } else if (period === "Anual") {
      setCurrentDateRange("2023");
    }
  };

  // ========== RECEITAS ==========
  // Calcular receita bruta (soma de todos os pedidos antes de descontos)
  const grossRevenue = orders
    .filter(order => !order.cancelled)
    .reduce((sum, order) => {
      // Receita bruta = total do pedido + desconto aplicado
      const orderGross = order.total + (order.discount || 0);
      return sum + orderGross;
    }, 0);

  // Calcular descontos concedidos (soma real dos descontos aplicados via cupons)
  const totalDiscounts = orders
    .filter(order => !order.cancelled)
    .reduce((sum, order) => sum + (order.discount || 0), 0);

  // Calcular cashback concedido (3% sobre o total de cada pedido)
  const totalCashback = orders
    .filter(order => !order.cancelled)
    .reduce((sum, order) => sum + (order.total * 0.03), 0);

  // Devoluções (mockado - em produção seria calculado)
  const totalReturns = 0;

  // Receita Líquida = Receita Bruta - Deduções
  const netRevenue = grossRevenue - totalDiscounts - totalCashback - totalReturns;

  // ========== CUSTOS (CMV) ==========
  // Custos estimados baseados na receita líquida
  const ingredientsCost = netRevenue * 0.35; // 35% do custo
  const laborCost = netRevenue * 0.25; // 25% do custo
  const equipmentCost = netRevenue * 0.05; // 5% do custo

  const totalCMV = ingredientsCost + laborCost + equipmentCost;
  const grossProfit = netRevenue - totalCMV;

  // ========== DESPESAS OPERACIONAIS ==========
  // Calcular despesas reais do ExpensesContext
  const operationalExpenses = expenses
    .filter(expense => expense.status === 'Pago')
    .reduce((sum, expense) => sum + expense.amount, 0);

  // Adicionar custos de entrega (R$ 5 por pedido entregue)
  const deliveryFees = orders.filter(o => !o.cancelled && o.status === "Entregue").length * 5;

  const totalOperationalExpenses = operationalExpenses + deliveryFees;
  const ebit = grossProfit - totalOperationalExpenses;

  // ========== RESULTADO FINANCEIRO ==========
  const financialResult = ebit * 0.02; // 2% juros recebidos - despesas bancárias
  const lair = ebit + financialResult;

  // ========== IMPOSTOS ==========
  const taxes = lair > 0 ? lair * 0.25 : 0; // 25% IR/CSLL apenas se houver lucro
  const netIncome = lair - taxes;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            to="/relatorios"
            className="flex items-center justify-center size-10 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Análise</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">DRE Gerencial</h1>
          </div>
        </div>
      </header>

      {/* Period Filter Chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 pl-4 pr-4 pt-4">
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="flex h-9 min-w-[80px] shrink-0 items-center justify-center px-4 rounded-full bg-primary text-white text-sm font-semibold shadow-lg shadow-primary/20 transition-transform active:scale-95"
        >
          {currentPeriod}
        </button>
        <div className="w-px h-6 bg-gray-300 dark:bg-white/10 mx-1 shrink-0"></div>
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-text-secondary font-medium shrink-0">
          <Calendar size={16} />
          {currentDateRange}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-4 pb-32 space-y-6">
        {/* Hero Stats Card */}
        <div className="flex flex-col gap-1 rounded-2xl p-6 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-surface-dark dark:to-[#1a232e] shadow-lg border border-gray-200 dark:border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="flex justify-between items-start z-10">
            <div className="flex flex-col gap-1">
              <span className="text-gray-400 dark:text-text-secondary text-sm font-medium uppercase tracking-wider">Lucro Líquido</span>
              <div className="flex items-baseline gap-2">
                <span className="text-white text-3xl font-extrabold tracking-tight tabular-nums">R$ {netIncome.toFixed(2)}</span>
                <div className={`flex items-center ${netIncome >= 0 ? 'text-emerald-500' : 'text-red-500'} text-sm font-bold bg-opacity-10 px-1.5 py-0.5 rounded`}>
                  <TrendingUp size={14} className="mr-0.5" />
                  {netIncome >= 0 ? '+' : ''}{grossRevenue > 0 ? (netIncome / grossRevenue * 100).toFixed(1) : '0.0'}%
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center size-10 rounded-full bg-green-500/10 text-green-500 dark:text-green-400">
              <TrendingUp size={24} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700/50 dark:border-white/10 flex items-center justify-between z-10">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-text-secondary">Margem Líquida</span>
              <span className="text-sm font-bold text-white tabular-nums">{grossRevenue > 0 ? (netIncome / grossRevenue * 100).toFixed(1) : '0.0'}%</span>
            </div>
            <div className="h-8 w-px bg-gray-700/50 dark:bg-white/10 mx-4"></div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-text-secondary">Resultado Previsto</span>
              <span className="text-sm font-bold text-white tabular-nums">{netIncome >= 0 ? 'Positivo' : 'Negativo'}</span>
            </div>
          </div>
        </div>

        {/* DRE List */}
        <div className="flex flex-col gap-2 pb-10">
          {/* 1. Receita Bruta */}
          <details className="group bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-white/5 overflow-hidden transition-all duration-200 open:shadow-lg">
            <summary className="flex cursor-pointer items-center justify-between p-4 bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 transition-colors select-none">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                  <Plus size={18} />
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">Receita Bruta</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-900 dark:text-white tabular-nums">R$ {grossRevenue.toFixed(2)}</span>
                <ChevronDown size={20} className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform duration-300" />
              </div>
            </summary>
            <div className="px-4 pb-4 pt-0 bg-gray-50/50 dark:bg-black/20 border-t border-gray-100 dark:border-white/5">
              <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 dark:border-white/10 last:border-0">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Vendas de Produtos</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 tabular-nums">R$ {grossRevenue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 text-xs text-gray-500 dark:text-gray-400 pl-11">
                <span>Total de pedidos processados</span>
                <span className="font-medium">{orders.filter(o => !o.cancelled).length} pedidos</span>
              </div>
            </div>
          </details>

          {/* 2. Deduções */}
          <details className="group bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-white/5 overflow-hidden transition-all duration-200 open:shadow-lg">
            <summary className="flex cursor-pointer items-center justify-between p-4 bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 transition-colors select-none">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400">
                  <Minus size={18} />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Deduções da Receita</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900 dark:text-white tabular-nums">- R$ {(totalDiscounts + totalCashback + totalReturns).toFixed(2)}</span>
                <ChevronDown size={20} className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform duration-300" />
              </div>
            </summary>
            <div className="px-4 pb-4 pt-0 bg-gray-50/50 dark:bg-black/20 border-t border-gray-100 dark:border-white/5">
              <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 dark:border-white/10">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Descontos Concedidos (Cupons)</span>
                <span className="text-xs font-medium text-orange-600 dark:text-orange-400 tabular-nums">R$ {totalDiscounts.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 text-[10px] text-gray-500 dark:text-gray-400 pl-11">
                <span>Cupons aplicados</span>
                <span className="font-medium">{orders.filter(o => o.couponCode && !o.cancelled).length} usos</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 dark:border-white/10">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Cashback Concedido</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 tabular-nums">R$ {totalCashback.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 last:border-0">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Devoluções</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 tabular-nums">R$ {totalReturns.toFixed(2)}</span>
              </div>
            </div>
          </details>

          {/* Subtotal: Receita Líquida */}
          <div className="flex justify-between items-center px-4 py-3 bg-gray-100 dark:bg-[#1f2b36] rounded-lg mx-1 my-1 border-l-4 border-gray-400 dark:border-gray-500">
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">(=) Receita Líquida</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white tabular-nums">R$ {netRevenue.toFixed(2)}</span>
          </div>

          {/* 3. Custos (CMV) */}
          <details className="group bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-white/5 overflow-hidden transition-all duration-200 open:shadow-lg">
            <summary className="flex cursor-pointer items-center justify-between p-4 bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 transition-colors select-none">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-lg bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400">
                  <Minus size={18} />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Custos (CMV)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900 dark:text-white tabular-nums">- R$ {totalCMV.toFixed(2)}</span>
                <ChevronDown size={20} className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform duration-300" />
              </div>
            </summary>
            <div className="px-4 pb-4 pt-0 bg-gray-50/50 dark:bg-black/20 border-t border-gray-100 dark:border-white/5">
              <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 dark:border-white/10">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Insumos (Ingredientes)</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 tabular-nums">R$ {ingredientsCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 dark:border-white/10">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Mão de Obra Direta</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 tabular-nums">R$ {laborCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 last:border-0">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Equipamentos</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 tabular-nums">R$ {equipmentCost.toFixed(2)}</span>
              </div>
            </div>
          </details>

          {/* Subtotal: Lucro Bruto */}
          <div className="flex flex-col gap-1 px-4 py-3 bg-gray-100 dark:bg-[#1f2b36] rounded-lg mx-1 my-1 border-l-4 border-primary">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">(=) Lucro Bruto</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white tabular-nums">R$ {grossProfit.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-500 dark:text-text-secondary">Margem Bruta</span>
              <span className="text-xs font-bold text-primary tabular-nums">{netRevenue > 0 ? (grossProfit / netRevenue * 100).toFixed(1) : '0.0'}%</span>
            </div>
          </div>

          {/* 4. Despesas Operacionais */}
          <details className="group bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-white/5 overflow-hidden transition-all duration-200 open:shadow-lg">
            <summary className="flex cursor-pointer items-center justify-between p-4 bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 transition-colors select-none">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-lg bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400">
                  <Minus size={18} />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Despesas Operacionais</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900 dark:text-white tabular-nums">- R$ {totalOperationalExpenses.toFixed(2)}</span>
                <ChevronDown size={20} className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform duration-300" />
              </div>
            </summary>
            <div className="px-4 pb-4 pt-0 bg-gray-50/50 dark:bg-black/20 border-t border-gray-100 dark:border-white/5">
              <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 dark:border-white/10">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Entregadores (Taxas)</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 tabular-nums">R$ {deliveryFees.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 dark:border-white/10">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Despesas Registradas</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 tabular-nums">R$ {operationalExpenses.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 text-[10px] text-gray-500 dark:text-gray-400 pl-11">
                <span>Total de despesas pagas</span>
                <span className="font-medium">{expenses.filter(e => e.status === 'Pago').length} lançamentos</span>
              </div>
            </div>
          </details>

          {/* Subtotal: EBIT */}
          <div className="flex justify-between items-center px-4 py-3 bg-gray-100 dark:bg-[#1f2b36] rounded-lg mx-1 my-1 border-l-4 border-gray-400 dark:border-gray-500">
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">(=) EBIT Operacional</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white tabular-nums">R$ {ebit.toFixed(2)}</span>
          </div>

          {/* 5. Não Operacionais */}
          <details className="group bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-white/5 overflow-hidden transition-all duration-200 open:shadow-lg">
            <summary className="flex cursor-pointer items-center justify-between p-4 bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 transition-colors select-none">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  <Percent size={18} />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Result. Financeiro</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900 dark:text-white tabular-nums">R$ {financialResult.toFixed(2)}</span>
                <ChevronDown size={20} className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform duration-300" />
              </div>
            </summary>
            <div className="px-4 pb-4 pt-0 bg-gray-50/50 dark:bg-black/20 border-t border-gray-100 dark:border-white/5">
              <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 dark:border-white/10">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Receitas de Juros</span>
                <span className="text-xs font-medium text-green-600 dark:text-green-400 tabular-nums">+ R$ {financialResult.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 last:border-0">
                <span className="text-xs text-gray-600 dark:text-text-secondary pl-11">Despesas Bancárias</span>
                <span className="text-xs font-medium text-red-600 dark:text-red-400 tabular-nums">- R$ 0,00</span>
              </div>
            </div>
          </details>

          {/* Subtotal: LAIR */}
          <div className="flex justify-between items-center px-4 py-2 mx-1 mt-1 opacity-70">
            <span className="text-xs font-semibold text-gray-600 dark:text-text-secondary uppercase tracking-wide">(=) LAIR (Antes Impostos)</span>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 tabular-nums">R$ {lair.toFixed(2)}</span>
          </div>

          {/* 6. Impostos */}
          <div className="flex items-center justify-between p-4 bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-white/5 mx-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-lg bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400">
                <Landmark size={18} />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Impostos (IR/CSLL)</span>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white tabular-nums">- R$ {taxes.toFixed(2)}</span>
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
              <div className="px-2 py-1 rounded bg-white/20 text-xs font-bold backdrop-blur-sm">
                {netIncome >= 0 ? 'Lucro' : 'Prejuízo'}
              </div>
            </div>
            <div className="flex justify-between items-end mt-2 z-10">
              <h2 className="text-3xl font-extrabold tracking-tight tabular-nums">R$ {netIncome.toFixed(2)}</h2>
            </div>
            <div className="mt-4 pt-3 border-t border-white/20 flex items-center gap-4 z-10">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase opacity-80">Margem Líquida</span>
                <span className="text-sm font-bold">{grossRevenue > 0 ? (netIncome / grossRevenue * 100).toFixed(1) : '0.0'}%</span>
              </div>
              <div className="h-6 w-px bg-white/20"></div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase opacity-80">Rentabilidade</span>
                <span className="text-sm font-bold">{netIncome >= 0 ? 'Positiva' : 'Negativa'}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <DREFilterModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)} 
        onApply={handleApplyFilters} 
      />
    </div>
  );
};

export default DRECompleta;