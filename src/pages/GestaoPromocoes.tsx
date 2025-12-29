"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { usePromotions, Promotion } from "@/contexts/PromotionsContext";
import { Button } from "@/components/ui/button";
import AddPromotionModal from "@/components/AddPromotionModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { showSuccess } from "@/utils/toast";

const GestaoPromocoes = () => {
  const { promotions, removePromotion, updatePromotion } = usePromotions();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Ativas");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promotionToEdit, setPromotionToEdit] = useState<Promotion | null>(null);

  const filters = ["Ativas", "Agendadas", "Inativas"];

  const filteredPromotions = promotions.filter(promotion => {
    const matchesSearch = 
      promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const now = new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);
    
    let matchesFilter = false;
    if (activeFilter === "Ativas") {
      matchesFilter = promotion.isActive && now >= startDate && now <= endDate;
    } else if (activeFilter === "Agendadas") {
      matchesFilter = promotion.isActive && now < startDate;
    } else if (activeFilter === "Inativas") {
      matchesFilter = !promotion.isActive || now > endDate;
    }
    
    return matchesSearch && matchesFilter;
  });

  const handleAddClick = () => {
    setPromotionToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (promotion: Promotion) => {
    setPromotionToEdit(promotion);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Tem certeza que deseja excluir a promoção "${name}"?`)) {
      removePromotion(id);
      showSuccess(`Promoção "${name}" excluída com sucesso.`);
    }
  };

  const handleToggleStatus = (promotion: Promotion) => {
    const newStatus = !promotion.isActive;
    updatePromotion(promotion.id, { isActive: newStatus });
    showSuccess(`Promoção ${newStatus ? 'ativada' : 'desativada'} com sucesso.`);
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'percentage': return 'percent';
      case 'fixed': return 'attach_money';
      case 'shipping': return 'local_shipping';
      default: return 'confirmation_number';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'percentage': return 'bg-primary/10 text-primary';
      case 'fixed': return 'bg-emerald-500/10 text-emerald-500';
      case 'shipping': return 'bg-indigo-500/10 text-indigo-500';
      default: return 'bg-slate-500/10 text-slate-500';
    }
  };

  const getStatusColor = (promotion: Promotion) => {
    const now = new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);
    
    if (!promotion.isActive) return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
    if (now < startDate) return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
    if (now > endDate) return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
    return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400';
  };

  const getStatusText = (promotion: Promotion) => {
    const now = new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);
    
    if (!promotion.isActive) return 'Inativo';
    if (now < startDate) return 'Agendado';
    if (now > endDate) return 'Expirado';
    return 'Ativo';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatEndDate = (promotion: Promotion) => {
    const now = new Date();
    const endDate = new Date(promotion.endDate);
    
    if (endDate.getFullYear() === 9999) return 'Indeterminado';
    return formatDate(promotion.endDate);
  };

  const activeCount = promotions.filter(p => {
    const now = new Date();
    const startDate = new Date(p.startDate);
    const endDate = new Date(p.endDate);
    return p.isActive && now >= startDate && now <= endDate;
  }).length;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Promoções</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Admin / Cupons</p>
          </div>
          <button 
            onClick={handleAddClick}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <span className="material-symbols-outlined font-semibold">add</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Search & Filter */}
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
            </div>
            <input 
              className="block w-full pl-10 pr-3 py-2.5 bg-surface-light dark:bg-surface-dark border-none ring-1 ring-slate-200 dark:ring-slate-700 rounded-xl text-sm placeholder-slate-400 focus:ring-2 focus:ring-primary focus:outline-none transition-shadow" 
              placeholder="Buscar cupom por código..." 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Segmented Control */}
          <div className="p-1 bg-slate-200 dark:bg-surface-dark rounded-xl flex">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  activeFilter === filter
                    ? "bg-white dark:bg-[#2c3b4a] text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Active Promotions List */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {activeFilter === "Ativas" ? "Ativas Agora" : activeFilter === "Agendadas" ? "Agendadas" : "Histórico"}
            </h2>
            {activeFilter === "Ativas" && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                {activeCount} rodando{activeCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          
          <div className="space-y-3">
            {filteredPromotions.map((promotion) => (
              <div 
                key={promotion.id} 
                className={`group relative bg-surface-light dark:bg-surface-dark rounded-2xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-primary/30 transition-all ${
                  activeFilter === "Inativas" || getStatusText(promotion) === "Expirado" ? "opacity-75 grayscale" : ""
                }`}
              >
                <div className="absolute right-4 top-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800">
                      <DropdownMenuItem onClick={() => handleEditClick(promotion)} className="flex items-center gap-2 cursor-pointer">
                        <span className="material-symbols-outlined">edit</span>
                        <span>Editar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleStatus(promotion)} className="flex items-center gap-2 cursor-pointer">
                        <span className="material-symbols-outlined">{promotion.isActive ? 'pause' : 'play_arrow'}</span>
                        <span>{promotion.isActive ? 'Desativar' : 'Ativar'}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(promotion.id, promotion.name)} className="flex items-center gap-2 cursor-pointer text-red-600">
                        <span className="material-symbols-outlined">delete</span>
                        <span>Excluir</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${getIconColor(promotion.type)}`}>
                    <span className="material-symbols-outlined text-[24px]">{getIconForType(promotion.type)}</span>
                  </div>
                  
                  <div className="flex-1 pr-6">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`text-base font-bold text-slate-900 dark:text-white ${
                        activeFilter === "Inativas" || getStatusText(promotion) === "Expirado" ? "line-through" : ""
                      }`}>
                        {promotion.code}
                      </h3>
                      <span className={`w-2 h-2 rounded-full ${
                        getStatusText(promotion) === "Ativo" ? "bg-emerald-500" :
                        getStatusText(promotion) === "Agendado" ? "bg-blue-500" :
                        getStatusText(promotion) === "Expirado" ? "bg-red-500" : "bg-slate-500"
                      }`}></span>
                    </div>
                    
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{promotion.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-400 dark:text-slate-500">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                        <span>Até {formatEndDate(promotion)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">confirmation_number</span>
                        <span>{promotion.currentUses} uso{promotion.currentUses !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredPromotions.length === 0 && (
              <div className="text-center py-12 opacity-50">
                <span className="material-symbols-outlined text-slate-400 text-6xl mb-4 block">confirmation_number</span>
                <p className="text-slate-500 dark:text-slate-400">
                  {activeFilter === "Ativas" ? "Nenhuma promoção ativa no momento." :
                   activeFilter === "Agendadas" ? "Nenhuma promoção agendada." :
                   "Nenhuma promoção inativa ou expirada."}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Bottom Action Bar */}
      <div className="sticky bottom-0 bg-surface-light dark:bg-surface-dark border-t border-slate-200 dark:border-slate-800 p-4 pb-8 backdrop-blur-xl bg-opacity-90 dark:bg-opacity-90">
        <button 
          onClick={handleAddClick}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold h-12 rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Criar Novo Cupom
        </button>
      </div>

      <AddPromotionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        promotionToEdit={promotionToEdit}
      />
    </div>
  );
};

export default GestaoPromocoes;