"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMarketplaces, Marketplace } from "@/contexts/MarketplacesContext";
import { showSuccess } from "@/utils/toast";
import { X, Save, Percent } from "lucide-react";

interface AddMarketplaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  marketplaceToEdit?: Marketplace | null;
}

const AddMarketplaceModal = ({ isOpen, onClose, marketplaceToEdit }: AddMarketplaceModalProps) => {
  const { addMarketplace, updateMarketplace } = useMarketplaces();
  
  const [name, setName] = useState("");
  const [commissionRate, setCommissionRate] = useState("");

  useEffect(() => {
    if (marketplaceToEdit) {
      setName(marketplaceToEdit.name);
      setCommissionRate(marketplaceToEdit.commissionRate.toString());
    } else {
      setName("");
      setCommissionRate("");
    }
  }, [marketplaceToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !commissionRate) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const marketplaceData = {
      name,
      commissionRate: parseFloat(commissionRate)
    };

    if (marketplaceToEdit) {
      updateMarketplace(marketplaceToEdit.id, marketplaceData);
      showSuccess(`Marketplace "${name}" atualizado!`);
    } else {
      addMarketplace(marketplaceData);
      showSuccess(`Marketplace "${name}" adicionado!`);
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-background-light dark:bg-background-dark border-slate-200 dark:border-slate-800 p-0 overflow-hidden">
        <DialogHeader className="sticky top-0 z-10 flex flex-col items-center bg-background-light dark:bg-background-dark px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-700 mb-4 sm:hidden"></div>
          <div className="w-full flex justify-between items-center">
            <DialogTitle className="text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
              {marketplaceToEdit ? "Editar Marketplace" : "Novo Marketplace"}
            </DialogTitle>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar bg-background-light dark:bg-background-dark max-h-[calc(92vh-180px)] sm:max-h-[500px]">
          <form id="marketplace-form" onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Marketplace</Label>
              <Input
                id="name"
                placeholder="Ex: Mercado Livre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Commission Rate Field */}
            <div className="space-y-2">
              <Label htmlFor="commissionRate">Taxa de Comissão (%)</Label>
              <div className="relative">
                <Input
                  id="commissionRate"
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(e.target.value)}
                  className="pr-12"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Percent className="text-slate-400" size={18} />
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Percentual cobrado pelo marketplace sobre cada venda
              </p>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <footer className="bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-3">
          <Button 
            form="marketplace-form"
            type="submit"
            className="w-full bg-primary hover:bg-blue-600 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            <Save size={18} className="mr-2" />
            {marketplaceToEdit ? "Salvar Alterações" : "Adicionar Marketplace"}
          </Button>
          <button 
            onClick={onClose}
            className="w-full bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium py-3 px-6 rounded-xl transition-colors"
          >
            Cancelar
          </button>
        </footer>
      </DialogContent>
    </Dialog>
  );
};

export default AddMarketplaceModal;