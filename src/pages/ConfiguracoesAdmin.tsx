import { ArrowLeft, Home, IceCream, Receipt, Settings, Store, Bolt, HardHat, DollarSign, Gift, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useStore } from "../contexts/StoreContext";
import { showSuccess } from "../utils/toast";

const ConfiguracoesAdmin = () => {
  const { 
    storeOpen, 
    setStoreOpen, 
    businessHours, 
    setBusinessHours,
    referralRewardYou,
    setReferralRewardYou,
    referralRewardThem,
    setReferralRewardThem,
    cashbackPercent,
    setCashbackPercent
  } = useStore();
  
  const [tempBusinessHours, setTempBusinessHours] = useState(businessHours);
  const [tempRewardYou, setTempRewardYou] = useState(referralRewardYou);
  const [tempRewardThem, setTempRewardThem] = useState(referralRewardThem);
  const [tempCashback, setTempCashback] = useState(cashbackPercent);

  // Gas configurations
  const [gasWeight, setGasWeight] = useState("13");
  const [gasPrice, setGasPrice] = useState("120");

  // Energy configurations
  const [energyCost, setEnergyCost] = useState("0,8");

  // Labor configurations
  const [laborCost, setLaborCost] = useState("30");

  const days = [
    { key: 'monday', label: 'Segunda-feira' },
    { key: 'tuesday', label: 'Terça-feira' },
    { key: 'wednesday', label: 'Quarta-feira' },
    { key: 'thursday', label: 'Quinta-feira' },
    { key: 'friday', label: 'Sexta-feira' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' }
  ];

  const handleSaveAllSettings = () => {
    setBusinessHours(tempBusinessHours);
    setReferralRewardYou(tempRewardYou);
    setReferralRewardThem(tempRewardThem);
    setCashbackPercent(tempCashback);
    
    showSuccess("Todas as configurações foram salvas!");
  };

  const handleTimeChange = (day: string, field: 'open' | 'close', value: string) => {
    setTempBusinessHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [field]: value
      }
    }));
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            to="/visao-geral"
            className="flex items-center justify-center size-10 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Administração</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Configurações</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 pb-32 space-y-6">
        {/* Configurações da Loja */}
        <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-surface-dark p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 dark:border-slate-700/50">
            <Store className="text-primary" size={24} />
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
              Configurações da Loja
            </h3>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <div className="flex flex-col">
              <span className="text-slate-900 dark:text-white text-sm font-semibold">Loja Aberta</span>
              <span className="text-slate-500 dark:text-slate-400 text-xs">Ative ou desative a loja para receber pedidos.</span>
            </div>
            <Switch
              checked={storeOpen}
              onCheckedChange={setStoreOpen}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">schedule</span>
              <h4 className="text-slate-900 dark:text-white text-base font-semibold">Horários de Funcionamento</h4>
            </div>
            <div className="space-y-3">
              {days.map((day) => (
                <div key={day.key} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 w-32">{day.label}</span>
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      type="time"
                      value={tempBusinessHours[day.key as keyof typeof tempBusinessHours].open}
                      onChange={(e) => handleTimeChange(day.key, 'open', e.target.value)}
                      className="h-10 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
                    />
                    <span className="text-slate-500 dark:text-slate-400">até</span>
                    <Input
                      type="time"
                      value={tempBusinessHours[day.key as keyof typeof tempBusinessHours].close}
                      onChange={(e) => handleTimeChange(day.key, 'close', e.target.value)}
                      className="h-10 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Configurações de Cashback */}
        <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-surface-dark p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 dark:border-slate-700/50">
            <Coins className="text-primary" size={24} />
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
              Configurações de Cashback
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Defina a porcentagem que o cliente recebe de volta em cada compra.
          </p>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="cashback-percent">
              Porcentagem de Cashback (%)
            </label>
            <div className="relative max-w-[200px]">
              <Input
                id="cashback-percent"
                type="number"
                value={tempCashback}
                onChange={(e) => setTempCashback(e.target.value)}
                className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
            </div>
          </div>
        </div>

        {/* Configurações de Indicação */}
        <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-surface-dark p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 dark:border-slate-700/50">
            <Gift className="text-primary" size={24} />
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
              Programa de Indicação
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Recompensa "Pra Você" (%)</label>
              <div className="relative">
                <Input
                  type="number"
                  value={tempRewardYou}
                  onChange={(e) => setTempRewardYou(e.target.value)}
                  className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Recompensa "Pra Ele" (%)</label>
              <div className="relative">
                <Input
                  type="number"
                  value={tempRewardThem}
                  onChange={(e) => setTempRewardThem(e.target.value)}
                  className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Custos de Produção (Gás, Energia, Mão de Obra) */}
        <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-surface-dark p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 dark:border-slate-700/50">
            <Bolt className="text-primary" size={24} />
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Custos de Produção</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Preço Botijão Gás (R$)</label>
              <Input value={gasPrice} onChange={(e) => setGasPrice(e.target.value)} className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Custo kWh Energia (R$)</label>
              <Input value={energyCost} onChange={(e) => setEnergyCost(e.target.value)} className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mão de Obra (R$/hora)</label>
              <Input value={laborCost} onChange={(e) => setLaborCost(e.target.value)} className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700" />
            </div>
          </div>
          <Link
            to="/gestao-equipamentos"
            className="mt-2 flex items-center justify-between p-3 rounded-lg border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
          >
            <span className="text-sm font-bold">Configurar Equipamentos Individuais</span>
            <ArrowLeft className="rotate-180" size={18} />
          </Link>
        </div>

        {/* Save Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleSaveAllSettings}
            className="bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 px-8"
          >
            <span className="material-symbols-outlined">save</span>
            Salvar Todas as Configurações
          </Button>
        </div>
      </main>

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

export default ConfiguracoesAdmin;