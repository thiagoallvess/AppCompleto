"use client";

import { ArrowLeft, Search, Map as MapIcon, UserPlus, MoreVertical, Navigation, Info, Wifi, Truck, Moon, Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDrivers, Driver } from "@/contexts/DriversContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { showSuccess } from "@/utils/toast";

const GestaoEntregadores = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  
  const { drivers, addDriver, updateDriver, removeDriver } = useDrivers();

  // Form states
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Driver['status']>("online");

  const filters = ["Todos", "Online", "Em Rota", "Offline"];

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "Todos" ||
                         (activeFilter === "Online" && driver.status === "online") ||
                         (activeFilter === "Em Rota" && driver.status === "route") ||
                         (activeFilter === "Offline" && driver.status === "offline");
    return matchesSearch && matchesFilter;
  });

  const handleOpenAddModal = () => {
    setEditingDriver(null);
    setName("");
    setStatus("online");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (driver: Driver) => {
    setEditingDriver(driver);
    setName(driver.name);
    setStatus(driver.status);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingDriver) {
      updateDriver(editingDriver.id, { name, status });
      showSuccess(`Entregador "${name}" atualizado!`);
    } else {
      const newDriver: Driver = {
        id: Date.now().toString(),
        name,
        status,
        deliveriesToday: 0,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        lastLogin: status === 'offline' ? 'Hoje, agora' : undefined
      };
      addDriver(newDriver);
      showSuccess(`"${name}" adicionado à equipe!`);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remover "${name}" da equipe?`)) {
      removeDriver(id);
      showSuccess(`Entregador "${name}" removido.`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-emerald-500';
      case 'route': return 'text-primary';
      case 'offline': return 'text-slate-500';
      default: return 'text-slate-500';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'online': return 'bg-emerald-500';
      case 'route': return 'bg-primary';
      case 'offline': return 'bg-slate-500';
      default: return 'bg-slate-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'route': return 'Em Rota';
      case 'offline': return 'Offline';
      default: return status;
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-4 py-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
             <Link to="/visao-geral" className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <ArrowLeft size={24} />
             </Link>
             <div>
                <h1 className="text-xl font-bold leading-tight">Equipe de Entregas</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">Gestão administrativa</p>
             </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">
              <MapIcon size={20} />
            </button>
            <button 
              onClick={handleOpenAddModal}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shadow-lg hover:bg-blue-600 transition-colors"
            >
              <UserPlus size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 flex flex-col gap-6">
        {/* Stats Overview */}
        <section className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center justify-center gap-1 rounded-xl p-3 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Online</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-2xl font-bold">{drivers.filter(d => d.status === 'online').length}</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-xl p-3 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm ring-1 ring-primary/20">
            <span className="text-[10px] font-bold text-primary uppercase tracking-wide">Em Rota</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="text-2xl font-bold">{drivers.filter(d => d.status === 'route').length}</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-xl p-3 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm opacity-60">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Offline</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-500"></span>
              <span className="text-2xl font-bold">{drivers.filter(d => d.status === 'offline').length}</span>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="flex flex-col gap-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={18} />
            </div>
            <input 
              className="block w-full rounded-xl border-none bg-white dark:bg-surface-dark py-3 pl-10 pr-4 text-slate-900 dark:text-white shadow-sm placeholder:text-slate-400 focus:ring-2 focus:ring-primary text-sm" 
              placeholder="Buscar entregador..." 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex h-8 shrink-0 items-center justify-center px-4 rounded-full text-sm font-semibold transition-colors ${
                  activeFilter === filter
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                  : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {/* Drivers List */}
        <section className="flex flex-col gap-3">
          {filteredDrivers.map((driver) => (
            <div key={driver.id} className="group relative flex flex-col gap-3 rounded-2xl bg-white dark:bg-surface-dark p-4 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              {/* Status Stripe */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${getStatusBg(driver.status)}`}></div>
              
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div 
                      className={`h-12 w-12 rounded-full bg-slate-700 bg-cover bg-center ${driver.status === 'route' ? 'ring-2 ring-primary/30' : ''}`}
                      style={{ backgroundImage: `url('${driver.avatar}')` }}
                    ></div>
                    <div className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-surface-dark ${getStatusBg(driver.status)}`}></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{driver.name}</h3>
                    <div className={`flex items-center gap-1 text-xs font-medium ${getStatusColor(driver.status)}`}>
                      {driver.status === 'route' ? <Truck size={12} className="fill-current" /> : 
                       driver.status === 'online' ? <Wifi size={12} /> : <Moon size={12} />}
                      {getStatusLabel(driver.status)}
                    </div>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors outline-none">
                      <MoreVertical size={20} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-32 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800">
                    <DropdownMenuItem 
                      onClick={() => handleOpenEditModal(driver)}
                      className="flex items-center gap-2 cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-800"
                    >
                      <Edit size={16} className="text-slate-500" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(driver.id, driver.name)}
                      className="flex items-center gap-2 cursor-pointer text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20"
                    >
                      <Trash2 size={16} />
                      Remover
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {driver.status !== 'offline' ? (
                <>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div className="flex flex-col bg-slate-50 dark:bg-background-dark/50 rounded-lg p-2">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Entregas</span>
                      <span className="text-sm font-bold">{driver.deliveriesToday} Hoje</span>
                    </div>
                    <div className="flex flex-col bg-slate-50 dark:bg-background-dark/50 rounded-lg p-2">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">{driver.status === 'route' ? 'Local' : 'Status'}</span>
                      <span className="text-sm font-medium truncate">{driver.location || 'Aguardando'}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-1">
                    {driver.status === 'route' ? (
                      <button className="flex-1 h-9 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                        <Navigation size={16} />
                        Rastrear
                      </button>
                    ) : (
                      <button className="w-full h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white text-slate-600 dark:text-slate-300 text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                        Atribuir Pedido
                      </button>
                    )}
                    <button className="flex-1 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                      <Info size={16} />
                      Detalhes
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2 mt-1 px-1">
                  <span className="material-symbols-outlined text-slate-500 text-[16px]">history</span>
                  <span className="text-xs text-slate-500 font-medium">Último login: {driver.lastLogin}</span>
                </div>
              )}
            </div>
          ))}

          {filteredDrivers.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              Nenhum entregador encontrado.
            </div>
          )}
        </section>
      </main>

      {/* Driver Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md mx-auto bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800 p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {editingDriver ? "Editar Entregador" : "Adicionar Entregador"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Ex: Roberto Gomes" 
                required
                className="bg-gray-50 dark:bg-[#121a21]"
              />
            </div>
            <div className="space-y-2">
              <Label>Status Inicial</Label>
              <div className="grid grid-cols-3 gap-2">
                {(['online', 'route', 'offline'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      status === s 
                      ? 'bg-primary border-primary text-white' 
                      : 'bg-gray-50 dark:bg-[#121a21] border-slate-200 dark:border-slate-800 text-slate-500'
                    }`}
                  >
                    {s === 'online' ? 'Online' : s === 'route' ? 'Em Rota' : 'Offline'}
                  </button>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full h-12 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl mt-6">
              {editingDriver ? "Salvar Alterações" : "Adicionar à Equipe"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <button 
          onClick={handleOpenAddModal}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-xl shadow-primary/30 hover:bg-blue-600 hover:scale-105 transition-all"
        >
          <Plus size={28} />
        </button>
      </div>
    </div>
  );
};

export default GestaoEntregadores;