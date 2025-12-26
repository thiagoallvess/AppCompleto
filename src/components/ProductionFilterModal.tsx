"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar, Filter, X, Check } from "lucide-react";

interface ProductionFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

const ProductionFilterModal = ({ isOpen, onClose, onApply }: ProductionFilterModalProps) => {
  const [status, setStatus] = useState("Todos");
  const [period, setPeriod] = useState("Sempre");

  const statuses = ["Todos", "Em Produção", "Finalizado", "Em Estoque"];
  const periods = ["Sempre", "Hoje", "Esta Semana", "Este Mês"];

  const handleApply = () => {
    onApply({ status, period });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-background-light dark:bg-background-dark border-slate-200 dark:border-slate-800 p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-bold">Filtrar Produção</DialogTitle>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-8">
          {/* Status Filter */}
          <div className="space-y-3">
            <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Status do Lote</Label>
            <div className="grid grid-cols-2 gap-2">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`py-2 px-4 rounded-xl text-sm font-bold border transition-all ${
                    status === s
                      ? "bg-primary border-primary text-white shadow-md"
                      : "bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Period Filter */}
          <div className="space-y-3">
            <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Período</Label>
            <div className="flex flex-wrap gap-2">
              {periods.map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`py-2 px-4 rounded-full text-xs font-bold border transition-all ${
                    period === p
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent"
                      : "bg-transparent border-slate-200 dark:border-slate-700 text-slate-500"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-white/5 border-t border-slate-100 dark:border-slate-800 flex gap-3">
          <Button variant="ghost" className="flex-1 font-bold text-slate-500" onClick={onClose}>
            Limpar
          </Button>
          <Button className="flex-2 bg-primary hover:bg-primary/90 text-white font-bold px-8 shadow-lg shadow-primary/20" onClick={handleApply}>
            <Filter size={18} className="mr-2" />
            Aplicar Filtros
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductionFilterModal;