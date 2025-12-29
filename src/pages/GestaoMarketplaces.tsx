"use client";

import { ArrowLeft, Plus, Search, MoreVertical, Edit, Trash2, Percent } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMarketplaces, Marketplace } from "@/contexts/MarketplacesContext";
import AddMarketplaceModal from "@/components/AddMarketplaceModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { showSuccess } from "@/utils/toast";

const GestaoMarketplaces = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [marketplaceToEdit, setMarketplaceToEdit] = useState<Marketplace | null>(null);
  const { marketplaces, removeMarketplace } = useMarketplaces();

  const filteredMarketplaces = marketplaces.filter(marketplace =>
    marketplace.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClick = () => {
    setMarketplaceToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (marketplace: Marketplace) => {
    setMarketplaceToEdit(marketplace);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Tem certeza que deseja excluir o marketplace "${name}"?`)) {
      removeMarketplace(id);
      showSuccess(`Marketplace "${name}" excluído com sucesso.`);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            to="/visao-geral"
            className="flex items-center justify-center size-10 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col flex-1 text-center">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Administração</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Marketplaces</h1>
          </div>
          <Button size="sm" className="size-10 rounded-full p-0" asChild>
            <button onClick={handleAddClick}>
              <Plus size={24} />
            </button>
          </Button>
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
            placeholder="Buscar marketplace..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Marketplaces List */}
      <div className="flex-1 px-4 pb-24 space-y-3">
        <div className="flex items-center justify-between py-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>Total: {filteredMarketplaces.length} marketplaces</span>
        </div>

        {filteredMarketplaces.length === 0 ? (
          <div className="text-center py-12 opacity-50">
            <div className="flex items-center justify-center size-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <Percent className="text-slate-400 dark:text-slate-500" size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Nenhum marketplace encontrado
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-xs mb-6">
              {searchTerm ? "Tente ajustar os filtros de busca." : "Comece adicionando seus primeiros marketplaces."}
            </p>
            <Button onClick={handleAddClick} className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30">
              <Plus size={20} className="mr-2" />
              Adicionar Primeiro Marketplace
            </Button>
          </div>
        ) : (
          filteredMarketplaces.map((marketplace) => (
            <div
              key={marketplace.id}
              className="group relative flex items-center gap-4 bg-white dark:bg-surface-dark rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-primary/50 dark:hover:border-primary/50 transition-all"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                <span className="material-symbols-outlined text-[28px]">storefront</span>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-1">
                <div className="flex justify-between items-start">
                  <h3 className={`text-base font-semibold truncate pr-2 text-slate-800 dark:text-slate-100`}>
                    {marketplace.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Percent size={16} />
                  <span>Comissão: {marketplace.commissionRate}%</span>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 -m-1 -mt-2 outline-none">
                    <MoreVertical size={20} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800">
                  <DropdownMenuItem onClick={() => handleEditClick(marketplace)} className="flex items-center gap-2 cursor-pointer focus:bg-slate-100 dark:focus:bg-slate-800">
                    <Edit size={16} className="text-slate-500" />
                    <span>Editar</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(marketplace.id, marketplace.name)} className="flex items-center gap-2 cursor-pointer text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20">
                    <Trash2 size={16} />
                    <span>Excluir</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))
        )}
      </div>

      <AddMarketplaceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        marketplaceToEdit={marketplaceToEdit}
      />
    </div>
  );
};

export default GestaoMarketplaces;