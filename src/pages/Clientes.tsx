import { ArrowLeft, Bell, Plus, Search, MoreVertical, Phone, MessageCircle, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filters = ["Todos", "VIPs", "Devedores", "Novos", "Inativos"];

  const customers = [
    {
      id: 1,
      name: "Maria Silva",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuATnOgwjdatv2PuCBwYZ9_8wozN9Vb8eVEMG9uQMv3p_AyJjWvZ9MJw2-d04bcBFq4Y_4188BM6tgO0H5wM3uqdyLguoJw5_sStCNK1q6t3ufbIQxiR-cYLqZtGmfsUTomFqe2XfiSspGzCVa3_APTZ9rVah6UXJXhcF-Zhnmyh4TKXCPKaNvMUc4fPrE3gceUwe46m-D_GY3AXbc7vEs1Evt_Q_271UyaypBKvfRdnICSdNb3iTzcadPG9-3ZnvxgJuIIEmLQmew",
      status: "VIP",
      statusColor: "yellow",
      lastOrder: "Hoje, 14:30",
      totalSpent: 450.00,
      isOnline: true,
      type: "vip"
    },
    {
      id: 2,
      name: "João Souza",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCO87rE_qgFksEKiShqMAZbbtrOWc3LOlkRp420n15KoVRr7SpctX9clA8IPagAq2rRDKsosshOEDqPZnsGuesHKwjc6-mdqB31_DcGL5jDNkcPQ403xwYQDjLr6F3lBS5eZoDLH95dZUzMkyPrJc8nOVGKkHK3m-wRqj2GeENu79sqzqofFsKKHmTiIE7dXm2rT4rKHZrCVUMm2qSJfR0KjrnvrO_6msa2L7C-WQ95C0LYhQ043xCRmpKYEvyuspov50AjnSGatw",
      status: "Pendente",
      statusColor: "red",
      lastOrder: "Ontem, 09:15",
      debt: 25.00,
      type: "debtor"
    },
    {
      id: 3,
      name: "Bruno Ferreira",
      initials: "BF",
      status: "Novo",
      statusColor: "blue",
      registered: "15/10/2023",
      preference: "Ninho c/ Nutella",
      type: "new"
    },
    {
      id: 4,
      name: "Carla Dias",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfzIKUXhxlSfDjxkFpISPVb6bsmspsBeD8OV4scHNq8pWTxXnZ6kjE_14EaoddytcaMtDq3g01fBMbuZFNz7LEAgwJ0VgbDIwSqrmF2nAodzjcL59djAIKgtNl_RcLT93rclnnDIrU7bDoEC4cxRyZUXtkoFUn8Fr5NZOpWQfZ8tTnh3RRHIWB2DBev-_CjBXk40wPTD8e0G5JPtDiRMf-eJJWr3lK-XxTfl5Q8BHQzKEyyMq_Aiht-DphW3dfntXgakQSoPaZ-Q",
      status: null,
      lastOrder: "12/10, 18:00",
      totalSpent: 120.00,
      type: "standard"
    }
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "Todos" ||
                         (activeFilter === "VIPs" && customer.type === "vip") ||
                         (activeFilter === "Devedores" && customer.type === "debtor") ||
                         (activeFilter === "Novos" && customer.type === "new") ||
                         (activeFilter === "Inativos" && customer.type === "inactive");
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="flex-none bg-background-light dark:bg-background-dark px-4 pt-4 pb-2 z-10 border-b border-slate-200 dark:border-white/5">
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
            className="block w-full p-3 pl-10 text-sm text-slate-900 border border-slate-200 rounded-xl bg-white dark:bg-surface-dark dark:border-white/10 dark:placeholder-slate-400 dark:text-white focus:ring-primary focus:border-primary focus:outline-none transition-all"
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
        {filteredCustomers.map((customer) => (
          <Link
            key={customer.id}
            to={`/detalhes-cliente?id=${customer.id}`}
            className="block"
          >
            <article
              className={`group relative flex flex-col gap-3 p-4 rounded-2xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-white/5 shadow-sm active:scale-[0.99] transition-transform ${
                customer.debt ? 'opacity-75 hover:opacity-100' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {customer.avatar ? (
                      <img
                        className="size-12 rounded-full object-cover border-2 border-primary/20"
                        src={customer.avatar}
                        alt={customer.name}
                      />
                    ) : (
                      <div className="size-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 font-bold text-lg flex items-center justify-center">
                        {customer.initials}
                      </div>
                    )}
                    {customer.isOnline && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 size-3 rounded-full border-2 border-white dark:border-surface-dark"></div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white">{customer.name}</h3>
                      {customer.status && (
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                          customer.statusColor === 'yellow' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          customer.statusColor === 'red' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                          customer.statusColor === 'blue' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                          ''
                        }`}>
                          {customer.status}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                      {customer.lastOrder ? (
                        <>
                          <span className="material-symbols-outlined text-[14px]">history</span>
                          Último pedido: {customer.lastOrder}
                        </>
                      ) : customer.registered ? (
                        <>
                          <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                          Cadastrado: {customer.registered}
                        </>
                      ) : null}
                    </p>
                  </div>
                </div>
                <button className="text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary">
                  <MoreVertical size={20} />
                </button>
              </div>
              <div className="w-full h-px bg-slate-100 dark:bg-white/5"></div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-slate-400 dark:text-slate-500 font-bold tracking-wider">
                    {customer.debt ? "Débito" : customer.preference ? "Preferência" : "Total Gasto"}
                  </span>
                  <span className={`text-sm font-medium ${customer.debt ? "text-red-600 dark:text-red-400" : "text-slate-700 dark:text-slate-200"}`}>
                    {customer.debt ? `R$ ${customer.debt.toFixed(2)}` : customer.preference ? customer.preference : `R$ ${customer.totalSpent?.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center justify-center size-9 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-green-100 hover:text-green-600 dark:hover:bg-green-900/30 dark:hover:text-green-400 transition-colors">
                    <Phone size={20} />
                  </button>
                  <button className="flex items-center justify-center size-9 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-green-100 hover:text-green-600 dark:hover:bg-green-900/30 dark:hover:text-green-400 transition-colors">
                    <MessageCircle size={20} />
                  </button>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-20">
        <button className="flex items-center justify-center size-14 rounded-full bg-primary text-white shadow-xl hover:bg-primary/90 hover:scale-105 transition-all">
          <ShoppingCart size={28} />
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="flex-none bg-white dark:bg-surface-dark border-t border-slate-200 dark:border-white/5 pb-6 pt-2 px-6 flex justify-between items-center z-10">
        <Link to="/" className="flex flex-col items-center gap-1 p-2 text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-medium">Início</span>
        </Link>
        <button className="flex flex-col items-center gap-1 p-2 text-primary dark:text-primary transition-colors">
          <span className="material-symbols-filled">group</span>
          <span className="text-[10px] font-medium">Clientes</span>
        </button>
        <Link to="/gestao-insumos" className="flex flex-col items-center gap-1 p-2 text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors">
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="text-[10px] font-medium">Estoque</span>
        </Link>
        <Link to="/configuracoes-admin" className="flex flex-col items-center gap-1 p-2 text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-medium">Ajustes</span>
        </Link>
      </nav>
    </div>
  );
};

export default Clientes;