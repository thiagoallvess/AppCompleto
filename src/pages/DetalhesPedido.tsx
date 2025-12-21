import { ArrowLeft, Printer, MoreVertical, Check, X, Phone, MessageCircle, MapPin, ShoppingBag, User, CreditCard, History } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useOrders } from "@/contexts/OrdersContext";

const DetalhesPedido = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  const { getOrderById } = useOrders();

  const order = getOrderById(orderId || '');

  if (!order) {
    return (
      <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-6 bg-background-light dark:bg-background-dark">
        <header className="sticky top-0 z-20 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 justify-between border-b border-slate-200 dark:border-slate-800 w-full">
          <Link
            to="/gestao-pedidos"
            className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full active:bg-gray-200 dark:active:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Pedido não encontrado</h2>
          <div className="size-10"></div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <span className="material-symbols-outlined text-slate-400 text-6xl mb-4">receipt_long</span>
            <p className="text-slate-500 dark:text-slate-400 mb-4">Pedido não encontrado</p>
            <Link
              to="/gestao-pedidos"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft size={16} />
              Voltar para Pedidos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-6 bg-background-light dark:bg-background-dark">
      {/* TopAppBar */}
      <header className="sticky top-0 z-20 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 justify-between border-b border-slate-200 dark:border-slate-800 w-full">
        <Link
          to="/gestao-pedidos"
          className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full active:bg-gray-200 dark:active:bg-gray-800 transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">{order.id}</h2>
        <div className="flex items-center gap-2">
          <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-white transition-colors">
            <Printer size={24} />
          </button>
          <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-white transition-colors">
            <MoreVertical size={24} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 space-y-6 pb-32 w-full max-w-4xl mx-auto">
        {/* Order Status */}
        <div className="rounded-2xl bg-white dark:bg-surface-dark p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Status do Pedido</span>
            <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
              order.statusColor === "primary" ? "bg-primary/10 text-primary" :
              order.statusColor === "orange" ? "bg-orange-500/10 text-orange-500" :
              order.statusColor === "blue" ? "bg-blue-500/10 text-blue-500" :
              order.statusColor === "green" ? "bg-green-500/10 text-green-500" :
              "bg-red-500/10 text-red-500"
            }`}>
              {order.status}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0 size-14">
              <span className="material-symbols-outlined text-[28px]">{order.statusIcon}</span>
            </div>
            <div>
              <p className="text-slate-900 dark:text-white text-xl font-bold">
                {order.status === "Novo" ? "Aguardando Ação" :
                 order.status === "Preparo" ? "Em Preparo" :
                 order.status === "Rota" ? "A Caminho" :
                 order.status === "Entregue" ? "Entregue" :
                 "Cancelado"}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                {order.status === "Novo" ? "Criado há 15 min" :
                 order.status === "Preparo" ? "Iniciado há 10 min" :
                 order.status === "Rota" ? "Saiu para entrega" :
                 order.status === "Entregue" ? `Entregue às ${order.time}` :
                 "Cancelado pelo cliente"}
              </p>
            </div>
          </div>
          {order.status === "Novo" && (
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <X size={18} />
                Rejeitar
              </button>
              <button className="flex items-center justify-center gap-2 h-10 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                <Check size={18} />
                Aceitar
              </button>
            </div>
          )}
        </div>

        {/* Customer Info */}
        <div className="rounded-2xl bg-white dark:bg-surface-dark p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-slate-900 dark:text-white text-base font-bold mb-4 flex items-center gap-2">
            <User className="text-slate-500 dark:text-slate-400" size={20} />
            Cliente
          </h3>
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
              <div className="flex items-center justify-center size-full text-slate-500 dark:text-slate-400 font-bold text-lg">
                {order.customer.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-slate-900 dark:text-white font-bold text-base">{order.customer}</p>
              <div className="flex items-center gap-1 mt-1 text-slate-500 dark:text-slate-400 text-sm">
                <span className="material-symbols-outlined text-base text-yellow-500">star</span>
                <span>4.9 (12 pedidos)</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <button className="flex items-center justify-center gap-2 h-10 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <Phone size={18} />
              Ligar
            </button>
            <button className="flex items-center justify-center gap-2 h-10 rounded-xl border border-green-500/30 text-green-600 dark:text-green-400 bg-green-500/5 font-semibold text-sm hover:bg-green-500/10 transition-colors">
              <MessageCircle size={18} />
              WhatsApp
            </button>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="rounded-2xl bg-white dark:bg-surface-dark p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-900 dark:text-white text-base font-bold flex items-center gap-2">
              <MapPin className="text-slate-500 dark:text-slate-400" size={20} />
              Entrega
            </h3>
            <button className="text-primary text-xs font-bold uppercase tracking-wider hover:underline">Ver no Mapa</button>
          </div>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex flex-col items-center gap-1 pt-1">
                <div className="size-2 rounded-full bg-slate-400 dark:bg-slate-500"></div>
                <div className="w-0.5 h-12 bg-slate-200 dark:bg-slate-700"></div>
                <div className="size-2 rounded-full bg-primary"></div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider mb-0.5">Origem</p>
                  <p className="text-slate-900 dark:text-white text-sm font-medium">Loja Gourmet Ice - Centro</p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider mb-0.5">Destino</p>
                  <p className="text-slate-900 dark:text-white text-sm font-medium leading-relaxed">Rua das Acácias, 450, Apto 32<br/>Jardim das Flores, São Paulo - SP</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Distância: 3.2 km • Est. 15-20 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="rounded-2xl bg-white dark:bg-surface-dark p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-slate-900 dark:text-white text-base font-bold mb-4 flex items-center gap-2">
            <ShoppingBag className="text-slate-500 dark:text-slate-400" size={20} />
            Itens do Pedido
          </h3>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex gap-3">
                <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-400">
                  <span className="material-symbols-outlined text-[20px]">icecream</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-slate-900 dark:text-white text-sm font-medium leading-tight">{item.name}</p>
                    <p className="text-slate-900 dark:text-white text-sm font-bold">R$ {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">{item.quantity}x R$ {item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="my-4 h-px bg-slate-200 dark:bg-slate-800 border-dashed"></div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
              <span className="text-slate-900 dark:text-white font-medium">R$ {order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Taxa de Entrega</span>
              <span className="text-slate-900 dark:text-white font-medium">R$ 5,00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Desconto</span>
              <span className="text-green-500 font-medium">- R$ 0,00</span>
            </div>
            <div className="flex justify-between text-base pt-2 border-t border-slate-200 dark:border-slate-800 mt-2">
              <span className="font-bold text-slate-900 dark:text-white">Total</span>
              <span className="font-bold text-primary text-lg">R$ {(order.total + 5).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="rounded-2xl bg-white dark:bg-surface-dark p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-slate-900 dark:text-white text-base font-bold mb-4 flex items-center gap-2">
            <CreditCard className="text-slate-500 dark:text-slate-400" size={20} />
            Pagamento
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">photos</span>
              </div>
              <div>
                <p className="text-slate-900 dark:text-white text-sm font-bold">Pix</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">Pago no app</p>
              </div>
            </div>
            <span className="rounded-md bg-green-500/10 px-2 py-1 text-xs font-bold uppercase tracking-wide text-green-600">Pago</span>
          </div>
        </div>

        {/* Order History */}
        <div className="rounded-2xl bg-white dark:bg-surface-dark p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-slate-900 dark:text-white text-base font-bold mb-4 flex items-center gap-2">
            <History className="text-slate-500 dark:text-slate-400" size={20} />
            Histórico
          </h3>
          <div className="relative pl-4 border-l-2 border-slate-200 dark:border-slate-800 space-y-6">
            <div className="relative">
              <div className="absolute -left-[21px] top-1 size-3 rounded-full bg-primary ring-4 ring-white dark:ring-surface-dark"></div>
              <p className="text-slate-900 dark:text-white text-sm font-bold">Novo Pedido</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs">14:32 • Cliente realizou o pedido</p>
            </div>
            {order.status !== "Novo" && (
              <div className="relative">
                <div className="absolute -left-[21px] top-1 size-3 rounded-full bg-primary ring-4 ring-white dark:ring-surface-dark"></div>
                <p className="text-slate-900 dark:text-white text-sm font-bold">
                  {order.status === "Preparo" ? "Em Preparo" :
                   order.status === "Rota" ? "Saiu para Entrega" :
                   order.status === "Entregue" ? "Entregue" :
                   "Cancelado"}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  {order.status === "Preparo" ? "Iniciado há 10 min" :
                   order.status === "Rota" ? "Saiu para entrega" :
                   order.status === "Entregue" ? `Entregue às ${order.time}` :
                   "Cancelado pelo cliente"}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 w-full bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20">
        <div className="w-full max-w-4xl mx-auto">
          <button className="w-full flex items-center justify-center gap-2 h-14 rounded-2xl bg-primary text-white font-bold text-lg shadow-xl shadow-primary/25 hover:bg-primary/90 transition-all active:scale-[0.98]">
            <span className="material-symbols-outlined">edit</span>
            Atualizar Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalhesPedido;