import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AddProducao = () => {
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [quantity, setQuantity] = useState("");

  const recipes = [
    { id: "1", name: "Ninho com Nutella", unitCost: 1.50 },
    { id: "2", name: "Morango Gourmet", unitCost: 1.60 },
    { id: "3", name: "Maracujá Cremoso", unitCost: 1.40 },
    { id: "4", name: "Chocolate Belga", unitCost: 2.00 },
    { id: "5", name: "Coco com Doce de Leite", unitCost: 1.30 }
  ];

  const selectedRecipeData = recipes.find(r => r.id === selectedRecipe);
  const unitCost = selectedRecipeData?.unitCost || 1.50;
  const qty = parseInt(quantity) || 0;
  const totalCost = unitCost * qty;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement production registration logic
    console.log({
      recipe: selectedRecipe,
      quantity: qty,
      unitCost,
      totalCost
    });
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
              <Select value={selectedRecipe} onValueChange={setSelectedRecipe}>
                <SelectTrigger className="w-full h-14 bg-white dark:bg-surface-dark border-slate-300 dark:border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary">
                  <SelectValue placeholder="Selecione a receita..." />
                </SelectTrigger>
                <SelectContent>
                  {recipes.map((recipe) => (
                    <SelectItem key={recipe.id} value={recipe.id}>
                      {recipe.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500 dark:text-slate-400 px-1">
                Selecione o sabor para calcular os ingredientes.
              </p>
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
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-blue-600 active:scale-[0.98]"
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
                  Prévia de Custos
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Custo Unitário (Estimado)</span>
                  <span className="text-slate-900 dark:text-white font-medium">R$ {unitCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Quantidade</span>
                  <span className="text-slate-900 dark:text-white font-medium">{qty}</span>
                </div>
                <div className="h-px w-full bg-slate-100 dark:bg-slate-700"></div>
                <div className="flex justify-between items-end pt-1">
                  <span className="text-base font-bold text-slate-800 dark:text-white">Custo Total</span>
                  <span className="text-xl font-bold text-primary">R$ {totalCost.toFixed(2)}</span>
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 dark:bg-black/20">
                <p className="text-[11px] leading-snug text-slate-500 dark:text-slate-400">
                  * O valor final é calculado com base no custo médio atual dos ingredientes disponíveis no estoque.
                </p>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-surface-dark">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-700/50">
                <span className="material-symbols-outlined text-primary text-xl">info</span>
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
                  Informações
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-slate-400 text-lg mt-0.5">factory</span>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Produção Automática</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Os custos são calculados automaticamente com base na receita selecionada.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-slate-400 text-lg mt-0.5">inventory_2</span>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Estoque Atualizado</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">A produção será automaticamente adicionada ao estoque após registro.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-slate-400 text-lg mt-0.5">analytics</span>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Relatórios</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Os dados de produção são incluídos nos relatórios financeiros.</p>
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
        <Link to="/gestao-insumos" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
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