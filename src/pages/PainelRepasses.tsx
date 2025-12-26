"use client";

import { ArrowLeft, Settings, Group, Wallet, History, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDrivers } from "@/contexts/DriversContext";

const PainelRepasses = () => {
  const { drivers } = useDrivers();
  const [activeFilter, setActiveFilter] = useState("Todos");

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

  const filteredPayouts = payouts.filter(payout => {
    if (activeFilter === "Todos") return true;
    if (activeFilter === "Automático" && payout.type === "Automático") return true;
    if (activeFilter === "Manual" && payout.type === "Manual") return true;
    if (activeFilter === "Esta semana") return true; // Mock filter
    return false;
  });

  const totalDrivers = drivers.length;
  const activeDrivers = drivers.filter(d => d.status === 'online' || d.status === 'route').length;
  const inactiveDrivers = totalDrivers - activeDrivers;
  const pendingPayouts = payouts.filter(p => p.status === "Pendente").reduce((sum, p) => sum + p.netAmount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluído": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400";
      case "Pendente": return "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400";
      case "Falha": return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400";
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-surface-border">
        <div className="flex items-center justify-between p-4">
          <Link to="/visao-geral" className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-lg font-bold tracking-tight">Painel Admin</h1>
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <Settings size={24} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-6 p-4 max-w-md mx-auto w-full">
        {/* Title Section */}
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white leading-tight">Gestão Financeira</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Visão geral de motoboys e repasses</p>
        </div>

        {/* Summary Cards Grid */}
        <div className="grid grid-cols-1 gap-4">
          {/* Entregadores Card */}
          <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-surface-border p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <span className="material-symbols-outlined text-[20px]">two_wheeler</span>
                  <span className="text-sm font-semibold uppercase tracking-wider">Entregadores</span>
                </div>
                <div className="mt-1">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">{totalDrivers}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">total</span>
                </div>
                <div className="flex gap-3 text-sm font-medium mt-1">
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> {activeDrivers} Ativos
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-500"></span> {inactiveDrivers} Inativos
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                <Group size={24} />
              </div>
            </div>
            <Link to="/gestao-entregadores" className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-100 dark:bg-surface-border/50 text-slate-700 dark:text-white text-sm font-semibold hover:bg-slate-200 dark:hover:bg-surface-border transition-colors">
              Gestão de Entregadores
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          {/* Repasses Card */}
          <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-surface-border p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <span className="material-symbols-outlined text-[20px]">payments</span>
                  <span className="text-sm font-semibold uppercase tracking-wider">Repasses Pendentes</span>
                </div>
                <div className="mt-1">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">R$ {pendingPayouts.toFixed(2)}</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Acumulado de todos os motoboys</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                <Wallet size={24} />
              </div>
            </div>
            <Link to="/carteira-motoboy" className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20">
              Ver Repasses dos Motoboys
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* History Section */}
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Histórico de Repasses</h3>
            <button className="text-sm font-medium text-primary hover:underline">Ver filtros</button>
          </div>

          {/* Filters Scroll */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
            {["Todos", "Automático", "Manual", "Esta semana"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-none px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-slate-800 text-white dark:bg-white dark:text-black dark:border-transparent"
                    : "bg-white text-slate-600 border border-gray-200 dark:bg-surface-dark dark:border-surface-border dark:text-slate-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="flex flex-col gap-3">
            {filteredPayouts.map((payout) => (
              <div key={payout.id} className="flex flex-col gap-3 p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-surface-border shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${payout.statusColor === 'emerald' ? 'from-blue-500 to-indigo-600' : payout.statusColor === 'amber' ? 'from-orange-400 to-red-500' : payout.statusColor === 'red' ? 'from-gray-500 to-slate-600' : 'from-purple-500 to-indigo-500'} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                      {payout.driverInitials}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">{payout.driverName}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{payout.date}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-bold text-slate-900 dark:text-white text-base">R$ {payout.netAmount.toFixed(2)}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${getStatusColor(payout.status)}`}>
                      {payout.status}
                    </span>
                  </div>
                </div>

                {/* Details Expansion */}
                <div className="pt-3 border-t border-dashed border-gray-200 dark:border-surface-border grid grid-cols-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <span>Tipo: <span className="text-slate-700 dark:text-slate-300">{payout.type}</span></span>
                  <span className="text-right">Taxa: <span className="text-red-500">- R$ {payout.fee.toFixed(2)}</span></span>
                  <span>Bruto: <span className="text-slate-700 dark:text-slate-300">R$ {payout.grossAmount.toFixed(2)}</span></span>
                  <span className="text-right font-medium text-primary">Líquido: R$ {payout.netAmount.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-2 w-full py-3 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-medium text-center">
            Carregar mais transações...
          </button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-surface-border pb-safe">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          <Link to="/visao-geral" className="flex flex-col items-center justify-center gap-1 w-16 h-full text-slate-400 hover:text-primary dark:text-slate-500 dark:hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[24px]">home</span>
            <span className="text-[10px] font-medium">Início</span>
          </Link>
          <Link to="/gestao-pedidos" className="flex flex-col items-center justify-center gap-1 w-16 h-full text-slate-400 hover:text-primary dark:text-slate-500 dark:hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[24px]">receipt_long</span>
            <span className="text-[10px] font-medium">Pedidos</span>
          </Link>
          <button className="relative flex flex-col items-center justify-center gap-1 w-16 h-full text-primary transition-colors">
            <span className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-red-500"></span>
            <span className="material-symbols-outlined text-[24px] fill-current">attach_money</span>
            <span className="text-[10px] font-bold">Finanças</span>
          </button>
          <Link to="/configuracoes-admin" className="flex flex-col items-center justify-center gap-1 w-16 h-full text-slate-400 hover:text-primary dark:text-slate-500 dark:hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[24px]">person</span>
            <span className="text-[10px] font-medium">Perfil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default PainelRepasses;