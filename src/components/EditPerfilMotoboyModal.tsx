"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { showSuccess } from "@/utils/toast";
import { X, Save, Phone, Bike, Car, Zap } from "lucide-react";

interface EditPerfilMotoboyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditPerfilMotoboyModal = ({ isOpen, onClose }: EditPerfilMotoboyModalProps) => {
  const { profile } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleType, setVehicleType] = useState<'moto' | 'bike' | 'car'>('moto');

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || "");
      setLastName(profile.last_name || "");
      setPhone("(11) 98765-4321"); 
      setVehicleType('moto');
    }
  }, [profile, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("Perfil atualizado com sucesso!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-background-light dark:bg-background-dark border-none p-0 overflow-hidden shadow-2xl rounded-t-3xl sm:rounded-3xl">
        <DialogHeader className="p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">Editar Meu Perfil</DialogTitle>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X size={24} />
            </button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Sobrenome</Label>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Telefone / WhatsApp</Label>
            <div className="relative">
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-10" />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Tipo de Veículo</Label>
            <div className="grid grid-cols-3 gap-3">
              {(['moto', 'bike', 'car'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setVehicleType(type)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    vehicleType === type 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-slate-200 dark:border-slate-800 text-slate-400'
                  }`}
                >
                  {type === 'moto' && <Bike size={20} />}
                  {type === 'bike' && <Zap size={20} />}
                  {type === 'car' && <Car size={20} />}
                  <span className="text-xs font-bold capitalize">{type}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg">
              <Save size={20} className="mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPerfilMotoboyModal;