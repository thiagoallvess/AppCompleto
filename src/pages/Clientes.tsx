import { ArrowLeft, Bell, Plus, Search, MoreVertical, Phone, MessageCircle, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useClients } from "@/contexts/ClientsContext";

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const { clients } = useClients();

  const filters = ["Todos", "VIPs", "Devedores", "Novos", "Inativos"];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "Todos" ||
                         (activeFilter === "VIPs" && client.type === "vip") ||
                         (activeFilter === "Devedores" && client.type === "debtor") ||
                         (activeFilter === "Novos" && client.type === "new") ||
                         (activeFilter === "Inativos" && client.type === "inactive");
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (color: string) => {
    switch (color) {
      case "yellow": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "red": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "blue": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      default: return "";
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark border-b border-slate-200 dark:border-white/5">
        <div className="flex items-center justify-between h-14 mb-2">
          <Link
            to="/"
            className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="text-slate-900 dark:text-white" size={24} />
          </Link>
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <Bell className="text-slate-900 dark:text-white" size={24} />
            </button>
            <button className="flex items-center justify-center size-10 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-colors">
              <Plus size={24} />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1 px-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Clientes</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Gerencie seus contatos e pedidos</p>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="flex-none flex flex-col gap-4 px-4 pb-2 bg-background-light dark:bg-background-dark z-10 shadow-sm dark:shadow-none border-b border-slate-200 dark:border-white/5">
        {/* Search Bar */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="text-slate-400" size={20} />
          </div>
          <input
            className="block w-full p-3 pl-10 border border-slate-200 rounded-xl bg-white dark:bg-surface-dark dark:border-white/10 dark:placeholder-slate-400 dark:text-white focus:ring-primary focus:border-primary focus:outline-none transition-all"
            placeholder="Buscar por nome, telefone ou status..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-none px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                  : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Customer List */}
      <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 space-y-3 pb-24">
        {filteredClients.map((client) => (
          <Link
            key={client.id}
            to={`/detalhes-cliente?id=${client.id}`}
            className="block"
          >
            <article
              className={`group relative flex flex-col gap-3 p-4 rounded-2xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-white/5 shadow-sm active:scale-[0.99] transition-transform ${
                client.debt ? 'opacity-75 hover:opacity-100' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {client.avatar ? (
                      <img
                        className="size-12 rounded-full object-cover border-2 border-primary/20"
                        src={client.avatar}
                        alt={client.name}
                      />
                    ) : (
                      <div className="size-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 font-bold text-lg flex items-center justify-center">
                        {client.initials}
                      </div>
                    )}
                    {client.isOnline && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 size-3 rounded-full border-2 border-white dark:border-surface-dark"></div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white">{client.name}</h3>
                      {client.status && (
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${getStatusColor(client.statusColor)}`}>
                          {client.status}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                      {client.lastOrder ? (
                        <>
                          <span className="material-symbols-outlined text-[14px]">history</span>
                          Último pedido: {client.lastOrder}
                        </>
                      ) : client.registered ? (
                        <>
                          <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                          Cadastrado: {client.registered}
                        </>
                      ) : null}
                    </p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-primary dark:hover:text-primary">
                  <MoreVertical size={20} />
                </button>
              </div>
              <div className="w-full h-px bg-slate-100 dark:bg-white/5"></div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-slate-400 dark:text-slate-500 font-bold tracking-wider">
                    {client.debt ? "Débito" : client.preference ? "Preferência" : "Total Gasto"}
                  </span>
                  <span className={`text-sm font-medium ${client.debt ? "text-red-600 dark:text-red-400" : "text-slate-700 dark:text-slate-200"}`}>
                    {client.debt ? `R$ ${client.debt.toFixed(2)}` : client.preference ? client.preference : `R$ ${client.totalSpent?.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center justify-center size-9 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-green-500 transition-colors">
                    <Phone size={18} />
                  </button>
                  <button className="flex items-center justify-center size-9 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-green-500 transition-colors">
                    <MessageCircle size={18} />
                  </button>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default Clientes;