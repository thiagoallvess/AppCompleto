"use client";

import { ArrowLeft, Settings, TrendingUp, ShoppingCart, Factory, CheckCircle, PriorityHigh } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/contexts/ProductsContext";
import { useRecipes } from "@/contexts/RecipesContext";
import { useStock } from "@/contexts/StockContext";
import { showSuccess } from "@/utils/toast";

const PrevisaoProducao = () => {
  const [selectedDate, setSelectedDate] = useState("Hoje");
  const [productionQuantities, setProductionQuantities] = useState<{[key: string]: number}>({
    "Ninho com Nutella": 45,
    "Morango Nordestino": 30,
    "Coco Cremoso": 20
  });

  const { products } = useProducts();
  const { recipes } = useRecipes();
  const { ingredients } = useStock();

  const dateFilters = ["Hoje", "Amanhã", "Próx. 7 Dias"];

  // Mock data for production suggestions based on sales history
  const productionSuggestions = [
    {
      id: "ninho-nutella",
      name: "Ninho com Nutella",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcem832egWXt9g0sr7IQhaYBWw5yT5xULZpeeROZwwnFS21gbRXQq3TNMsQYkNnW03j6Xx_jiOvlJS1xVC7eKTdhoO-ZS9Lx9me9j-0epfqTU9Yh8DAywrC16UajwTbM7X2dunov4WxbntGxgdXBenBcbSUGIm6OyGiMiJArLWav9OuKyj4mFVyYnrkVTsw_dYAlRrpSYK5zatG74XYNnhLxGa6g2XzHqRQbAGUBO8YGAC9WucH-nIKqIyt8Q5NzeTr4iJKL_-yA",
      averageDaily: 40,
      suggested: productionQuantities["Ninho com Nutella"]
    },
    {
      id: "morango-nordestino",
      name: "Morango Nordestino",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuASWFUZ1WteXR7eKcfuHqJXpCBGb_DWEv0OAHDt_f_TmXjtiRBeoM1r49ju-rzTDBx8052mZNoNqcbaBDhRk8F6gDG8QqDoWRLr0NGKBYPICSDSPoxxRnMA1gzxXHLTWfhKYJMiEgG-foTOM_nvP2mMi78kzV5UUK27obAJfKKCAMQDueKH5Yb9thvqUOdDQjy4NzDVvf-WGeAikHNWrdS7Vn9QXlQGRWKGP34MQx7PCZQ8oAJIoJKPXNgn1-I5pXt1VB7y-o01dQ",
      averageDaily: 25,
      suggested: productionQuantities["Morango Nordestino"]
    },
    {
      id: "coco-cremoso",
      name: "Coco Cremoso",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkTdciVL3YlNpFjZTZvTz-kBG4Fq4E641Sa1H51pE_lYYORs3AL5tFmnnw-4_XPO60DKtVnmIKLgRCTVWV1QApGljfipf4dmB_sG4TgjtZXMhacb-bO1J9h4y7mSGodz0_2JCxiqR5ME9sRcoBnDgpzdvnmbU-4VvLtdcMdpHvGcnRc5oxv62RcuKOyTdk1jg9oVpHG9IfMBX11sbhrfI1IF3MeO2di4jdbIZQdlDnP6wC5DRom_MwW13XZ0c2SJbBCv0MbLOv8A",
      averageDaily: 18,
      suggested: productionQuantities["Coco Cremoso"]
    }
  ];

  // Calculate required inventory based on production quantities
  const calculateRequiredInventory = () => {
    const requirements = [
      {
        name: "Leite Condensado",
        required: Math.ceil((productionQuantities["Ninho com Nutella"] * 0.3) + (productionQuantities["Morango Nordestino"] * 0.2) + (productionQuantities["Coco Cremoso"] * 0.25)),
        unit: "Latas",
        available: 15,
        status: "ok"
      },
      {
        name: "Morango Fresco",
        required: Math.ceil(productionQuantities["Morango Nordestino"] * 0.15),
        unit: "Kg",
        available: 3,
        status: "warning"
      },
      {
        name: "Leite Integral",
        required: Math.ceil((productionQuantities["Ninho com Nutella"] * 0.2) + (productionQuantities["Morango Nordestino"] * 0.25) + (productionQuantities["Coco Cremoso"] * 0.3)),
        unit: "Litros",
        available: 8,
        status: "ok"
      }
    ];
    return requirements;
  };

  const requiredInventory = calculateRequiredInventory();

  const handleQuantityChange = (productName: string, change: number) => {
    setProductionQuantities(prev => ({
      ...prev,
      [productName]: Math.max(0, prev[productName] + change)
    }));
  };

  const handleGenerateShoppingList = () => {
    const lowStockItems = requiredInventory.filter(item => item.status === "warning");
    if (lowStockItems.length > 0) {
      showSuccess("Lista de compras gerada com itens em falta!");
      // In a real app, this would navigate to the shopping list page
    } else {
      showSuccess("Todos os itens estão em estoque suficiente!");
    }
  };

  const handleStartProductionPlan = () => {
    showSuccess("Plano de produção iniciado com sucesso!");
    // In a real app, this would create a production plan
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            to="/visao-geral"
            className="flex items-center justify-center size-10 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Produção</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Previsão de Produção</h1>
          </div>
        </div>
        <div className="flex items-center justify-end pr-4">
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
            <Settings size={24} />
          </button>
        </div>
      </header>

      {/* Date Filters */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {dateFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedDate(filter)}
              className={`flex h-9 shrink-0 items-center justify-center rounded-full px-5 transition-all ${
                selectedDate === filter
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-gray-200 dark:bg-surface-dark border dark:border-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-white/5"
              }`}
            >
              <span className="text-sm font-bold">{filter}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Highlight Insight Card */}
      <div className="px-4 py-2">
        <div className="relative overflow-hidden rounded-xl bg-surface-darker p-5 shadow-lg ring-1 ring-white/10">
          <div className="absolute top-0 right-0 -mt-2 -mr-2 h-24 w-24 rounded-full bg-primary/10 blur-2xl"></div>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
              <TrendingUp size={24} />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-bold leading-tight text-white">Alta Demanda: Sexta-feira</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Histórico aponta <span className="text-primary font-bold">+30% em vendas</span>. 
                Foque nos sabores cremosos como Ninho.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Suggestions */}
      <div className="mt-4">
        <div className="flex items-center justify-between px-4 pb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sugestão por Sabor</h3>
          <span className="text-xs font-medium text-primary cursor-pointer hover:underline">Ver todos</span>
        </div>
        <div className="flex flex-col gap-3 px-4">
          {productionSuggestions.map((item) => (
            <div
              key={item.id}
              className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-xl bg-white dark:bg-surface-dark p-3 shadow-sm ring-1 ring-gray-200 dark:ring-white/5 transition-all active:scale-[0.99]"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div
                  className="h-16 w-16 shrink-0 rounded-lg bg-gray-100 dark:bg-gray-800 bg-cover bg-center"
                  style={{ backgroundImage: `url("${item.image}")` }}
                ></div>
                <div className="flex flex-col">
                  <h4 className="truncate text-base font-bold text-gray-900 dark:text-white">{item.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <span className="material-symbols-outlined text-[14px]">history</span>
                    <span>Média: {item.averageDaily}/dia</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Sugerido</span>
                <div className="flex items-center rounded-lg bg-background-light dark:bg-background-dark border dark:border-white/5 p-1">
                  <button
                    onClick={() => handleQuantityChange(item.name, -5)}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10"
                  >
                    <span className="material-symbols-outlined text-sm">remove</span>
                  </button>
                  <input
                    className="w-8 bg-transparent text-center text-base font-bold text-primary focus:outline-none p-0 border-none focus:ring-0"
                    type="text"
                    value={productionQuantities[item.name]}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setProductionQuantities(prev => ({ ...prev, [item.name]: value }));
                    }}
                  />
                  <button
                    onClick={() => handleQuantityChange(item.name, 5)}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-primary hover:bg-primary/10"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inventory Calculation Section */}
      <div className="mt-8 px-4 pb-4">
        <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">Estoque Necessário</h3>
        <div className="rounded-xl bg-white dark:bg-surface-dark p-4 shadow-sm ring-1 ring-gray-200 dark:ring-white/5">
          {/* Alert Banner */}
          {requiredInventory.some(item => item.status === "warning") && (
            <div className="mb-4 flex items-start gap-3 rounded-lg bg-amber-500/10 p-3 text-amber-600 dark:text-amber-500">
              <PriorityHigh size={20} className="shrink-0" />
              <div className="text-sm font-medium leading-tight">
                Atenção: Estoque insuficiente de Morango para esta produção.
              </div>
            </div>
          )}
          <div className="space-y-4">
            {requiredInventory.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b border-dashed border-gray-200 dark:border-white/10 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded ${
                    item.status === "ok" ? "bg-gray-100 dark:bg-white/5" : "bg-amber-500/20"
                  }`}>
                    {item.status === "ok" ? (
                      <CheckCircle size={16} className="text-gray-500" />
                    ) : (
                      <PriorityHigh size={16} className="text-amber-500" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item.name}</span>
                    {item.status === "warning" && (
                      <span className="text-[10px] text-amber-500 font-bold">
                        Faltam {item.required - item.available} {item.unit.toLowerCase()}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{item.required} {item.unit}</span>
              </div>
            ))}
          </div>
          {/* Shopping List Button */}
          <button
            onClick={handleGenerateShoppingList}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-background-light dark:bg-background-dark py-3 text-sm font-bold text-primary transition-colors hover:bg-gray-100 dark:hover:bg-white/5"
          >
            <ShoppingCart size={18} />
            Gerar Lista de Compras
          </button>
        </div>
      </div>

      {/* Sticky FAB */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-background-light via-background-light/90 to-transparent dark:from-background-dark dark:via-background-dark/90 px-4 pb-6 pt-12 mx-auto max-w-md">
        <button
          onClick={handleStartProductionPlan}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition-transform active:scale-95"
        >
          <Factory size={20} />
          Iniciar Plano de Produção
        </button>
      </div>
    </div>
  );
};

export default PrevisaoProducao;