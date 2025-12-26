"use client";

import { ArrowLeft, Settings, Edit, Badge, History, LogOut, Power, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { showSuccess } from "@/utils/toast";

const PerfilMotoboy = () => {
  const [isOnline, setIsOnline] = useState(true);

  const handleStatusToggle = (checked: boolean) => {
    setIsOnline(checked);
    showSuccess(checked ? "Você está online e recebendo entregas!" : "Você está offline");
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col mx-auto max-w-md bg-background-light dark:bg-background-dark shadow-xl overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-5 bg-background-light dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-white/5">
        <Link
          to="/pedidos-entrega"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white dark:bg-surface-dark text-gray-900 dark:text-white shadow-sm hover:bg-gray-100 dark:hover:bg-primary/20 transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">Meu Perfil</h1>
        <button className="flex size-10 items-center justify-center rounded-full bg-white dark:bg-surface-dark text-gray-900 dark:text-white shadow-sm hover:bg-gray-100 dark:hover:bg-primary/20 transition-colors">
          <Settings size={24} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto pb-8">
        {/* Profile Section */}
        <section className="flex flex-col items-center justify-center pt-2 pb-4">
          <div className="relative mb-4 group cursor-pointer">
            <div className="size-28 rounded-full bg-gray-200 dark:bg-surface-dark border-4 border-white dark:border-white/10 shadow-lg overflow-hidden flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-gray-400 dark:text-gray-500">person</span>
            </div>
            <div className="absolute bottom-0 right-0 bg-primary text-background-dark rounded-full p-2 border-4 border-background-light dark:border-background-dark shadow-sm">
              <Edit size={18} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">João Carlos</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">phone_iphone</span>
            (11) 98765-4321
          </p>
        </section>

        {/* Online Status */}
        <section className="bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-between">
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
        </section>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col items-center justify-center gap-2">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">142</span>
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Entregas Totais</span>
            <div className="w-full h-1 bg-gray-100 dark:bg-white/5 rounded-full mt-1 overflow-hidden">
              <div className="bg-primary h-full w-3/4 rounded-full"></div>
            </div>
          </div>
          <div className="bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">4.9</span>
              <Star className="text-yellow-400 fill-current" size={24} />
            </div>
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">Avaliação</span>
          </div>
        </div>

        {/* Account Options */}
        <section className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Conta</h3>
          
          <button className="w-full bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-between group active:scale-[0.99] transition-transform">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-300 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <Badge size={24} />
              </div>
              <span className="text-base font-semibold text-gray-900 dark:text-white">Meus Dados</span>
            </div>
            <span className="material-symbols-outlined text-gray-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
          </button>

          <button className="w-full bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-between group active:scale-[0.99] transition-transform">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-300 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">two_wheeler</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-base font-semibold text-gray-900 dark:text-white">Veículo</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Honda CG 160 • ABC-1234</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
          </button>

          <Link to="/historico-entregas">
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

          <Link to="/carteira-motoboy">
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
        </section>

        {/* Logout Button */}
        <button className="mt-4 w-full py-4 rounded-2xl border-2 border-red-500/20 text-red-500 dark:text-red-400 font-bold hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2 active:scale-[0.99]">
          <LogOut size={20} />
          Sair da Conta
        </button>

        {/* Version Info */}
        <p className="text-center text-xs text-gray-400 mt-2">Versão 1.0.4</p>
      </main>
    </div>
  );
};

export default PerfilMotoboy;