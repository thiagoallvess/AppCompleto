"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Driver } from "@/contexts/DriversContext";
import { useOrders } from "@/contexts/OrdersContext";
import { MapPin, Clock, Package2, Star, X, CheckCircle, Ban, History } from "lucide-react";

interface HistoricoEntregasModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver | null;
}

const HistoricoEntregasModal = ({ isOpen, onClose, driver }: HistoricoEntregasModalProps) => {
  const { orders } = useOrders();
  const [activeFilter, setActiveFilter] = useState("Todos");

  // Filter finished orders for this driver
  const allDriverDeliveries = orders.filter(order => 
    order.driverId === driver?.id && order.section === 'finished'
  );

  const filters = ["Todos", "Hoje", "7 dias", "Este Mês"];

  const filteredDeliveries = allDriverDeliveries.filter(order => {
    if (activeFilter === "Todos") return true;
    // In a real app, logic for date filtering would go here
    return true; 
  });

  const totalDeliveries = allDriverDeliveries.length;
  const avgRating = "4.9"; // Simulated average

  if (!driver) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-background-light dark:bg-background-dark border-none p-0 overflow-hidden shadow-2xl rounded-t-3xl sm:rounded-3xl h-[92vh] sm:h-auto flex flex-col">
        <DialogHeader className="sticky top-0 z-10 flex flex-col items-center bg-white dark:bg-surface-dark px-4 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-700 mb-4"></div>
          <div className="w-full flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-0.5">Histórico do Entregador</span>
              <DialogTitle className="text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white text-left">
                {driver.name}
              </DialogTitle>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
          {/* Stats Bar */}
          <div className="p-6">
            <div className="flex gap-3">
              <div className="flex-1 flex flex-col gap-1 rounded-2xl p-4 bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Package2 className="text-slate-500" size={16} />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Entregas</span>
                </div>
                <p className="text-2xl font-bold">{totalDeliveries || driver.deliveriesToday}</p>
              </div>
              <div className="flex-1 flex flex-col gap-1 rounded-2xl p-4 bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="text-yellow-500 fill-current" size={16} />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Avaliação</span>
                </div>
                <p className="text-2xl font-bold">{avgRating}</p>
              </div>
            </div>
          </div>

          {/* Sticky Filters */}
          <div className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-6 pb-4 pt-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`flex h-8 shrink-0 items-center justify-center px-4 rounded-full text-xs font-bold transition-all ${
                    activeFilter === filter
                      ? "bg-slate-700 dark:bg-white text-white dark:text-slate-900 shadow-md"
                      : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Delivery List */}
          <div className="flex flex-col gap-3 px-6 py-6">
            <h3 className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Concluídas Recentemente</h3>
            
            {filteredDeliveries.length > 0 ? (
              filteredDeliveries.map((order) => (
                <div key={order.id} className="flex flex-col gap-3 p-4 rounded-2xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center size-9 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400">
                        <Package2 size={20} />
                      </div>
                      <div>
                        <p className="text-slate-900 dark:text-white font-bold text-sm">{order.id}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-[10px] font-medium">{order.date || 'Hoje'}, {order.time}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${
                      order.cancelled 
                        ? 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30 text-red-500' 
                        : 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30 text-emerald-500'
                    }`}>
                      <div className={`size-1.5 rounded-full ${order.cancelled ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                      {order.status}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <MapPin className="text-slate-300 dark:text-slate-600 mt-0.5 shrink-0" size={16} />
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-snug">
                      Endereço cadastrado no sistema <br/>
                      <span className="text-[10px] opacity-70">São Paulo, SP</span>
                    </p>
                  </div>

                  {!order.cancelled && (
                    <>
                      <div className="h-px bg-slate-100 dark:bg-slate-800 w-full"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Avaliação do cliente</span>
                        <div className="flex items-center gap-1">
                          <Star className="text-yellow-500 fill-current" size={14} />
                          <span className="text-slate-900 dark:text-white text-xs font-bold">5.0</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400 dark:text-slate-600 gap-3">
                <div className="size-16 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center">
                  <History size={32} />
                </div>
                <p className="text-sm font-medium">Nenhum histórico disponível</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HistoricoEntregasModal;