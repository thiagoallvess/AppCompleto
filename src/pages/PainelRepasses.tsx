"use client";

import { ArrowLeft, Settings, Group, Wallet, History, Filter, Calendar, Info, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useDrivers } from "@/contexts/DriversContext";

const PainelRepasses = () => {
  const { drivers } = useDrivers();
  const [activeFilter, setActiveFilter] = useState("Todos");

  // Mock data for payouts
  const payouts = [
    {
      id: "1",
      driverName: "João Paulo",
      driverInitials: "JP",
      type: "Automático",
      date: "17 Out • 08:00 AM",
      grossAmount: 150.00,
      fee: 0.00,
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
      fee: 6.38,
      netAmount: 314.12,
      status: "Pendente",
      statusColor: "amber"
    },
    {
      id: "3",
      driverName: "Carlos Almeida",
      driverInitials: "CA",
      type: "Automático",
      date: "10 Out • 08:00 AM",
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
      type: "Manual",
      date: "11 Out • 14:00 PM",
      grossAmount: 210.00,
      fee: 4.18,
      netAmount: 205.82,
      status: "Falha",
      statusColor: "red"
    }
  ];

  const filteredPayouts = useMemo(() => {
    return payouts.filter(payout => {
      if (activeFilter === "Todos") return true;
      return payout.type === activeFilter;
    });
  }, [activeFilter]);

  const totalDrivers = drivers.length;
  const pendingPayouts = payouts.filter(p => p.status === "Pendente").reduce((sum, p) => sum + p.netAmount, 0);
  
  // Cálculo do próximo ciclo (Próxima Terça)
  const getNextTuesday = () => {
    const d = new Date();
    d.setDate(d.getDate() + (((7 - d.getDay()) % 7 + 2) % 7 || 7));
    return d.toLocaleDateString('pt-BR');
  };

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
      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-24 lg:pb-0">
        {/* Top App Bar */}
        <header className="flex items-center px-4 pt-6 pb-2 justify-between bg-background-light dark:bg-background-dark z-10 sticky top-0">
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
        </header>

        <div className="flex-1 overflow-y-auto no-scrollbar pb-24 lg:pb-0">
          {/* Next Cycle Alert Card */}
          <section className="px-4 pt-4">
            <div className="bg-indigo-600 dark:bg-indigo-900/40 rounded-2xl p-5 text-white shadow-lg shadow-indigo-500/20 relative overflow-hidden">
              <div className="absolute right-0 top-0 p-4 opacity-20">
                <Calendar size={64} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={16} className="text-indigo-200" />
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-100">Próximo Ciclo Automático</span>
                </div>
                <h3 className="text-2xl font-black mb-1">Terça-feira, {getNextTuesday()}</h3>
                <p className="text-indigo-100 text-sm opacity-90">Estimado: <span className="font-bold">R$ 1.420,00</span> • Taxa Zero</p>
              </div>
            </div>
          </section>

          {/* Summary Cards Grid */}
          <section className="px-4 py-6">
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              <div className="flex min-w-[140px] flex-1 flex-col gap-3 rounded-xl p-5 bg-white dark:bg-surface-dark border border-neutral-800/10 dark:border-neutral-800 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-slate-100 dark:bg-neutral-700/50 rounded-md">
                    <Group size={18} />
                  </div>
                  <p className="text-slate-500 dark:text-neutral-400 text-xs font-bold uppercase tracking-wider">Entregadores</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalDrivers}</p>
                </div>
              </div>
              <div className="flex min-w-[140px] flex-1 flex-col gap-3 rounded-xl p-5 bg-white dark:bg-surface-dark border border-neutral-800/10 dark:border-neutral-800 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-slate-100 dark:bg-neutral-700/50 rounded-md">
                    <Wallet size={18} />
                  </div>
                  <p className="text-slate-500 dark:text-neutral-400 text-xs font-bold uppercase tracking-wider">Pendentes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">R$ {pendingPayouts.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </section>

          {/* History Section */}
          <section className="px-4 pb-6">
            <div className="flex items-center justify-between px-1 pb-4">
              <h3 className="text-slate-900 dark:text-white text-lg font-bold">Histórico Consolidado</h3>
              <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                <Filter size={14} />
                Filtrar
              </div>
            </div>

            {/* Filters Scroll */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4">
              {["Todos", "Automático", "Manual"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition active:scale-95 ${
                    activeFilter === filter
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md"
                      : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className="text-xs font-medium whitespace-nowrap">{filter}</span>
                </button>
              ))}
            </div>

            {/* List */}
            <div className="flex flex-col gap-3">
              {filteredPayouts.map((payout) => (
                <div key={payout.id} className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-sm`}>
                        {payout.driverInitials}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{payout.driverName}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">{payout.date}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase ${
                            payout.type === 'Automático' 
                              ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                              : 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                          }`}>
                            {payout.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-slate-900 dark:text-white text-base">R$ {payout.netAmount.toFixed(2)}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium mt-1 ${getStatusColor(payout.status)}`}>
                        {payout.status}
                      </span>
                    </div>
                  </div>

                  {/* Details Expansion */}
                  <div className="pt-3 border-t border-dashed border-gray-200 dark:border-slate-800 grid grid-cols-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      Bruto: <span className="text-slate-700 dark:text-slate-300 font-medium">R$ {payout.grossAmount.toFixed(2)}</span>
                    </span>
                    <span className="text-right">
                      Taxa: <span className={payout.fee > 0 ? "text-red-500 font-medium" : "text-emerald-500 font-bold"}>
                        {payout.fee > 0 ? `- R$ ${payout.fee.toFixed(2)}` : "Sem Custo"}
                      </span>
                    </span>
                  </div>
                </div>
              ))}
              
              {filteredPayouts.length === 0 && (
                <div className="text-center py-12 opacity-50">
                  <History size={48} className="mx-auto mb-3 text-slate-300" />
                  <p className="text-slate-500 dark:text-slate-400">
                    Nenhum repasse encontrado para este filtro.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PainelRepasses;