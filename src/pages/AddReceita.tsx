import { ArrowLeft, Plus, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const AddReceita = () => {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [yield, setYield] = useState("");
  const [cost, setCost] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [linkedProduct, setLinkedProduct] = useState("none");
  const [isActive, setIsActive] = useState(true);

  const products = [
    { id: "none", name: "Nenhum Produto" },
    { id: "1", name: "Ninho com Nutella" },
    { id: "2", name: "Morango Gourmet" },
    { id: "3", name: "Maracujá Trufado" },
    { id: "4", name: "Paçoca Cremosa" },
    { id: "5", name: "Coco Cremoso" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement recipe creation logic
    console.log({
      recipeName,
      description,
      prepTime,
      yield,
      cost,
      imageUrl,
      linkedProduct,
      isActive
    });
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            to="/gestao-receitas"
            className="flex items-center justify-center size-10 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Receitas</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Adicionar Nova</h1>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="flex-1 w-full overflow-y-auto no-scrollbar pb-32">
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-5">
          {/* Recipe Info Section */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="recipe_name">
                Nome da Receita
              </label>
              <Input
                id="recipe_name"
                placeholder="Ex: Ninho com Nutella"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="recipe_desc">
                Descrição <span className="text-xs font-normal text-slate-400">(Opcional)</span>
              </label>
              <Textarea
                id="recipe_desc"
                placeholder="Descreva os ingredientes e modo de preparo..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="prep_time">
                  Tempo de Preparo
                </label>
                <div className="relative">
                  <Input
                    id="prep_time"
                    placeholder="45"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                    className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 pr-12"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                    min
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="yield">
                  Rendimento
                </label>
                <div className="relative">
                  <Input
                    id="yield"
                    placeholder="20"
                    value={yield}
                    onChange={(e) => setYield(e.target.value)}
                    className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 pr-12"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                    un
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="cost">
                Custo Unitário (R$)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">R$</span>
                </div>
                <Input
                  id="cost"
                  placeholder="1,50"
                  step="0.01"
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 pl-10 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-200 dark:bg-slate-800 w-full my-1"></div>

          {/* Additional Settings Section */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="recipe_image">
                URL da Imagem <span className="text-xs font-normal text-slate-400">(Opcional)</span>
              </label>
              <div className="relative">
                <Input
                  id="recipe_image"
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
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="linked_product">
                Produto Vinculado <span className="text-xs font-normal text-slate-400">(Opcional)</span>
              </label>
              <Select value={linkedProduct} onValueChange={setLinkedProduct}>
                <SelectTrigger className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700">
                  <SelectValue placeholder="Nenhum Produto" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 shadow-sm mt-2">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Receita Ativa</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Disponível para produção</span>
              </div>
              <Switch
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="mt-4 w-full bg-primary hover:bg-blue-700 text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Salvar Receita
          </Button>
        </form>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-background-dark/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 pb-safe z-40 max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
          <Link to="/visao-geral" className="flex flex-col items-center justify-center gap-1 w-full h-full text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors">
            <span className="material-symbols-outlined mb-1">home</span>
            <span className="text-[10px] font-medium">Início</span>
          </Link>
          <button className="flex flex-col items-center justify-center gap-1 w-full h-full text-primary dark:text-primary transition-colors">
            <span className="material-symbols-outlined mb-1 filled">receipt_long</span>
            <span className="text-[10px] font-medium">Receitas</span>
          </button>
          <Link to="/gestao-insumos" className="flex flex-col items-center justify-center gap-1 w-full h-full text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors">
            <span className="material-symbols-outlined mb-1">inventory</span>
            <span className="text-[10px] font-medium">Estoque</span>
          </Link>
          <Link to="/configuracoes-admin" className="flex flex-col items-center justify-center gap-1 w-full h-full text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors">
            <span className="material-symbols-outlined mb-1">settings</span>
            <span className="text-[10px] font-medium">Ajustes</span>
          </Link>
        </div>
      </nav>
      {/* Safe area spacer for bottom nav */}
      <div className="h-6 w-full bg-white dark:bg-background-dark"></div>
    </div>
  );
};

export default AddReceita;