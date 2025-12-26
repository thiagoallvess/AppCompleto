"use client";

import { ArrowLeft, Filter, TrendingUp, TrendingDown, Star, Clock, Truck, Search, Calendar, ChevronRight, BarChart3, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useStock } from "@/contexts/StockContext";
import { useProducts } from "@/contexts/ProductsContext";
import { useOrders } from "@/contexts/OrdersContext";
import { useExpenses } from "@/contexts/ExpensesContext";

const RelatoriosEstoque = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30days");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const { ingredients, packagingItems, getStockMovementsForDisplay } = useStock();
  const { products } = useProducts();
  const { orders } = useOrders();
  const { expenses } = useExpenses();

  const periods = ["30days", "month", "quarter"];

  // Calcular métricas reais
  const allStockItems = [...ingredients, ...packagingItems];
  const totalStockValue = allStockItems.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0);
  const totalItems = allStockItems.length;
  
  // Ocupação: baseado no valor total do estoque vs um valor máximo estimado
  const maxStockValue = 10000; // Valor máximo estimado para cálculo de ocupação
  const occupancyRate = Math.min((totalStockValue / maxStockValue) * 100, 100);

  // Perdas: calcular baseado em itens com status crítico ou perdas registradas
  const criticalItems = allStockItems.filter(item => item.status === "Crítico");
  const lossesValue = criticalItems.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0);

  // Custos de Armazenamento: calcular baseado em despesas de utilidades
  const storageCosts = expenses
    .filter(exp => exp.category === "Utilidades" || exp.category === "Operacional")
    .reduce((sum, exp) => sum + exp.amount, 0);

  // Giro de Estoque: calcular turnover rate baseado em vendas vs estoque médio
  const soldItems = orders
    .filter(order => !order.cancelled)
    .reduce((sum, order) => sum + order.items.length, 0);
  
  const avgStockValue = totalStockValue; // Simplificado para este cálculo
  const turnoverRate = avgStockValue > 0 ? (soldItems / avgStockValue) * 100 : 0;

  // Tendência de Consumo: calcular baseado em movimentações recentes
  const stockMovements = getStockMovementsForDisplay();
  const recentMovements = stockMovements.slice(0, 30); // Últimos 30 dias
  const totalConsumed = recentMovements
    .filter(m => m.quantity < 0) // Movimentações de saída
    .reduce((sum, m) => sum + Math.abs(m.quantity), 0);

  // Alertas baseados em dados reais
  const alerts = [
    ...(criticalItems.length > 0 ? [{
      id: 1,
      name: `${criticalItems.length} item(ns) crítico(s)`,
      detail: "Estoque abaixo do mínimo",
      color: "red",
      icon: "warning"
    }] : []),
    ...(lossesValue > 0 ? [{
      id: 2,
      name: "Perdas identificadas",
      detail: `R$ ${lossesValue.toFixed(2)} em itens críticos`,
      color: "orange",
      icon: "delete_forever"
    }] : []),
    ...(totalConsumed > 0 ? [{
      id: 3,
      name: "Consumo ativo",
      detail: `${totalConsumed.toFixed(1)} unidades consumidas`,
      color: "blue",
      icon: "trending_down"
    }] : [])
  ];

  const kpis = [
    { 
      label: "Ocupação", 
      value: `${occupancyRate.toFixed(0)}%`, 
      trend: occupancyRate > 80 ? "Alta ocupação" : "Ocupação normal", 
      trendColor: occupancyRate > 90 ? "text-red-500" : "text-emerald-500", 
      icon: "inventory_2", 
      iconColor: occupancyRate > 90 ? "text-red-500" : "text-emerald-500" 
    },
    { 
      label: "Perdas", 
      value: `R$ ${lossesValue.toFixed(0)}`, 
      trend: lossesValue > 100 ? "Perdas elevadas" : "Controle adequado", 
      trendColor: lossesValue > 100 ? "text-red-500" : "text-emerald-500", 
      icon: "delete_forever", 
      iconColor: lossesValue > 100 ? "text-red-500" : "text-emerald-500" 
    },
    { 
      label: "Custos Arm.", 
      value: `R$ ${storageCosts.toFixed(0)}`, 
      trend: storageCosts > 500 ? "Custos elevados" : "Custos controlados", 
      trendColor: storageCosts > 500 ? "text-red-500" : "text-emerald-500", 
      icon: "warehouse", 
      iconColor: storageCosts > 500 ? "text-red-500" : "text-emerald-500" 
    },
    { 
      label: "Giro Estoque", 
      value: `${turnoverRate.toFixed(1)}x`, 
      trend: turnoverRate > 2 ? "Giro saudável" : "Giro lento", 
      trendColor: turnoverRate > 2 ? "text-emerald-500" : "text-amber-500", 
      icon: "autorenew", 
      iconColor: turnoverRate > 2 ? "text-emerald-500" : "text-amber-500" 
    },
  ];

  const getAlertColor = (color: string) => {
    switch (color) {
      case 'red': return { border: 'border-l-red-500', bg: 'bg-red-500/10', text: 'text-red-500', detailText: 'text-red-400' };
      case 'orange': return { border: 'border-l-orange-500', bg: 'bg-orange-500/10', text: 'text-orange-500', detailText: 'text-orange-400' };
      case 'blue': return { border: 'border-l-blue-500', bg: 'bg-blue-500/10', text: 'text-blue-500', detailText: 'text-blue-400' };
      default: return { border: 'border-l-slate-500', bg: 'bg-slate-500/10', text: 'text-slate-500', detailText: 'text-slate-400' };
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-white font-display antialiased">
      <div className="max-w-4xl mx-auto w-full flex flex-col min-h-screen border-x border-neutral-800/20 dark:border-neutral-800">
        
        {/* Header */}
        <header className="sticky top-0 z-50 flex items-center justify-between p-4 pb-2 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-neutral-800/10 dark:border-neutral-800/50">
          <Link
            to="/visao-geral"
            className="flex size-10 items-center justify-center rounded-full hover:bg-neutral-200 dark:hover:bg-white/5 transition-all active:scale-95"
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">Desempenho de Estoque</h1>
          <button className="flex size-10 items-center justify-center rounded-full hover:bg-neutral-200 dark:hover:bg-white/5 transition-colors">
            <Filter size={24} />
          </button>
        </header>

        {/* Date Filters */}
        <div className="flex gap-3 p-4 overflow-x-auto no-scrollbar">
          {periods.map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition active:scale-95 text-sm font-bold ${
                selectedPeriod === period 
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "bg-slate-200 dark:bg-surface-highlight text-slate-600 dark:text-neutral-300"
              }`}
            >
              {period === "30days" ? "30 Dias" : period === "month" ? "Este Mês" : "Trimestre"}
            </button>
          ))}
        </div>

        {/* KPI Grid */}
        <div className="px-4 pb-2">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {kpis.map((stat, idx) => (
              <div key={idx} className="flex min-w-[140px] flex-1 flex-col gap-3 rounded-xl p-5 bg-white dark:bg-surface-dark border border-neutral-800/10 dark:border-neutral-800 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-slate-100 dark:bg-neutral-700/50 rounded-md">
                    <span className={`material-symbols-outlined ${stat.iconColor}`} style={{ fontSize: '18px' }}>{stat.icon}</span>
                  </div>
                  <p className="text-slate-500 dark:text-neutral-400 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <p className={`text-[10px] font-bold ${stat.trendColor}`}>
                      {stat.trend}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Section */}
        <div className="px-4 py-2">
          <div className="flex flex-col gap-2 rounded-xl bg-white dark:bg-surface-dark p-5 border border-neutral-800/10 dark:border-neutral-800 shadow-sm">
            <div className="flex justify-between items-end mb-2">
              <div className="flex flex-col">
                <p className="text-slate-500 dark:text-neutral-400 text-sm font-bold uppercase tracking-wider">Tendência de Consumo</p>
                <p className="text-2xl font-bold mt-1">{totalConsumed.toFixed(1)} Unidades</p>
              </div>
              <div className="bg-slate-100 dark:bg-neutral-800 px-2 py-1 rounded text-[10px] font-bold text-slate-500 dark:text-neutral-300">
                {selectedPeriod === "30days" ? "Últimos 30 dias" : selectedPeriod === "month" ? "Este mês" : "Este trimestre"}
              </div>
            </div>
            
            {/* SVG Chart Simulation */}
            <div className="w-full h-[120px] relative overflow-hidden mt-4">
              <svg className="h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 478 150" width="100%">
                <defs>
                  <linearGradient id="chart_grad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#137fec" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#137fec" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 100 L0 70 L16.6 60 L33.2 80 L50 40 L66.6 50 L83.2 30 L100 45 L100 100 Z" fill="url(#chart_grad)" />
                <path d="M0 70 L16.6 60 L33.2 80 L50 40 L66.6 50 L83.2 30 L100 45" fill="none" stroke="#137fec" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
              </svg>
            </div>
            <div className="flex justify-between mt-2 px-1">
              {["Sem 1", "Sem 2", "Sem 3", "Sem 4"].map(s => (
                <p key={s} className="text-slate-400 dark:text-neutral-500 text-[10px] font-bold uppercase tracking-wider">{s}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts / Action Items */}
        <section className="px-4 py-4">
          <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white mb-3">Alertas de Estoque</h2>
          <div className="flex flex-col gap-3">
            {alerts.map(alert => {
              const classes = getAlertColor(alert.color);
              return (
                <div key={alert.id} className={`flex items-center gap-4 rounded-xl bg-white dark:bg-surface-dark p-4 pr-4 border-l-4 ${classes.border} border border-slate-200 dark:border-slate-800 shadow-sm`}>
                  <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${classes.bg}`}>
                    <span className={`material-symbols-outlined ${classes.text}`}>{alert.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-bold text-slate-900 dark:text-white">{alert.name}</p>
                    <p className={`text-sm ${classes.detailText}`}>{alert.detail}</p>
                  </div>
                  <Link to="/estoque-critico">
                    <button className="flex size-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 active:bg-slate-200 dark:active:bg-slate-700">
                      <ChevronRight size={16} />
                    </button>
                  </Link>
                </div>
              );
            })}
            {alerts.length === 0 && (
              <div className="text-center py-8 opacity-50">
                <p>Nenhum alerta ativo no momento.</p>
              </div>
            )}
          </div>
        </section>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 w-full bg-background-light dark:bg-background-dark border-t border-neutral-800/10 dark:border-neutral-800 px-6 py-3 flex justify-between items-center z-30">
          <Link to="/visao-geral" className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-[10px] font-medium">Painel</span>
          </Link>
          <Link to="/gestao-estoque" className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="text-[10px] font-medium">Estoque</span>
          </Link>
          <Link to="/relatorios" className="flex flex-col items-center gap-1 text-primary">
            <span className="material-symbols-outlined fill">bar_chart</span>
            <span className="text-[10px] font-bold">Relatórios</span>
          </Link>
          <Link to="/configuracoes-admin" className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-[10px] font-medium">Ajustes</span>
          </Link>
        </nav>

      </div>
    </div>
  );
};

export default RelatoriosEstoque;