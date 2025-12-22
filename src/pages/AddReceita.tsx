import { ArrowLeft, Plus, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";
import { useProducts } from "@/contexts/ProductsContext";
import { useStock } from "@/contexts/StockContext";
import { useEquipment } from "@/contexts/EquipmentContext"; // Importando useEquipment

const AddReceita = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeYield, setRecipeYield] = useState("");
  const [laborTime, setLaborTime] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [linkedProduct, setLinkedProduct] = useState("");
  
  const { products } = useProducts();
  const { ingredients: availableIngredients, packagingItems: availablePackagingItems } = useStock();
  const { equipment: availableEquipment } = useEquipment(); // Usando useEquipment

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

  // Removendo a lista mockada, agora usamos availableEquipment do contexto

  const addIngredient = () => {
    if (selectedIngredient && ingredientQuantity) {
      const ingredient = availableIngredients.find(i => i.id === selectedIngredient);
      if (ingredient) {
        // Use unitCost from StockContext if available, otherwise mock
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
        // Use unitCost from StockContext if available, otherwise mock
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
        // Mock cost calculation for equipment usage time
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
  const laborCost = laborTime ? (parseFloat(laborTime) / 60) * 15 : 0; // Assuming R$15/hour
  const totalCost = ingredientsCost + packagingCost + equipmentCost + laborCost;
  const unitCost = recipeYield ? totalCost / parseFloat(recipeYield) : 0;
  const suggestedPrice = unitCost * 1.4; // 40% markup
  const currentSellingPrice = sellingPrice ? parseFloat(sellingPrice) : suggestedPrice;
  const unitProfit = currentSellingPrice - unitCost;
  const margin = unitCost > 0 ? (unitProfit / currentSellingPrice) * 100 : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement recipe creation logic
    console.log({
      recipeName,
      recipeYield,
      laborTime,
      sellingPrice,
      linkedProduct,
      ingredients,
      packaging,
      equipment
    });
    showSuccess("Receita salva com sucesso!");
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

      {/* Form */}
      <div className="flex-1 w-full overflow-y-auto no-scrollbar pb-32">
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-5">
          {/* Informações Básicas */}
          <div className="px-4 pt-6 pb-2">
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] mb-4">Informações da Receita</h2>
            <div className="space-y-4">
              {/* Nome da Receita */}
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
                {/* Rendimento */}
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
                {/* Mão de Obra */}
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
              {/* Preço Venda */}
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
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 opacity-80">Opcional. Deixe em branco para sugestão automática.</p>
              </label>
              {/* Produto Vinculado */}
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
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 opacity-80">Vincula o estoque produzido ao catálogo de vendas.</p>
              </label>
            </div>
          </div>

          <div className="h-4 bg-transparent"></div>
          <div className="h-px bg-slate-200 dark:bg-slate-800 mx-4"></div>
          <div className="h-4 bg-transparent"></div>

          {/* Ingredientes */}
          <div className="px-4">
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] mb-4">Ingredientes da Receita</h2>
            {/* Add Row */}
            <div className="flex items-end gap-2 mb-4">
              <div className="flex-1 min-w-0">
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">Ingrediente</label>
                <div className="relative">
                  <Select value={selectedIngredient} onValueChange={setSelectedIngredient}>
                    <SelectTrigger className="w-full h-[50px] bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 rounded-l-lg rounded-r-none">
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
              </div>
              <div className="w-20 shrink-0">
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5 text-center">Qtd</label>
                <Input
                  value={ingredientQuantity}
                  onChange={(e) => setIngredientQuantity(e.target.value)}
                  type="number"
                  className="w-full h-[50px] bg-white dark:bg-surface-dark border-y border-l border-slate-200 dark:border-slate-700 rounded-none text-center"
                  placeholder="0"
                />
              </div>
              <Button
                type="button"
                onClick={addIngredient}
                className="bg-primary hover:bg-primary/90 text-white h-[50px] w-[50px] rounded-r-lg border border-primary shrink-0 shadow-sm p-0"
              >
                <Plus size={24} />
              </Button>
            </div>
            {/* Added Items */}
            <div className="space-y-3 mb-2">
              {ingredients.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg bg-white/5 dark:bg-transparent">
                  <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-3xl mb-1">grocery</span>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Nenhum ingrediente adicionado.</p>
                </div>
              ) : (
                ingredients.map((ingredient) => (
                  <div key={ingredient.id} className="flex items-center justify-between bg-white dark:bg-surface-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-sm">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{ingredient.name}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{ingredient.quantity} {ingredient.unit} x R$ {ingredient.unitCost.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">R$ {ingredient.totalCost.toFixed(2)}</span>
                      <button
                        type="button"
                        onClick={() => removeIngredient(ingredient.id)}
                        className="text-red-500 dark:text-red-400 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="h-4 bg-transparent"></div>
          <div className="h-px bg-slate-200 dark:bg-slate-800 mx-4"></div>
          <div className="h-4 bg-transparent"></div>

          {/* Embalagens */}
          <div className="px-4">
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] mb-4">Embalagens</h2>
            <div className="flex items-end gap-2 mb-4">
              <div className="flex-1 min-w-0">
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">Embalagem</label>
                <div className="relative">
                  <Select value={selectedPackaging} onValueChange={setSelectedPackaging}>
                    <SelectTrigger className="w-full h-[50px] bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 rounded-l-lg rounded-r-none">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availablePackagingItems.map((pack) => (
                        <SelectItem key={pack.id} value={pack.id}>
                          {pack.name} ({pack.quantity} {pack.unit})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="w-20 shrink-0">
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5 text-center">Qtd</label>
                <Input
                  value={packagingQuantity}
                  onChange={(e) => setPackagingQuantity(e.target.value)}
                  type="number"
                  className="w-full h-[50px] bg-white dark:bg-surface-dark border-y border-l border-slate-200 dark:border-slate-700 rounded-none text-center"
                  placeholder="0"
                />
              </div>
              <Button
                type="button"
                onClick={addPackaging}
                className="bg-primary hover:bg-primary/90 text-white h-[50px] w-[50px] rounded-r-lg border border-primary shrink-0 shadow-sm p-0"
              >
                <Plus size={24} />
              </Button>
            </div>
            {packaging.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg bg-white/5 dark:bg-transparent">
                <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-3xl mb-1">inventory_2</span>
                <p className="text-sm text-slate-500 dark:text-slate-400">Nenhuma embalagem adicionada.</p>
              </div>
            ) : (
              <div className="space-y-3 mb-2">
                {packaging.map((pack) => (
                  <div key={pack.id} className="flex items-center justify-between bg-white dark:bg-surface-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-sm">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{pack.name}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{pack.quantity} {pack.unit}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removePackaging(pack.id)}
                      className="text-red-500 dark:text-red-400 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="h-4 bg-transparent"></div>
          <div className="h-px bg-slate-200 dark:bg-slate-800 mx-4"></div>
          <div className="h-4 bg-transparent"></div>

          {/* Equipamentos */}
          <div className="px-4">
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] mb-4">Equipamentos</h2>
            <div className="flex items-end gap-2 mb-4">
              <div className="flex-1 min-w-0">
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">Equipamento</label>
                <div className="relative">
                  <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
                    <SelectTrigger className="w-full h-[50px] bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 rounded-l-lg rounded-r-none">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableEquipment.map((equip) => (
                        <SelectItem key={equip.id} value={equip.id}>
                          {equip.name} ({equip.powerType === 'eletrico' ? `${equip.powerValue}W` : 'A Gás'})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="w-20 shrink-0">
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5 text-center">Min.</label>
                <Input
                  value={equipmentMinTime}
                  onChange={(e) => setEquipmentMinTime(e.target.value)}
                  type="number"
                  className="w-full h-[50px] bg-white dark:bg-surface-dark border-y border-l border-slate-200 dark:border-slate-700 rounded-none text-center"
                  placeholder="0"
                />
              </div>
              <Button
                type="button"
                onClick={addEquipment}
                className="bg-primary hover:bg-primary/90 text-white h-[50px] w-[50px] rounded-r-lg border border-primary shrink-0 shadow-sm p-0"
              >
                <Plus size={24} />
              </Button>
            </div>
            {equipment.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg bg-white/5 dark:bg-transparent">
                <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-3xl mb-1">microwave</span>
                <p className="text-sm text-slate-500 dark:text-slate-400">Nenhum equipamento adicionado.</p>
              </div>
            ) : (
              <div className="space-y-3 mb-2">
                {equipment.map((equip) => (
                  <div key={equip.id} className="flex items-center justify-between bg-white dark:bg-surface-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-sm">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{equip.name}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{equip.minTime} min (Custo/h: R$ {equip.unitCost.toFixed(2)})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">R$ {equip.totalCost.toFixed(2)}</span>
                      <button
                        type="button"
                        onClick={() => removeEquipment(equip.id)}
                        className="text-red-500 dark:text-red-400 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="h-8 bg-transparent"></div>

          {/* Prévia de Custos */}
          <div className="px-4 mb-8">
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] mb-4">Prévia de Custos</h2>
            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
              {/* Cost Breakdown */}
              <div className="space-y-2 mb-4 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Custo Ingredientes</span>
                  <span className="text-slate-900 dark:text-white font-medium">R$ {ingredientsCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Custo Embalagens</span>
                  <span className="text-slate-900 dark:text-white font-medium">R$ {packagingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Custo Equipamentos</span>
                  <span className="text-slate-900 dark:text-white font-medium">R$ {equipmentCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Custo Mão de Obra</span>
                  <span className="text-slate-900 dark:text-white font-medium">R$ {laborCost.toFixed(2)}</span>
                </div>
                <div className="h-px w-full bg-slate-200 dark:bg-slate-700 my-3 pt-3 flex justify-between font-bold text-base">
                  <span className="text-slate-900 dark:text-white">Custo Total Receita</span>
                  <span className="text-slate-900 dark:text-white">R$ {totalCost.toFixed(2)}</span>
                </div>
              </div>
              {/* Key Metrics Cards */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-background-light dark:bg-background-dark p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1 font-semibold">Custo Unitário</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">R$ {unitCost.toFixed(2)}</p>
                </div>
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg border border-primary/20">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1 font-semibold">Sugestão (40%)</p>
                  <p className="text-xl font-bold text-primary">R$ {suggestedPrice.toFixed(2)}</p>
                </div>
              </div>
              {/* Profit Analysis */}
              <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Preço Venda Atual</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">R$ {currentSellingPrice.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-slate-200 dark:border-slate-700 pt-3">
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase mb-1">Lucro Unitário</p>
                    <p className="text-sm font-bold text-green-600 dark:text-green-400">R$ {unitProfit.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase mb-1">Margem Real</p>
                    <p className="text-sm font-bold text-green-600 dark:text-green-400">{margin.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 flex h-20 pb-4 items-center justify-around bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 backdrop-blur-lg bg-opacity-95">
        <Link to="/visao-geral" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-medium">Início</span>
        </Link>
        <Link to="/gestao-pedidos" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">list_alt</span>
          <span className="text-[10px] font-medium">Pedidos</span>
        </Link>
        <Link to="/gestao-produtos" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">inventory</span>
          <span className="text-[10px] font-medium">Produtos</span>
        </Link>
        <button className="flex flex-col items-center gap-1 p-2 w-16 text-primary">
          <span className="material-symbols-outlined fill-current">settings</span>
          <span className="text-[10px] font-medium">Ajustes</span>
        </button>
      </nav>
    </div>
  );
};

export default AddReceita;