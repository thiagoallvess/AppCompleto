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
    <div className="relative flex flex-col w-full min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header / TopAppBar */}
      <header className="sticky top-0 z-20 bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center p-4 pb-3 justify-between max-w-7xl mx-auto w-full">
          {/* Left Icon (Menu or Back) */}
          <MainDrawer />
          {/* Title */}
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center lg:text-left lg:ml-4">
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
        <div className="px-4 lg:px-0 max-w-7xl mx-auto">
          <div className="flex justify-between gap-2 lg:justify-start lg:gap-8">
            <button
              onClick={() => setActiveTab("Todos")}
              className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 flex-1 lg:flex-none lg:px-6 transition-colors ${
                activeTab === "Todos" ? "border-b-primary text-primary dark:text-primary" : "border-b-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">Todos</p>
            </button>
            <button
              onClick={() => setActiveTab("Insumos")}
              className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 flex-1 lg:flex-none lg:px-6 transition-colors ${
                activeTab === "Insumos" ? "border-b-primary text-primary dark:text-primary" : "border-b-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">Insumos</p>
            </button>
            <button
              onClick={() => setActiveTab("Produtos")}
              className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 flex-1 lg:flex-none lg:px-6 transition-colors ${
                activeTab === "Produtos" ? "border-b-primary text-primary dark:text-primary" : "border-b-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">Produtos</p>
            </button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-4 bg-background-light dark:bg-background-dark sticky top-[108px] z-10 max-w-7xl mx-auto w-full">
        <label className="flex flex-col h-12 w-full max-w-md">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 focus-within:border-primary/50 transition-colors">
            <div className="text-slate-400 dark:text-slate-500 flex items-center justify-center pl-4 pr-2">
              <Search size={20} />
            </div>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden bg-transparent text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border-none h-full placeholder:text-slate-400 dark:placeholder:text-slate-600 px-2 text-base font-normal leading-normal"
              placeholder="Buscar item, código ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </label>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block flex-1 px-4 pb-20 max-w-7xl mx-auto w-full">
        {/* Header with Stats */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Itens em Estoque</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {filteredItems.length} itens • Total: {totalItems} unidades • Valor: R$ {totalValue.toFixed(2)}
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">
              <CheckCircle size={16} />
              <span className="text-sm font-medium">Em dia: {filteredItems.filter(item => item.status === "Em Estoque").length}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400">
              <AlertTriangle size={16} />
              <span className="text-sm font-medium">Repor: {filteredItems.filter(item => item.status === "Baixo").length}</span>
            </div>
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`group relative flex flex-col bg-white dark:bg-surface-dark rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 ${
                item.status === "Baixo" ? "border-yellow-200 dark:border-yellow-800" :
                item.status === "Esgotado" ? "border-red-200 dark:border-red-800" :
                "border-gray-200 dark:border-gray-800"
              }`}
            >
              {/* Status Indicator */}
              {(item.status === "Baixo" || item.status === "Esgotado") && (
                <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === "Baixo" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300" :
                  "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                }`}>
                  {item.status}
                </div>
              )}

              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden rounded-t-xl relative">
                <div
                  className={`bg-center bg-no-repeat bg-cover w-full h-full ${
                    item.status === "Esgotado" ? "grayscale opacity-75" : ""
                  }`}
                  style={{ backgroundImage: `url("${item.image}")` }}
                ></div>
                {item.status === "Esgotado" && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">ESGOTADO</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h4 className={`text-lg font-semibold line-clamp-2 pr-2 ${
                    item.status === "Esgotado" ? "text-slate-400 dark:text-slate-500" : "text-slate-900 dark:text-white"
                  }`}>
                    {item.name}
                  </h4>
                  <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical size={20} />
                  </button>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-3">
                  <span>Custo: R$ {item.cost.toFixed(2)} / {item.unit}</span>
                  <span className="font-medium">Qtd: {item.quantity}</span>
                </div>

                {/* Quantity Controls */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Ajustar Quantidade</span>
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
                          item.quantity === 0
                            ? "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
                            : "bg-white dark:bg-slate-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 text-slate-700 dark:text-slate-300"
                        }`}
                        disabled={item.quantity === 0}
                      >
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                      <span className={`text-lg font-bold min-w-[3ch] text-center ${
                        item.status === "Baixo" ? "text-yellow-600 dark:text-yellow-400" :
                        item.status === "Esgotado" ? "text-red-600 dark:text-red-400" :
                        "text-slate-900 dark:text-white"
                      }`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white hover:bg-primary/90 transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex-1 px-4 pb-20 space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col bg-white dark:bg-surface-dark rounded-xl p-4 gap-3 border shadow-sm ${
              item.status === "Baixo" ? "border-yellow-900/30 relative overflow-hidden" :
              item.status === "Esgotado" ? "border-red-900/30 relative overflow-hidden opacity-90" :
              "border-gray-200 dark:border-gray-800"
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
                    item.status === "Esgotado" ? "text-slate-400 dark:text-slate-500" : "text-white"
                  }`}>
                    {item.name}
                  </h3>
                  <button className="text-slate-400 hover:text-white -mr-2 -mt-2 p-2">
                    <MoreVertical size={20} />
                  </button>
                </div>
                <p className="text-slate-400 text-xs font-medium mt-1">Custo: R$ {item.cost.toFixed(2)} / {item.unit}</p>
                <div className="flex items-center mt-2 gap-2">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
            {/* Stock Controls Actions */}
            <div className={`flex items-center justify-between border-t border-slate-700 pt-3 mt-1 ${
              item.status === "Baixo" || item.status === "Esgotado" ? "pl-2" : ""
            }`}>
              <div className="text-xs text-slate-400">Qtd. Atual</div>
              <div className="flex items-center gap-4 bg-background-dark rounded-lg p-1 px-1">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className={`size-8 flex items-center justify-center rounded transition-colors ${
                    item.quantity === 0
                      ? "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                      : "bg-slate-700 hover:bg-red-500/20 hover:text-red-400 text-white"
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
      </div>

      {/* Bottom Summary */}
      <div className="fixed bottom-0 w-full max-w-md mx-auto lg:max-w-7xl bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
        <span>Total Itens: {totalItems}</span>
        <span>Valor Estimado: R$ {totalValue.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default GestaoEstoque;