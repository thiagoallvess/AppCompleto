"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { X, Camera, Phone, Save, Bike, Car, Zap } from "lucide-react";
import { useDrivers, Driver } from "@/contexts/DriversContext";
import { showSuccess } from "@/utils/toast";

interface AddEntregadorModalProps {
  isOpen: boolean;
  onClose: () => void;
  driverToEdit?: Driver | null;
}

const AddEntregadorModal = ({ isOpen, onClose, driverToEdit }: AddEntregadorModalProps) => {
  const { addDriver, updateDriver } = useDrivers();
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [vehicleType, setVehicleType] = useState<'moto' | 'bike' | 'car'>('moto');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (driverToEdit) {
      setName(driverToEdit.name);
      setPhone(driverToEdit.phone || "");
      setCpf(driverToEdit.cpf || "");
      setVehicleType(driverToEdit.vehicleType || 'moto');
      setIsActive(driverToEdit.status !== 'offline');
    } else {
      setName("");
      setPhone("");
      setCpf("");
      setVehicleType('moto');
      setIsActive(true);
    }
  }, [driverToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const driverData = {
      name,
      phone,
      cpf,
      vehicleType,
      status: isActive ? 'online' : 'offline' as any,
      avatar: driverToEdit?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    };

    if (driverToEdit) {
      updateDriver(driverToEdit.id, driverData);
      showSuccess(`Entregador ${name} atualizado!`);
    } else {
      const newDriver = {
        ...driverData,
        id: Date.now().toString(),
        deliveriesToday: 0,
      };
      addDriver(newDriver as Driver);
      showSuccess(`Entregador ${name} cadastrado!`);
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-[#101922] border-none p-0 overflow-hidden shadow-2xl rounded-t-3xl sm:rounded-3xl h-[92vh] sm:h-auto flex flex-col">
        <DialogHeader className="sticky top-0 z-10 flex flex-col items-center bg-[#111a22] px-4 py-4 border-b border-[#324d67]/30">
          <div className="h-1.5 w-12 rounded-full bg-[#324d67] mb-4 sm:hidden"></div>
          <div className="w-full flex justify-between items-center">
            <button onClick={onClose} className="text-white hover:bg-white/5 p-2 rounded-full transition-colors">
              <X size={24} />
            </button>
            <DialogTitle className="text-white text-lg font-bold leading-tight tracking-tight">
              {driverToEdit ? "Editar Entregador" : "Adicionar Entregador"}
            </DialogTitle>
            <div className="size-10"></div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto no-scrollbar bg-[#111a22]">
          <form onSubmit={handleSubmit} className="pb-32">
            {/* Avatar Section */}
            <div className="flex flex-col items-center justify-center py-6 gap-3">
              <div className="relative size-24 rounded-full bg-[#192633] border-2 border-dashed border-[#324d67] flex items-center justify-center group cursor-pointer hover:border-[#137fec] transition-colors">
                <Camera className="text-[#92adc9] group-hover:text-[#137fec]" size={32} />
              </div>
              <p className="text-[#92adc9] text-sm font-medium">Foto de Perfil</p>
            </div>

            {/* Fields */}
            <div className="px-4 space-y-4">
              <div className="space-y-2">
                <label className="text-white text-base font-medium">Nome Completo</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: João Silva"
                  className="h-14 bg-[#192633] border-[#324d67] text-white focus:ring-[#137fec]/50 focus:border-[#137fec] rounded-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-white text-base font-medium">Telefone / WhatsApp</label>
                <div className="relative">
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(00) 00000-0000"
                    className="h-14 bg-[#192633] border-[#324d67] text-white focus:ring-[#137fec]/50 focus:border-[#137fec] rounded-lg pr-12"
                    required
                  />
                  <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-[#92adc9]" size={20} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white text-base font-medium">CPF <span className="text-[#92adc9] text-sm font-normal">(Opcional)</span></label>
                <Input
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="000.000.000-00"
                  className="h-14 bg-[#192633] border-[#324d67] text-white focus:ring-[#137fec]/50 focus:border-[#137fec] rounded-lg"
                />
              </div>

              {/* Vehicle Selection */}
              <div className="space-y-3 pt-2">
                <p className="text-white text-base font-medium">Tipo de Veículo</p>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setVehicleType('moto')}
                    className={`flex flex-col items-center justify-center gap-2 rounded-xl p-3 transition-all ${
                      vehicleType === 'moto' 
                        ? 'bg-[#137fec]/20 border-2 border-[#137fec] text-white' 
                        : 'bg-[#192633] border border-[#324d67] text-[#92adc9] opacity-70'
                    }`}
                  >
                    <Bike size={24} />
                    <span className="text-sm font-semibold">Moto</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setVehicleType('bike')}
                    className={`flex flex-col items-center justify-center gap-2 rounded-xl p-3 transition-all ${
                      vehicleType === 'bike' 
                        ? 'bg-[#137fec]/20 border-2 border-[#137fec] text-white' 
                        : 'bg-[#192633] border border-[#324d67] text-[#92adc9] opacity-70'
                    }`}
                  >
                    <Zap size={24} />
                    <span className="text-sm font-semibold">Bike</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setVehicleType('car')}
                    className={`flex flex-col items-center justify-center gap-2 rounded-xl p-3 transition-all ${
                      vehicleType === 'car' 
                        ? 'bg-[#137fec]/20 border-2 border-[#137fec] text-white' 
                        : 'bg-[#192633] border border-[#324d67] text-[#92adc9] opacity-70'
                    }`}
                  >
                    <Car size={24} />
                    <span className="text-sm font-semibold">Carro</span>
                  </button>
                </div>
              </div>

              {/* Status Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-[#192633] border border-[#324d67] mt-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-10 rounded-full bg-[#111a22] text-[#92adc9]">
                    <Zap size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-medium text-base">Status do Entregador</span>
                    <span className="text-[#92adc9] text-xs">Permitir acesso ao app</span>
                  </div>
                </div>
                <Switch
                  checked={isActive}
                  onCheckedChange={setIsActive}
                  className="data-[state=checked]:bg-[#137fec]"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-0 left-0 right-0 bg-[#111a22] border-t border-[#324d67] p-4 flex flex-col gap-3 backdrop-blur-md bg-opacity-95 z-20">
          <Button 
            onClick={handleSubmit}
            className="w-full bg-[#137fec] hover:bg-blue-600 text-white font-bold h-14 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            <Save size={20} className="mr-2" />
            Salvar Dados
          </Button>
          <button 
            onClick={onClose}
            className="w-full py-3 text-[#92adc9] font-semibold hover:text-white transition-colors"
          >
            Cancelar
          </button>
        </footer>
      </DialogContent>
    </Dialog>
  );
};

export default AddEntregadorModal;