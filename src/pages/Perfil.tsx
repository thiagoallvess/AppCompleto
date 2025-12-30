import { ArrowLeft, User, Bell, Shield, CreditCard, MapPin, HelpCircle, LogOut, Home, Search, Heart, DollarSign } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { showSuccess } from "@/utils/toast";

const Perfil = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    showSuccess("Sessão encerrada com sucesso.");
    navigate("/login");
  };

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
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="text-white" size={32} />
            )}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-900 dark:text-text-primary">
              {profile ? `${profile.first_name} ${profile.last_name}` : "Carregando..."}
            </h2>
            <p className="text-sm text-slate-500 dark:text-text-secondary capitalize">
              Membro {profile?.role || "Cliente"}
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-2">
          <Link
            to="/conta"
            className="flex items-center gap-4 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors group"
          >
            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:scale-110 transition-transform">
              <User size={20} />
            </div>
            <div className="flex flex-col items-start flex-1">
              <p className="text-base font-semibold leading-normal">Conta</p>
              <p className="text-xs text-gray-400 dark:text-text-secondary">Gerenciar dados pessoais</p>
            </div>
            <ChevronRightIcon />
          </Link>

          <Link
            to="/enderecos"
            className="flex items-center gap-4 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors group"
          >
            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:scale-110 transition-transform">
              <MapPin size={20} />
            </div>
            <div className="flex flex-col items-start flex-1">
              <p className="text-base font-semibold leading-normal">Endereços</p>
              <p className="text-xs text-gray-400 dark:text-text-secondary">Gerenciar locais de entrega</p>
            </div>
            <ChevronRightIcon />
          </Link>

          <Link
            to="/pagamentos"
            className="flex items-center gap-4 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors group"
          >
            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:scale-110 transition-transform">
              <CreditCard size={20} />
            </div>
            <div className="flex flex-col items-start flex-1">
              <p className="text-base font-semibold leading-normal">Pagamentos</p>
              <p className="text-xs text-gray-400 dark:text-text-secondary">Cartões e formas de pagamento</p>
            </div>
            <ChevronRightIcon />
          </Link>

          <Link
            to="/privacidade"
            className="flex items-center gap-4 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors group"
          >
            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:scale-110 transition-transform">
              <Shield size={20} />
            </div>
            <div className="flex flex-col items-start flex-1">
              <p className="text-base font-semibold leading-normal">Privacidade</p>
              <p className="text-xs text-gray-400 dark:text-text-secondary">Segurança da conta</p>
            </div>
            <ChevronRightIcon />
          </Link>

          <Link
            to="/ajuda"
            className="flex items-center gap-4 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors group"
          >
            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:scale-110 transition-transform">
              <HelpCircle size={20} />
            </div>
            <div className="flex flex-col items-start flex-1">
              <p className="text-base font-semibold leading-normal">Ajuda</p>
              <p className="text-xs text-gray-400 dark:text-text-secondary">Suporte e FAQ</p>
            </div>
            <ChevronRightIcon />
          </Link>
        </div>

        {/* Logout Button */}
        <div className="pt-4">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-900/30 transition-colors group w-full"
          >
            <div className="flex items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 shrink-0 size-10 group-hover:scale-110 transition-transform">
              <LogOut size={20} />
            </div>
            <div className="flex flex-col items-start flex-1">
              <p className="text-base font-semibold leading-normal text-red-700 dark:text-red-400">Sair da conta</p>
              <p className="text-xs text-red-500 dark:text-red-500/70">Encerrar sessão atual</p>
            </div>
          </button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg pb-safe border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto lg:max-w-none lg:px-6">
          <Link to="/" className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-primary transition-colors space-y-1">
            <Home size={24} />
            <span className="text-[10px] font-medium">Início</span>
          </Link>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-primary transition-colors space-y-1">
            <Search size={24} />
            <span className="text-[10px] font-medium">Buscar</span>
          </button>
          <Link to="/cashback" className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-primary transition-colors space-y-1">
            <DollarSign size={24} />
            <span className="text-[10px] font-medium">Cashback</span>
          </Link>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-primary transition-colors space-y-1">
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

const ChevronRightIcon = () => (
  <div className="text-gray-400">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </div>
);

export default Perfil;