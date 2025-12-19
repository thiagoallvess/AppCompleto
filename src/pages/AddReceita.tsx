import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  totalCost: number;
}

interface Packaging {
  id: string;
  name: string;
  quantity: number;
  costPerUnit: number;
  totalCost: number;
}

interface Equipment {
  id: string;
  name: string;
  minTime: number;
  costPerHour: number;
  totalCost: number;
}

const AddReceita = () => {
  const [recipeName, setRecipeName] = useState("");
  const [yieldUnits, setYieldUnits] = useState("");
  const [laborTime, setLaborTime] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [linkedProduct, setLinkedProduct] = useState("");

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      id: "1",
      name: "Leite Condensado",
      quantity: 1.5,
      unit: "un (395g)",
      costPerUnit: 6.50,
      totalCost: 9.75
    },
    {
      id: "2",
      name: "Leite Integral",
      quantity: 0.5,
      unit: "L",
      costPerUnit: 4.80,
      totalCost: 2.40
    }
  ]);

  const [packaging, setPackaging] = useState<Packaging[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);

  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [selectedPackaging, setSelectedPackaging] = useState("");
  const [packagingQuantity, setPackagingQuantity] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [equipmentMinTime, setEquipmentMinTime] = useState("");

  // Mock data for dropdowns
  const availableIngredients = [
    { id: "1", name: "Leite Condensado (395g)", costPerUnit: 6.50, unit: "un" },
    { id: "2", name: "Leite Integral (1L)", costPerUnit: 4.80, unit: "L" },
    { id: "3", name: "Nutella (Pote 3kg)", costPerUnit: 45.00, unit: "kg" }
  ];

  const availablePackaging = [
    { id: "1", name: "Saquinho 6x24", costPerUnit: 0.15, unit: "un" },
    { id: "2", name: "Adesivo Logo", costPerUnit: 0.05, unit: "un" },
    { id: "3", name: "Fita de Cetim", costPerUnit: 0.10, unit: "m" }
  ];

  const availableEquipment = [
    { id: "1", name: "Liquidificador Industrial", costPerHour: 2.00 },
    { id: "2", name: "Seladora", costPerHour: 1.50 }
  ];

  const products = [
    { id: "", name: "Nenhum Produto" },
    { id: "1", name: "Geladinho Gourmet Ninho" },
    { id: "2", name: "Geladinho Gourmet Morango" }
  ];

  const addIngredient = () => {
    if (!selectedIngredient || !ingredientQuantity) return;

    const ingredient = availableIngredients.find(i => i.id === selectedIngredient);
    if (!ingredient) return;

    const quantity = parseFloat(ingredientQuantity);
    const totalCost = quantity * ingredient.costPerUnit;

    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: ingredient.name,
      quantity,
      unit: ingredient.unit,
      costPerUnit: ingredient.costPerUnit,
      totalCost
    };

    setIngredients([...ingredients, newIngredient]);
    setSelectedIngredient("");
    setIngredientQuantity("");
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(i => i.id !== id));
  };

  const addPackaging = () => {
    if (!selectedPackaging || !packagingQuantity) return;

    const pack = availablePackaging.find(p => p.id === selectedPackaging);
    if (!pack) return;

    const quantity = parseFloat(packagingQuantity);
    const totalCost = quantity * pack.costPerUnit;

    const newPackaging: Packaging = {
      id: Date.now().toString(),
      name: pack.name,
      quantity,
      costPerUnit: pack.costPerUnit,
      totalCost
    };

    setPackaging([...packaging, newPackaging]);
    setSelectedPackaging("");
    setPackagingQuantity("");
  };

  const removePackaging = (id: string) => {
    setPackaging(packaging.filter(p => p.id !== id));
  };

  const addEquipment = () => {
    if (!selectedEquipment || !equipmentMinTime) return;

    const equip = availableEquipment.find(e => e.id === selectedEquipment);
    if (!equip) return;

    const minTime = parseFloat(equipmentMinTime);
    const totalCost = (minTime / 60) * equip.costPerHour; // Convert minutes to hours

    const newEquipment: Equipment = {
      id: Date.now().toString(),
      name: equip.name,
      minTime,
      costPerHour: equip.costPerHour,
      totalCost
    };

    setEquipment([...equipment, newEquipment]);
    setSelectedEquipment("");
    setEquipmentMinTime("");
  };

  const removeEquipment = (id: string) => {
    setEquipment(equipment.filter(e => e.id !== id));
  };

  // Calculations
  const ingredientsCost = ingredients.reduce((sum, i) => sum + i.totalCost, 0);
  const packagingCost = packaging.reduce((sum, p) => sum + p.totalCost, 0);
  const equipmentCost = equipment.reduce((sum, e) => sum + e.totalCost, 0);
  const laborCost = laborTime ? (parseFloat(laborTime) / 60) * 15 : 0; // Assuming R$15/hour
  const totalCost = ingredientsCost + packagingCost + equipmentCost + laborCost;
  const yieldNum = parseFloat(yieldUnits) || 1;
  const costPerUnit = totalCost / yieldNum;
  const suggestedPrice = costPerUnit * 1.4; // 40% margin
  const currentSellingPrice = parseFloat(sellingPrice) || suggestedPrice;
  const profitPerUnit = currentSellingPrice - costPerUnit;
  const profitMargin = ((profitPerUnit / currentSellingPrice) * 100);

  const handleSave = () => {
    // TODO: Implement save logic
    console.log({
      recipeName,
      yieldUnits,
      laborTime,
      sellingPrice,
      linkedProduct,
      ingredients,
      packaging,
      equipment
    });
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            to="/gestao-receitas"
            className="flex items-center justify-center size-10 rounded-full text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-2">Nova Receita</h1>
          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90 text-white font-bold px-3 py-1.5 rounded-full transition-colors"
          >
            Salvar
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        {/* Informações da Receita */}
        <div className="px-4 pt-6 pb-2">
          <h2 className="text-lg font-bold leading-tight tracking-tight mb-4">Informações da Receita</h2>
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">Nome da Receita</label>
              <Input
                placeholder="Ex: Geladinho de Morango"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                className="h-14 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col flex-1 min-w-[120px]">
                <label className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2 truncate">Rendimento (unid)</label>
                <Input
                  placeholder="0"
                  type="number"
                  value={yieldUnits}
                  onChange={(e) => setYieldUnits(e.target.value)}
                  className="h-14 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-[120px]">
                <label className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2 truncate">Mão de Obra (min)</label>
                <Input
                  placeholder="0"
                  type="number"
                  value={laborTime}
                  onChange={(e) => setLaborTime(e.target.value)}
                  className="h-14 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">Preço de Venda Unitário (R$)</label>
              <Input
                placeholder="0,00"
                step="0.01"
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                className="h-14 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 opacity-80">Opcional. Deixe em branco para sugestão automática.</p>
            </div>
            <div className="flex flex-col">
              <label className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">Vincular a um Produto</label>
              <Select value={linkedProduct} onValueChange={setLinkedProduct}>
                <SelectTrigger className="h-14 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700">
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
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 opacity-80">Vincula o estoque produzido ao catálogo de vendas.</p>
            </div>
          </div>
        </div>

        <div className="h-4"></div>
        <div className="h-px bg-slate-200 dark:bg-slate-800 mx-4"></div>
        <div className="h-4"></div>

        {/* Ingredientes */}
        <div className="px-4">
          <h2 className="text-lg font-bold leading-tight tracking-tight mb-4">Ingredientes da Receita</h2>
          <div className="flex items-end gap-2 mb-4">
            <div className="flex-1 min-w-0">
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">Ingrediente</label>
              <Select value={selectedIngredient} onValueChange={setSelectedIngredient}>
                <SelectTrigger className="h-[50px] bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 rounded-l-lg rounded-r-none">
                  <SelectValue placeholder="Selecione um ingrediente..." />
                </SelectTrigger>
                <SelectContent>
                  {availableIngredients.map((ingredient) => (
                    <SelectItem key={ingredient.id} value={ingredient.id}>
                      {ingredient.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-20 shrink-0">
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5 text-center">Qtd</label>
              <Input
                className="h-[50px] bg-white dark:bg-surface-dark border-y border-l border-slate-200 dark:border-slate-700 rounded-none text-center"
                placeholder="0"
                type="number"
                value={ingredientQuantity}
                onChange={(e) => setIngredientQuantity(e.target.value)}
              />
            </div>
            <Button
              onClick={addIngredient}
              className="h-[50px] w-[50px] bg-primary hover:bg-primary/90 text-white rounded-r-lg border border-primary shrink-0 shadow-sm p-0"
            >
              <Plus size={24} />
            </Button>
          </div>
          <div className="space-y-3 mb-2">
            {ingredients.map((ingredient) => (
              <div key={ingredient.id} className="flex items-center justify-between bg-white dark:bg-surface-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-sm">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{ingredient.name}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {ingredient.quantity} {ingredient.unit} x R$ {ingredient.costPerUnit.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">R$ {ingredient.totalCost.toFixed(2)}</span>
                  <Button
                    onClick={() => removeIngredient(ingredient.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 p-2 h-auto"
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-4"></div>
        <div className="h-px bg-slate-200 dark:bg-slate-800 mx-4"></div>
        <div className="h-4"></div>

        {/* Embalagens */}
        <div className="px-4">
          <h2 className="text-lg font-bold leading-tight tracking-tight mb-4">Embalagens</h2>
          <div className="flex items-end gap-2 mb-4">
            <div className="flex-1 min-w-0">
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">Embalagem</label>
              <Select value={selectedPackaging} onValueChange={setSelectedPackaging}>
                <SelectTrigger className="h-[50px] bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 rounded-l-lg rounded-r-none">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {availablePackaging.map((pack) => (
                    <SelectItem key={pack.id} value={pack.id}>
                      {pack.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-20 shrink-0">
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5 text-center">Qtd</label>
              <Input
                className="h-[50px] bg-white dark:bg-surface-dark border-y border-l border-slate-200 dark:border-slate-700 rounded-none text-center"
                placeholder="0"
                type="number"
                value={packagingQuantity}
                onChange={(e) => setPackagingQuantity(e.target.value)}
              />
            </div>
            <Button
              onClick={addPackaging}
              className="h-[50px] w-[50px] bg-primary hover:bg-primary/90 text-white rounded-r-lg border border-primary shrink-0 shadow-sm p-0"
            >
              <Plus size={24} />
            </Button>
          </div>
          {packaging.length === 0 ? (
            <div className="text-center py-6 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50/50 dark:bg-slate-800/50">
              <div className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-3xl mb-1">inventory_2</div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Nenhuma embalagem adicionada.</p>
            </div>
          ) : (
            <div className="space-y-3 mb-2">
              {packaging.map((pack) => (
                <div key={pack.id} className="flex items-center justify-between bg-white dark:bg-surface-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{pack.name}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {pack.quantity} un x R$ {pack.costPerUnit.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">R$ {pack.totalCost.toFixed(2)}</span>
                    <Button
                      onClick={() => removePackaging(pack.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 p-2 h-auto"
                    >
                      <Trash2 size={20} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-4"></div>
        <div className="h-px bg-slate-200 dark:bg-slate-800 mx-4"></div>
        <div className="h-4"></div>

        {/* Equipamentos */}
        <div className="px-4">
          <h2 className="text-lg font-bold leading-tight tracking-tight mb-4">Equipamentos</h2>
          <div className="flex items-end gap-2 mb-4">
            <div className="flex-1 min-w-0">
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">Equipamento</label>
              <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
                <SelectTrigger className="h-[50px] bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 rounded-l-lg rounded-r-none">
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
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5 text-center">Min.</label>
              <Input
                className="h-[50px] bg-white dark:bg-surface-dark border-y border-l border-slate-200 dark:border-slate-700 rounded-none text-center"
                placeholder="0"
                type="number"
                value={equipmentMinTime}
                onChange={(e) => setEquipmentMinTime(e.target.value)}
              />
            </div>
            <Button
              onClick={addEquipment}
              className="h-[50px] w-[50px] bg-primary hover:bg-primary/90 text-white rounded-r-lg border border-primary shrink-0 shadow-sm p-0"
            >
              <Plus size={24} />
            </Button>
          </div>
          {equipment.length === 0 ? (
            <div className="text-center py-6 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50/50 dark:bg-slate-800/50">
              <div className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-3xl mb-1">microwave</div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Nenhum equipamento adicionado.</p>
            </div>
          ) : (
            <div className="space-y-3 mb-2">
              {equipment.map((equip) => (
                <div key={equip.id} className="flex items-center justify-between bg-white dark:bg-surface-dark/50 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{equip.name}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {equip.minTime} min x R$ {equip.costPerHour.toFixed(2)}/h
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">R$ {equip.totalCost.toFixed(2)}</span>
                    <Button
                      onClick={() => removeEquipment(equip.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 p-2 h-auto"
                    >
                      <Trash2 size={20} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-8"></div>

        {/* Prévia de Custos */}
        <div className="px-4 mb-8">
          <h2 className="text-lg font-bold leading-tight tracking-tight mb-4">Prévia de Custos</h2>
          <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
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
              <div className="border-t border-slate-200 dark:border-slate-700 my-3 pt-3 flex justify-between font-bold text-base">
                <span className="text-slate-900 dark:text-white">Custo Total Receita</span>
                <span className="text-slate-900 dark:text-white">R$ {totalCost.toFixed(2)}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-background-light dark:bg-background-dark p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1 font-semibold">Custo Unitário</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">R$ {costPerUnit.toFixed(2)}</p>
              </div>
              <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg border border-primary/20">
                <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1 font-semibold">Sugestão (40%)</p>
                <p className="text-xl font-bold text-primary">R$ {suggestedPrice.toFixed(2)}</p>
              </div>
            </div>
            <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Preço Venda Atual</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">R$ {currentSellingPrice.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-slate-200 dark:border-slate-700 pt-3">
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase mb-1">Lucro Unitário</p>
                  <p className="text-sm font-bold text-green-600 dark:text-green-400">R$ {profitPerUnit.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase mb-1">Margem Real</p>
                  <p className="text-sm font-bold text-green-600 dark:text-green-400">{profitMargin.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReceita;