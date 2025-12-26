import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: 'Operacional' | 'Impostos' | 'Utilidades' | 'Pessoal' | 'Outros';
  date: string;
  status: 'Pago' | 'Pendente';
}

interface ExpensesContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (id: string, updates: Partial<Expense>) => void;
  removeExpense: (id: string) => void;
  getTotalExpenses: () => number;
}

const ExpensesContext = createContext<ExpensesContextType | undefined>(undefined);

export const useExpenses = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpensesProvider');
  }
  return context;
};

interface ExpensesProviderProps {
  children: ReactNode;
}

export const ExpensesProvider: React.FC<ExpensesProviderProps> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [
      { id: '1', description: 'Contador', amount: 150, category: 'Pessoal', date: new Date().toISOString(), status: 'Pago' },
      { id: '2', description: 'Energia Elétrica', amount: 85.50, category: 'Utilidades', date: new Date().toISOString(), status: 'Pendente' },
      { id: '3', description: 'MEI / Impostos', amount: 72, category: 'Impostos', date: new Date().toISOString(), status: 'Pago' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: Date.now().toString() };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const removeExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const getTotalExpenses = () => expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense, updateExpense, removeExpense, getTotalExpenses }}>
      {children}
    </ExpensesContext.Provider>
  );
};