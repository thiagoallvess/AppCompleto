import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Store, Clock, CreditCard, Bell, Shield, Users, Palette, Globe, Smartphone, Mail, Phone, MapPin, DollarSign, Percent, Settings, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStore } from "../contexts/StoreContext";

const ConfiguracoesAdmin = () => {
  const { storeOpen, setStoreOpen, businessHours, setBusinessHours } = useStore();
  const [tempBusinessHours, setTempBusinessHours] = useState(businessHours);
  const [settings, setSettings] = useState({
    storeName: "Geladinhos Gourmet",
    storeDescription: "Geladinhos artesanais feitos com ingredientes frescos e naturais",
    contactEmail: "contato@geladinhosgourmet.com",
    contactPhone: "(11) 99999-9999",
    deliveryFee: 5.00,
    minimumOrder: 15.00,
    cashbackPercentage: 5,
    theme: "light",
    language: "pt-BR",
    notifications: {
      newOrders: true,
      lowStock: true,
      customerMessages: true,
      systemUpdates: false
    }
  });

  useEffect(() => {
    setTempBusinessHours(businessHours);
  }, [businessHours]);

  const handleBusinessHoursChange = (day: string, field: 'open' | 'close', value: string) => {
    setTempBusinessHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSaveAllSettings = () => {
    setBusinessHours(tempBusinessHours);
    // Save other settings to localStorage or API
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    alert('Configurações salvas com sucesso!');
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
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
        {/* Store Status */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-surface-dark p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Store className="text-primary text-xl" />
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Status da Loja</h3>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div className="flex flex-col">
              <span className="text-slate-900 dark:text-white font-medium">Loja Aberta</span>
              <span className="text-slate-500 dark:text-slate-400 text-sm">Aceitar novos pedidos</span>
            </div>
            <Switch
              checked={storeOpen}
              onCheckedChange={setStoreOpen}
            />
          </div>
        </div>

        {/* Business Hours */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-surface-dark p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-primary text-xl" />
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Horário de Funcionamento</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(tempBusinessHours).map(([day, hours]) => (
              <div key={day} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <span className="text-slate-900 dark:text-white font-medium capitalize">
                  {day === 'monday' ? 'Segunda' :
                   day === 'tuesday' ? 'Terça' :
                   day === 'wednesday' ? 'Quarta' :
                   day === 'thursday' ? 'Quinta' :
                   day === 'friday' ? 'Sexta' :
                   day === 'saturday' ? 'Sábado' :
                   'Domingo'}
                </span>
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={hours.open}
                    onChange={(e) => handleBusinessHoursChange(day, 'open', e.target.value)}
                    className="w-24 h-8 text-xs bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                  />
                  <span className="text-slate-500 dark:text-slate-400">-</span>
                  <Input
                    type="time"
                    value={hours.close}
                    onChange={(e) => handleBusinessHoursChange(day, 'close', e.target.value)}
                    className="w-24 h-8 text-xs bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Store Information */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-surface-dark p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Store className="text-primary text-xl" />
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Informações da Loja</h3>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nome da Loja</label>
              <Input
                value={settings.storeName}
                onChange={(e) => handleSettingChange('storeName', e.target.value)}
                className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Descrição</label>
              <Input
                value={settings.storeDescription}
                onChange={(e) => handleSettingChange('storeDescription', e.target.value)}
                className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-surface-dark p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Phone className="text-primary text-xl" />
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Contato</h3>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">E-mail</label>
              <Input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleSettingChange('contactEmail', e.target.value)}
                className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Telefone</label>
              <Input
                value={settings.contactPhone}
                onChange={(e) => handleSettingChange('contactPhone', e.target.value)}
                className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>
        </div>

        {/* Delivery Settings */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-surface-dark p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="text-primary text-xl" />
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Configurações de Entrega</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Taxa de Entrega</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">R$</span>
                </div>
                <Input
                  type="number"
                  step="0.50"
                  value={settings.deliveryFee}
                  onChange={(e) => handleSettingChange('deliveryFee', parseFloat(e.target.value))}
                  className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 pl-10"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Pedido Mínimo</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">R$</span>
                </div>
                <Input
                  type="number"
                  step="0.50"
                  value={settings.minimumOrder}
                  onChange={(e) => handleSettingChange('minimumOrder', parseFloat(e.target.value))}
                  className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cashback Settings */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-surface-dark p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="text-primary text-xl" />
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Cashback</h3>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Percentual de Cashback</label>
            <div className="relative">
              <Input
                type="number"
                min="0"
                max="20"
                value={settings.cashbackPercentage}
                onChange={(e) => handleSettingChange('cashbackPercentage', parseInt(e.target.value))}
                className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700 pr-12"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-slate-500 dark:text-slate-400 font-medium">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-surface-dark p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="text-primary text-xl" />
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Notificações</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div className="flex flex-col">
                <span className="text-slate-900 dark:text-white font-medium">Novos Pedidos</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm">Receber alertas de novos pedidos</span>
              </div>
              <Switch
                checked={settings.notifications.newOrders}
                onCheckedChange={(checked) => handleNotificationChange('newOrders', checked)}
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div className="flex flex-col">
                <span className="text-slate-900 dark:text-white font-medium">Estoque Baixo</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm">Alertas quando produtos acabarem</span>
              </div>
              <Switch
                checked={settings.notifications.lowStock}
                onCheckedChange={(checked) => handleNotificationChange('lowStock', checked)}
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div className="flex flex-col">
                <span className="text-slate-900 dark:text-white font-medium">Mensagens de Clientes</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm">Notificações de mensagens</span>
              </div>
              <Switch
                checked={settings.notifications.customerMessages}
                onCheckedChange={(checked) => handleNotificationChange('customerMessages', checked)}
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div className="flex flex-col">
                <span className="text-slate-900 dark:text-white font-medium">Atualizações do Sistema</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm">Novidades e manutenções</span>
              </div>
              <Switch
                checked={settings.notifications.systemUpdates}
                onCheckedChange={(checked) => handleNotificationChange('systemUpdates', checked)}
              />
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-surface-dark p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Palette className="text-primary text-xl" />
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Aparência</h3>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tema</label>
              <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                <SelectTrigger className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Claro</SelectItem>
                  <SelectItem value="dark">Escuro</SelectItem>
                  <SelectItem value="auto">Automático</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Idioma</label>
              <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                <SelectTrigger className="h-12 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="es-ES">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </main>

      {/* Single Save Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-20">
        <Button
          onClick={handleSaveAllSettings}
          className="w-full max-w-md mx-auto bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">save</span>
          Salvar Todas as Configurações
        </Button>
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

export default ConfiguracoesAdmin;