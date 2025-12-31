"use client";

import { ArrowLeft, Menu, Bell, Plus, Search, TrendingUp, DollarSign, Check, ChevronRight, ChefHat, Bike, CheckCircle, X, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOrders } from "@/contexts/OrdersContext";

const GestaoPedidos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const { orders } = useOrders();

  const filters = [
    { label: "Todos", count: null },
    { label: "Novos", count: orders.filter(o => o.status === "Novo").length },
    { label: "Em Preparo", count: orders.filter(o => o.status === "Preparo").length },
    { label: "A Caminho", count: orders.filter(o => o.status === "Rota").length },
    { label: "Entregues", count: orders.filter(o => o.status === "Entregue").length }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "Todos" ||
                         (activeFilter === "Novos" && order.status === "Novo") ||
                         (activeFilter === "Em Preparo" && order.status === "Preparo") ||
                         (activeFilter === "A Caminho" && order.status === "Rota") ||
                         (activeFilter === "Entregues" && order.status === "Entregue");
    return matchesSearch && matchesFilter;
  });

  const openOrders = filteredOrders.filter(order => order.section === "open");
  const finishedOrders = filteredOrders.filter(order => order.section === "finished");

  const getStatusIcon = (iconName: string) => {
    switch (iconName) {
      case "inventory_2": return <div className="material-symbols-outlined">inventory_2</div>;
      case "soup_kitchen": return <ChefHat size={20} />;
      case "sports_motorsports": return <Bike size={20} />;
      case "check_circle": return <CheckCircle size={20} />;
      case "cancel": return <X size={20} />;
      default: return <div className="material-symbols-outlined">{iconName}</div>;
    }
  };

  const getStatusColor = (color: string) => {
    switch (color) {
      case "primary": return "bg-primary/10 text-primary";
      case "orange": return "bg-orange-500/10 text-orange-500";
      case "blue": return "bg-blue-500/10 text-blue-500";
      case "green": return "bg-green-500/10 text-green-500";
      case "red": return "bg-red-500/10 text-red-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 justify-between border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Link to="/visao-geral" className="text-slate-900 dark:text-white flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">Gestão de Pedidos</h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Gourmet Ice</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-white transition-colors">
            <Bell size={24} />
          </button>
        </div>
      </header>

      {/* Stats Section */}
      <div className="px-4 pt-6 pb-2">
        <div className="flex flex-wrap gap-3">
          <div className="flex flex-1 flex-col gap-1 rounded-2xl p-5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary">
                <TrendingUp size={18} />
              </span>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Pendentes</p>
            </div>
            <div>
              <p className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">{openOrders.length}</p>
              <p className="text-primary text-xs font-medium mt-1">Aguardando ação</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-1 rounded-2xl p-5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center justify-center size-8 rounded-full bg-green-500/10 text-green-500">
                <DollarSign size={18} />
              </span>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Vendas Hoje</p>
            </div>
            <div>
              <p className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">R$ {orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</p>
              <p className="text-green-500 text-xs font-medium mt-1">Total do dia</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3">
        <div className="relative flex items-center w-full h-12 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all shadow-sm">
          <div className="grid place-items-center h-full w-12 text-slate-400 dark:text-slate-500">
            <Search size={20} />
          </div>
          <Input
            className="peer h-full w-full outline-none text-sm text-slate-700 dark:text-slate-200 pr-2 bg-transparent placeholder-slate-400 dark:placeholder-slate-600 font-medium border-none focus:ring-0"
            placeholder="Buscar por cliente ou pedido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="sticky top-[73px] z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
          {filters.map((filter) => (
            <Button
              key={filter.label}
              variant={activeFilter === filter.label ? "default" : "outline"}
              size="sm"
              className={`h-9 shrink-0 px-4 rounded-full ${
                activeFilter === filter.label
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
              } transition-transform active:scale-95`}
              onClick={() => setActiveFilter(filter.label)}
            >
              <span className="text-sm font-semibold">{filter.label}</span>
              {filter.count !== null && filter.count > 0 && (
                <span className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary px-1">
                  {filter.count}
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="flex-1 px-4 py-4 space-y-4 pb-24">
        {/* Open Orders Section */}
        {openOrders.length > 0 && (
          <>
            <div className="flex items-center justify-between pt-2">
              <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">Em Aberto</h3>
              <button className="text-primary text-xs font-semibold hover:underline">Ver tudo</button>
            </div>
            {openOrders.map((order) => (
              <Link
                key={order.id}
                to={`/detalhes-pedido?id=${encodeURIComponent(order.id)}`}
                className="block"
              >
                <article
                  className={`group relative flex flex-col gap-3 rounded-2xl bg-white dark:bg-surface-dark p-4 border shadow-sm transition-all hover:shadow-md active:scale-[0.99] cursor-pointer ${
                    order.isNew
                      ? "border-primary/30 dark:border-primary/30"
                      : "border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`relative flex items-center justify-center rounded-xl shrink-0 size-12 ${
                        order.statusColor === "primary" ? "bg-primary/10 text-primary" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                      }`}>
                        {getStatusIcon(order.statusIcon)}
                        {order.isNew && (
                          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 ring-2 ring-white dark:ring-surface-dark"></span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-slate-900 dark:text-white text-base font-bold leading-tight">{order.id}</p>
                          <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${getStatusColor(order.statusColor)}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-0.5">{order.customer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-900 dark:text-white text-base font-bold">R$ {order.total.toFixed(2)}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs">{order.time}</p>
                    </div>
                  </div>
                  <div className="w-full h-px bg-slate-200 dark:bg-slate-800"></div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-normal line-clamp-1 flex-1">
                      {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                    </p>
                    <div className="flex gap-2">
                      {order.status === "Novo" && (
                        <button className="flex size-8 items-center justify-center rounded-full bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors">
                          <Check size={18} />
                        </button>
                      )}
                      {order.status === "Rota" && (
                        <>
                          <button className="flex size-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-green-500 transition-colors">
                            <Phone size={18} />
                          </button>
                          <button className="flex size-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-green-500 transition-colors">
                            <MessageCircle size={18} />
                          </button>
                        </>
                      )}
                      <button className="flex size-8 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </>
        )}

        {/* Finished Orders Section */}
        {finishedOrders.length > 0 && (
          <>
            <div className="flex items-center justify-between pt-4">
              <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">Finalizados Hoje</h3>
            </div>
            {finishedOrders.map((order) => (
              <Link
                key={order.id}
                to={`/detalhes-pedido?id=${encodeURIComponent(order.id)}`}
                className="block"
              >
                <article
                  className="group relative flex items-center justify-between rounded-xl bg-white/50 dark:bg-surface-dark/50 p-4 border border-transparent shadow-none opacity-70"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center rounded-lg shrink-0 size-10 ${getStatusColor(order.statusColor)}`}>
                      {getStatusIcon(order.statusIcon)}
                    </div>
                    <div>
                      <p className={`text-slate-900 dark:text-white text-sm font-bold leading-tight ${order.cancelled ? 'line-through decoration-slate-400' : ''}`}>
                        {order.id} - {order.customer}
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">
                        {order.status === "Entregue" ? `Entregue às ${order.time}` : "Cancelado pelo cliente"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-slate-900 dark:text-white text-sm font-bold ${order.cancelled ? 'line-through decoration-red-500/50' : ''}`}>
                      R$ {order.total.toFixed(2)}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </>
        )}
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 z-30 flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95">
        <Plus size={28} />
      </button>
    </div>
  );
};

export default GestaoPedidos;