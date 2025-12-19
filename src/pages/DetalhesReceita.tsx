import { ArrowLeft, Edit } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const DetalhesReceita = () => {
  const [searchParams] = useSearchParams();
  const recipeId = searchParams.get('id');

  // Mock data for different recipes - in a real app, this would come from an API
  const recipesData = {
    "1": {
      id: "1",
      name: "Ninho com Nutella",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQI5Bd-HQhMa0roL66f0M780HWmmqj98bmIZaQjBCeGYe5rZ31qkJu43AOVL3u8tAt_AWdZ_tAhbDsirOp9nG8KG_S_Sc0AraSlLL5HDsJg6pkxcfIxrGbnsJrrpRxgWxiLWlOT1-m21pyJhpZEsu1JDIZt-ewzQQ8Ng8B93krfEByXuYSH5XCAwVUVSJ0BUkY5K1lNRYF1Jokck2SkgLRA9Iw28BqZB63RyZloSS3PukeRI-NHlmXR3NulS-tiLx-fi6mm71LjQ",
      ingredients: [
        { name: "Leite Integral 1L", quantity: "1 Un", cost: 4.99 },
        { name: "Saborizante de Chocolate 100g", quantity: "20 g", cost: 2.34 },
        { name: "Leite Condensado", quantity: "1 Un", cost: 5.84 },
        { name: "Liga Neutra", quantity: "15 g", cost: 1.34 },
        { name: "Creme de Leite", quantity: "1 Un", cost: 2.99 },
        { name: "Açúcar 5kg", quantity: "50 g", cost: 0.17 },
        { name: "Nutella 3kg", quantity: "100 g", cost: 8.50 }
      ],
      packaging: [
        { name: "Embalagem Viagem Térmica", quantity: "12 Un", cost: 4.62 },
        { name: "Embalagem Higiênica", quantity: "12 Un", cost: 1.11 },
        { name: "Saquinho Interno", quantity: "12 Un", cost: 1.32 }
      ],
      equipment: [
        { name: "Liquidificador 1400w", quantity: "3 min", cost: 0.06 },
        { name: "Fogão", quantity: "40 min - Consumo: Médio", cost: 0.74 }
      ],
      costs: {
        ingredients: 26.17,
        packaging: 7.05,
        equipment: 0.79,
        labor: 30.00,
        total: 64.01,
        unit: 5.33,
        profitTotal: 34.99,
        profitUnit: 2.92,
        margin: 54.7
      }
    },
    "2": {
      id: "2",
      name: "Morango Cremoso",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCM3cfAeatmEUtNaDEnz796M7L7_1N-EtyXmykGuHogX2Bqw0GLmlvYa3HPA8Wz1_4o9F5wPSUrzWkU8Yp7doalaFscT5306YI3bZgNz9gTLuFuBl4eyymE72I2oud60ide53rz4tw6ycGt2mAau951TpWIjxrfxMQg_NpEJUwcm1qol_S5JpSoZbGnw8au7eUWzH4lvezL2wocDTs541UOAWtFuVwleVW5xacABNhs7r5_Xla2rV2_GgGzX6Ol3wbDpTujEKBi_A",
      ingredients: [
        { name: "Leite Integral 1L", quantity: "1 Un", cost: 4.99 },
        { name: "Saborizante de Morango 100g", quantity: "20 g", cost: 2.34 },
        { name: "Leite Condensado", quantity: "1 Un", cost: 5.84 },
        { name: "Liga Neutra", quantity: "15 g", cost: 1.34 },
        { name: "Creme de Leite", quantity: "1 Un", cost: 2.99 },
        { name: "Açúcar 5kg", quantity: "50 g", cost: 0.17 },
        { name: "Morango Bandeja 200g", quantity: "2 Un", cost: 16.00 }
      ],
      packaging: [
        { name: "Embalagem Viagem Térmica", quantity: "12 Un", cost: 4.62 },
        { name: "Embalagem Higiênica", quantity: "12 Un", cost: 1.11 },
        { name: "Saquinho Interno", quantity: "12 Un", cost: 1.32 }
      ],
      equipment: [
        { name: "Liquidificador 1400w", quantity: "3 min", cost: 0.06 },
        { name: "Fogão", quantity: "40 min - Consumo: Médio", cost: 0.74 }
      ],
      costs: {
        ingredients: 33.67,
        packaging: 7.05,
        equipment: 0.79,
        labor: 30.00,
        total: 71.51,
        unit: 5.96,
        profitTotal: 36.49,
        profitUnit: 3.04,
        margin: 51.0
      }
    },
    "3": {
      id: "3",
      name: "Maracujá Trufado",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoZ4WrJnviJNuxDALva68IEx8BdGnHIjNAHbiCD9c4LdL8-hJlme5-_jxH6yK45w60ONtc-wS1X4YRBtWIaMoT-ulkjkHFRp2qqXBLfOkCCCkwdQaWLx2-89611q0649qzVgnLg86WrY-Ea70L22N2sX9RqBAfGRPY9V-lGLiw6-mIc2syzuhmzeimcROK7NbRdCxSJMIFrOkJSzh4puGnvIZiAPSOVeuwwrqMUlMvOWxuvH8MJKoEM1-UH9iaFBbmLGPUy3smQQ",
      ingredients: [
        { name: "Leite Integral 1L", quantity: "1 Un", cost: 4.99 },
        { name: "Saborizante de Maracujá 100g", quantity: "20 g", cost: 2.34 },
        { name: "Leite Condensado", quantity: "1 Un", cost: 5.84 },
        { name: "Liga Neutra", quantity: "15 g", cost: 1.34 },
        { name: "Creme de Leite", quantity: "1 Un", cost: 2.99 },
        { name: "Açúcar 5kg", quantity: "50 g", cost: 0.17 },
        { name: "Maracujá Unidade", quantity: "3 Un", cost: 4.50 }
      ],
      packaging: [
        { name: "Embalagem Viagem Térmica", quantity: "12 Un", cost: 4.62 },
        { name: "Embalagem Higiênica", quantity: "12 Un", cost: 1.11 },
        { name: "Saquinho Interno", quantity: "12 Un", cost: 1.32 }
      ],
      equipment: [
        { name: "Liquidificador 1400w", quantity: "3 min", cost: 0.06 },
        { name: "Fogão", quantity: "40 min - Consumo: Médio", cost: 0.74 }
      ],
      costs: {
        ingredients: 26.17,
        packaging: 7.05,
        equipment: 0.79,
        labor: 30.00,
        total: 64.01,
        unit: 5.33,
        profitTotal: 34.99,
        profitUnit: 2.92,
        margin: 54.7
      }
    },
    "4": {
      id: "4",
      name: "Paçoca (Rascunho)",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuUrbHMUtHkPnVX8zU4WTK_fS48HXn4xbB-GWsANxTetZelRGWCv8GGtFbOW1rSMzJMmjpipwp7Gl3gqsCOYYVDWAUiyeWGqZJxNjQXnkAHeP7S_ZqXwSDjg4JVnouLg6AfqUFvjhUweXGJ0kw1ToEhnvATVYkwQW7s9pw03oj-2z3_hwbeSleVWMqoVSXzli2QKu6II52TermU5LB1vtYSEPTyigw2rxM9sS-RcxsSJw9On0AT31sB50pWY5wpP81CCHvt0E32Q",
      ingredients: [
        { name: "Leite Integral 1L", quantity: "1 Un", cost: 4.99 },
        { name: "Paçoca Amendoim 500g", quantity: "150 g", cost: 3.75 },
        { name: "Leite Condensado", quantity: "1 Un", cost: 5.84 },
        { name: "Liga Neutra", quantity: "15 g", cost: 1.34 },
        { name: "Creme de Leite", quantity: "1 Un", cost: 2.99 },
        { name: "Açúcar 5kg", quantity: "50 g", cost: 0.17 }
      ],
      packaging: [
        { name: "Embalagem Viagem Térmica", quantity: "12 Un", cost: 4.62 },
        { name: "Embalagem Higiênica", quantity: "12 Un", cost: 1.11 },
        { name: "Saquinho Interno", quantity: "12 Un", cost: 1.32 }
      ],
      equipment: [
        { name: "Liquidificador 1400w", quantity: "3 min", cost: 0.06 },
        { name: "Fogão", quantity: "40 min - Consumo: Médio", cost: 0.74 }
      ],
      costs: {
        ingredients: 19.08,
        packaging: 7.05,
        equipment: 0.79,
        labor: 30.00,
        total: 56.92,
        unit: 4.74,
        profitTotal: 42.08,
        profitUnit: 3.51,
        margin: 74.0
      }
    },
    "5": {
      id: "5",
      name: "Coco Cremoso",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeVtLOwl0ATHwAcr5evKM61DHAzUInDA4rNayZup2RLN2_bQCfTnVNR_l-DTdXOBvhL9WAaX87UftAK2U7sB2U6JTa7r8wpWfiDPIEbAtGGv-5CrecYaZuuD9l1b4s01XjoNpc5t9qaYh4dzSCTxZXGQq2UVC2yLgyUnmioy-w9jEP6S31faZwIlo68d951DTN_-oos0ZbKhyHyEGxSHXFfW4gxKyg2e9ICHwtS3Beq_3-2wSvZVjYKvOLPZI2_nP6TbsWYvi__Q",
      ingredients: [
        { name: "Leite de Coco 1L", quantity: "1 Un", cost: 6.99 },
        { name: "Saborizante de Coco 100g", quantity: "20 g", cost: 2.34 },
        { name: "Leite Condensado", quantity: "1 Un", cost: 5.84 },
        { name: "Liga Neutra", quantity: "15 g", cost: 1.34 },
        { name: "Creme de Leite", quantity: "1 Un", cost: 2.99 },
        { name: "Açúcar 5kg", quantity: "50 g", cost: 0.17 },
        { name: "Coco Ralado 500g", quantity: "50 g", cost: 2.50 }
      ],
      packaging: [
        { name: "Embalagem Viagem Térmica", quantity: "12 Un", cost: 4.62 },
        { name: "Embalagem Higiênica", quantity: "12 Un", cost: 1.11 },
        { name: "Saquinho Interno", quantity: "12 Un", cost: 1.32 }
      ],
      equipment: [
        { name: "Liquidificador 1400w", quantity: "3 min", cost: 0.06 },
        { name: "Fogão", quantity: "40 min - Consumo: Médio", cost: 0.74 }
      ],
      costs: {
        ingredients: 22.17,
        packaging: 7.05,
        equipment: 0.79,
        labor: 30.00,
        total: 60.01,
        unit: 5.00,
        profitTotal: 38.99,
        profitUnit: 3.25,
        margin: 65.0
      }
    }
  };

  const recipe = recipesData[recipeId as keyof typeof recipesData] || recipesData["1"];

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white max-w-7xl mx-auto shadow-2xl">
      {/* TopAppBar */}
      <header className="sticky top-0 z-50 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 border-b border-gray-200 dark:border-gray-800 justify-between">
        <Link
          to="/gestao-receitas"
          className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-start cursor-pointer hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={24} />
        </Link>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Detalhes da Receita</h2>
        <Link
          to={`/edit-receita?id=${recipe.id}`}
          className="flex size-12 items-center justify-end cursor-pointer hover:opacity-70 transition-opacity"
        >
          <Edit className="text-primary text-2xl" />
        </Link>
      </header>

      {/* Content Scroll Area */}
      <div className="flex-1 overflow-y-auto pb-8">
        {/* Desktop Layout - Horizontal */}
        <div className="hidden lg:block">
          {/* Header with Recipe Name and Image */}
          <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{recipe.name}</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Receita completa com custos detalhados</p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="px-6 py-6">
            <div className="grid grid-cols-3 gap-6">
              {/* Ingredients Column */}
              <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary text-xl">grocery</span>
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Ingredientes</h3>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-surface-dark px-2 py-1 rounded ml-auto">{recipe.ingredients.length} itens</span>
                </div>
                <div className="space-y-3">
                  {recipe.ingredients.map((item, index) => {
                    const percentage = ((item.cost / recipe.costs.total) * 100).toFixed(1);
                    return (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <div className="flex-1">
                          <p className="text-slate-900 dark:text-white text-sm font-medium">{item.name}</p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs">{item.quantity}</p>
                        </div>
                        <p className="text-slate-900 dark:text-white text-sm font-semibold">R$ {item.cost.toFixed(2)} ({percentage}%)</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Packaging Column */}
              <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary text-xl">inventory_2</span>
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Embalagens</h3>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-surface-dark px-2 py-1 rounded ml-auto">{recipe.packaging.length} itens</span>
                </div>
                <div className="space-y-3">
                  {recipe.packaging.map((item, index) => {
                    const percentage = ((item.cost / recipe.costs.total) * 100).toFixed(1);
                    return (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <div className="flex-1">
                          <p className="text-slate-900 dark:text-white text-sm font-medium">{item.name}</p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs">{item.quantity}</p>
                        </div>
                        <p className="text-slate-900 dark:text-white text-sm font-semibold">R$ {item.cost.toFixed(2)} ({percentage}%)</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Equipment Column */}
              <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary text-xl">kitchen</span>
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Equipamentos</h3>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-surface-dark px-2 py-1 rounded ml-auto">{recipe.equipment.length} itens</span>
                </div>
                <div className="space-y-3">
                  {recipe.equipment.map((item, index) => {
                    const percentage = ((item.cost / recipe.costs.total) * 100).toFixed(1);
                    return (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <div className="flex-1">
                          <p className="text-slate-900 dark:text-white text-sm font-medium">{item.name}</p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs">{item.quantity}</p>
                        </div>
                        <p className="text-slate-900 dark:text-white text-sm font-semibold">R$ {item.cost.toFixed(2)} ({percentage}%)</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Cost Summary - Full Width */}
            <div className="mt-6 bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary text-xl">calculate</span>
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Sumário de Custos e Lucros</h3>
              </div>
              <div className="grid grid-cols-4 gap-6">
                {/* Cost Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Custos</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Ingredientes</span>
                      <span className="text-slate-900 dark:text-white font-medium">R$ {recipe.costs.ingredients.toFixed(2)} ({((recipe.costs.ingredients / recipe.costs.total) * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Embalagens</span>
                      <span className="text-slate-900 dark:text-white font-medium">R$ {recipe.costs.packaging.toFixed(2)} ({((recipe.costs.packaging / recipe.costs.total) * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Equipamentos</span>
                      <span className="text-slate-900 dark:text-white font-medium">R$ {recipe.costs.equipment.toFixed(2)} ({((recipe.costs.equipment / recipe.costs.total) * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Mão de Obra</span>
                      <span className="text-slate-900 dark:text-white font-medium">R$ {recipe.costs.labor.toFixed(2)} ({((recipe.costs.labor / recipe.costs.total) * 100).toFixed(1)}%)</span>
                    </div>
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Totais</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Custo Total</span>
                      <span className="text-slate-900 dark:text-white font-bold">R$ {recipe.costs.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Custo Unitário</span>
                      <span className="text-slate-900 dark:text-white font-bold">R$ {recipe.costs.unit.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Profits */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">Lucros</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Lucro Total</span>
                      <span className="text-green-600 dark:text-green-400 font-bold">R$ {recipe.costs.profitTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Lucro Unitário</span>
                      <span className="text-green-600 dark:text-green-400 font-bold">R$ {recipe.costs.profitUnit.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Margin Highlight */}
                <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4 flex flex-col justify-center items-center">
                  <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2">Margem (%)</span>
                  <span className="text-slate-900 dark:text-white font-bold text-3xl">{recipe.costs.margin.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Vertical (unchanged) */}
        <div className="lg:hidden">
          {/* Section: Ingredientes */}
          <div className="pt-2">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">grocery</span>
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Ingredientes</h3>
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-surface-dark px-2 py-1 rounded">{recipe.ingredients.length} itens</span>
            </div>
            <div className="flex flex-col">
              {recipe.ingredients.map((item, index) => {
                const percentage = ((item.cost / recipe.costs.total) * 100).toFixed(1);
                return (
                  <div key={index} className="flex items-center gap-4 px-4 min-h-[3.5rem] justify-between border-b border-gray-200 dark:border-gray-800 last:border-0 hover:bg-gray-100 dark:hover:bg-surface-dark/50 transition-colors">
                    <div className="flex flex-col flex-1 truncate pr-2">
                      <p className="text-slate-900 dark:text-white text-sm font-medium leading-normal truncate">{item.name}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs font-normal">{item.quantity}</p>
                    </div>
                    <div className="shrink-0">
                      <p className="text-slate-900 dark:text-white text-sm font-semibold leading-normal">R$ {item.cost.toFixed(2)} ({percentage}%)</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="h-2 bg-gray-100 dark:bg-black/20 mt-2"></div>

          {/* Section: Embalagens */}
          <div className="pt-2">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">inventory_2</span>
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Embalagens</h3>
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-surface-dark px-2 py-1 rounded">{recipe.packaging.length} itens</span>
            </div>
            <div className="flex flex-col">
              {recipe.packaging.map((item, index) => {
                const percentage = ((item.cost / recipe.costs.total) * 100).toFixed(1);
                return (
                  <div key={index} className="flex items-center gap-4 px-4 min-h-[3.5rem] justify-between border-b border-gray-200 dark:border-gray-800 last:border-0 hover:bg-gray-100 dark:hover:bg-surface-dark/50 transition-colors">
                    <div className="flex flex-col flex-1 truncate pr-2">
                      <p className="text-slate-900 dark:text-white text-sm font-medium leading-normal truncate">{item.name}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs font-normal">{item.quantity}</p>
                    </div>
                    <div className="shrink-0">
                      <p className="text-slate-900 dark:text-white text-sm font-semibold leading-normal">R$ {item.cost.toFixed(2)} ({percentage}%)</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="h-2 bg-gray-100 dark:bg-black/20 mt-2"></div>

          {/* Section: Equipamentos */}
          <div className="pt-2">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">kitchen</span>
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Equipamentos</h3>
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-surface-dark px-2 py-1 rounded">{recipe.equipment.length} itens</span>
            </div>
            <div className="flex flex-col">
              {recipe.equipment.map((item, index) => {
                const percentage = ((item.cost / recipe.costs.total) * 100).toFixed(1);
                return (
                  <div key={index} className="flex items-center gap-4 px-4 min-h-[3.5rem] justify-between border-b border-gray-200 dark:border-gray-800 last:border-0 hover:bg-gray-100 dark:hover:bg-surface-dark/50 transition-colors">
                    <div className="flex flex-col flex-1 truncate pr-2">
                      <p className="text-slate-900 dark:text-white text-sm font-medium leading-normal truncate">{item.name}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs font-normal">{item.quantity}</p>
                    </div>
                    <div className="shrink-0">
                      <p className="text-slate-900 dark:text-white text-sm font-semibold leading-normal">R$ {item.cost.toFixed(2)} ({percentage}%)</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="h-2 bg-gray-100 dark:bg-black/20 mt-2"></div>

          {/* Section: Sumário */}
          <div className="pt-4 px-4 pb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-xl">calculate</span>
              <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Sumário de Custos e Lucros</h3>
            </div>
            <div className="bg-white dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-800 space-y-4">
              {/* Breakdown */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                <div className="flex flex-col">
                  <span className="text-gray-500 dark:text-gray-400 text-xs">Ingredientes</span>
                  <span className="text-slate-900 dark:text-white font-medium">R$ {recipe.costs.ingredients.toFixed(2)} ({((recipe.costs.ingredients / recipe.costs.total) * 100).toFixed(1)}%)</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 dark:text-gray-400 text-xs">Embalagens</span>
                  <span className="text-slate-900 dark:text-white font-medium">R$ {recipe.costs.packaging.toFixed(2)} ({((recipe.costs.packaging / recipe.costs.total) * 100).toFixed(1)}%)</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 dark:text-gray-400 text-xs">Equipamentos</span>
                  <span className="text-slate-900 dark:text-white font-medium">R$ {recipe.costs.equipment.toFixed(2)} ({((recipe.costs.equipment / recipe.costs.total) * 100).toFixed(1)}%)</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 dark:text-gray-400 text-xs">Mão de Obra</span>
                  <span className="text-slate-900 dark:text-white font-medium">R$ {recipe.costs.labor.toFixed(2)} ({((recipe.costs.labor / recipe.costs.total) * 100).toFixed(1)}%)</span>
                </div>
              </div>
              <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
              {/* Totals */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300 font-medium">Custo Total</span>
                <span className="text-slate-900 dark:text-white font-bold text-base">R$ {recipe.costs.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300 font-medium">Custo Unitário</span>
                <span className="text-slate-900 dark:text-white font-bold text-base">R$ {recipe.costs.unit.toFixed(2)}</span>
              </div>
              <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
              {/* Profits (Highlighted) */}
              <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-3 -mx-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-primary text-xs font-bold uppercase tracking-wider mb-1">Lucro Total</span>
                    <span className="text-slate-900 dark:text-white font-bold text-xl">R$ {recipe.costs.profitTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex flex-col border-l border-primary/20 pl-4">
                    <span className="text-primary text-xs font-bold uppercase tracking-wider mb-1">Lucro Unit.</span>
                    <span className="text-slate-900 dark:text-white font-bold text-xl">R$ {recipe.costs.profitUnit.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-primary/20 flex justify-between items-center">
                  <span className="text-primary text-xs font-bold uppercase tracking-wider">Margem (%)</span>
                  <span className="text-slate-900 dark:text-white font-bold text-lg">{recipe.costs.margin.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesReceita;