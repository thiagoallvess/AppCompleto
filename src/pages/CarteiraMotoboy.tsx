"use client";

import { ArrowLeft, TrendingUp, Wallet, ChevronRight, History } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useOrders } from "@/contexts/OrdersContext";
import { useAuth } from "@/contexts/AuthContext";
import SolicitarSaqueModal from "@/components/SolicitarSaqueModal";
import ProcessarRepasseModal from "@/components/ProcessarRepasseModal";

const CarteiraMotoboy = () => {
  const { orders } = useOrders();
  const { profile } = useAuth();
  const [isSaqueModalOpen, setIsSaqueModalOpen] = useState(false);
  const [isRepasseModalOpen, setIsRepasseModalOpen] = useState(false);

  // Filtra entregas concluídas pelo motoboy logado
  const myFinishedDeliveries = useMemo(() => {
    return orders.filter(order => 
      order.driverId === profile?.id && 
      order.status === "Entregue" && 
      !order.cancelled
    );
  }, [orders, profile]);

  // Calcula ganhos reais (exemplo: R$ 5,00 por entrega)
  const availableBalance = useMemo(() => {
    return myFinishedDeliveries.length * 5.00;
  }, [myFinishedDeliveries]);

  const totalEarnings = availableBalance; // Em um app real, somaria histórico total

  // Transforma pedidos em formato de transação para a lista
  const transactions = useMemo(() => {
    return myFinishedDeliveries.map(order => ({
      id: order.id,
      description: `Entrega ${order.id}`,
      type: "income",
      date: order.date || "Hoje",
      amount: 5.00,
      status: "Concluído",
      icon: "delivery_dining",
      iconBg: "bg-primary/10",
      iconColor: "text-primary"
    })).sort((a, b) => b.id.localeCompare(a.id));
  }, [myFinishedDeliveries]);

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark border-x dark:border-[#2a2a2a] overflow-x-hidden shadow-2xl lg:max-w-7xl lg:flex-row lg:min-h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-24 lg:pb-0">
        {/* Top App Bar */}
        <header className="flex items-center px-4 pt-6 pb-2 justify-between bg-background-light dark:bg-background-dark z-10 sticky top-0">
          <Link to="/perfil-motoboy" className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-700 dark:text-white">
            <ArrowLeft size={24} />
          </Link>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Minha Carteira</h2>
        </header>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Hero Balance Card */}
          <div className="px-4 py-4">
            <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
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
              disabled={availableBalance < 20}
              className="w-full shadow-lg bg-primary hover:bg-blue-700 text-white rounded-2xl h-14 flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
            >
              <Wallet size={24} />
              <span className="font-bold">Solicitar Saque</span>
            </button>
            {availableBalance < 20 && (
              <p className="text-center text-[10px] text-slate-500 mt-2">Mínimo para saque: R$ 20,00</p>
            )}
          </div>

          {/* Transactions List */}
          <div className="px-4 pb-2">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Ganhos Recentes</h3>
          </div>

          <div className="flex flex-col px-4 gap-3 pb-10">
            {transactions.length > 0 ? (
              transactions.map((trx) => (
                <div 
                  key={trx.id} 
                  className="flex items-center gap-4 bg-white dark:bg-surface-dark rounded-xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm"
                >
                  <div className={`flex items-center justify-center size-10 rounded-full ${trx.iconBg}`}>
                    <span className={`material-symbols-outlined ${trx.iconColor}`}>{trx.icon}</span>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="text-slate-900 dark:text-white text-base font-bold truncate">{trx.description}</p>
                      <p className="font-bold text-emerald-500">
                        + R$ {trx.amount.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-0.5">
                      <p className="text-slate-500 dark:text-slate-400 text-xs">{trx.date}</p>
                      <span className={`text-[10px] font-bold uppercase ${trx.iconColor}`}>{trx.status}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 opacity-40">
                <History size={48} className="mx-auto mb-2" />
                <p className="text-sm font-medium">Nenhum ganho registrado ainda.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <SolicitarSaqueModal isOpen={isSaqueModalOpen} onClose={() => setIsSaqueModalOpen(false)} availableBalance={availableBalance} />
      <ProcessarRepasseModal isOpen={isRepasseModalOpen} onClose={() => setIsRepasseModalOpen(false)} driver={{ name: profile?.first_name || "Entregador", balance: availableBalance, bankAccount: "Conta Padrão" }} />
    </div>
  );
};

export default CarteiraMotoboy;