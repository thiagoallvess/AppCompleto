import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRecipes } from "@/contexts/RecipesContext";
import { showSuccess, showError } from "@/utils/toast";

const AddProducao = () => {
  const navigate = useNavigate();
  const { recipes } = useRecipes();
  const [selectedRecipeId, setSelectedRecipeId] = useState("");
  const [quantity, setQuantity] = useState("");

  // Encontra a receita selecionada na lista real
  const selectedRecipe = recipes.find(r => r.id.toString() === selectedRecipeId);
  
  // O custo unitário da receita já deve vir calculado do contexto de receitas
  // que engloba ingredientes, embalagens, equipamentos e mão de obra.
  const unitCost = selectedRecipe?.cost || 0;
  const qty = parseInt(quantity) || 0;
  const totalCost = unitCost * qty;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRecipeId || !selectedRecipe) {
      showError("Por favor, selecione uma receita.");
      return;
    }
    if (qty <= 0) {
      showError("A quantidade deve ser maior que zero.");
      return;
    }

    // Criar o novo lote com metadados detalhados
    const newLot = {
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      recipeId: selectedRecipeId,
      name: selectedRecipe.name,
      image: selectedRecipe.image,
      quantity: qty,
      produced: qty,
      unitCost: unitCost,
      totalCost: totalCost,
      status: "Finalizado",
      statusColor: "green",
      date: new Date().toISOString(),
      // Armazenamos um snapshot dos custos no momento da produção
      costBreakdown: {
        ingredients: (selectedRecipe as any).ingredientsList || [],
        packaging: (selectedRecipe as any).packagingList || [],
        equipment: (selectedRecipe as any).equipmentList || [],
        labor: (selectedRecipe as any).laborTime || 0
      }
    };

    // Salvar no localStorage
    try {
      const storedLots = localStorage.getItem('productionLots');
      const currentLots = storedLots ? JSON.parse(storedLots) : [];
      const updatedLots = [newLot, ...currentLots];
      localStorage.setItem('productionLots', JSON.stringify(updatedLots));
      
      showSuccess(`Produção de ${qty} unidades de ${selectedRecipe.name} registrada com sucesso!`);
      navigate("/gestao-producao");
    } catch (error) {
      console.error("Erro ao salvar produção:", error);
      showError("Erro ao registrar produção.");
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col pb-24 bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-x-hidden antialiased">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-white/90 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 border-b border-slate-200 dark:border-slate-800">
        <Link
          to="/gestao-producao"
          className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">arrow_back</span>
        </Link>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center text-slate-900 dark:text-white">Nova Produção</h1>
        <div className="size-10"></div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="recipe">
                Receita
              </label>
              <Select value={selectedRecipeId} onValueChange={setSelectedRecipeId}>
                <SelectTrigger className="w-full h-14 bg-white dark:bg-surface-dark border-slate-300 dark:border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary">
                  <SelectValue placeholder={recipes.length > 0 ? "Selecione a receita..." : "Nenhuma receita cadastrada"} />
                </SelectTrigger>
                <SelectContent>
                  {recipes.map((recipe) => (
                    <SelectItem key={recipe.id} value={recipe.id.toString()}>
                      {recipe.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {recipes.length === 0 && (
                <p className="text-xs text-red-500 px-1">
                  Você precisa cadastrar uma receita em "Gestão de Receitas" primeiro.
                </p>
              )}
            </div>

            {/* Quantity Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="quantity">
                Quantidade a Produzir
              </label>
              <div className="relative">
                <Input
                  id="quantity"
                  type="number"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full h-14 bg-white dark:bg-surface-dark border-slate-300 dark:border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary pr-12"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">un</span>
                </div>
              </div>
            </div>

            {/* Register Button */}
            <div className="pt-4">
              <Button
                onClick={handleSubmit}
                disabled={!selectedRecipeId || recipes.length === 0}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-blue-600 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined">save</span>
                Registrar Produção
              </Button>
            </div>
          </div>

          {/* Cost Preview Section */}
          <div className="space-y-6">
            <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-surface-dark">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-700/50">
                <span className="material-symbols-outlined text-primary text-xl">monetization_on</span>
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
                  Composição de Custos
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Custo Unitário Base</span>
                  <span className="text-slate-900 dark:text-white font-medium">R$ {unitCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Quantidade</span>
                  <span className="text-slate-900 dark:text-white font-medium">{qty}</span>
                </div>
                <div className="h-px w-full bg-slate-100 dark:bg-slate-700 my-2"></div>
                <div className="flex justify-between items-end pt-1">
                  <span className="text-base font-bold text-slate-800 dark:text-white">Custo Total do Lote</span>
                  <span className="text-xl font-bold text-primary">R$ {totalCost.toFixed(2)}</span>
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 dark:bg-black/20">
                <p className="text-[11px] leading-snug text-slate-500 dark:text-slate-400">
                  * Este valor inclui: Ingredientes, Embalagens, Equipamentos e Mão de Obra conforme definido na receita.
                </p>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-surface-dark">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-700/50">
                <span className="material-symbols-outlined text-primary text-xl">info</span>
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
                  Impacto no Negócio
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-slate-400 text-lg mt-0.5">analytics</span>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Custo de Produção</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">O custo total será refletido nos seus relatórios financeiros e análise de margem.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-slate-400 text-lg mt-0.5">inventory_2</span>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Atualização de Estoque</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">As {qty || 0} unidades serão adicionadas ao estoque do produto vinculado.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 flex h-20 pb-4 items-center justify-around bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800/80 backdrop-blur-lg bg-opacity-95">
        <Link to="/visao-geral" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <span className="material-symbols-outlined text-[24px]">dashboard</span>
          <span className="text-[10px] font-medium">Início</span>
        </Link>
        <Link to="/gestao-producao" className="flex flex-col items-center gap-1 p-2 w-16 text-primary">
          <span className="material-symbols-outlined fill-current text-[24px]">conveyor_belt</span>
          <span className="text-[10px] font-medium">Produção</span>
        </Link>
        <Link to="/gestao-estoque" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <span className="material-symbols-outlined text-[24px]">inventory_2</span>
          <span className="text-[10px] font-medium">Estoque</span>
        </Link>
        <Link to="/relatorios" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <span className="material-symbols-outlined text-[24px]">payments</span>
          <span className="text-[10px] font-medium">Finanças</span>
        </Link>
      </nav>
    </div>
  );
};

export default AddProducao;