import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useExpenses } from "@/contexts/ExpensesProvider";
import { showSuccess } from "@/utils/toast";

const AddDespesa = () => {
  const navigate = useNavigate();
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

    showSuccess(`Despesa "${description}" salva com sucesso!`);
    navigate("/gestao-despesas");
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4">
        <div className="flex items-center gap-3 max-w-7xl mx-auto">
          <Link to="/gestao-despesas" className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">Nova Despesa</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 pt-8">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="space-y-2">
            <Label htmlFor="desc">Descrição da Despesa</Label>
            <Input 
              id="desc" 
              placeholder="Ex: Compra de Freezer, Conta de Luz..." 
              className="h-12"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Valor (R$)</Label>
              <Input 
                id="amount" 
                type="number" 
                step="0.01" 
                placeholder="0,00"
                className="h-12"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Data de Vencimento/Pagamento</Label>
              <Input 
                id="date" 
                type="date" 
                className="h-12"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-12">
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
              <Label>Status Inicial</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Pago">Pago</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 text-lg">
              <Save size={22} className="mr-2" />
              Salvar Despesa
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddDespesa;