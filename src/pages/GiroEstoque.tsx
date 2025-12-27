"use client";

import { ArrowLeft, TrendingUp, TrendingDown, Star, Clock, Truck, Search, Calendar, ChevronRight, BarChart3, Download, Package, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useStock } from "@/contexts/StockContext";
import { useProducts } from "@/contexts/ProductsContext";
import { Button } from "@/components/ui/button";

const GiroEstoque = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [itemType, setItemType] = useState<"products" | "supplies">("products");
  const { ingredients, packagingItems } = useStock();
  const { products } = useProducts();

  // Calculate real data based on contexts
  const allStockItems = [...ingredients, ...packagingItems];
  const allProducts = products;

  // Calculate total value based on real data
  const totalValue = itemType === "products" 
    ? allProducts.reduce((sum, product) => sum + (product.stock * (product.price * 0.6)), 0) // Assuming 60% of price is cost
    : allStockItems.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0);

  // Calculate turnover rate (simplified: total value / average inventory value)
  // For demo purposes, using a formula based on available data
  const avgInventoryValue = totalValue / 2; // Simplified average
  const turnoverRate = totalValue > 0 ? (totalValue / avgInventoryValue) : 0;

  // Calculate average time (simplified based on item type)
  const avgTime = itemType === "products" ? "15 dias" : "25 dias"; // Based on typical industry averages

  // Calculate trend (simplified: positive for products, negative for supplies)
  const trendChange = itemType === "products" ? "+8%" : "-3%";
  const trendColor = itemType === "products" ? "text-emerald-500" : "text-red-500";
  const trendIcon = itemType === "products" ? TrendingUp : TrendingDown;

  // Get critical items from real data
  const criticalItems = itemType === "products"
    ? allProducts
        .filter(product => product.stock <= 10 && product.isActive)
        .map(product => ({
          name: product.name,
          stock: product.stock,
          turnover: product.stock <= 5 ? "Estagnado" : "Lento",
          time: product.stock <= 5 ? "60+ dias" : "30 dias",
          statusColor: product.stock <= 5 ? "red" : "amber",
          icon: "🍦"
        }))
    : allStockItems
        .filter(item => item.status === "Baixo" || item.status === "Crítico")
        .map(item => ({
          name: item.name,
          stock: item.quantity,
          turnover: item.status === "Crítico" ? "Estagnado" : "Lento",
          time: item.status === "Crítico" ? "45+ dias" : "25 dias",
          statusColor: item.status === "Crítico" ? "red" : "amber",
          icon: item.category === "Ingredientes" ? "🥛" : "📦"
        }));

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
            <h1 className="text-xl font-bold leading-tight tracking-tight">Giro de Estoque</h1>
          </div>
        </div>
      </header>

      {/* Period Filter Chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 pl-4 pr-4 pt-4">
        <button
          onClick={() => setSelectedPeriod("month")}
          className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition active:scale-95 ${
            selectedPeriod === "month"
              ? "bg-primary text-white shadow-lg shadow-primary/20"
              : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
        >
          <span className="text-xs font-medium whitespace-nowrap">Este Mês</span>
        </button>
        <button
          onClick={() => setSelectedPeriod("quarter")}
          className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition active:scale-95 ${
            selectedPeriod === "quarter"
              ? "bg-primary text-white shadow-lg shadow-primary/20"
              : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
        >
          <span className="text-xs font-bold whitespace-nowrap">Último Trimestre</span>
        </button>
        <button
          onClick={() => setSelectedPeriod("year")}
          className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition active:scale-95 ${
            selectedPeriod === "year"
              ? "bg-primary text-white shadow-lg shadow-primary/20"
              : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
        >
          <span className="text-xs font-medium whitespace-nowrap">Este Ano</span>
        </button>
        <button
          onClick={() => setSelectedPeriod("custom")}
          className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition active:scale-95 ${
            selectedPeriod === "custom"
              ? "bg-primary text-white shadow-lg shadow-primary/20"
              : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
        >
          <Calendar size={16} />
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-4 pb-32 space-y-6">
        {/* Segmented Control (Item Type) */}
        <div className="flex w-full">
          <div className="flex h-12 w-full items-center justify-center rounded-xl bg-slate-200 dark:bg-surface-dark p-1">
            <label className="flex cursor-pointer h-full flex-1 items-center justify-center overflow-hidden rounded-lg px-2 transition-all has-[:checked]:bg-white dark:has-[:checked]:bg-background-dark has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-slate-400">
              <span className="text-sm font-semibold leading-normal">Produtos Finais</span>
              <input 
                checked={itemType === "products"} 
                className="invisible w-0 h-0 absolute" 
                name="type_filter" 
                type="radio" 
                value="products"
                onChange={() => setItemType("products")}
              />
            </label>
            <label className="flex cursor-pointer h-full flex-1 items-center justify-center overflow-hidden rounded-lg px-2 transition-all has-[:checked]:bg-white dark:has-[:checked]:bg-background-dark has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-slate-400">
              <span className="text-sm font-semibold leading-normal">Insumos</span>
              <input 
                checked={itemType === "supplies"} 
                className="invisible w-0 h-0 absolute" 
                name="type_filter" 
                type="radio" 
                value="supplies"
                onChange={() => setItemType("supplies")}
              />
            </label>
          </div>
        </div>

        {/* Summary KPI Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Main KPI */}
          <div className="col-span-2 flex flex-col gap-3 rounded-xl p-5 bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Giro do Período</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-900 dark:text-white text-4xl font-bold tracking-tight">{turnoverRate.toFixed(1)}x</span>
                  <div className={`flex items-center ${trendColor} text-sm font-bold bg-opacity-10 px-1.5 py-0.5 rounded`}>
                    {trendIcon === TrendingUp ? <TrendingUp size={14} className="mr-0.5" /> : <TrendingDown size={14} className="mr-0.5" />}
                    {trendChange}
                  </div>
                </div>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <BarChart3 className="text-primary" size={24} />
              </div>
            </div>
            <p className="text-slate-400 text-xs">Frequência de renovação do estoque no período selecionado.</p>
          </div>
          {/* Secondary KPIs */}
          <div className="flex flex-col gap-2 rounded-xl p-4 bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 shadow-sm">
            <Clock className="text-slate-400" size={24} />
            <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Tempo Médio</span>
            <span className="text-slate-900 dark:text-white text-xl font-bold">{avgTime}</span>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-4 bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 shadow-sm">
            <Package className="text-slate-400" size={24} />
            <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Valor em Estoque</span>
            <span className="text-slate-900 dark:text-white text-xl font-bold">R$ {totalValue.toFixed(0)}</span>
          </div>
        </div>

        {/* Chart Section */}
        <div className="flex flex-col gap-4 pt-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Tendência de Saída</h3>
            <button className="text-primary text-xs font-semibold hover:underline">Ver Detalhes</button>
          </div>
          {/* Simple Chart Visualization (CSS only representation) */}
          <div className="relative w-full h-40 bg-white dark:bg-surface-dark rounded-xl border border-slate-100 dark:border-slate-800 p-4 flex items-end justify-between gap-2 overflow-hidden">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-10">
              <div className="w-full h-px bg-slate-500"></div>
              <div className="w-full h-px bg-slate-500"></div>
              <div className="w-full h-px bg-slate-500"></div>
              <div className="w-full h-px bg-slate-500"></div>
              <div className="w-full h-px bg-slate-500"></div>
            </div>
            {/* Bars (Mock data for visual representation) */}
            <div className="w-full bg-primary/20 rounded-t-sm h-[30%] relative group"></div>
            <div className="w-full bg-primary/30 rounded-t-sm h-[45%] relative group"></div>
            <div className="w-full bg-primary/40 rounded-t-sm h-[40%] relative group"></div>
            <div className="w-full bg-primary/60 rounded-t-sm h-[65%] relative group"></div>
            <div className="w-full bg-primary rounded-t-sm h-[85%] relative group shadow-[0_0_10px_rgba(25,76,179,0.4)]"></div>
            <div className="w-full bg-primary/50 rounded-t-sm h-[55%] relative group"></div>
            <div className="w-full bg-primary/30 rounded-t-sm h-[40%] relative group"></div>
            <div className="w-full bg-primary/20 rounded-t-sm h-[25%] relative group"></div>
          </div>
          <div className="flex justify-between px-1 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
            <span>Sem 1</span>
            <span>Sem 2</span>
            <span>Sem 3</span>
            <span>Sem 4</span>
          </div>
        </div>

        {/* List Header */}
        <div className="flex flex-col gap-3 pt-2">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold px-1">Itens por Giro</h3>
          {/* List Items */}
          <div className="flex flex-col gap-3">
            {criticalItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 rounded-xl bg-white dark:bg-surface-dark p-4 shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500">
                  <span className="text-xl">{item.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-slate-900 dark:text-white font-semibold truncate pr-2">{item.name}</h4>
                    <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">{item.stock} un</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                      item.statusColor === 'emerald' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                      item.statusColor === 'amber' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' :
                      'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                    }`}>
                      <span className="material-symbols-outlined text-[14px]">{item.statusColor === 'emerald' ? 'bolt' : item.statusColor === 'amber' ? 'hourglass_top' : 'warning'}</span>
                      {item.turnover}
                    </span>
                    <span className="text-slate-400 text-xs">• Sai em {item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
        <Button className="w-full max-w-md mx-auto bg-primary hover:bg-blue-600 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
          <Download size={20} />
          <span>Exportar Relatório</span>
        </Button>
      </div>
    </div>
  );
};

export default GiroEstoque;