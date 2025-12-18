import { ArrowLeft, User, Bell, Shield, CreditCard, MapPin, HelpCircle, LogOut, Home, Search, Heart, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const Perfil = () => {
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
            Meu Perfil
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto lg:max-w-7xl flex flex-col gap-6 p-4">
        {/* Profile Header */}
        <div className="flex flex-col items-center gap-4 pt-4">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
            <User className="text-white" size={32} />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-900 dark:text-text-primary">João Silva</h2>
            <p className="text-sm text-slate-500 dark:text-text-secondary">joao.silva@email.com</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-2">
          {/* Item: Conta */}
          <Link
            to="/conta"
            className="flex items-center gap-4 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-surface-highlight p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors group"
          >
            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:scale-110 transition-transform">
              <User size={20} />
            </div>
            <div className="flex flex-col items-start flex-1">
              <p className="text-base font-semibold leading-normal">Conta</p>
              <p className="text-xs text-gray-400 dark:text-text-secondary">Gerenciar dados pessoais</p>
            </div>
            <div className="text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Item: Endereços */}
          <Link
            to="/enderecos"
            className="flex items-center gap-4 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-surface-highlight p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors group"
          >
            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:scale-110 transition-transform">
              <MapPin size={20} />
            </div>
            <div className="flex flex-col items-start flex-1">
              <p className="text-base font-semibold leading-normal">Endereços</p>
              <p className="text-xs text-gray-400 dark:text-text-secondary">Gerenciar locais de entrega</p>
            </div>
            <div className="text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Item: Pagamentos */}
          <Link
            to="/pagamentos"
            className="flex items-center gap-4 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-surface-highlight p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors group"
          >
            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:scale-110 transition-transform">
              <CreditCard size={20} />
            </div>
            <div className="flex flex-col items-start flex-1">
              <p className="text-base font-semibold leading-normal">Pagamentos</p>
              <p className="text-xs text-gray-400 dark:text-text-secondary">Cartões e formas de pagamento</p>
            </div>
            <div className="text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Item: Notificações */}
          <Link
            to="/notificacoes"
            className="flex items-center gap-4 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-surface-highlight p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors group"
          >
            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:scale-110 transition-transform">
              <Bell size={20} />
            </div>
            <div className="flex flex-col items-start flex-1">
              <p className="text-base font-semibold leading-normal">Notificações</p>
              <p className="text-xs text-gray-400 dark:text-text-secondary">Configurar alertas</p>
            </div>
            <div className="text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Item: Privacidade */}
          <Link
            to="/privacidade"
            className="flex items-center gap-4 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-surface-highlight p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors group"
          >
            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:scale-110 transition-transform">
              <Shield size={20} />
            </div>
            <div className="flex flex-col items-start flex-1">
              <p className="text-base font-semibold leading-normal">Privacidade</p>
              <p className="text-xs text-gray-400 dark:text-text-secondary">Controle de dados e segurança</p>
            </div>
            <div className="text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Item: Ajuda */}
          <Link
            to="/ajuda"
            className="flex items-center gap-4 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-surface-highlight p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors group"
          >
            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:scale-110 transition-transform">
              <HelpCircle size={20} />
            </div>
            <div className="flex flex-col items-start flex-1">
              <p className="text-base font-semibold leading-normal">Ajuda</p>
              <p className="text-xs text-gray-400 dark:text-text-secondary">Suporte e FAQ</p>
            </div>
            <div className="text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Logout Button */}
        <div className="pt-4">
          <button className="flex items-center gap-4 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 p-4 rounded-xl border border-red-200 dark:border-red-800 transition-colors group w-full">
            <div className="flex items-center justify-center rounded-lg bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-400 shrink-0 size-10 group-hover:scale-110 transition-transform">
              <LogOut size={20} />
            </div>
            <div className="flex flex-col items-start flex-1">
              <p className="text-base font-semibold leading-normal text-red-700 dark:text-red-300">Sair da conta</p>
              <p className="text-xs text-red-500 dark:text-red-400">Encerrar sessão</p>
            </div>
          </button>
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
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <DollarSign size={24} />
            <span className="text-[10px] font-medium">Cashback</span>
          </button>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <Heart size={24} />
            <span className="text-[10px] font-medium">Favoritos</span>
          </button>
          <button className="flex flex-col items-center justify-center w-full h-full text-primary space-y-1">
            <User size={24} />
            <span className="text-[10px] font-medium">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Perfil;