import { ArrowLeft, Plus, Search, DollarSign, Calendar, Tag, Trash2, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useExpenses, Expense } from "@/contexts/ExpensesContext";
import { showSuccess } from "@/utils/toast";
import AddDespesaModal from "@/components/AddDespesaModal";

const GestaoDespesas = () => {
  const { expenses, removeExpense, updateExpense, getTotalExpenses } = useExpenses();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todas");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ["Todas", "Operacional", "Impostos", "Utilidades", "Pessoal", "Outros"];

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "Todas" || expense.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id: string, desc: string) => {
    if (confirm(`Excluir despesa "${desc}"?`)) {
      removeExpense(id);
      showSuccess("Despesa removida.");
    }
  };

  const toggleStatus = (expense: Expense) => {
    const newStatus = expense.status === 'Pago' ? 'Pendente' : 'Pago';
    updateExpense(expense.id, { status: newStatus });
    showSuccess(`Status alterado para ${newStatus}`);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/visao-geral" className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">Gestão de Despesas</h1>
          <Button 
            size="sm" 
            className="size-10 rounded-full p-0 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={24} />
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Resumo */}
        <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total de Despesas</p>
            <p className="text-3xl font-black text-red-500 mt-1">R$ {getTotalExpenses().toFixed(2)}</p>
          </div>
          <div className="size-12 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-500">
            <DollarSign size={28} />
          </div>
        </div>

        {/* Busca e Filtros */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <Input 
              placeholder="Buscar despesa..." 
              className="pl-10 h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === cat 
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900" 
                  : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Lista */}
        <div className="space-y-3">
          {filteredExpenses.map(expense => (
            <div key={expense.id} className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleStatus(expense)}
                  className={`size-10 rounded-full flex items-center justify-center transition-colors ${
                    expense.status === 'Pago' ? 'bg-green-100 text-green-600 dark:bg-green-900/20' : 'bg-amber-100 text-amber-600 dark:bg-amber-900/20'
                  }`}
                >
                  {expense.status === 'Pago' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                </button>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{expense.description}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Tag size={12} /> {expense.category}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(expense.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-red-500">R$ {expense.amount.toFixed(2)}</p>
                  <p className={`text-[10px] font-bold uppercase ${expense.status === 'Pago' ? 'text-green-500' : 'text-amber-500'}`}>
                    {expense.status}
                  </p>
                </div>
                <button 
                  onClick={() => handleDelete(expense.id, expense.description)}
                  className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {filteredExpenses.length === 0 && (
            <div className="text-center py-12 text-slate-500">Nenhuma despesa encontrada.</div>
          )}
        </div>
      </main>

      <AddDespesaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default GestaoDespesas;