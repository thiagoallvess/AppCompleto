"use client";

import { Bell, MapPin, Clock, DollarSign, Bike } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { showSuccess, showError } from "@/utils/toast";

const PedidosEntrega = () => {
  const [isOnline, setIsOnline] = useState(true);

  const availableDeliveries = [
    {
      id: "PED-001",
      restaurant: "Geladinho Gourmet HQ",
      distance: "2.5 km",
      time: "~25 min",
      value: 14.50,
      address: {
        street: "Rua das Flores, 123",
        details: "Centro - Bloco B"
      },
      mapImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfcV0ZAKBjjg3MVJW4B0LVqTE0BxsdFTpsD--ZmwBd0_mDs0bOuyl7n_U4M9rJ639wRVhRTOPGJxLK9Xxfivlq0svx-ZvQqur-WknEvwPJPj4475NQlKvmIZ1jxCUEeBRGZXsmILsakUjawCHzUgwOmQoBWBrdTgLeRIDF1jdlpnLZv1KvVjzcXrE7O8ka7AiG_eYwsDbky5Xi6CNeLiySM-MCumR5tsuTzsKIBABqYBZTJGyfZw1EOIBgCY91cqAUoHJoqtY8cg"
    },
    {
      id: "PED-002",
      restaurant: "Sorvetes do Zé",
      distance: "5.1 km",
      time: "~40 min",
      value: 22.00,
      address: {
        street: "Av. Paulista, 1500",
        details: "Bela Vista - Apt 42"
      },
      mapImage: "https://placeholder.pics/svg/300"
    },
    {
      id: "PED-003",
      restaurant: "Gelato Express",
      distance: "0.8 km",
      time: "~10 min",
      value: 9.00,
      address: {
        street: "Rua Augusta, 500",
        details: "Consolação - Loja 2"
      },
      mapImage: "https://placeholder.pics/svg/300"
    }
  ];

  const handleAcceptOrder = (orderId: string, value: number) => {
    showSuccess(`Corrida aceita! Você receberá R$ ${value.toFixed(2)}`);
  };

  const handleRejectOrder = (orderId: string) => {
    showError("Corrida rejeitada");
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    showSuccess(isOnline ? "Você está offline" : "Você está online e recebendo entregas!");
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto bg-white dark:bg-[#121212] border-x dark:border-[#2a2a2a] overflow-x-hidden shadow-2xl lg:max-w-7xl lg:flex-row lg:min-h-screen">
      {/* Header - Mobile */}
      <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-[#121212] lg:hidden">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-gray-100 dark:border-[#2a2a2a]" 
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuALEIh8HjLL7FQ3X77XjOWAZ3UT1OyyZtxxP4UUAOZ59uyQA_EBUxzNVtIsogRITvQzwMh1etYm4BwvDAwXMmivqRAcZ2koimAHtS_K3nrY1dvw0662qwSSXi39yClK6GKPg_XGlqjzscnAAcnHCY_xVpRmoryZyQx7UWOmrNx_m53Nm0BqOJqs3mhVQgjOwi6pIpGDIR1N-ycjt3AHpAQtJtcCjc4PBHeIOaY1xV2zTF8b6AoGQXbPDe6MWDPeyz_4acsVXcy-qA")`
              }}
            ></div>
            <div className="absolute bottom-0 right-0 size-3 bg-primary rounded-full border-2 border-white dark:border-[#121212]"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Bom trabalho,</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white leading-none">João Carlos</span>
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

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-80 lg:bg-white dark:lg:bg-[#121212] lg:border-r lg:border-gray-200 dark:lg:border-[#2a2a2a]">
        {/* Desktop Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 border-2 border-gray-100 dark:border-[#2a2a2a]" 
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuALEIh8HjLL7FQ3X77XjOWAZ3UT1OyyZtxxP4UUAOZ59uyQA_EBUxzNVtIsogRITvQzwMh1etYm4BwvDAwXMmivqRAcZ2koimAHtS_K3nrY1dvw0662qwSSXi39yClK6GKPg_XGlqjzscnAAcnHCY_xVpRmoryZyQx7UWOmrNx_m53Nm0BqOJqs3mhVQgjOwi6pIpGDIR1N-ycjt3AHpAQtJtcCjc4PBHeIOaY1xV2zTF8b6AoGQXbPDe6MWDPeyz_4acsVXcy-qA")`
                }}
              ></div>
              <div className="absolute bottom-0 right-0 size-3 bg-primary rounded-full border-2 border-white dark:border-[#121212]"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Bom trabalho,</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white leading-none">João Carlos</span>
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
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">R$ 85,00</p>
            </div>
            <div className="flex flex-col p-4 rounded-xl bg-gray-50 dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#2a2a2a]">
              <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                <Bike size={20} />
                <span className="text-xs font-semibold uppercase tracking-wider">Entregas</span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                12 <span className="text-sm font-medium text-gray-500 dark:text-gray-500">feitas</span>
              </p>
            </div>
          </div>
        </div>

        {/* Online Status Toggle */}
        <div className="px-6 pb-4">
          <button 
            onClick={toggleOnlineStatus}
            className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border transition-all ${
              isOnline 
                ? 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20' 
                : 'bg-gray-100 dark:bg-[#2a2a2a] border-gray-300 dark:border-[#333] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#333]'
            }`}
          >
            <div className={`size-3 rounded-full ${isOnline ? 'bg-primary animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm font-bold tracking-wide uppercase">
              {isOnline ? 'Online - Recebendo entregas' : 'Offline'}
            </span>
          </button>
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
        {/* Mobile Stats */}
        <div className="px-4 py-4 lg:hidden">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col p-4 rounded-xl bg-gray-50 dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#2a2a2a]">
              <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                <DollarSign size={20} />
                <span className="text-xs font-semibold uppercase tracking-wider">Ganhos Hoje</span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">R$ 85,00</p>
            </div>
            <div className="flex flex-col p-4 rounded-xl bg-gray-50 dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#2a2a2a]">
              <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                <Bike size={20} />
                <span className="text-xs font-semibold uppercase tracking-wider">Entregas</span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                12 <span className="text-sm font-medium text-gray-500 dark:text-gray-500">feitas</span>
              </p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="px-4 pb-2 pt-2 lg:px-6 lg:pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Disponíveis agora</h3>
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
                className={`group relative flex flex-col bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-sm border border-gray-100 dark:border-[#2a2a2a] overflow-hidden ${
                  index === 2 ? 'opacity-90' : ''
                } hover:shadow-lg transition-all duration-200`}
              >
                <div 
                  className="h-32 lg:h-40 w-full bg-cover bg-center relative" 
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(30,30,30,0.2), #1e1e1e), url("${delivery.mapImage}")`
                  }}
                >
                  <div className="absolute top-3 left-3 bg-[#121212]/80 backdrop-blur px-2 py-1 rounded-md border border-[#2a2a2a] flex items-center gap-1">
                    <MapPin className="text-primary" size={16} />
                    <span className="text-xs font-bold text-white">{delivery.distance}</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-[#121212]/80 backdrop-blur px-2 py-1 rounded-md border border-[#2a2a2a] flex items-center gap-1">
                    <Clock className="text-gray-300" size={16} />
                    <span className="text-xs font-bold text-white">{delivery.time}</span>
                  </div>
                </div>

                <div className="p-4 pt-3">
                  <div className="flex justify-between items-end mb-4 border-b border-gray-100 dark:border-[#2a2a2a] pb-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">Restaurante</span>
                      <h4 className="text-base font-semibold text-slate-900 dark:text-white leading-tight">
                        {delivery.restaurant}
                      </h4>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Valor total</span>
                      <span className="text-2xl font-extrabold text-primary tracking-tight">
                        R$ {delivery.value.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 mb-5">
                    <div className="mt-1 flex items-center justify-center size-8 rounded-full bg-gray-100 dark:bg-[#2a2a2a] shrink-0 text-gray-600 dark:text-gray-300">
                      <MapPin size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Entregar em:</span>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                        {delivery.address.street}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {delivery.address.details}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => handleRejectOrder(delivery.id)}
                      className="flex items-center justify-center h-12 rounded-xl border border-gray-300 dark:border-[#333] text-gray-600 dark:text-gray-300 text-sm font-bold hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
                    >
                      Rejeitar
                    </button>
                    <button 
                      onClick={() => handleAcceptOrder(delivery.id, delivery.value)}
                      className="flex items-center justify-center h-12 rounded-xl bg-primary text-[#102216] text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                    >
                      ACEITAR CORRIDA
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 z-50 w-full max-w-md bg-white dark:bg-[#121212] border-t border-gray-200 dark:border-[#2a2a2a] lg:hidden">
        <div className="flex items-center justify-around h-20 pb-4 px-2">
          <Link to="/pedidos-entrega" className="flex flex-col items-center gap-1 p-2 w-16 text-primary">
            <span className="material-symbols-outlined filled text-2xl">home</span>
            <span className="text-[10px] font-bold">Início</span>
          </Link>
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