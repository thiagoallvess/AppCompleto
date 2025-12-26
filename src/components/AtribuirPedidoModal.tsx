"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Driver } from "@/contexts/DriversContext";
import { useOrders } from "@/contexts/OrdersContext";
import { MapPin, Clock, Package2, Star, CheckCircle, X } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface AtribuirPedidoModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver | null;
}

const AtribuirPedidoModal = ({ isOpen, onClose, driver }: AtribuirPedidoModalProps) => {
  const { orders, updateOrder } = useOrders();
  const [selectedOrderIds, setSelectedOrderIds] = useState<Set<string>>(new Set());

  // Filter orders available for assignment (status Novo or Preparo and not assigned yet)
  const availableOrders = orders.filter(order => 
    (order.status === "Novo" || order.status === "Preparo") && !order.driverId
  );

  const toggleOrderSelection = (orderId: string) => {
    const newSelection = new Set(selectedOrderIds);
    if (newSelection.has(orderId)) {
      newSelection.delete(orderId);
    } else {
      newSelection.add(orderId);
    }
    setSelectedOrderIds(newSelection);
  };

  const handleConfirmAssignment = () => {
    if (!driver) return;

    selectedOrderIds.forEach(orderId => {
      updateOrder(orderId, {
        driverId: driver.id,
        driverName: driver.name,
        status: "Rota",
        statusColor: "blue",
        statusIcon: "sports_motorsports",
        isNew: false
      });
    });

    showSuccess(`${selectedOrderIds.size} pedido(s) atribuído(s) a ${driver.name}`);
    setSelectedOrderIds(new Set());
    onClose();
  };

  if (!driver) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-background-light dark:bg-background-dark border-none p-0 overflow-hidden shadow-2xl rounded-t-3xl sm:rounded-3xl">
        <DialogHeader className="sticky top-0 z-10 flex flex-col items-center bg-white dark:bg-surface-dark px-4 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-700 mb-4"></div>
          <div className="w-full flex justify-between items-center">
            <DialogTitle className="text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
              Atribuir Pedidos
            </DialogTitle>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto max-h-[70vh] no-scrollbar">
          {/* Driver Info Section */}
          <div className="p-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="relative">
                <div 
                  className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center" 
                  style={{ backgroundImage: `url('${driver.avatar}')` }}
                ></div>
                <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white dark:border-surface-dark rounded-full ${driver.status === 'offline' ? 'bg-slate-500' : 'bg-green-500'}`}></div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-0.5">Entregador Selecionado</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{driver.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="text-yellow-500 fill-current" size={14} />
                  <span className="text-sm text-slate-500 dark:text-slate-400">4.9 • {driver.deliveriesToday} Entregas Hoje</span>
                </div>
              </div>
            </div>
          </div>

          {/* List Header */}
          <div className="px-6 pb-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Pedidos Disponíveis</h4>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                {availableOrders.length} Pendentes
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Selecione um ou mais pedidos para vincular à rota de entrega.
            </p>
          </div>

          {/* Orders List */}
          <div className="px-4 pb-24 pt-2 flex flex-col gap-3">
            {availableOrders.length > 0 ? (
              availableOrders.map((order) => (
                <label 
                  key={order.id} 
                  className={`group relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedOrderIds.has(order.id)
                      ? "bg-slate-50 dark:bg-white/5 border-slate-400 dark:border-slate-500"
                      : "bg-white dark:bg-surface-dark border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="shrink-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                      <Package2 size={24} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-base font-bold text-slate-900 dark:text-white">{order.id}</p>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 uppercase">
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm mb-0.5">
                      <Clock size={14} />
                      <span>{order.time} • {order.customer}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm">
                      <MapPin size={14} />
                      <span className="truncate">Endereço de entrega simulado</span>
                    </div>
                  </div>
                  <div className="shrink-0 pl-2">
                    <Checkbox 
                      checked={selectedOrderIds.has(order.id)} 
                      onCheckedChange={() => toggleOrderSelection(order.id)}
                      className="w-6 h-6 rounded-md border-2 border-slate-300 dark:border-slate-600 data-[state=checked]:bg-slate-600 data-[state=checked]:border-slate-600"
                    />
                  </div>
                </label>
              ))
            ) : (
              <div className="text-center py-10 opacity-50">
                <p className="text-sm text-slate-500">Nenhum pedido disponível para atribuição.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Footer Actions */}
        <footer className="absolute bottom-0 left-0 w-full p-4 bg-white/90 dark:bg-background-dark/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-20">
          <div className="flex flex-col gap-3">
            <Button 
              onClick={handleConfirmAssignment}
              disabled={selectedOrderIds.size === 0}
              className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500 text-white font-bold h-12 rounded-xl transition-all shadow-lg shadow-black/20"
            >
              <CheckCircle size={20} />
              Confirmar Atribuição ({selectedOrderIds.size})
            </Button>
            <button 
              onClick={onClose}
              className="w-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium h-10 rounded-xl transition-colors"
            >
              Cancelar
            </button>
          </div>
        </footer>
      </DialogContent>
    </Dialog>
  );
};

export default AtribuirPedidoModal;