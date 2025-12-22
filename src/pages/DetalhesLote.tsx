import { ArrowLeft, Edit, Printer, Trash2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const DetalhesLote = () => {
  const [searchParams] = useSearchParams();
  const lotId = searchParams.get('id');
  const [lot, setLot] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load lot data from localStorage or API
    const loadLotData = () => {
      try {
        const storedLots = localStorage.getItem('productionLots');
        if (storedLots) {
          const lots = JSON.parse(storedLots);
          const foundLot = lots.find((l: any) => l.id.toString() === lotId);
          if (foundLot) {
            setLot(foundLot);
          } else {
            // Fallback to mock data if not found
            setLot(getMockLotData(lotId));
          }
        } else {
          // Fallback to mock data
          setLot(getMockLotData(lotId));
        }
      } catch (error) {
        console.error('Error loading lot data:', error);
        setLot(getMockLotData(lotId));
      } finally {
        setLoading(false);
      }
    };

    if (lotId) {
      loadLotData();
    } else {
      setLoading(false);
    }
  }, [lotId]);

  const getMockLotData = (id: string | null) => {
    const mockData = {
      "8349": {
        id: "8349",
        name: "Ninho com Nutella",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkd8lB5c2Vaw9ZupDeGKA8CqQrsuCbv1IVWtjP1Pgq6N5JYAMjwdcNFdmTh7yXGKKGPykrJKJC3EQGvyud_4OcMgbqUKbbJxg_HMmq1DxGVHqG67Xx_g_O1nhM68hW_zb8fX5mpqZq1K6sshICrQCxa8oV61kN1WUpqDp5PiU3Ww7K_MZF2TOu-iy-FqWeK-zibAFwgP0IvVgMX4QnpBYdPUzoUzGQaTcXvNfJTbTCUlmXc25qyIc3GuUHXF19vX4tEBWm0AYdEA",
        status: "Finalizado",
        statusColor: "green",
        date: "12/08/2023",
        produced: 50,
        totalCost: 75.00,
        unitCost: 1.50,
        inputs: [
          { name: "Leite Integral", category: "Laticínios", quantity: "4 Litros" },
          { name: "Leite Ninho", category: "Secos", quantity: "800g" },
          { name: "Nutella", category: "Recheio", quantity: "650g" },
          { name: "Liga Neutra", category: "Aditivos", quantity: "40g" },
          { name: "Saquinhos 5x24", category: "Embalagem", quantity: "50 un" }
        ]
      },
      "8348": {
        id: "8348",
        name: "Morango Gourmet",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCM3cfAeatmEUtNaDEnz796M7L7_1N-EtyXmykGuHogX2Bqw0GLmlvYa3HPA8Wz1_4o9F5wPSUrzWkU8Yp7doalaFscT5306YI3bZgNz9gTLuFuBl4eyymE72I2oud60ide53rz4tw6ycGt2mAau951TpWIjxrfxMQg_NpEJUwcm1qol_S5JpSoZbGnw8au7eUWzH4lvezL2wocDTs541UOAWtFuVwleVW5xacABNhs7r5_Xla2rV2_GgGzX6Ol3wbDpTujEKBi_A",
        status: "Em Estoque",
        statusColor: "yellow",
        date: "11/08/2023",
        produced: 30,
        totalCost: 45.00,
        unitCost: 1.50,
        inputs: [
          { name: "Leite Integral", category: "Laticínios", quantity: "2.4 Litros" },
          { name: "Morango Bandeja", category: "Frutas", quantity: "1.2 kg" },
          { name: "Leite Condensado", category: "Laticínios", quantity: "1 un" },
          { name: "Liga Neutra", category: "Aditivos", quantity: "24g" },
          { name: "Saquinhos 5x24", category: "Embalagem", quantity: "30 un" }
        ]
      }
    };
    return mockData[id as keyof typeof mockData] || mockData["8349"];
  };

  const getStatusColor = (color: string) => {
    switch (color) {
      case "green": return "bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 ring-green-600/20";
      case "yellow": return "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 ring-yellow-600/20";
      default: return "bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400 ring-gray-600/20";
    }
  };

  const totalInputsCost = lot?.inputs?.reduce((sum, input) => {
    // Mock cost calculation - in real app this would be from data
    return sum + (Math.random() * 10); // Placeholder
  }, 0) || 0;

  if (loading) {
    return (
      <div className="relative flex min-h-screen w-full flex-col pb-24 bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-x-hidden antialiased">
        <header className="sticky top-0 z-30 flex items-center justify-between bg-white/90 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <Link
            to="/gestao-producao"
            className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="text-slate-600 dark:text-slate-300" size={24} />
          </Link>
          <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center text-slate-900 dark:text-white">Carregando...</h1>
          <div className="size-10"></div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-slate-500 dark:text-slate-400">Carregando detalhes do lote...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!lot) {
    return (
      <div className="relative flex min-h-screen w-full flex-col pb-24 bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-x-hidden antialiased">
        <header className="sticky top-0 z-30 flex items-center justify-between bg-white/90 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <Link
            to="/gestao-producao"
            className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="text-slate-600 dark:text-slate-300" size={24} />
          </Link>
          <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center text-slate-900 dark:text-white">Lote não encontrado</h1>
          <div className="size-10"></div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <span className="material-symbols-outlined text-slate-400 text-6xl mb-4">inventory_2</span>
            <p className="text-slate-500 dark:text-slate-400 mb-4">Lote não encontrado</p>
            <Link
              to="/gestao-producao"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft size={16} />
              Voltar para Produção
            </Link>
          </div>
        </div>
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
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center text-slate-900 dark:text-white">Detalhes do Lote</h1>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Edit className="text-slate-600 dark:text-slate-300" size={24} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-6 p-4">
        {/* Lot Header Card */}
        <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-surface-dark p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800/60">
          <div className="flex items-start gap-4">
            <div className="shrink-0 relative size-20 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${lot.image}')` }}
              ></div>
            </div>
            <div className="flex flex-1 flex-col justify-center h-20">
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1">Receita</span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{lot.name}</h2>
              <div className="mt-2 flex items-center gap-2">
                <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ring-1 ring-inset ${getStatusColor(lot.statusColor)}`}>
                  {lot.status}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Lote #{lot.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 rounded-xl bg-white dark:bg-surface-dark p-4 shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-slate-100 dark:border-slate-800/60">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-slate-400 text-[20px]">calendar_today</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Data</span>
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">{lot.date}</span>
          </div>
          <div className="flex flex-col gap-1 rounded-xl bg-white dark:bg-surface-dark p-4 shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-slate-100 dark:border-slate-800/60">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary text-[20px]">inventory_2</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Produzido</span>
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">{lot.produced} un</span>
          </div>
          <div className="flex flex-col gap-1 rounded-xl bg-white dark:bg-surface-dark p-4 shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-slate-100 dark:border-slate-800/60">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-[20px]">attach_money</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Custo Total</span>
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">R$ {lot.totalCost.toFixed(2)}</span>
          </div>
          <div className="flex flex-col gap-1 rounded-xl bg-white dark:bg-surface-dark p-4 shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-slate-100 dark:border-slate-800/60">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-orange-500 text-[20px]">sell</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Custo Unit.</span>
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">R$ {lot.unitCost.toFixed(2)}</span>
          </div>
        </div>

        {/* Inputs Summary */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">Resumo de Insumos</h3>
          <div className="rounded-xl bg-white dark:bg-surface-dark overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800/60">
            <div className="flex items-center justify-between px-5 py-3 bg-slate-50 dark:bg-black/20 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-xs font-semibold text-slate-500">Item</span>
              <span className="text-xs font-semibold text-slate-500">Qtd. Utilizada</span>
            </div>
            <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800/60">
              {lot.inputs.map((input, index) => (
                <div key={index} className="flex items-center justify-between px-5 py-3.5">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-200">{input.name}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">{input.category}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{input.quantity}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between px-5 py-3 bg-slate-50/50 dark:bg-black/10 border-t border-slate-100 dark:border-slate-800/60">
              <span className="text-xs font-medium text-slate-500">Total Insumos</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">R$ {totalInputsCost.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 pb-6 flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 h-12 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Printer className="text-[20px]" />
            Imprimir Etiqueta
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 h-12 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 text-red-700 dark:text-red-400 font-semibold text-sm hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
            <Trash2 className="text-[20px]" />
            Excluir Lote
          </button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 flex h-20 pb-4 items-center justify-around bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800/80 backdrop-blur-lg bg-opacity-95">
        <Link to="/visao-geral" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <span className="material-symbols-outlined text-[24px]">dashboard</span>
          <span className="text-[10px] font-medium">Início</span>
        </Link>
        <Link to="/gestao-producao" className="flex flex-col items-center gap-1 p-2 w-16 text-primary">
          <span className="material-symbols-outlined fill-current text-[24px]">conveyor_belt</span>
          <span className="text-[10px] font-medium">Produção</span>
        </Link>
        <Link to="/gestao-estoque" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <span className="material-symbols-outlined text-[24px]">inventory_2</span>
          <span className="text-[10px] font-medium">Estoque</span>
        </Link>
        <Link to="/relatorios" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <span className="material-symbols-outlined text-[24px]">payments</span>
          <span className="text-[10px] font-medium">Finanças</span>
        </Link>
      </nav>
    </div>
  );
};

export default DetalhesLote;