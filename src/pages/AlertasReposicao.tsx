"use client";

import { ArrowLeft, Filter, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useStock } from "@/contexts/StockContext";
import { useProducts } from "@/contexts/ProductsContext";

const AlertasReposicao = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const { ingredients, packagingItems } = useStock();
  const { products } = useProducts();

  // Calculate alerts for ingredients and packaging
  const stockAlerts = [
    ...ingredients.map(item => ({
      ...item,
      type: 'insumo' as const,
      current: item.quantity,
      minimum: item.minQuantity || 0,
      isCritical: item.quantity <= (item.minQuantity || 0),
      isAlert: item.quantity <= ((item.minQuantity || 0) * 1.5),
      suggestedPurchase: Math.max(0, (item.minQuantity || 0) - item.quantity + 10), // +10 buffer
      icon: 'inventory_2',
      iconBg: 'bg-red-50 dark:bg-red-900/20',
      iconColor: 'text-red-600 dark:text-red-400',
      status: item.quantity <= (item.minQuantity || 0) ? 'Crítico' : 'Alerta',
      statusColor: item.quantity <= (item.minQuantity || 0) ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
      borderColor: item.quantity <= (item.minQuantity || 0) ? 'border-l-red-500' : 'border-l-yellow-500'
    })),
    ...packagingItems.map(item => ({
      ...item,
      type: 'insumo' as const,
      current: item.quantity,
      minimum: item.minQuantity || 0,
      isCritical: item.quantity <= (item.minQuantity || 0),
      isAlert: item.quantity <= ((item.minQuantity || 0) * 1.5),
      suggestedPurchase: Math.max(0, (item.minQuantity || 0) - item.quantity + 20), // +20 buffer for packaging
      icon: 'package_2',
      iconBg: 'bg-yellow-50 dark:bg-yellow-900/20',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      status: item.quantity <= (item.minQuantity || 0) ? 'Crítico' : 'Alerta',
      statusColor: item.quantity <= (item.minQuantity || 0) ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
      borderColor: item.quantity <= (item.minQuantity || 0) ? 'border-l-red-500' : 'border-l-yellow-500'
    }))
  ].filter(item => item.isAlert);

  // Calculate alerts for finished products (low stock)
  const productAlerts = products
    .filter(product => product.stock <= 10 && product.isActive) // Low stock threshold
    .map(product => ({
      ...product,
      type: 'produto' as const,
      current: product.stock,
      minimum: 20, // Suggested minimum for products
      suggestedProduction: Math.max(0, 20 - product.stock + 10), // +10 buffer
      icon: 'icecream',
      iconBg: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-l-gray-400 dark:border-l-gray-600'
    }));

  // Combine and filter alerts
  const allAlerts = [...stockAlerts, ...productAlerts];
  const filteredAlerts = activeFilter === "Todos" 
    ? allAlerts 
    : activeFilter === "Insumos" 
    ? stockAlerts 
    : productAlerts;

  // Separate critical alerts (priority high)
  const criticalAlerts = filteredAlerts.filter(item => item.type === 'insumo' && item.isCritical);
  const otherAlerts = filteredAlerts.filter(item => !(item.type === 'insumo' && item.isCritical));

  const totalCritical = stockAlerts.filter(item => item.isCritical).length;
  const totalAlerts = allAlerts.length;

  const handleDismiss = (itemId: string) => {
    // In a real app, this would mark the alert as dismissed
    console.log('Dismiss alert for:', itemId);
  };

  const handleAddToCart = (item: any) => {
    // In a real app, this would add to shopping list
    console.log('Add to cart:', item);
  };

  const handlePlanProduction = (product: any) => {
    // In a real app, this would navigate to production planning
    console.log('Plan production for:', product);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            to="/visao-geral"
            className="flex items-center justify-center size-10 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Estoque</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Alertas de Reposição</h1>
          </div>
        </div>
        <div className="flex items-center justify-end pr-4">
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
            <Filter size={24} />
          </button>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="flex gap-3 p-4">
        <div className="flex flex-1 flex-col gap-1 rounded-xl p-4 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-red-500 text-sm">warning</span>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Críticos</p>
          </div>
          <p className="text-slate-900 dark:text-white text-2xl font-extrabold leading-tight">{totalCritical}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">Abaixo do mínimo</p>
        </div>
        <div className="flex flex-1 flex-col gap-1 rounded-xl p-4 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary text-sm">notifications</span>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Total</p>
          </div>
          <p className="text-slate-900 dark:text-white text-2xl font-extrabold leading-tight">{totalAlerts}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">Itens em alerta</p>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 px-4 pb-4 overflow-x-auto no-scrollbar">
        {["Todos", "Insumos", "Produtos Finais"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full pl-5 pr-5 transition-all active:scale-95 ${
              activeFilter === filter
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <span className={`text-sm ${activeFilter === filter ? "font-bold" : "font-medium"}`}>{filter}</span>
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="flex-1 px-4 pb-24 space-y-4">
        {/* Priority High Section */}
        {criticalAlerts.length > 0 && (
          <>
            <div className="pb-2 pt-2">
              <h3 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider opacity-80">Prioridade Alta</h3>
            </div>
            {criticalAlerts.map((item) => (
              <div key={item.id} className={`bg-white dark:bg-surface-dark rounded-xl p-4 border border-l-4 ${item.borderColor} border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-3">
                    <div className={`flex items-center justify-center size-10 rounded-lg ${item.iconBg} ${item.iconColor}`}>
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-bold text-base leading-tight">{item.name}</h4>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.category} ({item.unit})</span>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${item.statusColor}`}>
                    {item.status}
                  </span>
                </div>

                {/* Data Grid */}
                <div className="grid grid-cols-3 gap-2 mb-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                  <div className="flex flex-col items-center border-r border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold tracking-wide">Atual</span>
                    <span className="text-slate-900 dark:text-white font-bold text-lg">{item.current}</span>
                  </div>
                  <div className="flex flex-col items-center border-r border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold tracking-wide">Mínimo</span>
                    <span className="text-slate-500 dark:text-slate-300 font-medium text-lg">{item.minimum}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase text-primary font-bold tracking-wide">Comprar</span>
                    <span className="text-primary font-extrabold text-lg">+{item.suggestedPurchase}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleDismiss(item.id)}
                    className="flex-1 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    Dispensar
                  </button>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="flex-[2] h-10 rounded-lg bg-primary text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-primary/20"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                    Adicionar ({item.suggestedPurchase})
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Products Section */}
        {otherAlerts.filter(item => item.type === 'produto').length > 0 && (
          <>
            <div className="pb-2 pt-2">
              <h3 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider opacity-80">Produtos Finais</h3>
            </div>
            {otherAlerts.filter(item => item.type === 'produto').map((product) => (
              <div key={product.id} className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-l-4 border-l-slate-400 dark:border-l-slate-600 border-slate-200 dark:border-slate-800 shadow-sm opacity-90">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-3">
                    <div className="flex items-center justify-center size-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                      <span className="material-symbols-outlined">icecream</span>
                    </div>
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-bold text-base leading-tight">{product.name}</h4>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Produto Final</span>
                    </div>
                  </div>
                </div>

                {/* Data Grid - Compact for finished goods */}
                <div className="flex justify-between items-center mb-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">Estoque:</span>
                    <span className="text-slate-900 dark:text-white font-bold">{product.current} un</span>
                  </div>
                  <div className="h-4 w-px bg-slate-300 dark:bg-slate-600"></div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary text-xs font-bold uppercase">Produzir:</span>
                    <span className="text-primary font-extrabold">+{product.suggestedProduction}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    Ignorar
                  </button>
                  <button 
                    onClick={() => handlePlanProduction(product)}
                    className="flex-[2] h-9 rounded-lg bg-surface-dark dark:bg-white text-white dark:text-surface-dark text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-[18px]">factory</span>
                    Planejar Produção
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Empty State */}
        {filteredAlerts.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-slate-100 dark:bg-surface-dark p-6 rounded-full mb-4 mx-auto w-fit">
              <span className="material-symbols-outlined text-slate-400 text-4xl">notifications_off</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mb-2">Nenhum alerta de reposição</p>
            <p className="text-sm text-slate-400 dark:text-slate-500">Todos os itens estão com estoque adequado</p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      {totalAlerts > 0 && (
        <div className="fixed bottom-6 left-0 right-0 px-4 flex justify-center z-30">
          <button className="shadow-2xl shadow-primary/40 bg-primary hover:bg-blue-700 text-white rounded-full h-14 pl-6 pr-8 flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
            <div className="relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-primary">{totalAlerts}</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-bold leading-none">Ver Lista de Compras</span>
              <span className="text-[10px] font-medium opacity-80 leading-tight">{totalAlerts} itens pendentes</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertasReposicao;