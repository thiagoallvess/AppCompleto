"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { X, Camera, Phone, Save, Bike, Car, Zap } from "lucide-react";
import { useDrivers, Driver } from "@/contexts/DriversContext";
import { showSuccess } from "@/utils/toast";

const VEHICLES = [
  { key: "moto", label: "Moto", icon: Bike },
  { key: "bike", label: "Bike", icon: Zap },
  { key: "car", label: "Carro", icon: Car },
];

const TextField = ({ label, rightIcon: Icon, optional, ...props }: any) => (
  <div className="space-y-2">
    <label className="text-white text-sm font-medium">
      {label}
      {optional && (
        <span className="text-[#92adc9] text-xs font-normal"> (Opcional)</span>
      )}
    </label>
    <div className="relative">
      <Input
        {...props}
        className={`h-12 bg-[#192633] border-[#324d67] text-white rounded-lg ${
          Icon ? "pr-12" : ""
        }`}
      />
      {Icon && (
        <Icon className="absolute right-4 top-1/2 -translate-y-1/2 text-[#92adc9]" size={18} />
      )}
    </div>
  </div>
);

const VehicleButton = ({ active, icon: Icon, label, onClick }: any) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
      active
        ? "bg-[#137fec]/20 border-2 border-[#137fec] text-white"
        : "bg-[#192633] border border-[#324d67] text-[#92adc9] opacity-70"
    }`}
  >
    <Icon size={20} />
    <span className="text-xs font-semibold">{label}</span>
  </button>
);

interface Props {
  isOpen: boolean;
  onClose: () => void;
  driverToEdit?: Driver | null;
}

export default function AddEntregadorModal({ isOpen, onClose, driverToEdit }: Props) {
  const { addDriver, updateDriver } = useDrivers();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    cpf: "",
    vehicleType: "moto",
    isActive: true,
  });

  const setField = (k: string, v: any) =>
    setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    if (!isOpen) return;

    if (driverToEdit) {
      setForm({
        name: driverToEdit.name,
        phone: driverToEdit.phone || "",
        cpf: driverToEdit.cpf || "",
        vehicleType: driverToEdit.vehicleType || "moto",
        isActive: driverToEdit.status !== "offline",
      });
    } else {
      setForm({
        name: "",
        phone: "",
        cpf: "",
        vehicleType: "moto",
        isActive: true,
      });
    }
  }, [driverToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: form.name,
      phone: form.phone,
      cpf: form.cpf,
      vehicleType: form.vehicleType as any,
      status: form.isActive ? "online" : "offline",
      avatar:
        driverToEdit?.avatar ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    };

    if (driverToEdit) {
      updateDriver(driverToEdit.id, data);
      showSuccess(`Entregador ${form.name} atualizado!`);
    } else {
      addDriver({
        ...data,
        id: Date.now().toString(),
        deliveriesToday: 0,
      } as Driver);
      showSuccess(`Entregador ${form.name} cadastrado!`);
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 h-[92vh] sm:h-auto flex flex-col bg-[#101922]">
        <DialogHeader className="bg-[#111a22] px-4 py-4 border-b border-[#324d67]/30">
          <div className="flex justify-between items-center">
            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5">
              <X size={24} />
            </button>
            <DialogTitle className="text-white font-bold">
              {driverToEdit ? "Editar Entregador" : "Adicionar Entregador"}
            </DialogTitle>
            <div className="size-10" />
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto bg-[#111a22]">
          <form id="driver-form" onSubmit={handleSubmit} className="p-4 space-y-6">
            <div className="flex flex-col items-center gap-3">
              <div className="size-24 rounded-full border-2 border-dashed border-[#324d67] flex items-center justify-center">
                <Camera className="text-[#92adc9]" size={32} />
              </div>
              <p className="text-[#92adc9] text-sm">Foto de Perfil</p>
            </div>

            <TextField
              label="Nome Completo"
              value={form.name}
              onChange={(e: any) => setField("name", e.target.value)}
              required
            />

            <TextField
              label="Telefone / WhatsApp"
              value={form.phone}
              onChange={(e: any) => setField("phone", e.target.value)}
              rightIcon={Phone}
              required
            />

            <TextField
              label="CPF"
              optional
              value={form.cpf}
              onChange={(e: any) => setField("cpf", e.target.value)}
            />

            <div className="space-y-3">
              <p className="text-white text-sm font-medium">Tipo de Veículo</p>
              <div className="grid grid-cols-3 gap-3">
                {VEHICLES.map((v) => (
                  <VehicleButton
                    key={v.key}
                    {...v}
                    active={form.vehicleType === v.key}
                    onClick={() => setField("vehicleType", v.key)}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-[#192633] border border-[#324d67] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-full bg-[#111a22] flex items-center justify-center text-[#92adc9]">
                  <Zap size={18} />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Status Ativo</p>
                  <p className="text-[#92adc9] text-[10px]">Receber entregas</p>
                </div>
              </div>
              <Switch
                checked={form.isActive}
                onCheckedChange={(v) => setField("isActive", v)}
                className="data-[state=checked]:bg-[#137fec]"
              />
            </div>
          </form>
        </div>

        <footer className="p-4 border-t border-[#324d67] bg-[#111a22]">
          <Button form="driver-form" type="submit" className="w-full h-12">
            <Save size={18} className="mr-2" />
            Salvar Dados
          </Button>
          <button onClick={onClose} className="w-full mt-2 text-sm text-[#92adc9]">
            Cancelar
          </button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}
