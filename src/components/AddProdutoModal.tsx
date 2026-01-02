"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Plus, Save, Loader2 } from "lucide-react";
import { useProducts, Product } from "@/contexts/ProductsContext";
import { useRecipes } from "@/contexts/RecipesContext";
import { showSuccess, showError } from "@/utils/toast";

interface AddProdutoModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

const AddProdutoModal = ({ isOpen, onClose, productToEdit }: AddProdutoModalProps) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [recipeId, setRecipeId] = useState("none");
  const [isActive, setIsActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addProduct, updateProduct } = useProducts();
  const { recipes } = useRecipes();

  useEffect(() => {
    if (isOpen) {
      if (productToEdit) {
        setProductName(productToEdit.name || "");
        setDescription(productToEdit.description || "");
        setPrice(productToEdit.price?.toString() || "");
        setImageUrl(productToEdit.image || "");
        setIsActive(productToEdit.isActive ?? true);
        setRecipeId(productToEdit.recipeId || "none");
      } else {
        setProductName("");
        setDescription("");
        setPrice("");
        setImageUrl("");
        setRecipeId("none");
        setIsActive(true);
      }
      setIsSubmitting(false);
    }
  }, [productToEdit, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productName || !price) {
      showError("Por favor, preencha o nome e o preço do produto.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const productData = {
        name: productName,
        price: parseFloat(price),
        image: imageUrl || "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=300",
        description: description,
        isActive: isActive,
        recipeId: recipeId === "none" ? undefined : recipeId,
        rating: productToEdit?.rating || 5.0,
        reviews: productToEdit?.reviews || 0,
        stock: productToEdit?.stock || 0
      };

      if (productToEdit) {
        await updateProduct(productToEdit.id, productData);
        showSuccess(`${productName} atualizado com sucesso!`);
      } else {
        await addProduct(productData);
        showSuccess(`${productName} adicionado com sucesso!`);
      }
      
      // Reset form and close
      setProductName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
      setRecipeId("none");
      setIsActive(true);
      onClose();
    } catch (error: any) {
      console.error("Erro ao salvar produto:", error);
      showError(error.message || "Erro ao salvar produto. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open && !isSubmitting) {
        onClose();
      }
    }}>
      <DialogContent className="max-w-md mx-auto bg-background-light dark:bg-background-dark border-slate-200 dark:border-slate-800 p-0 max-h-[90vh] overflow-hidden">
        <DialogHeader className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex items-center justify-center size-10 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors p-0"
            >
              <ArrowLeft size={24} />
            </Button>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Produtos</span>
              <DialogTitle className="text-xl font-bold leading-tight tracking-tight text-left">
                {productToEdit ? "Editar Produto" : "Adicionar Novo"}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent max-h-[calc(90vh-120px)]">
          <form id="product-form" onSubmit={handleSubmit} className="p-4 flex flex-col gap-5">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="product_name">
                  Nome do Produto
                </label>
                <Input
                  id="product_name"
                  placeholder="Ex: Ninho com Nutella"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="product_desc">
                  Descrição <span className="text-xs font-normal text-slate-400">(Opcional)</span>
                </label>
                <Textarea
                  id="product_desc"
                  placeholder="Descreva os ingredientes e sabor..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 resize-none"
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="product_price">
                  Preço (R$)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">R$</span>
                  </div>
                  <Input
                    id="product_price"
                    placeholder="0,00"
                    step="0.01"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 pl-10 font-medium"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-200 dark:bg-slate-800 w-full my-1"></div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="product_image">
                  URL da Imagem <span className="text-xs font-normal text-slate-400">(Opcional)</span>
                </label>
                <Input
                  id="product_image"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="product_recipe">
                  Vincular à Receita <span className="text-xs font-normal text-slate-400">(Opcional)</span>
                </label>
                <Select value={recipeId} onValueChange={setRecipeId} disabled={isSubmitting}>
                  <SelectTrigger className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700">
                    <SelectValue placeholder="Selecione uma receita" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhuma Receita</SelectItem>
                    {recipes.map((recipe) => (
                      <SelectItem key={recipe.id} value={recipe.id.toString()}>
                        {recipe.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 shadow-sm mt-2">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Ativo para Vendas</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Produto visível no catálogo</span>
                </div>
                <Switch
                  checked={isActive}
                  onCheckedChange={setIsActive}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full bg-primary hover:bg-blue-700 text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
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
};

export default AddProdutoModal;