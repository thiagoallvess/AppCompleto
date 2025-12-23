"use client";

import { ArrowLeft, Plus, Search, MoreVertical, Package, TrendingUp, DollarSign, Calendar, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
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

  const filters = ["Todos", "Em Produção", "Finalizado", "Em Estoque"];

  // Mock data - em uma aplicação real viria do contexto/API
  const [productionLots, setProductionLots] = useState([
    {
      id: "8349",
      name: "Ninho com Nutella",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkd8lB5c2Vaw9ZupDeGKA8CqQrsuCbv1IVWtjP1Pgq6N5JYAMjwdcNFdmTh7yXGKKGPykrJKJC3EQGvyud_4OcMgbqUKbbJxg_HMmq1DxGVHqG67Xx_g_O1nhM68hW_zb8fX5mpqZq1K6sshICrQCxa8oV61kN1WUpqDp5PiU3Ww7K_MZF2TOu-iy-FqWeK-zibAFwgP0IvVgMX4QnpBYdPUzoUzGQaTcXvNfJTbTCUlmXc25qyIc3GuUHXF19vX4tEBWm0AYdEA",
      status: "Finalizado",
      statusColor: "green",
      date: "12/08/2023",
      produced: 50,
      totalCost: 75.00,
      unitCost: 1.50
    },
    {
      id: "8348",
      name: "Morango Gourmet",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCM3cfAeatmEUtNaDEnz796M7L7_1N-EtyXmykGuHogX2Bqw0GLmlvYa3HPA8Wz1_4o9F5wPSUrzWkU8Yp7doalaFscT5306YI3bZgNz9gTLuFuBl4eyymE72I2oud60ide53rz4tw6ycGt2mAau951TpWIjxrfxMQg_NpEJUwcm1qol_S5JpSoZbGnw8au7eUWzH4lvezL2wocDTs541UOAWtFuVwleVW5xacABNhs7r5_Xla2rV2_GgGzX6Ol3wbDpTujEKBi_A",
      status: "Em Estoque",
      statusColor: "yellow",
      date: "11/08/2023",
      produced: 30,
      totalCost: 45.00,
      unitCost: 1.50
    },
    {
      id: "8347",
      name: "Maracujá Trufado",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoZ4WrJnviJNuxDALva68IEx8BdGnHIjNAHbiCD9c4LdL8-hJlme5-_jxH6yK45w60ONtc-wS1X4YRBtWIaMoT-ulkjkHFRp2qqXBLfOkCCCkwdQaWLx2-89611q0649qzVgnLg86WrY-Ea70L22N2sX9RqBAfGRPY9V-lGLiw6-mIc2syzuhmzeimcROK7NbRdCxSJMIFrOkJSzh4puGnvIZiAPSOVeuwwrqMUlMvOWxuvH8MJKoEM1-UH9iaFBbmLGPUy3smQQ",
      status: "Em Produção",
      statusColor: "blue",
      date: "10/08/2023",
      produced: 0,
      totalCost: 0.00,
      unitCost: 0.00
    }
  ]);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Deseja realmente excluir o lote de "${name}"?`)) {
      setProductionLots(prev => prev.filter(lot => lot.id !== id));
      showSuccess(`Lote #${id} excluído com sucesso.`);
    }
  };

  const filteredLots = productionLots.filter(lot => {
    const matchesSearch = lot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lot.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "Todos" ||
                         (activeFilter === "Em Produção" && lot.status === "Em Produção") ||
                         (activeFilter === "Finalizado" && lot.status === "Finalizado") ||
                         (activeFilter === "Em Estoque" && lot.status === "Em Estoque");
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (color: string) => {
    switch (color) {
      case "green": return "bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400";
      case "yellow": return "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "blue": return "bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400";
      default: return "bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  const totalLots = productionLots.length;
  const totalProduced = productionLots.reduce((sum, lot) => sum + lot.produced, 0);
  const totalCost = productionLots.reduce((sum, lot) => sum + lot.totalCost, 0);

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
        {filteredLots.map((lot) => (
          <div key={lot.id} className="relative">
            <Link
              to={`/detalhes-lote?id=${lot.id}`}
              className="block"
            >
              <div className="bg-white dark:bg-surface-dark rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-800 flex gap-4 items-start active:scale-[0.99] transition-transform cursor-pointer group">
                <div className="relative shrink-0 w-[72px] h-[72px]">
                  <div
                    className="w-full h-full rounded-lg bg-gray-200 dark:bg-gray-700 bg-cover bg-center"
                    style={{ backgroundImage: `url('${lot.image}')` }}
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
                      <span>{lot.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package size={14} />
                      <span>{lot.produced} un</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${getStatusColor(lot.statusColor)}`}>
                      {lot.status}
                    </span>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200">R$ {lot.totalCost.toFixed(2)}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">R$ {lot.unitCost.toFixed(2)}/un</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Menu de Opções (Três Pontinhos) */}
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
        ))}
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