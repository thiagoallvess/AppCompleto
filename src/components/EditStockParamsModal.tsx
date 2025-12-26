"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Save, AlertTriangle } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface EditStockParamsModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
}

const EditStockParamsModal = ({ isOpen, onClose, item }: EditStockParamsModalProps) => {
  const [minStock, setMinStock] = useState(item?.minStock || "");
  const [leadTime, setLeadTime] = useState(item?.leadTime || "1 dia");
  const [dailyCons, setDailyCons] = useState("2.5");

  const handleSave = () => {
    showSuccess(`Parâmetros de "${item?.name}" atualizados!`);
    onClose();
  };

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-background-light dark:bg-background-dark border-slate-200 dark:border-slate-800 p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center text-amber-600">
              <AlertTriangle size={24} />
            </div>
            <div className="flex flex-col">
              <DialogTitle className="text-lg font-bold">Parâmetros de Estoque</DialogTitle>
              <p className="text-xs text-slate-500">{item.name}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="min">Estoque Mínimo ({item.unit})</Label>
            <Input 
              id="min" 
              type="number" 
              value={minStock} 
              onChange={(e) => setMinStock(e.target.value)}
              className="h-12"
            />
            <p className="text-[10px] text-slate-400">Define quando o item entra em status "Crítico".</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lead">Tempo Reposição</Label>
              <Input 
                id="lead" 
                value={leadTime} 
                onChange={(e) => setLeadTime(e.target.value)}
                placeholder="Ex: 2 dias"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cons">Consumo Diário</Label>
              <Input 
                id="cons" 
                type="number" 
                value={dailyCons} 
                onChange={(e) => setDailyCons(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Sugestão de Ressuprimento</h4>
            <p className="text-sm font-medium">Ponto de pedido calculado: <span className="font-bold text-primary">35 {item.unit}</span></p>
          </div>
        </div>

        <div className="p-4 flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>Cancelar</Button>
          <Button className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20" onClick={handleSave}>
            <Save size={18} className="mr-2" />
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditStockParamsModal;