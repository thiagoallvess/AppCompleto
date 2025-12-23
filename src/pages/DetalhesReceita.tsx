import { ArrowLeft, Edit } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useRecipes } from "@/contexts/RecipesContext";
import { useEffect, useState } from "react";

const DetalhesReceita = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const recipeId = searchParams.get('id');
  const { getRecipeById } = useRecipes();
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    if (recipeId) {
      const found = getRecipeById(Number(recipeId));
      if (found) {
        setRecipe(found);
      }
    }
  }, [recipeId, getRecipeById]);

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background-light dark:bg-background-dark">
        <p className="text-slate-500 mb-4">Receita não encontrada.</p>
        <Link to="/gestao-receitas" className="text-primary font-bold hover:underline">Voltar para Receitas</Link>
      </div>
    );
  }

  // Extração de dados garantindo compatibilidade com os nomes salvos
  const ingredients = recipe.ingredientsList || [];
  const packaging = recipe.packagingList || [];
  const equipment = recipe.equipmentList || [];
  const sellingPrice = recipe.sellingPrice || 0;
  
  const ingredientsCost = ingredients.reduce((sum: number, i: any) => sum + (i.totalCost || 0), 0);
  const packagingCost = packaging.reduce((sum: number, p: any) => sum + (p.totalCost || 0), 0);
  const equipmentCost = equipment.reduce((sum: number, e: any) => sum + (e.totalCost || 0), 0);
  const laborCostValue = recipe.time ? (parseFloat(recipe.time.replace(" min", "")) / 60) * 30 : 0;
  
  const totalCost = ingredientsCost + packagingCost + equipmentCost + laborCostValue;
  const unitCost = recipe.quantity > 0 ? totalCost / recipe.quantity : 0;
  
  const totalRevenue = sellingPrice * recipe.quantity;
  const totalProfit = totalRevenue - totalCost;
  const unitProfit = sellingPrice - unitCost;
  const margin = sellingPrice > 0 ? (unitProfit / sellingPrice) * 100 : 0;

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white max-w-7xl mx-auto shadow-2xl">
      <header className="sticky top-0 z-50 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 border-b border-gray-200 dark:border-gray-800 justify-between">
        <Link to="/gestao-receitas" className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-start cursor-pointer hover:opacity-70 transition-opacity">
          <ArrowLeft size={24} />
        </Link>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Detalhes da Receita</h2>
        <Link to={`/edit-receita?id=${recipe.id}`} className="flex size-12 items-center justify-end cursor-pointer hover:opacity-70 transition-opacity">
          <Edit className="text-primary text-2xl" />
        </Link>
      </header>

      <div className="flex-1 overflow-y-auto pb-8">
        <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
              <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{recipe.name}</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Rendimento: {recipe.quantity} unidades • Tempo: {recipe.time}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Ingredientes */}
            <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary text-xl">grocery</span>
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Ingredientes</h3>
              </div>
              <div className="space-y-3">
                {ingredients.length > 0 ? ingredients.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <div className="flex-1">
                      <p className="text-slate-900 dark:text-white text-sm font-medium">{item.name}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">{item.quantity} {item.unit}</p>
                    </div>
                    <p className="text-slate-900 dark:text-white text-sm font-semibold">R$ {item.totalCost.toFixed(2)}</p>
                  </div>
                )) : <p className="text-xs text-slate-400 italic">Nenhum ingrediente.</p>}
              </div>
            </div>

            {/* Embalagens */}
            <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary text-xl">inventory_2</span>
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Embalagens</h3>
              </div>
              <div className="space-y-3">
                {packaging.length > 0 ? packaging.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <div className="flex-1">
                      <p className="text-slate-900 dark:text-white text-sm font-medium">{item.name}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">{item.quantity} {item.unit}</p>
                    </div>
                    <p className="text-slate-900 dark:text-white text-sm font-semibold">R$ {item.totalCost.toFixed(2)}</p>
                  </div>
                )) : <p className="text-xs text-slate-400 italic">Nenhuma embalagem.</p>}
              </div>
            </div>

            {/* Equipamentos */}
            <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary text-xl">kitchen</span>
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Equipamentos</h3>
              </div>
              <div className="space-y-3">
                {equipment.length > 0 ? equipment.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <div className="flex-1">
                      <p className="text-slate-900 dark:text-white text-sm font-medium">{item.name}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">{item.minTime} min</p>
                    </div>
                    <p className="text-slate-900 dark:text-white text-sm font-semibold">R$ {item.totalCost.toFixed(2)}</p>
                  </div>
                )) : <p className="text-xs text-slate-400 italic">Nenhum equipamento.</p>}
              </div>
            </div>
          </div>

          {/* Sumário */}
          <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary text-xl">calculate</span>
              <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Sumário de Custos e Lucros</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Custos Totais</h4>
                <div className="flex justify-between text-sm"><span>Ingredientes</span><span>R$ {ingredientsCost.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span>Embalagens</span><span>R$ {packagingCost.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span>Equipamentos</span><span>R$ {equipmentCost.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span>Mão de Obra</span><span>R$ {laborCostValue.toFixed(2)}</span></div>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Totais</h4>
                <div className="flex justify-between text-sm"><span>Custo Total</span><span className="font-bold">R$ {totalCost.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span>Custo Unit.</span><span className="font-bold text-primary">R$ {unitCost.toFixed(2)}</span></div>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Lucros</h4>
                <div className="flex justify-between text-sm"><span>Lucro Total</span><span className="font-bold text-green-600">R$ {totalProfit.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span>Lucro Unit.</span><span className="font-bold text-green-600">R$ {unitProfit.toFixed(2)}</span></div>
              </div>
              <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4 flex flex-col justify-center items-center">
                <span className="text-primary text-xs font-bold uppercase mb-1">Margem</span>
                <span className="text-2xl font-black">{margin.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesReceita;