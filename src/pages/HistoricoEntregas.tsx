"use client";

import { ArrowLeft, Filter, History, MapPin, Clock, DollarSign, Calendar, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useOrders } from "@/contexts/OrdersContext";
import { useDrivers } from "@/contexts/DriversContext";

const HistoricoEntregas = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Todos");
  const { orders } = useOrders();
  const { drivers } = useDrivers();

  // Simulação do motorista logado (João Carlos, ID '1' conforme DriversContext)
  const currentDriverId = "1";

  const periods = ["Todos", "Hoje", "Esta Semana", "Este Mês"];

  // Filtra as entregas reais do motorista atual que já foram finalizadas
  const filteredDeliveries = useMemo(() => {
    return orders.filter(order => {
      const isFromDriver = order.driverId === currentDriverId;
      const isFinished = order.section === 'finished';
      
      if (!isFromDriver || !isFinished) return false;

      if (selectedPeriod === "Todos") return true;
      
      const orderDate = order.date || "";
      const today = new Date().toLocaleDateString('pt-BR');
      
      if (selectedPeriod === "Hoje") return orderDate === today;
      
      // Para "Esta Semana" e "Este Mês", em um app real usaríamos date-fns, 
      // aqui mantemos a lógica simplificada baseada na string de data.
      return true;
    });
  }, [orders, selectedPeriod, currentDriverId]);

  const totalEarnings = filteredDeliveries.reduce((sum, delivery) => 
    delivery.cancelled ? sum : sum + (delivery.total * 0.1), 0 // Exemplo: 10% de comissão ou taxa fixa
  );
  
  const totalDeliveries = filteredDeliveries.filter(d => !d.cancelled).length;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            to="/perfil-motoboy"
            className="flex items-center justify-center size-10 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Histórico</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Minhas Entregas</h1>
          </div>
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
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Concluídas</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalDeliveries}</p>
          </div>
          <div className="flex flex-col gap-1 rounded-xl p-4 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="text-green-500" size={20} />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ganhos Est.</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">R$ {totalEarnings.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Deliveries List */}
      <div className="flex-1 px-4 pb-24 space-y-3">
        <div className="flex items-center justify-between py-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>Lista de registros</span>
        </div>

        {filteredDeliveries.map((delivery) => (
          <div key={delivery.id} className={`bg-white dark:bg-surface-dark rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm ${delivery.cancelled ? 'opacity-60' : ''}`}>
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center size-10 rounded-full ${
                  delivery.cancelled 
                    ? 'bg-red-100 dark:bg-red-900/20 text-red-600' 
                    : 'bg-green-100 dark:bg-green-900/20 text-green-600'
                }`}>
                  {delivery.cancelled ? <XCircle size={20} /> : <CheckCircle size={20} />}
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white font-bold text-base">{delivery.id}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">{delivery.date} • {delivery.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-slate-900 dark:text-white font-bold ${delivery.cancelled ? 'line-through' : ''}`}>
                  R$ {delivery.total.toFixed(2)}
                </p>
                <p className={`text-[10px] font-bold uppercase ${delivery.cancelled ? 'text-red-500' : 'text-green-500'}`}>
                  {delivery.status}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="text-slate-400 mt-0.5 shrink-0" size={16} />
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {delivery.customer} • Endereço no sistema
              </p>
            </div>
          </div>
        ))}

        {filteredDeliveries.length === 0 && (
          <div className="text-center py-12 opacity-50">
            <History size={48} className="mx-auto mb-3" />
            <p>Nenhuma entrega encontrada no histórico.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoricoEntregas;