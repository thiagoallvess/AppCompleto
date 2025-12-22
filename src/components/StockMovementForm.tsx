import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Ingredient, PackagingItem } from "@/contexts/StockContext";
import { StockMovementForDisplay } from "@/components/RecentStockMovements";

export interface StockMovementFormData {
  itemId: string;
  itemType: "ingredient" | "packaging";
  quantity: number;
  cost_type: "unitario" | "pacote";
  cost_value: number;
  description: string;
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
  const [formData, setFormData] = useState({
    itemId: "",
    itemType: "ingredient" as "ingredient" | "packaging",
    quantity: "",
    cost_type: "unitario" as "unitario" | "pacote",
    cost_value: "",
    description: "",
    date: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form when editing
  useEffect(() => {
    if (movementToEdit) {
      setFormData({
        itemId: movementToEdit.item_id,
        itemType: movementToEdit.item_type,
        quantity: Math.abs(movementToEdit.quantity).toString(),
        cost_type: movementToEdit.cost_type,
        cost_value: movementToEdit.cost_value.toString(),
        description: movementToEdit.description || "",
        date: new Date(movementToEdit.date).toISOString().split('T')[0]
      });
    } else {
      // Reset form for new movement
      setFormData({
        itemId: "",
        itemType: "ingredient",
        quantity: "",
        cost_type: "unitario",
        cost_value: "",
        description: "",
        date: new Date().toISOString().split('T')[0]
      });
    }
    setErrors({});
  }, [movementToEdit]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.itemId) {
      newErrors.itemId = "Selecione um item";
    }

    if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
      newErrors.quantity = "Quantidade deve ser maior que zero";
    }

    if (!formData.cost_value || parseFloat(formData.cost_value) <= 0) {
      newErrors.cost_value = "Valor deve ser maior que zero";
    }

    if (!formData.date) {
      newErrors.date = "Data é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitData: StockMovementFormData = {
      itemId: formData.itemId,
      itemType: formData.itemType,
      quantity: parseFloat(formData.quantity),
      cost_type: formData.cost_type,
      cost_value: parseFloat(formData.cost_value),
      description: formData.description,
      date: new Date(formData.date)
    };

    onSubmit(submitData);
  };

  const handleCancel = () => {
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  // Get available items based on selected type
  const availableItems = formData.itemType === "ingredient" ? ingredients : packagingItems;

  // Get selected item for displaying unit
  const selectedItem = availableItems.find(item => item.id === formData.itemId);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Item Type Selection */}
      <div className="space-y-2">
        <Label htmlFor="itemType" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Tipo de Item
        </Label>
        <Select
          value={formData.itemType}
          onValueChange={(value: "ingredient" | "packaging") => handleInputChange("itemType", value)}
        >
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
        <Label htmlFor="itemId" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Item
        </Label>
        <Select
          value={formData.itemId}
          onValueChange={(value) => handleInputChange("itemId", value)}
        >
          <SelectTrigger className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700">
            <SelectValue placeholder="Selecione um item..." />
          </SelectTrigger>
          <SelectContent>
            {availableItems.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name} ({item.quantity} {item.unit})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.itemId && <p className="text-sm text-red-600 dark:text-red-400">{errors.itemId}</p>}
      </div>

      {/* Quantity */}
      <div className="space-y-2">
        <Label htmlFor="quantity" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Quantidade
        </Label>
        <div className="relative">
          <Input
            id="quantity"
            type="number"
            step="0.01"
            min="0"
            value={formData.quantity}
            onChange={(e) => handleInputChange("quantity", e.target.value)}
            className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 pr-12"
            placeholder="0"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {selectedItem?.unit || "un"}
            </span>
          </div>
        </div>
        {errors.quantity && <p className="text-sm text-red-600 dark:text-red-400">{errors.quantity}</p>}
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Quantidade a adicionar ao estoque
        </p>
      </div>

      {/* Cost Type */}
      <div className="space-y-2">
        <Label htmlFor="cost_type" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Tipo de Custo
        </Label>
        <Select
          value={formData.cost_type}
          onValueChange={(value: "unitario" | "pacote") => handleInputChange("cost_type", value)}
        >
          <SelectTrigger className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unitario">Custo Unitário</SelectItem>
            <SelectItem value="pacote">Custo do Pacote</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cost Value */}
      <div className="space-y-2">
        <Label htmlFor="cost_value" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Valor (R$)
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-slate-500 dark:text-slate-400 font-medium">R$</span>
          </div>
          <Input
            id="cost_value"
            type="number"
            step="0.01"
            min="0"
            value={formData.cost_value}
            onChange={(e) => handleInputChange("cost_value", e.target.value)}
            className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 pl-10"
            placeholder="0,00"
          />
        </div>
        {errors.cost_value && <p className="text-sm text-red-600 dark:text-red-400">{errors.cost_value}</p>}
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {formData.cost_type === "unitario"
            ? "Custo por unidade do item"
            : "Custo total do pacote/lote"
          }
        </p>
      </div>

      {/* Date */}
      <div className="space-y-2">
        <Label htmlFor="date" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Data
        </Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => handleInputChange("date", e.target.value)}
          className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
        />
        {errors.date && <p className="text-sm text-red-600 dark:text-red-400">{errors.date}</p>}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Descrição <span className="text-xs font-normal text-slate-400">(Opcional)</span>
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          rows={3}
          className="bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 resize-none"
          placeholder="Adicione uma descrição para esta movimentação..."
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        {movementToEdit && onCancelEdit && (
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
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