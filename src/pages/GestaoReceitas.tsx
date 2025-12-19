import { ArrowLeft, Plus, Search, MoreVertical, Receipt } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const GestaoReceitas = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const recipes = [
    {
      id: 1,
      name: "Ninho com Nutella",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQI5Bd-HQhMa0roL66f0M780HWmmqj98bmIZaQjBCeGYe5rZ31qkJu43AOVL3u8tAt_AWdZ_tAhbDsirOp9nG8KG_S_Sc0AraSlLL5HDsJg6pkxcfIxrGbnsJrrpRxgWxiLWlOT1-m21pyJhpZEsu1JDIZt-ewzQQ8Ng8B93krfEByXuYSH5XCAwVUVSJ0BUkY5K1lNRYF1Jokck2SkgLRA9Iw28BqZB63RyZloSS3PukeRI-NHlmXR3NulS-tiLx-fi6mm71LjQ",
      time: "45 min",
      quantity: 20,
      cost: 1.50,
      isTop: true
    },
    {
      id: 2,
      name: "Morango Cremoso",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCM3cfAeatmEUtNaDEnz796M7L7_1N-EtyXmykGuHogX2Bqw0GLmlvYa3HPA8Wz1_4o9F5wPSUrzWkU8Yp7doalaFscT5306YI3bZgNz9gTLuFuBl4eyymE72I2oud60ide53rz4tw6ycGt2mAau951TpWIjxrfxMQg_NpEJUwcm1qol_S5JpSoZbGnw8au7eUWzH4lvezL2wocDTs541UOAWtFuVwleVW5xacABNhs7r5_Xla2rV2_GgGzX6Ol3wbDpTujEKBi_A",
      time: "30 min",
      quantity: 25,
      cost: 1.20
    },
    {
      id: 3,
      name: "Maracujá Trufado",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoZ4WrJnviJNuxDALva68IEx8BdGnHIjNAHbiCD9c4LdL8-hJlme5-_jxH6yK45w60ONtc-wS1X4YRBtWIaMoT-ulkjkHFRp2qqXBLfOkCCCkwdQaWLx2-89611q0649qzVgnLg86WrY-Ea70L22N2sX9RqBAfGRPY9V-lGLiw6-mIc2syzuhmzeimcROK7NbRdCxSJMIFrOkJSzh4puGnvIZiAPSOVeuwwrqMUlMvOWxuvH8MJKoEM1-UH9iaFBbmLGPUy3smQQ",
      time: "40 min",
      quantity: 18,
      cost: 1.35
    },
    {
      id: 4,
      name: "Paçoca (Rascunho)",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuUrbHMUtHkPnVX8zU4WTK_fS48HXn4xbB-GWsANxTetZelRGWCv8GGtFbOW1rSMzJMmjpipwp7Gl3gqsCOYYVDWAUiyeWGqZJxNjQXnkAHeP7S_ZqXwSDjg4JVnouLg6AfqUFvjhUweXGJ0kw1ToEhnvATVYkwQW7s9pw03oj-2z3_hwbeSleVWMqoVSXzli2QKu6II52TermU5LB1vtYSEPTyigw2rxM9sS-RcxsSJw9On0AT31sB50pWY5wpP81CCHvt0E32Q",
      time: "-- min",
      quantity: 0,
      cost: 0.90,
      isDraft: true
    },
    {
      id: 5,
      name: "Coco Cremoso",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeVtLOwl0ATHwAcr5evKM61DHAzUInDA4rNayZup2RLN2_bQCfTnVNR_l-DTdXOBvhL9WAaX87UftAK2U7sB2U6JTa7r8wpWfiDPIEbAtGGv-5CrecYaZuuD9l1b4s01XjoNpc5t9qaYh4dzSCTxZXGQq2UVC2yLgyUnmioy-w9jEP6S31faZwIlo68d951DTN_-oos0ZbKhyHyEGxSHXFfW4gxKyg2e9ICHwtS3Beq_3-2wSvZVjYKvOLPZI2_nP6TbsWYvi__Q",
      time: "35 min",
      quantity: 22,
      cost: 1.15
    }
  ];

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRecipes = recipes.length;
  const averageCost = recipes.reduce((sum, recipe) => sum + recipe.cost, 0) / recipes.length;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            to="/visao-geral"
            className="flex items-center justify-center size-10 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Receitas</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Gestão de Receitas</h1>
          </div>
        </div>
        <div className="flex items-center justify-end pr-4">
          <Link
            to="/add-receita"
            className="flex items-center justify-center size-10 rounded-full text-primary hover:bg-primary/10 transition-colors"
          >
            <Plus size={24} />
          </Link>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-4 w-full">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl text-sm font-medium bg-gray-100 dark:bg-surface-dark text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
            placeholder="Buscar receitas..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="px-4 py-4 grid grid-cols-2 gap-3">
        <div className="bg-white dark:bg-surface-dark rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Receipt size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Receitas</p>
            <p className="text-lg font-bold text-slate-800 dark:text-white">{totalRecipes}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-surface-dark rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
            <span className="material-symbols-outlined">attach_money</span>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Custo Médio</p>
            <p className="text-lg font-bold text-slate-800 dark:text-white">R$ {averageCost.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Recipe List */}
      <div className="flex-1 px-4 pb-20 space-y-3">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 mt-2">Mais Recentes</h3>
        {filteredRecipes.map((recipe) => (
          <Link
            key={recipe.id}
            to={`/detalhes-receita?id=${recipe.id}`}
            className="block"
          >
            <div
              className={`bg-white dark:bg-surface-dark rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-800 flex gap-4 items-start active:scale-[0.99] transition-transform cursor-pointer group ${
                recipe.isDraft ? 'opacity-80' : ''
              }`}
            >
              <div className="relative shrink-0 w-[72px] h-[72px]">
                <div
                  className="w-full h-full rounded-lg bg-gray-200 dark:bg-gray-700 bg-cover bg-center"
                  style={{ backgroundImage: `url('${recipe.image}')` }}
                ></div>
                {recipe.isDraft && (
                  <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Rascunho</span>
                  </div>
                )}
                {recipe.isTop && (
                  <div className="absolute -bottom-1 -right-1 bg-white dark:bg-surface-dark rounded-full p-0.5">
                    <div className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">Top</div>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
                <div className="flex justify-between items-start">
                  <h3 className={`text-base font-semibold text-slate-800 dark:text-white truncate pr-2 ${
                    recipe.isDraft ? 'text-gray-500 dark:text-gray-400' : ''
                  }`}>
                    {recipe.name}
                  </h3>
                  <button className="text-gray-400 hover:text-primary transition-colors p-1 -m-1 -mt-2">
                    <MoreVertical size={20} />
                  </button>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">schedule</span>
                    <span>{recipe.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">inventory_2</span>
                    <span>{recipe.quantity} un</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                  <span className="text-xs text-gray-400 font-normal">Custo un:</span>
                  <span>R$ {recipe.cost.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Floating Action Button */}
      <Link
        to="/add-receita"
        className="fixed bottom-20 right-4 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:bg-primary/90 transition-all active:scale-95 z-30"
      >
        <Plus size={28} />
      </Link>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 pb-safe z-40">
        <div className="flex justify-around items-center h-16">
          <Link to="/visao-geral" className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined mb-1">home</span>
            <span className="text-[10px] font-medium">Início</span>
          </Link>
          <button className="flex flex-col items-center justify-center w-full h-full text-primary">
            <span className="material-symbols-outlined mb-1 filled">receipt_long</span>
            <span className="text-[10px] font-medium">Receitas</span>
          </button>
          <Link to="/gestao-insumos" className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined mb-1">inventory</span>
            <span className="text-[10px] font-medium">Estoque</span>
          </Link>
          <Link to="/configuracoes-admin" className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined mb-1">settings</span>
            <span className="text-[10px] font-medium">Ajustes</span>
          </Link>
        </div>
      </nav>
      {/* Safe Area Spacer for Bottom Nav */}
      <div className="h-[70px]"></div>
    </div>
  );
};

export default GestaoReceitas;