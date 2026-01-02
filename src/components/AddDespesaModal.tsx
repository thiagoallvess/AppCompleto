"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useExpenses } from "@/contexts/ExpensesProvider";
import { showSuccess } from "@/utils/toast";
import { ArrowLeft, Save } from "lucide-react";

const CATEGORIES = ["Operacional", "Utilidades", "Impostos", "Pessoal", "Outros"];
const STATUS = ["Pendente", "Pago"];

interface AddDespesaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FormField = ({ label, ...props }: any) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <Input {...props} />
  </div>
);

const ToggleButton = ({ active, color, children, ...props }: any) => (
  <button
    type="button"
    className={`py-2 text-sm font-bold rounded-md transition-all ${
      active
        ? `bg-white dark:bg-surface-dark shadow-sm ${color}`
        : "text-slate-500"
    }`}
    {...props}
  >
    {children}
  </button>
);

export default function AddDespesaModal({ isOpen, onClose }: AddDespesaModalProps) {
  const { addExpense } = useExpenses();

  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "Operacional",
    date: new Date().toISOString().split("T")[0],
    status: "Pendente",
  });

  const update = (key: string, value: any) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description || !form.amount) return;

    addExpense({
      ...form,
      amount: parseFloat(form.amount),
      date: new Date(form.date).toISOString(),
    });

    showSuccess(`Despesa "${form.description}" adicionada!`);
    setForm((f) => ({ ...f, description: "", amount: "" }));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onClose} className="size-8 p-0">
              <ArrowLeft size={20} />
            </Button>
            <DialogTitle className="text-lg font-bold">
              Nova Despesa
            </DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <FormField
            label="Descrição"
            placeholder="Ex: Aluguel, Internet..."
            value={form.description}
            onChange={(e: any) => update("description", e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Valor (R$)"
              type="number"
              step="0.01"
              value={form.amount}
              onChange={(e: any) => update("amount", e.target.value)}
              required
            />
            <FormField
              label="Data"
              type="date"
              value={form.date}
              onChange={(e: any) => update("date", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select value={form.category} onValueChange={(v) => update("category", v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <ToggleButton
                active={form.status === "Pendente"}
                color="text-amber-600"
                onClick={() => update("status", "Pendente")}
              >
                Pendente
              </ToggleButton>
              <ToggleButton
                active={form.status === "Pago"}
                color="text-green-600"
                onClick={() => update("status", "Pago")}
              >
                Pago
              </ToggleButton>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 font-bold">
            <Save size={20} className="mr-2" />
            Salvar Despesa
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
