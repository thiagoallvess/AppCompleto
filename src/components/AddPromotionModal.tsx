import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { usePromotions, Promotion } from "@/contexts/PromotionsContext";
import { showSuccess } from "@/utils/toast";
import { X, Save, Percent } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  promotionToEdit?: Promotion | null;
}

const Field = ({ label, optional, ...props }: any) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <div className="relative">
      <Input {...props} className={Icon ? "pr-12" : ""} />
      {Icon && (
        <Icon
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
      )}
    </div>
  </div>
);

export default function AddPromotionModal({
  isOpen,
  onClose,
  promotionToEdit,
}: Props) {
  const { addPromotion, updatePromotion } = usePromotions();

  const [form, setForm] = useState({
    name: "",
    code: "",
    type: "percentage",
    value: "",
    description: "",
    startDate: new Date().toISOString().split('T')[0],
    endDate: "9999-12-31",
    isActive: true,
    maxUses: "",
    minOrderValue: "",
  });

  const setField = (k: string, v: any) =>
    setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    if (!isOpen) return;

    promotionToEdit
      ? setForm({
          name: promotionToEdit.name,
          code: promotionToEdit.code,
          type: promotionToEdit.type,
          value: String(promotionToEdit.value),
          description: promotionToEdit.description,
          startDate: promotionToEdit.startDate,
          endDate: promotionToEdit.endDate,
          isActive: promotionToEdit.isActive,
          maxUses: promotionToEdit.maxUses?.toString() || "",
          minOrderValue: promotionToEdit.minOrderValue?.toString() || "",
        })
      : setForm({
          name: "",
          code: "",
          type: "percentage",
          value: "",
          description: "",
          startDate: new Date().toISOString().split('T')[0],
          endDate: "9999-12-31",
          isActive: true,
          maxUses: "",
          minOrderValue: "",
        });
  }, [promotionToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.code || !form.value) return;

    const promotionData = {
      name: form.name,
      code: form.code.toUpperCase(),
      type: form.type,
      value: parseFloat(form.value),
      description: form.description,
      startDate: form.startDate,
      endDate: form.endDate,
      isActive: form.isActive,
      maxUses: form.maxUses ? parseInt(form.maxUses) : undefined,
      minOrderValue: form.minOrderValue ? parseFloat(form.minOrderValue) : undefined,
    };

    if (promotionToEdit) {
      updatePromotion(promotionToEdit.id, promotionData);
      showSuccess(`Promoção "${form.name}" atualizada!`);
    } else {
      addPromotion(promotionData);
      showSuccess(`Promoção "${form.name}" criada!`);
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
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <DialogHeader className="px-4 py-3 border-b flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ArrowLeft size={22} />
          </Button>
          <DialogTitle className="text-xl font-bold">
            {promotionToEdit ? "Editar Promoção" : "Nova Promoção"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <form
            id="promotion-form"
            onSubmit={handleSubmit}
            className="p-6 space-y-5"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Promoção</Label>
                <Input
                  id="name"
                  placeholder="Ex: Verão 2024"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Código do Cupom</Label>
                <Input
                  id="code"
                  placeholder="Ex: VERAO2024"
                  value={form.code}
                  onChange={(e) => setField("code", e.target.value.toUpperCase())}
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
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  rows={2}
                />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Configuração do Desconto</h4>
              
              <div className="space-y-2">
                <Label>Tipo de Desconto</Label>
                <Select value={form.type} onValueChange={(value: 'percentage' | 'fixed' | 'shipping') => setField("type", value)}>
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
                <Label htmlFor="value">Valor {form.type === 'percentage' ? '(%)' : form.type === 'fixed' ? '(R$)' : '(R$ mínimo)'}</Label>
                <Input
                  id="value"
                  type="number"
                  step={form.type === 'percentage' ? '1' : '0.01'}
                  placeholder={getTypePlaceholder(form.type)}
                  value={form.value}
                  onChange={(e) => setField("value", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Período de Validade</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Data de Início</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setField("startDate", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Data de Fim</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setField("endDate", e.target.value)}
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Deixe vazio para indeterminado
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Limites de Uso</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxUses">Máximo de Usos</Label>
                  <Input
                    id="maxUses"
                    type="number"
                    placeholder="Ilimitado"
                    value={form.maxUses}
                    onChange={(e) => setField("maxUses", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minOrderValue">Valor Mínimo (R$)</Label>
                  <Input
                    id="minOrderValue"
                    type="number"
                    step="0.01"
                    placeholder="Sem mínimo"
                    value={form.minOrderValue}
                    onChange={(e) => setField("minOrderValue", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 mt-4">
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
                checked={form.isActive}
                onCheckedChange={(v) => setField("isActive", v)}
              />
            </div>
          </form>
        </div>

        <footer className="p-6 border-t flex flex-col gap-3">
          <Button form="marketplace-form" type="submit" className="w-full h-12">
            <Save size={18} className="mr-2" />
            {promotionToEdit ? "Salvar Alterações" : "Criar Promoção"}
          </Button>
          <button onClick={onClose} className="text-sm text-slate-500">
            Cancelar
          </button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}