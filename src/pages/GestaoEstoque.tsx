import { ArrowLeft, Plus, Search, MoreVertical, Package, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import MainDrawer from "../components/MainDrawer";

const GestaoEstoque = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Todos");

  // Mock data for stock items
  const stockItems = [
    {
      id: "1",
      name: "Geladinho Ninho c/ Nutella",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeuUQfhBKVioFywvwbpNj56wuMrCN4ydz-WKm3QZuFeIq_oMfG8hMK7CSxXJIIDXKEToUfKrtidvSTvl8tW2Y4Wx31V9lP9hE7me2ltLXglzXhsrbr43cEDP47hmajHD36EWjn6HstiGef2ecnbiQ3yRdUJ8FpYNEoe_DakBS3bJWiw4y80eC56U60xqwZwFClixX-er-PbW3V1SW4nm5BPU0da1zQNWLsxBtYtjX1rBcs9kEXLyclVATclKk785edcPKcR2FGSQ",
      cost: 3.50,
      unit: "un",
      quantity: 45,
      status: "Em Estoque",
      statusColor: "primary",
      category: "Produtos"
    },
    {
      id: "2",
      name: "Leite Condensado",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATREVU-mXbONCd3THFE1zeXT5K44tu3lSDzUor_Seuf2vry8x_MZeFMJUqXYvKmIqRVGzp5twmmAc5BKetK8kZNYkhEVyyfhfyqEsGqO8Gx8WPFabHKEx-l3NdxeHL6-7hQaDsMmxJNySa3xJwNoqNdLx_10808-BZukI9lCEJ1q-8kRGRG-ZEhASTb-7vsXWgbhp5EM9S7JwsaOyk9XrAV8ujjgxZIjJd2fGqFm1934quXJTepDl1QF-U2Qq49WcgUUmu7aePsA",
      cost: 4.90,
      unit: "lata",
      quantity: 12,
      status: "Baixo",
      statusColor: "yellow",
      category: "Insumos"
    },
    {
      id: "3",
      name: "Morangos Frescos",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6f6Y5H7XazcMuklDiZykYO7Cqwej__WnFII60Lraay5watUDCeXd90x2qWIv1ZgEP3yulge9nl5g9YjtbzjMD0cmkd0JTTqRcers8EYjWKapKYR6EKgYIPOxZPA6O5rm7ghotoiw1rgg6j2Wz-2bUxXNyD3PeOL_EW5ggGPyUCjdzuckZF-YQ97-5WoQHcpcpFMLY_QTG_xtOfjV4xTgRXmBH1FOd2zSct4vnZik6E7eoafR_Kyk6vfDti1HIKbeGUEQmMB0d_Q",
      cost: 12.00,
      unit: "kg",
      quantity: 0,
      status: "Esgotado",
      statusColor: "red",
      category: "Insumos"
    },
    {
      id: "4",
      name: "Geladinho de Maracujá",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuUKhhVdyJaNkS1H6pJI6-iyD-y1FFIw39TtLieAPELfDoPfhzqLI7QOVrjaFAWxGaBk_zfvGeEGTh2qnv2mPLkoOP_Dp6r94VGpRv1jcbAFactKE8fAjLHh9b_fgiZM1qbsV31M5dKhhv-7A-T3AOj47DTzLiziAVkJTfAwVszQuFsLk3cuGjwd7RISh8OKkbFe8bjiaU816XbcTI1Q2IF7yRSuvYJs0e8JMMdzI5_xnerOiUrgB-9P1EqbgpgcuyX12uBA6lvw",
      cost: 2.80,
      unit: "un",
      quantity: 82,
      status: "Em Estoque",
      statusColor: "primary",
      category: "Produtos"
    }
  ];

  const filteredItems = stockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "Todos" || item.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const totalItems = filteredItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = filteredItems.reduce((sum, item) => sum + (item.cost * item.quantity), 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em Estoque":
        return "bg-primary/20 text-primary ring-primary/30";
      case "Baixo":
        return "bg-yellow-400/10 text-yellow-400 ring-yellow-400/20";
      case "Esgotado":
        return "bg-red-400/10 text-red-400 ring-red-400/20";
      default:
        return "bg-gray-400/10 text-gray-400 ring-gray-400/20";
    }
  };

  const updateQuantity = (id: string, change: number) => {
    // In a real app, this would update the backend/localStorage
    console.log(`Update quantity for ${id} by ${change}`);
  };

  return (
    <div className="relative flex flex-col w-full max-w-md mx-auto min-h-screen bg-background-dark shadow-2xl overflow-hidden">
      {/* Header / TopAppBar */}
      <header className="sticky top-0 z-20 bg-background-dark/95 backdrop-blur-sm border-b border-surface-dark-lighter">
        <div className="flex items-center p-4 pb-3 justify-between">
          {/* Left Icon (Menu or Back) */}
          <MainDrawer />
          {/* Title */}
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
            Gestão de Estoque
          </h2>
          {/* Right Action (Add Item) */}
          <div className="flex size-10 items-center justify-end">
            <Link to="/add-insumo" className="flex size-10 items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors shadow-lg">
              <Plus size={24} />
            </Link>
          </div>
        </div>
        {/* Tabs */}
        <div className="px-0">
          <div className="flex px-4 justify-between gap-2">
            <button
              onClick={() => setActiveTab("Todos")}
              className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 flex-1 transition-colors ${
                activeTab === "Todos" ? "border-b-primary text-white" : "border-b-transparent text-text-secondary hover:text-white"
              }`}
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">Todos</p>
            </button>
            <button
              onClick={() => setActiveTab("Insumos")}
              className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 flex-1 transition-colors ${
                activeTab === "Insumos" ? "border-b-primary text-white" : "border-b-transparent text-text-secondary hover:text-white"
              }`}
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">Insumos</p>
            </button>
            <button
              onClick={() => setActiveTab("Produtos")}
              className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 flex-1 transition-colors ${
                activeTab === "Produtos" ? "border-b-primary text-white" : "border-b-transparent text-text-secondary hover:text-white"
              }`}
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">Produtos</p>
            </button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-4 bg-background-dark sticky top-[108px] z-10">
        <label className="flex flex-col h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-surface-dark-lighter border border-transparent focus-within:border-primary/50 transition-colors">
            <div className="text-text-secondary flex items-center justify-center pl-4 pr-2">
              <Search size={20} />
            </div>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden bg-transparent text-white focus:outline-0 focus:ring-0 border-none h-full placeholder:text-text-secondary/70 px-2 text-base font-normal leading-normal"
              placeholder="Buscar item, código ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </label>
      </div>

      {/* Scrollable Content List */}
      <main className="flex-1 px-4 pb-20 space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col bg-surface-dark rounded-xl p-4 gap-3 border shadow-sm ${
              item.status === "Baixo" ? "border-yellow-900/30 relative overflow-hidden" :
              item.status === "Esgotado" ? "border-red-900/30 relative overflow-hidden opacity-90" :
              "border-surface-dark-lighter"
            }`}
          >
            {item.status === "Baixo" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500/50"></div>}
            {item.status === "Esgotado" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600/50"></div>}
            <div className={`flex gap-4 ${item.status === "Baixo" || item.status === "Esgotado" ? "pl-2" : ""}`}>
              {/* Image */}
              <div
                className={`bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-[72px] shrink-0 relative overflow-hidden group ${
                  item.status === "Esgotado" ? "grayscale" : ""
                }`}
                style={{ backgroundImage: `url("${item.image}")` }}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              </div>
              {/* Main Info */}
              <div className="flex flex-1 flex-col justify-start">
                <div className="flex justify-between items-start">
                  <h3 className={`text-base font-semibold leading-tight line-clamp-1 ${
                    item.status === "Esgotado" ? "text-text-secondary" : "text-white"
                  }`}>
                    {item.name}
                  </h3>
                  <button className="text-text-secondary hover:text-white -mr-2 -mt-2 p-2">
                    <MoreVertical size={20} />
                  </button>
                </div>
                <p className="text-text-secondary text-xs font-medium mt-1">Custo: R$ {item.cost.toFixed(2)} / {item.unit}</p>
                <div className="flex items-center mt-2 gap-2">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
            {/* Stock Controls Actions */}
            <div className={`flex items-center justify-between border-t border-surface-dark-lighter pt-3 mt-1 ${
              item.status === "Baixo" || item.status === "Esgotado" ? "pl-2" : ""
            }`}>
              <div className="text-xs text-text-secondary">Qtd. Atual</div>
              <div className="flex items-center gap-4 bg-background-dark rounded-lg p-1 px-1">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className={`size-8 flex items-center justify-center rounded transition-colors ${
                    item.quantity === 0
                      ? "bg-surface-dark-lighter/50 text-text-secondary cursor-not-allowed"
                      : "bg-surface-dark-lighter hover:bg-red-500/20 hover:text-red-400 text-white"
                  }`}
                  disabled={item.quantity === 0}
                >
                  <span className="material-symbols-outlined text-[20px]">remove</span>
                </button>
                <span className={`text-lg font-bold min-w-[3ch] text-center ${
                  item.status === "Baixo" ? "text-yellow-400" :
                  item.status === "Esgotado" ? "text-red-500" :
                  "text-white"
                }`}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="size-8 flex items-center justify-center rounded bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-[20px]">add</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Bottom Summary */}
      <div className="fixed bottom-0 w-full max-w-md bg-surface-dark/95 backdrop-blur border-t border-surface-dark-lighter p-4 flex justify-between items-center text-xs text-text-secondary">
        <span>Total Itens: {totalItems}</span>
        <span>Valor Estimado: R$ {totalValue.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default GestaoEstoque;