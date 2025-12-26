import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStock } from "@/contexts/StockContext";
import { showSuccess, showError } from "@/utils/toast";

const EditInsumo = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get('id');
  const { ingredients, packagingItems, updateIngredient, updatePackagingItem } = useStock();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [minQuantity, setMinQuantity] = useState("");

  useEffect(() => {
    if (itemId) {
      const allItems = [...ingredients, ...packagingItems];
      const item = allItems.find(i => i.id === itemId);
      if (item) {
        setName(item.name);
        setCategory(item.category);
        setQuantity(item.quantity.toString());
        setUnit(item.unit);
        setMinQuantity(item.minQuantity?.toString() || "");
      }
    }
  }, [itemId, ingredients, packagingItems]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemId || !name) return;

    const updates = {
      name,
      quantity: parseFloat(quantity) || 0,
      unit,
      minQuantity: minQuantity ? parseFloat(minQuantity) : undefined
    };

    try {
      if (category === "Ingredientes") {
        updateIngredient(itemId, updates);
      } else {
        updatePackagingItem(itemId, updates);
      }
      showSuccess("Insumo atualizado com sucesso!");
      navigate("/gestao-estoque");
    } catch (error) {
      showError("Erro ao atualizar insumo");
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
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Estoque</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Editar Insumo</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 pb-32 space-y-6">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nome do Insumo</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome do insumo"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Categoria</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ingredientes">Ingredientes</SelectItem>
                  <SelectItem value="Embalagens">Embalagens</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Quantidade Atual</label>
              <Input
                type="number"
                step="0.01"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Unidade</label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
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
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Quantidade Mínima</label>
              <Input
                type="number"
                step="0.01"
                value={minQuantity}
                onChange={(e) => setMinQuantity(e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.98]">
              <Save size={20} className="mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditInsumo;