"use client";

import { ArrowLeft, Settings, TrendingUp, AccountBalance, SportsMotorsports, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const CarteiraMotoboy = () => {
  const availableBalance = 345.50;
  const totalEarnings = 2450.00;

  const transactions = [
    {
      id: "123",
      type: "income",
      description: "Entrega Pedido #123",
      amount: 8.00,
      date: "Hoje, 14:30",
      restaurant: "Geladinho Gourmet",
      icon: "sports_motorsports",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-500"
    },
    {
      id: "120",
      type: "income",
      description: "Entrega Pedido #120",
      amount: 12.50,
      date: "Hoje, 11:15",
      restaurant: "Geladinho Gourmet",
      icon: "sports_motorsports",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-500"
    },
    {
      id: "withdrawal",
      type: "withdrawal",
      description: "Saque via PIX",
      amount: 100.00,
      date: "Ontem, 18:45",
      restaurant: "Processado",
      icon: "account_balance",
      iconBg: "bg-slate-200 dark:bg-slate-700",
      iconColor: "text-slate-600 dark:text-slate-300"
    },
    {
      id: "115",
      type: "income",
      description: "Entrega Pedido #115",
      amount: 15.00,
      date: "Ontem, 16:20",
      restaurant: "Geladinho Gourmet",
      icon: "sports_motorsports",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-500"
    },
    {
      id: "112",
      type: "income",
      description: "Entrega Pedido #112",
      amount: 9.50,
      date: "Ontem, 14:10",
      restaurant: "Geladinho Gourmet",
      icon: "sports_motorsports",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-500"
    }
  ];

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark">
      {/* Top App Bar */}
      <div className="flex items-center px-4 pt-6 pb-2 justify-between bg-background-light dark:bg-background-dark z-10 sticky top-0">
        <Link
          to="/perfil-motoboy"
          className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ArrowLeft className="text-slate-900 dark:text-white" size={24} />
        </Link>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center">Minha Carteira</h2>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer">
          <Settings className="text-slate-900 dark:text-white" size={24} />
        </button>
      </div>

      {/* Main Content Scroll Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {/* Hero Balance Card */}
        <div className="px-4 py-4">
          <div className="flex flex-col items-center justify-center rounded-2xl bg-surface-light dark:bg-surface-dark shadow-sm border border-slate-200 dark:border-slate-800 p-6 relative overflow-hidden">
            {/* Decorational background gradient */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-primary/10 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-slate-500/10 blur-2xl"></div>
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
        <div className="px-4 pb-6">
          <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 bg-primary hover:bg-blue-600 transition-colors text-white gap-2 shadow-lg shadow-blue-500/20 active:scale-[0.98] transform duration-100">
            <Wallet size={20} />
            <span className="text-base font-bold tracking-wide">Sacar Dinheiro</span>
          </button>
        </div>

        {/* Transactions Header */}
        <div className="flex items-center justify-between px-4 pb-2 pt-2">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Transações Recentes</h3>
          <button className="text-primary text-sm font-semibold hover:underline">Ver tudo</button>
        </div>

        {/* Transactions List */}
        <div className="flex flex-col px-4 gap-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className={`flex items-center gap-4 bg-surface-light dark:bg-surface-dark rounded-xl p-3 border border-slate-100 dark:border-slate-800 shadow-sm ${transaction.type === 'withdrawal' ? 'opacity-80' : ''}`}>
              <div className={`flex items-center justify-center rounded-full shrink-0 size-12 ${transaction.iconBg}`}>
                <span className={`material-symbols-outlined ${transaction.iconColor}`}>{transaction.icon}</span>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="text-slate-900 dark:text-white text-base font-bold truncate pr-2">{transaction.description}</p>
                  <p className={`font-bold whitespace-nowrap ${transaction.type === 'income' ? 'text-primary' : 'text-slate-500 dark:text-slate-400'}`}>
                    {transaction.type === 'income' ? '+' : '-'} R$ {transaction.amount.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-0.5">
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{transaction.date}</p>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 font-medium">{transaction.restaurant}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-6 w-full"></div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="absolute bottom-0 w-full bg-surface-light dark:bg-surface-dark border-t border-slate-200 dark:border-slate-800 flex justify-around items-center h-[80px] pb-4 px-2 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
        <Link to="/pedidos-entrega" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-2xl">home</span>
          <span className="text-[10px] font-medium">Início</span>
        </Link>
        <button className="flex flex-col items-center gap-1 p-2 w-16 text-primary">
          <span className="material-symbols-outlined text-2xl fill-1">account_balance_wallet</span>
          <span className="text-[10px] font-bold">Carteira</span>
        </button>
        <div className="relative -top-6">
          <button className="flex items-center justify-center size-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full shadow-lg hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-3xl">qr_code_scanner</span>
          </button>
        </div>
        <Link to="/historico-entregas" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-2xl">history</span>
          <span className="text-[10px] font-medium">Histórico</span>
        </Link>
        <Link to="/perfil-motoboy" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-2xl">person</span>
          <span className="text-[10px] font-medium">Perfil</span>
        </Link>
      </div>
    </div>
  );
};

export default CarteiraMotoboy;