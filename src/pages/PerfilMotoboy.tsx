"use client";

import { ArrowLeft, Settings, Edit, Badge, History, LogOut, Power, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { Switch } from "@/components/ui/switch";
import { showSuccess } from "@/utils/toast";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/contexts/OrdersContext";

const PerfilMotoboy = () => {
  const { profile, signOut } = useAuth();
  const { orders } = useOrders();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);

  // Cálculo de métricas reais baseadas nos pedidos
  const stats = useMemo(() => {
    const myDeliveries = orders.filter(o => o.driverId === profile?.id && o.status === "Entregue");
    return {
      total: myDeliveries.length,
      rating: myDeliveries.length > 0 ? "4.9" : "N/A" // Rating simulado baseado em volume por enquanto
    };
  }, [orders, profile]);

  const handleStatusToggle = (checked: boolean) => {
    setIsOnline(checked);
    showSuccess(checked ? "Você está online e recebendo entregas!" : "Você está offline");
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const displayName = profile?.first_name || "Entregador";
  const displayPhone = profile?.id ? "(11) 98765-4321" : "Não informado"; // Simulado até ter campo no DB

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark border-x dark:border-[#2a2a2a] overflow-x-hidden shadow-2xl lg:max-w-7xl lg:flex-row lg:min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-80 lg:bg-background-light dark:lg:bg-background-dark lg:border-r lg:border-gray-200 dark:lg:border-[#2a2a2a]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 border-2 border-gray-100 dark:border-[#2a2a2a] flex items-center justify-center bg-slate-200 dark:bg-slate-800" 
                style={profile?.avatar_url ? { backgroundImage: `url("${profile.avatar_url}")` } : {}}
              >
                {!profile?.avatar_url && <span className="text-lg font-bold">{displayName[0]}</span>}
              </div>
              <div className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-background-light dark:border-background-dark ${isOnline ? 'bg-primary' : 'bg-gray-400'}`}></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Bom trabalho,</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white leading-none">{displayName}</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col p-4 rounded-xl bg-gray-50 dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#2a2a2a]">
              <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                <Star className="text-yellow-500 fill-current" size={20} />
                <span className="text-xs font-semibold uppercase tracking-wider">Avaliação</span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{stats.rating}</p>
            </div>
            <div className="flex flex-col p-4 rounded-xl bg-gray-50 dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#2a2a2a]">
              <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                <span className="material-symbols-outlined text-green-500 text-[20px]">sports_motorsports</span>
                <span className="text-xs font-semibold uppercase tracking-wider">Entregas</span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 px-6 pb-4">
          <nav className="space-y-2">
            <Link to="/pedidos-entrega" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors">
              <span className="material-symbols-outlined text-xl">home</span>
              <span>Pedidos Disponíveis</span>
            </Link>
            <Link to="/historico-entregas" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors">
              <span className="material-symbols-outlined text-xl">history</span>
              <span>Histórico</span>
            </Link>
            <Link to="/carteira-motoboy" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors">
              <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
              <span>Carteira</span>
            </Link>
            <Link to="/perfil-motoboy" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-xl">person</span>
              <span className="font-semibold">Perfil</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-24 lg:pb-0">
        <div className="flex items-center px-4 pt-6 pb-2 justify-between bg-background-light dark:bg-background-dark z-10 sticky top-0 lg:hidden">
          <Link
            to="/pedidos-entrega"
            className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ArrowLeft className="text-slate-900 dark:text-white" size={24} />
          </Link>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center">Meu Perfil</h2>
          <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer">
            <Settings className="text-slate-900 dark:text-white" size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar pb-24 lg:pb-0">
          <section className="flex flex-col items-center justify-center pt-6 pb-6 lg:pt-8 lg:pb-8 px-4 lg:px-6">
            <div className="relative mb-4 group cursor-pointer">
              <div className="size-28 rounded-full bg-gray-200 dark:bg-surface-dark border-4 border-white dark:border-white/10 shadow-lg overflow-hidden flex items-center justify-center">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-bold text-gray-400">{displayName[0]}</span>
                )}
              </div>
              <div className="absolute bottom-0 right-0 bg-primary text-background-dark rounded-full p-2 border-4 border-background-light dark:border-background-dark shadow-sm">
                <Edit size={18} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">{displayName}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">phone_iphone</span>
              {displayPhone}
            </p>
          </section>

          <section className="px-4 lg:px-6 pb-6">
            <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Power size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">Status Online</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Recebendo entregas</span>
                </div>
              </div>
              <Switch
                checked={isOnline}
                onCheckedChange={handleStatusToggle}
              />
            </div>
          </section>

          <div className="px-4 lg:px-6 pb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col items-center justify-center gap-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">{stats.total}</span>
                <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Entregas Totais</span>
              </div>
              <div className="bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">{stats.rating}</span>
                  <Star className="text-yellow-400 fill-current" size={24} />
                </div>
                <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Avaliação</span>
              </div>
            </div>
          </div>

          <section className="px-4 lg:px-6 pb-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1 mb-4">Conta</h3>
            <div className="space-y-3">
              <button className="w-full bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-between group active:scale-[0.99] transition-transform">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-300 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Badge size={24} />
                  </div>
                  <span className="text-base font-semibold text-gray-900 dark:text-white">Meus Dados</span>
                </div>
                <span className="material-symbols-outlined text-gray-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
              </button>

              <Link to="/historico-entregas" className="block">
                <button className="w-full bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-between group active:scale-[0.99] transition-transform">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-300 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <History size={24} />
                    </div>
                    <span className="text-base font-semibold text-gray-900 dark:text-white">Histórico de Entregas</span>
                  </div>
                  <span className="material-symbols-outlined text-gray-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
              </Link>

              <Link to="/carteira-motoboy" className="block">
                <button className="w-full bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-between group active:scale-[0.99] transition-transform">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-300 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">account_balance_wallet</span>
                    </div>
                    <span className="text-base font-semibold text-gray-900 dark:text-white">Carteira</span>
                  </div>
                  <span className="material-symbols-outlined text-gray-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
              </Link>
            </div>
          </section>

          <div className="px-4 lg:px-6 pb-6">
            <button 
              onClick={handleLogout}
              className="w-full py-4 rounded-2xl border-2 border-red-500/20 text-red-500 dark:text-red-400 font-bold hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <LogOut size={20} />
              Sair da Conta
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 z-50 w-full max-w-md bg-surface-light dark:bg-surface-dark border-t border-slate-200 dark:border-slate-800 lg:hidden">
        <div className="flex items-center justify-around h-20 pb-4 px-2">
          <Link to="/pedidos-entrega" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-2xl">home</span>
            <span className="text-[10px] font-medium">Início</span>
          </Link>
          <Link to="/historico-entregas" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-2xl">history</span>
            <span className="text-[10px] font-medium">Histórico</span>
          </Link>
          <Link to="/carteira-motoboy" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
            <span className="text-[10px] font-medium">Carteira</span>
          </Link>
          <button className="flex flex-col items-center gap-1 p-2 w-16 text-primary">
            <span className="material-symbols-outlined text-2xl fill-1">person</span>
            <span className="text-[10px] font-bold">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerfilMotoboy;