import { ArrowLeft, Plus, Search, MoreVertical, Package, AlertTriangle, CheckCircle, TrendingUp, DollarSign, Calendar, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StockMovementForm, StockMovementFormData } from "@/components/StockMovementForm";
import { RecentStockMovements, StockMovementForDisplay } from "@/components/RecentStockMovements";
import { useStock } from "@/contexts/StockContext";
import { Loader2 } from "lucide-react";

const GestaoEstoque = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [inventoryItems, setInventoryItems] = useState([]);
  const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);
  const [movementForm, setMovementForm] = useState({
    itemType: "Ingredientes",
    item: "",
    quantity: "",
    costType: "unitario",
    unitValue: "",
    date: new Date().toISOString().split('T')[0],
    description: ""
  });
  const [editingMovement, setEditingMovement] = useState<StockMovementForDisplay | null>(null);

  const { ingredients, packagingItems, stockMovements, addStockMovement, updateStockMovement, deleteStockMovement, isLoadingIngredients, isLoadingPackaging, isLoadingStockMovements } = useStock();

  const filters = ["Todos", "Ingredientes", "Embalagens", "Baixo Estoque"];

  // Load inventory items from localStorage on mount
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

  // Save to localStorage whenever inventoryItems changes
  useEffect(() => {
    if (inventoryItems.length >= 0) {
      localStorage.setItem('inventoryItems', JSON.stringify(inventoryItems));
    }
  }, [inventoryItems]);

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "Todos" ||
                         (activeFilter === "Baixo Estoque" && (item.status === "Baixo" || item.status === "Crítico")) ||
                         item.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getIcon = (iconName) => {
    const icons = {
      Cookie: "cookie",
      Package: "inventory_2",
      ChefHat: "restaurant",
      Archive: "archive",
      IceCream: "icecream",
      Tag: "tag"
    };
    return icons[iconName] || "inventory_2";
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

  const handleFormSubmit = async (data: StockMovementFormData) => {
    console.log("GestaoEstoque.tsx - handleFormSubmit - Data received from form:", data);
    console.log("GestaoEstoque.tsx - handleFormSubmit - data.itemId:", data.itemId);

    if (!data.itemId || data.itemId.trim() === "") {
      alert("Por favor, selecione um item válido para a movimentação.");
      console.error("GestaoEstoque.tsx - Attempted to add/update movement with empty itemId.");
      return;
    }

    const selectedItem =
      data.itemType === "ingredient"
        ? ingredients.find((ing) => ing.id === data.itemId)
        : packagingItems.find((pkg) => pkg.id === data.itemId);

    if (!selectedItem) {
      alert("Item selecionado não encontrado. Por favor, selecione um item válido.");
      console.error("GestaoEstoque.tsx - Selected item not found for ID:", data.itemId, "Type:", data.itemType);
      return;
    }

    const movementData = {
      item_id: data.itemId,
      item_type: data.itemType,
      quantity: data.quantity,
      cost_type: data.cost_type,
      cost_value: data.cost_value,
      description: data.description,
      date: data.date.toISOString()
    };

    if (editingMovement) {
      await updateStockMovement(editingMovement.id, movementData);
      setEditingMovement(null);
    } else {
      await addStockMovement(movementData);
    }
  };

  const handleEditMovement = (movement: StockMovementForDisplay) => {
    setEditingMovement(movement);
  };

  const handleDeleteMovement = async (movementId: string) => {
    await deleteStockMovement(movementId);
  };

  const handleCancelEdit = () => {
    setEditingMovement(null);
  };

  // Prepare movements for RecentStockMovements component, adding itemName, itemUnit, and unitCost for display
  const movementsForDisplay = stockMovements.map(movement => {
    const item = movement.item_type === "ingredient"
      ? ingredients.find(ing => ing.id === movement.item_id)
      : packagingItems.find(pkg => pkg.id === movement.item_id);

    let unitCost = 0;
    if (movement.cost_type === "unitario") {
      unitCost = movement.cost_value;
    } else if (movement.cost_type === "pacote" && movement.quantity > 0) {
      unitCost = movement.cost_value / movement.quantity;
    }

    return {
      ...movement,
      itemName: item?.name || "Item Desconhecido",
      itemUnit: item?.unit || "",
      date: new Date(movement.date),
      unitCost: unitCost,
    };
  });

  if (isLoadingIngredients || isLoadingPackaging || isLoadingStockMovements) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-muted-foreground">Carregando dados de estoque...</p>
      </div>
    );
  }

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
          <Button size="sm" className="size-10 rounded-full p-0" onClick={() => setIsMovementModalOpen(true)}>
            <Plus size={24} />
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
              <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{inventoryItems.length - inventoryItems.filter(item => item.status === "Baixo" || item.status === "Crítico").length}</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-1 rounded-xl bg-white dark:bg-surface-dark p-3 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="text-amber-500" size={20} />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Repor</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{inventoryItems.filter(item => item.status === "Baixo" || item.status === "Crítico").length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 space-y-6 pb-32 w-full max-w-7xl mx-auto">
        {/* Stock Movement Form */}
        <Card>
          <CardHeader>
            <CardTitle>{editingMovement ? "Editar Movimentação de Estoque" : "Registrar Nova Movimentação de Estoque"}</CardTitle>
          </CardHeader>
          <CardContent>
            <StockMovementForm
              ingredients={ingredients}
              packagingItems={packagingItems}
              onSubmit={handleFormSubmit}
              movementToEdit={editingMovement}
              onCancelEdit={handleCancelEdit}
            />
          </CardContent>
        </Card>

        {/* Recent Stock Movements */}
        <Card>
          <CardHeader>
            <CardTitle>Últimas Movimentações de Estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentStockMovements
              movements={movementsForDisplay}
              onEdit={handleEditMovement}
              onDelete={handleDeleteMovement}
            />
          </CardContent>
        </Card>
      </main>

      {/* Movement Modal */}
      <Dialog open={isMovementModalOpen} onOpenChange={setIsMovementModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Registrar Movimento de Estoque</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="itemType" className="text-right text-sm font-medium">
                Tipo
              </label>
              <Select value={movementForm.itemType} onValueChange={(value) => setMovementForm(prev => ({ ...prev, itemType: value }))}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ingredientes">Ingredientes</SelectItem>
                  <SelectItem value="Embalagens">Embalagens</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="item" className="text-right text-sm font-medium">
                Item
              </label>
              <Select value={movementForm.item} onValueChange={(value) => setMovementForm(prev => ({ ...prev, item: value }))}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione um item" />
                </SelectTrigger>
                <SelectContent>
                  {inventoryItems
                    .filter(item => item.category === movementForm.itemType)
                    .map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="quantity" className="text-right text-sm font-medium">
                Quantidade
              </label>
              <Input
                id="quantity"
                type="number"
                step="0.01"
                value={movementForm.quantity}
                onChange={(e) => setMovementForm(prev => ({ ...prev, quantity: e.target.value }))}
                className="col-span-3"
                placeholder="0"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="costType" className="text-right text-sm font-medium">
                Tipo Custo
              </label>
              <Select value={movementForm.costType} onValueChange={(value) => setMovementForm(prev => ({ ...prev, costType: value }))}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unitario">Unitário</SelectItem>
                  <SelectItem value="pacote">Total do Pacote</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="unitValue" className="text-right text-sm font-medium">
                Valor {movementForm.costType === "unitario" ? "Unitário" : "Total"} (R$)
              </label>
              <Input
                id="unitValue"
                type="number"
                step="0.01"
                value={movementForm.unitValue}
                onChange={(e) => setMovementForm(prev => ({ ...prev, unitValue: e.target.value }))}
                className="col-span-3"
                placeholder="0,00"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date" className="text-right text-sm font-medium">
                Data
              </label>
              <Input
                id="date"
                type="date"
                value={movementForm.date}
                onChange={(e) => setMovementForm(prev => ({ ...prev, date: e.target.value }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right text-sm font-medium">
                Descrição
              </label>
              <Input
                id="description"
                value={movementForm.description}
                onChange={(e) => setMovementForm(prev => ({ ...prev, description: e.target.value }))}
                className="col-span-3"
                placeholder="Opcional"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMovementModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => {
              // Handle form submission
              setIsMovementModalOpen(false);
            }}>
              Registrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestaoEstoque;