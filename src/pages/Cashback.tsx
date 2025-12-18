import { Home, Search, Heart, User, DollarSign, Gift, TrendingUp, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Cashback = () => {
  const cashbackBalance = 12.50;
  const cashbackHistory = [
    {
      id: 1,
      description: "Compra de Morango do Nordeste",
      amount: 0.50,
      date: "Hoje",
      type: "earned"
    },
    {
      id: 2,
      description: "Compra de Trufa Belga",
      amount: 0.75,
      date: "Ontem",
      type: "earned"
    },
    {
      id: 3,
      description: "Resgate de desconto",
      amount: -5.00,
      date: "3 dias atrás",
      type: "spent"
    },
    {
      id: 4,
      description: "Compra de Coco Puro",
      amount: 0.60,
      date: "1 semana atrás",
      type: "earned"
    }
  ];

  const rewards = [
    {
      id: 1,
      title: "Geladinho Grátis",
      description: "Resgate um geladinho de qualquer sabor",
      cost: 15.00,
      available: false
    },
    {
      id: 2,
      title: "Desconto 20%",
      description: "Aplique 20% de desconto na próxima compra",
      cost: 10.00,
      available: true
    },
    {
      id: 3,
      title: "Entrega Grátis",
      description: "Frete grátis na próxima entrega",
      cost: 8.00,
      available: true
    }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-text-primary pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md transition-colors duration-300">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto lg:max-w-none lg:px-6">
          <Link
            to="/"
            className="flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="text-slate-900 dark:text-text-primary" size={24} />
          </Link>
          <h1 className="text-slate-900 dark:text-text-primary text-lg font-bold leading-tight tracking-tight flex-1 text-center">
            Meu Cashback
          </h1>
          <div className="w-12"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto lg:max-w-7xl flex flex-col gap-6 p-4">
        {/* Cashback Balance Card */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl p-6 border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">Saldo Atual</p>
              <p className="text-3xl font-bold">R$ {cashbackBalance.toFixed(2)}</p>
            </div>
            <div className="bg-white/20 rounded-full p-3">
              <DollarSign size={32} className="text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-white/80" />
            <p className="text-white/80 text-sm">Ganhe 5% de cashback em cada compra</p>
          </div>
        </div>

        {/* Redemption Progress */}
        <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Meta de Resgate</h3>
              <p className="text-sm text-slate-500 dark:text-text-secondary mt-1">
                Faltam <span className="text-primary font-bold">R$ 4,50</span> para liberar o resgate
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block mb-1">Mínimo</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">R$ 20,00</span>
            </div>
          </div>
          <div className="relative h-3 w-full rounded-full bg-gray-100 dark:bg-black/40 overflow-hidden mt-2">
            <div className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all duration-500 ease-out" style={{ width: '77.5%' }}></div>
          </div>
          {/* Redeem Button (Disabled State Logic Applied Visually) */}
          <button className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 font-bold py-3 px-4 cursor-not-allowed transition-colors hover:bg-gray-300 dark:hover:bg-gray-600 opacity-80" disabled>
            <span className="text-[20px]">🔒</span>
            <span>Solicitar Resgate</span>
          </button>
          <p className="text-xs text-center text-slate-400 mt-1">O botão será ativado ao atingir R$ 20,00</p>
        </div>

        {/* How to Earn More */}
        <div className="bg-surface-dark rounded-xl p-6">
          <h3 className="flex items-center gap-2 text-white text-lg font-bold mb-4">
            <Gift size={20} />
            Como Ganhar Cashback
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
              <div className="bg-primary/20 rounded-full p-2">
                <DollarSign size={16} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-white">Compras</p>
                <p className="text-sm text-text-secondary">Ganhe 5% em cada pedido</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
              <div className="bg-primary/20 rounded-full p-2">
                <Heart size={16} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-white">Indicações</p>
                <p className="text-sm text-text-secondary">Ganhe R$ 2 por amigo indicado</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
              <div className="bg-primary/20 rounded-full p-2">
                <TrendingUp size={16} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-white">Avaliações</p>
                <p className="text-sm text-text-secondary">Ganhe R$ 0,50 por avaliação</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cashback History */}
        <div className="bg-surface-dark rounded-xl p-6">
          <h3 className="flex items-center gap-2 text-white text-lg font-bold mb-4">
            <Clock size={20} />
            Histórico de Cashback
          </h3>
          <div className="space-y-3">
            {cashbackHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2">
                <div className="flex-1">
                  <p className="font-medium text-sm text-white">{item.description}</p>
                  <p className="text-xs text-text-secondary">{item.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    item.type === 'earned'
                      ? 'bg-green-600/20 text-green-400'
                      : 'bg-red-600/20 text-red-400'
                  }`}>
                    {item.type === 'earned' ? '+' : ''}R$ {item.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
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
            <DollarSign size={24} />
            <span className="text-[10px] font-medium">Cashback</span>
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

export default Cashback;