"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Plus, Save, Loader2 } from "lucide-react";
import { useProducts, Product } from "@/contexts/ProductsContext";
import { useRecipes } from "@/contexts/RecipesContext";
import { showSuccess, showError } from "@/utils/toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

const Field = ({ label, optional, ...props }: any) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold">
      {label}
      {optional && (
        <span className="text-xs font-normal text-slate-400"> (Opcional)</span>
      )}
    </label>
    <Input {...props} className="h-12" />
  </div>
);

export default function AddProdutoModal({
  isOpen,
  onClose,
  productToEdit,
}: Props) {
  const { addProduct, updateProduct } = useProducts();
  const { recipes } = useRecipes();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    recipeId: "none",
    isActive: true,
  });

  const setField = (k: string, v: any) =>
    setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    if (!isOpen) return;

    productToEdit
      ? setForm({
          name: productToEdit.name,
          description: productToEdit.description || "",
          price: String(productToEdit.price),
          image: productToEdit.image || "",
          recipeId: productToEdit.recipeId || "none",
          isActive: productToEdit.isActive ?? true,
        })
      : setForm({
          name: "",
          description: "",
          price: "",
          image: "",
          recipeId: "none",
          isActive: true,
        });

    setLoading(false);
  }, [productToEdit, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price)
      return showError("Nome e preço são obrigatórios.");

    setLoading(true);
    try {
      const data = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        image:
          form.image ||
          "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
        isActive: form.isActive,
        recipeId: form.recipeId === "none" ? undefined : form.recipeId,
        rating: productToEdit?.rating || 5,
        reviews: productToEdit?.reviews || 0,
        stock: productToEdit?.stock || 0,
      };

      productToEdit
        ? await updateProduct(productToEdit.id, data)
        : await addProduct(data);

      showSuccess(
        `${form.name} ${
          productToEdit ? "atualizado" : "adicionado"
        } com sucesso!`
      );
      onClose();
    } catch (err: any) {
      console.error(err);
      showError(err.message || "Erro ao salvar produto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !loading && !o && onClose()}>
      <DialogContent className="max-w-md p-0 max-h-[90vh] overflow-hidden">
        <DialogHeader className="px-4 py-3 border-b flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={loading}>
            <ArrowLeft size={22} />
          </Button>
          <DialogTitle className="text-xl font-bold">
            {productToEdit ? "Editar Produto" : "Adicionar Produto"}
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="p-4 space-y-5">
            <Field
              label="Nome do Produto"
              value={form.name}
              onChange={(e: any) => setField("name", e.target.value)}
              required
              disabled={loading}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold">
                Descrição <span className="text-xs text-slate-400">(Opcional)</span>
              </label>
              <Textarea
                rows={3}
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">R$</span>
              <Input
                type="number"
                step="0.01"
                className="pl-10 h-12"
                value={form.price}
                onChange={(e) => setField("price", e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <Field
              label="URL da Imagem"
              optional
              value={form.image}
              onChange={(e: any) => setField("image", e.target.value)}
              disabled={loading}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold">
                Vincular à Receita <span className="text-xs">(Opcional)</span>
              </label>
              <Select
                value={form.recipeId}
                onValueChange={(v) => setField("recipeId", v)}
                disabled={loading}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhuma</SelectItem>
                  {recipes.map((r) => (
                    <SelectItem key={r.id} value={String(r.id)}>
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between items-center p-3 border rounded-xl">
              <div>
                <p className="text-sm font-semibold">Ativo para vendas</p>
                <p className="text-xs text-slate-500">
                  Visível no catálogo
                </p>
              </div>
              <Switch
                checked={form.isActive}
                onCheckedChange={(v) => setField("isActive", v)}
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Salvando...
                </>
              ) : (
                <>
                  {productToEdit ? <Save size={20} /> : <Plus size={20} />}
                  {productToEdit ? "Salvar Alterações" : "Adicionar Produto"}
                </>
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
