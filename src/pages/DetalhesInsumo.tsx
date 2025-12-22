import { ArrowLeft, Edit, Trash2, TrendingUp, AlertTriangle, CheckCircle, Calendar, DollarSign, Package, History, Plus, Minus } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from "@/utils/toast";
import { useStock } from "@/contexts/StockContext";

const DetalhesInsumo = () => {
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get('id');
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { stockMovements } = useStock();

  useEffect(() => {
    const loadItem = () => {
      try {
        const storedItems = localStorage.getItem('inventoryItems');
        if (storedItems) {
          const items = JSON.parse(storedItems);
          const foundItem = items.find((i: any) => i.id === itemId);
          if (foundItem) {
            setItem(foundItem);
          }
        }
      } catch (error) {
        console.error('Error loading item:', error);
      } finally {
        setLoading(false);
      }
    };

    if (itemId) {
      loadItem();
    } else {
      setLoading(false);
    }
  }, [itemId]);

  const handleDelete = () => {
    if (confirm(`Tem certeza que deseja excluir "${item.name}"? Esta ação não pode ser desfeita.`)) {
      try {
        const storedItems = localStorage.getItem('inventoryItems');
        if (storedItems) {
          const items = JSON.parse(storedItems);
          const updatedItems = items.filter((i: any) => i.id !== itemId);
          localStorage.setItem('inventoryItems', JSON.stringify(updatedItems));
          showSuccess(`"${item.name}" foi removido do estoque`);
          // Navigate back
          window.history.back();
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        showError('Erro ao excluir item');
      }
    }
  };

  // Get movement history for this item
  const itemMovements = stockMovements
    .filter(movement => movement.item_id === itemId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (loading) {
    return (
      <div className="relative flex min-h-screen w-full flex-col pb-24 bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-x-hidden antialiased">
        <header className="sticky top-0 z-30 flex items-center justify-between bg-white/90 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <Link
            to="/gestao-estoque"
            className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="text-slate-600 dark:text-slate-300" size={24} />
          </Link>
          <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center text-slate-900 dark:text-white">Carregando...</h1>
          <div className="size-10"></div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-slate-500 dark:text-slate-400">Carregando detalhes do item...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="relative flex min-h-screen w-full flex-col pb-24 bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-x-hidden antialiased">
        <header className="sticky top-0 z-30 flex items-center justify-between bg-white/90 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <Link
            to="/gestao-estoque"
            className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="text-slate-600 dark:text-slate-300" size={24} />
          </Link>
          <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center text-slate-900 dark:text-white">Item não encontrado</h1>
          <div className="size-10"></div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <span className="material-symbols-outlined text-slate-400 text-6xl mb-4">inventory_2</span>
            <p className="text-slate-500 dark:text-slate-400 mb-4">Item não encontrado</p>
            <Link
              to="/gestao-estoque"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft size={16} />
              Voltar para Estoque
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const quantity = parseFloat(item.quantity || "0");
  const unitCost = item.unitCost || 0;
  const totalCost = quantity * unitCost;
  const minQuantity = item.minQuantity ? parseFloat(item.minQuantity) : null;
  const isLowStock = minQuantity && quantity <= minQuantity;
  const isCriticalStock = minQuantity && quantity <= (minQuantity * 0.5);

  const getStatusColor = (status) => {
    switch (status) {
      case "Baixo":
        return "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/10";
      case "Crítico":
        return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-500/10";
      default:
        return "";
    }
  };

  const getStatusText = () => {
    if (isCriticalStock) return "Crítico";
    if (isLowStock) return "Baixo";
    return "Em dia";
  };

  const getIcon = (iconName) => {
    const iconMap: { [key: string]: string } = {
      Cookie: "🍪",
      Package: "📦",
      ChefHat: "👨‍🍳",
      Archive: "📁",
      IceCream: "🍦",
      Tag: "🏷️"
    };
    return iconMap[iconName] || "📦";
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col pb-24 bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-x-hidden antialiased">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-white/90 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 border-b border-slate-200 dark:border-slate-800">
        <Link
          to="/gestao-estoque"
          className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="text-slate-600 dark:text-slate-300" size={24} />
        </Link>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center text-slate-900 dark:text-white">Detalhes do Item</h1>
        <div className="flex items-center gap-2">
          <Link to={`/edit-insumo?id=${item.id}`}>
            <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors">
              <Edit size={20} />
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="flex size-10 items-center justify-center rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 space-y-6 pb-32 w-full max-w-4xl mx-auto">
        {/* Item Header */}
        <div className="rounded-2xl bg-white dark:bg-surface-dark p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center rounded-xl bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-slate-700 shrink-0 size-16 text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-[32px]">{getIcon(item.icon)}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{item.name}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.category}</p>
                </div>
                {(isLowStock || isCriticalStock) && (
                  <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${getStatusColor(getStatusText())}`}>
                    {getStatusText()}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Package className="text-slate-400" size={16} />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {quantity.toFixed(2)} {item.unit}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="text-slate-400" size={16} />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    R$ {unitCost.toFixed(2)}/{item.unit}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stock Status */}
        {(isLowStock || isCriticalStock) && (
          <div className="rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-amber-500" size={24} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                  Estoque Baixo
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                  Quantidade atual: {quantity.toFixed(2)} {item.unit} • Mínimo recomendado: {minQuantity} {item.unit}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stock Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-white dark:bg-surface-dark p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Package className="text-primary" size={20} />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Quantidade Atual</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{quantity.toFixed(2)}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.unit}</p>
          </div>
          <div className="rounded-xl bg-white dark:bg-surface-dark p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="text-green-500" size={20} />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Valor Total</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">R$ {totalCost.toFixed(2)}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">R$ {unitCost.toFixed(2)}/{item.unit}</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="rounded-2xl bg-white dark:bg-surface-dark p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-slate-900 dark:text-white text-base font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">info</span>
            Informações Adicionais
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm text-slate-600 dark:text-slate-300">Categoria</span>
              <span className="text-sm font-medium text-slate-900 dark:text-white">{item.category}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm text-slate-600 dark:text-slate-300">Unidade de Medida</span>
              <span className="text-sm font-medium text-slate-900 dark:text-white">{item.unit}</span>
            </div>
            {item.minQuantity && (
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm text-slate-600 dark:text-slate-300">Quantidade Mínima</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">{item.minQuantity} {item.unit}</span>
              </div>
            )}
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-slate-600 dark:text-slate-300">Última Atualização</span>
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                {item.lastUpdated ? new Date(item.lastUpdated).toLocaleDateString('pt-BR') : 'Nunca'}
              </span>
            </div>
          </div>
        </div>

        {/* Movement History */}
        <div className="rounded-2xl bg-white dark:bg-surface-dark p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-slate-900 dark:text-white text-base font-bold mb-4 flex items-center gap-2">
            <History className="text-slate-500 dark:text-slate-400" size={20} />
            Histórico de Movimentações
          </h3>

          {itemMovements.length === 0 ? (
            <div className="text-center py-8">
              <History className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500 mb-4" />
              <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                Nenhuma movimentação registrada
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                As movimentações de estoque aparecerão aqui após serem registradas.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {itemMovements.map((movement, index) => {
                const isEntry = movement.quantity > 0;
                const unitCost = movement.cost_type === "unitario"
                  ? movement.cost_value
                  : movement.cost_value / movement.quantity;

                return (
                  <div key={movement.id} className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <div className={`flex items-center justify-center size-10 rounded-full ${
                      isEntry
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                    }`}>
                      {isEntry ? <Plus size={20} /> : <Minus size={20} />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                          {isEntry ? 'Entrada' : 'Saída'} de Estoque
                        </h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {formatDate(movement.date)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-2">
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Quantidade</p>
                          <p className={`text-sm font-medium ${
                            isEntry ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}>
                            {isEntry ? '+' : ''}{movement.quantity} {item.unit}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Custo Unitário</p>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">
                            {formatCurrency(unitCost)}
                          </p>
                        </div>
                      </div>

                      {movement.description && (
                        <div className="mt-2">
                          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Descrição</p>
                          <p className="text-sm text-slate-700 dark:text-slate-300">
                            {movement.description}
                          </p>
                        </div>
                      )}

                      <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-500 dark:text-slate-400">Valor Total</span>
                          <span className="text-sm font-semibold text-slate-900 dark:text-white">
                            {formatCurrency(movement.cost_value)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl bg-white dark:bg-surface-dark p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-slate-900 dark:text-white text-base font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">bolt</span>
            Ações Rápidas
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              className="flex items-center justify-center gap-2 h-12 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30"
              onClick={() => {
                // TODO: Implement add stock functionality
                alert('Funcionalidade em desenvolvimento');
              }}
            >
              <TrendingUp size={18} />
              <span className="text-sm">Adicionar Estoque</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 h-12 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              onClick={() => {
                // TODO: Implement stock history
                alert('Funcionalidade em desenvolvimento');
              }}
            >
              <Calendar size={18} />
              <span className="text-sm">Histórico</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetalhesInsumo;