"use client";

import { ArrowLeft, HelpCircle, RefreshCw, MapPin, CreditCard, Truck, Clock, CheckCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useOrders } from "@/contexts/OrdersContext";

const DetalhesPedidoCliente = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  const { getOrderById } = useOrders();

  // Busca o pedido real no contexto
  const order = getOrderById(orderId?.startsWith('#') ? orderId : `#${orderId}`);

  if (!order) {
    return (
      <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-6 bg-background-light dark:bg-background-dark">
        <header className="sticky top-0 z-50 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 px-4 py-3 backdrop-blur-md">
          <Link to="/meus-pedidos" className="flex size-10 items-center justify-center rounded-full text-gray-900 dark:text-white">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="flex-1 pr-10 text-center text-lg font-bold">Pedido não encontrado</h2>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <p className="text-slate-500 mb-4">Não conseguimos encontrar as informações deste pedido.</p>
          <Link to="/meus-pedidos" className="text-primary font-bold">Voltar para meus pedidos</Link>
        </div>
      </div>
    );
  }

  // Lógica de progresso baseada no status real
  const getProgress = (status: string) => {
    switch (status) {
      case "Novo": return 25;
      case "Preparo": return 50;
      case "Rota": return 75;
      case "Entregue": return 100;
      default: return 0;
    }
  };

  const subtotal = order.total;
  const deliveryFee = 5.00;
  const total = subtotal + deliveryFee;

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-6 bg-background-light dark:bg-background-dark">
      {/* TopAppBar */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 px-4 py-3 backdrop-blur-md">
        <Link
          to="/meus-pedidos"
          className="flex size-10 items-center justify-center rounded-full text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all"
        >
          <ArrowLeft size={20} />
        </Link>
        <h2 className="flex-1 pr-10 text-center text-lg font-bold leading-tight tracking-tight">Detalhes do Pedido</h2>
      </header>

      {/* MetaText */}
      <div className="flex flex-col items-center justify-center pt-2 pb-6">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pedido {order.id} • {order.date || 'Hoje'}</p>
      </div>

      {/* Status Card */}
      <div className="px-4 mb-6">
        <div className="relative overflow-hidden rounded-xl bg-surface-dark shadow-sm ring-1 ring-white/5">
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark/95 to-background-dark/60"></div>
          <div className="relative flex items-center justify-between p-5">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Status Atual</span>
              <h3 className="text-xl font-bold text-white">{order.status}</h3>
              {order.eta && (
                <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
                  <Clock size={16} />
                  Previsão: {order.eta}
                </p>
              )}
            </div>
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30">
              <Truck size={24} />
            </div>
          </div>
          {/* Progress Line */}
          <div className="relative h-1 w-full bg-gray-700">
            <div className="absolute left-0 top-0 h-full bg-primary shadow-[0_0_10px_rgba(22,67,156,0.5)]" style={{ width: `${getProgress(order.status)}%` }}></div>
          </div>
        </div>
      </div>

      {/* Order Items Section */}
      <div className="mb-2">
        <h3 className="px-4 pb-3 pt-2 text-base font-bold text-gray-900 dark:text-white">Itens do Pedido</h3>
        <div className="flex flex-col divide-y divide-white/5 border-y border-white/5 bg-surface-dark">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center gap-4 px-4 py-4">
              <div className="flex size-8 shrink-0 items-center justify-center rounded bg-white/10 text-xs font-bold text-white">{item.quantity}x</div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-white">{item.name}</p>
                <p className="truncate text-xs text-gray-500">{item.description}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-medium text-white">R$ {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery & Payment Info */}
      <div className="px-4 py-6 grid grid-cols-1 gap-4">
        {/* Address */}
        <div className="flex items-start gap-4">
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-dark text-gray-400 ring-1 ring-white/5">
            <MapPin size={18} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">Endereço de entrega</p>
            <p className="text-sm text-gray-400">Rua das Flores, 123 - Apt 402</p>
            <p className="text-xs text-gray-500">Jardim Paulista, São Paulo - SP</p>
          </div>
        </div>
        {/* Payment */}
        <div className="flex items-start gap-4">
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-dark text-gray-400 ring-1 ring-white/5">
            <CreditCard size={18} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">Pagamento</p>
            <p className="text-sm text-gray-400">Cartão de Crédito (App)</p>
          </div>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="mt-auto bg-surface-dark px-4 py-6 pb-8 rounded-t-3xl border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
        <div className="mb-6 space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Subtotal</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Taxa de entrega</span>
            <span>R$ {deliveryFee.toFixed(2)}</span>
          </div>
          <div className="my-3 h-px w-full bg-white/10"></div>
          <div className="flex justify-between items-center">
            <span className="text-base font-medium text-white">Total</span>
            <span className="text-2xl font-bold text-white">R$ {total.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex h-12 flex-1 items-center justify-center rounded-xl bg-surface-highlight text-sm font-bold text-white hover:bg-white/10 transition-colors">
            <HelpCircle size={16} className="mr-2" />
            Ajuda
          </button>
          <button className="flex h-12 flex-[2] items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
            <RefreshCw size={18} />
            Repetir Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalhesPedidoCliente;