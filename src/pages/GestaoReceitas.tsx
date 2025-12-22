import { ArrowLeft, Plus, Search, MoreVertical, Receipt, Home, IceCream, Settings, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess, showError } from "@/utils/toast";
import { useRecipes } from "@/contexts/RecipesContext";

const GestaoReceitas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    time: "",
    quantity: "",
    cost: ""
  });

  const { recipes, updateRecipe, removeRecipe } = useRecipes();

  const filters = ["Todos", "Em estoque", "Esgotado", "Rascunhos"];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "Todos" ||
                         (activeFilter === "Em estoque" && recipe.quantity > 0) ||
                         (activeFilter === "Esgotado" && recipe.quantity === 0) ||
                         (activeFilter === "Rascunhos" && recipe.isDraft);
    return matchesSearch && matchesFilter;
  });

  const totalRecipes = recipes.length;
  const averageCost = recipes.length > 0 ? recipes.reduce((sum, recipe) => sum + recipe.cost, 0) / recipes.length : 0;

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
    setEditForm({
      name: recipe.name,
      time: recipe.time,
      quantity: recipe.quantity.toString(),
      cost: recipe.cost.toString()
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (recipe) => {
    if (confirm(`Tem certeza que deseja excluir a receita "${recipe.name}"?`)) {
      removeRecipe(recipe.id);
      showSuccess(`"${recipe.name}" foi excluída`);
    }
  };

  const handleSaveEdit = () => {
    if (!editingRecipe) return;

    const updatedRecipe = {
      ...editingRecipe,
      name: editForm.name,
      time: editForm.time,
      quantity: parseInt(editForm.quantity) || 0,
      cost: parseFloat(editForm.cost) || 0
    };

    updateRecipe(editingRecipe.id, updatedRecipe);
    showSuccess(`"${editForm.name}" foi atualizada`);
    setIsEditModalOpen(false);
    setEditingRecipe(null);
  };

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
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Receitas</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Gestão de Receitas</h1>
          </div>
        </div>
        <div className="flex items-center justify-end pr-4">
          <Link
            to="/add-receita"
            className="flex items-center justify-center size-10 rounded-full text-primary hover:bg-primary/10 transition-colors"
          >
            <Plus size={24} />
          </Link>
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
            placeholder="Buscar receitas..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="px-4 py-4 grid grid-cols-2 gap-3">
        <div className="bg-white dark:bg-surface-dark rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Receipt size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Receitas</p>
            <p className="text-lg font-bold text-slate-800 dark:text-white">{totalRecipes}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-surface-dark rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
            <span className="material-symbols-outlined">attach_money</span>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Custo Médio</p>
            <p className="text-lg font-bold text-slate-800 dark:text-white">R$ {averageCost.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Recipe List */}
      <div className="flex-1 px-4 pb-20 space-y-3">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 mt-2">Mais Recentes</h3>
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className={`group relative flex gap-4 items-start bg-white dark:bg-surface-dark rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all ${
              recipe.isDraft ? 'opacity-80' : ''
            }`}
          >
            <div className="relative shrink-0 w-[72px] h-[72px]">
              <div
                className="w-full h-full rounded-lg bg-gray-200 dark:bg-gray-700 bg-cover bg-center"
                style={{ backgroundImage: `url('${recipe.image}')` }}
              ></div>
              {recipe.isDraft && (
                <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">Rascunho</span>
                </div>
              )}
              {recipe.isTop && (
                <div className="absolute -bottom-1 -right-1 bg-white dark:bg-surface-dark rounded-full p-0.5">
                  <div className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">Top</div>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
              <div className="flex justify-between items-start">
                <h3 className={`text-base font-semibold truncate pr-2 ${
                  recipe.isDraft ? "text-slate-400 dark:text-slate-500" : "text-slate-800 dark:text-slate-100"
                }`}>
                  {recipe.name}
                </h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-gray-400 hover:text-primary transition-colors p-1 -m-1 -mt-2">
                      <MoreVertical size={20} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => handleEdit(recipe)} className="cursor-pointer">
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(recipe)} 
                      className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Excluir</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">schedule</span>
                  <span>{recipe.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">inventory_2</span>
                  <span>{recipe.quantity} un</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                <span className="text-xs text-gray-400 font-normal">Custo un:</span>
                <span>R$ {recipe.cost.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <Link
        to="/add-receita"
        className="fixed bottom-20 right-4 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:bg-primary/90 transition-all active:scale-95 z-30"
      >
        <Plus size={28} />
      </Link>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 pb-safe z-40">
        <div className="flex justify-around items-center h-16">
          <Link to="/visao-geral" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-[10px] font-medium">Início</span>
          </Link>
          <button className="flex flex-col items-center gap-1 p-2 w-16 text-primary">
            <span className="material-symbols-outlined fill-current">receipt_long</span>
            <span className="text-[10px] font-medium">Receitas</span>
          </button>
          <Link to="/gestao-insumos" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">inventory</span>
            <span className="text-[10px] font-medium">Estoque</span>
          </Link>
          <Link to="/configuracoes-admin" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-[10px] font-medium">Ajustes</span>
          </Link>
        </div>
      </nav>
      {/* Safe Area Spacer for Bottom Nav */}
      <div className="h-[70px]"></div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Receita</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium">
                Nome
              </label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="time" className="text-right text-sm font-medium">
                Tempo
              </label>
              <Input
                id="time"
                value={editForm.time}
                onChange={(e) => setEditForm(prev => ({ ...prev, time: e.target.value }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="quantity" className="text-right text-sm font-medium">
                Quantidade
              </label>
              <Input
                id="quantity"
                type="number"
                value={editForm.quantity}
                onChange={(e) => setEditForm(prev => ({ ...prev, quantity: e.target.value }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="cost" className="text-right text-sm font-medium">
                Custo
              </label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                value={editForm.cost}
                onChange={(e) => setEditForm(prev => ({ ...prev, cost: e.target.value }))}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestaoReceitas;