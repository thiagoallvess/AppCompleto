import { ArrowLeft, Plus, Search, CheckCircle, AlertTriangle, MoreVertical, Cookie, Package, ChefHat, Archive, IceCream, Tag, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AddInsumo = () => {
  const [insumoName, setInsumoName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");

  const handleSave = () => {
    // TODO: Implement save logic
    console.log("Saving insumo:", { insumoName, category, unit });
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/50">
        <div className="flex items-center gap-2">
          <Link
            to="/gestao-insumos"
            className="flex items-center justify-center size-10 rounded-full text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
        </div>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">Adicionar Insumo</h1>
        <div className="flex items-center gap-2">
          <div className="size-10"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Modal Content */}
      <div className="px-5 py-6 space-y-6 bg-background-light dark:bg-background-dark">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="insumo-name">
            Nome do Insumo
          </label>
          <Input
            id="insumo-name"
            name="insumo-name"
            placeholder="Ex: Leite em pó"
            type="text"
            value={insumoName}
            onChange={(e) => setInsumoName(e.target.value)}
            className="h-12 bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="category">
            Categoria
          </label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-12 bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ingredientes">Ingredientes</SelectItem>
              <SelectItem value="embalagens">Embalagens</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="unit">
            Unidade
          </label>
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger className="h-12 bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700">
              <SelectValue placeholder="Selecione uma unidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">Kg</SelectItem>
              <SelectItem value="g">Grama</SelectItem>
              <SelectItem value="l">Litro</SelectItem>
              <SelectItem value="ml">Mililitro</SelectItem>
              <SelectItem value="un">Unidade</SelectItem>
              <SelectItem value="cx">Caixa</SelectItem>
              <SelectItem value="rolo">Rolo</SelectItem>
              <SelectItem value="pacote">Pacote</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
        <Button
          onClick={handleSave}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold text-sm shadow-lg shadow-primary/20"
        >
          Salvar
        </Button>
      </div>
    </div>
  );
};

export default AddInsumo;