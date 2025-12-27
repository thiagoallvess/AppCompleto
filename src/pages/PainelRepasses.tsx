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
                <Group size={20} />
                <span className="text-xs font-semibold uppercase tracking-wider">Entregadores</span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{totalDrivers}</p>
            </div>
            <div className="flex flex-col p-4 rounded-xl bg-gray-50 dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#2a2a2a]">
              <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                <Wallet size={20} />
                <span className="text-xs font-semibold uppercase tracking-wider">Pendentes</span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">R$ {pendingPayouts.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-6 pb-4">
          <nav className="space-y-2">
            <Link to="/visao-geral" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors">
              <span className="material-symbols-outlined text-xl">dashboard</span>
              <span>Visão Geral</span>
            </Link>
            <Link to="/monitoramento" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors">
              <span className="material-symbols-outlined text-xl">map</span>
              <span>Monitoramento</span>
            </Link>
            <Link to="/gestao-pedidos" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors">
              <span className="material-symbols-outlined text-xl">receipt_long</span>
              <span>Pedidos</span>
            </Link>
            <Link to="/painel-repasses" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-xl">attach_money</span>
              <span className="font-semibold">Repasses</span>
            </Link>
            <Link to="/configuracoes-admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors">
              <span className="material-symbols-outlined text-xl">settings</span>
              <span>Configurações</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-24 lg:pb-0">
        {/* Top App Bar - Mobile */}
        <div className="flex items-center px-4 pt-6 pb-2 justify-between bg-background-light dark:bg-background-dark z-10 sticky top-0 lg:hidden">
          <Link
            to="/visao-geral"
            className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-700 dark:text-white"
          >
            <ArrowLeft size={24} />
          </Link>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Painel de Repasses</h2>
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <Settings size={24} className="text-slate-700 dark:text-white" />
          </button>
        </div>

        {/* Main Content Scroll Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-24 lg:pb-0">
          {/* Title Section */}
          <section className="flex flex-col gap-3 p-4 lg:px-6 lg:pt-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white leading-tight">Gestão Financeira</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Visão geral de motoboys e repasses</p>
            </div>
          </section>

          {/* Summary Cards Grid */}
          <section className="px-4 lg:px-6 pb-6">
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
                  <div className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary">
                    <Group size={24} />
                  </div>
                </div>
                <Link to="/gestao-entregadores" className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold hover:opacity-90 transition-all active:scale-[0.98]">
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
                  <div className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary">
                    <Wallet size={24} />
                  </div>
                </div>
                <Link to="/carteira-motoboy" className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20">
                  Ver Repasses dos Motoboys
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </section>

          {/* History Section */}
          <section className="px-4 lg:px-6 pb-6">
            <div className="flex items-center justify-between px-1 pb-3">
              <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Histórico de Repasses</h3>
              <button className="text-sm font-medium text-primary hover:underline">Ver filtros</button>
            </div>

            {/* Filters Scroll */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {["Todos", "Automático", "Manual", "Esta semana"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`flex h-9 shrink-0 items-center justify-center px-4 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                      : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-surface-border text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-surface-border"
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

            <button className="mt-4 w-full py-3 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-medium text-center">
              Carregar mais transações...
            </button>
          </section>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 w-full bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-surface-border pb-safe lg:hidden">
        <div className="flex items-center justify-around h-16 max-w-md mx-auto">
          <Link to="/visao-geral" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary dark:text-slate-500 dark:hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[24px]">home</span>
            <span className="text-[10px] font-medium">Início</span>
          </Link>
          <Link to="/gestao-pedidos" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary dark:text-slate-500 dark:hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[24px]">receipt_long</span>
            <span className="text-[10px] font-medium">Pedidos</span>
          </Link>
          <button className="relative flex flex-col items-center gap-1 p-2 w-16 text-primary transition-colors">
            <span className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-red-500"></span>
            <span className="material-symbols-outlined text-[24px] fill-current">attach_money</span>
            <span className="text-[10px] font-bold">Finanças</span>
          </button>
          <Link to="/configuracoes-admin" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary dark:text-slate-500 dark:hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[24px]">person</span>
            <span className="text-[10px] font-medium">Perfil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default PainelRepasses;