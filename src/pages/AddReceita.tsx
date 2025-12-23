import { ArrowLeft, Plus, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";
import { useProducts } from "@/contexts/ProductsContext";
import { useStock } from "@/contexts/StockContext";
import { useEquipment } from "@/contexts/EquipmentContext";
import { useRecipes } from "@/contexts/RecipesContext";

const AddReceita = () => {
  const navigate = useNavigate();
  const { addRecipe } = useRecipes();
  const { products } = useProducts();
  const { ingredients: availableIngredients, packagingItems: availablePackagingItems } = useStock();
  const { equipment: availableEquipment } = useEquipment();

  const [recipeName, setRecipeName] = useState("");
  const [recipeYield, setRecipeYield] = useState("");
  const [laborTime, setLaborTime] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [linkedProduct, setLinkedProduct] = useState("");
  
  // Ingredients state
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");

  // Packaging state
  const [packaging, setPackaging] = useState<any[]>([]);
  const [selectedPackaging, setSelectedPackaging] = useState("");
  const [packagingQuantity, setPackagingQuantity] = useState("");

  // Equipment state
  const [equipment, setEquipment] = useState<any[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [equipmentMinTime, setEquipmentMinTime] = useState("");

  const addIngredient = () => {
    if (selectedIngredient && ingredientQuantity) {
      const ingredient = availableIngredients.find(i => i.id === selectedIngredient);
      if (ingredient) {
        const unitCost = ingredient.unitCost || 0;
        const totalCost = parseFloat(ingredientQuantity) * unitCost;
        
        const newIngredient = {
          id: Date.now(),
          name: ingredient.name,
          quantity: parseFloat(ingredientQuantity),
          unit: ingredient.unit,
          unitCost,
          totalCost
        };
        setIngredients([...ingredients, newIngredient]);
        setSelectedIngredient("");
        setIngredientQuantity("");
      }
    }
  };

  const removeIngredient = (id: number) => {
    setIngredients(ingredients.filter(i => i.id !== id));
  };

  const addPackaging = () => {
    if (selectedPackaging && packagingQuantity) {
      const pack = availablePackagingItems.find(p => p.id === selectedPackaging);
      if (pack) {
        const unitCost = pack.unitCost || 0;
        const totalCost = parseFloat(packagingQuantity) * unitCost;

        const newPackaging = {
          id: Date.now(),
          name: pack.name,
          quantity: parseFloat(packagingQuantity),
          unit: pack.unit,
          unitCost,
          totalCost
        };
        setPackaging([...packaging, newPackaging]);
        setSelectedPackaging("");
        setPackagingQuantity("");
      }
    }
  };

  const removePackaging = (id: number) => {
    setPackaging(packaging.filter(p => p.id !== id));
  };

  const addEquipment = () => {
    if (selectedEquipment && equipmentMinTime) {
      const equip = availableEquipment.find(e => e.id === selectedEquipment);
      if (equip) {
        const costPerHour = equip.costPerHour || 0;
        const totalCost = (parseFloat(equipmentMinTime) / 60) * costPerHour;

        const newEquipment = {
          id: Date.now(),
          name: equip.name,
          minTime: parseFloat(equipmentMinTime),
          unitCost: costPerHour,
          totalCost: totalCost
        };
        setEquipment([...equipment, newEquipment]);
        setSelectedEquipment("");
        setEquipmentMinTime("");
      }
    }
  };

  const removeEquipment = (id: number) => {
    setEquipment(equipment.filter(e => e.id !== id));
  };

  // Cost calculations
  const ingredientsCost = ingredients.reduce((sum, i) => sum + i.totalCost, 0);
  const packagingCost = packaging.reduce((sum, p) => sum + p.totalCost, 0);
  const equipmentCost = equipment.reduce((sum, e) => sum + e.totalCost, 0);
  const laborCost = laborTime ? (parseFloat(laborTime) / 60) * 15 : 0; 
  const totalCost = ingredientsCost + packagingCost + equipmentCost + laborCost;
  const unitCost = recipeYield ? totalCost / parseFloat(recipeYield) : 0;
  const suggestedPrice = unitCost * 1.4;
  const currentSellingPrice = sellingPrice ? parseFloat(sellingPrice) : suggestedPrice;
  const unitProfit = currentSellingPrice - unitCost;
  const margin = unitCost > 0 ? (unitProfit / currentSellingPrice) * 100 : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipeName || !recipeYield) {
      alert("Por favor, preencha o nome e o rendimento da receita.");
      return;
    }

    const newRecipe = {
      id: Date.now(),
      name: recipeName,
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=300", // Imagem padrão
      time: `${laborTime || 0} min`,
      quantity: parseInt(recipeYield),
      cost: unitCost,
      isDraft: false
    };

    addRecipe(newRecipe);
    showSuccess("Receita salva com sucesso!");
    navigate("/gestao-receitas");
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
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
            <h1 className="text-xl font-bold leading-tight tracking-tight">Nova Receita</h1>
          </div>
        </div>
        <div className="flex items-center justify-end pr-4">
          <Button
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90 text-white font-bold px-3 py-1.5 rounded-full transition-colors"
          >
            Salvar
          </Button>
        </div>
      </header>

      <div className="flex-1 w-full overflow-y-auto no-scrollbar pb-32">
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-5">
          <div className="px-4 pt-6 pb-2">
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] mb-4">Informações da Receita</h2>
            <div className="space-y-4">
              <label className="flex flex-col w-full">
                <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">Nome da Receita</p>
                <Input
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  className="h-14 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
                  placeholder="Ex: Geladinho de Morango"
                />
              </label>
              <div className="flex gap-4">
                <label className="flex flex-col flex-1 min-w-[120px]">
                  <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2 truncate">Rendimento (unid)</p>
                  <Input
                    value={recipeYield}
                    onChange={(e) => setRecipeYield(e.target.value)}
                    type="number"
                    className="h-14 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
                    placeholder="0"
                  />
                </label>
                <label className="flex flex-col flex-1 min-w-[120px]">
                  <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2 truncate">Mão de Obra (min)</p>
                  <Input
                    value={laborTime}
                    onChange={(e) => setLaborTime(e.target.value)}
                    type="number"
                    className="h-14 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
                    placeholder="0"
                  />
                </label>
              </div>
              <label className="flex flex-col w-full">
                <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">Preço de Venda Unitário (R$)</p>
                <Input
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  type="number"
                  step="0.01"
                  className="h-14 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
                  placeholder="0,00"
                />
              </label>
              <label className="flex flex-col w-full">
                <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">Vincular a um Produto</p>
                <Select value={linkedProduct} onValueChange={setLinkedProduct}>
                  <SelectTrigger className="h-14 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700">
                    <SelectValue placeholder="Nenhum Produto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhum Produto</SelectItem>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
            </div>
          </div>

          <div className="h-px bg-slate-200 dark:bg-slate-800 mx-4"></div>

          <div className="px-4">
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] mb-4">Ingredientes</h2>
            <div className="flex items-end gap-2 mb-4">
              <div className="flex-1 min-w-0">
                <Select value={selectedIngredient} onValueChange={setSelectedIngredient}>
                  <SelectTrigger className="w-full h-[50px] bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700">
                    <SelectValue placeholder="Selecione um ingrediente..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableIngredients.map((ingredient) => (
                      <SelectItem key={ingredient.id} value={ingredient.id}>
                        {ingredient.name} ({ingredient.quantity.toFixed(2)} {ingredient.unit})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-20 shrink-0">
                <Input
                  value={ingredientQuantity}
                  onChange={(e) => setIngredientQuantity(e.target.value)}
                  type="number"
                  className="w-full h-[50px] bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 text-center"
                  placeholder="Qtd"
                />
              </div>
              <Button
                type="button"
                onClick={addIngredient}
                className="bg-primary hover:bg-primary/90 text-white h-[50px] w-[50px] shrink-0 p-0"
              >
                <Plus size={24} />
              </Button>
            </div>
            <div className="space-y-3">
              {ingredients.map((ingredient) => (
                <div key={ingredient.id} className="flex items-center justify-between bg-white dark:bg-surface-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{ingredient.name}</span>
                    <span className="text-xs text-slate-500">{ingredient.quantity} {ingredient.unit}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold">R$ {ingredient.totalCost.toFixed(2)}</span>
                    <button type="button" onClick={() => removeIngredient(ingredient.id)} className="text-red-500">
                      <Plus className="rotate-45" size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-200 dark:bg-slate-800 mx-4"></div>

          <div className="px-4">
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] mb-4">Embalagens</h2>
            <div className="flex items-end gap-2 mb-4">
              <div className="flex-1 min-w-0">
                <Select value={selectedPackaging} onValueChange={setSelectedPackaging}>
                  <SelectTrigger className="w-full h-[50px] bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePackagingItems.map((pack) => (
                      <SelectItem key={pack.id} value={pack.id}>
                        {pack.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-20 shrink-0">
                <Input
                  value={packagingQuantity}
                  onChange={(e) => setPackagingQuantity(e.target.value)}
                  type="number"
                  className="w-full h-[50px] bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 text-center"
                  placeholder="Qtd"
                />
              </div>
              <Button type="button" onClick={addPackaging} className="bg-primary h-[50px] w-[50px] p-0">
                <Plus size={24} />
              </Button>
            </div>
            <div className="space-y-3">
              {packaging.map((pack) => (
                <div key={pack.id} className="flex items-center justify-between bg-white dark:bg-surface-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{pack.name}</span>
                    <span className="text-xs text-slate-500">{pack.quantity} {pack.unit}</span>
                  </div>
                  <button type="button" onClick={() => removePackaging(pack.id)} className="text-red-500">
                    <Plus className="rotate-45" size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-200 dark:bg-slate-800 mx-4"></div>

          <div className="px-4">
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] mb-4">Equipamentos</h2>
            <div className="flex items-end gap-2 mb-4">
              <div className="flex-1 min-w-0">
                <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
                  <SelectTrigger className="w-full h-[50px] bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableEquipment.map((equip) => (
                      <SelectItem key={equip.id} value={equip.id}>
                        {equip.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-20 shrink-0">
                <Input
                  value={equipmentMinTime}
                  onChange={(e) => setEquipmentMinTime(e.target.value)}
                  type="number"
                  className="w-full h-[50px] bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 text-center"
                  placeholder="Min"
                />
              </div>
              <Button type="button" onClick={addEquipment} className="bg-primary h-[50px] w-[50px] p-0">
                <Plus size={24} />
              </Button>
            </div>
            <div className="space-y-3">
              {equipment.map((equip) => (
                <div key={equip.id} className="flex items-center justify-between bg-white dark:bg-surface-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{equip.name}</span>
                    <span className="text-xs text-slate-500">{equip.minTime} min</span>
                  </div>
                  <button type="button" onClick={() => removeEquipment(equip.id)} className="text-red-500">
                    <Plus className="rotate-45" size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 mb-8">
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] mb-4">Prévia de Custos</h2>
            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
              <div className="space-y-2 mb-4 text-sm text-slate-500">
                <div className="flex justify-between">
                  <span>Custo Total</span>
                  <span className="text-slate-900 dark:text-white font-bold">R$ {totalCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Custo Unitário</span>
                  <span className="text-slate-900 dark:text-white font-bold">R$ {unitCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Margem Real</span>
                  <span className="text-green-600 font-bold">{margin.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReceita;