import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, Search, Filter, MoreVertical, Trash2 } from "lucide-react";

const GestaoProducao = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newLot, setNewLot] = useState({
    name: "",
    recipe: "",
    quantity: "",
    date: "",
    status: "Produzindo"
  });

  const filters = [
    { label: "Todos", count: null },
    { label: "Esta Semana", count: 4 },
    { label: "Mês Passado", count: 12 },
    { label: "Finalizados", count: 8 }
  ];

  const [productionLots, setProductionLots] = useState([
    {
      id: 1,
      name: "Ninho com Nutella",
      recipe: "Ninho com Nutella",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQI5Bd-HQhMa0roL66f0M780HWmmqj98bmIZaQjBCeGYe5rZ31qkJu43AOVL3u8tAt_AWdZ_tAhbDsirOp9nG8KG_S_Sc0AraSlLL5HDsJg6pkxcfIxrGbnsJrrpRxgWxiLWlOT1-m21pyJhpZEsu1JDIZt-ewzQQ8Ng8B93krfEByXuYSH5XCAwVUVSJ0BUkY5K1lNRYF1Jokck2SkgLRA9Iw28BqZB63RyZloSS3PukeRI-NHlmXR3NulS-tiLx-fi6mm71LjQ",
      date: "12/08/2023",
      produced: 50,
      cost: 75.00,
      status: "Finalizado",
      statusColor: "green",
      unitCost: 1.50,
      profit: 37.50
    },
    {
      id: 2,
      name: "Morango Gourmet",
      recipe: "Morango Cremoso",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCM3cfAeatmEUtNaDEnz796M7L7_1N-EtyXmykGuHogX2Bqw0GLmlvYa3HPA8Wz1_4o9F5wPSUrzWkU8Yp7doalaFscT5306YI3bZgNz9gTLuFuBl4eyymE72I2oud60ide53rz4tw6ycGt2mAau951TpWIjxrfxMQg_NpEJUwcm1qol_S5JpSoZbGnw8au7eUWzH4lvezL2wocDTs541UOAWtFuVwleVW5xacABNhs7r5_Xla2rV2_GgGzX6Ol3wbDpTujEKBi_A",
      date: "11/08/2023",
      produced: 30,
      cost: 45.00,
      status: "Em Estoque",
      statusColor: "yellow",
      unitCost: 1.50,
      profit: 22.50
    },
    {
      id: 3,
      name: "Maracujá Cremoso",
      recipe: "Maracujá Trufado",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoZ4WrJnviJNuxDALva68IEx8BdGnHIjNAHbiCD9c4LdL8-hJlme5-_jxH6yK45w60ONtc-wS1X4YRBtWIaMoT-ulkjkHFRp2qqXBLfOkCCCkwdQaWLx2-89611q0649qzVgnLg86WrY-Ea70L22N2sX9RqBAfGRPY9V-lGLiw6-mIc2syzuhmzeimcROK7NbRdCxSJMIFrOkJSzh4puGnvIZiAPSOVeuwwrqMUlMvOWxuvH8MJKoEM1-UH9iaFBbmLGPUy3smQQ",
      date: "10/08/2023",
      produced: 100,
      cost: 120.00,
      status: "Finalizado",
      statusColor: "green",
      unitCost: 1.20,
      profit: 80.00
    },
    {
      id: 4,
      name: "Chocolate Belga",
      recipe: "Chocolate Belga",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbEviK9KT0E9h3QEbPLsiBOx3ZHKNIWd52qzii4oNRBeZ7WQINE2KnatvqY8O2XspgsFwVYrAvvbntLzhKghfwaPlh2P9oNgzYp2ypPeNu6bmUi4LV7xlv_9DYAVmpThYsxQG2xtR_dp1XNo55sERlrTINgqe3B4FdftLwUosvBAWZNoDIWY84nAp7gNkDNjoR1X6W8yzcK3iEg_OC1VFYOIJTRE0_FxtaQMUs6yS9db4WuqjlwtcKMi4nkZpmmh7s-gXcnrU3Sg",
      date: "09/08/2023",
      produced: 45,
      cost: 90.00,
      status: "Produzindo",
      statusColor: "blue",
      unitCost: 2.00,
      profit: 45.00
    }
  ]);

  const recipes = [
    { id: "1", name: "Ninho com Nutella" },
    { id: "2", name: "Morango Cremoso" },
    { id: "3", name: "Maracujá Trufado" },
    { id: "4", name: "Chocolate Belga" },
    { id: "5", name: "Paçoca" }
  ];

  const filteredLots = productionLots.filter(lot => {
    const matchesSearch = lot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lot.recipe.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "Todos" ||
                         (activeFilter === "Esta Semana" && true) || // Mock filter logic
                         (activeFilter === "Mês Passado" && true) ||
                         (activeFilter === "Finalizados" && lot.status === "Finalizado");
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (color: string) => {
    switch (color) {
      case "green": return "bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 ring-green-600/20";
      case "yellow": return "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 ring-yellow-600/20";
      case "blue": return "bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-500 ring-blue-500/20";
      default: return "bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400 ring-gray-600/20";
    }
  };

  const handleCreateLot = () => {
    if (newLot.name && newLot.recipe && newLot.quantity && newLot.date) {
      const selectedRecipe = recipes.find(r => r.id === newLot.recipe);
      const newLotData = {
        id: Date.now(),
        name: newLot.name,
        recipe: selectedRecipe?.name || newLot.recipe,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkd8lB5c2Vaw9ZupDeGKA8CqQrsuCbv1IVWtjP1Pgq6N5JYAMjwdcNFdmTh7yXGKKGPykrJKJC3EQGvyud_4OcMgbqUKbbJxg_HMmq1DxGVHqG67Xx_g_O1nhM68hW_zb8fX5mpqZq1K6sshICrQCxa8oV61kN1WUpqDp5PiU3Ww7K_MZF2TOu-iy-FqWeK-zibAFwgP0IvVgMX4QnpBYdPUzoUzGQaTcXvNfJTbTCUlmXc25qyIc3GuUHXF19vX4tEBWm0AYdEA", // Default image
        date: newLot.date,
        produced: parseInt(newLot.quantity),
        cost: parseInt(newLot.quantity) * 1.50, // Mock cost calculation
        status: newLot.status,
        statusColor: newLot.status === "Finalizado" ? "green" : newLot.status === "Em Estoque" ? "yellow" : "blue",
        unitCost: 1.50,
        profit: parseInt(newLot.quantity) * 1.50 * 0.5 // Mock profit calculation
      };

      setProductionLots([newLotData, ...productionLots]);
      setNewLot({ name: "", recipe: "", quantity: "", date: "", status: "Produzindo" });
      setIsCreateModalOpen(false);
    }
  };

  const handleDeleteLot = (id: number) => {
    setProductionLots(productionLots.filter(lot => lot.id !== id));
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setProductionLots(productionLots.map(lot => {
      if (lot.id === id) {
        let statusColor = "blue";
        if (newStatus === "Finalizado") statusColor = "green";
        else if (newStatus === "Em Estoque") statusColor = "yellow";
        return { ...lot, status: newStatus, statusColor };
      }
      return lot;
    }));
  };

  const totalProduced = filteredLots.reduce((sum, lot) => sum + lot.produced, 0);
  const totalCost = filteredLots.reduce((sum, lot) => sum + lot.cost, 0);
  const totalProfit = filteredLots.reduce((sum, lot) => sum + lot.profit, 0);

  return (
    <div className="relative flex min-h-screen w-full flex-col pb-24 bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-x-hidden antialiased">
      {/* Top App Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-white/90 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 border-b border-slate-200 dark:border-slate-800">
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">menu</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center text-slate-900 dark:text-white">Gestão de Produção</h1>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Filter className="text-slate-600 dark:text-slate-300" size={20} />
        </button>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <Input
            type="text"
            placeholder="Buscar por produto ou receita..."
            className="pl-10 h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filters / Chips */}
      <div className="w-full pb-2">
        <div className="flex gap-2 overflow-x-auto px-4 no-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter.label}
              onClick={() => setActiveFilter(filter.label)}
              className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-colors ${
                activeFilter === filter.label
                  ? "bg-primary text-white"
                  : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <span className="text-xs font-semibold">{filter.label}</span>
              {filter.count && (
                <Badge variant="secondary" className="h-4 w-4 p-0 text-[10px] flex items-center justify-center">
                  {filter.count}
                </Badge>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="px-4 py-4 grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-[20px]">factory</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Produzido</span>
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-white">{totalProduced}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">unidades</p>
        </div>
        <div className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-green-500 text-[20px]">attach_money</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Custo Total</span>
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-white">R$ {totalCost.toFixed(2)}</p>
          <p className="text-xs text-green-500">+8.2%</p>
        </div>
        <div className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-blue-500 text-[20px]">trending_up</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Lucro</span>
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-white">R$ {totalProfit.toFixed(2)}</p>
          <p className="text-xs text-blue-500">+12.5%</p>
        </div>
      </div>

      {/* Headline */}
      <div className="px-4 py-4 flex items-baseline justify-between">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Lotes Recentes</h2>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total: {filteredLots.length}</span>
      </div>

      {/* List Items */}
      <div className="flex flex-col gap-4 px-4">
        {filteredLots.map((lot) => (
          <div
            key={lot.id}
            className="group relative flex flex-col gap-3 rounded-xl bg-white dark:bg-surface-dark p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800/60"
          >
            <div className="flex items-start gap-4">
              {/* Image */}
              <div className="shrink-0 relative size-[72px] overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${lot.image}')` }}
                ></div>
              </div>
              {/* Content */}
              <div className="flex flex-1 flex-col h-[72px] justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight pr-2">{lot.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{lot.recipe}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-[10px] ${getStatusColor(lot.statusColor)}`}>
                      {lot.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-slate-400 hover:text-primary transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                          <MoreVertical size={20} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleStatusChange(lot.id, "Finalizado")}>
                          <span className="material-symbols-outlined text-green-500 text-[16px]">check_circle</span>
                          Marcar como Finalizado
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(lot.id, "Em Estoque")}>
                          <span className="material-symbols-outlined text-yellow-500 text-[16px]">inventory</span>
                          Mover para Estoque
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteLot(lot.id)} className="text-red-600 dark:text-red-400">
                          <Trash2 size={16} />
                          Excluir Lote
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[14px]">calendar_month</span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{lot.date}</span>
                </div>
              </div>
            </div>
            {/* Metrics Row */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-black/20 rounded-lg p-3 mt-1">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">Produzido</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">{lot.produced} un</span>
              </div>
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">Custo Unit.</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">R$ {lot.unitCost.toFixed(2)}</span>
              </div>
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">Lucro</span>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">R$ {lot.profit.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Lot Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-md mx-auto bg-background-light dark:bg-background-dark border-slate-200 dark:border-slate-800 p-0">
          <DialogHeader className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
            <DialogTitle className="text-lg font-bold text-slate-900 dark:text-white">Novo Lote de Produção</DialogTitle>
          </DialogHeader>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nome do Produto</label>
              <Input
                value={newLot.name}
                onChange={(e) => setNewLot({...newLot, name: e.target.value})}
                placeholder="Ex: Ninho com Nutella"
                className="bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Receita</label>
              <Select value={newLot.recipe} onValueChange={(value) => setNewLot({...newLot, recipe: value})}>
                <SelectTrigger className="bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700">
                  <SelectValue placeholder="Selecione uma receita" />
                </SelectTrigger>
                <SelectContent>
                  {recipes.map((recipe) => (
                    <SelectItem key={recipe.id} value={recipe.id}>
                      {recipe.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Quantidade</label>
                <Input
                  type="number"
                  value={newLot.quantity}
                  onChange={(e) => setNewLot({...newLot, quantity: e.target.value})}
                  placeholder="0"
                  className="bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Data</label>
                <Input
                  type="date"
                  value={newLot.date}
                  onChange={(e) => setNewLot({...newLot, date: e.target.value})}
                  className="bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Status Inicial</label>
              <Select value={newLot.status} onValueChange={(value) => setNewLot({...newLot, status: value})}>
                <SelectTrigger className="bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Produzindo">Produzindo</SelectItem>
                  <SelectItem value="Em Estoque">Em Estoque</SelectItem>
                  <SelectItem value="Finalizado">Finalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-3 p-4 border-t border-slate-200 dark:border-slate-800">
            <Button
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreateLot}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Criar Lote
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* FAB */}
      <Link
        to="/add-producao"
        className="fixed bottom-24 right-5 z-20 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:bg-primary/90 transition-all active:scale-95"
      >
        <Plus size={28} />
      </Link>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 flex h-20 pb-4 items-center justify-around bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800/80 backdrop-blur-lg bg-opacity-95">
        <Link to="/visao-geral" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <span className="material-symbols-outlined text-[24px]">dashboard</span>
          <span className="text-[10px] font-medium">Início</span>
        </Link>
        <button className="flex flex-col items-center justify-center gap-1 p-2 w-16 text-primary">
          <span className="material-symbols-outlined fill-current text-[24px]">conveyor_belt</span>
          <span className="text-[10px] font-medium">Produção</span>
        </button>
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

export default GestaoProducao;