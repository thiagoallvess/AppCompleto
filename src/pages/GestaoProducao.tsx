import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, Search, Filter, MoreVertical, Trash2 } from "lucide-react";

const GestaoProducao = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterSearch, setFilterSearch] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState(["Em Estoque", "Finalizado"]);
  const [selectedPeriod, setSelectedPeriod] = useState("Este Mês");
  const [newLot, setNewLot] = useState({ name: "", recipe: "", quantity: "", date: "", status: "Produzindo" });

  // Mock data for production lots
  const productionLots = [
    {
      id: "8349",
      name: "Ninho com Nutella",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkd8lB5c2Vaw9ZupDeGKA8CqQrsuCbv1IVWtjP1Pgq6N5JYAMjwdcNFdmTh7yXGKKGPykrJKJC3EQGvyud_4OcMgbqUKbbJxg_HMmq1DxGVHqG67Xx_g_O1nhM68hW_zb8fX5mpqZq1K6sshICrQCxa8oV61kN1WUpqDp5PiU3Ww7K_MZF2TOu-iy-FqWeK-zibAFwgP0IvVgMX4QnpBYdPUzoUzGQaTcXvNfJTbTCUlmXc25qyIc3GuUHXF19vX4tEBWm0AYdEA",
      status: "Finalizado",
      statusColor: "green",
      date: "12/08/2023",
      produced: 50,
      totalCost: 75.00,
      unitCost: 1.50
    },
    {
      id: "8348",
      name: "Morango Gourmet",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCM3cfAeatmEUtNaDEnz796M7L7_1N-EtyXmykGuHogX2Bqw0GLmlvYa3HPA8Wz1_4o9F5wPSUrzWkU8Yp7doalaFscT5306YI3bZgNz9gTLuFuBl4eyymE72I2oud60ide53rz4tw6ycGt2mAau951TpWIjxrfxMQg_NpEJUwcm1qol_S5JpSoZbGnw8au7eUWzH4lvezL2wocDTs541UOAWtFuVwleVW5xacABNhs7r5_Xla2rV2_GgGzX6Ol3wbDpTujEKBi_A",
      status: "Em Estoque",
      statusColor: "yellow",
      date: "11/08/2023",
      produced: 30,
      totalCost: 45.00,
      unitCost: 1.50
    },
    {
      id: "8347",
      name: "Maracujá Trufado",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoZ4WrJnviJNuxDALva68IEx8BdGnHIjNAHbiCD9c4LdL8-hJlme5-_jxH6yK45w60ONtc-wS1X4YRBtWIaMoT-ulkjkHFRp2qqXBLfOkCCCkwdQaWLx2-89611q0649qzVgnLg86WrY-Ea70L22N2sX9RqBAfGRPY9V-lGLiw6-mIc2syzuhmzeimcROK7NbRdCxSJMIFrOkJSzh4puGnvIZiAPSOVeuwwrqMUlMvOWxuvH8MJKoEM1-UH9iaFBbmLGPUy3smQQ",
      status: "Produzindo",
      statusColor: "blue",
      date: "10/08/2023",
      produced: 0,
      totalCost: 0.00,
      unitCost: 1.40
    }
  ];

  const filteredLots = productionLots.filter(lot => {
    const matchesSearch = lot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lot.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "Todos" ||
                         (activeFilter === "Finalizados" && lot.status === "Finalizado") ||
                         (activeFilter === "Em Estoque" && lot.status === "Em Estoque") ||
                         (activeFilter === "Produzindo" && lot.status === "Produzindo");
    return matchesSearch && matchesFilter;
  });

  const handleCreateLot = () => {
    // Generate new lot ID
    const newId = (Math.max(...productionLots.map(l => parseInt(l.id))) + 1).toString();
    
    // Create new lot object
    const lotToAdd = {
      id: newId,
      name: newLot.name,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkd8lB5c2Vaw9ZupDeGKA8CqQrsuCbv1IVWtjP1Pgq6N5JYAMjwdcNFdmTh7yXGKKGPykrJKJC3EQGvyud_4OcMgbqUKbbJxg_HMmq1DxGVHqG67Xx_g_O1nhM68hW_zb8fX5mpqZq1K6sshICrQCxa8oV61kN1WUpqDp5PiU3Ww7K_MZF2TOu-iy-FqWeK-zibAFwgP0IvVgMX4QnpBYdPUzoUzGQaTcXvNfJTbTCUlmXc25qyIc3GuUHXF19vX4tEBWm0AYdEA", // Default image
      status: newLot.status,
      statusColor: newLot.status === "Finalizado" ? "green" : newLot.status === "Em Estoque" ? "yellow" : "blue",
      date: newLot.date || new Date().toLocaleDateString('pt-BR'),
      produced: parseInt(newLot.quantity) || 0,
      totalCost: (parseInt(newLot.quantity) || 0) * 1.50, // Mock calculation
      unitCost: 1.50
    };

    // Save to localStorage (in real app, this would be an API call)
    const existingLots = JSON.parse(localStorage.getItem('productionLots') || '[]');
    const updatedLots = [...existingLots, lotToAdd];
    localStorage.setItem('productionLots', JSON.stringify(updatedLots));

    // Reset form and close modal
    setNewLot({ name: "", recipe: "", quantity: "", date: "", status: "Produzindo" });
    setIsCreateModalOpen(false);

    // Navigate to details page
    navigate(`/detalhes-lote?id=${newId}`);
  };

  const getStatusColor = (color: string) => {
    switch (color) {
      case "green": return "bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400";
      case "yellow": return "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "blue": return "bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400";
      default: return "bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  const totalProduced = productionLots.reduce((sum, lot) => sum + lot.produced, 0);
  const totalCost = productionLots.reduce((sum, lot) => sum + lot.totalCost, 0);
  const averageCost = totalProduced > 0 ? totalCost / totalProduced : 0;

  return (
    <div className="relative flex min-h-screen w-full flex-col pb-24 bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-x-hidden antialiased">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-white/90 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 border-b border-slate-200 dark:border-slate-800">
        <Link
          to="/visao-geral"
          className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">arrow_back</span>
        </Link>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center text-slate-900 dark:text-white">Gestão de Produção</h1>
        <Button
          size="sm"
          className="size-10 rounded-full p-0 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus size={24} />
        </Button>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-4 w-full">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <Input
            className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl text-sm font-medium bg-gray-100 dark:bg-surface-dark text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
            placeholder="Buscar lotes..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="w-full overflow-x-auto no-scrollbar pb-2 pl-4 pr-4">
        <div className="flex gap-2 min-w-max">
          {["Todos", "Finalizados", "Em Estoque", "Produzindo"].map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              className={`h-9 px-4 rounded-full ${
                activeFilter === filter
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                  : "bg-slate-200 dark:bg-surface-dark border-transparent dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-800"
              } transition-transform active:scale-95`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="px-4 py-4 grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-1 rounded-xl bg-white dark:bg-surface-dark p-3 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-slate-400 text-[18px]">inventory_2</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Prod.</span>
          </div>
          <span className="text-lg font-bold text-slate-900 dark:text-white">{totalProduced}</span>
        </div>
        <div className="flex flex-col gap-1 rounded-xl bg-white dark:bg-surface-dark p-3 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-[18px]">attach_money</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Custo Total</span>
          </div>
          <span className="text-lg font-bold text-slate-900 dark:text-white">R$ {totalCost.toFixed(2)}</span>
        </div>
        <div className="flex flex-col gap-1 rounded-xl bg-white dark:bg-surface-dark p-3 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-orange-500 text-[18px]">sell</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Custo Médio</span>
          </div>
          <span className="text-lg font-bold text-slate-900 dark:text-white">R$ {averageCost.toFixed(2)}</span>
        </div>
      </div>

      {/* Production Lots List */}
      <div className="flex-1 px-4 pb-20 space-y-3">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 mt-2">Lotes Recentes</h3>
        {filteredLots.map((lot) => (
          <Link
            key={lot.id}
            to={`/detalhes-lote?id=${lot.id}`}
            className="block"
          >
            <div className="bg-white dark:bg-surface-dark rounded-xl p-3 shadow-sm border border-slate-200 dark:border-slate-800 flex gap-4 items-start active:scale-[0.99] transition-transform cursor-pointer group">
              <div className="relative shrink-0 w-[72px] h-[72px]">
                <div
                  className="w-full h-full rounded-lg bg-gray-200 dark:bg-gray-700 bg-cover bg-center"
                  style={{ backgroundImage: `url('${lot.image}')` }}
                ></div>
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
                <div className="flex justify-between items-start">
                  <h3 className={`text-base font-semibold text-slate-800 dark:text-white truncate pr-2`}>
                    {lot.name}
                  </h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-gray-400 hover:text-primary transition-colors p-1 -m-1 -mt-2" onClick={(e) => e.stopPropagation()}>
                        <MoreVertical size={20} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigate(`/detalhes-lote?id=${lot.id}`); }}>
                        Ver Detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); /* Edit logic */ }}>
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); /* Delete logic */ }} className="text-red-600">
                        <Trash2 size={16} className="mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">schedule</span>
                    <span>{lot.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">inventory_2</span>
                    <span>{lot.produced} un</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${getStatusColor(lot.statusColor)}`}>
                    {lot.status}
                  </span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    R$ {lot.totalCost.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Create Lot Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-md mx-auto bg-background-light dark:bg-background-dark border-slate-200 dark:border-slate-800 p-0 max-h-[90vh] overflow-hidden">
          <DialogHeader className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3">
            <DialogTitle className="text-lg font-bold text-slate-900 dark:text-white">Novo Lote de Produção</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="lot-name">
                Nome do Lote
              </label>
              <Input
                id="lot-name"
                placeholder="Ex: Produção de Ninho"
                value={newLot.name}
                onChange={(e) => setNewLot({ ...newLot, name: e.target.value })}
                className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="lot-recipe">
                Receita
              </label>
              <Select value={newLot.recipe} onValueChange={(value) => setNewLot({ ...newLot, recipe: value })}>
                <SelectTrigger className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700">
                  <SelectValue placeholder="Selecione uma receita..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ninho-nutella">Ninho com Nutella</SelectItem>
                  <SelectItem value="morango-gourmet">Morango Gourmet</SelectItem>
                  <SelectItem value="maracuja-trufado">Maracujá Trufado</SelectItem>
                  <SelectItem value="coco-cremoso">Coco Cremoso</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="lot-quantity">
                Quantidade a Produzir
              </label>
              <Input
                id="lot-quantity"
                type="number"
                placeholder="0"
                value={newLot.quantity}
                onChange={(e) => setNewLot({ ...newLot, quantity: e.target.value })}
                className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="lot-date">
                Data de Produção
              </label>
              <Input
                id="lot-date"
                type="date"
                value={newLot.date}
                onChange={(e) => setNewLot({ ...newLot, date: e.target.value })}
                className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="lot-status">
                Status Inicial
              </label>
              <Select value={newLot.status} onValueChange={(value) => setNewLot({ ...newLot, status: value })}>
                <SelectTrigger className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700">
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
          <div className="border-t border-slate-200 dark:border-slate-800 p-4">
            <Button
              onClick={handleCreateLot}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-lg shadow-primary/20"
            >
              Criar Lote
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating Action Button */}
      <Link
        to="/add-producao"
        className="fixed bottom-20 right-4 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:bg-primary/90 transition-all active:scale-95 z-30"
      >
        <Plus size={28} />
      </Link>

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

export default GestaoProducao;