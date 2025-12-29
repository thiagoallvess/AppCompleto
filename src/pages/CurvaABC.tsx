"use client";

import { useState, useMemo } from "react";
import { ArrowLeft, TrendingUp, BarChart3, Filter, Package, ChefHat, DollarSign, Percent, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useProducts } from "@/contexts/ProductsContext";
import { useStock } from "@/contexts/StockContext";

const CurvaABC = () => {
  const [viewMode, setViewMode] = useState<"billing" | "profitability">("billing");
  const [itemType, setItemType] = useState<"products" | "supplies">("products");
  const [period, setPeriod] = useState<"month" | "quarter" | "year">("month");

  const { products } = useProducts();
  const { ingredients, packagingItems } = useStock();

  // Calcular Curva ABC baseada nos dados reais
  const abcData = useMemo(() => {
    let items = [];
    
    if (itemType === "products") {
      // Para produtos: usar faturamento (simulado baseado em preço e estoque) ou lucratividade
      items = products
        .filter(p => p.isActive)
        .map(product => {
          const baseValue = viewMode === "billing" 
            ? product.price * (product.stock || 0) // Faturamento potencial
            : (product.price - (product.price * 0.4)) * (product.stock || 0); // Lucratividade estimada (60% margem)
          return {
            id: product.id,
            name: product.name,
            value: baseValue,
            volume: product.stock || 0,
            percentage: 0, // Calculado abaixo
            class: 'C' as 'A' | 'B' | 'C'
          };
        });
    } else {
      // Para insumos: usar custo total ou consumo
      const allSupplies = [...ingredients, ...packagingItems];
      items = allSupplies.map(supply => {
        const baseValue = viewMode === "billing" 
          ? supply.quantity * supply.unitCost // Custo total
          : supply.quantity * supply.unitCost; // Mesmo para lucratividade (simplificado)
        return {
          id: supply.id,
          name: supply.name,
          value: baseValue,
          volume: supply.quantity,
          percentage: 0,
          class: 'C' as 'A' | 'B' | 'C'
        };
      });
    }

    // Ordenar por valor decrescente
    items.sort((a, b) => b.value - a.value);
    
    // Calcular percentuais acumulados e classificar
    const totalValue = items.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;
    
    items.forEach(item => {
      item.percentage = (item.value / totalValue) * 100;
      cumulativePercentage += item.percentage;
      
      if (cumulativePercentage <= 80) {
        item.class = 'A';
      } else if (cumulativePercentage <= 95) {
        item.class = 'B';
      } else {
        item.class = 'C';
      }
    });

    return items;
  }, [products, ingredients, packagingItems, itemType, viewMode]);

  const classCounts = useMemo(() => {
    const counts = { A: 0, B: 0, C: 0 };
    abcData.forEach(item => counts[item.class]++);
    return counts;
  }, [abcData]);

  const getClassColor = (classType: 'A' | 'B' | 'C') => {
    switch (classType) {
      case 'A': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'B': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'C': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getClassDescription = (classType: 'A' | 'B' | 'C') => {
    switch (classType) {
      case 'A': return 'Alta importância - Foco rigoroso';
      case 'B': return 'Importância média - Acompanhamento regular';
      case 'C': return 'Baixa importância - Otimização possível';
    }
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
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Análise</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Curva ABC</h1>
          </div>
        </div>
      </header>

      {/* Segmented Control */}
      <div className="px-4 py-6">
        <div className="flex h-12 w-full items-center justify-center rounded-xl bg-gray-200 dark:bg-surface-dark p-1">
          <label className="flex cursor-pointer h-full flex-1 items-center justify-center rounded-lg px-2 transition-all has-[:checked]:bg-gray-100 dark:has-[:checked]:bg-gray-800 has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-gray-400">
            <span className="text-sm font-semibold leading-normal">Por Faturamento</span>
            <input
              checked={viewMode === "billing"}
              className="peer sr-only"
              name="view-mode"
              type="radio"
              value="billing"
              onChange={() => setViewMode("billing")}
            />
          </label>
          <label className="flex cursor-pointer h-full flex-1 items-center justify-center rounded-lg px-2 transition-all has-[:checked]:bg-gray-100 dark:has-[:checked]:bg-gray-800 has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-gray-400">
            <span className="text-sm font-semibold leading-normal">Por Lucratividade</span>
            <input
              checked={viewMode === "profitability"}
              className="peer sr-only"
              name="view-mode"
              type="radio"
              value="profitability"
              onChange={() => setViewMode("profitability")}
            />
          </label>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setItemType("products")}
            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition active:scale-95 ${
              itemType === "products"
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <Package size={16} />
            <span className="text-xs font-medium whitespace-nowrap">Produtos</span>
          </button>
          <button
            onClick={() => setItemType("supplies")}
            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition active:scale-95 ${
              itemType === "supplies"
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <ChefHat size={16} />
            <span className="text-xs font-medium whitespace-nowrap">Insumos</span>
          </button>
        </div>
      </div>

      {/* Class Summary */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-2 rounded-xl p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-green-500"></div>
              <span className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">Classe A</span>
            </div>
            <p className="text-2xl font-bold text-green-700 dark:text-green-400">{classCounts.A}</p>
            <p className="text-xs text-green-600 dark:text-green-500">Itens críticos</p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-yellow-500"></div>
              <span className="text-xs font-bold text-yellow-700 dark:text-yellow-400 uppercase tracking-wider">Classe B</span>
            </div>
            <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">{classCounts.B}</p>
            <p className="text-xs text-yellow-600 dark:text-yellow-500">Importância média</p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-4 bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-gray-500"></div>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-400 uppercase tracking-wider">Classe C</span>
            </div>
            <p className="text-2xl font-bold text-gray-700 dark:text-gray-400">{classCounts.C}</p>
            <p className="text-xs text-gray-600 dark:text-gray-500">Baixa prioridade</p>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="px-4 pb-24 space-y-3">
        {abcData.map((item, index) => (
          <div key={item.id} className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center size-8 rounded-lg ${getClassColor(item.class)}`}>
                  <span className="text-sm font-bold">{item.class}</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{getClassDescription(item.class)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 dark:text-white">R$ {item.value.toFixed(2)}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.percentage.toFixed(1)}% do total</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-slate-500 font-semibold mb-1">Volume</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{item.volume} un</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-slate-500 font-semibold mb-1">Participação</span>
                <span className="text-sm font-bold text-primary">{item.percentage.toFixed(1)}%</span>
              </div>
            </div>

            {/* Strategic Actions */}
            <div className="flex gap-2">
              {item.class === 'A' && (
                <>
                  <Link to="/estoque-critico" className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors">
                    <Package size={14} />
                    Controle Estoque
                  </Link>
                  <Link to="/gestao-producao" className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-bold hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors">
                    <TrendingUp size={14} />
                    Foco Produção
                  </Link>
                </>
              )}
              {item.class === 'B' && (
                <Link to="/relatorios" className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs font-bold hover:bg-yellow-200 dark:hover:bg-yellow-900/30 transition-colors">
                  <BarChart3 size={14} />
                  Acompanhar
                </Link>
              )}
              {item.class === 'C' && (
                <>
                  <Link to="/lista-compras" className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-400 text-xs font-bold hover:bg-gray-200 dark:hover:bg-gray-900/30 transition-colors">
                    <Package size={14} />
                    Otimizar Compra
                  </Link>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-xs font-bold hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors">
                    <ArrowRight size={14} />
                    Avaliar Descontinuação
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 flex h-20 pb-4 items-center justify-around bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 backdrop-blur-lg bg-opacity-95">
        <Link to="/visao-geral" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-medium">Início</span>
        </Link>
        <Link to="/gestao-pedidos" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">list_alt</span>
          <span className="text-[10px] font-medium">Pedidos</span>
        </Link>
        <Link to="/gestao-produtos" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">inventory</span>
          <span className="text-[10px] font-medium">Produtos</span>
        </Link>
        <button className="flex flex-col items-center gap-1 p-2 w-16 text-primary">
          <span className="material-symbols-outlined fill-current">analytics</span>
          <span className="text-[10px] font-medium">Análise</span>
        </button>
      </nav>
    </div>
  );
};

export default CurvaABC;