"use client";

import { Bell, ShoppingBag, DollarSign, AlertTriangle, TrendingUp, Package, Plus, BarChart, Settings, User, Grid3X3, Receipt, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useOrders } from "@/contexts/OrdersContext";
import { useProducts } from "@/contexts/ProductsContext";
import { useStock } from "@/contexts/StockContext";
import { useClients } from "@/contexts/ClientsContext";

const VisaoGeral = () => {
  const { orders } = useOrders();
  const { products } = useProducts();
  const { ingredients, packagingItems } = useStock();
  const { clients } = useClients();

  // Cálculos dinâmicos
  const pendingOrders = orders.filter(o => o.status === "Novo" || o.status === "Preparo").length;
  
  const today = new Date().toLocaleDateString('pt-BR');
  const salesToday = orders
    .filter(o => o.date === today && !o.cancelled)
    .reduce((sum, o) => sum + o.total, 0);

  const totalProductsInStock = products.filter(p => p.stock > 0).length;
  const totalClients = clients.length;

  const totalRevenue = orders
    .filter(o => !o.cancelled)
    .reduce((sum, o) => sum + o.total, 0);

  // Alertas dinâmicos
  const lowStockItem = [...ingredients, ...packagingItems].find(i => i.status === "Baixo" || i.status === "Crítico");
  const urgentOrder = orders.find(o => o.status === "Novo");

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center bg-background-light dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-200 dark:border-gray-800 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 overflow-hidden">
            <User className="text-primary" size={20} />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-tight">Painel de</h2>
            <p className="text-base font-bold text-gray-900 dark:text-white leading-tight">Administração</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button className="flex size-10 items-center justify-center rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <Bell className="text-gray-600 dark:text-gray-300" size={24} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 pb-32">
        {/* Overview Section */}
        <section className="mt-4">
          <div className="flex items-center justify-between pb-3">
            <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">Visão Geral</h2>
            <button className="text-sm font-medium text-primary">Ver tudo</button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              to="/gestao-pedidos"
              className="group flex flex-col gap-3 rounded-xl p-4 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm hover:border-primary/50 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center size-7 rounded-full bg-primary/20 text-primary">
                  <ShoppingBag size={16} />
                </span>
                <p className="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-wider">Pendentes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{pendingOrders}</p>
                <p className="text-primary text-[10px] font-medium mt-1">Aguardando ação</p>
              </div>
            </Link>
            <Link
              to="/relatorios"
              className="group flex flex-col gap-3 rounded-xl p-4 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm hover:border-primary/50 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center size-7 rounded-full bg-green-500/20 text-green-500">
                  <DollarSign size={16} />
                </span>
                <p className="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-wider">Vendas Hoje</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">R$ {salesToday.toFixed(0)}</p>
                <p className="text-green-500 text-[10px] font-medium mt-1">Total do dia</p>
              </div>
            </Link>
            <Link
              to="/gestao-produtos"
              className="group flex flex-col gap-3 rounded-xl p-4 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm hover:border-primary/50 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center size-7 rounded-full bg-blue-500/20 text-blue-500">
                  <Package size={16} />
                </span>
                <p className="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-wider">Produtos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{totalProductsInStock}</p>
                <p className="text-blue-500 text-[10px] font-medium mt-1">Disponíveis</p>
              </div>
            </Link>
            <Link
              to="/clientes"
              className="group flex flex-col gap-3 rounded-xl p-4 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm hover:border-primary/50 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center size-7 rounded-full bg-purple-500/20 text-purple-500">
                  <User size={16} />
                </span>
                <p className="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-wider">Clientes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{totalClients}</p>
                <p className="text-purple-500 text-[10px] font-medium mt-1">Base cadastrada</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Middle Section - Chart and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Performance Chart */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white mb-3">Desempenho Geral</h3>
            <div className="rounded-xl bg-white dark:bg-surface-dark p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex justify-between items-end mb-4">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Faturamento Acumulado</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">R$ {totalRevenue.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded">
                  <TrendingUp className="text-green-500" size={16} />
                  <span className="text-xs font-bold text-green-500">Saldo Positivo</span>
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
                {["S1", "S2", "S3", "S4", "S5", "S6", "S7"].map(s => (
                  <span key={s} className="text-[10px] text-gray-400 font-medium uppercase">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Alerts Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="text-orange-500" size={20} />
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Atenção Necessária</h3>
            </div>
            <div className="space-y-3">
              {lowStockItem ? (
                <div className="flex items-center justify-between rounded-lg bg-white dark:bg-surface-dark p-4 border-l-4 border-l-orange-500 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">Estoque Baixo</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{lowStockItem.name}: {lowStockItem.quantity.toFixed(1)} {lowStockItem.unit}</span>
                  </div>
                  <Link to="/gestao-estoque" className="px-3 py-1.5 rounded bg-primary text-white text-[10px] font-bold uppercase hover:bg-primary/90 transition-colors">
                    Repor
                  </Link>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 text-center">
                  <p className="text-xs font-bold text-emerald-600">Estoque em dia!</p>
                </div>
              )}
              
              {urgentOrder ? (
                <div className="flex items-center justify-between rounded-lg bg-white dark:bg-surface-dark p-4 border-l-4 border-l-red-500 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">Pedido Novo</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">De {urgentOrder.customer} ({urgentOrder.id})</span>
                  </div>
                  <Link to="/gestao-pedidos" className="px-3 py-1.5 rounded bg-red-500 text-white text-[10px] font-bold uppercase hover:bg-red-600 transition-colors">
                    Ver
                  </Link>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-center">
                  <p className="text-xs font-bold text-slate-500">Sem pedidos novos</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Access Section */}
        <section className="mt-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">Acesso Rápido</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { icon: Package, label: "Estoque", path: "/gestao-estoque" },
              { icon: Plus, label: "Novo Produto", path: "/add-produto" },
              { icon: BarChart, label: "Relatórios", path: "/relatorios" },
              { icon: Settings, label: "Ajustes", path: "/configuracoes-admin" },
              { icon: User, label: "Clientes", path: "/clientes" },
              { icon: FileText, label: "Produtos", path: "/gestao-produtos" },
            ].map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-100 dark:bg-surface-dark p-4 hover:bg-primary/10 hover:text-primary transition-all active:scale-95"
              >
                <item.icon size={24} />
                <span className="text-[10px] font-bold uppercase tracking-tight">{item.label}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark/95 backdrop-blur-md pb-safe max-w-7xl mx-auto z-20">
        <div className="flex justify-around items-center h-16 px-4">
          <Link to="/visao-geral" className="flex flex-col items-center justify-center w-full h-full text-primary">
            <Grid3X3 className="filled" size={24} />
            <span className="text-[10px] font-medium mt-1">Painel</span>
          </Link>
          <Link to="/gestao-pedidos" className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <Receipt size={24} />
            <span className="text-[10px] font-medium mt-1">Pedidos</span>
          </Link>
          <div className="relative w-full h-full flex flex-col items-center justify-center group">
            <Link to="/add-producao" className="flex items-center justify-center size-12 rounded-full bg-primary text-white shadow-lg shadow-primary/30 transform -translate-y-4 transition-transform hover:scale-105 active:scale-95">
              <Plus size={24} />
            </Link>
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
      </nav>
    </div>
  );
};

export default VisaoGeral;