import { ArrowLeft, CreditCard, MapPin, Edit, Clock, ChevronRight, Tag, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";

const Checkout = () => {
  const { items, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [scheduleDelivery, setScheduleDelivery] = useState(false);

  // Simulação de cupom vindo da página anterior (em um app real viria via state ou context)
  const appliedCoupon = "VERAO10"; 
  
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 5.00;
  const discount = appliedCoupon ? subtotal * 0.1 : 0.00;
  const total = subtotal + delivery - discount;

  // Cálculo de cashback (5% conforme definido na página de Cashback)
  const cashbackEarned = total * 0.05;

  const handleSubmit = () => {
    alert("Pagamento processado com sucesso!");
    clearCart();
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-32 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center p-4 pb-2 justify-between max-w-md mx-auto lg:max-w-7xl lg:px-6 w-full">
          <Link
            to="/cart"
            className="flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="text-slate-900 dark:text-white" size={24} />
          </Link>
          <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">Finalizar Compra</h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col w-full max-w-md mx-auto lg:max-w-7xl p-4 lg:px-6 pb-32 space-y-4">
        {/* Address Section */}
        <div className="flex flex-col mt-2">
          <h3 className="text-lg font-bold leading-tight tracking-tight px-4 pb-2 pt-4 lg:px-6">Endereço de Entrega</h3>
          <div className="px-4 lg:px-6">
            <div className="flex items-center gap-4 bg-white dark:bg-surface-dark rounded-xl px-4 min-h-[72px] py-3 justify-between shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-lg bg-slate-800 dark:bg-[#243b47] shrink-0 size-10">
                  <MapPin className="text-white" size={20} />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-semibold leading-normal line-clamp-1">Casa</p>
                  <p className="text-slate-500 dark:text-[#93b6c8] text-xs font-normal leading-normal line-clamp-2">
                    Rua das Flores, 123 - Apt 40<br/>Centro, São Paulo - SP
                  </p>
                </div>
              </div>
              <button className="shrink-0 text-primary hover:text-primary/80 transition-colors">
                <Edit size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Schedule Delivery */}
        <div className="px-4 mt-4 lg:px-6">
          <div className="flex flex-row items-center justify-between gap-4 rounded-xl border border-gray-200 dark:border-[#345565] bg-white dark:bg-surface-dark p-4 shadow-sm">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Clock className="text-primary" size={20} />
                <p className="text-sm font-bold leading-tight">Agendar Entrega</p>
              </div>
              <p className="text-slate-500 dark:text-[#93b6c8] text-xs font-normal leading-normal pl-7">
                Receber agora (30-45 min)
              </p>
            </div>
            <label className="relative flex h-[24px] w-[44px] cursor-pointer items-center rounded-full border-none bg-slate-300 dark:bg-[#243b47] p-0.5 transition-all duration-300">
              <input
                type="checkbox"
                className="sr-only"
                checked={scheduleDelivery}
                onChange={(e) => setScheduleDelivery(e.target.checked)}
              />
              <div className={`h-[20px] w-[20px] rounded-full bg-white shadow-sm transform transition-transform ${scheduleDelivery ? 'translate-x-5' : ''}`}></div>
            </label>
          </div>
        </div>

        {/* Order Summary */}
        <div className="flex flex-col mt-4">
          <h3 className="text-lg font-bold leading-tight tracking-tight px-4 pb-2 pt-2 lg:px-6">Resumo do Pedido</h3>
          <div className="px-4 flex flex-col gap-3 lg:px-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 bg-white dark:bg-surface-dark p-3 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700 relative">
                  <img
                    alt={item.name}
                    className="h-full w-full object-cover"
                    src={item.image}
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-sm font-bold line-clamp-1">{item.name}</p>
                  <p className="text-slate-500 dark:text-gray-400 text-xs">Gourmet • Cremoso</p>
                </div>
                <div className="flex flex-col items-end justify-center gap-1">
                  <span className="text-sm font-bold">R$ {(item.price * item.quantity).toFixed(2)}</span>
                  <span className="text-slate-500 dark:text-gray-400 text-xs">{item.quantity}x R$ {item.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex flex-col mt-6">
          <h3 className="text-lg font-bold leading-tight tracking-tight px-4 pb-2 lg:px-6">Forma de Pagamento</h3>
          <div className="px-4 lg:px-6">
            <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
              {/* Card Option */}
              <label className={`cursor-pointer group relative flex flex-col items-start gap-3 rounded-xl p-4 min-w-[140px] ${
                paymentMethod === 'card' 
                  ? 'border-2 border-primary bg-primary/10' 
                  : 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark hover:border-gray-400 dark:hover:border-gray-500'
              }`}>
                <input
                  className="sr-only"
                  name="payment"
                  type="radio"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                <div className={`rounded-full p-2 ${paymentMethod === 'card' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-slate-900 dark:text-white'}`}>
                  <CreditCard size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">Cartão</p>
                  <p className="text-slate-500 dark:text-gray-400 text-xs">Crédito/Débito</p>
                </div>
                {paymentMethod === 'card' && (
                  <div className="absolute top-3 right-3 text-primary">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                )}
              </label>

              {/* Pix Option */}
              <label className={`cursor-pointer group relative flex flex-col items-start gap-3 rounded-xl p-4 min-w-[140px] ${
                paymentMethod === 'pix' 
                  ? 'border-2 border-primary bg-primary/10' 
                  : 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark hover:border-gray-400 dark:hover:border-gray-500'
              }`}>
                <input
                  className="sr-only"
                  name="payment"
                  type="radio"
                  checked={paymentMethod === 'pix'}
                  onChange={() => setPaymentMethod('pix')}
                />
                <div className={`rounded-full p-2 ${paymentMethod === 'pix' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-slate-900 dark:text-white'}`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.5 4.5h15v15h-15z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-sm">Pix</p>
                  <p className="text-slate-500 dark:text-gray-400 text-xs">Aprovação imediata</p>
                </div>
              </label>

              {/* Cash Option */}
              <label className={`cursor-pointer group relative flex flex-col items-start gap-3 rounded-xl p-4 min-w-[140px] ${
                paymentMethod === 'cash' 
                  ? 'border-2 border-primary bg-primary/10' 
                  : 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark hover:border-gray-400 dark:hover:border-gray-500'
              }`}>
                <input
                  className="sr-only"
                  name="payment"
                  type="radio"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                />
                <div className={`rounded-full p-2 ${paymentMethod === 'cash' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-slate-900 dark:text-white'}`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-sm">Dinheiro</p>
                  <p className="text-slate-500 dark:text-gray-400 text-xs">Pagar na entrega</p>
                </div>
              </label>
            </div>
          </div>

          {/* Card Details Form */}
          {paymentMethod === 'card' && (
            <div className="px-4 mt-2 lg:px-6">
              <div className="rounded-xl bg-white dark:bg-surface-dark p-4 border border-gray-200 dark:border-gray-800 space-y-3">
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                  <input
                    className="w-full rounded-lg bg-gray-50 dark:bg-[#111c21] border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-white pl-10 pr-3 placeholder-gray-400 dark:placeholder-gray-600 focus:border-primary focus:ring-1 focus:ring-primary text-sm h-11"
                    placeholder="Número do cartão"
                    type="text"
                  />
                </div>
                <div className="flex gap-3">
                  <input
                    className="flex-1 rounded-lg bg-gray-50 dark:bg-[#111c21] border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-white px-3 placeholder-gray-400 dark:placeholder-gray-600 focus:border-primary focus:ring-1 focus:ring-primary text-sm h-11 text-center"
                    placeholder="MM/AA"
                    type="text"
                  />
                  <div className="relative flex-1">
                    <input
                      className="w-full rounded-lg bg-gray-50 dark:bg-[#111c21] border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-white px-3 placeholder-gray-400 dark:placeholder-gray-600 focus:border-primary focus:ring-1 focus:ring-primary text-sm h-11 text-center"
                      placeholder="CVV"
                      type="text"
                    />
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                  </svg>
                  <input
                    className="w-full rounded-lg bg-gray-50 dark:bg-[#111c21] border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-white pl-10 pr-3 placeholder-gray-400 dark:placeholder-gray-600 focus:border-primary focus:ring-1 focus:ring-primary text-sm h-11"
                    placeholder="Nome no cartão"
                    type="text"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Price Breakdown */}
        <div className="px-4 mt-6 mb-4 lg:px-6">
          <div className="flex flex-col gap-2 border-t border-gray-200 dark:border-gray-800 pt-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 dark:text-gray-400">Subtotal</span>
              <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 dark:text-gray-400">Taxa de entrega</span>
              <span className="font-medium">R$ {delivery.toFixed(2)}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-1 text-primary">
                  <Tag size={14} />
                  <span>Desconto ({appliedCoupon})</span>
                </div>
                <span className="text-primary font-medium">- R$ {discount.toFixed(2)}</span>
              </div>
            )}
            
            {/* Cashback Info */}
            <div className="mt-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <Sparkles size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Você vai ganhar</span>
              </div>
              <span className="text-sm font-bold text-green-600 dark:text-green-400">
                + R$ {cashbackEarned.toFixed(2)} de volta
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
        <div className="max-w-md mx-auto lg:max-w-7xl flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <p className="text-slate-500 dark:text-gray-400 text-xs font-medium">Total a pagar</p>
            <p className="text-xl font-extrabold">R$ {total.toFixed(2)}</p>
          </div>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-primary hover:bg-sky-500 text-white font-bold h-12 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            <span>Confirmar Pedido</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;