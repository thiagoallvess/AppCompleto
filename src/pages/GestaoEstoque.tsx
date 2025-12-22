import { ArrowLeft, Plus, Search, MoreVertical, Package, TrendingUp, DollarSign, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StockMovementForm } from "@/components/StockMovementForm";
import { RecentStockMovements } from "@/components/RecentStockMovements";
import { useStock } from "@/contexts/StockContext";
import { showSuccess, showError } from "@/utils/toast";

const GestaoEstoque = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);
  const [movementToEdit, setMovementToEdit] = useState(null);
  const { ingredients, packagingItems, addStockMovement, updateStockMovement, deleteStockMovement, getStockMovementsForDisplay } = useStock();

  const filters = ["Todos", "Ingredientes", "Embalagens", "Baixo Estoque"];

  // Combine ingredients and packaging items
  const allItems = [...ingredients, ...packagingItems];

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "Todos" ||
                         (activeFilter === "Baixo Estoque" && (item.status === "Baixo" || item.status === "Crítico")) ||
                         item.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const stockMovements = getStockMovementsForDisplay();

  const totalItems = allItems.length;
  const lowStockItems = allItems.filter(item => item.status === "Baixo" || item.status === "Crítico").length;
  const totalValue = allItems.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0);

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
    try {
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
    } catch (error) {
      console.error('Error adding stock movement:', error);
      showError("Erro ao registrar movimentação");
    }
  };

  const handleUpdateMovement = (formData) => {
    try {
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
    } catch (error) {
      console.error('Error updating stock movement:', error);
      showError("Erro ao atualizar movimentação");
    }
  };

  const handleDeleteMovement = (movementId) => {
    try {
      if (confirm("Tem certeza que deseja excluir esta movimentação?")) {
        deleteStockMovement(movementId);
        showSuccess("Movimentação excluída!");
      }
    } catch (error) {
      console.error('Error deleting stock movement:', error);
      showError("Erro ao excluir movimentação");
    }
  };

  const handleEditMovement = (movement) => {
    setMovementToEdit(movement);
    setIsMovementModalOpen(true);
  };

  const handleCancelEdit = () => {
    setMovementToEdit(null);
  };

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

      {/* Stats Summary */}
      <div className="px-4 mb-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Visão Geral</p>
        <div className="flex gap-4 mt-2">
          <div className="flex flex-1 flex-col gap-1 rounded-xl bg-white dark:bg-surface-dark p-3 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <Package className="text-primary" size={20} />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Itens</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{totalItems}</p>
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
          <div className="flex flex-1 flex-col gap-1 rounded-xl bg-white dark:bg-surface-dark p-3 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="text-green-500" size={20} />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Valor Total</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">R$ {totalValue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* List Section Header */}
      <div className="px-4 mt-4 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Itens em Estoque</p>
        <button className="text-xs font-medium text-primary hover:underline">Ordenar por</button>
      </div>

      {/* Inventory List */}
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="flex items-center justify-center size-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
            <Package className="text-slate-400 dark:text-slate-500" size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Nenhum item encontrado
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-xs mb-6">
            {searchTerm || activeFilter !== "Todos"
              ? "Tente ajustar os filtros de busca."
              : "Comece adicionando seus primeiros itens ao estoque."
            }
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30">
            <Link to="/add-insumo" className="flex items-center gap-2">
              <Plus size={20} />
              Adicionar Primeiro Item
            </Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col pb-24">
          {filteredItems.map((item) => {
            const IconComponent = item.icon === "Cookie" ? "🍪" : item.icon === "Package" ? "📦" : "📦";
            return (
              <Link
                key={item.id}
                to={`/detalhes-insumo?id=${item.id}`}
                className="block"
              >
                <div className="group relative flex items-center gap-4 px-4 py-3 hover:bg-slate-50 dark:hover:bg-surface-dark/50 transition-colors border-b border-slate-100 dark:border-slate-800/50">
                  <div className="relative shrink-0">
                    <div className="flex items-center justify-center rounded-xl bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-slate-700 shrink-0 size-14 text-slate-500 dark:text-slate-400">
                      <span className="material-symbols-outlined text-[32px]">{IconComponent}</span>
                    </div>
                    {(item.status === "Baixo" || item.status === "Crítico") && (
                      <div className={`absolute -bottom-1 -right-1 size-5 rounded-full flex items-center justify-center border-2 border-white dark:border-background-dark ${
                        item.status === "Crítico" ? "bg-red-500" : "bg-amber-500"
                      }`}>
                        <AlertTriangle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className={`text-base font-semibold truncate pr-2 ${
                        item.status === "Esgotado" ? "text-slate-400 dark:text-slate-500" : "text-slate-800 dark:text-slate-100"
                      }`}>
                        {item.name}
                      </p>
                      {(item.status === "Baixo" || item.status === "Crítico") && (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{item.quantity.toFixed(2)} {item.unit}</p>
                      {item.minQuantity && (
                        <>
                          <span className="size-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                          <p className="text-slate-400 dark:text-slate-500 text-xs">Mín: {item.minQuantity} {item.unit}</p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">R$ {(item.quantity * item.unitCost).toFixed(2)}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">R$ {item.unitCost.toFixed(2)}/{item.unit}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Recent Movements Section */}
      {stockMovements.length > 0 && (
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Movimentações Recentes</h3>
            <Button
              onClick={() => setIsMovementModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30"
            >
              <Plus size={16} />
              Nova Movimentação
            </Button>
          </div>
          <RecentStockMovements
            movements={stockMovements}
            onEdit={handleEditMovement}
            onDelete={handleDeleteMovement}
          />
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsMovementModalOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95"
      >
        <Plus size={28} />
      </button>

      {/* Stock Movement Modal */}
      <Dialog open={isMovementModalOpen} onOpenChange={setIsMovementModalOpen}>
        <DialogContent className="max-w-md mx-auto bg-background-light dark:bg-background-dark border-slate-200 dark:border-slate-800 p-0 max-h-[90vh] overflow-hidden">
          <DialogHeader className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3">
            <DialogTitle className="text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
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