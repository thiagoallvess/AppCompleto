import { ArrowLeft, Minus, Plus, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const Cart = () => {
  const { items, updateQuantity, clearCart } = useCart();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 5.00;
  const total = subtotal + delivery;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-text-primary min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto lg:max-w-7xl lg:px-6 w-full">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-1 -ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-surface-dark transition-colors"
            >
              <ArrowLeft className="text-gray-500 dark:text-gray-400" size={24} />
            </Link>
            <h2 className="text-xl font-bold leading-tight tracking-tight">Meu Carrinho</h2>
          </div>
          <button onClick={clearCart} className="text-primary text-sm font-bold leading-normal hover:opacity-80 transition-opacity">
            Limpar
          </button>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 w-full max-w-md mx-auto lg:max-w-7xl p-4 lg:px-6 pb-32 space-y-4">
        {/* Cart Items List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white dark:bg-surface-dark rounded-xl p-3 shadow-sm flex items-center gap-4 transition-transform active:scale-[0.99]">
              <div className="shrink-0 relative">
                <div
                  className="bg-center bg-no-repeat bg-cover rounded-lg size-[70px] shadow-inner"
                  style={{
                    backgroundImage: `url("${item.image}")`,
                  }}
                ></div>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-1">
                <h3 className="text-base font-bold leading-tight line-clamp-1">{item.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">R$ {item.price.toFixed(2)}</p>
              </div>
              <div className="shrink-0 flex items-center bg-gray-100 dark:bg-background-dark rounded-lg p-1">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-surface-dark hover:shadow-sm transition-all"
                >
                  <Minus size={18} />
                </button>
                <input
                  className="w-8 p-0 text-center bg-transparent border-none text-sm font-bold focus:ring-0"
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                  readOnly
                />
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-md bg-white dark:bg-surface-dark text-primary shadow-sm hover:shadow transition-all"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {items.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">Seu carrinho está vazio.</p>
          </div>
        )}
        {/* Order Note / Add-on hint */}
        {items.length > 0 && (
          <div className="mt-6 p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-transparent flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            <FileText className="text-gray-400 text-xl" />
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Adicionar observação ao pedido</p>
          </div>
        )}
      </main>
      {/* Bottom Sheet / Summary */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 w-full bg-white dark:bg-surface-dark rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-40 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-md mx-auto lg:max-w-7xl p-5 pb-8 space-y-4">
            {/* Price Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <p className="text-gray-500 dark:text-gray-400">Subtotal</p>
                <p className="font-medium">R$ {subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center text-sm">
                <p className="text-gray-500 dark:text-gray-400">Entrega</p>
                <p className="font-medium text-green-500">R$ {delivery.toFixed(2)}</p>
              </div>
              <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
              <div className="flex justify-between items-end">
                <p className="text-base font-bold text-gray-900 dark:text-white">Total</p>
                <div className="text-right">
                  <p className="text-2xl font-extrabold text-primary tracking-tight">R$ {total.toFixed(2)}</p>
                  <p className="text-xs text-gray-400 font-medium">em até 2x s/ juros</p>
                </div>
              </div>
            </div>
            {/* Checkout Button */}
            <Link to="/checkout">
              <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-lg h-14 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-between px-6 transition-all active:scale-[0.98]">
                <span>Ir para Pagamento</span>
                <ArrowRight size={24} />
              </button>
            </Link>
          </div>
          {/* Safe area padding for iOS */}
          <div className="h-4 w-full bg-white dark:bg-surface-dark"></div>
        </div>
      )}
    </div>
  );
};

export default Cart;