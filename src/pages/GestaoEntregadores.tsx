"use client";

import { ArrowLeft, Search, Map as MapIcon, UserPlus, MoreVertical, Navigation, Info, Wifi, Truck, Moon, Plus, Edit, Trash2, X, Phone, Camera, Bike, Car, ShieldCheck, Unlink } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { showSuccess } from "@/utils/toast";
import AtribuirPedidoModal from "@/components/AtribuirPedidoModal";
import DesatribuirPedidoModal from "@/components/DesatribuirPedidoModal";

const GestaoEntregadores = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isUnassignModalOpen, setIsUnassignModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [selectedDriverForManage, setSelectedDriverForManage] = useState<Driver | null>(null);
  
  const { drivers, addDriver, updateDriver, removeDriver } = useDrivers();

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [vehicleType, setVehicleType] = useState<'moto' | 'bike' | 'car'>('moto');
  const [isActive, setIsActive] = useState(true);

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
    setPhone("");
    setCpf("");
    setVehicleType("moto");
    setIsActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (driver: Driver) => {
    setEditingDriver(driver);
    setName(driver.name);
    setPhone(driver.phone || "");
    setCpf(driver.cpf || "");
    setVehicleType(driver.vehicleType || "moto");
    setIsActive(driver.status !== 'offline');
    setIsModalOpen(true);
  };

  const handleOpenAssignModal = (driver: Driver) => {
    setSelectedDriverForManage(driver);
    setIsAssignModalOpen(true);
  };

  const handleOpenUnassignModal = (driver: Driver) => {
    setSelectedDriverForManage(driver);
    setIsUnassignModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const currentStatus: Driver['status'] = isActive ? (editingDriver?.status === 'route' ? 'route' : 'online') : 'offline';

    if (editingDriver) {
      updateDriver(editingDriver.id, { 
        name, 
        phone, 
        cpf, 
        vehicleType, 
        status: currentStatus 
      });
      showSuccess(`Entregador "${name}" atualizado!`);
    } else {
      const newDriver: Driver = {
        id: Date.now().toString(),
        name,
        phone,
        cpf,
        vehicleType,
        status: currentStatus,
        deliveriesToday: 0,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        lastLogin: currentStatus === 'offline' ? 'Hoje, agora' : undefined
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
                      onClick={() => handleOpenUnassignModal(driver)}
                      className="flex items-center gap-2 cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-800"
                    >
                      <Unlink size={16} className="text-slate-500" />
                      Gerenciar Pedidos
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
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">{driver.status === 'route' ? 'Local' : 'Veículo'}</span>
                      <span className="text-sm font-medium truncate">
                        {driver.status === 'route' ? (driver.location || 'Em rota') : (driver.vehicleType || 'Não inf.')}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-1">
                    {driver.status === 'route' ? (
                      <button className="flex-1 h-9 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                        <Navigation size={16} />
                        Rastrear
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleOpenAssignModal(driver)}
                        className="w-full h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-700 hover:text-white dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                      >
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
        <DialogContent className="max-w-md mx-auto bg-[#111a22] border-none p-0 overflow-hidden shadow-2xl">
          <DialogHeader className="sticky top-0 z-10 flex items-center bg-[#111a22] px-4 py-4 justify-between border-b border-[#324d67]/30">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="text-white" size={24} />
            </button>
            <DialogTitle className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
              {editingDriver ? "Editar Entregador" : "Adicionar Entregador"}
            </DialogTitle>
            <div className="size-10"></div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-[#324d67] pb-24">
            {/* Avatar Section */}
            <div className="flex flex-col items-center justify-center py-6 gap-3">
              <div className="relative size-24 rounded-full bg-[#192633] border-2 border-dashed border-[#324d67] flex items-center justify-center group cursor-pointer hover:border-primary transition-colors">
                <Camera className="text-[#92adc9] text-3xl group-hover:text-primary transition-colors" size={32} />
              </div>
              <p className="text-[#92adc9] text-sm font-medium">Foto de Perfil</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name Field */}
              <div className="px-4 py-1">
                <label className="flex flex-col flex-1">
                  <p className="text-white text-base font-medium leading-normal pb-2">Nome Completo</p>
                  <input 
                    className="form-input flex w-full min-w-0 flex-1 rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#324d67] bg-[#192633] focus:border-primary h-14 placeholder:text-[#92adc9] p-[15px] text-base font-normal leading-normal transition-all" 
                    placeholder="Ex: João Silva" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
              </div>

              {/* Phone Field */}
              <div className="px-4 py-1">
                <label className="flex flex-col flex-1">
                  <p className="text-white text-base font-medium leading-normal pb-2">Telefone / WhatsApp</p>
                  <div className="flex w-full flex-1 items-stretch rounded-lg group">
                    <input 
                      className="form-input flex w-full min-w-0 flex-1 rounded-l-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#324d67] bg-[#192633] focus:border-primary h-14 placeholder:text-[#92adc9] p-[15px] border-r-0 pr-2 text-base font-normal leading-normal transition-all" 
                      placeholder="(00) 00000-0000" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <div className="text-[#92adc9] flex border border-[#324d67] bg-[#192633] items-center justify-center pr-[15px] rounded-r-lg border-l-0 group-focus-within:border-primary group-focus-within:ring-2 group-focus-within:ring-primary/50 transition-all">
                      <Phone size={20} />
                    </div>
                  </div>
                </label>
              </div>

              {/* CPF Field */}
              <div className="px-4 py-1">
                <label className="flex flex-col flex-1">
                  <p className="text-white text-base font-medium leading-normal pb-2">CPF <span className="text-[#92adc9] text-sm font-normal">(Opcional)</span></p>
                  <input 
                    className="form-input flex w-full min-w-0 flex-1 rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#324d67] bg-[#192633] focus:border-primary h-14 placeholder:text-[#92adc9] p-[15px] text-base font-normal leading-normal transition-all" 
                    placeholder="000.000.000-00" 
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </label>
              </div>

              {/* Vehicle Selection */}
              <div className="px-4 py-4">
                <p className="text-white text-base font-medium leading-normal pb-3">Tipo de Veículo</p>
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    type="button"
                    onClick={() => setVehicleType('moto')}
                    className={`flex flex-col items-center justify-center gap-2 rounded-xl p-3 cursor-pointer transition-all ${
                      vehicleType === 'moto' 
                      ? 'bg-primary/20 border-2 border-primary shadow-sm' 
                      : 'bg-[#192633] border border-[#324d67] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Truck size={24} className={vehicleType === 'moto' ? 'text-primary' : 'text-white'} />
                    <span className={`text-sm ${vehicleType === 'moto' ? 'text-white font-semibold' : 'text-[#92adc9] font-medium'}`}>Moto</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setVehicleType('bike')}
                    className={`flex flex-col items-center justify-center gap-2 rounded-xl p-3 cursor-pointer transition-all ${
                      vehicleType === 'bike' 
                      ? 'bg-primary/20 border-2 border-primary shadow-sm' 
                      : 'bg-[#192633] border border-[#324d67] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Bike size={24} className={vehicleType === 'bike' ? 'text-primary' : 'text-white'} />
                    <span className={`text-sm ${vehicleType === 'bike' ? 'text-white font-semibold' : 'text-[#92adc9] font-medium'}`}>Bike</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setVehicleType('car')}
                    className={`flex flex-col items-center justify-center gap-2 rounded-xl p-3 cursor-pointer transition-all ${
                      vehicleType === 'car' 
                      ? 'bg-primary/20 border-2 border-primary shadow-sm' 
                      : 'bg-[#192633] border border-[#324d67] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Car size={24} className={vehicleType === 'car' ? 'text-primary' : 'text-white'} />
                    <span className={`text-sm ${vehicleType === 'car' ? 'text-white font-semibold' : 'text-[#92adc9] font-medium'}`}>Carro</span>
                  </button>
                </div>
              </div>

              {/* Status Toggle */}
              <div className="px-4 py-2">
                <div className="flex items-center justify-between p-4 rounded-lg bg-[#192633] border border-[#324d67]">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-10 rounded-full bg-[#111a22] text-[#92adc9]">
                      <ShieldCheck size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-medium text-base">Status do Entregador</span>
                      <span className="text-[#92adc9] text-xs">Permitir acesso ao app</span>
                    </div>
                  </div>
                  <Switch 
                    checked={isActive}
                    onCheckedChange={setIsActive}
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Footer Actions */}
          <footer className="absolute bottom-0 left-0 right-0 bg-[#111a22] border-t border-[#324d67] p-4 flex flex-col gap-3 backdrop-blur-md bg-opacity-95">
            <button 
              onClick={handleSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 px-6 text-white font-bold text-base hover:bg-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/20"
            >
              <Plus size={20} />
              {editingDriver ? "Salvar Alterações" : "Adicionar à Equipe"}
            </button>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-transparent py-3 px-6 text-[#92adc9] font-semibold text-base hover:text-white hover:bg-white/5 transition-all"
            >
              Cancelar
            </button>
          </footer>
        </DialogContent>
      </Dialog>

      {/* Assign Order Modal */}
      <AtribuirPedidoModal 
        isOpen={isAssignModalOpen} 
        onClose={() => setIsAssignModalOpen(false)} 
        driver={selectedDriverForManage}
      />

      {/* Unassign Order Modal */}
      <DesatribuirPedidoModal 
        isOpen={isUnassignModalOpen} 
        onClose={() => setIsUnassignModalOpen(false)} 
        driver={selectedDriverForManage}
      />

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