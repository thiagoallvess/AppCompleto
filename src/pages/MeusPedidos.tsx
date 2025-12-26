"use client";

import { ArrowLeft, Receipt, Clock, Star, Home, Search, Heart, User, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useOrders } from "@/contexts/OrdersContext";

const MeusPedidos = () => {
  const { orders } = useOrders();

  // Filtrar apenas os pedidos do cliente atual (João Silva, conforme definido no checkout)
  const clientOrders = orders.filter(order => order.customer === "João Silva");

  // Mapear os pedidos reais para o formato de exibição
  const displayOrders = clientOrders.map(order => ({
    id: order.id.replace('#', ''),
    status: order.status,
    statusColor: order.statusColor,
    date: order.date || `Hoje, ${order.time}`,
    items: order.items.map(i => `${i.quantity}x ${i.name}`).join(', '),
    itemCount: order.items.reduce((sum, i) => sum + i.quantity, 0),
    total: order.total,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=300",
    eta: order.eta,
    action: order.status === 'Entregue' ? "Pedir novamente" : "Rastrear",
    isActive: order.section === 'open',
    cancelled: order.cancelled
  }));

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-text-primary pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center p-4 pb-2 justify-between max-w-md mx-auto lg:max-w-7xl lg:px-6 w-full">
          <Link
            to="/"
            className="flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="text-slate-900 dark:text-text-primary" size={24} />
          </Link>
          <h1 className="text-slate-900 dark:text-text-primary text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">
            Meus Pedidos
          </h1>
        </div>
      </header>

      {/* Orders List */}
      <main className="max-w-md mx-auto lg:max-w-7xl flex flex-col gap-6 p-4">
        {displayOrders.length === 0 ? (
          <div className="text-center py-20">
            <Receipt className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <p className="text-slate-500">Você ainda não realizou pedidos.</p>
            <Link to="/" className="text-primary font-bold mt-4 inline-block">Ver cardápio</Link>
          </div>
        ) : (
          displayOrders.map((order) => (
            <Link
              key={order.id}
              to={`/detalhes-pedido-cliente?id=${order.id}`}
              className="block"
            >
              <article
                className={`group relative overflow-hidden rounded-xl bg-white dark:bg-surface-dark border shadow-sm transition-all hover:shadow-md active:scale-[0.99] cursor-pointer ${
                  order.cancelled ? 'opacity-75' : ''
                }`}
              >
                <div className="mb-3 flex items-start justify-between gap-4 p-4">
                  <div className="flex flex-col gap-1">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      order.status === 'Rota' || order.status === 'A Caminho' ? 'bg-blue-100 dark:bg-primary/20 text-primary dark:text-blue-200' :
                      order.cancelled ? 'bg-red-100 dark:bg-red-900/20 text-red-500 dark:text-red-400' :
                      'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}>
                      {order.isActive && <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>}
                      {order.status}
                    </span>
                    <p className="text-xs font-medium text-gray-500 dark:text-text-secondary">Pedido #{order.id} • {order.date}</p>
                  </div>
                  <ArrowLeft className="text-gray-400 dark:text-text-secondary rotate-180" size={20} />
                </div>
                <div className="flex gap-4 px-4 pb-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
                    <img
                      alt={order.items}
                      className={`h-full w-full object-cover ${order.cancelled ? 'grayscale opacity-50' : ''}`}
                      src={order.image}
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center py-0.5">
                    <div>
                      <h3 className={`line-clamp-2 text-sm font-medium leading-snug ${
                        order.cancelled ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
                      }`}>
                        {order.items}
                      </h3>
                    </div>
                    <div className="flex items-end justify-between mt-2">
                      <p className="text-sm text-gray-500 dark:text-text-secondary">{order.itemCount} itens</p>
                      <p className={`text-base font-bold ${order.cancelled ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                        R$ {order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-3 flex justify-between items-center px-4 pb-4">
                  <span className="text-xs text-gray-500 dark:text-text-secondary flex items-center gap-1">
                    {order.isActive && <Clock size={14} />}
                    {order.cancelled && "Cancelado"}
                    {order.eta && order.eta}
                  </span>
                  <button className="text-sm font-semibold text-primary">
                    {order.action}
                  </button>
                </div>
              </article>
            </Link>
          ))
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg pb-safe">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto lg:max-w-none lg:px-6">
          <Link to="/" className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <Home size={24} />
            <span className="text-[10px] font-medium">Início</span>
          </Link>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <Search size={24} />
            <span className="text-[10px] font-medium">Buscar</span>
          </button>
          <button className="flex flex-col items-center justify-center w-full h-full text-primary space-y-1">
            <Receipt size={24} />
            <span className="text-[10px] font-medium">Pedidos</span>
          </button>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <Heart size={24} />
            <span className="text-[10px] font-medium">Favoritos</span>
          </button>
          <Link to="/perfil" className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <User size={24} />
            <span className="text-[10px] font-medium">Perfil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MeusPedidos;