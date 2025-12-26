"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { showSuccess, showError } from "@/utils/toast";
import { X, CheckCircle } from "lucide-react";

interface SolicitarSaqueModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
}

const SolicitarSaqueModal = ({ isOpen, onClose, availableBalance }: SolicitarSaqueModalProps) => {
  const [amount, setAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("pix");

  const accounts = [
    {
      id: "pix",
      type: "PIX",
      name: "Chave PIX (CPF)",
      details: "***.456.789-**",
      icon: "photos"
    },
    {
      id: "nubank",
      type: "Conta Bancária",
      name: "Nubank",
      details: "Ag 0001 • Cc 12345-6",
      icon: "account_balance"
    }
  ];

  const numericAmount = parseFloat(amount.replace(",", ".")) || 0;
  const fee = numericAmount * 0.0199;
  const total = numericAmount - fee;

  const handleConfirm = () => {
    if (numericAmount <= 0) {
      showError("Digite um valor válido para o saque.");
      return;
    }
    if (numericAmount > availableBalance) {
      showError("Saldo insuficiente para este saque.");
      return;
    }
    if (numericAmount < 20) {
      showError("O valor mínimo para saque é R$ 20,00.");
      return;
    }

    // Here you would typically make an API call to process the withdrawal
    showSuccess(`Saque de R$ ${total.toFixed(2)} solicitado com sucesso!`);
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
        <DialogHeader className="sticky top-0 z-10 flex flex-col items-center bg-background-light dark:bg-background-dark px-4 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-700 mb-4"></div>
          <div className="w-full flex justify-between items-center">
            <DialogTitle className="text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
              Solicitar Saque
            </DialogTitle>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Available Balance Card */}
          <div className="px-6 py-4">
            <div className="bg-white dark:bg-[#192633] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Saldo Disponível</span>
                <span className="material-symbols-outlined text-primary text-xl">account_balance_wallet</span>
              </div>
              <h1 className="text-slate-900 dark:text-white text-3xl font-extrabold tracking-tight">
                R$ {availableBalance.toFixed(2)}
              </h1>
              <div className="mt-3 flex items-center gap-1.5">
                <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Atualizado agora mesmo</span>
              </div>
            </div>
          </div>

          {/* Input Section */}
          <div className="px-6 space-y-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Valor a Sacar</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-medium text-lg">R$</span>
              <Input
                className="w-full bg-white dark:bg-[#192633] border border-slate-200 dark:border-slate-700 rounded-xl py-4 pl-12 pr-4 text-2xl font-bold text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="0,00"
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            {/* Fee Info */}
            <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
              <span className="material-symbols-outlined text-sm mt-0.5">info</span>
              <p>Será cobrada uma taxa de <span className="font-bold text-slate-700 dark:text-slate-300">1,99%</span> sobre o valor solicitado para cobrir custos operacionais.</p>
            </div>
          </div>

          {/* Bank Account Selection */}
          <div className="px-6 py-4 space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Conta de Destino</label>
            {accounts.map((account) => (
              <label key={account.id} className="group relative cursor-pointer block">
                <div className={`absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity ${selectedAccount === account.id ? 'opacity-100' : ''}`}></div>
                <div className={`relative flex items-center justify-between bg-white dark:bg-[#192633] border rounded-xl p-4 transition-all shadow-sm ${
                  selectedAccount === account.id 
                    ? 'border-primary dark:border-primary/50' 
                    : 'border-slate-200 dark:border-slate-700'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">{account.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{account.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{account.details}</p>
                    </div>
                  </div>
                  <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                    selectedAccount === account.id 
                      ? 'border-primary bg-primary' 
                      : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {selectedAccount === account.id && (
                      <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
                    )}
                  </div>
                </div>
                <input
                  type="radio"
                  name="account"
                  value={account.id}
                  checked={selectedAccount === account.id}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className="sr-only"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Footer / Action Buttons */}
        <div className="p-6 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-sm mb-2 px-1">
            <span className="text-slate-500 dark:text-slate-400">Total a receber:</span>
            <span className="font-bold text-slate-900 dark:text-white">R$ {total.toFixed(2)}</span>
          </div>
          <Button 
            onClick={handleConfirm}
            className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Confirmar Saque</span>
            <CheckCircle size={20} />
          </Button>
          <button 
            onClick={handleCancel}
            className="w-full bg-transparent text-slate-600 dark:text-slate-400 font-medium py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SolicitarSaqueModal;