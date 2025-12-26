import { ArrowLeft, Save, MapPin, Store, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "../contexts/StoreContext";
import { showSuccess, showError } from "../utils/toast";

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

  // Store address state
  const [storeAddress, setStoreAddress] = useState(() => {
    return localStorage.getItem('storeAddress') || '';
  });
  const [storeLat, setStoreLat] = useState(() => {
    return parseFloat(localStorage.getItem('storeLat') || '-23.5505');
  });
  const [storeLng, setStoreLng] = useState(() => {
    return parseFloat(localStorage.getItem('storeLng') || '-46.6333');
  });

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
    
    // Save store address
    localStorage.setItem('storeAddress', storeAddress);
    localStorage.setItem('storeLat', storeLat.toString());
    localStorage.setItem('storeLng', storeLng.toString());
    
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

  // Geocoding function to convert address to coordinates
  const geocodeAddress = useCallback(async (address: string) => {
    if (!address.trim()) return;
    
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`
      );
      const data = await response.json();
      
      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setStoreLat(location.lat);
        setStoreLng(location.lng);
        showSuccess("Endereço localizado com sucesso!");
      } else {
        showError("Endereço não encontrado. Tente ser mais específico.");
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      showError("Erro ao localizar endereço. Verifique sua conexão.");
    }
  }, []);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            to="/visao-geral"
            className="flex items-center justify-center size-10 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Administração</span>
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
            <div className="relative flex h-[24px] w-[44px] cursor-pointer items-center rounded-full border-none bg-slate-300 dark:bg-slate-700 p-0.5 transition-all duration-300">
              <input
                type="checkbox"
                className="sr-only"
                checked={storeOpen}
                onChange={(e) => setStoreOpen(e.target.checked)}
              />
              <div className={`h-[20px] w-[20px] rounded-full bg-white shadow-sm transform transition-transform ${storeOpen ? 'translate-x-5' : ''}`}></div>
            </div>
          </div>

          {/* Store Address Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="text-primary text-lg" />
              <h4 className="text-slate-900 dark:text-white text-base font-semibold">Endereço da Loja</h4>
            </div>
            <div className="space-y-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Endereço Completo</label>
                <div className="flex gap-2">
                  <input 
                    className="form-input flex w-full min-w-0 flex-1 rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark h-12 placeholder:text-slate-400 dark:placeholder-slate-600 p-[15px] text-base font-normal leading-normal transition-all" 
                    placeholder="Rua das Flores, 123 - Centro, São Paulo - SP" 
                    value={storeAddress}
                    onChange={(e) => setStoreAddress(e.target.value)}
                  />
                  <Button 
                    onClick={() => geocodeAddress(storeAddress)}
                    className="bg-primary hover:bg-primary/90 text-white px-4"
                  >
                    <Target size={18} />
                  </Button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Digite o endereço completo e clique no ícone para localizar automaticamente.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Latitude</label>
                  <input 
                    className="form-input flex w-full min-w-0 flex-1 rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark h-12 placeholder:text-slate-400 dark:placeholder-slate-600 p-[15px] text-base font-normal leading-normal transition-all" 
                    type="number"
                    step="0.000001"
                    placeholder="-23.5505"
                    value={storeLat}
                    onChange={(e) => setStoreLat(parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Longitude</label>
                  <input 
                    className="form-input flex w-full min-w-0 flex-1 rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark h-12 placeholder:text-slate-400 dark:placeholder-slate-600 p-[15px] text-base font-normal leading-normal transition-all" 
                    type="number"
                    step="0.000001"
                    placeholder="-46.6333"
                    value={storeLng}
                    onChange={(e) => setStoreLng(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                As coordenadas são usadas para calcular distâncias e taxas de entrega automaticamente.
              </p>
            </div>
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
                    <input
                      className="form-input flex w-full min-w-0 flex-1 rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark h-12 placeholder:text-slate-400 dark:placeholder-slate-600 p-[15px] text-base font-normal leading-normal transition-all" 
                      type="time"
                      value={tempBusinessHours[day.key as keyof typeof tempBusinessHours].open}
                      onChange={(e) => handleTimeChange(day.key, 'open', e.target.value)}
                    />
                    <span className="text-slate-500 dark:text-slate-400">até</span>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark h-12 placeholder:text-slate-400 dark:placeholder-slate-600 p-[15px] text-base font-normal leading-normal transition-all" 
                      type="time"
                      value={tempBusinessHours[day.key as keyof typeof tempBusinessHours].close}
                      onChange={(e) => handleTimeChange(day.key, 'close', e.target.value)}
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
            <span className="material-symbols-outlined text-primary text-xl">savings</span>
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
              <input
                id="cashback-percent"
                type="number"
                value={tempCashback}
                onChange={(e) => setTempCashback(e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark h-12 placeholder:text-slate-400 dark:placeholder-slate-600 p-[15px] pr-10 text-base font-normal leading-normal transition-all" 
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
            </div>
          </div>
        </div>

        {/* Configurações de Indicação */}
        <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-surface-dark p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 dark:border-slate-700/50">
            <span className="material-symbols-outlined text-primary text-xl">share</span>
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
              Programa de Indicação
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Recompensa "Pra Você" (%)</label>
              <div className="relative">
                <input
                  type="number"
                  value={tempRewardYou}
                  onChange={(e) => setTempRewardYou(e.target.value)}
                  className="form-input flex w-full min-w-0 flex-1 rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark h-12 placeholder:text-slate-400 dark:placeholder-slate-600 p-[15px] pr-10 text-base font-normal leading-normal transition-all" 
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Recompensa "Pra Ele" (%)</label>
              <div className="relative">
                <input
                  type="number"
                  value={tempRewardThem}
                  onChange={(e) => setTempRewardThem(e.target.value)}
                  className="form-input flex w-full min-w-0 flex-1 rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark h-12 placeholder:text-slate-400 dark:placeholder-slate-600 p-[15px] pr-10 text-base font-normal leading-normal transition-all" 
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Custos de Produção (Gás, Energia, Mão de Obra) */}
        <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-surface-dark p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 dark:border-slate-700/50">
            <span className="material-symbols-outlined text-primary text-xl">bolt</span>
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Custos de Produção</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Preço Botijão Gás (R$)</label>
              <input value={gasPrice} onChange={(e) => setGasPrice(e.target.value)} className="form-input flex w-full min-w-0 flex-1 rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark h-12 placeholder:text-slate-400 dark:placeholder-slate-600 p-[15px] text-base font-normal leading-normal transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Custo kWh Energia (R$)</label>
              <input value={energyCost} onChange={(e) => setEnergyCost(e.target.value)} className="form-input flex w-full min-w-0 flex-1 rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark h-12 placeholder:text-slate-400 dark:placeholder-slate-600 p-[15px] text-base font-normal leading-normal transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mão de Obra (R$/hora)</label>
              <input value={laborCost} onChange={(e) => setLaborCost(e.target.value)} className="form-input flex w-full min-w-0 flex-1 rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark h-12 placeholder:text-slate-400 dark:placeholder-slate-600 p-[15px] text-base font-normal leading-normal transition-all" />
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
            <Save size={20} />
            Salvar Todas as Configurações
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ConfiguracoesAdmin;