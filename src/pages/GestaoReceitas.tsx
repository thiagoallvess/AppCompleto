"use client";

import { ArrowLeft, Plus, Search, MoreVertical, ChefHat, Clock, DollarSign, Package, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRecipes } from "@/contexts/RecipesContext";
import { showSuccess } from "@/utils/toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const GestaoReceitas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const { recipes, removeRecipe } = useRecipes();

  // Mapeamento de custos reais para sincronizar com a página de detalhes
  const realCosts: { [key: string]: number } = {
    "Ninho com Nutella": 5.33,
    "Morango Cremoso": 5.96,
    "Maracujá Trufado": 5.33,
    "Paçoca (Rascunho)": 4.74,
    "Coco Cremoso": 5.00
  };

  const filters = ["Todos", "Finalizadas", "Rascunhos"];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "Todos" ||
                         (activeFilter === "Finalizadas" && !recipe.isDraft) ||
                         (activeFilter === "Rascunhos" && recipe.isDraft);
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Tem certeza que deseja excluir a receita "${name}"?`)) {
      removeRecipe(id);
      showSuccess(`Receita "${name}" excluída com sucesso.`);
    }
  };

  const totalRecipes = recipes.length;
  const finishedRecipes = recipes.filter(r => !r.isDraft).length;
  const draftRecipes = recipes.filter(r => r.isDraft).length;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            to="/visao-geral"
            className="flex items-center justify-center size-10 rounded-full text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col flex-1 text-center">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Administração</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Gestão de Receitas</h1>
          </div>
          <Button size="sm" className="size-10 rounded-full p-0" asChild>
            <Link to="/add-receita">
              <Plus size={24} />
            </Link>
          </Button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-4 w-full">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl text-sm font-medium bg-gray-100 dark:bg-surface-dark text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
            placeholder="Buscar receita..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="w-full overflow-x-auto no-scrollbar pb-2 pl-4 pr-4">
        <div className="flex gap-3 min-w-max">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-none px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                  : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="px-4 mb-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Visão Geral</p>
        <div className="flex gap-4 mt-2">
          <div className="flex flex-1 flex-col gap-1 rounded-xl bg-white dark:bg-surface-dark p-3 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <ChefHat className="text-primary" size={20} />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{totalRecipes}</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-1 rounded-xl bg-white dark:bg-surface-dark p-3 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <Package className="text-green-500" size={20} />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Finalizadas</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{finishedRecipes}</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-1 rounded-xl bg-white dark:bg-surface-dark p-3 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="text-amber-500" size={20} />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rascunhos</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{draftRecipes}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recipes List */}
      <div className="flex-1 px-4 pb-24 space-y-3">
        <div className="flex items-center justify-between py-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>Total: {filteredRecipes.length} receitas</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecipes.map((recipe) => {
            // Usa o custo real mapeado ou o custo do objeto se não houver mapeamento
            const displayCost = realCosts[recipe.name] || recipe.cost || 0;
            
            return (
              <div
                key={recipe.id}
                className={`group relative flex flex-col gap-3 bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:border-primary/50 dark:hover:border-primary/50 transition-all ${
                  recipe.isDraft ? "opacity-75" : ""
                }`}
              >
                <Link to={`/detalhes-receita?id=${recipe.id}`} className="aspect-[4/3] overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                  />
                  {recipe.isTop && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                      TOP
                    </div>
                  )}
                  {recipe.isDraft && (
                    <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
                      RASCUNHO
                    </div>
                  )}
                </Link>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <Link to={`/detalhes-receita?id=${recipe.id}`} className="flex-1 min-w-0">
                      <h3 className={`text-lg font-semibold truncate pr-2 ${
                        recipe.isDraft ? "text-slate-400 dark:text-slate-500" : "text-slate-800 dark:text-slate-100"
                      }`}>
                        {recipe.name}
                      </h3>
                    </Link>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 -m-1 -mt-2 outline-none">
                          <MoreVertical size={20} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800">
                        <DropdownMenuItem asChild className="flex items-center gap-2 cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-800">
                          <Link to={`/edit-receita?id=${recipe.id}`}>
                            <Edit size={16} className="text-slate-500" />
                            <span>Editar</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(recipe.id, recipe.name)}
                          className="flex items-center gap-2 cursor-pointer text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20"
                        >
                          <Trash2 size={16} />
                          <span>Excluir</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{recipe.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package size={16} />
                      <span>{recipe.quantity} un</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-200 mt-auto">
                    <span className="text-xs text-gray-400 font-normal">Custo un:</span>
                    <span className="text-primary font-bold">R$ {displayCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 w-full bg-white/90 dark:bg-surface-dark/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-50">
        <Link to="/visao-geral" className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <ArrowLeft size={20} />
          <span className="text-[10px] font-medium">Início</span>
        </Link>
        <button className="flex flex-col items-center gap-1 text-primary">
          <ChefHat size={20} />
          <span className="text-[10px] font-medium">Receitas</span>
        </button>
        <Link to="/gestao-producao" className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <Package size={20} />
          <span className="text-[10px] font-medium">Produção</span>
        </Link>
        <Link to="/relatorios" className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <DollarSign size={20} />
          <span className="text-[10px] font-medium">Finanças</span>
        </Link>
      </nav>
    </div>
  );
};

export default GestaoReceitas;