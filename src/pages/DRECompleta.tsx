"use client";

import { ArrowLeft, Calendar, ChevronDown, Plus, Minus, Percent, Landmark, GripHorizontal, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import DREFilterModal from "@/components/DREFilterModal";
import { useOrders } from "@/contexts/OrdersContext";
import { useExpenses } from "@/contexts/ExpensesProvider";
import { useMarketplaces } from "@/contexts/MarketplacesContext";
import { useProducts } from "@/contexts/ProductsContext";
import { useRecipes } from "@/contexts/RecipesContext";

const DRECompleta = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState("Mensal");
  const [currentDateRange, setCurrentDateRange] = useState("Out 2023");
  
  const { orders } = useOrders();
  const { expenses } = useExpenses();
  const { marketplaces } = useMarketplaces();
  const { products } = useProducts();
  const { recipes } = useRecipes();

  const handleApplyFilters = (period: string, startDate?: string, endDate?: string) => {
    setCurrentPeriod(period);
    if (period === "Intervalo Personalizado" && startDate && endDate) {
      setCurrentDateRange(`${startDate} a ${endDate}`);
    } else {
      setCurrentDateRange("Período Selecionado");
    }
  };

  // ========== CÁLCULOS REAIS CONECTADOS ==========
  
  const financialData = useMemo(() => {
    const activeOrders = orders.filter(order => !order.cancelled);

    // 1. Receita Bruta (Total de vendas antes de qualquer dedução)
    const grossRevenue = activeOrders.reduce((sum, order) => {
      const orderGross = order.total + (order.discount || 0);
      return sum + orderGross;
    }, 0);

    // 2. Deduções: Descontos (Cupons)
    const totalDiscounts = activeOrders.reduce((sum, order) => sum + (order.discount || 0), 0);

    // 3. Deduções: Comissões de Marketplaces
    const totalCommissions = activeOrders.reduce((sum, order) => {
      // Tenta encontrar o marketplace pelo nome salvo no cliente/origem do pedido
      const marketplaceName = order.customer.includes("Venda Manual") 
        ? order.customer.split("(")[1]?.replace(")", "") 
        : "Venda Direta";
      
      const marketplace = marketplaces.find(m => m.name === marketplaceName);
      if (marketplace && marketplace.commissionRate > 0) {
        return sum + (order.total * (marketplace.commissionRate / 100));
      }
      return sum;
    }, 0);

    // 4. Deduções: Cashback (3% fixo simulado)
    const totalCashback = activeOrders.reduce((sum, order) => sum + (order.total * 0.03), 0);

    const netRevenue = grossRevenue - totalDiscounts - totalCommissions - totalCashback;

    // 5. Custos de Produção (CMV Real baseado nas receitas)
    const totalProductionCost = activeOrders.reduce((sum, order) => {
      let orderCost = 0;
      order.items.forEach(item => {
        const product = products.find(p => p.name === item.name);
        if (product?.recipeId) {
          const recipe = recipes.find(r => r.id.toString() === product.recipeId);
          if (recipe) {
            orderCost += (recipe.cost || 0) * item.quantity;
          }
        } else {
          // Fallback se não houver receita vinculada (40% do preço como custo)
          orderCost += (item.price * 0.4) * item.quantity;
        }
      });
      return sum + orderCost;
    }, 0);

    const grossProfit = netRevenue - totalProductionCost;

    // 6. Despesas Operacionais (Lançamentos manuais + Taxas de entrega)
    const operationalExpenses = expenses
      .filter(expense => expense.status === 'Pago')
      .reduce((sum, expense) => sum + expense.amount, 0);

    const deliveryFees = activeOrders.filter(o => o.status === "Entregue").length * 5;
    const totalOpExpenses = operationalExpenses + deliveryFees;

    const ebit = grossProfit - totalOpExpenses;
    const taxes = ebit > 0 ? ebit * 0.06 : 0; // Simulação de 6% de imposto (Simples Nacional)
    const netIncome = ebit - taxes;

    return {
      grossRevenue,
      totalDiscounts,
      totalCommissions,
      totalCashback,
      netRevenue,
      totalProductionCost,
      grossProfit,
      totalOpExpenses,
      deliveryFees,
      operationalExpenses,
      ebit,
      taxes,
      netIncome
    };
  }, [orders, expenses, marketplaces, products, recipes]);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link to="/relatorios" className="flex items-center justify-center size-10 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Análise Real</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">DRE Completa</h1>
          </div>
        </div>
      </header>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 pl-4 pr-4 pt-4">
        <button onClick={() => setIsFilterModalOpen(true)} className="flex h-9 px-4 rounded-full bg-primary text-white text-sm font-semibold shadow-lg active:scale-95">
          {currentPeriod}
        </button>
        <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
          <Calendar size={16} /> {currentDateRange}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-4 space-y-6">
        {/* Card de Resultado Final */}
        <div className="rounded-2xl p-6 bg-slate-900 dark:bg-surface-dark text-white shadow-xl border border-white/5">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Lucro Líquido Real</span>
          <div className="flex items-baseline gap-2 mt-1">
            <h2 className="text-4xl font-black">R$ {financialData.netIncome.toFixed(2)}</h2>
            <span className={`text-sm font-bold ${financialData.netIncome >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {financialData.grossRevenue > 0 ? ((financialData.netIncome / financialData.grossRevenue) * 100).toFixed(1) : 0}%
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {/* Receita Bruta */}
          <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center"><Plus size={18}/></div>
              <span className="font-bold text-sm">Receita Bruta (Vendas)</span>
            </div>
            <span className="font-bold">R$ {financialData.grossRevenue.toFixed(2)}</span>
          </div>

          {/* Deduções */}
          <details className="group bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <summary className="flex cursor-pointer items-center justify-between p-4 list-none">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center"><Minus size={18}/></div>
                <span className="font-medium text-sm">Deduções e Comissões</span>
              </div>
              <span className="font-medium text-red-500">- R$ {(financialData.totalDiscounts + financialData.totalCommissions + financialData.totalCashback).toFixed(2)}</span>
            </summary>
            <div className="px-4 pb-4 space-y-2 text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-3">
              <div className="flex justify-between"><span>Descontos (Cupons)</span><span>R$ {financialData.totalDiscounts.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Comissões Marketplaces</span><span>R$ {financialData.totalCommissions.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Cashback</span><span>R$ {financialData.totalCashback.toFixed(2)}</span></div>
            </div>
          </details>

          {/* Receita Líquida */}
          <div className="bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg flex justify-between font-bold text-xs uppercase tracking-wider">
            <span>Receita Líquida</span>
            <span>R$ {financialData.netRevenue.toFixed(2)}</span>
          </div>

          {/* CMV */}
          <details className="group bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <summary className="flex cursor-pointer items-center justify-between p-4 list-none">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center"><Minus size={18}/></div>
                <span className="font-medium text-sm">Custos de Produção (CMV)</span>
              </div>
              <span className="font-medium text-red-500">- R$ {financialData.totalProductionCost.toFixed(2)}</span>
            </summary>
            <div className="px-4 pb-4 text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-3">
              <p>Cálculo baseado no custo unitário real das receitas vinculadas aos produtos vendidos.</p>
            </div>
          </details>

          {/* Lucro Bruto */}
          <div className="bg-primary/10 p-4 rounded-xl flex justify-between items-center border border-primary/20">
            <span className="font-bold text-primary uppercase text-xs">Lucro Bruto</span>
            <span className="font-bold text-primary">R$ {financialData.grossProfit.toFixed(2)}</span>
          </div>

          {/* Despesas Operacionais */}
          <details className="group bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <summary className="flex cursor-pointer items-center justify-between p-4 list-none">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center"><Minus size={18}/></div>
                <span className="font-medium text-sm">Despesas Operacionais</span>
              </div>
              <span className="font-medium text-red-500">- R$ {financialData.totalOpExpenses.toFixed(2)}</span>
            </summary>
            <div className="px-4 pb-4 space-y-2 text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-3">
              <div className="flex justify-between"><span>Despesas Fixas/Variáveis</span><span>R$ {financialData.operationalExpenses.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Taxas de Entrega</span><span>R$ {financialData.deliveryFees.toFixed(2)}</span></div>
            </div>
          </details>

          {/* Resultado Final */}
          <div className="pt-6">
            <div className="bg-primary p-6 rounded-2xl text-white shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold uppercase text-xs opacity-80">Resultado Líquido Final</span>
                <GripHorizontal size={20} className="opacity-50" />
              </div>
              <div className="flex justify-between items-end">
                <h3 className="text-3xl font-black">R$ {financialData.netIncome.toFixed(2)}</h3>
                <div className="text-right">
                  <p className="text-[10px] uppercase opacity-70">Margem Final</p>
                  <p className="font-bold">{financialData.grossRevenue > 0 ? ((financialData.netIncome / financialData.grossRevenue) * 100).toFixed(1) : 0}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <DREFilterModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} onApply={handleApplyFilters} />
    </div>
  );
};

export default DRECompleta;