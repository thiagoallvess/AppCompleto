"use client";

import { useState } from "react";
import { ArrowLeft, Plus, Edit, Trash2, Bolt, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEquipment, Equipment } from "@/contexts/EquipmentContext";
import { showSuccess, showError } from "@/utils/toast";

const GestaoEquipamentos = () => {
  const { equipment, addEquipment, updateEquipment, removeEquipment } = useEquipment();
  
  const [newEquipmentName, setNewEquipmentName] = useState("");
  const [newPowerType, setNewPowerType] = useState<'eletrico' | 'gas'>('eletrico');
  const [newPowerValue, setNewPowerValue] = useState("");
  const [gasLow, setGasLow] = useState("");
  const [gasMedium, setGasMedium] = useState("");
  const [gasHigh, setGasHigh] = useState("");
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddOrUpdateEquipment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newEquipmentName) {
      showError("O nome do equipamento é obrigatório.");
      return;
    }

    if (newPowerType === 'eletrico' && !newPowerValue) {
      showError("A potência é obrigatória para equipamentos elétricos.");
      return;
    }

    if (newPowerType === 'gas' && (!gasLow || !gasMedium || !gasHigh)) {
      showError("Preencha todos os níveis de consumo de gás.");
      return;
    }

    setIsSubmitting(true);

    try {
      const equipmentData = {
        name: newEquipmentName,
        powerType: newPowerType,
        powerValue: newPowerType === 'eletrico' ? parseFloat(newPowerValue) : 0,
        gasConsumptionLow: newPowerType === 'gas' ? parseFloat(gasLow) : undefined,
        gasConsumptionMedium: newPowerType === 'gas' ? parseFloat(gasMedium) : undefined,
        gasConsumptionHigh: newPowerType === 'gas' ? parseFloat(gasHigh) : undefined,
        icon: getIconName(newEquipmentName)
      };

      console.log('[GestaoEquipamentos] Salvando equipamento:', equipmentData);

      if (editingEquipment) {
        await updateEquipment(editingEquipment.id, equipmentData);
        showSuccess(`Equipamento "${newEquipmentName}" atualizado!`);
      } else {
        await addEquipment(equipmentData);
        showSuccess(`Equipamento "${newEquipmentName}" adicionado!`);
      }

      resetForm();
    } catch (error: any) {
      console.error('[GestaoEquipamentos] Erro ao salvar equipamento:', error);
      showError(error.message || 'Erro ao salvar equipamento. Verifique os dados e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setNewEquipmentName("");
    setNewPowerType('eletrico');
    setNewPowerValue("");
    setGasLow("");
    setGasMedium("");
    setGasHigh("");
    setEditingEquipment(null);
  };

  const handleEditClick = (item: Equipment) => {
    setEditingEquipment(item);
    setNewEquipmentName(item.name);
    setNewPowerType(item.powerType);
    setNewPowerValue(item.powerValue?.toString() || "");
    setGasLow(item.gasConsumptionLow?.toString() || "");
    setGasMedium(item.gasConsumptionMedium?.toString() || "");
    setGasHigh(item.gasConsumptionHigh?.toString() || "");
  };

  const handleDeleteEquipment = async (id: string, name: string) => {
    if (confirm(`Tem certeza que deseja remover o equipamento "${name}"?`)) {
      try {
        await removeEquipment(id);
        showSuccess(`Equipamento "${name}" removido.`);
      } catch (error: any) {
        console.error('[GestaoEquipamentos] Erro ao remover equipamento:', error);
        showError(error.message || 'Erro ao remover equipamento.');
      }
    }
  };

  const getIconName = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('freezer') || n.includes('geladeira')) return 'kitchen';
    if (n.includes('fogão') || n.includes('forno')) return 'skillet';
    if (n.includes('liquidificador') || n.includes('mixer')) return 'blender';
    return 'factory';
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col pb-24 bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-x-hidden antialiased">
      <header className="sticky top-0 z-30 flex items-center justify-between bg-white/90 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 border-b border-slate-200 dark:border-slate-800">
        <Link
          to="/configuracoes-admin"
          className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="text-slate-600 dark:text-slate-300" size={24} />
        </Link>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center text-slate-900 dark:text-white">Gestão de Equipamentos</h1>
        <div className="size-10"></div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Form Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-primary text-xl">{editingEquipment ? 'edit' : 'add_circle'}</span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{editingEquipment ? 'Editar Equipamento' : 'Novo Equipamento'}</h2>
          </div>
          <form onSubmit={handleAddOrUpdateEquipment} className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-surface-dark p-5 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="equipment_name">
                Nome do Equipamento
              </label>
              <Input
                id="equipment_name"
                type="text"
                placeholder="Ex: Fogão Industrial"
                value={newEquipmentName}
                onChange={(e) => setNewEquipmentName(e.target.value)}
                className="h-12 bg-gray-50 dark:bg-neutral-900 border border-slate-300 dark:border-slate-700"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tipo de Alimentação</label>
              <div className="grid grid-cols-2 p-1 bg-gray-100 dark:bg-neutral-800 rounded-xl">
                <label className={`group flex cursor-pointer items-center justify-center rounded-lg p-2 transition-all ${newPowerType === 'eletrico' ? 'bg-white dark:bg-background-dark shadow-sm' : ''}`}>
                  <input
                    type="radio"
                    name="power_type"
                    value="eletrico"
                    checked={newPowerType === 'eletrico'}
                    onChange={() => setNewPowerType('eletrico')}
                    className="peer sr-only"
                    disabled={isSubmitting}
                  />
                  <div className="flex items-center gap-2">
                    <Bolt size={18} className={newPowerType === 'eletrico' ? 'text-primary' : 'text-slate-500'} />
                    <span className={`text-sm font-medium ${newPowerType === 'eletrico' ? 'text-primary' : 'text-slate-700 dark:text-slate-300'}`}>Elétrico</span>
                  </div>
                </label>
                <label className={`group flex cursor-pointer items-center justify-center rounded-lg p-2 transition-all ${newPowerType === 'gas' ? 'bg-white dark:bg-background-dark shadow-sm' : ''}`}>
                  <input
                    type="radio"
                    name="power_type"
                    value="gas"
                    checked={newPowerType === 'gas'}
                    onChange={() => setNewPowerType('gas')}
                    className="peer sr-only"
                    disabled={isSubmitting}
                  />
                  <div className="flex items-center gap-2">
                    <Flame size={18} className={newPowerType === 'gas' ? 'text-orange-500' : 'text-slate-500'} />
                    <span className={`text-sm font-medium ${newPowerType === 'gas' ? 'text-primary' : 'text-slate-700 dark:text-slate-300'}`}>A Gás</span>
                  </div>
                </label>
              </div>
            </div>

            {newPowerType === 'eletrico' ? (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Potência (Watts)</label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0"
                    value={newPowerValue}
                    onChange={(e) => setNewPowerValue(e.target.value)}
                    className="h-12 px-3 pr-10 rounded-lg bg-gray-50 dark:bg-neutral-900 border border-slate-300 dark:border-slate-700"
                    required
                    disabled={isSubmitting}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">W</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Potência em Watts do equipamento
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800">
                  <Flame className="text-orange-500" size={20} />
                  <p className="text-xs text-orange-700 dark:text-orange-400 font-medium">
                    Configure o consumo de gás para cada intensidade de chama
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Consumo Baixo (kg/h)</label>
                    <Input
                      type="number"
                      step="0.001"
                      placeholder="0.000"
                      value={gasLow}
                      onChange={(e) => setGasLow(e.target.value)}
                      className="h-12 bg-gray-50 dark:bg-neutral-900 border border-slate-300 dark:border-slate-700"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Consumo Médio (kg/h)</label>
                    <Input
                      type="number"
                      step="0.001"
                      placeholder="0.000"
                      value={gasMedium}
                      onChange={(e) => setGasMedium(e.target.value)}
                      className="h-12 bg-gray-50 dark:bg-neutral-900 border border-slate-300 dark:border-slate-700"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Consumo Alto (kg/h)</label>
                    <Input
                      type="number"
                      step="0.001"
                      placeholder="0.000"
                      value={gasHigh}
                      onChange={(e) => setGasHigh(e.target.value)}
                      className="h-12 bg-gray-50 dark:bg-neutral-900 border border-slate-300 dark:border-slate-700"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 flex gap-3">
              {editingEquipment && (
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={resetForm}
                  className="flex-1 h-12 border-slate-200 dark:border-slate-700"
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
              )}
              <Button 
                type="submit" 
                className="flex-1 bg-primary hover:bg-blue-600 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {editingEquipment ? (
                  <>
                    <Edit size={20} />
                    {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                  </>
                ) : (
                  <>
                    <Plus size={20} />
                    {isSubmitting ? 'Adicionando...' : 'Adicionar Equipamento'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </section>

        {/* Equipment List */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Equipamentos Cadastrados</h3>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {equipment.length} {equipment.length === 1 ? 'item' : 'itens'}
            </span>
          </div>
          
          {equipment.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-surface-dark rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
              <div className="flex items-center justify-center size-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4 mx-auto">
                <span className="material-symbols-outlined text-slate-400 text-[32px]">kitchen</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 mb-2">Nenhum equipamento cadastrado</p>
              <p className="text-sm text-slate-400 dark:text-slate-500">Adicione seu primeiro equipamento acima</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {equipment.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-xl bg-white dark:bg-surface-dark p-4 shadow-sm border border-gray-200 dark:border-slate-800 group hover:border-primary/50 transition-all">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-slate-900 dark:text-white font-semibold truncate pr-2">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {item.powerType === 'eletrico' ? (
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <Bolt size={14} className="text-primary" />
                          <span>{item.powerValue}W</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <Flame size={14} className="text-orange-500" />
                          <span>Gás: {item.gasConsumptionMedium} kg/h (médio)</span>
                        </div>
                      )}
                      <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        R$ {item.costPerHour.toFixed(2)}/h
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => handleEditClick(item)}
                      className="flex items-center justify-center size-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteEquipment(item.id, item.name)}
                      className="flex items-center justify-center size-9 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default GestaoEquipamentos;