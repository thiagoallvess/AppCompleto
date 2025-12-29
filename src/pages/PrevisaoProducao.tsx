import { ArrowLeft, TrendingUp, Calendar, Package, AlertTriangle, BarChart3, RefreshCw, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/contexts/OrdersContext";
import { useRecipes } from "@/contexts/RecipesContext";
import { useProducts } from "@/contexts/ProductsContext";
import { useStock } from "@/contexts/StockContext";
import { showSuccess } from "@/utils/toast";

const PrevisaoProducao = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const { orders } = useOrders();
  const { recipes } = useRecipes();
  const { products } = useProducts();
  const { ingredients, packagingItems } = useStock();

  // Análise histórica de vendas por receita
  const salesHistory = useMemo(() => {
    const now = new Date();
    const periodDays = selectedPeriod === "week" ? 7 : selectedPeriod === "month" ? 30 : 90;
    const periodStart = new Date(now.getTime() - (periodDays * 24 * 60 * 60 * 1000));

    const productSales = orders
      .filter(order => {
        const orderDate = new Date(order.date);
        return orderDate >= periodStart && !order.cancelled;
      })
      .reduce((acc, order) => {
        order.items.forEach(item => {
          // Vincular item vendido a receita via produto
          const product = products.find(p => p.name === item.name);
          if (product?.recipeId) {
            acc[product.recipeId] = (acc[product.recipeId] || 0) + item.quantity;
          }
        });
        return acc;
      }, {} as Record<string, number>);

    return productSales;
  }, [orders, products, selectedPeriod]);

  // Sugestões de produção baseadas no histórico
  const productionSuggestions = useMemo(() => {
    return Object.entries(salesHistory).map(([recipeId, totalSold]) => {
      const recipe = recipes.find(r => r.id === recipeId);
      if (!recipe) return null;

      const periodDays = selectedPeriod === "week" ? 7 : selectedPeriod === "month" ? 30 : 90;
      const avgDaily = totalSold / periodDays;
      const suggestedProduction = Math.ceil(avgDaily * 1.2); // +20% buffer para demanda variável
      const batchesNeeded = Math.ceil(suggestedProduction / recipe.quantity);

      // Calcular insumos necessários
      const requiredIngredients = recipe.ingredientsList?.map(ing => ({
        name: ing.name,
        required: ing.quantity * batchesNeeded,
        unit: ing.unit
      })) || [];

      const requiredPackaging = recipe.packagingList?.map(pack => ({
        name: pack.name,
        required: pack.quantity * batchesNeeded,
        unit: pack.unit
      })) || [];

      return {
        recipeId,
        recipeName: recipe.name,
        recipeImage: recipe.image,
        totalSold,
        avgDaily,
        suggestedProduction,
        batchesNeeded,
        requiredIngredients,
        requiredPackaging,
        unitCost: recipe.cost || 0,
        totalCost: (recipe.cost || 0) * suggestedProduction
      };
    }).filter(Boolean).sort((a, b) => b.suggestedProduction - a.suggestedProduction);
  }, [salesHistory, recipes, selectedPeriod]);

  // Verificar alertas de estoque para as sugestões
  const stockAlerts = useMemo(() => {
    const alerts = [];

    productionSuggestions.forEach(suggestion => {
      // Verificar ingredientes
      suggestion.requiredIngredients.forEach(ing => {
        const stockItem = ingredients.find(i => i.name === ing.name);
        if (stockItem && ing.required > stockItem.quantity) {
          alerts.push({
            type: 'ingredient',
            name: ing.name,
            required: ing.required,
            available: stockItem.quantity,
            deficit: ing.required - stockItem.quantity,
            recipe: suggestion.recipeName
          });
        }
      });

      // Verificar embalagens
      suggestion.requiredPackaging.forEach(pack => {
        const stockItem = packagingItems.find(p => p.name === pack.name);
        if (stockItem && pack.required > stockItem.quantity) {
          alerts.push({
            type: 'packaging',
            name: pack.name,
            required: pack.required,
            available: stockItem.quantity,
            deficit: pack.required - stockItem.quantity,
            recipe: suggestion.recipeName
          });
        }
      });
    });

    return alerts;
  }, [productionSuggestions, ingredients, packagingItems]);

  const handleRecalculate = () => {
    // Simular recálculo com dados atualizados
    showSuccess("Previsões recalculadas com base nos dados mais recentes!");
  };

  const totalSuggestedProduction = productionSuggestions.reduce((sum, s) => sum + s.suggestedProduction, 0);
  const totalEstimatedCost = productionSuggestions.reduce((sum, s) => sum + s.totalCost, 0);
  const totalAlerts = stockAlerts.length;

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
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Produção</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Previsão de Produção</h1>
          </div>
        </div>
      </header>

      {/* Period Selector */}
      <div className="px-4 py-6">
        <div className="flex h-12 w-full items-center justify-center rounded-xl bg-gray-200 dark:bg-surface-dark p-1">
          <label className="group flex cursor-pointer h-full flex-1 items-center justify-center rounded-lg px-2 transition-all has-[:checked]:bg-gray-100 dark:has-[:checked]:bg-gray-800 has-[:checked]:shadow-sm has-[:checked]:text-primary">
            <span className="text-sm font-semibold leading-normal">Próxima Semana</span>
            <input className="invisible w-0 h-0 absolute" name="period-filter" type="radio" value="week" checked={selectedPeriod === "week"} onChange={() => setSelectedPeriod("week")} />
          </label>
          <label className="group flex cursor-pointer h-full flex-1 items-center justify-center rounded-lg px-2 transition-all has-[:checked]:bg-gray-100 dark:has-[:checked]:bg-gray-800 has-[:checked]:shadow-sm has-[:checked]:text-primary">
            <span className="text-sm font-semibold leading-normal">Próximo Mês</span>
            <input checked={selectedPeriod === "month"} className="invisible w-0 h-0 absolute" name="period-filter" type="radio" value="month" onChange={() => setSelectedPeriod("month")} />
          </label>
          <label className="group flex cursor-pointer h-full flex-1 items-center justify-center rounded-lg px-2 transition-all has-[:checked]:bg-gray-100 dark:has-[:checked]:bg-gray-800 has-[:checked]:shadow-sm has-[:checked]:text-primary">
            <span className="text-sm font-semibold leading-normal">Próximo Trimestre</span>
            <input checked={selectedPeriod === "quarter"} className="invisible w-0 h-0 absolute" name="period-filter" type="radio" value="quarter" onChange={() => setSelectedPeriod("quarter")} />
          </label>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-3 rounded-xl p-5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-md">
                <Package className="text-primary" size={18} />
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Produção Sugerida</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{totalSuggestedProduction}</p>
              <p className="text-primary text-xs font-medium mt-1">Unidades totais</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-xl p-5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-green-500/10 rounded-md">
                <TrendingUp className="text-green-500" size={18} />
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Custo Estimado</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">R$ {totalEstimatedCost.toFixed(0)}</p>
              <p className="text-green-500 text-xs font-medium mt-1">Investimento necessário</p>
            </div>
          </div>
        </div>

        {/* Alerts Summary */}
        {totalAlerts > 0 && (
          <div className="mt-3 flex items-center gap-3 rounded-xl p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <AlertTriangle className="text-amber-500" size={24} />
            <div className="flex-1">
              <p className="text-sm font-bold text-amber-800 dark:text-amber-200">Atenção Necessária</p>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                {totalAlerts} item{totalAlerts !== 1 ? 's' : ''} em falta para cumprir as previsões
              </p>
            </div>
            <Link to="/lista-compras" className="px-3 py-1.5 rounded bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-colors">
              Ver Lista
            </Link>
          </div>
        )}
      </div>

      {/* Recalculate Action */}
      <div className="px-4 pb-4">
        <Button
          onClick={handleRecalculate}
          className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-primary text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98]"
        >
          <RefreshCw className="group-hover:rotate-180 transition-transform duration-500" size={20} />
          <span className="truncate">Recalcular Previsões</span>
        </Button>
        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-2">
          Baseado em vendas dos últimos {selectedPeriod === "week" ? "7" : selectedPeriod === "month" ? "30" : "90"} dias
        </p>
      </div>

      {/* Production Suggestions */}
      <div className="px-4 pb-24 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sugestões de Produção</h3>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{productionSuggestions.length} receita{productionSuggestions.length !== 1 ? 's' : ''}</span>
        </div>

        {productionSuggestions.length > 0 ? (
          productionSuggestions.map((suggestion) => (
            <div key={suggestion.recipeId} className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0">
                  <img src={suggestion.recipeImage} alt={suggestion.recipeName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{suggestion.recipeName}</h4>
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <BarChart3 size={14} />
                      {suggestion.totalSold} vendidos
                    </span>
                    <span className="flex items-center gap-1">
                      <Target size={14} />
                      {suggestion.avgDaily.toFixed(1)}/dia
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-primary">{suggestion.suggestedProduction} unidades</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">({suggestion.batchesNeeded} lote{suggestion.batchesNeeded !== 1 ? 's' : ''})</span>
                  </div>
                </div>
              </div>

              {/* Required Materials */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                  <span>Insumos Necessários</span>
                  <span>{suggestion.requiredIngredients.length + suggestion.requiredPackaging.length} itens</span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {suggestion.requiredIngredients.slice(0, 2).map((ing, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 px-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <span className="text-sm text-slate-700 dark:text-slate-300">{ing.name}</span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{ing.required} {ing.unit}</span>
                    </div>
                  ))}
                  {suggestion.requiredPackaging.slice(0, 1).map((pack, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 px-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <span className="text-sm text-slate-700 dark:text-slate-300">{pack.name}</span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{pack.required} {pack.unit}</span>
                    </div>
                  ))}
                  {(suggestion.requiredIngredients.length + suggestion.requiredPackaging.length) > 3 && (
                    <div className="text-center py-1">
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        +{(suggestion.requiredIngredients.length + suggestion.requiredPackaging.length) - 3} itens
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Cost Summary */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Custo Estimado</span>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">R$ {suggestion.totalCost.toFixed(2)}</div>
                </div>
                <Link to={`/add-producao?recipe=${suggestion.recipeId}`} className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors">
                  Produzir
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 opacity-50">
            <BarChart3 size={48} className="mx-auto mb-3 text-slate-300" />
            <p className="text-slate-500 dark:text-slate-400">Nenhuma sugestão disponível</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Verifique se há vendas registradas no período selecionado</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrevisaoProducao;