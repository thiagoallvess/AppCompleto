import { ArrowLeft, Plus, Search, AlertTriangle, Package, DollarSign, TrendingUp, CheckCircle, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess, showError } from "@/utils/toast";
import { useStock } from "@/contexts/StockContext";
import { StockMovementForm } from "@/components/StockMovementForm";
import { RecentStockMovements } from "@/components/RecentStockMovements";

const GestaoEstoque = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [inventoryItems, setInventoryItems] = useState([]);
  const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);
  const [movementToEdit, setMovementToEdit] = useState(null);
  const { ingredients, packagingItems, stockMovements, addStockMovement, updateStockMovement, deleteStockMovement } = useStock();

  const filters = ["Todos", "Ingredientes", "Embalagens", "Baixo Estoque"];

  // Load data from localStorage on component mount
  useEffect(() => {
    const loadInventoryItems = () => {
      try {
        const storedItems = localStorage.getItem('inventoryItems');
        if (storedItems) {
          setInventoryItems(JSON.parse(storedItems));
        } else {
          setInventoryItems([]);
        }
      } catch (error) {
        console.error('Error loading inventory items:', error);
        setInventoryItems([]);
      }
    };

    loadInventoryItems();
  }, []);

  // Combine ingredients and packaging items
  const allItems = [...ingredients, ...packagingItems];

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "Todos" ||
                         (activeFilter === "Baixo Estoque" && (item.status === "Baixo" || item.status === "Crítico")) ||
                         item.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getIcon = (iconName) => {
    const iconMap = {
      Cookie: "🍪",
      Package: "📦",
      ChefHat: "👨‍🍳",
      Archive: "📁",
      IceCream: "🍦",
      Tag: "🏷️"
    };
    return iconMap[iconName] || "📦";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Baixo":
        return "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/10";
      case "Crítico":
        return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-500/10";
      default:
        return "";
    }
  };

  const handleAddMovement = (formData) => {
    const movement = {
      id: Date.now().toString(),
      item_id: formData.itemId,
      item_type: formData.itemType,
      quantity: formData.quantity,
      cost_type: formData.cost_type,
      cost_value: formData.cost_value,
      description: formData.description,
      date: formData.date.toISOString()
    };

    addStockMovement(movement);
    setIsMovementModalOpen(false);
    showSuccess("Movimentação de estoque registrada!");
  };

  const handleEditMovement = (movement) => {
    setMovementToEdit(movement);
    setIsMovementModalOpen(true);
  };

  const handleUpdateMovement = (formData) => {
    const updatedMovement = {
      id: movementToEdit.id,
      item_id: formData.itemId,
      item_type: formData.itemType,
      quantity: formData.quantity,
      cost_type: formData.cost_type,
      cost_value: formData.cost_value,
      description: formData.description,
      date: formData.date.toISOString()
    };

    updateStockMovement(movementToEdit.id, updatedMovement);
    setMovementToEdit(null);
    setIsMovementModalOpen(false);
    showSuccess("Movimentação atualizada!");
  };

  const handleDeleteMovement = (movementId) => {
    if (confirm("Tem certeza que deseja excluir esta movimentação?")) {
      deleteStockMovement(movementId);
      showSuccess("Movimentação excluída!");
    }
  };

  const handleCancelEdit = () => {
    setMovementToEdit(null);
  };

  const totalItems = allItems.length;
  const lowStockItems = allItems.filter(item => item.status === "Baixo" || item.status === "Crítico").length;

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
            <h1 className="text-xl font-bold leading-tight tracking-tight">Gestão de Estoque</h1>
          </div>
          <Button size="sm" className="size-10 rounded-full p-0" asChild>
            <Link to="/add-insumo">
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
            placeholder="Buscar item..."
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

      {/* Summary Status */}
      <div className="px-4 mb-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Visão Geral</p>
        <div className="flex gap-4 mt-2">
          <div className="flex flex-1 flex-col gap-1 rounded-xl bg-white dark:bg-surface-dark p-3 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="text-emerald-500" size={20} />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Em dia</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{totalItems - lowStockItems}</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-1 rounded-xl bg-white dark:bg-surface-dark p-3 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="text-amber-500" size={20} />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Repor</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{lowStockItems}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Movement Button */}
      <div className="px-4 mb-4">
        <Button
          onClick={() => setIsMovementModalOpen(true)}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <TrendingUp size={20} />
          Registrar Movimentação
        </Button>
      </div>

      {/* Inventory Items */}
      <div className="px-4 mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Itens em Estoque</h3>
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="flex items-center justify-center size-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <Package className="text-slate-400 dark:text-slate-500" size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Nenhum item encontrado</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-xs mb-6">
              Adicione ingredientes e embalagens para gerenciar o estoque.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30">
              <Link to="/add-insumo" className="flex items-center gap-2">
                <Plus size={20} />
                Adicionar Primeiro Item
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => {
              const quantity = parseFloat(item.quantity || "0");
              const unitCost = parseFloat(item.unitCost || "0");
              const totalValue = quantity * unitCost;
              const averageCost = unitCost;

              return (
                <Link
                  key={item.id}
                  to={`/detalhes-insumo?id=${item.id}`}
                  className="block"
                >
                  <div className="group relative rounded-2xl bg-gradient-to-br from-teal-700 to-teal-900 dark:from-teal-800 dark:to-teal-950 p-5 border-2 border-teal-600 dark:border-teal-700 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
                    {/* Header with Icon and Name */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{getIcon(item.icon)}</span>
                        <h3 className="text-white text-lg font-bold leading-tight">{item.name}</h3>
                      </div>
                      {(item.status === "Baixo" || item.status === "Crítico") && (
                        <div className="flex items-center justify-center size-8 rounded-full bg-red-500/20 border border-red-400">
                          <AlertTriangle className="text-red-300" size={16} />
                        </div>
                      )}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {/* Preço Total */}
                      <div className="bg-teal-800/50 dark:bg-teal-900/50 rounded-xl p-3 border border-teal-600/30">
                        <div className="flex items-center gap-1.5 mb-1">
                          <DollarSign className="text-yellow-400" size={14} />
                          <span className="text-yellow-400 text-[10px] font-bold uppercase tracking-wider">Preço Total</span>
                        </div>
                        <p className="text-emerald-300 text-lg font-bold">R$ {totalValue.toFixed(2)}</p>
                      </div>

                      {/* Custo Unidade */}
                      <div className="bg-amber-900/30 dark:bg-amber-950/30 rounded-xl p-3 border border-amber-700/30">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-red-400 text-lg">🔴</span>
                          <span className="text-red-400 text-[10px] font-bold uppercase tracking-wider">Custo Unidade</span>
                        </div>
                        <p className="text-yellow-300 text-lg font-bold">R$ {averageCost.toFixed(4)}</p>
                      </div>

                      {/* QTD */}
                      <div className="bg-indigo-900/30 dark:bg-indigo-950/30 rounded-xl p-3 border border-indigo-700/30">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Package className="text-amber-400" size={14} />
                          <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">QTD</span>
                        </div>
                        <p className="text-white text-lg font-bold">{quantity}</p>
                      </div>

                      {/* Unidade */}
                      <div className="bg-blue-900/30 dark:bg-blue-950/30 rounded-xl p-3 border border-blue-700/30">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-yellow-400 text-lg">⚡</span>
                          <span className="text-yellow-400 text-[10px] font-bold uppercase tracking-wider">Unidade</span>
                        </div>
                        <p className="text-blue-200 text-lg font-bold">{item.unit}</p>
                      </div>
                    </div>

                    {/* Custo Médio Badge */}
                    <div className="flex items-center justify-center">
                      <div className="bg-yellow-500/20 border border-yellow-400/40 rounded-full px-4 py-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-yellow-400 text-lg">🟡</span>
                          <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">Custo Médio</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Recent Movements */}
      <div className="px-4 mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Movimentações Recentes</h3>
        <RecentStockMovements
          movements={stockMovements}
          onEdit={handleEditMovement}
          onDelete={handleDeleteMovement}
        />
      </div>

      {/* Movement Modal */}
      <Dialog open={isMovementModalOpen} onOpenChange={setIsMovementModalOpen}>
        <DialogContent className="max-w-md mx-auto bg-background-light dark:bg-background-dark border-slate-200 dark:border-slate-800 p-0 max-h-[90vh] overflow-hidden">
          <DialogHeader className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3">
            <DialogTitle className="text-slate-900 dark:text-white text-lg font-bold">
              {movementToEdit ? "Editar Movimentação" : "Nova Movimentação"}
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent max-h-[calc(90vh-120px)]">
            <div className="p-4">
              <StockMovementForm
                ingredients={ingredients}
                packagingItems={packagingItems}
                onSubmit={movementToEdit ? handleUpdateMovement : handleAddMovement}
                movementToEdit={movementToEdit}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 w-full bg-white/90 dark:bg-surface-dark/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-50">
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <ArrowLeft size={20} />
          <span className="text-[10px] font-medium">Início</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-primary">
          <Package size={20} />
          <span className="text-[10px] font-medium">Estoque</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <CheckCircle size={20} />
          <span className="text-[10px] font-medium">Pedidos</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <MoreVertical size={20} />
          <span className="text-[10px] font-medium">Ajustes</span>
        </button>
      </nav>
    </div>
  );
};

export default GestaoEstoque;