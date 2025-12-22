import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Ingredient, PackagingItem, StockMovementForDisplay } from "@/contexts/StockContext";

export interface StockMovementFormData {
  itemId: string;
  itemType: "ingredient" | "packaging";
  quantity: number;
  cost_type: "unitario" | "pacote";
  cost_value: number;
  description?: string;
  date: Date;
}

interface StockMovementFormProps {
  ingredients: Ingredient[];
  packagingItems: PackagingItem[];
  onSubmit: (data: StockMovementFormData) => void;
  movementToEdit?: StockMovementForDisplay | null;
  onCancelEdit?: () => void;
}

export const StockMovementForm: React.FC<StockMovementFormProps> = ({
  ingredients,
  packagingItems,
  onSubmit,
  movementToEdit,
  onCancelEdit
}) => {
  const [itemType, setItemType] = useState<"ingredient" | "packaging">("ingredient");
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost_type, setCostType] = useState<"unitario" | "pacote">("unitario");
  const [cost_value, setCostValue] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Populate form when editing
  useEffect(() => {
    if (movementToEdit) {
      setItemType(movementToEdit.item_type);
      setItemId(movementToEdit.item_id);
      setQuantity(movementToEdit.quantity.toString());
      setCostType(movementToEdit.cost_type);
      setCostValue(movementToEdit.cost_value.toString());
      setDescription(movementToEdit.description || "");
      setDate(new Date(movementToEdit.date).toISOString().split('T')[0]);
    } else {
      // Reset form for new movement
      setItemType("ingredient");
      setItemId("");
      setQuantity("");
      setCostType("unitario");
      setCostValue("");
      setDescription("");
      setDate(new Date().toISOString().split('T')[0]);
    }
  }, [movementToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!itemId || !quantity || !cost_value) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const formData: StockMovementFormData = {
      itemId,
      itemType,
      quantity: parseFloat(quantity),
      cost_type,
      cost_value: parseFloat(cost_value),
      description: description || undefined,
      date: new Date(date)
    };

    onSubmit(formData);
  };

  const availableItems = itemType === "ingredient" ? ingredients : packagingItems;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Item Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Tipo de Item
          </label>
          <Select value={itemType} onValueChange={(value: "ingredient" | "packaging") => {
            setItemType(value);
            setItemId(""); // Reset item selection when type changes
          }}>
            <SelectTrigger className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ingredient">Ingrediente</SelectItem>
              <SelectItem value="packaging">Embalagem</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Item Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Item
          </label>
          <Select value={itemId} onValueChange={setItemId}>
            <SelectTrigger className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700">
              <SelectValue placeholder="Selecione um item" />
            </SelectTrigger>
            <SelectContent>
              {availableItems.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name} ({item.quantity} {item.unit})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Quantidade
          </label>
          <Input
            type="number"
            step="0.01"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="0"
            className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
            required
          />
        </div>

        {/* Cost Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Tipo de Custo
          </label>
          <Select value={cost_type} onValueChange={(value: "unitario" | "pacote") => setCostType(value)}>
            <SelectTrigger className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unitario">Unitário</SelectItem>
              <SelectItem value="pacote">Total do Pacote</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cost Value */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Valor {cost_type === "unitario" ? "Unitário" : "Total"} (R$)
          </label>
          <Input
            type="number"
            step="0.01"
            value={cost_value}
            onChange={(e) => setCostValue(e.target.value)}
            placeholder="0,00"
            className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
            required
          />
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Data
          </label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
            required
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Descrição (Opcional)
        </label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Adicione uma descrição para esta movimentação..."
          rows={3}
          className="bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 resize-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        {movementToEdit && onCancelEdit && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancelEdit}
            className="flex-1 h-12 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Cancelar
          </Button>
        )}
        <Button
          type="submit"
          className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30"
        >
          {movementToEdit ? "Atualizar Movimentação" : "Registrar Movimentação"}
        </Button>
      </div>
    </form>
  );
};