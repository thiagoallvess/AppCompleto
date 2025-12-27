"use client";

import { Bell, MapPin, Clock, DollarSign, Bike } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useOrders } from "@/contexts/OrdersContext";
import { useDrivers } from "@/contexts/DriversContext";
import MainDrawer from "../components/MainDrawer";

const Monitoramento = () => {
  const { orders } = useOrders();
  const { drivers } = useDrivers();
  const [searchTerm, setSearchTerm] = useState("");

  // Cálculos baseados em dados reais
  const pending = orders.filter(o => o.status === "Novo" || o.status === "Preparo").length;
  const preparing = orders.filter(o => o.status === "Preparo").length;
  const inRoute = orders.filter(o => o.status === "Rota").length;
  const delivered = orders.filter(o => o.status === "Entregue").length;

  const activeDeliveries = orders.filter(order => order.status !== "Entregue" && !order.cancelled);

  // Filtrar entregadores ativos (online ou em rota)
  const activeDrivers = drivers.filter(d => d.status === 'online' || d.status === 'route');

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center bg-background-light dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-200 dark:border-gray-800 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <MainDrawer />
          <h2 className="text-white text-lg font-bold leading-tight tracking-tight">Monitoramento</h2>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button className="flex items-center justify-center size-10 rounded-full bg-transparent hover:bg-white/5 transition-colors">
            <Bell className="text-white" size={24} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative flex-1 flex flex-col overflow-hidden w-full">
        {/* Map Layer (Simulated) */}
        <div className="absolute inset-0 z-0 bg-surface-dark">
          <div 
            className="w-full h-full bg-cover bg-center opacity-80" 
            style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCfpeFOIVNieu1xqOrBMBYWRByOLLzeKeYmE8slSkDyJytYCC5Vesyjzo_g0phgQa3eoDugYdBoQ636sHs25VyHueUcBnd4j2l_UyWVUPIihqam2dD4GAWjG-tRhoWXl3Z_vZxH7ep85WspZ5LsNxlGqrcojL7_4SB3TplxWRzMkiQQUUt4IwRXOkNfWsTabxEEIiZCtJqXHOgJftaBm1_E2GGciY3SZDcM94je8Pz82lq8V8yjqCwvxy24elBL3MXZ2GTLyyOGzg")',
                filter: 'grayscale(100%) contrast(120%) brightness(60%)'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark/90 via-transparent to-background-dark/90 pointer-events-none"></div>
          
          {/* Marcadores baseados em dados reais */}
          {activeDrivers.slice(0, 2).map((driver, index) => (
            <div key={driver.id} className={`absolute ${index === 0 ? 'top-[30%] left-[45%]' : 'top-[45%] left-[20%]'} flex flex-col items-center gap-1 cursor-pointer group`}>
              <div className="bg-surface-dark px-2 py-1 rounded text-[10px] font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap mb-1">{driver.name}</div>
              <div className="size-10 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/40 border-2 border-white z-10 animate-bounce">
                <Bike size={18} className="text-white" />
              </div>
            </div>
          ))}

          {/* Pontos de entrega baseados em pedidos ativos */}
          {activeDeliveries.slice(0, 2).map((order, index) => (
            <div key={order.id} className={`absolute ${index === 0 ? 'top-[35%] left-[65%]' : 'top-[55%] left-[30%]'} size-3 bg-white rounded-full shadow-md border-2 border-primary`}></div>
          ))}

          {/* Map Controls */}
          <div className="absolute right-4 bottom-[45%] flex flex-col gap-2 z-10">
            <button className="size-10 bg-surface-dark/90 backdrop-blur rounded-lg flex items-center justify-center text-white shadow-lg border border-white/10 active:scale-95 transition-transform">
              <span className="material-symbols-outlined">my_location</span>
            </button>
            <button className="size-10 bg-surface-dark/90 backdrop-blur rounded-lg flex items-center justify-center text-white shadow-lg border border-white/10 active:scale-95 transition-transform">
              <span className="material-symbols-outlined">layers</span>
            </button>
          </div>
        </div>

        {/* Floating UI: Stats & Search */}
        <div className="relative z-10 flex flex-col gap-4 p-4 w-full">
          {/* Search Bar */}
          <div className="w-full bg-surface-dark/90 backdrop-blur-md border border-white/10 rounded-xl flex items-center h-12 px-3 shadow-xl">
            <span className="material-symbols-outlined text-slate-400 mr-2">search</span>
            <input 
              className="bg-transparent border-none text-white placeholder-slate-400 text-sm w-full focus:ring-0" 
              placeholder="Buscar pedido ou entregador..." 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="text-primary font-bold text-xs uppercase tracking-wider px-2">Filtrar</button>
          </div>

          {/* Stats Row */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            <div className="flex min-w-[110px] flex-1 flex-col gap-1 rounded-xl p-3 bg-surface-dark/90 backdrop-blur-md border border-white/5 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-orange-500"></div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Pendentes</p>
              </div>
              <div>
                <p className="text-white text-2xl font-bold tracking-tight">{pending}</p>
                <p className="text-primary text-[10px] font-medium mt-1">Aguardando ação</p>
              </div>
            </div>
            <div className="flex min-w-[110px] flex-1 flex-col gap-1 rounded-xl p-3 bg-surface-dark/90 backdrop-blur-md border border-white/5 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-yellow-500"></div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Preparo</p>
              </div>
              <div>
                <p className="text-white text-2xl font-bold tracking-tight">{preparing}</p>
                <p className="text-slate-400 text-[10px] font-medium mt-1">Na cozinha</p>
              </div>
            </div>
            <div className="flex min-w-[110px] flex-1 flex-col gap-1 rounded-xl p-3 bg-primary/90 backdrop-blur-md border border-primary/20 shadow-lg shadow-primary/20">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-white animate-pulse"></div>
                <p className="text-white/90 text-[10px] font-bold uppercase tracking-wider">Rota</p>
              </div>
              <div>
                <p className="text-white text-2xl font-bold tracking-tight">{inRoute}</p>
                <p className="text-white/80 text-[10px] font-medium mt-1">Em trânsito</p>
              </div>
            </div>
            <div className="flex min-w-[110px] flex-1 flex-col gap-1 rounded-xl p-3 bg-surface-dark/90 backdrop-blur-md border border-white/5 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-emerald-500"></div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Entregues</p>
              </div>
              <div>
                <p className="text-white text-2xl font-bold tracking-tight">{delivered}</p>
                <p className="text-emerald-500 text-[10px] font-medium mt-1">Finalizados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sheet */}
        <div className="absolute bottom-0 left-0 w-full h-[45%] bg-surface-dark rounded-t-3xl shadow-[0_-4px_30px_rgba(0,0,0,0.5)] z-20 flex flex-col border-t border-white/5">
          {/* Handle */}
          <div className="flex items-center justify-center pt-3 pb-1 w-full shrink-0">
            <div className="h-1.5 w-12 rounded-full bg-slate-700/50"></div>
          </div>
          
          {/* Sheet Header */}
          <div className="px-5 pt-2 pb-4 flex justify-between items-end shrink-0">
            <div>
              <h2 className="text-white text-xl font-bold leading-tight">Entregas Ativas</h2>
              <p className="text-slate-500 text-xs mt-0.5">Tempo real • {activeDeliveries.length} pedidos</p>
            </div>
            <Link to="/gestao-pedidos" className="text-primary text-sm font-bold flex items-center gap-1 hover:opacity-80 transition-opacity">
              Ver lista <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          {/* List of Deliveries */}
          <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-3 scrollbar-thin scrollbar-thumb-slate-800">
            {activeDeliveries.length > 0 ? (
              activeDeliveries.map((order) => (
                <div key={order.id} className="bg-[#161f28] p-4 rounded-2xl border border-white/5 flex flex-col gap-3 shadow-sm hover:border-primary/30 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`size-10 rounded-xl flex items-center justify-center text-primary border border-primary/20 ${order.status === 'Rota' ? 'bg-primary/20' : 'bg-slate-800/40'}`}>
                        <span className="material-symbols-outlined">{order.statusIcon}</span>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-sm">Pedido {order.id}</h3>
                        <p className="text-slate-500 text-xs">{order.customer} • {order.status === 'Rota' ? 'Em Trânsito' : 'Na Loja'}</p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${
                      order.status === 'Rota' ? 'bg-primary/20 text-primary border-primary/20' : 
                      order.status === 'Preparo' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                      'bg-orange-500/10 text-orange-500 border-orange-500/20'
                    }`}>
                      {order.status}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-500 text-sm">schedule</span>
                      <span className="text-slate-300 text-xs font-medium">
                        {order.status === 'Rota' ? 'Entregador em percurso' : 'Aguardando coleta'}
                      </span>
                    </div>
                    {order.eta && (
                      <div className="flex items-center gap-1 text-emerald-400">
                        <Clock size={14} />
                        <span className="text-xs font-bold">~{order.eta}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center opacity-40">
                <Clock size={40} className="mb-2" />
                <p className="text-sm font-medium">Nenhuma entrega em andamento</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitoramento;