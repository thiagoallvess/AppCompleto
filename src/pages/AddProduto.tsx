import { ArrowLeft, Home, IceCream, Receipt, Settings, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";
import { useRecipes } from "@/contexts/RecipesContext";
import { useProducts } from "@/contexts/ProductsContext";

const AddProduto = () => {
  const navigate = useNavigate();
  const { recipes } = useRecipes();
  const { addProduct } = useProducts();
  
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [linkedRecipe, setLinkedRecipe] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productName || !price) {
      alert("Por favor, preencha pelo menos o nome e o preço do produto.");
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: productName,
      price: parseFloat(price),
      image: imageUrl || "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=300",
      description: description,
      rating: 5.0,
      reviews: 0,
      stock: 0,
      isActive: isActive,
      recipeId: linkedRecipe === "none" ? "" : linkedRecipe
    };

    addProduct(newProduct);
    showSuccess(`Produto "${productName}" adicionado com sucesso!`);
    navigate("/gestao-produtos");
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            to="/gestao-produtos"
            className="flex items-center justify-center size-10 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Produtos</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Novo Produto</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 pb-32 space-y-6">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nome do Produto</label>
              <Input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Ex: Ninho com Nutella"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Preço (R$)</label>
              <Input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0,00"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Descrição</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva os ingredientes e sabor..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">URL da Imagem</label>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Receita Vinculada</label>
              <Select value={linkedRecipe} onValueChange={setLinkedRecipe}>
                <SelectTrigger>
                  <SelectValue placeholder="Nenhuma receita" />
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
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Produto Ativo</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Visível no catálogo</p>
            </div>
            <div className="relative flex h-[24px] w-[44px] cursor-pointer items-center rounded-full border-none bg-slate-300 dark:bg-slate-700 p-0.5 transition-all duration-300">
              <input
                type="checkbox"
                className="sr-only"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
              <div className={`h-[20px] w-[20px] rounded-full bg-white shadow-sm transform transition-transform ${isActive ? 'translate-x-5' : ''}`}></div>
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.98]">
              <Plus className="mr-2" size={20} />
              Adicionar Produto
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddProduto;