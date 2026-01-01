import { ArrowLeft, Plus, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess, showError } from "@/utils/toast";
import { useStock } from "@/contexts/StockContext";

const AddInsumo = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    minQuantity: ""
  });

  const { addIngredient, addPackagingItem, fetchProducts } = useStock();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.category) {
      showError("Por favor, preencha o nome e a categoria do insumo.");
      return;
    }

    setIsSubmitting(true);
    try {
      const newItem = {
        name: formData.name,
        unit: formData.unit || "un",
        quantity: parseFloat(formData.quantity || "0"),
        unitCost: 0,
        minQuantity: formData.minQuantity ? parseFloat(formData.minQuantity) : undefined,
        category: formData.category,
        icon: formData.category === "Ingredientes" ? "Cookie" : "Package",
        status: "Em dia"
      };

      let result;
      if (formData.category === "Ingredientes") {
        result = await addIngredient(newItem);
      } else {
        result = await addPackagingItem(newItem);
      }

      if (!result) throw new Error("Erro ao adicionar insumo.");

      showSuccess(`"${formData.name}" foi adicionado ao estoque!`);
      setFormData({
        name: "",
        category: "",
        quantity: "",
        unit: "",
        minQuantity: ""
      });
      // await fetchProducts(); // Fetch products after adding
      navigate("/gestao-estoque");
    } catch (error: any) {
      console.error("Erro ao salvar produto:", error);
      showError(error.message || "Erro ao salvar produto. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            to="/gestao-estoque"
            className="flex items-center justify-center size-10 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Insumos</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Adicionar Insumo</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 pb-32">
        <form onSubmit={handleSubmit} className="space-y-6">
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
              disabled={isSubmitting}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="category">
              Categoria
            </label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)} disabled={isSubmitting}>
              <SelectTrigger className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ingredientes">Ingredientes</SelectItem>
                <SelectItem value="Embalagens">Embalagens</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="quantity">
                Quantidade Inicial
              </label>
              <Input
                id="quantity"
                placeholder="0"
                type="number"
                step="0.01"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
                disabled={isSubmitting}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="unit">
                Unidade
              </label>
              <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)} disabled={isSubmitting}>
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

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="minQuantity">
              Quantidade Mínima
            </label>
            <Input
              id="minQuantity"
              placeholder="Ex: 10"
              type="number"
              step="0.01"
              value={formData.minQuantity}
              onChange={(e) => handleInputChange("minQuantity", e.target.value)}
              className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
              disabled={isSubmitting}
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Salvando...
                </>
              ) : (
                <>
                  <Plus size={20} />
                  Adicionar Insumo
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInsumo;