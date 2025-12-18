import { ArrowLeft, Menu, Bell, Plus, Search, TrendingUp, DollarSign, Check, ChevronRight, ChefHat, Bike, CheckCircle, X, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const GestaoPedidos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filters = [
    { label: "Todos", count: null },
    { label: "Novos", count: 4 },
    { label: "Em Preparo", count: 2 },
    { label: "A Caminho", count: null },
    { label: "Entregues", count: null }
  ];

  const orders = [
    {
      id: "#1024",
      customer: "Maria Silva",
      status: "Novo",
      statusColor: "primary",
      statusIcon: "inventory_2",
      time: "14:32",
      total: 45.00,
      items: "3x Ninho com Nutella, 2x Morango, 1x Coco...",
      isNew: true,
      section: "open"
    },
    {
      id: "#1023",
      customer: "Carlos Oliveira",
      status: "Preparo",
      statusColor: "orange",
      statusIcon: "soup_kitchen",
      time: "14:15",
      total: 22.50,
      items: "5x Limão Siciliano",
      section: "open"
    },
    {
      id: "#1022",
      customer: "Ana Souza",
      status: "Rota",
      statusColor: "blue",
      statusIcon: "sports_motorsports",
      time: "13:50",
      total: 60.00,
      items: "",
      eta: "Chegada em 5 min",
      section: "open"
    },
    {
      id: "#1021",
      customer: "Roberto Lima",
      status: "Entregue",
      statusColor: "green",
      statusIcon: "check_circle",
      time: "13:30",
      total: 18.00,
      section: "finished"
    },
    {
      id: "#1020",
      customer: "Julia M.",
      status: "Cancelado",
      statusColor: "red",
      statusIcon: "cancel",
      time: "",
      total: 32.00,
      section: "finished",
      cancelled: true
    }
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
      <header className="sticky top-0 z-20 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 justify-between border-b border-border-light dark:border-border-dark">
        <div className="flex items-center gap-3">
          <button className="text-slate-900 dark:text-white flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <Menu size={24} />
          </button>
          <div>
            <h1 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">Gestão de Pedidos</h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium">Gourmet Ice</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-white transition-colors">
            <Bell size={24} />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-primary border-2 border-background-light dark:border-background-dark"></span>
          </button>
          <button className="flex size-10 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white overflow-hidden">
            <img
              alt="Admin Avatar"
              className="size-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8naAE7ZPJQ_2lWZ-mpC3aul9CjvoS5Sl4dR3iHLgDfV0g46r2rZhLSCjoDSDGytBqsdZLba-BK44FA__egoZrSbyxtW0EbMxfq1583Sj4e7vIaLxrdpyeEJge0WjTS3ERJQdu0O61_qoVjxHbg8RyBg58cXtcFsRflTZXrA6oR5bmaeuieV1WIy2v8mqGe-az9cke_OD_My6sfqgrRNBvW131WJf_1RWhHReMAaYmWFR5pJLiCyO0Tur_6qe6xeipTczKPBpqyQ"
            />
          </button>
        </div>
      </header>

      {/* Stats Section */}
      <div className="px-4 pt-6 pb-2">
        <div className="flex flex-wrap gap-3">
          <div className="flex flex-1 flex-col gap-1 rounded-2xl p-4 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-bold uppercase tracking-wider">Hoje</p>
              <TrendingUp className="text-primary text-lg" />
            </div>
            <p className="text-slate-900 dark:text-white tracking-tight text-2xl font-bold">24</p>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium">Pedidos novos</p>
          </div>
          <div className="flex flex-1 flex-col gap-1 rounded-2xl p-4 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-bold uppercase tracking-wider">Receita</p>
              <DollarSign className="text-green-500 text-lg" />
            </div>
            <p className="text-slate-900 dark:text-white tracking-tight text-2xl font-bold">R$ 350</p>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium">+12% vs ontem</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3">
        <div className="relative flex items-center w-full h-12 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all shadow-sm">
          <div className="grid place-items-center h-full w-12 text-text-secondary-light dark:text-text-secondary-dark">
            <Search size={20} />
          </div>
          <Input
            className="peer h-full w-full outline-none bg-transparent text-sm text-slate-900 dark:text-white placeholder-text-secondary-light dark:placeholder-text-secondary-dark pr-4 font-medium border-none focus:ring-0"
            placeholder="Buscar por cliente ou pedido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="sticky top-[73px] z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-border-light dark:border-border-dark">
        <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
          {filters.map((filter) => (
            <Button
              key={filter.label}
              variant={activeFilter === filter.label ? "default" : "outline"}
              size="sm"
              className={`h-9 shrink-0 px-4 rounded-full ${
                activeFilter === filter.label
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-slate-200 dark:hover:bg-slate-800"
              } transition-transform active:scale-95`}
              onClick={() => setActiveFilter(filter.label)}
            >
              <span className="text-sm font-semibold">{filter.label}</span>
              {filter.count && (
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
              <h3 className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-bold uppercase tracking-widest">Em Aberto</h3>
              <button className="text-primary text-xs font-semibold hover:underline">Ver tudo</button>
            </div>
            {openOrders.map((order) => (
              <div
                key={order.id}
                className={`group relative flex flex-col gap-3 rounded-2xl bg-surface-light dark:bg-surface-dark p-4 border shadow-sm transition-all hover:shadow-md active:scale-[0.99] ${
                  order.isNew
                    ? "border-primary/30 dark:border-primary/30"
                    : "border-border-light dark:border-border-dark"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`relative flex items-center justify-center rounded-xl shrink-0 size-12 ${
                      order.statusColor === "primary" ? "bg-primary/10 text-primary" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}>
                      {getStatusIcon(order.statusIcon)}
                      {order.isNew && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 ring-2 ring-surface-light dark:ring-surface-dark"></span>
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
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">{order.time}</p>
                  </div>
                </div>
                <div className="w-full h-px bg-border-light dark:bg-border-dark"></div>
                <div className="flex items-center justify-between gap-4">
                  {order.eta ? (
                    <div className="flex items-center gap-1.5 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      <div className="material-symbols-outlined text-sm">schedule</div>
                      <span>{order.eta}</span>
                    </div>
                  ) : (
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs leading-normal line-clamp-1 flex-1">
                      {order.items}
                    </p>
                  )}
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
              </div>
            ))}
          </>
        )}

        {/* Finished Orders Section */}
        {finishedOrders.length > 0 && (
          <>
            <div className="flex items-center justify-between pt-4">
              <h3 className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-bold uppercase tracking-widest">Finalizados Hoje</h3>
            </div>
            {finishedOrders.map((order) => (
              <div
                key={order.id}
                className="group relative flex items-center justify-between rounded-xl bg-surface-light/50 dark:bg-surface-dark/50 p-4 border border-transparent shadow-none opacity-70"
              >
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center rounded-lg shrink-0 size-10 ${getStatusColor(order.statusColor)}`}>
                    {getStatusIcon(order.statusIcon)}
                  </div>
                  <div>
                    <p className={`text-slate-900 dark:text-white text-sm font-bold leading-tight ${order.cancelled ? 'line-through decoration-slate-400' : ''}`}>
                      {order.id} - {order.customer}
                    </p>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium">
                      {order.status === "Entregue" ? `Entregue às ${order.time}` : "Cancelado pelo cliente"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-slate-900 dark:text-white text-sm font-bold ${order.cancelled ? 'line-through decoration-red-500/50' : ''}`}>
                    R$ {order.total.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 z-30 flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95">
        <Plus size={28} />
      </button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 z-20 w-full max-w-md border-t border-border-light dark:border-border-dark bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md pb-safe">
        <div className="flex h-16 items-center justify-around px-2">
          <Link to="/gestao-pedidos" className="flex flex-col items-center justify-center gap-1 w-16 text-primary">
            <div className="material-symbols-outlined fill">list_alt</div>
            <span className="text-[10px] font-bold">Pedidos</span>
          </Link>
          <Link to="/gestao-insumos" className="flex flex-col items-center justify-center gap-1 w-16 text-text-secondary-light dark:text-text-secondary-dark hover:text-slate-900 dark:hover:text-white transition-colors">
            <div className="material-symbols-outlined">inventory</div>
            <span className="text-[10px] font-medium">Estoque</span>
          </Link>
          <button className="flex flex-col items-center justify-center gap-1 w-16 text-text-secondary-light dark:text-text-secondary-dark hover:text-slate-900 dark:hover:text-white transition-colors">
            <div className="material-symbols-outlined">bar_chart</div>
            <span className="text-[10px] font-medium">Vendas</span>
          </button>
          <Link to="/configuracoes-admin" className="flex flex-col items-center justify-center gap-1 w-16 text-text-secondary-light dark:text-text-secondary-dark hover:text-slate-900 dark:hover:text-white transition-colors">
            <div className="material-symbols-outlined">settings</div>
            <span className="text-[10px] font-medium">Ajustes</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default GestaoPedidos;