"use client";

import { ArrowLeft, Plus, Search, MoreVertical, Package, TrendingUp, DollarSign, Calendar, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { showSuccess } from "@/utils/toast";

const GestaoProducao = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [productionLots, setProductionLots] = useState<any[]>([]);

  // Carregar dados reais do localStorage
  useEffect(() => {
    const loadLots = () => {
      const storedLots = localStorage.getItem('productionLots');
      if (storedLots) {
        setProductionLots(JSON.parse(storedLots));
      }
    };
    loadLots();
  }, []);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Deseja realmente excluir o lote de "${name}"?`)) {
      const updatedLots = productionLots.filter(lot => lot.id !== id);
      setProductionLots(updatedLots);
      localStorage.setItem('productionLots', JSON.stringify(updatedLots));
      showSuccess(`Lote #${id} excluído com sucesso.`);
    }
  };

  const filteredLots = productionLots.filter(lot => {
    const matchesSearch = lot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lot.id.toString().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "Todos" ||
                         (activeFilter === "Em Produção" && lot.status === "Em Produção") ||
                         (activeFilter === "Finalizado" && lot.status === "Finalizado") ||
                         (activeFilter === "Em Estoque" && lot.status === "Em Estoque");
    return matchesSearch && matchesFilter;
  });

  const filters = ["Todos", "Em Produção", "Finalizado", "Em Estoque"];

  const totalLots = productionLots.length;
  const totalProduced = productionLots.reduce((sum, lot) => sum + (lot.produced || lot.quantity || 0), 0);
  const totalCost = productionLots.reduce((sum, lot) => sum + (lot.totalCost || 0), 0);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "finalizado": return "bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400";
      case "em estoque": return "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "em produção": return "bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400";
      default: return "bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            to="/visao-geral"
            className="flex items-center justify-center size-10 rounded-full text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Produção</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Gestão de Produção</h1>
          </div>
        </div>
        <div className="flex items-center justify-end pr-4">
          <Link
            to="/add-producao"
            className="flex items-center justify-center size-10 rounded-full text-primary hover:bg-primary/10 transition-colors"
          >
            <Plus size={24} />
          </Link>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-4 w-full">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl text-sm font-medium bg-gray-100 dark:bg-surface-dark text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
            placeholder="Buscar por receita ou lote..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="px-4 py-4 grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-surface-dark rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Package size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Lotes</p>
            <p className="text-lg font-bold text-slate-800 dark:text-white">{totalLots}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-surface-dark rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Produzido</p>
            <p className="text-lg font-bold text-slate-800 dark:text-white">{totalProduced} un</p>
          </div>
        </div>
        <div className="bg-white dark:bg-surface-dark rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
            <DollarSign size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Custo Total</p>
            <p className="text-lg font-bold text-slate-800 dark:text-white">R$ {totalCost.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="w-full overflow-x-auto no-scrollbar pb-2 pl-4 pr-4">
        <div className="flex gap-3 min-w-max">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-none px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                  : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Production Lots List */}
      <div className="flex-1 px-4 pb-20 space-y-3">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 mt-2">Lotes Recentes</h3>
        
        {filteredLots.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-surface-dark rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <Package className="mx-auto h-12 w-12 text-slate-300 mb-3" />
            <p className="text-slate-500 dark:text-slate-400">Nenhum lote encontrado.</p>
          </div>
        ) : (
          filteredLots.map((lot) => (
            <div key={lot.id} className="relative">
              <Link
                to={`/detalhes-lote?id=${lot.id}`}
                className="block"
              >
                <div className="bg-white dark:bg-surface-dark rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-800 flex gap-4 items-start active:scale-[0.99] transition-transform cursor-pointer group">
                  <div className="relative shrink-0 w-[72px] h-[72px]">
                    <div
                      className="w-full h-full rounded-lg bg-gray-200 dark:bg-gray-700 bg-cover bg-center"
                      style={{ backgroundImage: `url('${lot.image || "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=300"}')` }}
                    ></div>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
                    <div className="flex justify-between items-start">
                      <h3 className={`text-base font-semibold text-slate-800 dark:text-white truncate pr-8`}>
                        {lot.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(lot.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package size={14} />
                        <span>{lot.produced || lot.quantity} un</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${getStatusColor(lot.status || "Finalizado")}`}>
                        {lot.status || "Finalizado"}
                      </span>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">R$ {(lot.totalCost || 0).toFixed(2)}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">R$ {(lot.unitCost || 0).toFixed(2)}/un</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              
              <div className="absolute top-2 right-2 z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center justify-center size-8 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors outline-none">
                      <MoreVertical size={20} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-32 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800">
                    <DropdownMenuItem asChild className="flex items-center gap-2 cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-800">
                      <Link to={`/detalhes-lote?id=${lot.id}`}>
                        <Edit size={16} className="text-slate-500" />
                        <span>Editar</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(lot.id, lot.name)}
                      className="flex items-center gap-2 cursor-pointer text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20"
                    >
                      <Trash2 size={16} />
                      <span>Excluir</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Action Button */}
      <Link
        to="/add-producao"
        className="fixed bottom-20 right-4 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:bg-primary/90 transition-all active:scale-95 z-30"
      >
        <Plus size={28} />
      </Link>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 flex h-20 pb-4 items-center justify-around bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800/80 backdrop-blur-lg bg-opacity-95">
        <Link to="/visao-geral" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <span className="material-symbols-outlined text-[24px]">dashboard</span>
          <span className="text-[10px] font-medium">Início</span>
        </Link>
        <Link to="/gestao-producao" className="flex flex-col items-center gap-1 p-2 w-16 text-primary">
          <span className="material-symbols-outlined fill-current text-[24px]">conveyor_belt</span>
          <span className="text-[10px] font-medium">Produção</span>
        </Link>
        <Link to="/gestao-estoque" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <span className="material-symbols-outlined text-[24px]">inventory_2</span>
          <span className="text-[10px] font-medium">Estoque</span>
        </Link>
        <Link to="/relatorios" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <span className="material-symbols-outlined text-[24px]">payments</span>
          <span className="text-[10px] font-medium">Finanças</span>
        </Link>
      </nav>
    </div>
  );
};

export default GestaoProducao;