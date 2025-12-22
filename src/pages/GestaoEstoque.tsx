import { ArrowLeft, Plus, Search, MoreVertical, Package, AlertTriangle, CheckCircle, TrendingUp, DollarSign, Calendar, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { showSuccess, showError } from "@/utils/toast";

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

  const handleSaveMovement = () => {
    // Validate required fields
    if (!movementForm.item || !movementForm.quantity || !movementForm.unitValue) {
      showError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const quantityToAdd = parseFloat(movementForm.quantity);
    const unitValue = parseFloat(movementForm.unitValue);

    if (quantityToAdd <= 0) {
      showError("A quantidade deve ser maior que zero.");
      return;
    }

    if (unitValue <= 0) {
      showError("O valor deve ser maior que zero.");
      return;
    }

    // Find and update the inventory item
    const updatedItems = inventoryItems.map(item => {
      if (item.id === movementForm.item) {
        const currentQuantity = parseFloat(item.quantity || "0");
        const currentTotalCost = currentQuantity * (item.unitCost || 0);
        const newTotalCost = currentTotalCost + (quantityToAdd * unitValue);
        const newQuantity = currentQuantity + quantityToAdd;
        const newUnitCost = newTotalCost / newQuantity;

        let newStatus = "Em dia";

        // Update status based on minimum quantity
        if (item.minQuantity && newQuantity <= parseFloat(item.minQuantity)) {
          newStatus = "Baixo";
        }

        return {
          ...item,
          quantity: newQuantity.toString(),
          unitCost: newUnitCost,
          lastUpdated: movementForm.date,
          status: newStatus
        };
      }
      return item;
    });

    // Update state and localStorage
    setInventoryItems(updatedItems);

    showSuccess(`Estoque atualizado com sucesso! Adicionados ${quantityToAdd} unidades.`);

    // Reset form and close modal
    setMovementForm({
      itemType: "Ingredientes",
      item: "",
      quantity: "",
      costType: "unitario",
      unitValue: "",
      date: new Date().toISOString().split('T')[0],
      description: ""
    });
    setIsMovementModalOpen(false);
  };

  const totalItems = inventoryItems.length;
  const lowStockItems = inventoryItems.filter(item => item.status === "Baixo" || item.status === "Crítico").length;

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

      {/* Table Header */}
      <div className="px-4 mt-4">
        <div className="grid grid-cols-6 gap-4 px-4 py-3 bg-slate-50 dark:bg-surface-dark border-b border-slate-200 dark:border-slate-700 rounded-t-lg">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Item</div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Tipo</div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Quantidade</div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Custo</div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Custo Unitário</div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Data</div>
        </div>
      </div>

      {/* Inventory List */}
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="flex items-center justify-center size-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
            <Package className="text-slate-400 dark:text-slate-500" size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Nenhum item cadastrado</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-xs mb-6">
            Comece adicionando seus itens de estoque para gerenciar o inventário.
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
            const iconName = getIcon(item.icon);
            const quantity = parseFloat(item.quantity || "0");
            const unitCost = item.unitCost || 0;
            const totalCost = quantity * unitCost;
            return (
              <Link
                key={item.id}
                to={`/detalhes-insumo?id=${item.id}`}
                className="block"
              >
                <div className="grid grid-cols-6 gap-4 px-4 py-4 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-surface-dark/50 transition-colors cursor-pointer">
                  {/* Item */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center rounded-xl bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-slate-700 shrink-0 size-10 text-slate-500 dark:text-slate-400">
                      <span className="material-symbols-outlined text-[20px]">{iconName}</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <p className={`text-sm font-semibold truncate ${
                        item.status === "Esgotado" ? "text-slate-400 dark:text-slate-500" : "text-slate-800 dark:text-slate-100"
                      }`}>
                        {item.name}
                      </p>
                      {(item.status === "Baixo" || item.status === "Crítico") && (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap mt-1 ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tipo */}
                  <div className="flex items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-300">{item.category}</span>
                  </div>

                  {/* Quantidade */}
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{quantity.toFixed(2)} {item.unit}</span>
                    {item.minQuantity && (
                      <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">
                        (Mín: {item.minQuantity})
                      </span>
                    )}
                  </div>

                  {/* Custo */}
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      R$ {totalCost.toFixed(2)}
                    </span>
                  </div>

                  {/* Custo Unitário */}
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      R$ {unitCost.toFixed(2)}
                    </span>
                  </div>

                  {/* Data */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {item.lastUpdated ? new Date(item.lastUpdated).toLocaleDateString('pt-BR') : new Date().toLocaleDateString('pt-BR')}
                    </span>
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

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
                  <SelectItem value="total">Total</SelectItem>
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
            <Button onClick={handleSaveMovement}>
              Registrar Movimento
            </Button>
          </DialogFooter>
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