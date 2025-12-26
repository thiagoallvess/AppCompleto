"use client";

import { ArrowLeft, Filter, History, MapPin, Clock, DollarSign, Calendar, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const HistoricoEntregas = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Hoje");

  const periods = ["Hoje", "Esta Semana", "Este Mês"];

  // Mock data for completed deliveries
  const completedDeliveries = [
    {
      id: "PED-001",
      date: "Hoje, 14:30",
      address: "Rua das Flores, 123 - Centro, São Paulo",
      value: 14.50,
      status: "Entregue"
    },
    {
      id: "PED-002",
      date: "Hoje, 12:15",
      address: "Av. Paulista, 1500 - Bela Vista, São Paulo",
      value: 22.00,
      status: "Entregue"
    },
    {
      id: "PED-003",
      date: "Ontem, 18:45",
      address: "Rua Augusta, 500 - Consolação, São Paulo",
      value: 9.00,
      status: "Entregue"
    },
    {
      id: "PED-004",
      date: "Ontem, 16:20",
      address: "Av. Brigadeiro, 800 - Jardim Paulista, São Paulo",
      value: 18.50,
      status: "Entregue"
    },
    {
      id: "PED-005",
      date: "25/10, 19:30",
      address: "Rua Oscar Freire, 200 - Jardins, São Paulo",
      value: 12.00,
      status: "Entregue"
    }
  ];

  const filteredDeliveries = completedDeliveries.filter(delivery => {
    if (selectedPeriod === "Hoje") return delivery.date.includes("Hoje");
    if (selectedPeriod === "Esta Semana") return delivery.date.includes("Hoje") || delivery.date.includes("Ontem");
    if (selectedPeriod === "Este Mês") return true;
    return true;
  });

  const totalEarnings = filteredDeliveries.reduce((sum, delivery) => sum + delivery.value, 0);
  const totalDeliveries = filteredDeliveries.length;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            to="/pedidos-entrega"
            className="flex items-center justify-center size-10 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Histórico</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Entregas Concluídas</h1>
          </div>
        </div>
        <div className="flex items-center justify-end pr-4">
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
            <Filter size={24} />
          </button>
        </div>
      </header>

      {/* Period Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 pl-4 pr-4 pt-4">
        {periods.map(period => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition active:scale-95 ${
              selectedPeriod === period
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <span className="text-xs font-medium whitespace-nowrap">{period}</span>
          </button>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 rounded-xl p-4 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <History className="text-slate-500" size={20} />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Entregas</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalDeliveries}</p>
          </div>
          <div className="flex flex-col gap-1 rounded-xl p-4 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="text-green-500" size={20} />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Ganho</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">R$ {totalEarnings.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Deliveries List */}
      <div className="flex-1 px-4 pb-24 space-y-3">
        <div className="flex items-center justify-between py-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>Histórico de entregas</span>
        </div>

        {filteredDeliveries.map((delivery) => (
          <div key={delivery.id} className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-10 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white font-bold text-base">{delivery.id}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">{delivery.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-slate-900 dark:text-white font-bold">R$ {delivery.value.toFixed(2)}</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">{delivery.status}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="text-slate-400 mt-0.5 shrink-0" size={16} />
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {delivery.address}
              </p>
            </div>
          </div>
        ))}

        {filteredDeliveries.length === 0 && (
          <div className="text-center py-12 opacity-50">
            <History size={48} className="mx-auto mb-3" />
            <p>Nenhuma entrega encontrada neste período.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoricoEntregas;