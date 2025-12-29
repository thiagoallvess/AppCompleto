"use client";

import { ArrowLeft, TrendingUp, Wallet, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import SolicitarSaqueModal from "@/components/SolicitarSaqueModal";
import ProcessarRepasseModal from "@/components/ProcessarRepasseModal";

const CarteiraMotoboy = () => {
  const [isSaqueModalOpen, setIsSaqueModalOpen] = useState(false);
  const [isRepasseModalOpen, setIsRepasseModalOpen] = useState(false);
  const availableBalance = 345.50;
  const totalEarnings = 2450.00;

  // Mock de transações incluindo saques e ganhos
  const transactions = [
    {
      id: "948392",
      description: "Saque Solicitado",
      type: "withdrawal",
      date: "20 Out, 14:30",
      amount: 200.00,
      status: "Pendente",
      icon: "hourglass_top",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-500"
    },
    {
      id: "TRX-102",
      description: "Entrega #1284",
      type: "income",
      date: "20 Out, 12:15",
      amount: 8.50,
      status: "Concluído",
      icon: "delivery_dining",
      iconBg: "bg-primary/10",
      iconColor: "text-primary"
    },
    {
      id: "948391",
      description: "Saque Processado",
      type: "withdrawal",
      date: "15 Out, 09:00",
      amount: 150.00,
      status: "Concluído",
      icon: "check_circle",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-500"
    }
  ];

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark border-x dark:border-[#2a2a2a] overflow-x-hidden shadow-2xl lg:max-w-7xl lg:flex-row lg:min-h-screen">
      {/* Desktop Sidebar (Omitida para brevidade, mantendo funcionalidade) */}
      
      <div className="flex-1 flex flex-col pb-24 lg:pb-0">
        {/* Top App Bar */}
        <header className="flex items-center px-4 pt-6 pb-2 justify-between bg-background-light dark:bg-background-dark z-10 sticky top-0">
          <Link to="/perfil-motoboy" className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <ArrowLeft className="text-slate-900 dark:text-white" size={24} />
          </Link>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Minha Carteira</h2>
        </header>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Hero Balance Card */}
          <div className="px-4 py-4">
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white dark:bg-surface-dark shadow-sm border border-slate-200 dark:border-slate-800 p-6">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Saldo Disponível</p>
              <h1 className="text-slate-900 dark:text-white text-4xl font-extrabold tracking-tight mb-4">R$ {availableBalance.toFixed(2)}</h1>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/50">
                <TrendingUp className="text-primary" size={18} />
                <p className="text-slate-600 dark:text-slate-300 text-sm font-semibold">Total de Ganhos: R$ {totalEarnings.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="px-4 pb-6">
            <button 
              onClick={() => setIsSaqueModalOpen(true)}
              className="w-full shadow-lg bg-primary hover:bg-blue-700 text-white rounded-2xl h-14 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
            >
              <Wallet size={24} />
              <span className="font-bold">Solicitar Saque</span>
            </button>
          </div>

          {/* Transactions List */}
          <div className="px-4 pb-2">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Transações Recentes</h3>
          </div>

          <div className="flex flex-col px-4 gap-3 pb-10">
            {transactions.map((trx) => (
              <Link 
                key={trx.id} 
                to={trx.type === 'withdrawal' ? `/detalhes-saque?id=${trx.id}` : '#'}
                className={`flex items-center gap-4 bg-white dark:bg-surface-dark rounded-xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.99] transition-transform ${trx.type === 'withdrawal' ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className={`flex items-center justify-center size-10 rounded-full ${trx.iconBg}`}>
                  <span className={`material-symbols-outlined ${trx.iconColor}`}>{trx.icon}</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-slate-900 dark:text-white text-base font-bold truncate">{trx.description}</p>
                    <p className={`font-bold ${trx.type === 'income' ? 'text-emerald-500' : 'text-slate-500'}`}>
                      {trx.type === 'income' ? '+' : '-'} R$ {trx.amount.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-0.5">
                    <p className="text-slate-500 dark:text-slate-400 text-xs">{trx.date}</p>
                    <div className="flex items-center gap-1">
                      <span className={`text-[10px] font-bold uppercase ${trx.iconColor}`}>{trx.status}</span>
                      {trx.type === 'withdrawal' && <ChevronRight size={14} className="text-slate-400" />}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <SolicitarSaqueModal isOpen={isSaqueModalOpen} onClose={() => setIsSaqueModalOpen(false)} availableBalance={availableBalance} />
      <ProcessarRepasseModal isOpen={isRepasseModalOpen} onClose={() => setIsRepasseModalOpen(false)} driver={driver} />
    </div>
  );
};

const driver = { name: "João Carlos", balance: 450.00, bankAccount: "Nubank (Pix)" };
export default CarteiraMotoboy;