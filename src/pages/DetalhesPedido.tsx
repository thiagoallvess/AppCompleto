import { ArrowLeft, Print, MoreVertical, Check, X, Phone, MessageCircle, MapPin, ShoppingBag, Person, Payments, History } from "lucide-react";
import { Link } from "react-router-dom";

const DetalhesPedido = () => {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto overflow-x-hidden bg-background-light dark:bg-background-dark shadow-2xl">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 justify-between border-b border-border-light dark:border-border-dark">
        <div className="flex items-center gap-3">
          <Link
            to="/gestao-pedidos"
            className="text-slate-900 dark:text-white flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Pedido #1024</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-white transition-colors">
            <Print size={24} />
          </button>
          <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-white transition-colors">
            <MoreVertical size={24} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 space-y-6 pb-32">
        {/* Order Status */}
        <div className="rounded-2xl bg-surface-light dark:bg-surface-dark p-5 border border-border-light dark:border-border-dark shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-bold uppercase tracking-wider">Status do Pedido</span>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary border border-primary/20">Novo</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center rounded-full bg-primary/10 shrink-0 size-14 text-primary">
              <span className="material-symbols-outlined text-[28px]">inventory_2</span>
            </div>
            <div>
              <p className="text-slate-900 dark:text-white text-xl font-bold">Aguardando Ação</p>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mt-1">Criado há 15 min</p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <X size={18} />
              Rejeitar
            </button>
            <button className="flex items-center justify-center gap-2 h-10 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
              <Check size={18} />
              Aceitar
            </button>
          </div>
        </div>

        {/* Customer Info */}
        <div className="rounded-2xl bg-surface-light dark:bg-surface-dark p-5 border border-border-light dark:border-border-dark shadow-sm">
          <h3 className="text-slate-900 dark:text-white text-base font-bold mb-4 flex items-center gap-2">
            <Person className="text-text-secondary-light dark:text-text-secondary-dark" size={20} />
            Cliente
          </h3>
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
              <div className="flex items-center justify-center size-full text-slate-500 dark:text-slate-400 font-bold text-lg">MS</div>
            </div>
            <div className="flex-1">
              <p className="text-slate-900 dark:text-white font-bold text-base">Maria Silva</p>
              <div className="flex items-center gap-1 mt-1 text-text-secondary-light dark:text-text-secondary-dark text-sm">
                <span className="material-symbols-outlined text-[16px] text-yellow-500">star</span>
                <span>4.9 (12 pedidos)</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <button className="flex items-center justify-center gap-2 h-10 rounded-xl border border-border-light dark:border-border-dark text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
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
        <div className="rounded-2xl bg-surface-light dark:bg-surface-dark p-5 border border-border-light dark:border-border-dark shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-900 dark:text-white text-base font-bold flex items-center gap-2">
              <MapPin className="text-text-secondary-light dark:text-text-secondary-dark" size={20} />
              Entrega
            </h3>
            <button className="text-primary text-xs font-bold uppercase tracking-wider hover:underline">Ver no Mapa</button>
          </div>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex flex-col items-center gap-1 pt-1">
                <div className="size-2 rounded-full bg-text-secondary-light dark:text-text-secondary-dark"></div>
                <div className="w-0.5 h-12 bg-border-light dark:bg-border-dark"></div>
                <div className="size-2 rounded-full bg-primary"></div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs uppercase font-bold tracking-wider mb-0.5">Origem</p>
                  <p className="text-slate-900 dark:text-white text-sm font-medium">Loja Gourmet Ice - Centro</p>
                </div>
                <div>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs uppercase font-bold tracking-wider mb-0.5">Destino</p>
                  <p className="text-slate-900 dark:text-white text-sm font-medium leading-relaxed">Rua das Acácias, 450, Apto 32<br/>Jardim das Flores, São Paulo - SP</p>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs mt-1">Distância: 3.2 km • Est. 15-20 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="rounded-2xl bg-surface-light dark:bg-surface-dark p-5 border border-border-light dark:border-border-dark shadow-sm">
          <h3 className="text-slate-900 dark:text-white text-base font-bold mb-4 flex items-center gap-2">
            <ShoppingBag className="text-text-secondary-light dark:text-text-secondary-dark" size={20} />
            Itens do Pedido
          </h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-400">
                <span className="material-symbols-outlined text-[20px]">icecream</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-slate-900 dark:text-white text-sm font-medium leading-tight">Ninho com Nutella</p>
                  <p className="text-slate-900 dark:text-white text-sm font-bold">R$ 24,00</p>
                </div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs mt-1">3x R$ 8,00</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-400">
                <span className="material-symbols-outlined text-[20px]">icecream</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-slate-900 dark:text-white text-sm font-medium leading-tight">Morango Premium</p>
                  <p className="text-slate-900 dark:text-white text-sm font-bold">R$ 16,00</p>
                </div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs mt-1">2x R$ 8,00</p>
              </div>
            </div>
          </div>
          <div className="my-4 h-px bg-border-light dark:bg-border-dark border-dashed"></div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary-light dark:text-text-secondary-dark">Subtotal</span>
              <span className="text-slate-900 dark:text-white font-medium">R$ 40,00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary-light dark:text-text-secondary-dark">Taxa de Entrega</span>
              <span className="text-slate-900 dark:text-white font-medium">R$ 5,00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary-light dark:text-text-secondary-dark">Desconto</span>
              <span className="text-green-500 font-medium">- R$ 0,00</span>
            </div>
            <div className="flex justify-between text-base pt-2 border-t border-border-light dark:border-border-dark mt-2">
              <span className="font-bold text-slate-900 dark:text-white">Total</span>
              <span className="font-bold text-primary text-lg">R$ 45,00</span>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="rounded-2xl bg-surface-light dark:bg-surface-dark p-5 border border-border-light dark:border-border-dark shadow-sm">
          <h3 className="text-slate-900 dark:text-white text-base font-bold mb-4 flex items-center gap-2">
            <Payments className="text-text-secondary-light dark:text-text-secondary-dark" size={20} />
            Pagamento
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">photos</span>
              </div>
              <div>
                <p className="text-slate-900 dark:text-white text-sm font-bold">Pix</p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">Pago no app</p>
              </div>
            </div>
            <span className="rounded-md bg-green-500/10 px-2 py-1 text-xs font-bold uppercase tracking-wide text-green-600">Pago</span>
          </div>
        </div>

        {/* Order History */}
        <div className="rounded-2xl bg-surface-light dark:bg-surface-dark p-5 border border-border-light dark:border-border-dark shadow-sm">
          <h3 className="text-slate-900 dark:text-white text-base font-bold mb-4 flex items-center gap-2">
            <History className="text-text-secondary-light dark:text-text-secondary-dark" size={20} />
            Histórico
          </h3>
          <div className="relative pl-4 border-l-2 border-border-light dark:border-border-dark space-y-6">
            <div className="relative">
              <div className="absolute -left-[21px] top-1 size-3 rounded-full bg-primary ring-4 ring-surface-light dark:ring-surface-dark"></div>
              <p className="text-slate-900 dark:text-white text-sm font-bold">Novo Pedido</p>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">14:32 • Cliente realizou o pedido</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[21px] top-1 size-3 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-surface-light dark:ring-surface-dark"></div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">Em Preparo</p>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">Aguardando...</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[21px] top-1 size-3 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-surface-light dark:ring-surface-dark"></div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">Saiu para Entrega</p>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">Aguardando...</p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Action */}
      <div className="fixed bottom-0 z-30 w-full max-w-md border-t border-border-light dark:border-border-dark bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md p-4 pb-safe">
        <button className="w-full flex items-center justify-center gap-2 h-14 rounded-2xl bg-primary text-white font-bold text-lg shadow-xl shadow-primary/25 hover:bg-primary-dark transition-all active:scale-[0.98]">
          <span className="material-symbols-outlined">edit</span>
          Atualizar Status
        </button>
      </div>
    </div>
  );
};

export default DetalhesPedido;