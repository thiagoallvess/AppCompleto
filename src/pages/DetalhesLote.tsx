import { ArrowLeft, Edit, Printer, Trash2, Package, Layers, DollarSign, Calendar } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { showSuccess } from "@/utils/toast";

const DetalhesLote = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const lotId = searchParams.get('id');
  const [lot, setLot] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLotData = () => {
      try {
        const storedLots = localStorage.getItem('productionLots');
        if (storedLots) {
          const lots = JSON.parse(storedLots);
          const foundLot = lots.find((l: any) => l.id.toString() === lotId);
          setLot(foundLot || null);
        }
      } catch (error) {
        console.error('Error loading lot data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (lotId) {
      loadLotData();
    }
  }, [lotId]);

  const handleDelete = () => {
    if (confirm(`Deseja realmente excluir o lote #${lotId}?`)) {
      const storedLots = localStorage.getItem('productionLots');
      if (storedLots) {
        const lots = JSON.parse(storedLots);
        const updatedLots = lots.filter((l: any) => l.id.toString() !== lotId);
        localStorage.setItem('productionLots', JSON.stringify(updatedLots));
        showSuccess("Lote excluído com sucesso.");
        navigate("/gestao-producao");
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "finalizado": return "bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 ring-green-600/20";
      case "em estoque": return "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 ring-yellow-600/20";
      default: return "bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 ring-blue-600/20";
    }
  };

  if (loading) return <div className="p-8 text-center">Carregando...</div>;

  if (!lot) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background-light dark:bg-background-dark">
        <Package size={48} className="text-slate-300 mb-4" />
        <p className="text-slate-500 mb-4">Lote não encontrado.</p>
        <Button asChild><Link to="/gestao-producao">Voltar para Produção</Link></Button>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col pb-24 bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-x-hidden antialiased">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-white/90 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 border-b border-slate-200 dark:border-slate-800">
        <Link
          to="/gestao-producao"
          className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="text-slate-600 dark:text-slate-300" size={24} />
        </Link>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">Lote #{lot.id}</h1>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Printer className="text-slate-600 dark:text-slate-300" size={20} />
        </button>
      </header>

      <main className="flex flex-col gap-6 p-4 max-w-4xl mx-auto w-full">
        {/* Hero Card */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-surface-dark p-5 shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-start gap-4">
            <div className="shrink-0 size-20 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
              <img src={lot.image} alt={lot.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Receita Produzida</span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{lot.name}</h2>
              <div className="mt-2 flex items-center gap-2">
                <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 ring-inset ${getStatusColor(lot.status)}`}>
                  {lot.status}
                </span>
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(lot.date).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Production Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 rounded-xl bg-white dark:bg-surface-dark p-4 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-1">
              <Layers className="text-primary" size={18} />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Volume Produzido</span>
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">{lot.batches} Lote(s)</span>
            <span className="text-xs text-slate-400">Total: {lot.produced} unidades</span>
          </div>
          <div className="flex flex-col gap-1 rounded-xl bg-white dark:bg-surface-dark p-4 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="text-green-500" size={18} />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Custo Total</span>
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">R$ {lot.totalCost.toFixed(2)}</span>
            <span className="text-xs text-slate-400">R$ {lot.unitCost.toFixed(2)} / un</span>
          </div>
        </div>

        {/* Insumos Consumidos */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">Insumos Consumidos</h3>
          <div className="rounded-xl bg-white dark:bg-surface-dark overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
              {lot.costBreakdown?.ingredients?.length > 0 ? (
                lot.costBreakdown.ingredients.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between px-5 py-3.5">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-200">{item.name}</span>
                      <span className="text-[10px] text-slate-400">Ingrediente</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        {(item.quantity * lot.batches).toFixed(2)} {item.unit}
                      </span>
                      <p className="text-[10px] text-slate-400">R$ {(item.totalCost * lot.batches).toFixed(2)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-slate-400 italic">Nenhum detalhe de insumo disponível</div>
              )}
              
              {lot.costBreakdown?.packaging?.map((item: any, idx: number) => (
                <div key={`p-${idx}`} className="flex items-center justify-between px-5 py-3.5">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-200">{item.name}</span>
                    <span className="text-[10px] text-slate-400">Embalagem</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      {(item.quantity * lot.batches).toFixed(2)} {item.unit}
                    </span>
                    <p className="text-[10px] text-slate-400">R$ {(item.totalCost * lot.batches).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 flex gap-3">
          <button 
            onClick={handleDelete}
            className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-100 transition-colors"
          >
            <Trash2 size={18} />
            Excluir Lote
          </button>
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 flex h-20 pb-4 items-center justify-around bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 backdrop-blur-lg bg-opacity-95">
        <Link to="/visao-geral" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-medium">Início</span>
        </Link>
        <Link to="/gestao-producao" className="flex flex-col items-center gap-1 p-2 w-16 text-primary">
          <span className="material-symbols-outlined fill-current">conveyor_belt</span>
          <span className="text-[10px] font-medium">Produção</span>
        </Link>
        <Link to="/gestao-estoque" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400">
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="text-[10px] font-medium">Estoque</span>
        </Link>
        <Link to="/relatorios" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400">
          <span className="material-symbols-outlined">payments</span>
          <span className="text-[10px] font-medium">Finanças</span>
        </Link>
      </nav>
    </div>
  );
};

export default DetalhesLote;