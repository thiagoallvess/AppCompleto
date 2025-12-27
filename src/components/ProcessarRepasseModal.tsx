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
      <DialogContent className="max-w-md mx-auto bg-background-light dark:bg-background-dark border-none p-0 overflow-hidden shadow-2xl rounded-t-3xl sm:rounded-3xl h-[92vh] sm:h-auto flex flex-col">
        <DialogHeader className="sticky top-0 z-10 flex flex-col items-center bg-[#111a22] px-6 py-4 border-b border-[#324d67]">
          <div className="h-1.5 w-12 rounded-full bg-[#324d67] mb-4 sm:hidden"></div>
          <div className="w-full flex justify-between items-start">
            <div>
              <h1 className="text-[#92adc9] text-sm font-medium uppercase tracking-wider mb-1">Processar Repasse</h1>
              <DialogTitle className="text-white text-2xl font-bold leading-tight">{driver.name}</DialogTitle>
              <div className="flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-[#137fec] text-sm">verified</span>
                <span className="text-xs text-[#92adc9]">Motoboy Verificado</span>
              </div>
            </div>
            <button onClick={onClose} className="text-[#92adc9] hover:bg-[#324d67]/30 transition-colors rounded-full p-2">
              <X size={24} />
            </button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Balance Card */}
          <div className="px-6 py-4">
            <div className="bg-[#192633] rounded-lg p-5 border border-[#324d67] shadow-sm relative overflow-hidden group">
              <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-white">account_balance_wallet</span>
              </div>
              <p className="text-[#92adc9] text-sm font-medium mb-1">Saldo Disponível para Repasse</p>
              <p className="text-white text-3xl font-bold tracking-tight">R$ {driver.balance.toFixed(2)}</p>
            </div>
          </div>

          {/* Amount Input */}
          <div className="px-6 pb-4">
            <label className="block text-white text-base font-medium mb-2" htmlFor="amount">Valor a Repassar</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-[#92adc9] text-lg font-medium">R$</span>
              </div>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#111a22] border border-[#324d67] rounded-lg py-4 pl-12 pr-4 text-white text-xl font-semibold placeholder:text-[#324d67] focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] transition-all"
              />
            </div>
            <p className="text-xs text-[#92adc9] mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">info</span>
              Valor máximo permitido: R$ {driver.balance.toFixed(2)}
            </p>
          </div>

          {/* Bank Account */}
          <div className="px-6 pb-4">
            <p className="text-[#92adc9] text-sm font-medium mb-2">Conta de Destino</p>
            <div className="flex items-center justify-between bg-[#192633] border border-[#324d67] rounded-lg p-4 cursor-pointer hover:border-[#92adc9] transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#324d67] flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">account_balance</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{driver.bankAccount}</p>
                  <p className="text-[#92adc9] text-xs">Chave: ***.***.123-45</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#92adc9]">expand_more</span>
            </div>
          </div>

          {/* Calculation */}
          <div className="px-6 pb-6">
            <div className="bg-[#192633]/50 rounded-lg p-4 space-y-3 border border-[#324d67]/50">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#92adc9]">Valor Bruto</span>
                <span className="text-white font-medium">R$ {numericAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#92adc9] flex items-center gap-1">
                  Taxa Admin (1,99%)
                  <span className="material-symbols-outlined text-xs cursor-help" title="Taxa operacional">help</span>
                </span>
                <span className="text-red-400 font-medium">- R$ {fee.toFixed(2)}</span>
              </div>
              <div className="h-px bg-[#324d67] my-2"></div>
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">Valor Líquido a Receber</span>
                <span className="text-[#137fec] text-lg font-bold">R$ {netAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 pt-2 pb-8 bg-[#111a22]">
          <div className="flex flex-col gap-3">
            <Button 
              onClick={handleConfirm}
              className="w-full bg-[#137fec] hover:bg-[#137fec]/90 text-white font-bold py-4 px-6 rounded-lg shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">check_circle</span>
              Confirmar Repasse
            </Button>
            <button 
              onClick={handleCancel}
              className="w-full bg-transparent hover:bg-[#324d67]/20 text-[#92adc9] hover:text-white font-medium py-3 px-6 rounded-lg transition-colors border border-transparent hover:border-[#324d67]"
            >
              Cancelar
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessarRepasseModal;