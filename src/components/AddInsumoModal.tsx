import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useStock } from "@/contexts/StockContext";
import { showSuccess, showError } from "@/utils/toast";
import { ArrowLeft, Save } from "lucide-react";

const AddInsumoModal = () => {
  const { addIngredient, addPackagingItem } = useStock();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "un",
    minQuantity: "",
  });

  const setField = (k: string, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.category) {
      showError("Por favor, preencha o nome e a categoria do insumo.");
      return;
    }

    const parsedQuantity = parseFloat(form.quantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      showError("Por favor, insira uma quantidade válida (maior que zero).");
      return;
    }

    setIsSubmitting(true);
    try {
      const newItem = {
        name: form.name,
        unit: form.unit || "un",
        quantity: parsedQuantity,
        unitCost: 0,
        minQuantity: form.minQuantity ? parseFloat(form.minQuantity) : undefined,
        category: form.category,
        icon: form.category === "Ingredientes" ? "Cookie" : "Package",
        status: "Em dia",
      };

      if (form.category === "Ingredientes") {
        await addIngredient(newItem);
      } else {
        await addPackagingItem(newItem);
      }

      showSuccess(`"${form.name}" foi adicionado ao estoque!`);
      // navigate("/gestao-estoque");
    } catch (error: any) {
      console.error("[AddInsumo] Erro ao salvar insumo:", error);
      showError(error.message || "Erro ao salvar insumo. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onClose={() => {}} >
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <DialogHeader className="px-4 py-3 border-b">
          <div className="flex items-center gap-3">
            <DialogTitle className="text-lg font-bold">
              Adicionar Insumo
            </DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Insumo</Label>
            <Input
              id="name"
              placeholder="Ex: Leite Condensado"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Categoria</Label>
            <Select value={form.category} onValueChange={(value) => setField("category", value)} disabled={isSubmitting}>
              <SelectTrigger className="h-12">
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
              <Label htmlFor="quantity">Quantidade Inicial</Label>
              <Input
                id="quantity"
                placeholder="0"
                type="number"
                step="0.01"
                value={form.quantity}
                onChange={(e) => setField("quantity", e.target.value)}
                className="h-12"
                disabled={isSubmitting}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="unit">Unidade</Label>
              <Select value={form.unit} onValueChange={(value) => setField("unit", value)} disabled={isSubmitting}>
                <SelectTrigger className="h-12">
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
            <Label htmlFor="minQuantity">Quantidade Mínima</Label>
            <Input
              id="minQuantity"
              placeholder="Ex: 10"
              type="number"
              step="0.01"
              value={form.minQuantity}
              onChange={(e) => setField("minQuantity", e.target.value)}
              className="h-12"
              disabled={isSubmitting}
            />
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Salvando...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Adicionar Insumo
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}