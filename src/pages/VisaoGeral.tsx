import { Bell, ShoppingBag, DollarSign, AlertTriangle, TrendingUp, Package, Plus, BarChart, Settings, User, Grid3X3, Receipt, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const VisaoGeral = () => {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center bg-background-light dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <img
              alt="Avatar do perfil do administrador"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfvAe64T3QuDspbqKf-Sl6cYDT0Rme23t99gJNFzbA4bnyaNXxA-eD18t2DEgymFT34udSP3nBy0OSycX1TDGbwKdGRiNrjFty33tO-R3dmRFyfBsQF6jWWtdoUulYENKNY8C7A2xVrrzI7kNVlEmMz_6JH25kngF1yVH4z_Ufaz_ip9h8v7lCECOmSIlUflMeYGMbg54eL0NNg9lk5PGoPKv_KFBhwVgdsb980ewg-TPWU0qS8I7r4tYhG20l5mYcl0lU1LJGhA"
            />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-tight">Bom dia,</h2>
            <p className="text-base font-bold text-gray-900 dark:text-white leading-tight">Admin</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button className="flex size-10 items-center justify-center rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <Bell className="text-gray-600 dark:text-gray-300" size={24} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24">
        {/* Overview Section */}
        <section className="mt-4">
          <div className="flex items-center justify-between px-4 pb-3">
            <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">Visão Geral</h2>
            <button className="text-sm font-medium text-primary">Ver tudo</button>
          </div>
          <div className="flex flex-wrap gap-3 px-4">
            <Link
              to="/gestao-pedidos"
              className="group flex min-w-[150px] flex-1 flex-col gap-3 rounded-xl p-5 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm hover:border-primary/50 hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center size-8 rounded-full bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <ShoppingBag size={18} />
                </span>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider group-hover:text-primary transition-colors">Pendentes</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">12</p>
                <p className="text-primary text-xs font-medium mt-1 group-hover:underline">+2 na última hora</p>
              </div>
            </Link>
            <div className="flex min-w-[150px] flex-1 flex-col gap-3 rounded-xl p-5 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center size-8 rounded-full bg-green-500/20 text-green-500">
                  <DollarSign size={18} />
                </span>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Vendas Hoje</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">R$ 450</p>
                <p className="text-green-500 text-xs font-medium mt-1">+15% vs ontem</p>
              </div>
            </div>
          </div>
        </section>

        {/* Alerts Section */}
        <section className="mt-6 px-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="text-orange-500" size={20} />
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Atenção Necessária</h3>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-lg bg-white dark:bg-surface-dark p-3 border-l-4 border-l-orange-500 shadow-sm">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">Estoque Baixo: Ninho com Nutella</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Apenas 3 unidades restantes</span>
              </div>
              <button className="px-3 py-1.5 rounded bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-900 dark:text-white">Repor</button>
            </div>
          </div>
        </section>

        {/* Performance Chart Section */}
        <section className="mt-6">
          <h3 className="px-4 text-lg font-bold tracking-tight text-gray-900 dark:text-white mb-3">Desempenho Semanal</h3>
          <div className="mx-4 rounded-xl bg-white dark:bg-surface-dark p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex justify-between items-end mb-4">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Faturamento Total</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">R$ 2.340,00</span>
              </div>
              <div className="flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded">
                <TrendingUp className="text-green-500" size={16} />
                <span className="text-xs font-bold text-green-500">+5.2%</span>
              </div>
            </div>
            <div className="relative h-40 w-full">
              <svg className="h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#1d73c9" stopOpacity="0.3"></stop>
                    <stop offset="100%" stopColor="#1d73c9" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                <path d="M0 100 L0 70 L16.6 60 L33.2 80 L50 40 L66.6 50 L83.2 30 L100 45 L100 100 Z" fill="url(#chartGradient)"></path>
                <path d="M0 70 L16.6 60 L33.2 80 L50 40 L66.6 50 L83.2 30 L100 45" fill="none" stroke="#1d73c9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <div className="flex justify-between mt-2 px-1">
              <span className="text-[10px] text-gray-400 font-medium uppercase">Seg</span>
              <span className="text-[10px] text-gray-400 font-medium uppercase">Ter</span>
              <span className="text-[10px] text-gray-400 font-medium uppercase">Qua</span>
              <span className="text-[10px] text-gray-400 font-medium uppercase">Qui</span>
              <span className="text-[10px] text-gray-400 font-medium uppercase">Sex</span>
              <span className="text-[10px] text-gray-400 font-medium uppercase">Sab</span>
              <span className="text-[10px] text-gray-400 font-medium uppercase">Dom</span>
            </div>
          </div>
        </section>

        {/* Quick Access Section */}
        <section className="mt-8 px-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">Acesso Rápido</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/gestao-insumos"
              className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-100 dark:bg-surface-dark p-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Package className="text-gray-900 dark:text-white" size={28} />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Estoque</span>
            </Link>
            <button className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-100 dark:bg-surface-dark p-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Plus className="text-gray-900 dark:text-white" size={28} />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Novo Pedido</span>
            </button>
            <Link
              to="/relatorios"
              className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-100 dark:bg-surface-dark p-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <BarChart className="text-gray-900 dark:text-white" size={28} />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Relatórios</span>
            </Link>
            <Link
              to="/configuracoes-admin"
              className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-100 dark:bg-surface-dark p-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Settings className="text-gray-900 dark:text-white" size={28} />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Configurações</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark/95 backdrop-blur-md pb-safe max-w-md mx-auto z-20">
        <div className="flex justify-around items-center h-16">
          <Link to="/visao-geral" className="flex flex-col items-center justify-center w-full h-full text-primary">
            <Grid3X3 className="filled" size={24} />
            <span className="text-[10px] font-medium mt-1">Painel</span>
          </Link>
          <Link to="/gestao-pedidos" className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <Receipt size={24} />
            <span className="text-[10px] font-medium mt-1">Pedidos</span>
          </Link>
          <div className="relative w-full h-full flex flex-col items-center justify-center group">
            <button className="flex items-center justify-center size-12 rounded-full bg-primary text-white shadow-lg shadow-primary/30 transform -translate-y-4 transition-transform group-hover:scale-105">
              <Plus size={24} />
            </button>
          </div>
          <Link to="/gestao-produtos" className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <Package size={24} />
            <span className="text-[10px] font-medium mt-1">Produtos</span>
          </Link>
          <Link to="/perfil" className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <User size={24} />
            <span className="text-[10px] font-medium mt-1">Perfil</span>
          </Link>
        </div>
        <div className="h-1 w-full"></div>
      </nav>
    </div>
  );
};

export default VisaoGeral;