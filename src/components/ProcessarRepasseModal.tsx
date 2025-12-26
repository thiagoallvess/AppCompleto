"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { showSuccess, showError } from "@/utils/toast";
import { X } from "lucide-react";

interface ProcessarRepasseModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: {
    name: string;
    balance: number;
    bankAccount: string;
  };
}

const ProcessarRepasseModal = ({ isOpen, onClose, driver }: ProcessarRepasseModalProps) => {
  const [amount, setAmount] = useState("100,00");

  const numericAmount = parseFloat(amount.replace(",", ".")) || 0;
  const fee = numericAmount * 0.0199;
  const netAmount = numericAmount - fee;

  const handleConfirm = () => {
    if (numericAmount <= 0) {
      showError("Digite um valor válido para o repasse.");
      return;
    }
    if (numericAmount > driver.balance) {
      showError("Saldo insuficiente para este repasse.");
      return;
    }

    // Here you would typically make an API call to process the transfer
    showSuccess(`Repasse de R$ ${netAmount.toFixed(2)} processado com sucesso!`);
    setAmount("");
    onClose();
  };

  const handleCancel = () => {
    setAmount("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-background-light dark:bg-background-dark border-slate-200 dark:border-slate-800 p-0 overflow-hidden shadow-2xl rounded-t-3xl sm:rounded-3xl h-[92vh] sm:h-auto flex flex-col">
        <DialogHeader className="sticky top-0 z-10 flex flex-col items-center bg-background-light dark:bg-background-dark px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-700 mb-4 sm:hidden"></div>
          <div className="w-full flex justify-between items-center">
            <DialogTitle className="text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
              Processar Repasse
            </DialogTitle>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Driver Info */}
          <div className="px-6 py-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight">{driver.name}</h2>
                <div className="flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-primary text-sm">verified</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Motoboy Verificado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Balance Card */}
          <div className="px-6 pb-4">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
              <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-slate-600 dark:text-slate-400">account_balance_wallet</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-1">Saldo Disponível para Repasse</p>
              <p className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">R$ {driver.balance.toFixed(2)}</p>
            </div>
          </div>

          {/* Amount Input */}
          <div className="px-6 pb-4">
            <label className="block text-slate-900 dark:text-white text-base font-medium mb-2" htmlFor="amount">Valor a Repassar</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-slate-500 dark:text-slate-400 text-lg font-medium">R$</span>
              </div>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-14 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary pl-12 text-xl font-semibold"
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">info</span>
              Valor máximo permitido: R$ {driver.balance.toFixed(2)}
            </p>
          </div>

          {/* Bank Account */}
          <div className="px-6 pb-4">
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">Conta de Destino</p>
            <div className="flex items-center justify-between bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400">
                  <span className="material-symbols-outlined">account_balance</span>
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white text-sm font-medium">{driver.bankAccount}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">Chave: ***.***.123-45</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-400 dark:text-slate-500">expand_more</span>
            </div>
          </div>

          {/* Calculation */}
          <div className="px-6 pb-6">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 space-y-3 border border-slate-200 dark:border-slate-700/50">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 dark:text-slate-400">Valor Bruto</span>
                <span className="text-slate-900 dark:text-white font-medium">R$ {numericAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  Taxa Admin (1,99%)
                  <span className="material-symbols-outlined text-xs cursor-help" title="Taxa operacional">help</span>
                </span>
                <span className="text-red-500 dark:text-red-400 font-medium">- R$ {fee.toFixed(2)}</span>
              </div>
              <div className="h-px bg-slate-200 dark:bg-slate-700 my-2"></div>
              <div className="flex justify-between items-center">
                <span className="text-slate-900 dark:text-white font-medium">Valor Líquido a Receber</span>
                <span className="text-primary text-lg font-bold">R$ {netAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-4 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800">
          <Button 
            onClick={handleConfirm}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Confirmar Repasse</span>
          </Button>
          <button 
            onClick={handleCancel}
            className="w-full bg-transparent text-slate-600 dark:text-slate-400 font-medium py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mt-3"
          >
            Cancelar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessarRepasseModal;