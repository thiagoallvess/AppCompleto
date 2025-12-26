"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Driver } from "@/contexts/DriversContext";
import { useOrders } from "@/contexts/OrdersContext";
import { MapPin, Clock, Package2, User, X, AlertCircle } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface DesatribuirPedidoModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver | null;
}

const DesatribuirPedidoModal = ({ isOpen, onClose, driver }: DesatribuirPedidoModalProps) => {
  const { orders, updateOrder } = useOrders();
  const [selectedOrderIds, setSelectedOrderIds] = useState<Set<string>>(new Set());

  // Filter orders currently assigned to this driver
  const assignedOrders = driver 
    ? orders.filter(order => order.driverId === driver.id && order.status !== "Entregue")
    : [];

  const toggleOrderSelection = (orderId: string) => {
    const newSelection = new Set(selectedOrderIds);
    if (newSelection.has(orderId)) {
      newSelection.delete(orderId);
    } else {
      newSelection.add(orderId);
    }
    setSelectedOrderIds(newSelection);
  };

  const handleConfirmUnassignment = () => {
    if (!driver) return;

    selectedOrderIds.forEach(orderId => {
      updateOrder(orderId, {
        driverId: undefined,
        driverName: undefined,
        status: "Preparo", // Return to preparation state
        statusColor: "orange",
        statusIcon: "soup_kitchen",
        isNew: false
      });
    });

    showSuccess(`${selectedOrderIds.size} pedido(s) removido(s) de ${driver.name}`);
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
              Gerenciar Entregador
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
                  className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center flex items-center justify-center overflow-hidden" 
                  style={driver.avatar ? { backgroundImage: `url('${driver.avatar}')` } : {}}
                >
                    {!driver.avatar && <User className="text-slate-400" size={28} />}
                </div>
                <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white dark:border-surface-dark rounded-full ${driver.status === 'offline' ? 'bg-slate-500' : 'bg-green-500'}`}></div>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{driver.name}</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="material-symbols-outlined text-[16px] text-slate-400">delivery_dining</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{assignedOrders.length} Pedidos ativos</span>
                </div>
              </div>
            </div>
          </div>

          {/* List Header */}
          <div className="px-6 pb-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Pedidos Atribuídos</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Selecione os pedidos que deseja remover da rota deste entregador. Eles retornarão para a lista de pendentes.
            </p>
          </div>

          {/* Orders List */}
          <div className="px-4 pb-24 pt-2 flex flex-col gap-3">
            {assignedOrders.length > 0 ? (
              assignedOrders.map((order) => (
                <label 
                  key={order.id} 
                  className={`group relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedOrderIds.has(order.id)
                      ? "bg-slate-50 dark:bg-white/5 border-slate-400 dark:border-slate-500 shadow-md"
                      : "bg-white dark:bg-surface-dark border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
                  }`}
                >
                  <div className="pt-1">
                    <Checkbox 
                      checked={selectedOrderIds.has(order.id)} 
                      onCheckedChange={() => toggleOrderSelection(order.id)}
                      className="w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600 data-[state=checked]:bg-slate-600 data-[state=checked]:border-slate-600"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-base font-bold text-slate-900 dark:text-white">{order.id}</p>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 uppercase border border-slate-200 dark:border-slate-700">
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-start gap-1.5 text-slate-500 dark:text-slate-400 text-sm mb-2">
                      <MapPin className="shrink-0 mt-0.5" size={14} />
                      <span className="leading-snug text-sm">Rua das Flores, 123 - Centro <br/><span className="text-[11px] opacity-70">São Paulo, SP</span></span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">Atribuído às {order.time}</span>
                    </div>
                  </div>
                </label>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-slate-400 dark:text-slate-600 gap-2">
                <AlertCircle size={32} />
                <p className="text-sm font-medium">Nenhum pedido ativo no momento.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Footer Actions */}
        <footer className="absolute bottom-0 left-0 w-full p-4 bg-white/90 dark:bg-background-dark/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-20">
          <div className="flex flex-col gap-3">
            <Button 
              onClick={handleConfirmUnassignment}
              disabled={selectedOrderIds.size === 0}
              className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500 text-white font-bold h-14 rounded-xl transition-all shadow-lg shadow-black/20"
            >
              Confirmar Desatribuição ({selectedOrderIds.size})
            </Button>
            <button 
              onClick={onClose}
              className="w-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold h-10 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </footer>
      </DialogContent>
    </Dialog>
  );
};

export default DesatribuirPedidoModal;