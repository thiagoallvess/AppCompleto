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
              <div className="p-1.5 bg-slate-100 dark:bg-neutral-700/50 rounded-md">
                <Package size={18} />
              </div>
              <p className="text-slate-500 dark:text-neutral-400 text-xs font-bold uppercase tracking-wider">Produção Sugerida</p>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{totalSuggestedProduction}</p>
              <p className="text-primary text-[10px] font-medium mt-1">Unidades recomendadas</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-xl p-5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-slate-100 dark:bg-neutral-700/50 rounded-md">
                <AlertTriangle size={18} />
              </div>
              <p className="text-slate-500 dark:text-neutral-400 text-xs font-bold uppercase tracking-wider">Alertas Estoque</p>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{totalAlerts}</p>
              <p className="text-red-500 text-[10px] font-medium mt-1">Itens insuficientes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Production Suggestions */}
      <div className="px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold">Sugestões de Produção</h3>
          <Button onClick={handleRecalculate} variant="outline" size="sm" className="flex items-center gap-2">
            <RefreshCw size={16} />
            Recalcular
          </Button>
        </div>

        <div className="space-y-4">
          {productionSuggestions.map((suggestion, index) => (
            <div key={suggestion.recipeId} className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden flex-shrink-0">
                  <img src={suggestion.recipeImage} alt={suggestion.recipeName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-slate-900 dark:text-white font-bold text-base mb-1">{suggestion.recipeName}</h4>
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span>Vendidos: {suggestion.totalSold} un</span>
                    <span>Média diária: {suggestion.avgDaily.toFixed(1)} un</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Produção Sugerida</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{suggestion.suggestedProduction} un</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{suggestion.batchesNeeded} lote(s)</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Custo Estimado</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">R$ {suggestion.totalCost.toFixed(2)}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">R$ {suggestion.unitCost.toFixed(2)}/un</p>
                </div>
              </div>

              {/* Stock Alerts */}
              {stockAlerts.filter(alert => alert.recipe === suggestion.recipeName).length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="text-red-500" size={16} />
                    <p className="text-red-700 dark:text-red-400 text-sm font-medium">Estoque Insuficiente</p>
                  </div>
                  <div className="space-y-1">
                    {stockAlerts.filter(alert => alert.recipe === suggestion.recipeName).map((alert, idx) => (
                      <p key={idx} className="text-red-600 dark:text-red-300 text-xs">
                        {alert.name}: {alert.available.toFixed(1)} {alert.type === 'ingredient' ? 'disponível' : 'disponíveis'} • 
                        Necessário: {alert.required.toFixed(1)} • Deficit: {alert.deficit.toFixed(1)}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {productionSuggestions.length === 0 && (
            <div className="text-center py-12 opacity-50">
              <BarChart3 size={48} className="mx-auto mb-3 text-slate-300" />
              <p className="text-slate-500 dark:text-slate-400">Nenhuma sugestão de produção disponível.</p>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Verifique se há vendas registradas no período selecionado.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 flex h-20 pb-4 items-center justify-around bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 backdrop-blur-lg bg-opacity-95">
        <Link to="/visao-geral" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-medium">Início</span>
        </Link>
        <Link to="/gestao-producao" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">conveyor_belt</span>
          <span className="text-[10px] font-medium">Produção</span>
        </Link>
        <Link to="/gestao-estoque" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">inventory</span>
          <span className="text-[10px] font-medium">Estoque</span>
        </Link>
        <button className="flex flex-col items-center gap-1 p-2 w-16 text-primary">
          <span className="material-symbols-outlined fill-current">analytics</span>
          <span className="text-[10px] font-medium">Análise</span>
        </button>
      </nav>
    </div>
  );
};

export default PrevisaoProducao;