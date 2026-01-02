"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMarketplaces, Marketplace } from "@/contexts/MarketplacesContext";
import { showSuccess } from "@/utils/toast";
import { X, Save, Percent } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  marketplaceToEdit?: Marketplace | null;
}

const Field = ({ label, icon: Icon, ...props }: any) => (
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

export default function AddMarketplaceModal({
  isOpen,
  onClose,
  marketplaceToEdit,
}: Props) {
  const { addMarketplace, updateMarketplace } = useMarketplaces();

  const [form, setForm] = useState({ name: "", commissionRate: "" });
  const setField = (k: string, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    if (!isOpen) return;

    marketplaceToEdit
      ? setForm({
          name: marketplaceToEdit.name,
          commissionRate: String(marketplaceToEdit.commissionRate),
        })
      : setForm({ name: "", commissionRate: "" });
  }, [marketplaceToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.commissionRate) return;

    const data = {
      name: form.name,
      commissionRate: Number(form.commissionRate),
    };

    marketplaceToEdit
      ? updateMarketplace(marketplaceToEdit.id, data)
      : addMarketplace(data);

    showSuccess(
      `Marketplace "${form.name}" ${
        marketplaceToEdit ? "atualizado" : "adicionado"
      }!`
    );
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b flex justify-between items-center">
          <DialogTitle className="text-xl font-bold">
            {marketplaceToEdit ? "Editar Marketplace" : "Novo Marketplace"}
          </DialogTitle>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <form
            id="marketplace-form"
            onSubmit={handleSubmit}
            className="p-6 space-y-5"
          >
            <Field
              label="Nome do Marketplace"
              value={form.name}
              onChange={(e: any) => setField("name", e.target.value)}
              placeholder="Ex: Mercado Livre"
              required
            />

            <Field
              label="Taxa de Comissão (%)"
              type="number"
              step="0.1"
              icon={Percent}
              value={form.commissionRate}
              onChange={(e: any) => setField("commissionRate", e.target.value)}
              required
            />

            <p className="text-xs text-slate-500">
              Percentual cobrado por venda
            </p>
          </form>
        </div>

        <footer className="p-6 border-t flex flex-col gap-3">
          <Button form="marketplace-form" type="submit" className="w-full h-12">
            <Save size={18} className="mr-2" />
            {marketplaceToEdit ? "Salvar Alterações" : "Adicionar Marketplace"}
          </Button>
          <button onClick={onClose} className="text-sm text-slate-500">
            Cancelar
          </button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}
