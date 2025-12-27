"use client";

import { useState } from "react";
import { useDrivers, Driver } from "@/contexts/DriversContext";
import { useOrders } from "@/contexts/OrdersContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, Search, MoreVertical, MapPin, Bike, Wifi, Moon, Plus, UserPlus, Navigation, Info } from "lucide-react";
import { Link } from "react-router-dom";
import AtribuirPedidoModal from "@/components/AtribuirPedidoModal";
import DesatribuirPedidoModal from "@/components/DesatribuirPedidoModal";
import HistoricoEntregasModal from "@/components/HistoricoEntregasModal";

const GestaoEntregadores = () => {
  const { drivers } = useDrivers();
  const { orders } = useOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  
  // Modal states
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isAtribuirOpen, setIsAtribuirOpen] = useState(false);
  const [isDesatribuirOpen, setIsDesatribuirOpen] = useState(false);
  const [isHistoricoOpen, setIsHistoricoOpen] = useState(false);

  const filters = ["Todos", "Online", "Em Rota", "Offline"];

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "Todos" || 
                         (activeFilter === "Online" && driver.status === "online") ||
                         (activeFilter === "Em Rota" && driver.status === "route") ||
                         (activeFilter === "Offline" && driver.status === "offline");
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online": return <Wifi size={14} className="text-emerald-500" />;
      case "route": return <Navigation size={14} className="text-primary" />;
      case "offline": return <Moon size={14} className="text-slate-400" />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "online": return "Online";
      case "route": return "Em Rota";
      case "offline": return "Offline";
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-emerald-500";
      case "route": return "bg-primary";
      case "offline": return "bg-slate-500";
      default: return "bg-slate-300";
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-4 py-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
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
            <Link to="/monitoramento" className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">
              <MapPin size={24} />
            </Link>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shadow-lg hover:bg-blue-600 transition-colors">
              <UserPlus size={24} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Stats Overview */}
        <section className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center justify-center gap-1 rounded-xl p-3 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Online</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-2xl font-bold">{drivers.filter(d => d.status === 'online').length}</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-xl p-3 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm ring-1 ring-primary/20">
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Em Rota</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="text-2xl font-bold">{drivers.filter(d => d.status === 'route').length}</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-xl p-3 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm opacity-60">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Offline</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-500"></span>
              <span className="text-2xl font-bold">{drivers.filter(d => d.status === 'offline').length}</span>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="flex flex-col gap-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <Input 
              className="pl-10 h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 rounded-xl" 
              placeholder="Buscar entregador..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex h-9 shrink-0 items-center justify-center px-5 rounded-full text-sm font-bold transition-all ${
                  activeFilter === filter
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md"
                    : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {/* Drivers List */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDrivers.map((driver) => {
            const assignedOrdersCount = orders.filter(o => o.driverId === driver.id && o.status !== "Entregue").length;
            
            return (
              <div key={driver.id} className="group relative flex flex-col gap-3 rounded-2xl bg-white dark:bg-surface-dark p-4 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all hover:border-primary/30">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${getStatusColor(driver.status)}`}></div>
                
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div 
                        className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-800 bg-cover bg-center border border-slate-100 dark:border-slate-700" 
                        style={{ backgroundImage: `url('${driver.avatar}')` }}
                      ></div>
                      <div className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-surface-dark ${getStatusColor(driver.status)}`}></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">{driver.name}</h3>
                      <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-tight opacity-80">
                        {getStatusIcon(driver.status)}
                        <span className={driver.status === 'route' ? 'text-primary' : driver.status === 'online' ? 'text-emerald-500' : 'text-slate-400'}>
                          {getStatusLabel(driver.status)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full p-1 transition-colors">
                        <MoreVertical size={20} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800">
                      <DropdownMenuItem onClick={() => { setSelectedDriver(driver); setIsHistoricoOpen(true); }} className="flex items-center gap-2 cursor-pointer">
                        <span className="material-symbols-outlined text-[18px]">history</span>
                        Ver Histórico
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { setSelectedDriver(driver); setIsDesatribuirOpen(true); }} className="flex items-center gap-2 cursor-pointer text-red-500">
                        <span className="material-symbols-outlined text-[18px]">remove_circle_outline</span>
                        Remover Pedidos
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="flex flex-col bg-slate-50 dark:bg-background-dark/50 rounded-lg p-2 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Entregas</span>
                    <span className="text-sm font-bold">{driver.deliveriesToday} Hoje</span>
                  </div>
                  <div className="flex flex-col bg-slate-50 dark:bg-background-dark/50 rounded-lg p-2 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Ativos</span>
                    <span className="text-sm font-bold text-primary">{assignedOrdersCount} Pedidos</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-1">
                  {driver.status === 'offline' ? (
                    <div className="w-full flex items-center justify-center gap-2 py-2 text-xs text-slate-400 font-medium italic">
                      <Info size={14} />
                      Último login: {driver.lastLogin || 'Não disponível'}
                    </div>
                  ) : (
                    <Button 
                      onClick={() => { setSelectedDriver(driver); setIsAtribuirOpen(true); }}
                      className="w-full h-10 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/20 transition-all font-bold text-sm flex items-center justify-center gap-2"
                    >
                      <Plus size={18} />
                      Atribuir Pedido
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </main>

      {/* Modals */}
      <AtribuirPedidoModal 
        isOpen={isAtribuirOpen} 
        onClose={() => setIsAtribuirOpen(false)} 
        driver={selectedDriver} 
      />
      <DesatribuirPedidoModal 
        isOpen={isDesatribuirOpen} 
        onClose={() => setIsDesatribuirOpen(false)} 
        driver={selectedDriver} 
      />
      <HistoricoEntregasModal 
        isOpen={isHistoricoOpen} 
        onClose={() => setIsHistoricoOpen(false)} 
        driver={selectedDriver} 
      />

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <button className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-xl shadow-primary/30 hover:bg-blue-600 hover:scale-105 transition-all active:scale-95">
          <Plus size={28} />
        </button>
      </div>
    </div>
  );
};

export default GestaoEntregadores;