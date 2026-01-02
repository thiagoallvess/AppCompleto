"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { usePromotions, Promotion } from "@/contexts/PromotionsContext";
import { showSuccess } from "@/utils/toast";
import { X, Save } from "lucide-react";

interface AddPromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  promotionToEdit?: Promotion | null;
}

const AddPromotionModal = ({ isOpen, onClose, promotionToEdit }: AddPromotionModalProps) => {
  const { addPromotion, updatePromotion } = usePromotions();
  
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [type, setType] = useState<'percentage' | 'fixed' | 'shipping'>('percentage');
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState("9999-12-31"); // Default to indefinite
  const [isActive, setIsActive] = useState(true);
  const [maxUses, setMaxUses] = useState("");
  const [minOrderValue, setMinOrderValue] = useState("");

  useEffect(() => {
    if (promotionToEdit) {
      setName(promotionToEdit.name);
      setCode(promotionToEdit.code);
      setType(promotionToEdit.type);
      setValue(promotionToEdit.value.toString());
      setDescription(promotionToEdit.description);
      setStartDate(promotionToEdit.startDate);
      setEndDate(promotionToEdit.endDate);
      setIsActive(promotionToEdit.isActive);
      setMaxUses(promotionToEdit.maxUses?.toString() || "");
      setMinOrderValue(promotionToEdit.minOrderValue?.toString() || "");
    } else {
      // Reset form for new promotion
      setName("");
      setCode("");
      setType('percentage');
      setValue("");
      setDescription("");
      setStartDate(new Date().toISOString().split('T')[0]);
      setEndDate("9999-12-31");
      setIsActive(true);
      setMaxUses("");
      setMinOrderValue("");
    }
  }, [promotionToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !code || !value) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const promotionData = {
      name,
      code: code.toUpperCase(),
      type,
      value: parseFloat(value),
      description,
      startDate,
      endDate,
      isActive,
      maxUses: maxUses ? parseInt(maxUses) : undefined,
      minOrderValue: minOrderValue ? parseFloat(minOrderValue) : undefined,
    };

    if (promotionToEdit) {
      updatePromotion(promotionToEdit.id, promotionData);
      showSuccess(`Promoção "${name}" atualizada!`);
    } else {
      addPromotion(promotionData);
      showSuccess(`Promoção "${name}" criada!`);
    }
    
    onClose();
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'percentage': return 'Percentual (%)';
      case 'fixed': return 'Valor Fixo (R$)';
      case 'shipping': return 'Frete Grátis';
      default: return type;
    }
  };

  const getTypePlaceholder = (type: string) => {
    switch (type) {
      case 'percentage': return 'Ex: 20';
      case 'fixed': return 'Ex: 10,00';
      case 'shipping': return 'Valor mínimo para frete grátis';
      default: return '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-background-light dark:bg-background-dark border-none p-0 overflow-hidden shadow-2xl rounded-t-3xl sm:rounded-3xl h-[92vh] sm:h-auto flex flex-col">
        <DialogHeader className="sticky top-0 z-10 flex flex-col items-center bg-background-light dark:bg-background-dark px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-700 mb-4 sm:hidden"></div>
          <div className="w-full flex justify-between items-center">
            <DialogTitle className="text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
              {promotionToEdit ? "Editar Promoção" : "Nova Promoção"}
            </DialogTitle>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar bg-background-light dark:bg-background-dark max-h-[calc(92vh-180px)] sm:max-h-[500px]">
          <form id="promotion-form" onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Promoção</Label>
                <Input
                  id="name"
                  placeholder="Ex: Verão 2024"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Código do Cupom</Label>
                <Input
                  id="code"
                  placeholder="Ex: VERAO2024"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  required
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Código que os clientes usarão no checkout
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva a promoção..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                />
              </div>
            </div>

            {/* Discount Configuration */}
            <div className="space-y-4 pt-2">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Configuração do Desconto</h4>
              
              <div className="space-y-2">
                <Label>Tipo de Desconto</Label>
                <Select value={type} onValueChange={(value: 'percentage' | 'fixed' | 'shipping') => setType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentual (%)</SelectItem>
                    <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                    <SelectItem value="shipping">Frete Grátis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">Valor {type === 'percentage' ? '(%)' : type === 'fixed' ? '(R$)' : '(R$ mínimo)'}</Label>
                <Input
                  id="value"
                  type="number"
                  step={type === 'percentage' ? '1' : '0.01'}
                  placeholder={getTypePlaceholder(type)}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-4 pt-2">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Período de Validade</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Data de Início</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Data de Fim</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Deixe vazio para indeterminado
                  </p>
                </div>
              </div>
            </div>

            {/* Usage Limits */}
            <div className="space-y-4 pt-2">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Limites de Uso</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxUses">Máximo de Usos</Label>
                  <Input
                    id="maxUses"
                    type="number"
                    placeholder="Ilimitado"
                    value={maxUses}
                    onChange={(e) => setMaxUses(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minOrderValue">Valor Mínimo (R$)</Label>
                  <Input
                    id="minOrderValue"
                    type="number"
                    step="0.01"
                    placeholder="Sem mínimo"
                    value={minOrderValue}
                    onChange={(e) => setMinOrderValue(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Status Toggle */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 mt-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  <span className="material-symbols-outlined">toggle_on</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-900 dark:text-white font-medium text-sm">Ativar Promoção</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs">Disponível para uso imediato</span>
                </div>
              </div>
              <Switch
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <footer className="bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-3">
          <Button 
            form="promotion-form"
            type="submit"
            className="w-full bg-primary hover:bg-blue-600 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            <Save size={18} className="mr-2" />
            {promotionToEdit ? "Salvar Alterações" : "Criar Promoção"}
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

export default AddPromotionModal;