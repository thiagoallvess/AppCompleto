import { ArrowLeft, Home, IceCream, Receipt, Settings, Store, Bolt, HardHat, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useStore } from "../contexts/StoreContext";
import { showSuccess } from "../utils/toast";

const ConfiguracoesAdmin = () => {
  const { storeOpen, setStoreOpen, businessHours, setBusinessHours } = useStore();
  const [gasWeight, setGasWeight] = useState("13");
  const [gasPrice, setGasPrice] = useState("120.00");
  const [gasConsumption, setGasConsumption] = useState("medium");
  const [energyCost, setEnergyCost] = useState("0.92");
  const [laborCost, setLaborCost] = useState("15.50");
  const [minCashback, setMinCashback] = useState("20.00");
  const [cashbackPercentage, setCashbackPercentage] = useState("2.5");

  const handleSave = () => {
    showSuccess("Configurações salvas com sucesso!");
  };

  const updateBusinessHour = (day: string, type: 'open' | 'close', value: string) => {
    setBusinessHours({
      ...businessHours,
      [day]: {
        ...businessHours[day as keyof typeof businessHours],
        [type]: value
      }
    });
  };

  const days = [
    { key: 'monday', label: 'Segunda' },
    { key: 'tuesday', label: 'Terça' },
    { key: 'wednesday', label: 'Quarta' },
    { key: 'thursday', label: 'Quinta' },
    { key: 'friday', label: 'Sexta' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center justify-center size-10 rounded-full text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft size={24} />
            </Link>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Configurações</h2>
          </div>
          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90 text-white font-bold px-3 py-1.5 rounded-full transition-colors"
          >
            Salvar
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-10">
        {/* Status da Loja */}
        <div className="mt-4">
          <h3 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider px-4 pb-2 opacity-80">
            Status da Loja
          </h3>
          <div className="flex items-center gap-4 bg-white dark:bg-surface-dark px-4 py-4 justify-between border-y border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-primary">
                <Store size={20} />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-bold leading-tight">Loja Aberta</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">Permitir novos pedidos</p>
              </div>
            </div>
            <div className="shrink-0">
              <Switch
                checked={storeOpen}
                onCheckedChange={setStoreOpen}
              />
            </div>
          </div>
        </div>

        {/* Horários de Funcionamento */}
        <div className="mt-8">
          <h3 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider px-4 pb-2 opacity-80">
            Horários de Funcionamento
          </h3>
          <div className="bg-white dark:bg-surface-dark border-y border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {days.map((day) => {
                const dayData = businessHours[day.key as keyof typeof businessHours];
                return (
                  <div key={day.key} className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 lg:border-r lg:border-slate-100 dark:lg:border-slate-700 lg:last:border-r-0">
                    <p className={`text-slate-900 dark:text-white text-base font-medium min-w-24`}>
                      {day.label}
                    </p>
                    <div className="flex gap-3 flex-1">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-3 flex items-center text-slate-400 dark:text-slate-500 pointer-events-none">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12,6 12,12 16,14"></polyline>
                          </svg>
                        </div>
                        <Input
                          type="time"
                          value={dayData.open}
                          onChange={(e) => updateBusinessHour(day.key, 'open', e.target.value)}
                          className={`w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700 pl-9`}
                        />
                      </div>
                      <span className="self-center text-slate-400 dark:text-slate-500">-</span>
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-3 flex items-center text-slate-400 dark:text-slate-500 pointer-events-none">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12,6 12,12 16,14"></polyline>
                          </svg>
                        </div>
                        <Input
                          type="time"
                          value={dayData.close}
                          onChange={(e) => updateBusinessHour(day.key, 'close', e.target.value)}
                          className={`w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700 pl-9`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Configurações de Gás */}
        <div className="mt-8">
          <h3 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider px-4 pb-2 opacity-80">
            Configurações de Gás
          </h3>
          <div className="bg-white dark:bg-surface-dark border-y border-slate-200 dark:border-slate-700 px-4 py-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-slate-900 dark:text-white text-sm font-medium leading-normal pb-1.5">
                  Peso Botijão
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    value={gasWeight}
                    onChange={(e) => setGasWeight(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700 pr-12"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                    kg
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-slate-900 dark:text-white text-sm font-medium leading-normal pb-1.5">
                  Preço Botijão
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                    R$
                  </span>
                  <Input
                    type="number"
                    step="0.01"
                    value={gasPrice}
                    onChange={(e) => setGasPrice(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700 pl-9"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-slate-900 dark:text-white text-sm font-medium leading-normal pb-2">
                Consumo (kg/h)
              </label>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col">
                  <label className="text-slate-900 dark:text-white text-xs font-medium leading-normal pb-1">
                    Baixo
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="0.5"
                    className="w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-slate-900 dark:text-white text-xs font-medium leading-normal pb-1">
                    Médio
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="1.0"
                    className="w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-slate-900 dark:text-white text-xs font-medium leading-normal pb-1">
                    Alto
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="1.5"
                    className="w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custos Operacionais */}
        <div className="mt-8">
          <h3 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider px-4 pb-2 opacity-80">
            Custos Operacionais
          </h3>
          <div className="bg-white dark:bg-surface-dark border-y border-slate-200 dark:border-slate-700 px-4 py-6 space-y-5">
            <div className="flex flex-col">
              <label className="text-slate-900 dark:text-white text-sm font-medium leading-normal pb-1.5 flex items-center gap-2">
                <Bolt size={18} className="text-primary" />
                Custo de Energia (kWh)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                  R$
                </span>
                <Input
                  type="number"
                  step="0.01"
                  value={energyCost}
                  onChange={(e) => setEnergyCost(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700 pl-9"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-slate-900 dark:text-white text-sm font-medium leading-normal pb-1.5 flex items-center gap-2">
                <HardHat size={18} className="text-primary" />
                Custo Mão de Obra (hora)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                  R$
                </span>
                <Input
                  type="number"
                  step="0.01"
                  value={laborCost}
                  onChange={(e) => setLaborCost(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700 pl-9 pr-12"
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                  /h
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cashback */}
        <div className="mt-8 mb-8">
          <h3 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider px-4 pb-2 opacity-80">
            Cashback
          </h3>
          <div className="bg-white dark:bg-surface-dark border-y border-slate-200 dark:border-slate-700 px-4 py-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-slate-900 dark:text-white text-sm font-medium leading-normal pb-1.5">
                  Mínimo Resgate
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                    R$
                  </span>
                  <Input
                    type="number"
                    step="0.01"
                    value={minCashback}
                    onChange={(e) => setMinCashback(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700 pl-9"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-slate-900 dark:text-white text-sm font-medium leading-normal pb-1.5">
                  % por Venda
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.1"
                    value={cashbackPercentage}
                    onChange={(e) => setCashbackPercentage(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700 pr-8"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                    %
                  </span>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 dark:bg-black/20">
              <p className="text-[11px] leading-snug text-slate-500 dark:text-slate-400">
                * Defina as regras para o programa de fidelidade do geladinho gourmet.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-background-dark/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 pb-safe z-40 max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className="flex flex-col items-center justify-center gap-1 w-full h-full text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors">
            <Home size={24} />
            <span className="text-[10px] font-medium">Início</span>
          </Link>
          <Link to="/gestao-produtos" className="flex flex-col items-center justify-center gap-1 w-full h-full text-primary dark:text-primary transition-colors">
            <IceCream size={24} />
            <span className="text-[10px] font-bold">Produtos</span>
          </Link>
          <button className="flex flex-col items-center justify-center gap-1 w-full h-full text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors">
            <Receipt size={24} />
            <span className="text-[10px] font-medium">Pedidos</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 w-full h-full text-primary dark:text-primary transition-colors">
            <Settings size={24} />
            <span className="text-[10px] font-bold">Ajustes</span>
          </button>
        </div>
      </nav>
      {/* Safe area spacer for bottom nav */}
      <div className="h-6 w-full bg-white dark:bg-background-dark"></div>
    </div>
  );
};

export default ConfiguracoesAdmin;