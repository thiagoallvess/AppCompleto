import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, Package, DollarSign } from "lucide-react";
import { StockMovementForDisplay } from "@/contexts/StockContext";

interface RecentStockMovementsProps {
  movements: StockMovementForDisplay[];
  onEdit: (movement: StockMovementForDisplay) => void;
  onDelete: (movementId: string) => void;
}

export const RecentStockMovements: React.FC<RecentStockMovementsProps> = ({
  movements,
  onEdit,
  onDelete
}) => {
  const formatDate = (dateInput: string) => {
    const date = new Date(dateInput);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (movements.length === 0) {
    return (
      <div className="text-center py-8">
        <Package className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500 mb-4" />
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
          Nenhuma movimentação registrada
        </h3>
        <p className="text-slate-500 dark:text-slate-400">
          As movimentações de estoque aparecerão aqui após serem registradas.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {movements
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10) // Show only last 10 movements
        .map((movement) => (
          <Card key={movement.id} className="bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 size-8">
                      <Package className="text-slate-600 dark:text-slate-400 size-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        {movement.itemName}
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {movement.item_type === "ingredient" ? "Ingrediente" : "Embalagem"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Quantidade
                      </p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        +{movement.quantity} {movement.itemUnit}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Tipo de Custo
                      </p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {movement.cost_type === "unitario" ? "Unitário" : "Total"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Valor Unitário
                      </p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {formatCurrency(movement.cost_value)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Data
                      </p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {formatDate(movement.date)}
                      </p>
                    </div>
                  </div>

                  {movement.description && (
                    <div className="mt-3">
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Descrição
                      </p>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {movement.description}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(movement)}
                    className="h-8 w-8 p-0 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(movement.id)}
                    className="h-8 w-8 p-0 border-red-200 dark:border-red-800 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};