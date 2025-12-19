import { ArrowLeft, DollarSign, ShoppingBag, TrendingUp, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Relatorios = () => {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24 bg-background-light dark:bg-background-dark">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <Link
            to="/configuracoes-admin"
            className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full active:bg-gray-200 dark:active:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">Relatórios</h1>
        </div>
        <div className="flex items-center justify-end">
          <button className="flex size-10 items-center justify-center rounded-full text-slate-900 dark:text-white active:bg-gray-200 dark:active:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined">calendar_month</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-6 px-4 pt-4">
        {/* Segmented Control (Time Filter) */}
        <div className="w-full">
          <div className="flex h-12 w-full items-center justify-center rounded-xl bg-gray-200 dark:bg-card-dark p-1">
            <label className="group flex cursor-pointer h-full flex-1 items-center justify-center rounded-lg px-2 transition-all has-[:checked]:bg-white dark:has-[:checked]:bg-surface-dark has-[:checked]:shadow-sm">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 group-has-[:checked]:text-primary truncate transition-colors">Dia</span>
              <input className="invisible w-0 h-0 absolute" name="period-filter" type="radio" value="Dia" />
            </label>
            <label className="group flex cursor-pointer h-full flex-1 items-center justify-center rounded-lg px-2 transition-all has-[:checked]:bg-white dark:has-[:checked]:bg-surface-dark has-[:checked]:shadow-sm">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 group-has-[:checked]:text-primary truncate transition-colors">Semana</span>
              <input checked className="invisible w-0 h-0 absolute" name="period-filter" type="radio" value="Semana" />
            </label>
            <label className="group flex cursor-pointer h-full flex-1 items-center justify-center rounded-lg px-2 transition-all has-[:checked]:bg-white dark:has-[:checked]:bg-surface-dark has-[:checked]:shadow-sm">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 group-has-[:checked]:text-primary truncate transition-colors">Mês</span>
              <input className="invisible w-0 h-0 absolute" name="period-filter" type="radio" value="Mês" />
            </label>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Total Sales */}
          <div className="flex flex-col gap-3 rounded-2xl p-5 bg-white dark:bg-card-dark shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <DollarSign size={20} />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Faturamento</p>
            </div>
            <div>
              <p className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">R$ 4.320</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="text-emerald-500 text-sm" />
                <p className="text-emerald-500 text-xs font-bold">+12%</p>
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="flex flex-col gap-3 rounded-2xl p-5 bg-white dark:bg-card-dark shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
                <ShoppingBag size={20} />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Pedidos</p>
            </div>
            <div>
              <p className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">342</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="text-emerald-500 text-sm" />
                <p className="text-emerald-500 text-xs font-bold">+5%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Trend Chart */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-card-dark p-5 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-slate-900 dark:text-white text-base font-bold">Tendência de Vendas</h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs">Últimos 7 dias</p>
            </div>
            <div className="flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-md">
              <span className="material-symbols-outlined text-emerald-500 text-sm">show_chart</span>
              <span className="text-emerald-500 text-xs font-bold">+8.5%</span>
            </div>
          </div>
          <div className="relative w-full h-40">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 380 150">
              {/* Definitions for gradients */}
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_chart" x1="0" x2="0" y1="0" y2="150">
                  <stop offset="0" stopColor="#195de6" stopOpacity="0.3"></stop>
                  <stop offset="1" stopColor="#195de6" stopOpacity="0.0"></stop>
                </linearGradient>
              </defs>
              {/* Area Fill */}
              <path className="chart-gradient" d="M0,110 C40,110 40,50 80,50 C120,50 120,80 160,80 C200,80 200,30 240,30 C280,30 280,90 320,90 C350,90 350,20 380,20 V150 H0 Z" style={{ transition: 'all 0.5s ease' }}></path>
              {/* Line Stroke */}
              <path d="M0,110 C40,110 40,50 80,50 C120,50 120,80 160,80 C200,80 200,30 240,30 C280,30 280,90 320,90 C350,90 350,20 380,20" fill="none" stroke="#195de6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
              {/* Data Points (Optional Interaction Hints) */}
              <circle className="dark:stroke-card-dark" cx="240" cy="30" fill="#195de6" r="4" stroke="white" strokeWidth="2"></circle>
              <circle className="dark:stroke-card-dark" cx="380" cy="20" fill="#195de6" r="4" stroke="white" strokeWidth="2"></circle>
            </svg>
          </div>
          {/* X-Axis Labels */}
          <div className="flex justify-between px-1">
            <span className="text-[10px] font-medium text-gray-400">Seg</span>
            <span className="text-[10px] font-medium text-gray-400">Ter</span>
            <span className="text-[10px] font-medium text-gray-400">Qua</span>
            <span className="text-[10px] font-medium text-gray-400">Qui</span>
            <span className="text-[10px] font-medium text-gray-400">Sex</span>
            <span className="text-[10px] font-medium text-gray-400">Sáb</span>
            <span className="text-[10px] font-medium text-gray-400">Dom</span>
          </div>
        </div>

        {/* Top Products List */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Mais Vendidos</h3>
            <a className="text-primary text-sm font-semibold" href="#">Ver todos</a>
          </div>
          <div className="flex flex-col gap-3">
            {/* Item 1 */}
            <div className="flex items-center gap-4 rounded-xl bg-white dark:bg-card-dark p-4 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-yellow-400/20 text-yellow-600 dark:text-yellow-400 font-bold text-lg">
                1
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-slate-900 dark:text-white font-semibold truncate pr-2">Ninho com Nutella</h4>
                  <span className="text-slate-900 dark:text-white font-bold">142 un</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-4 rounded-xl bg-white dark:bg-card-dark p-4 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-surface-dark text-gray-500 font-bold text-lg">
                2
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-slate-900 dark:text-white font-semibold truncate pr-2">Morango Gourmet</h4>
                  <span className="text-slate-900 dark:text-white font-bold">98 un</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary/70 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-4 rounded-xl bg-white dark:bg-card-dark p-4 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-surface-dark text-gray-500 font-bold text-lg">
                3
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-slate-900 dark:text-white font-semibold truncate pr-2">Paçoca Cremosa</h4>
                  <span className="text-slate-900 dark:text-white font-bold">74 un</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary/50 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-center gap-4 rounded-xl bg-white dark:bg-card-dark p-4 shadow-sm border border-gray-100 dark:border-gray-800 opacity-80">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-surface-dark text-gray-500 font-bold text-lg">
                4
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-slate-900 dark:text-white font-semibold truncate pr-2">Maracujá Trufado</h4>
                  <span className="text-slate-900 dark:text-white font-bold">52 un</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary/30 h-1.5 rounded-full" style={{ width: '32%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer for floating button */}
        <div className="h-8"></div>
      </main>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800">
        <Button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all">
          <Download size={20} />
          <span>Exportar Relatório PDF</span>
        </Button>
      </div>
    </div>
  );
};

export default Relatorios;