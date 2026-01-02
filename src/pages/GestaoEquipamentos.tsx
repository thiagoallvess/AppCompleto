"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Save, Edit, Trash2, Bolt } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEquipment, Equipment } from "@/contexts/EquipmentContext";
import { showSuccess, showError } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";

const GestaoEquipamentos = () => {
  const [newEquipmentName, setNewEquipmentName] = useState("");
  const [newPowerType, setNewPowerType] = useState<'eletrico' | 'gas'>('eletrico');
  const [newPowerValue, setNewPowerValue] = useState("");
  const [gasLow, setGasLow] = useState("");
  const [gasMedium, setGasMedium] = useState("");
  const [gasHigh, setGasHigh] = useState("");
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const { data, error } = await supabase
        .from('equipment')
        .select('*');

      if (error) {
        console.error('Erro ao buscar equipamentos:', error);
      } else if (data) {
        setEquipmentList(data);
      }
    } catch (error) {
      console.error('Erro ao buscar equipamentos:', error);
    }
  };

  const handleAddOrUpdateEquipment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newEquipmentName) {
      showError("O nome do equipamento é obrigatório.");
      return;
    }

    const data = {
      name: newEquipmentName,
      power_type: newPowerType,
      power_value: newPowerType === 'eletrico' ? (parseFloat(newPowerValue) || 0) : 0,
      gas_consumption_low: newPowerType === 'gas' ? (parseFloat(gasLow) || 0) : null,
      gas_consumption_medium: newPowerType === 'gas' ? (parseFloat(gasMedium) || 0) : null,
      gas_consumption_high: newPowerType === 'gas' ? (parseFloat(gasHigh) || 0) : null,
    };

    try {
      if (editingEquipment) {
        await supabase
          .from('equipment')
          .update(data)
          .eq('id', editingEquipment.id);
        showSuccess(`Equipamento "${newEquipmentName}" atualizado!`);
      } else {
        await supabase
          .from('equipment')
          .insert([
            {
              name: newEquipmentName,
              power_type: newPowerType,
              power_value: newPowerType === 'eletrico' ? (parseFloat(newPowerValue) || 0) : 0,
              gas_consumption_low: newPowerType === 'gas' ? (parseFloat(gasLow) || 0) : null,
              gas_consumption_medium: newPowerType === 'gas' ? (parseFloat(gasMedium) || 0) : null,
              gas_consumption_high: newPowerType === 'gas' ? (parseFloat(gasHigh) || 0) : null,
            }
          ]);
        showSuccess(`Equipamento "${newEquipmentName}" adicionado!`);
      }
      fetchEquipment();
    } catch (error) {
      console.error('Erro ao adicionar/atualizar equipamento:', error);
      showError('Erro ao adicionar/atualizar equipamento.');
    }

    resetForm();
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
        await supabase
          .from('equipment')
          .delete()
          .eq('id', id);
        showSuccess(`Equipamento "${name}" removido.`);
        fetchEquipment();
      } catch (error) {
        console.error('Erro ao remover equipamento:', error);
        showError('Erro ao remover equipamento.');
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

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6">
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-primary text-xl">{editingEquipment ? 'edit' : 'add_circle'}</span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{editingEquipment ? 'Editar Equipamento' : 'Novo Registro'}</h2>
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
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tipo de Alimentação</label>
              <div className="grid grid-cols-2 p-1 bg-gray-100 dark:bg-neutral-800 rounded-xl">
                <label className="group flex cursor-pointer items-center justify-center rounded-lg p-2 transition-all">
                  <input
                    type="radio"
                    name="power_type"
                    value="eletrico"
                    checked={newPowerType === 'eletrico'}
                    onChange={() => setNewPowerType('eletrico')}
                    className="peer sr-only"
                  />
                  <div className="flex items-center gap-2">
                    <Bolt size={18} className="text-primary" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-has-[:checked]:text-primary">Elétrico</span>
                  </div>
                </label>
                <label className="group flex cursor-pointer items-center justify-center rounded-lg p-2 transition-all">
                  <input
                    type="radio"
                    name="power_type"
                    value="gas"
                    checked={newPowerType === 'gas'}
                    onChange={() => setNewPowerType('gas')}
                    className="peer sr-only"
                  />
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-orange-500">propane</span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-has-[:checked]:text-primary">A Gás</span>
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
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">W</span>
                </div>
              </div>
            ) : (
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
                  />
                </div>
              </div>
            )}

            <div className="pt-4 flex gap-3">
              <Button type="submit" className="w-full bg-primary hover:bg-blue-600 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]">
                {editingEquipment ? <Edit size={20} /> : <Plus size={20} />}
                {editingEquipment ? 'Salvar Alterações' : 'Adicionar Equipamento'}
              </Button>
            </div>
          </form>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Equipamentos</h3>
          </div>
          <div className="flex flex-col gap-3">
            {equipmentList.map((item) => (
              <div key={item.id} className="flex items-center gap-4 rounded-xl bg-white dark:bg-surface-dark p-4 shadow-sm border border-gray-200 dark:border-slate-800">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-500 font-bold text-lg">
                  <span className="material-symbols-outlined">kitchen</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-slate-900 dark:text-white font-semibold truncate pr-2">{item.name}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {item.powerType === 'eletrico' ? `Elétrico - ${item.powerValue}W` : `Gás - Médio: ${item.gasConsumptionMedium} kg/h`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default GestaoEquipamentos;