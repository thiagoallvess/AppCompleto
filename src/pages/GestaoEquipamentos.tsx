import { ArrowLeft, MoreVertical, Plus, Save, Edit, Trash2, Bolt, Zap, ChefHat, Factory, Package, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEquipment, Equipment } from "@/contexts/EquipmentContext";
import { showSuccess, showError } from "@/utils/toast";

const GestaoEquipamentos = () => {
  const { equipment, addEquipment, updateEquipment, removeEquipment } = useEquipment();
  const [newEquipmentName, setNewEquipmentName] = useState("");
  const [newPowerType, setNewPowerType] = useState<'eletrico' | 'gas'>('eletrico');
  const [newPowerValue, setNewPowerValue] = useState("");
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);

  const handleAddOrUpdateEquipment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newEquipmentName) {
      showError("O nome do equipamento é obrigatório.");
      return;
    }

    const powerValue = parseFloat(newPowerValue) || 0;

    if (editingEquipment) {
      // Update existing equipment
      updateEquipment(editingEquipment.id, {
        name: newEquipmentName,
        powerType: newPowerType,
        powerValue: powerType === 'eletrico' ? powerValue : 0,
      });
      showSuccess(`Equipamento "${newEquipmentName}" atualizado!`);
      setEditingEquipment(null);
    } else {
      // Add new equipment
      addEquipment({
        name: newEquipmentName,
        powerType: newPowerType,
        powerValue: powerType === 'eletrico' ? powerValue : 0,
        icon: newPowerType === 'eletrico' ? 'bolt' : 'propane', // Default icon logic
      });
      showSuccess(`Equipamento "${newEquipmentName}" adicionado!`);
    }

    // Reset form
    setNewEquipmentName("");
    setNewPowerType('eletrico');
    setNewPowerValue("");
  };

  const handleEditClick = (item: Equipment) => {
    setEditingEquipment(item);
    setNewEquipmentName(item.name);
    setNewPowerType(item.powerType);
    setNewPowerValue(item.powerValue.toString());
  };

  const handleCancelEdit = () => {
    setEditingEquipment(null);
    setNewEquipmentName("");
    setNewPowerType('eletrico');
    setNewPowerValue("");
  };

  const handleDeleteEquipment = (id: string, name: string) => {
    if (confirm(`Tem certeza que deseja remover o equipamento "${name}"?`)) {
      removeEquipment(id);
      showSuccess(`Equipamento "${name}" removido.`);
    }
  };

  const getIconName = (name: string) => {
    if (name.toLowerCase().includes('freezer') || name.toLowerCase().includes('geladeira')) return 'kitchen';
    if (name.toLowerCase().includes('fogão')) return 'skillet';
    if (name.toLowerCase().includes('liquidificador') || name.toLowerCase().includes('mixer')) return 'blender';
    return 'factory';
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-800">
        <Link
          to="/configuracoes-admin"
          className="flex items-center justify-center size-10 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
        >
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white flex-1 text-center pr-10">Gestão de Equipamentos</h1>
        <div className="size-10"></div>
      </header>

      <main className="flex-1 flex flex-col gap-6 p-4">
        {/* Section: Adicionar/Editar Equipamento */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary text-xl">{editingEquipment ? 'edit' : 'add_circle'}</span>
            <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200">{editingEquipment ? 'Editar Equipamento' : 'Novo Registro'}</h2>
          </div>
          <form onSubmit={handleAddOrUpdateEquipment} className="flex flex-col gap-4 bg-white dark:bg-surface-dark p-5 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800">
            {/* Campo: Nome */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Nome do Equipamento</label>
              <Input
                className="h-11 bg-gray-50 dark:bg-[#121a21] border border-gray-200 dark:border-slate-800"
                placeholder="Ex: Freezer Vertical"
                type="text"
                value={newEquipmentName}
                onChange={(e) => setNewEquipmentName(e.target.value)}
                required
              />
            </div>
            {/* Campo: Tipo (Segmented Button) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Tipo de Alimentação</label>
              <div className="grid grid-cols-2 p-1 bg-gray-100 dark:bg-[#121a21] rounded-lg border border-gray-200 dark:border-slate-800">
                <label className="cursor-pointer">
                  <input
                    checked={newPowerType === 'eletrico'}
                    className="peer sr-only"
                    name="power_type"
                    type="radio"
                    value="eletrico"
                    onChange={() => setNewPowerType('eletrico')}
                  />
                  <div className="flex items-center justify-center py-2 rounded-md text-sm font-medium text-slate-500 transition-all peer-checked:bg-white dark:peer-checked:bg-surface-dark peer-checked:text-primary peer-checked:shadow-sm">
                    <Bolt size={18} className="mr-1.5" />
                    Elétrico
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input
                    checked={newPowerType === 'gas'}
                    className="peer sr-only"
                    name="power_type"
                    type="radio"
                    value="gas"
                    onChange={() => setNewPowerType('gas')}
                  />
                  <div className="flex items-center justify-center py-2 rounded-md text-sm font-medium text-slate-500 transition-all peer-checked:bg-white dark:peer-checked:bg-surface-dark peer-checked:text-primary peer-checked:shadow-sm">
                    <span className="material-symbols-outlined text-[18px] mr-1.5">propane</span>
                    A Gás
                  </div>
                </label>
              </div>
            </div>
            {/* Campo: Potência (Apenas para Elétrico) */}
            {newPowerType === 'eletrico' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Potência (Watts)</label>
                <div className="relative">
                  <Input
                    className="h-11 px-3 pr-10 rounded-lg bg-gray-50 dark:bg-[#121a21] border border-gray-200 dark:border-slate-800"
                    placeholder="0"
                    type="number"
                    value={newPowerValue}
                    onChange={(e) => setNewPowerValue(e.target.value)}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">W</span>
                </div>
              </div>
            )}
            {/* Botão de Ação */}
            <div className="flex gap-3 mt-2">
              {editingEquipment && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelEdit}
                  className="flex-1 h-11 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Cancelar
                </Button>
              )}
              <Button
                type="submit"
                className={`h-11 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg shadow-sm shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${editingEquipment ? 'flex-1' : 'w-full'}`}
              >
                {editingEquipment ? <Edit size={20} /> : <Save size={20} />}
                {editingEquipment ? 'Salvar Alterações' : 'Adicionar Equipamento'}
              </Button>
            </div>
          </form>
        </section>

        {/* Divider */}
        <div className="h-px w-full bg-gray-200 dark:bg-slate-800"></div>

        {/* Section: Lista de Equipamentos */}
        <section className="flex flex-col gap-4 pb-20">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200">Inventário</h2>
            <span className="text-xs font-medium px-2 py-1 rounded bg-gray-200 dark:bg-surface-dark text-slate-600 dark:text-slate-400">{equipment.length} Itens</span>
          </div>
          <div className="flex flex-col gap-3">
            {equipment.map((item) => (
              <div key={item.id} className="group flex items-center p-3 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/50 transition-colors shadow-sm">
                <div className={`flex size-10 items-center justify-center rounded-lg shrink-0 ${
                  item.powerType === 'eletrico' ? 'bg-blue-50 dark:bg-blue-900/20 text-primary' : 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                }`}>
                  <span className="material-symbols-outlined">{getIconName(item.name)}</span>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{item.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      {item.powerType === 'eletrico' ? <Bolt size={14} /> : <span className="material-symbols-outlined text-[14px]">propane</span>}
                      <span>{item.powerType === 'eletrico' ? 'Elétrico' : 'A Gás'}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {item.powerType === 'eletrico' ? `${item.powerValue} W` : 'Custo/h: R$ ' + item.costPerHour.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => handleEditClick(item)}
                    className="p-2 text-slate-400 hover:text-primary transition-all"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteEquipment(item.id, item.name)}
                    className="p-2 text-red-500 hover:text-red-400 transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 flex h-20 pb-4 items-center justify-around bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800/80 backdrop-blur-lg bg-opacity-95">
        <Link to="/visao-geral" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <span className="material-symbols-outlined text-[24px]">dashboard</span>
          <span className="text-[10px] font-medium">Início</span>
        </Link>
        <Link to="/gestao-producao" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <span className="material-symbols-outlined text-[24px]">conveyor_belt</span>
          <span className="text-[10px] font-medium">Produção</span>
        </Link>
        <Link to="/gestao-estoque" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <span className="material-symbols-outlined text-[24px]">inventory_2</span>
          <span className="text-[10px] font-medium">Estoque</span>
        </Link>
        <Link to="/configuracoes-admin" className="flex flex-col items-center gap-1 p-2 w-16 text-primary">
          <span className="material-symbols-outlined fill-current text-[24px]">settings</span>
          <span className="text-[10px] font-medium">Ajustes</span>
        </Link>
      </nav>
    </div>
  );
};

export default GestaoEquipamentos;