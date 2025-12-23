import { ArrowLeft, Plus, Trash2 } from "lucide-react";
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
  
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");

  const [packaging, setPackaging] = useState<any[]>([]);
  const [selectedPackaging, setSelectedPackaging] = useState("");
  const [packagingQuantity, setPackagingQuantity] = useState("");

  const [equipment, setEquipment] = useState<any[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [equipmentMinTime, setEquipmentMinTime] = useState("");
  const [gasIntensity, setGasIntensity] = useState<"low" | "medium" | "high">("medium");

  const currentSelectedEquip = availableEquipment.find(e => e.id === selectedEquipment);

  const addIngredient = () => {
    if (selectedIngredient && ingredientQuantity) {
      const ingredient = availableIngredients.find(i => i.id === selectedIngredient);
      if (ingredient) {
        const unitCost = ingredient.unitCost || 0;
        const totalCost = parseFloat(ingredientQuantity) * unitCost;
        setIngredients([...ingredients, { id: Date.now(), name: ingredient.name, quantity: parseFloat(ingredientQuantity), unit: ingredient.unit, totalCost }]);
        setSelectedIngredient("");
        setIngredientQuantity("");
      }
    }
  };

  const addPackaging = () => {
    if (selectedPackaging && packagingQuantity) {
      const pack = availablePackagingItems.find(p => p.id === selectedPackaging);
      if (pack) {
        const unitCost = pack.unitCost || 0;
        const totalCost = parseFloat(packagingQuantity) * unitCost;
        setPackaging([...packaging, { id: Date.now(), name: pack.name, quantity: parseFloat(packagingQuantity), unit: pack.unit, totalCost }]);
        setSelectedPackaging("");
        setPackagingQuantity("");
      }
    }
  };

  const addEquipment = () => {
    if (selectedEquipment && equipmentMinTime) {
      const equip = availableEquipment.find(e => e.id === selectedEquipment);
      if (equip) {
        let hourlyCost = equip.costPerHour;
        
        if (equip.powerType === 'gas') {
          const gasPricePerKg = 120 / 13;
          const consumption = gasIntensity === 'low' ? equip.gasConsumptionLow : 
                              gasIntensity === 'high' ? equip.gasConsumptionHigh : 
                              equip.gasConsumptionMedium;
          hourlyCost = (consumption || 0) * gasPricePerKg;
        }

        const totalCost = (parseFloat(equipmentMinTime) / 60) * hourlyCost;
        setEquipment([...equipment, { 
          id: Date.now(), 
          name: equip.name, 
          minTime: parseFloat(equipmentMinTime), 
          totalCost,
          intensity: equip.powerType === 'gas' ? gasIntensity : null 
        }]);
        setSelectedEquipment("");
        setEquipmentMinTime("");
      }
    }
  };

  const ingredientsCost = ingredients.reduce((sum, i) => sum + i.totalCost, 0);
  const packagingCost = packaging.reduce((sum, p) => sum + p.totalCost, 0);
  const equipmentCost = equipment.reduce((sum, e) => sum + e.totalCost, 0);
  const laborCostValue = laborTime ? (parseFloat(laborTime) / 60) * 30 : 0;
  const totalCost = ingredientsCost + packagingCost + equipmentCost + laborCostValue;
  
  const yieldNum = parseFloat(recipeYield) || 1;
  const unitCost = totalCost / yieldNum;
  
  const currentSellingPrice = sellingPrice ? parseFloat(sellingPrice) : 0;
  const totalRevenue = currentSellingPrice * yieldNum;
  const totalProfit = totalRevenue - totalCost;
  const unitProfit = currentSellingPrice - unitCost;
  const margin = currentSellingPrice > 0 ? (unitProfit / currentSellingPrice) * 100 : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipeName || !recipeYield) return;

    const newRecipe = {
      id: Date.now(),
      name: recipeName,
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=300",
      time: `${laborTime || 0} min`,
      quantity: parseInt(recipeYield),
      cost: unitCost,
      ingredientsList: ingredients,
      packagingList: packaging,
      equipmentList: equipment,
      sellingPrice: currentSellingPrice,
      linkedProductId: linkedProduct
    };

    addRecipe(newRecipe as any);
    showSuccess("Receita salva com sucesso!");
    navigate("/gestao-receitas");
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link to="/gestao-receitas" className="flex items-center justify-center size-10 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Receitas</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Nova Receita</h1>
          </div>
        </div>
        <div className="flex items-center justify-end pr-4">
          <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-white font-bold px-4 py-2 rounded-full">
            Salvar
          </Button>
        </div>
      </header>

      <div className="flex-1 w-full overflow-y-auto p-4 space-y-6 max-w-4xl mx-auto">
        <section className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold">Informações Básicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome da Receita</label>
              <Input value={recipeName} onChange={(e) => setRecipeName(e.target.value)} placeholder="Ex: Geladinho de Morango" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Rendimento (unid)</label>
                <Input type="number" value={recipeYield} onChange={(e) => setRecipeYield(e.target.value)} placeholder="0" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mão de Obra (min)</label>
                <Input type="number" value={laborTime} onChange={(e) => setLaborTime(e.target.value)} placeholder="0" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Preço de Venda Unitário (R$)</label>
              <Input type="number" step="0.01" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} placeholder="0,00" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Vincular a um Produto</label>
              <Select value={linkedProduct} onValueChange={setLinkedProduct}>
                <SelectTrigger><SelectValue placeholder="Nenhum Produto" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhum Produto</SelectItem>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold">Ingredientes</h2>
          <div className="flex gap-2">
            <Select value={selectedIngredient} onValueChange={setSelectedIngredient}>
              <SelectTrigger className="flex-1"><SelectValue placeholder="Selecione..." /></SelectTrigger>
              <SelectContent>
                {availableIngredients.map(i => <SelectItem key={i.id} value={i.id}>{i.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input className="w-24" type="number" placeholder="Qtd" value={ingredientQuantity} onChange={(e) => setIngredientQuantity(e.target.value)} />
            <Button type="button" onClick={addIngredient}><Plus size={20} /></Button>
          </div>
          <div className="space-y-2">
            {ingredients.map(i => (
              <div key={i.id} className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <span>{i.name} ({i.quantity} {i.unit})</span>
                <div className="flex items-center gap-4">
                  <span className="font-medium">R$ {i.totalCost.toFixed(2)}</span>
                  <button onClick={() => setIngredients(ingredients.filter(x => x.id !== i.id))} className="text-red-500"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold">Embalagens</h2>
          <div className="flex gap-2">
            <Select value={selectedPackaging} onValueChange={setSelectedPackaging}>
              <SelectTrigger className="flex-1"><SelectValue placeholder="Selecione..." /></SelectTrigger>
              <SelectContent>
                {availablePackagingItems.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input className="w-24" type="number" placeholder="Qtd" value={packagingQuantity} onChange={(e) => setPackagingQuantity(e.target.value)} />
            <Button type="button" onClick={addPackaging}><Plus size={20} /></Button>
          </div>
          <div className="space-y-2">
            {packaging.map(p => (
              <div key={p.id} className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <span>{p.name} ({p.quantity} {p.unit})</span>
                <div className="flex items-center gap-4">
                  <span className="font-medium">R$ {p.totalCost.toFixed(2)}</span>
                  <button onClick={() => setPackaging(packaging.filter(x => x.id !== p.id))} className="text-red-500"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold">Equipamentos</h2>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
                <SelectTrigger className="flex-1"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                <SelectContent>
                  {availableEquipment.map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input className="w-24" type="number" placeholder="Min" value={equipmentMinTime} onChange={(e) => setEquipmentMinTime(e.target.value)} />
              <Button type="button" onClick={addEquipment}><Plus size={20} /></Button>
            </div>
            
            {currentSelectedEquip?.powerType === 'gas' && (
              <div className="flex flex-col gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800">
                <label className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase">Intensidade da Chama</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['low', 'medium', 'high'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setGasIntensity(level)}
                      className={`py-2 text-xs font-bold rounded-md border transition-all ${
                        gasIntensity === level 
                        ? 'bg-orange-500 border-orange-500 text-white shadow-sm' 
                        : 'bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 text-slate-500'
                      }`}
                    >
                      {level === 'low' ? 'Baixa' : level === 'medium' ? 'Média' : 'Alta'}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="space-y-2">
            {equipment.map(e => (
              <div key={e.id} className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{e.name} ({e.minTime} min)</span>
                  {e.intensity && (
                    <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase">
                      Chama: {e.intensity === 'low' ? 'Baixa' : e.intensity === 'medium' ? 'Média' : 'Alta'}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">R$ {e.totalCost.toFixed(2)}</span>
                  <button onClick={() => setEquipment(equipment.filter(x => x.id !== e.id))} className="text-red-500"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-lg font-bold border-b pb-2">Prévia de Custos e Lucros</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-slate-500">Custo Ingredientes:</span><span className="font-semibold">R$ {ingredientsCost.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500">Custo Embalagens:</span><span className="font-semibold">R$ {packagingCost.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500">Custo Equipamentos:</span><span className="font-semibold">R$ {equipmentCost.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500">Custo Mão de Obra:</span><span className="font-semibold">R$ {laborCostValue.toFixed(2)}</span></div>
              <div className="h-px bg-slate-100 dark:bg-slate-700 my-2"></div>
              <div className="flex justify-between text-base font-bold"><span>Custo Total:</span><span>R$ {totalCost.toFixed(2)}</span></div>
              <div className="flex justify-between text-base font-bold text-primary"><span>Custo Unitário:</span><span>R$ {unitCost.toFixed(2)}</span></div>
            </div>
            <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
              <div className="flex justify-between text-sm"><span className="text-slate-500">Lucro Total:</span><span className={`font-semibold ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>R$ {totalProfit.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500">Lucro Unitário:</span><span className={`font-semibold ${unitProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>R$ {unitProfit.toFixed(2)}</span></div>
              <div className="h-px bg-slate-200 dark:bg-slate-700 my-2"></div>
              <div className="flex justify-between items-center"><span className="font-bold">Margem (%):</span><span className={`text-2xl font-black ${margin >= 30 ? 'text-green-600' : 'text-amber-600'}`}>{margin.toFixed(1)}%</span></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddReceita;