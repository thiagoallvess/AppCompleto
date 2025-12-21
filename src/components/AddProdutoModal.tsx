import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Plus } from "lucide-react";
import { useProducts } from "@/contexts/ProductsContext";

interface AddProdutoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProdutoModal = ({ isOpen, onClose }: AddProdutoModalProps) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isPromotion, setIsPromotion] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [recipeId, setRecipeId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const { addProduct } = useProducts();

  const recipes = [
    { id: "none", name: "Nenhuma Receita" },
    { id: "1", name: "Ninho com Calda de Morango" },
    { id: "2", name: "Geladinho de Sensacao com Calda de Morango" },
    { id: "3", name: "Geladinho de Sensacao com Chocolate" },
    { id: "4", name: "Geladinho de Pudim" },
    { id: "5", name: "Geladinho de Prestigio" },
    { id: "6", name: "Geladinho de Maracuja com Calda de Maracuja" },
    { id: "7", name: "Ninho com Nutella" },
    { id: "8", name: "Laka com Oreo" },
    { id: "9", name: "Geladinho de Coco" },
    { id: "10", name: "Acai com Leite Condensado" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now().toString(),
      name: productName,
      price: parseFloat(price) || 0,
      image: imageUrl || "https://via.placeholder.com/300x200?text=Produto",
      description: description,
      rating: 0,
      reviews: 0
    };
    addProduct(newProduct);
    // Reset form and close modal
    setProductName("");
    setDescription("");
    setPrice("");
    setIsPromotion(false);
    setImageUrl("");
    setRecipeId("");
    setIsActive(true);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-background-light dark:bg-background-dark border-slate-200 dark:border-slate-800 p-0 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <DialogHeader className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="flex items-center justify-center size-10 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors p-0"
            >
              <ArrowLeft size={24} />
            </Button>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Produtos</span>
              <DialogTitle className="text-xl font-bold leading-tight tracking-tight text-left">Adicionar Novo</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        {/* Form */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-5">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
<dyad-write path="src/components/AddProdutoModal.tsx" description="Completing the AddProdutoModal update to use ProductsContext">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="product_name">
                  Nome do Produto
                </label>
                <Input
                  id="product_name"
                  placeholder="Ex: Ninho com Nutella"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
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
                    step="0.50"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 pl-10 font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Produto em Promoção</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Aplicar desconto promocional</span>
                </div>
                <Switch
                  checked={isPromotion}
                  onCheckedChange={setIsPromotion}
                />
              </div>
            </div>

            <div className="h-px bg-slate-200 dark:bg-slate-800 w-full my-1"></div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="product_image">
                  URL da Imagem <span className="text-xs font-normal text-slate-400">(Opcional)</span>
                </label>
                <div className="relative">
                  <Input
                    id="product_image"
                    placeholder="https://..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 pr-10"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="product_recipe">
                  Vincular à Receita <span className="text-xs font-normal text-slate-400">(Opcional)</span>
                </label>
                <Select value={recipeId} onValueChange={setRecipeId}>
                  <SelectTrigger className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700">
                    <SelectValue placeholder="Nenhuma Receita" />
                  </SelectTrigger>
                  <SelectContent>
                    {recipes.map((recipe) => (
                      <SelectItem key={recipe.id} value={recipe.id}>
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
                />
              </div>
            </div>

            <Button
              type="submit"
              className="mt-4 w-full bg-primary hover:bg-blue-700 text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Adicionar Produto
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProdutoModal;