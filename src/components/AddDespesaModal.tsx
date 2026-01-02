"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useExpenses } from "@/contexts/ExpensesProvider";
import { showSuccess } from "@/utils/toast";
import { ArrowLeft, Save } from "lucide-react";

interface AddDespesaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddDespesaModal = ({ isOpen, onClose }: AddDespesaModalProps) => {
  const { addExpense } = useExpenses();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<any>("Operacional");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<any>("Pendente");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    addExpense({
      description,
      amount: parseFloat(amount),
      category,
      date: new Date(date).toISOString(),
      status
    });

    showSuccess(`Despesa "${description}" adicionada!`);
    // Reset
    setDescription("");
    setAmount("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-background-light dark:bg-background-dark border-slate-200 dark:border-slate-800 p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onClose} className="size-8 p-0 rounded-full">
              <ArrowLeft size={20} />
            </Button>
            <DialogTitle className="text-lg font-bold">Nova Despesa</DialogTitle>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="desc">Descrição</Label>
            <Input id="desc" placeholder="Ex: Aluguel, Internet..." value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Valor (R$)</Label>
              <Input id="amount" type="number" step="0.01" placeholder="0,00" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Operacional">Operacional</SelectItem>
                <SelectItem value="Utilidades">Utilidades</SelectItem>
                <SelectItem value="Impostos">Impostos</SelectItem>
                <SelectItem value="Pessoal">Pessoal</SelectItem>
                <SelectItem value="Outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Status de Pagamento</Label>
            <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <button type="button" onClick={() => setStatus("Pendente")} className={`py-2 text-sm font-bold rounded-md transition-all ${status === 'Pendente' ? 'bg-white dark:bg-surface-dark shadow-sm text-amber-600' : 'text-slate-500'}`} > Pendente </button>
              <button type="button" onClick={() => setStatus("Pago")} className={`py-2 text-sm font-bold rounded-md transition-all ${status === 'Pago' ? 'bg-white dark:bg-surface-dark shadow-sm text-green-600' : 'text-slate-500'}`} > Pago </button>
            </div>
          </div>
          <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20">
            <Save size={20} className="mr-2" />
            Salvar Despesa
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDespesaModal;