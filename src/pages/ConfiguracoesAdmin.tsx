import { ArrowLeft, Home, IceCream, Receipt, Settings, Store, Bolt, HardHat, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useStore } from "../contexts/StoreContext";
import { showSuccess } from "../utils/toast";

const ConfiguracoesAdmin = () => {
  const { storeOpen, setStoreOpen, businessHours, setBusinessHours } = useStore();
  const [tempBusinessHours, setTempBusinessHours] = useState(businessHours);

  // Gas configurations
  const [gasWeight, setGasWeight] = useState("13");
  const [gasPrice, setGasPrice] = useState("120");
  const [gasConsumptionLow, setGasConsumptionLow] = useState("0,06");
  const [gasConsumptionMedium, setGasConsumptionMedium] = useState("0,12");
  const [gasConsumptionHigh, setGasConsumptionHigh] = useState("0,24");

  // Energy configurations
  const [energyCost, setEnergyCost] = useState("0,8");

  // Labor configurations
  const [laborCost, setLaborCost] = useState("30");

  // Cashback configurations
  const [cashbackMinValue, setCashbackMinValue] = useState("80");

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
    // Save business hours
    setBusinessHours(tempBusinessHours);
    
    // TODO: Save gas settings to backend/storage
    // TODO: Save energy settings to backend/storage
    // TODO: Save labor settings to backend/storage
    // TODO: Save cashback settings to backend/storage
    
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
      {/* Header */}
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

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 pb-32 space-y-6">
        {/* Configurações da Loja */}
        <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-surface-dark p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 dark:border-slate-700/50">
            <span className="material-symbols-outlined text-primary text-xl">store</span>
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
              Configurações da Loja
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Gerencie o status de abertura e os horários de funcionamento da sua loja.
          </p>

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
              <h4 className="text-slate-900 dark:text-white text-base font-semibold">Horários de Funcionamento Semanal</h4>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              Use o formato HH:MM (ex: 09:00) ou digite 'Fechado' para dias sem expediente.
            </p>

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

        {/* Link para Gestão de Equipamentos */}
        <Link
          to="/gestao-equipamentos"
          className="flex items-center gap-4 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-surface-dark/50 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 transition-colors group"
        >
          <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">factory</span>
          </div>
          <div className="flex flex-col items-start flex-1">
            <p className="text-base font-semibold leading-normal">Gestão de Equipamentos</p>
            <p className="text-xs text-gray-400 dark:text-slate-400">Custos de energia e gás por equipamento</p>
          </div>
          <div className="text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Configurações de Gás */}
        <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-surface-dark p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 dark:border-slate-700/50">
            <span className="material-symbols-outlined text-primary text-xl">local_fire_department</span>
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
              Configurações de Gás
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Gerencie os detalhes do seu botijão de gás e taxas de consumo.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="gas-weight">
                Peso do Botijão (kg)
              </label>
              <Input
                id="gas-weight"
                value={gasWeight}
                onChange={(e) => setGasWeight(e.target.value)}
                className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="gas-price">
                Preço do Botijão (R$)
              </label>
              <Input
                id="gas-price"
                value={gasPrice}
                onChange={(e) => setGasPrice(e.target.value)}
                className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="gas-low">
                Consumo Baixo (kg/h)
              </label>
              <Input
                id="gas-low"
                value={gasConsumptionLow}
                onChange={(e) => setGasConsumptionLow(e.target.value)}
                className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="gas-medium">
                Consumo Médio (kg/h)
              </label>
              <Input
                id="gas-medium"
                value={gasConsumptionMedium}
                onChange={(e) => setGasConsumptionMedium(e.target.value)}
                className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="gas-high">
                Consumo Alto (kg/h)
              </label>
              <Input
                id="gas-high"
                value={gasConsumptionHigh}
                onChange={(e) => setGasConsumptionHigh(e.target.value)}
                className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>
        </div>

        {/* Configurações de Energia */}
        <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-surface-dark p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 dark:border-slate-700/50">
            <span className="material-symbols-outlined text-primary text-xl">bolt</span>
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
              Configurações de Energia
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Defina o custo do kWh elétrico.
          </p>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="energy-cost">
              Custo kWh Elétrico (R$)
            </label>
            <Input
              id="energy-cost"
              value={energyCost}
              onChange={(e) => setEnergyCost(e.target.value)}
              className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
            />
          </div>
        </div>

        {/* Configurações de Preço e Mão de Obra */}
        <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-surface-dark p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 dark:border-slate-700/50">
            <span className="material-symbols-outlined text-primary text-xl">engineering</span>
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
              Configurações de Preço e Mão de Obra
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Defina o custo da mão de obra por hora.
          </p>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="labor-cost">
              Custo Mão de Obra (R$/hora)
            </label>
            <Input
              id="labor-cost"
              value={laborCost}
              onChange={(e) => setLaborCost(e.target.value)}
              className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
            />
          </div>
        </div>

        {/* Configurações de Cashback */}
        <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-surface-dark p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 dark:border-slate-700/50">
            <span className="material-symbols-outlined text-primary text-xl">savings</span>
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
              Configurações de Cashback
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Defina o valor mínimo para resgate de cashback.
          </p>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="cashback-min">
              Valor Mínimo de Resgate (R$)
            </label>
            <Input
              id="cashback-min"
              value={cashbackMinValue}
              onChange={(e) => setCashbackMinValue(e.target.value)}
              className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
            />
          </div>
        </div>

        {/* Save Button within configurations */}
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