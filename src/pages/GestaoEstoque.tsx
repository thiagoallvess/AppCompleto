import { ArrowLeft, Plus, Search, CheckCircle, AlertTriangle, MoreVertical, Edit, Trash2, Package, IceCream } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess, showError } from "@/utils/toast";

const GestaoEstoque = () => {
  const [activeTab, setActiveTab] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [inventoryItems, setInventoryItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);
  const [movementForm, setMovementForm] = useState({
    itemType: "Ingrediente",
    item: "",
    quantity: "",
    costType: "unitario",
    unitValue: "",
    date: new Date().toISOString().split('T')[0],
    description: ""
  });

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

    const loadProducts = () => {
      try {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts));
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      }
    };

    loadInventoryItems();
    loadProducts();
  }, []);

  // Save to localStorage whenever inventoryItems changes
  useEffect(() => {
    if (inventoryItems.length >= 0) {
      localStorage.setItem('inventoryItems', JSON.stringify(inventoryItems));
    }
  }, [inventoryItems]);

  const filteredItems = () => {
    let items = [];
    if (activeTab === "Todos") {
      items = [
        ...inventoryItems.map(item => ({ ...item, type: 'insumo' })),
        ...products.map(product => ({ ...product, type: 'produto' }))
      ];
    } else if (activeTab === "Insumos") {
      items = inventoryItems.map(item => ({ ...item, type: 'insumo' }));
    } else if (activeTab === "Produtos") {
      items = products.map(product => ({ ...product, type: 'produto' }));
    }

    return items.filter(item => {
      const name = item.name || item.title || "";
      return name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  const getIcon = (item) => {
    if (item.type === 'produto') {
      return "icecream";
    }
    const icons = {
      Cookie: "cookie",
      Package: "inventory_2",
      ChefHat: "restaurant",
      Archive: "archive",
      IceCream: "icecream",
      Tag: "tag"
    };
    return icons[item.icon] || "inventory_2";
  };

  const getStatusColor = (item) => {
    if (item.type === 'produto') {
      if (item.stock === 0) {
        return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-500/10";
      }
      return "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10";
    }
    
    switch (item.status) {
      case "Baixo":
        return "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/10";
      case "Crítico":
        return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-500/10";
      default:
        return "";
    }
  };

  const getStatusIcon = (item) => {
    if (item.type === 'produto') {
      if (item.stock === 0) {
        return <AlertTriangle className="w-3 h-3" />;
      }
      return null;
    }
    
    if (item.status === "Baixo" || item.status === "Crítico") {
      return <AlertTriangle className="w-3 h-3" />;
    }
    return null;
  };

  const getStatusText = (item) => {
    if (item.type === 'produto') {
      return item.stock === 0 ? "Esgotado" : "Em estoque";
    }
    return item.status || "Em dia";
  };

  const handleSaveMovement = () => {
    // Validate required fields
    if (!movementForm.item || !movementForm.quantity || !movementForm.unitValue) {
      showError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Here you would typically save to backend
    console.log("Saving movement:", movementForm);
    
    showSuccess("Movimentação registrada com sucesso!");
    
    // Reset form and close modal
    setMovementForm({
      itemType: "Ingrediente",
      item: "",
      quantity: "",
      costType: "unitario",
      unitValue: "",
      date: new Date().toISOString().split('T')[0],
      description: ""
    });
    setIsMovementModalOpen(false);
  };

  const totalItems = inventoryItems.length + products.length;
  const lowStockItems = inventoryItems.filter(item => item.status === "Baixo" || item.status === "Crítico").length;
  const outOfStockProducts = products.filter(product => product.stock === 0).length;

  const availableItems = [
    { id: "liga_neutra", name: "Liga Neutra (g)", type: "Ingrediente" },
    { id: "chocolate_genuine", name: "Chocolate Preto Genuine 2,05kg (g)", type: "Ingrediente" },
    { id: "acucar", name: "Açúcar 5kg (g)", type: "Ingrediente" },
    { id: "morango", name: "Morango Bandeja 200g (Un)", type: "Ingrediente" },
    { id: "leite_integral", name: "Leite Integral 1L (Un)", type: "Ingrediente" },
    { id: "ovo", name: "Ovo 30Un (Un)", type: "Ingrediente" },
    { id: "leite_condensado", name: "Leite Condensado (Un)", type: "Ingrediente" },
    { id: "creme_leite", name: "Creme de Leite (Un)", type: "Ingrediente" },
    { id: "essencia_baunilha", name: "Essência de Baunilha (g)", type: "Ingrediente" },
    { id: "maracuja", name: "Maracujá Polpa (g)", type: "Ingrediente" },
    { id: "saborizante_limao", name: "Saborizante de Limão 100g (g)", type: "Ingrediente" },
    { id: "limao_fruta", name: "Limão Fruta (g)", type: "Ingrediente" },
    { id: "oreo", name: "Biscoito Recheado Oreo 90g (Un)", type: "Ingrediente" },
    { id: "laka", name: "Chocolate Branco Laka 80g (Un)", type: "Ingrediente" },
    { id: "ninho", name: "Leite em Pó Ninho 380g (g)", type: "Ingrediente" },
    { id: "leite_coco", name: "Leite de Coco 200ml (ml)", type: "Ingrediente" },
    { id: "nutella", name: "Nutella (g)", type: "Ingrediente" },
    { id: "ccgl", name: "Leite em pó CCGL 400g (g)", type: "Ingrediente" },
    { id: "coco_fruta", name: "Coco (Fruta) (g)", type: "Ingrediente" },
    { id: "coco_ralado", name: "Coco ralado 100g (g)", type: "Ingrediente" },
    { id: "pacoquita", name: "Pacoquinha Paçoquita (Un)", type: "Ingrediente" },
    { id: "choc_branco_genuine", name: "Chocolate Branco Genuine 2,05kg (g)", type: "Ingrediente" },
    { id: "acai", name: "Açaí 5L (g)", type: "Ingrediente" },
    { id: "sab_morango", name: "Saborizante de Morango 100g (g)", type: "Ingrediente" },
    { id: "emb_termica", name: "Embalagem Viagem Térmica (Un)", type: "Embalagem" },
    { id: "emb_higienica", name: "Embalagem Higiênica (Un)", type: "Embalagem" },
    { id: "saquinho", name: "Saquinho Interno (Un)", type: "Embalagem" }
  ];

  const filteredAvailableItems = availableItems.filter(item => 
    movementForm.itemType === "Todos" || item.type === movementForm.itemType
  );

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
          <Button size="sm" className="size-10 rounded-full p-0 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30" onClick={() => setIsMovementModalOpen(true)}>
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
            placeholder="Buscar no estoque..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 lg:px-0 max-w-7xl mx-auto">
        <div className="flex justify-center gap-2 lg:gap-8">
          <button
            onClick={() => setActiveTab("Todos")}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 flex-1 lg:flex-none lg:px-6 transition-colors ${
              activeTab === "Todos" ? "border-b-primary text-primary dark:text-primary" : "border-b-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">Todos</p>
          </button>
          <button
            onClick={() => setActiveTab("Insumos")}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 flex-1 lg:flex-none lg:px-6 transition-colors ${
              activeTab === "Insumos" ? "border-b-primary text-primary dark:text-primary" : "border-b-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">Insumos</p>
          </button>
          <button
            onClick={() => setActiveTab("Produtos")}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 flex-1 lg:flex-none lg:px-6 transition-colors ${
              activeTab === "Produtos" ? "border-b-primary text-primary dark:text-primary" : "border-b-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">Produtos</p>
          </button>
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
              <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{totalItems - lowStockItems - outOfStockProducts}</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-1 rounded-xl bg-white dark:bg-surface-dark p-3 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="text-amber-500" size={20} />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Repor</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{lowStockItems + outOfStockProducts}</p>
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
      <div className="flex-1 px-4 pb-24 space-y-3">
        {filteredItems().length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="flex items-center justify-center size-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <Package className="text-slate-400 dark:text-slate-500" size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Nenhum item encontrado</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-xs mb-6">
              {searchTerm ? "Tente ajustar sua busca." : "Comece adicionando insumos ou produtos ao estoque."}
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30">
              <Link to="/add-insumo">
                <Plus size={20} className="mr-2" />
                Adicionar Item
              </Link>
            </Button>
          </div>
        ) : (
          filteredItems().map((item) => {
            const IconComponent = getIcon(item);
            return (
              <div
                key={item.id}
                className="group relative flex items-center gap-4 px-4 py-3 hover:bg-slate-50 dark:hover:bg-surface-dark/50 transition-colors border-b border-slate-100 dark:border-slate-800/50"
              >
                <div className="relative shrink-0">
                  <div className="flex items-center justify-center rounded-xl bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-slate-700 shrink-0 size-14 text-slate-500 dark:text-slate-400">
                    <span className="material-symbols-outlined text-[24px]">{IconComponent}</span>
                  </div>
                  {(item.type === 'produto' ? item.stock === 0 : (item.status === "Baixo" || item.status === "Crítico")) && (
                    <div className={`absolute -bottom-1 -right-1 size-5 rounded-full flex items-center justify-center border-2 border-white dark:border-background-dark ${
                      item.type === 'produto' ? (item.stock === 0 ? "bg-red-500" : "") : (item.status === "Crítico" ? "bg-red-500" : "bg-amber-500")
                    }`}>
                      {getStatusIcon(item)}
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className={`text-base font-semibold truncate pr-2 ${
                      (item.type === 'produto' ? item.stock === 0 : item.status === "Esgotado") ? "text-slate-400 dark:text-slate-500" : "text-slate-800 dark:text-slate-100"
                    }`}>
                      {item.name}
                    </p>
                    {(item.type === 'produto' ? item.stock === 0 : (item.status === "Baixo" || item.status === "Crítico")) && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${getStatusColor(item)}`}>
                        {getStatusText(item)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                      {item.type === 'produto' ? `${item.stock} un` : `${item.quantity} ${item.unit}`}
                    </p>
                    {item.minQuantity && (
                      <>
                        <span className="size-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                        <p className="text-slate-400 dark:text-slate-500 text-xs">Mín: {item.minQuantity}</p>
                      </>
                    )}
                  </div>
                  {item.type === 'produto' && (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-slate-400 font-normal">Preço:</span>
                      <span className="text-sm font-bold text-primary">R$ {item.price?.toFixed(2)}</span>
                    </div>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-white p-2">
                      <MoreVertical size={20} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="cursor-pointer">
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Excluir</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })
        )}
      </div>

      {/* Movement Registration Modal */}
      <Dialog open={isMovementModalOpen} onOpenChange={setIsMovementModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-surface-dark border-surface-dark-lighter">
          <DialogHeader>
            <DialogTitle className="text-white text-lg font-bold">Registrar Movimentação</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Item Type */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Tipo de Item</label>
              <div className="flex p-1 bg-surface-dark-lighter rounded-lg">
                <button
                  onClick={() => setMovementForm(prev => ({ ...prev, itemType: "Ingrediente" }))}
                  className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-all ${
                    movementForm.itemType === "Ingrediente" 
                      ? "bg-primary text-white shadow-sm" 
                      : "text-text-secondary hover:text-white"
                  }`}
                >
                  Ingrediente
                </button>
                <button
                  onClick={() => setMovementForm(prev => ({ ...prev, itemType: "Embalagem" }))}
                  className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-all ${
                    movementForm.itemType === "Embalagem" 
                      ? "bg-primary text-white shadow-sm" 
                      : "text-text-secondary hover:text-white"
                  }`}
                >
                  Embalagem
                </button>
              </div>
            </div>

            {/* Item Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Item</label>
              <Select value={movementForm.item} onValueChange={(value) => setMovementForm(prev => ({ ...prev, item: value }))}>
                <SelectTrigger className="w-full bg-surface-dark-lighter border-transparent text-white focus:ring-primary focus:border-primary">
                  <SelectValue placeholder="Selecione um insumo..." />
                </SelectTrigger>
                <SelectContent>
                  {filteredAvailableItems.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Quantidade</label>
              <Input
                value={movementForm.quantity}
                onChange={(e) => setMovementForm(prev => ({ ...prev, quantity: e.target.value }))}
                placeholder="0"
                type="number"
                className="w-full bg-surface-dark-lighter border-transparent text-white focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Cost Type */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Tipo de Custo</label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center p-3 border border-primary/50 bg-primary/10 rounded-lg cursor-pointer transition-all">
                  <input
                    type="radio"
                    name="cost_type"
                    checked={movementForm.costType === "unitario"}
                    onChange={() => setMovementForm(prev => ({ ...prev, costType: "unitario" }))}
                    className="w-4 h-4 text-primary bg-surface-dark border-text-secondary focus:ring-primary focus:ring-2"
                  />
                  <span className="ml-3 text-sm font-medium text-white">Custo Unitário</span>
                </label>
                <label className="flex items-center p-3 border border-surface-dark-lighter rounded-lg cursor-pointer hover:bg-surface-dark-lighter/50 transition-all">
                  <input
                    type="radio"
                    name="cost_type"
                    checked={movementForm.costType === "pacote"}
                    onChange={() => setMovementForm(prev => ({ ...prev, costType: "pacote" }))}
                    className="w-4 h-4 text-primary bg-surface-dark border-text-secondary focus:ring-primary focus:ring-2"
                  />
                  <span className="ml-3 text-sm font-medium text-text-secondary">Valor do Pacote</span>
                </label>
              </div>
            </div>

            {/* Unit Value */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Valor Unitário (R$)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-text-secondary text-sm">R$</span>
                </div>
                <Input
                  value={movementForm.unitValue}
                  onChange={(e) => setMovementForm(prev => ({ ...prev, unitValue: e.target.value }))}
                  placeholder="0,00"
                  step="0.01"
                  type="number"
                  className="w-full bg-surface-dark-lighter border-transparent text-white focus:ring-primary focus:border-primary pl-10"
                />
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Data da Movimentação</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="material-symbols-outlined text-text-secondary text-lg">calendar_today</span>
                </div>
                <Input
                  value={movementForm.date}
                  onChange={(e) => setMovementForm(prev => ({ ...prev, date: e.target.value }))}
                  type="date"
                  className="w-full bg-surface-dark-lighter border-transparent text-white focus:ring-primary focus:border-primary pl-10"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Descrição (Opcional)</label>
              <Textarea
                value={movementForm.description}
                onChange={(e) => setMovementForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Ex: Reposição de emergência..."
                rows={3}
                className="w-full bg-surface-dark-lighter border-transparent text-white focus:ring-primary focus:border-primary resize-none"
              />
            </div>
          </div>
          <DialogFooter className="border-t border-surface-dark-lighter bg-surface-dark">
            <Button 
              onClick={handleSaveMovement}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all active:scale-[0.98]"
            >
              Salvar Movimentação
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