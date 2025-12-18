import { ArrowLeft, MapPin, CreditCard, HelpCircle, RotateCcw, Truck, Clock, DollarSign, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const DetalhesPedido = () => {
  const orderItems = [
    {
      quantity: 3,
      name: "Ninho com Nutella",
      description: "Cremoso • Sem adição de água",
      price: 15.00
    },
    {
      quantity: 2,
      name: "Morango Premium",
      description: "Fruta natural • Base leite",
      price: 10.00
    },
    {
      quantity: 1,
      name: "Mousse de Maracujá",
      description: "Edição limitada",
      price: 5.00
    }
  ];

  const subtotal = 30.00;
  const delivery = 5.00;
  const discount = 3.00;
  const total = subtotal + delivery - discount;
  const cashback = 1.25;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-text-primary pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            to="/meus-pedidos"
            className="flex size-10 items-center justify-center rounded-full text-slate-900 dark:text-text-primary hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all"
          >
            <ArrowLeft size={24} />
          </Link>
          <h2 className="flex-1 pr-10 text-center text-lg font-bold leading-tight tracking-tight">
            Detalhes do Pedido
          </h2>
        </div>
      </header>

      {/* Meta Text */}
      <div className="flex flex-col items-center justify-center pt-2 pb-6">
        <p className="text-sm font-medium text-gray-500 dark:text-text-secondary">
          Pedido #4829 • 24 Out, 14:30
        </p>
      </div>

      {/* Status Card */}
      <div className="px-4 mb-6">
        <div className="relative overflow-hidden rounded-xl bg-surface-dark shadow-sm ring-1 ring-white/5">
          <div
            className="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWTK1n7aOhx__vo_cevhPpS9byrZuyR_4sheKDMmf3eOJmSHkRFrvfqfowAA2n5Y8_mIpZqECul70jHAjJFaYcki_tUbFveK6WNS1MHc5x6S02_uq_AOMWlHIB8LY3qir2JsekOLcBLahxBWsq_rAkXep1ybEfvL79oNNwPjz5cgNhbedMtNV_17OkfbVWLt2cEeoVUNa8wv0PQSPcgaJcJdsgtuR2sTj8Msv_T-V0dktLmub8owpOpANGJOCXOu3L0Xb1fM8_BA')`
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark/95 to-background-dark/60"></div>
          <div className="relative flex items-center justify-between p-5">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Status Atual
              </span>
              <h3 className="text-xl font-bold text-white">Saiu para entrega</h3>
              <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
                <Clock size={16} />
                Previsão: 15:00 - 15:20
              </p>
            </div>
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30">
              <Truck size={24} />
            </div>
          </div>
          {/* Progress Line */}
          <div className="relative h-1 w-full bg-gray-700">
            <div className="absolute left-0 top-0 h-full w-3/4 bg-primary shadow-[0_0_10px_rgba(22,67,156,0.5)]"></div>
          </div>
        </div>
      </div>

      {/* Cashback & Referral Section */}
      <div className="px-4 mb-6 space-y-3">
        {/* Cashback */}
        <div className="flex items-center gap-4 rounded-xl bg-surface-dark border border-primary/20 p-4 shadow-[0_0_15px_rgba(22,67,156,0.1)]">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <DollarSign size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-400">Cashback ganho</p>
            <p className="text-lg font-bold text-white">
              R$ {cashback.toFixed(2)} <span className="text-xs font-normal text-gray-500 ml-1">(5% do total)</span>
            </p>
          </div>
        </div>
        {/* Referral */}
        <div className="flex items-center justify-between rounded-xl bg-surface-dark p-3 px-4 border border-white/5">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500">Cupom aplicado</span>
            <span className="text-sm font-bold text-white tracking-wide">VERAO10</span>
          </div>
          <div className="text-green-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Order Items Section */}
      <div className="mb-2">
        <h3 className="px-4 pb-3 pt-2 text-base font-bold text-slate-900 dark:text-white">
          Itens do Pedido
        </h3>
        <div className="flex flex-col divide-y divide-white/5 border-y border-white/5 bg-surface-dark">
          {orderItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 px-4 py-4">
              <div className="flex size-8 shrink-0 items-center justify-center rounded bg-white/10 text-xs font-bold text-white">
                {item.quantity}x
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-white">{item.name}</p>
                <p className="truncate text-xs text-gray-500">{item.description}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-medium text-white">R$ {item.price.toFixed(2)}</p>
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
            <p className="text-sm text-gray-400">Mastercard final 4242</p>
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
            <span>R$ {delivery.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-green-500">
            <span>Desconto (VERAO10)</span>
            <span>- R$ {discount.toFixed(2)}</span>
          </div>
          <div className="my-3 h-px w-full bg-white/10"></div>
          <div className="flex justify-between items-center">
            <span className="text-base font-medium text-white">Total</span>
            <span className="text-2xl font-bold text-white">R$ {total.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex h-12 flex-1 items-center justify-center rounded-xl bg-surface-highlight text-sm font-bold text-white hover:bg-white/10 transition-colors">
            <HelpCircle size={18} className="mr-2" />
            Ajuda
          </button>
          <button className="flex h-12 flex-[2] items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
            <RotateCcw size={18} />
            Repetir Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalhesPedido;