import { ArrowLeft, Package, MapPin, Users, User, LogOut, Store, Search, ShoppingCart, Heart, PersonStanding } from "lucide-react";
import { Link } from "react-router-dom";

const Perfil = () => {
  const user = {
    name: "Mariana Silva",
    email: "mariana.silva@email.com",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPCT_McniiFVsEA80uCiKz7Hg2kmaHoLdRCfAuh8RSgyQPeIc7nFovVlyGUoHPfXhdh6bwvIJLHjyYABm3uZ4FuL1F48Ah7VWxVHiZT0xlFxoyOEzXxrH2HUtzSSUkDPRt2dtYeXDjjqvGPh70ugHpSM__3yY-YS4Dd8ME-dmEeK6K37J8rADo_WejG5_tf96wMZXDPPmgjtf5rt5JNIouz9To8IR5k4NhN6iCIukY2pfXXspdy0P-REf3Vr3ZuUzllcDUX5sgfg"
  };

  const stats = {
    cashback: 15.50,
    cashbackIncrease: 2.50,
    rewards: 32.00
  };

  const handleLogout = () => {
    // Implement logout logic here
    alert("Logout functionality would be implemented here");
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-text-primary pb-24 min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between bg-background-light dark:bg-background-dark p-4 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800/50">
        <Link
          to="/"
          className="flex size-10 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-surface-highlight transition-colors text-slate-900 dark:text-text-primary"
        >
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Meu Perfil</h1>
      </header>

      {/* Profile Header */}
      <section className="flex flex-col items-center gap-6 pt-8 pb-6 px-4">
        <div className="relative group">
          <div
            className="bg-center bg-no-repeat bg-cover rounded-full h-28 w-28 ring-4 ring-primary/20 shadow-xl"
            style={{ backgroundImage: `url("${user.avatar}")` }}
          ></div>
          <button className="absolute bottom-0 right-0 bg-primary hover:bg-blue-700 text-white p-1.5 rounded-full border-4 border-background-light dark:border-background-dark transition-colors shadow-sm">
            <User size={18} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-2xl font-bold leading-tight tracking-tight">{user.name}</p>
          <p className="text-gray-500 dark:text-text-secondary text-sm font-medium">{user.email}</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-2">
        <div className="grid grid-cols-2 gap-4">
          {/* Cashback Card */}
          <div className="flex flex-col gap-3 rounded-2xl p-5 bg-white dark:bg-surface-dark shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="text-primary">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 7.28V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2v2.28c.59-.35 1.27-.56 2-.56h14c.73 0 1.41.21 2 .56zM20 9c-1.11 0-2 .9-2 2 0 .74.4 1.38 1 1.72V20c0 .55-.45 1-1 1s-1-.45-1-1v-5H7v5c0 .55-.45 1-1 1s-1-.45-1-1v-5.28c.6-.34 1-1 1-1.72 0-1.1-.89-2-2-2H4v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9h-2z"/>
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-500 dark:text-text-secondary">Saldo Cashback</p>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-text-primary">R$ {stats.cashback.toFixed(2)}</p>
              <p className="text-xs text-green-500 mt-1 font-medium">+ R$ {stats.cashbackIncrease.toFixed(2)} esta semana</p>
            </div>
          </div>
          {/* Rewards Card */}
          <div className="flex flex-col gap-3 rounded-2xl p-5 bg-white dark:bg-surface-dark shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="text-primary">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-500 dark:text-text-secondary">Recompensas</p>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-text-primary">R$ {stats.rewards.toFixed(2)}</p>
              <p className="text-xs text-gray-400 mt-1 font-medium">Por indicações</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu List */}
      <section className="flex flex-col gap-2 p-4 mt-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-text-secondary mb-2 pl-2">Minha Conta</h3>

        {/* Item: Pedidos */}
        <Link
          to="/meus-pedidos"
          className="flex items-center gap-4 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-surface-highlight p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors group"
        >
          <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:scale-110 transition-transform">
            <Package size={20} />
          </div>
          <div className="flex flex-col items-start flex-1">
            <p className="text-base font-semibold leading-normal">Meus Pedidos</p>
            <p className="text-xs text-gray-400 dark:text-text-secondary">Acompanhe suas entregas</p>
          </div>
          <div className="text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Item: Endereços */}
        <button className="flex items-center gap-4 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-surface-highlight p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors group">
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
        </button>

        {/* Item: Indique e Ganhe */}
        <Link
          to="/indicacao"
          className="flex items-center gap-4 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-surface-highlight p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors group"
        >
          <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:scale-110 transition-transform">
            <Users size={20} />
          </div>
          <div className="flex flex-col items-start flex-1">
            <p className="text-base font-semibold leading-normal">Indique e Ganhe</p>
            <p className="text-xs text-gray-400 dark:text-text-secondary">Convide amigos para ganhar saldo</p>
          </div>
          <div className="text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Item: Editar Perfil */}
        <button className="flex items-center gap-4 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-surface-highlight p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors group">
          <div className="flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-text-secondary shrink-0 size-10 group-hover:scale-110 transition-transform">
            <PersonStanding size={20} />
          </div>
          <div className="flex flex-col items-start flex-1">
            <p className="text-base font-semibold leading-normal">Editar Dados</p>
          </div>
          <div className="text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        {/* Item: Sair */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 bg-transparent hover:bg-red-50 dark:hover:bg-red-900/10 p-4 rounded-xl transition-colors mt-2 group"
        >
          <div className="flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 shrink-0 size-10 group-hover:scale-110 transition-transform">
            <LogOut size={20} />
          </div>
          <p className="text-base font-semibold leading-normal text-red-500">Sair da Conta</p>
        </button>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800/50 pb-safe pt-2 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
        <div className="flex justify-between items-end h-14 pb-2">
          <Link to="/" className="flex flex-col items-center gap-1 w-12 text-gray-400 hover:text-primary transition-colors">
            <Store size={20} />
            <span className="text-[10px] font-medium">Loja</span>
          </Link>
          <button className="flex flex-col items-center gap-1 w-12 text-gray-400 hover:text-primary transition-colors">
            <Search size={20} />
            <span className="text-[10px] font-medium">Busca</span>
          </button>
          <Link to="/cart" className="flex flex-col items-center justify-center -mt-8 size-14 rounded-full bg-primary text-white shadow-lg shadow-primary/40 hover:scale-105 transition-transform">
            <ShoppingCart size={24} />
          </Link>
          <button className="flex flex-col items-center gap-1 w-12 text-gray-400 hover:text-primary transition-colors">
            <Heart size={20} />
            <span className="text-[10px] font-medium">Favoritos</span>
          </button>
          <button className="flex flex-col items-center gap-1 w-12 text-primary">
            <PersonStanding size={20} className="fill-current" />
            <span className="text-[10px] font-medium">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Perfil;