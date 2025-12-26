"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, ArrowRight, X, Info } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface DREFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (period: string, startDate?: string, endDate?: string) => void;
}

const DREFilterModal = ({ isOpen, onClose, onApply }: DREFilterModalProps) => {
  const [selectedQuickFilter, setSelectedQuickFilter] = useState("Mensal");
  const [startDate, setStartDate] = useState("2023-10-01");
  const [endDate, setEndDate] = useState("2023-10-31");

  const quickFilters = ["Mensal", "Trimestral", "Anual"];

  const handleApply = () => {
    if (selectedQuickFilter === "Intervalo Personalizado") {
      onApply(selectedQuickFilter, startDate, endDate);
    } else {
      onApply(selectedQuickFilter);
    }
    showSuccess(`Filtro ${selectedQuickFilter} aplicado!`);
    onClose();
  };

  const handleClear = () => {
    setSelectedQuickFilter("Mensal");
    setStartDate("2023-10-01");
    setEndDate("2023-10-31");
    onApply("Mensal");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-background-light dark:bg-background-dark border-none p-0 overflow-hidden shadow-2xl rounded-t-3xl sm:rounded-3xl h-[92vh] sm:h-auto flex flex-col">
        <DialogHeader className="sticky top-0 z-10 flex flex-col items-center bg-background-light dark:bg-background-dark px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-700 mb-4 sm:hidden"></div>
          <div className="w-full flex justify-between items-center">
            <DialogTitle className="text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
              Filtrar Período
            </DialogTitle>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Quick Filters (Chips) */}
          <div className="px-6 py-4">
            <p className="text-gray-500 dark:text-text-secondary text-xs font-medium uppercase tracking-wider mb-3">Seleção Rápida</p>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {quickFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedQuickFilter(filter)}
                  className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-5 pr-5 transition-all active:scale-95 ${
                    selectedQuickFilter === filter
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "bg-gray-200 dark:bg-surface-dark border border-transparent dark:border-slate-800 text-gray-700 dark:text-white hover:border-gray-400 dark:hover:border-gray-500"
                  }`}
                >
                  <Calendar size={18} />
                  <p className="text-sm font-medium leading-normal">{filter}</p>
                </button>
              ))}
              <button
                onClick={() => setSelectedQuickFilter("Intervalo Personalizado")}
                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-5 pr-5 transition-all active:scale-95 ${
                  selectedQuickFilter === "Intervalo Personalizado"
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-gray-200 dark:bg-surface-dark border border-transparent dark:border-slate-800 text-gray-700 dark:text-white hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              >
                <p className="text-sm font-medium leading-normal">Personalizado</p>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 dark:bg-slate-800 mx-6"></div>

          {/* Custom Range Section */}
          <div className="px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 dark:text-white tracking-tight text-lg font-bold leading-tight">Intervalo Personalizado</h3>
              <Calendar size={20} className="text-gray-400 dark:text-text-secondary" />
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <label className="flex flex-col flex-1 group">
                  <p className="text-gray-600 dark:text-text-secondary text-sm font-medium leading-normal pb-2 transition-colors group-focus-within:text-primary">Data de Início</p>
                  <div className="relative">
                    <Input 
                      type="date" 
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        setSelectedQuickFilter("Intervalo Personalizado");
                      }}
                      className="h-14 rounded-xl bg-white dark:bg-surface-dark border-gray-300 dark:border-slate-800 text-base"
                    />
                  </div>
                </label>
                <div className="flex h-14 items-center justify-center pt-8">
                  <ArrowRight size={20} className="text-gray-400 dark:text-slate-700" />
                </div>
                <label className="flex flex-col flex-1 group">
                  <p className="text-gray-600 dark:text-text-secondary text-sm font-medium leading-normal pb-2 transition-colors group-focus-within:text-primary">Data de Fim</p>
                  <div className="relative">
                    <Input 
                      type="date" 
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        setSelectedQuickFilter("Intervalo Personalizado");
                      }}
                      className="h-14 rounded-xl bg-white dark:bg-surface-dark border-gray-300 dark:border-slate-800 text-base"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Info Note */}
          <div className="px-6 pb-4">
            <div className="flex gap-3 bg-blue-50 dark:bg-primary/10 p-3 rounded-lg items-start">
              <Info size={16} className="text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                O filtro atual é: <strong>{selectedQuickFilter}</strong>. Clique em "Aplicar Filtros" para atualizar a DRE.
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Footer Actions */}
        <div className="p-6 pt-4 bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-slate-800">
          <Button 
            onClick={handleApply}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary h-14 text-white font-bold text-lg shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all active:scale-[0.98]"
          >
            Aplicar Filtros
          </Button>
          <button 
            onClick={handleClear}
            className="flex w-full items-center justify-center gap-2 rounded-xl mt-3 h-10 text-gray-500 dark:text-text-secondary font-medium text-sm hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DREFilterModal;