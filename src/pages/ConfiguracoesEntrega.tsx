import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { showSuccess } from "@/utils/toast";

const ConfiguracoesEntrega = () => {
  const [deliveryConfigs, setDeliveryConfigs] = useState([
    { radius: 0.5, time: 30, fee: 4.99 }, { radius: 1, time: 33, fee: 4.99 },
    { radius: 1.5, time: 35, fee: 5.99 }, { radius: 2, time: 36, fee: 6.99 },
    { radius: 2.5, time: 38, fee: 7.99 }, { radius: 3, time: 39, fee: 7.99 },
    { radius: 3.5, time: 41, fee: 8.99 }, { radius: 4, time: 42, fee: 8.99 },
    { radius: 4.5, time: 43, fee: 10.99 }, { radius: 5, time: 44, fee: 10.99 },
    { radius: 5.5, time: 45, fee: 11.99 }, { radius: 6, time: 47, fee: 12.99 },
    { radius: 6.5, time: 48, fee: 13.99 }, { radius: 7, time: 49, fee: 14.99 },
    { radius: 7.5, time: 50, fee: 15.99 }, { radius: 8, time: 51, fee: 15.99 },
    { radius: 8.5, time: 53, fee: 16.99 }, { radius: 9, time: 54, fee: 16.99 },
    { radius: 9.5, time: 55, fee: 17.99 }, { radius: 10, time: 56, fee: 17.99 },
    { radius: 10.5, time: 57, fee: 18.99 }, { radius: 11, time: 59, fee: 18.99 },
    { radius: 11.5, time: 60, fee: 19.99 }, { radius: 12, time: 61, fee: 22.99 },
    { radius: 12.5, time: 63, fee: 22.99 }, { radius: 13, time: 64, fee: 24.99 },
    { radius: 13.5, time: 65, fee: 24.99 }, { radius: 14, time: 67, fee: 24.99 },
    { radius: 14.5, time: 68, fee: 24.99 }, { radius: 15, time: 69, fee: 24.99 }
  ]);

  const handleTimeChange = (index: number, value: string) => {
    const newConfigs = [...deliveryConfigs];
    newConfigs[index].time = parseInt(value) || 0;
    setDeliveryConfigs(newConfigs);
  };

  const handleFeeChange = (index: number, value: string) => {
    const newConfigs = [...deliveryConfigs];
    newConfigs[index].fee = parseFloat(value) || 0;
    setDeliveryConfigs(newConfigs);
  };

  const handleSave = () => {
    // In a real app, save to backend or localStorage
    showSuccess("Configurações de entrega salvas com sucesso!");
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-[#333]">
        <Link
          to="/configuracoes-admin"
          className="text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-white/10 cursor-pointer"
        >
          <ArrowLeft size={24} />
        </Link>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Configurações de Entrega</h2>
      </header>

      {/* Main Content */}
      <div className="relative flex flex-col w-full max-w-md mx-auto overflow-x-hidden">
        {/* Section 1: Tempo e Taxa */}
        <div className="pt-5 px-4">
          <h3 className="text-white tracking-tight text-xl font-bold leading-tight text-left pb-3">Tempo e Taxa</h3>
          <div className="p-4 rounded-xl bg-surface-dark border border-[#333] flex gap-4 items-start shadow-sm">
            <span className="material-symbols-outlined text-primary text-2xl shrink-0 mt-0.5">info</span>
            <div className="flex flex-col gap-1">
              <p className="text-white text-base font-bold leading-tight">Entrega Parceira</p>
              <p className="text-text-secondary text-sm font-normal leading-relaxed">Na Entrega Parceira as definições de área, tempo e taxa de entrega são feitas pelo IFood.</p>
            </div>
          </div>
        </div>

        {/* Section 2: Padrão */}
        <div className="pt-8 px-4">
          <h3 className="text-white tracking-tight text-xl font-bold leading-tight text-left pb-3">Padrão</h3>
          {/* Delivery Method Field */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-text-secondary">Método de entrega</label>
            <div className="flex w-full items-center rounded-lg bg-input-dark border border-transparent focus-within:border-primary/50 transition-colors">
              <input 
                className="w-full bg-transparent border-none text-white placeholder-text-secondary h-12 px-4 focus:ring-0 text-base" 
                readOnly 
                value="O entregador leva até você agora"
              />
              <div className="pr-4 text-text-secondary">
                <span className="material-symbols-outlined">edit</span>
              </div>
            </div>
          </div>

          {/* Configuration Table Header */}
          <div className="sticky top-[72px] z-10 grid grid-cols-[1fr_1.2fr_1.2fr] gap-2 bg-background-dark py-3 border-b border-[#333] mb-2 text-xs uppercase tracking-wider font-bold text-text-secondary">
            <div className="text-center">Raio (km)</div>
            <div className="text-center">Tempo (min)</div>
            <div className="text-center">Taxa (R$)</div>
          </div>

          {/* Configuration Table Body */}
          <div className="flex flex-col gap-2">
            {deliveryConfigs.map((config, index) => (
              <div key={index} className="grid grid-cols-[1fr_1.2fr_1.2fr] gap-2 items-center py-1">
                {/* Radius */}
                <div className="flex items-center justify-center h-10 rounded bg-surface-dark/50 text-white font-medium text-sm">
                  {config.radius} km
                </div>
                
                {/* Time Input */}
                <div className="relative">
                  <Input 
                    type="number" 
                    className="w-full h-10 bg-input-dark border border-transparent focus:border-primary rounded text-center text-white text-sm font-bold focus:ring-0 px-2" 
                    value={config.time}
                    onChange={(e) => handleTimeChange(index, e.target.value)}
                  />
                </div>
                
                {/* Fee Input */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-xs">R$</span>
                  <Input 
                    type="number" 
                    step="0.01" 
                    className="w-full h-10 bg-input-dark border border-transparent focus:border-primary rounded text-right text-white text-sm font-bold focus:ring-0 pr-4 pl-8" 
                    value={config.fee.toFixed(2)}
                    onChange={(e) => handleFeeChange(index, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="h-10"></div>
        </div>
      </div>

      {/* Sticky Footer Action */}
      <div className="fixed bottom-0 left-0 w-full bg-background-dark/95 backdrop-blur-sm border-t border-[#333] p-4 flex justify-center z-30">
        <Button 
          onClick={handleSave}
          className="w-full max-w-md bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
        >
          <Save size={20} />
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
};

export default ConfiguracoesEntrega;