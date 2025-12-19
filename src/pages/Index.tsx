import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, IceCream, Receipt, Settings, Analytics } from "lucide-react";

const Index = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-text-primary min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto lg:max-w-7xl lg:px-6 w-full">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex size-10 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <Menu className="text-slate-900 dark:text-text-primary" size={24} />
          </button>
          <h1 className="text-slate-900 dark:text-text-primary text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">
            Geladinho Gourmet
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto lg:max-w-7xl p-4 lg:px-6">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Bem-vindo ao Geladinho Gourmet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Escolha uma opção no menu para começar
          </p>
        </div>
      </main>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-surface-dark shadow-xl z-50 transform transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Menu</h2>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="flex size-8 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="text-slate-900 dark:text-white" size={20} />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Cliente Section */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                Cliente
              </h3>
              <nav className="space-y-1">
                <Link
                  to="/"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <Home size={20} />
                  <span>Início</span>
                </Link>
                <Link
                  to="/meus-pedidos"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <Receipt size={20} />
                  <span>Meus Pedidos</span>
                </Link>
                <Link
                  to="/perfil"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <div className="material-symbols-outlined">person</div>
                  <span>Perfil</span>
                </Link>
                <Link
                  to="/cashback"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <div className="material-symbols-outlined">savings</div>
                  <span>Cashback</span>
                </Link>
              </nav>
            </div>

            {/* Admin Section */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                Administração
              </h3>
              <nav className="space-y-1">
                <Link
                  to="/gestao-pedidos"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <Receipt size={20} />
                  <span>Pedidos</span>
                </Link>
                <Link
                  to="/gestao-produtos"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <IceCream size={20} />
                  <span>Produtos</span>
                </Link>
                <Link
                  to="/gestao-insumos"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <div className="material-symbols-outlined">inventory</div>
                  <span>Insumos</span>
                </Link>
                <Link
                  to="/relatorios"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <Analytics size={20} />
                  <span>Relatórios</span>
                </Link>
                <Link
                  to="/configuracoes-admin"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <Settings size={20} />
                  <span>Configurações</span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;