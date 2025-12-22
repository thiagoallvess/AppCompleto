import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";
import { useStock } from "@/contexts/StockContext";

const AddInsumo = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    minQuantity: ""
  });

  const { addIngredient, addPackagingItem } = useStock();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.category) {
      alert("Por favor, preencha pelo menos o nome e a categoria do insumo.");
      return;
    }

    // Create new item
    const newItem = {
      id: Date.now().toString(), // Ensure unique string ID
      name: formData.name,
      unit: formData.unit || "un",
      quantity: parseFloat(formData.quantity || "0"),
      unitCost: 0, // Will be updated when stock movements are added
      minQuantity: formData.minQuantity ? parseFloat(formData.minQuantity) : undefined,
      category: formData.category,
      icon: formData.category === "Ingredientes" ? "Cookie" : "Package",
      status: "Em dia"
    };

    // Add to the appropriate context
    if (formData.category === "Ingredientes") {
      addIngredient(newItem);
    } else if (formData.category === "Embalagens") {
      addPackagingItem(newItem);
    }

    // Show success message
    showSuccess(`"${formData.name}" foi adicionado ao estoque!`);

    // Reset form
    setFormData({
      name: "",
      category: "",
      quantity: "",
      unit: "",
      minQuantity: ""
    });
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            to="/gestao-insumos"
            className="flex items-center justify-center size-10 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Insumos</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Adicionar Insumo</h1>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 pb-32">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome do Insumo */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="name">
              Nome do Insumo
            </label>
            <Input
              id="name"
              placeholder="Ex: Leite Condensado"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
              required
            />
          </div>

          {/* Categoria */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="category">
              Categoria
            </label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ingredientes">Ingredientes</SelectItem>
                <SelectItem value="Embalagens">Embalagens</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quantidade e Unidade */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="quantity">
                Quantidade <span className="text-xs font-normal text-slate-400">(Opcional)</span>
              </label>
              <Input
                id="quantity"
                placeholder="0"
                type="number"
                step="0.01"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="unit">
                Unidade <span className="text-xs font-normal text-slate-400">(Opcional)</span>
              </label>
              <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                <SelectTrigger className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kg</SelectItem>
                  <SelectItem value="g">Grama</SelectItem>
                  <SelectItem value="l">Litro</SelectItem>
                  <SelectItem value="ml">Mililitro</SelectItem>
                  <SelectItem value="un">Unidade</SelectItem>
                  <SelectItem value="cx">Caixa</SelectItem>
                  <SelectItem value="rolo">Rolo</SelectItem>
                  <SelectItem value="pacote">Pacote</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quantidade Mínima */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="minQuantity">
              Quantidade Mínima <span className="text-xs font-normal text-slate-400">(Opcional)</span>
            </label>
            <Input
              id="minQuantity"
              placeholder="Ex: 10"
              type="number"
              step="0.01"
              value={formData.minQuantity}
              onChange={(e) => handleInputChange("minQuantity", e.target.value)}
              className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Quando o estoque atingir este valor, será marcado como "Baixo".
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Adicionar Insumo
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInsumo;