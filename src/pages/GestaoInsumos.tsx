import { ArrowLeft, Plus, Search, CheckCircle, AlertTriangle, MoreVertical, Cookie, Package, ChefHat, Archive, IceCream, Tag, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess, showError } from "@/utils/toast";

const GestaoInsumos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [inventoryItems, setInventoryItems] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    minQuantity: ""
  });

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
      Cookie,
      Package,
      ChefHat,
      Archive,
      IceCream,
      Tag
    };
    return icons[iconName] || Package;
  };

  const getStatusIcon = (status) => {
    if (status === "Baixo" || status === "Crítico") {
      return <AlertTriangle className="w-3 h-3" />;
    }
    return null;
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

  const updateItemQuantity = (id, newQuantity) => {
    setInventoryItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setInventoryItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setEditForm({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      minQuantity: item.minQuantity || ""
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (item) => {
    if (confirm(`Tem certeza que deseja excluir "${item.name}"?`)) {
      removeItem(item.id);
      showSuccess(`"${item.name}" foi removido do estoque`);
    }
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;

    const updatedItem = {
      ...editingItem,
      name: editForm.name,
      category: editForm.category,
      quantity: editForm.quantity,
      unit: editForm.unit,
      minQuantity: editForm.minQuantity
    };

    setInventoryItems(prevItems =>
      prevItems.map(item =>
        item.id === editingItem.id ? updatedItem : item
      )
    );

    setIsEditModalOpen(false);
    setEditingItem(null);
    showSuccess(`"${editForm.name}" foi atualizado`);
  };

  const totalItems = inventoryItems.length;
  const lowStockItems = inventoryItems.filter(item => item.status === "Baixo" || item.status === "Crítico").length;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            to="/"
            className="flex items-center justify-center size-10 rounded-full text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col flex-1 text-center">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Administração</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Gestão de Insumos</h1>
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
            placeholder="Buscar insumo..."
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
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Nenhum insumo cadastrado</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-xs mb-6">
            Comece adicionando seus ingredientes e embalagens para gerenciar o estoque.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30">
            <Link to="/add-insumo" className="flex items-center gap-2">
              <Plus size={20} />
              Adicionar Primeiro Insumo
            </Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col pb-24">
          {filteredItems.map((item) => {
            const IconComponent = getIcon(item.icon);
            return (
              <div
                key={item.id}
                className="group relative flex items-center gap-4 px-4 py-3 hover:bg-slate-50 dark:hover:bg-surface-dark/50 transition-colors border-b border-slate-100 dark:border-slate-800/50"
              >
                <div className="relative shrink-0">
                  <div className="flex items-center justify-center rounded-xl bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-slate-700 shrink-0 size-14 text-slate-500 dark:text-slate-400">
                    <IconComponent size={24} />
                  </div>
                  {(item.status === "Baixo" || item.status === "Crítico") && (
                    <div className={`absolute -bottom-1 -right-1 size-5 rounded-full flex items-center justify-center border-2 border-white dark:border-background-dark ${
                      item.statusColor === "red" ? "bg-red-500" : "bg-amber-500"
                    }`}>
                      {getStatusIcon(item.status)}
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
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{item.quantity}</p>
                    {item.minQuantity && (
                      <>
                        <span className="size-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                        <p className="text-slate-400 dark:text-slate-500 text-xs">Mín: {item.minQuantity}</p>
                      </>
                    )}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-white p-2">
                      <MoreVertical size={20} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => handleEdit(item)} className="cursor-pointer">
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(item)} 
                      className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Excluir</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Insumo</DialogTitle>
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
              <label htmlFor="category" className="text-right text-sm font-medium">
                Categoria
              </label>
              <Select value={editForm.category} onValueChange={(value) => setEditForm(prev => ({ ...prev, category: value }))}>
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
              <label htmlFor="quantity" className="text-right text-sm font-medium">
                Quantidade
              </label>
              <Input
                id="quantity"
                value={editForm.quantity}
                onChange={(e) => setEditForm(prev => ({ ...prev, quantity: e.target.value }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="unit" className="text-right text-sm font-medium">
                Unidade
              </label>
              <Select value={editForm.unit} onValueChange={(value) => setEditForm(prev => ({ ...prev, unit: value }))}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kg</SelectItem>
                  <SelectItem value="g">Grama</SelectItem>
                  <SelectItem value="l">Litro</SelectItem>
                  <SelectItem value="ml">Mililitro</SelectItem>
                  <SelectItem value="un">Unidade</SelectItem>
                  <SelectItem value="cx">Caixa</SelectItem>
                  <SelectItem value="rolo">Rolo</SelectItem>
                  <SelectItem value="pacote">Pacote</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="minQuantity" className="text-right text-sm font-medium">
                Mínimo
              </label>
              <Input
                id="minQuantity"
                value={editForm.minQuantity}
                onChange={(e) => setEditForm(prev => ({ ...prev, minQuantity: e.target.value }))}
                placeholder="Opcional"
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

export default GestaoInsumos;