"use client";

import { ArrowLeft, TrendingUp, SportsMotorsports, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import SolicitarSaqueModal from "@/components/SolicitarSaqueModal";
import ProcessarRepasseModal from "@/components/ProcessarRepasseModal";

const CarteiraMotoboy = () => {
  const [isSaqueModalOpen, setIsSaqueModalOpen] = useState(false);
  const [isRepasseModalOpen, setIsRepasseModalOpen] = useState(false);
  const availableBalance = 345.50;
  const totalEarnings = 2450.00;

  // Mock data for payouts (in a real app, this would come from a context)
  const payouts = [
    {
      id: "1",
      driverName: "João Paulo",
      driverInitials: "JP",
      type: "Automático",
      date: "14 Out • 10:42 AM",
      grossAmount: 155.00,
      fee: 5.00,
      netAmount: 150.00,
      status: "Concluído",
      statusColor: "emerald"
    },
    {
      id: "2",
      driverName: "Maria Silva",
      driverInitials: "MS",
      type: "Manual",
      date: "13 Out • 18:20 PM",
      grossAmount: 320.50,
      fee: 0.00,
      netAmount: 320.50,
      status: "Pendente",
      statusColor: "amber"
    },
    {
      id: "3",
      driverName: "Carlos Almeida",
      driverInitials: "CA",
      type: "Automático",
      date: "12 Out • 09:15 AM",
      grossAmount: 89.90,
      fee: 0.00,
      netAmount: 89.90,
      status: "Concluído",
      statusColor: "emerald"
    },
    {
      id: "4",
      driverName: "Roberto B.",
      driverInitials: "RB",
      type: "Automático",
      date: "11 Out • 14:00 PM",
      grossAmount: 210.00,
      fee: 0.00,
      netAmount: 210.00,
      status: "Falha",
      statusColor: "red"
    }
  ];

  // Mock driver data for admin processing
  const driver = {
    name: "João Carlos",
    balance: 450.00,
    bankAccount: "Nubank (Pix)"
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
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuALEIh8HjLL7FQ3X77XjOWAZ3UT1OyyZtxxP4UUAOZ59uyQA_EBUxzNVtIsogRITvQzwMh1etYm4BwvDAwXMmivqRAcZ2koimAHtS_K3nrY1dvw0662qwSSXi39yClK6GKPg_XGlqjzscnAAcnHCY_xVpRmoryZyQx7UWOmrNx_m53Nm0BqOJqs3mhVQgjOwi6pIpGDIR1N-ycjt3AHpAQtJtcCjc4PBHeIOaY1xV2zTF8b6AoGQXbPDe6MWDPeyz_4acsVXcy-qA")`
                }}
              ></div>
              <div className="absolute bottom-0 right-0 size-3 bg-primary rounded-full border-2 border-background-light dark:border-background-dark"></div>
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
                <Wallet size={20} />
                <span className="text-xs font-semibold uppercase tracking-wider">Saldo</span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">R$ {availableBalance.toFixed(2)}</p>
            </div>
            <div className="flex flex-col p-4 rounded-xl bg-gray-50 dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#2a2a2a]">
              <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                <TrendingUp size={20} />
                <span className="text-xs font-semibold uppercase tracking-wider">Total</span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">R$ {totalEarnings.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
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
            <Link to="/carteira-motoboy" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
              <span className="font-semibold">Carteira</span>
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
          <Link
            to="/perfil-motoboy"
            className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-700 dark:text-white"
          >
            <ArrowLeft size={24} />
          </Link>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Minha Carteira</h2>
          <div className="size-10"></div>
        </div>

        {/* Main Content Scroll Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-24 lg:pb-0">
          {/* Hero Balance Card */}
          <div className="px-4 py-4 lg:px-6 lg:py-6">
            <div className="flex flex-col items-center justify-center rounded-2xl bg-surface-light dark:bg-surface-dark shadow-sm border border-slate-200 dark:border-slate-800 p-6 relative overflow-hidden">
              {/* Decorational background gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-slate-500/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>
              <div className="relative z-10 flex flex-col items-center">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Saldo Disponível</p>
                <h1 className="text-slate-900 dark:text-white text-4xl font-extrabold tracking-tight mb-4">R$ {availableBalance.toFixed(2)}</h1>
                <div className="w-full h-px bg-slate-200 dark:bg-slate-700/50 mb-4"></div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/50">
                  <TrendingUp className="text-primary" size={18} />
                  <p className="text-slate-600 dark:text-slate-300 text-sm font-semibold">Total de Ganhos: <span className="text-slate-900 dark:text-white">R$ {totalEarnings.toFixed(2)}</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="px-4 pb-6 lg:px-6">
            <button 
              onClick={() => setIsSaqueModalOpen(true)}
              className="w-full shadow-2xl shadow-primary/40 bg-primary hover:bg-blue-700 text-white rounded-full h-14 pl-6 pr-8 flex items-center gap-3 transition-transform hover:scale-105 active:scale-95"
            >
              <div className="relative">
                <Wallet size={24} />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 ring-2 ring-primary">{payouts.filter(t => t.type === 'income').length}</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-bold leading-none">Solicitar Repasse</span>
                <span className="text-[10px] font-medium opacity-80 leading-tight">Repasses semanais gratuitos às terças-feiras • Taxa 1,99% fora do prazo</span>
              </div>
            </button>
          </div>

          {/* Admin Action Button (for demonstration) */}
          <div className="px-4 pb-6 lg:px-6">
            <button 
              onClick={() => setIsRepasseModalOpen(true)}
              className="w-full shadow-2xl shadow-red-500/40 bg-red-500 hover:bg-red-600 text-white rounded-full h-14 pl-6 pr-8 flex items-center gap-3 transition-transform hover:scale-105 active:scale-95"
            >
              <div className="relative">
                <span className="material-symbols-outlined text-2xl">account_balance</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-bold leading-none">Processar Repasse Manual (Admin)</span>
                <span className="text-[10px] font-medium opacity-80 leading-tight">Para administradores processarem saques</span>
              </div>
            </button>
          </div>

          {/* Transactions Header */}
          <div className="px-4 pb-2 pt-2 lg:px-6">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Transações Recentes</h3>
            <button className="text-sm font-medium text-primary hover:underline">Ver filtros</button>
          </div>

          {/* Transactions List */}
          <div className="flex flex-col px-4 gap-3 lg:px-6">
            {payouts.map((payout) => (
              <div key={payout.id} className={`flex items-center gap-4 bg-surface-light dark:bg-surface-dark rounded-xl p-3 border border-slate-100 dark:border-slate-800 shadow-sm ${payout.type === 'withdrawal' ? 'opacity-90' : ''}`}>
                <div className={`flex items-center justify-center size-10 rounded-full ${payout.iconBg}`}>
                  <span className={`material-symbols-outlined ${payout.iconColor}`}>{payout.icon}</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-slate-900 dark:text-white text-base font-bold truncate pr-2">{payout.description}</p>
                    <p className={`font-bold whitespace-nowrap ${payout.type === 'income' ? 'text-primary' : 'text-slate-500 dark:text-slate-400'}`}>
                      {payout.type === 'income' ? '+' : '-'} R$ {payout.amount.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-0.5">
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{payout.date}</p>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 font-medium">{payout.restaurant}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-6 w-full"></div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-surface-border pb-safe lg:hidden">
        <div className="flex items-center justify-around h-16 max-w-md mx-auto">
          <Link to="/pedidos-entrega" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary dark:text-slate-500 dark:hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[24px]">home</span>
            <span className="text-[10px] font-medium">Início</span>
          </Link>
          <Link to="/historico-entregas" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary dark:text-slate-500 dark:hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[24px]">history</span>
            <span className="text-[10px] font-medium">Histórico</span>
          </Link>
          <button className="relative flex flex-col items-center gap-1 p-2 w-16 text-primary transition-colors">
            <span className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-red-500"></span>
            <span className="material-symbols-outlined text-[24px] fill-current">account_balance_wallet</span>
            <span className="text-[10px] font-bold">Carteira</span>
          </button>
          <Link to="/perfil-motoboy" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary dark:text-slate-500 dark:hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[24px]">person</span>
            <span className="text-[10px] font-medium">Perfil</span>
          </Link>
        </div>
      </div>

      {/* Solicitar Saque Modal */}
      <SolicitarSaqueModal 
        isOpen={isSaqueModalOpen} 
        onClose={() => setIsSaqueModalOpen(false)} 
        availableBalance={availableBalance} 
      />

      {/* Processar Repasse Modal */}
      <ProcessarRepasseModal 
        isOpen={isRepasseModalOpen} 
        onClose={() => setIsRepasseModalOpen(false)} 
        driver={driver} 
      />
    </div>
  );
};

export default CarteiraMotoboy;