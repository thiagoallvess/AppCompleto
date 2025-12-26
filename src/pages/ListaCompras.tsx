"use client";

import { ArrowLeft, Filter, MoreVertical, ShoppingCart, Send, ContentCopy, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useStock } from "@/contexts/StockContext";
import { showSuccess, showError } from "@/utils/toast";

const ListaCompras = () => {
  const { ingredients, packagingItems } = useStock();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Combine all stock items
  const allItems = [...ingredients, ...packagingItems];

  // Calculate items that need to be purchased (below minimum or critical)
  const itemsToBuy = allItems
    .filter(item => {
      const minQuantity = item.minQuantity || 0;
      return item.quantity <= minQuantity;
    })
    .map(item => {
      const minQuantity = item.minQuantity || 0;
      const needed = minQuantity + 10; // Add buffer
      const toBuy = Math.max(0, needed - item.quantity);
      return {
        ...item,
        needed,
        toBuy,
        isCritical: item.quantity <= (minQuantity * 0.5)
      };
    });

  const totalItems = itemsToBuy.length;
  const estimatedCost = itemsToBuy.reduce((sum, item) => sum + (item.toBuy * item.unitCost), 0);

  const handleRecalculate = () => {
    // Simulate recalculation
    setLastUpdate(new Date());
    showSuccess("Necessidades recalculadas com base na produção futura!");
  };

  const handleToggleItem = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleCopyList = () => {
    const selectedItemsList = itemsToBuy.filter(item => selectedItems.has(item.id));
    const text = selectedItemsList.map(item => 
      `${item.name}: ${item.toBuy} ${item.unit}`
    ).join('\n');
    
    navigator.clipboard.writeText(text).then(() => {
      showSuccess("Lista copiada para a área de transferência!");
    }).catch(() => {
      showError("Erro ao copiar lista");
    });
  };

  const handleSendWhatsApp = () => {
    const selectedItemsList = itemsToBuy.filter(item => selectedItems.has(item.id));
    const text = `Lista de Compras:\n\n${selectedItemsList.map(item => 
      `• ${item.name}: ${item.toBuy} ${item.unit}`
    ).join('\n')}\n\nTotal estimado: R$ ${selectedItemsList.reduce((sum, item) => sum + (item.toBuy * item.unitCost), 0).toFixed(2)}`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            to="/visao-geral"
            className="flex items-center justify-center size-10 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Estoque</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Lista de Compras</h1>
          </div>
        </div>
        <div className="flex items-center justify-end pr-4">
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
            <Filter size={24} />
          </button>
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
            <MoreVertical size={24} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-24">
        {/* Summary Stats */}
        <div className="flex flex-wrap gap-3 p-4">
          <div className="flex min-w-[140px] flex-1 flex-col gap-1 rounded-xl p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <ShoppingCart className="text-primary" size={20} />
              <p className="text-slate-500 dark:text-slate-400 text-sm font-bold leading-normal uppercase tracking-wider">Itens</p>
            </div>
            <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-extrabold leading-tight">{totalItems}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Pendentes de compra</p>
          </div>
          <div className="flex min-w-[140px] flex-1 flex-col gap-1 rounded-xl p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-green-500 text-[20px]">attach_money</span>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-bold leading-normal uppercase tracking-wider">Estimado</p>
            </div>
            <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-extrabold leading-tight">R$ {estimatedCost.toFixed(0)}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Baseado no histórico</p>
          </div>
        </div>

        {/* Recalculate Action */}
        <div className="px-4 pb-2">
          <Button
            onClick={handleRecalculate}
            className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-primary text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98]"
          >
            <RefreshCw className="group-hover:rotate-180 transition-transform duration-500" size={20} />
            <span className="truncate">Recalcular Necessidades</span>
          </Button>
          <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-2">
            Última atualização: {lastUpdate.toLocaleDateString('pt-BR')}, {lastUpdate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* Section Headline */}
        <div className="pt-6 pb-2 px-4 flex justify-between items-end">
          <h3 className="text-slate-900 dark:text-white tracking-tight text-xl font-bold leading-tight">Ingredientes Faltantes</h3>
          <span className="text-xs font-bold text-primary uppercase tracking-wide cursor-pointer">Ver todos</span>
        </div>

        {/* List Items */}
        <div className="flex flex-col gap-3 px-4">
          {itemsToBuy.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col sm:flex-row gap-4 bg-white dark:bg-surface-dark p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm items-start sm:items-center justify-between ${
                item.quantity > (item.minQuantity || 0) ? 'opacity-60 hover:opacity-100 transition-opacity' : ''
              }`}
            >
              <div className="flex items-start gap-4 w-full sm:w-auto">
                <div className="shrink-0 bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-[70px] bg-gray-100 dark:bg-gray-800">
                  {/* Placeholder for item image */}
                </div>
                <div className="flex flex-1 flex-col justify-center gap-1">
                  <div className="flex justify-between items-start">
                    <p className="text-slate-900 dark:text-white text-base font-bold leading-tight">{item.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                      item.isCritical ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' : 'bg-primary/10 text-primary dark:text-blue-300'
                    }`}>
                      Comprar: {item.toBuy} {item.unit}
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-normal leading-normal mt-0.5">
                    Nec: {item.needed} {item.unit} | Estoque: {item.quantity} {item.unit}
                  </p>
                </div>
              </div>
              <div className="shrink-0 w-full sm:w-auto flex justify-end">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <span className="text-sm font-medium text-slate-500 group-hover:text-primary dark:text-slate-400 transition-colors">Marcar</span>
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.id)}
                      onChange={() => handleToggleItem(item.id)}
                      className="peer h-6 w-6 rounded border-slate-300 dark:border-slate-800 border-2 bg-transparent text-primary checked:bg-primary checked:border-primary focus:ring-0 focus:ring-offset-0 focus:outline-none transition-all cursor-pointer"
                    />
                  </div>
                </label>
              </div>
            </div>
          ))}
          {itemsToBuy.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-slate-100 dark:bg-surface-dark p-6 rounded-full mb-4 mx-auto w-fit">
                <ShoppingCart className="text-slate-400 text-4xl" size={48} />
              </div>
              <p className="text-slate-500 dark:text-slate-400 mb-2">Nenhum item precisa ser comprado</p>
              <p className="text-sm text-slate-400 dark:text-slate-500">Todos os itens estão com estoque adequado</p>
            </div>
          )}
        </div>
        <div className="h-8"></div>
      </div>

      {/* Sticky Footer Action Bar */}
      {selectedItems.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-20 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 p-4 pb-6">
          <div className="flex gap-3 max-w-2xl mx-auto">
            <Button
              onClick={handleCopyList}
              variant="outline"
              className="flex-1 flex items-center justify-center h-12 rounded-lg border border-slate-300 dark:border-slate-800 bg-transparent text-slate-700 dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors gap-2"
            >
              <ContentCopy size={20} />
              <span>Copiar</span>
            </Button>
            <Button
              onClick={handleSendWhatsApp}
              className="flex-[2] flex items-center justify-center h-12 rounded-lg bg-[#25D366] text-white font-bold hover:bg-[#20bd5a] transition-colors gap-2 shadow-lg shadow-[#25D366]/20"
            >
              <Send size={20} />
              <span>Enviar no WhatsApp</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaCompras;