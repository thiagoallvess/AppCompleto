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

  const days = [
    { key: 'monday', label: 'Segunda-feira' },
    { key: 'tuesday', label: 'Terça-feira' },
    { key: 'wednesday', label: 'Quarta-feira' },
    { key: 'thursday', label: 'Quinta-feira' },
    { key: 'friday', label: 'Sexta-feira' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' }
  ];

  const handleSaveBusinessHours = () => {
    setBusinessHours(tempBusinessHours);
    showSuccess("Horários de funcionamento salvos!");
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
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Store Status */}
          <div className="space-y-6">
            <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-surface-dark p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3 dark:border-slate-700/50">
                <span className="material-symbols-outlined text-primary text-xl">store</span>
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
                  Status da Loja
                </h3>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-slate-900 dark:text-white text-sm font-semibold">Loja Aberta</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs">Aceitar novos pedidos</span>
                </div>
                <Switch
                  checked={storeOpen}
                  onCheckedChange={setStoreOpen}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-surface-dark p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3 dark:border-slate-700/50">
                <span className="material-symbols-outlined text-primary text-xl">bolt</span>
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
                  Ações Rápidas
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button className="flex flex-col items-center gap-2 h-20 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  <HardHat size={24} />
                  <span className="text-xs font-medium">Manutenção</span>
                </Button>
                <Button className="flex flex-col items-center gap-2 h-20 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  <DollarSign size={24} />
                  <span className="text-xs font-medium">Relatórios</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-6">
            <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-surface-dark p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3 dark:border-slate-700/50">
                <span className="material-symbols-outlined text-primary text-xl">schedule</span>
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
                  Horários de Funcionamento
                </h3>
              </div>
              <div className="space-y-4">
                {days.map((day) => (
                  <div key={day.key} className="flex items-center gap-4">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 w-24">{day.label}</span>
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
              <Button
                onClick={handleSaveBusinessHours}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.98]"
              >
                Salvar Horários
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/gestao-produtos"
            className="flex flex-col items-center gap-3 rounded-xl bg-white dark:bg-surface-dark p-6 shadow-sm border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors"
          >
            <IceCream className="text-primary" size={32} />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Produtos</span>
          </Link>
          <Link
            to="/gestao-pedidos"
            className="flex flex-col items-center gap-3 rounded-xl bg-white dark:bg-surface-dark p-6 shadow-sm border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors"
          >
            <Receipt className="text-primary" size={32} />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Pedidos</span>
          </Link>
          <Link
            to="/gestao-insumos"
            className="flex flex-col items-center gap-3 rounded-xl bg-white dark:bg-surface-dark p-6 shadow-sm border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors"
          >
            <Store className="text-primary" size={32} />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Estoque</span>
          </Link>
          <Link
            to="/relatorios"
            className="flex flex-col items-center gap-3 rounded-xl bg-white dark:bg-surface-dark p-6 shadow-sm border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors"
          >
            <Settings className="text-primary" size={32} />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Relatórios</span>
          </Link>
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