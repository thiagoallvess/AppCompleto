"use client";

import { Bell, MapPin, Clock, DollarSign, Bike } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useOrders } from "@/contexts/OrdersContext";
import { useDrivers } from "@/contexts/DriversContext";
import { useAuth } from "@/contexts/AuthContext";
import { showSuccess, showError } from "@/utils/toast";

const PedidosEntrega = () => {
  const { orders, updateOrder } = useOrders();
  const { drivers } = useDrivers();
  const { profile } = useAuth();
  const [isOnline, setIsOnline] = useState(true);

  // Filtra pedidos disponíveis: status "Preparo" (pronto) ou "Rota" (despachado) 
  // que ainda não possuem um entregador atribuído
  const availableDeliveries = orders.filter(order => 
    (order.status === "Preparo" || order.status === "Rota") && 
    !order.driverId && 
    !order.cancelled
  );

  const handleAcceptOrder = (orderId: string, value: number) => {
    if (!isOnline) {
      showError("Você precisa estar online para aceitar entregas.");
      return;
    }

    // Busca o perfil do entregador logado ou usa os dados do perfil do Auth
    const currentDriver = drivers.find(d => d.id === profile?.id);
    
    const driverId = profile?.id || "temp-id";
    const driverName = profile?.first_name || "Entregador";

    updateOrder(orderId, {
      driverId: driverId,
      driverName: driverName,
      status: "Rota",
      statusColor: "blue",
      statusIcon: "sports_motorsports",
      isNew: false
    });

    showSuccess(`Pedido aceito! Você receberá R$ ${value.toFixed(2)}`);
  };

  const handleRejectOrder = (orderId: string) => {
    showSuccess("Pedido ignorado.");
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    showSuccess(isOnline ? "Você está offline" : "Você está online e recebendo entregas!");
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark border-x dark:border-[#2a2a2a] overflow-x-hidden shadow-2xl lg:max-w-7xl lg:flex-row lg:min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-80 lg:bg-background-light dark:lg:bg-background-dark lg:border-r lg:border-gray-200 dark:lg:border-[#2a2a2a]">
        {/* Desktop Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 border-2 border-gray-100 dark:border-[#2a2a2a]" 
                style={{
                  backgroundImage: `url("${profile?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"}")`
                }}
              ></div>
              <div className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-background-light dark:border-background-dark ${isOnline ? 'bg-primary' : 'bg-gray-400'}`}></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Bom trabalho,</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white leading-none">{profile?.first_name || 'Entregador'}</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col p-4 rounded-xl bg-gray-50 dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#2a2a2a]">
              <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                <DollarSign size={20} />
                <span className="text-xs font-semibold uppercase tracking-wider">Ganhos Hoje</span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">R$ 0,00</p>
            </div>
            <div className="flex flex-col p-4 rounded-xl bg-gray-50 dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#2a2a2a]">
              <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                <Bike size={20} />
                <span className="text-xs font-semibold uppercase tracking-wider">Entregas</span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                0 <span className="text-sm font-medium text-gray-500 dark:text-gray-500">feitas</span>
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-6 pb-4">
          <nav className="space-y-2">
            <Link to="/pedidos-entrega" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-xl">home</span>
              <span className="font-semibold">Pedidos Disponíveis</span>
            </Link>
            <Link to="/historico-entregas" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors">
              <span className="material-symbols-outlined text-xl">history</span>
              <span>Histórico</span>
            </Link>
            <Link to="/carteira-motoboy" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors">
              <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
              <span>Carteira</span>
            </Link>
            <Link to="/perfil-motoboy" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors">
              <span className="material-symbols-outlined text-xl">person</span>
              <span>Perfil</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-24 lg:pb-0">
        {/* Top App Bar - Mobile */}
        <div className="flex items-center px-4 pt-6 pb-2 justify-between bg-background-light dark:bg-background-dark z-10 sticky top-0 lg:hidden">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-gray-100 dark:border-[#2a2a2a]" 
                style={{
                  backgroundImage: `url("${profile?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"}")`
                }}
              ></div>
              <div className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-background-light dark:border-background-dark ${isOnline ? 'bg-primary' : 'bg-gray-400'}`}></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Bom trabalho,</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white leading-none">{profile?.first_name || 'Entregador'}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleOnlineStatus}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors ${
                isOnline 
                  ? 'bg-primary/10 border-primary/20 text-primary' 
                  : 'bg-gray-100 dark:bg-[#2a2a2a] border-gray-300 dark:border-[#333] text-gray-600 dark:text-gray-400'
              }`}
            >
              <div className={`size-2 rounded-full ${isOnline ? 'bg-primary animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-xs font-bold tracking-wide uppercase">
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </button>
            <button className="flex items-center justify-center size-10 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors relative">
              <Bell size={24} />
              <div className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#121212]"></div>
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="px-4 pb-2 pt-2 lg:px-6 lg:pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">Pedidos Disponíveis</h3>
            <span className="px-2 py-0.5 rounded-md bg-gray-200 dark:bg-[#2a2a2a] text-xs font-bold text-gray-600 dark:text-gray-300">
              {availableDeliveries.length}
            </span>
          </div>
        </div>

        {/* Deliveries Grid */}
        <div className="flex-1 px-4 lg:px-6 pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {availableDeliveries.map((delivery, index) => (
              <div 
                key={delivery.id} 
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-[#1e1e1e] shadow-sm border border-gray-100 dark:border-[#2a2a2a] hover:shadow-lg transition-all duration-200"
              >
                <div 
                  className="h-32 lg:h-40 w-full bg-cover bg-center relative" 
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(30,30,30,0.2), #1e1e1e), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCfpeFOIVNieu1xqOrBMBYWRByOLLzeKeYmE8slSkDyJytYCC5Vesyjzo_g0phgQa3eoDugYdBoQ636sHs25VyHueUcBnd4j2l_UyWVUPIihqam2dD4GAWjG-tRhoWXl3Z_vZxH7ep85WspZ5LsNxlGqrcojL7_4SB3TplxWRzMkiQQUUt4IwRXOkNfWsTabxEEIiZCtJqXHOgJftaBm1_E2GGciY3SZDcM94je8Pz82lq8V8yjqCwvxy24elBL3MXZ2GTLyyOGzg")`
                  }}
                >
                  <div className="absolute top-3 left-3 bg-[#121212]/80 backdrop-blur px-2 py-1 rounded-md border border-[#2a2a2a] flex items-center gap-1">
                    <MapPin className="text-primary" size={16} />
                    <span className="text-xs font-bold text-white">2.5 km</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-[#121212]/80 backdrop-blur px-2 py-1 rounded-md border border-[#2a2a2a] flex items-center gap-1">
                    <Clock className="text-gray-300" size={16} />
                    <span className="text-xs font-bold text-white">~25 min</span>
                  </div>
                </div>

                <div className="p-4 pt-3">
                  <div className="flex justify-between items-end mb-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pedido {delivery.id}</span>
                      <h4 className="text-base font-semibold text-slate-900 dark:text-white leading-tight">
                        {delivery.customer}
                      </h4>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Taxa de entrega</span>
                      <span className="text-2xl font-extrabold text-primary tracking-tight">
                        R$ 5,00
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 mb-5">
                    <div className="mt-1 flex items-center justify-center size-8 rounded-full bg-gray-100 dark:bg-[#2a2a2a] shrink-0 text-gray-600 dark:text-gray-300">
                      <MapPin size={18} />
                    </div>
                    <div className="flex flex-col justify-center gap-0.5">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                        Endereço de Entrega
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Centro - São Paulo, SP
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => handleRejectOrder(delivery.id)}
                      className="flex items-center justify-center h-12 rounded-xl border border-gray-300 dark:border-[#333] text-gray-600 dark:text-gray-300 text-sm font-bold hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
                    >
                      Ignorar
                    </button>
                    <button 
                      onClick={() => handleAcceptOrder(delivery.id, 5.00)}
                      className="flex items-center justify-center h-12 rounded-xl bg-primary text-white text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                    >
                      ACEITAR CORRIDA
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {availableDeliveries.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="size-16 rounded-full bg-gray-100 dark:bg-[#2a2a2a] flex items-center justify-center mb-4">
                <Bike size={32} className="text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Nenhum pedido disponível
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto mb-6">
                Quando houver pedidos prontos para entrega, eles aparecerão aqui para você aceitar.
              </p>
              {!isOnline && (
                <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                  Ative seu status online para receber pedidos
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 w-full max-w-md bg-white dark:bg-[#121212] border-t border-gray-200 dark:border-[#2a2a2a] lg:hidden">
        <div className="flex items-center justify-around h-20 pb-4 px-2">
          <button className="flex flex-col items-center gap-1 p-2 w-16 text-primary">
            <span className="material-symbols-outlined text-2xl fill-current">home</span>
            <span className="text-[10px] font-bold">Início</span>
          </button>
          <Link to="/historico-entregas" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-2xl">history</span>
            <span className="text-[10px] font-medium">Histórico</span>
          </Link>
          <Link to="/carteira-motoboy" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
            <span className="text-[10px] font-medium">Carteira</span>
          </Link>
          <Link to="/perfil-motoboy" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-2xl">person</span>
            <span className="text-[10px] font-medium">Perfil</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PedidosEntrega;