{/* Top App Bar */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md transition-colors">
        <div className="flex items-center justify-between px-4 py-3 h-16">
          <Link
            to="/"
            className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-lg font-bold tracking-tight">Meu Cashback</h1>
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <HelpCircle size={24} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-6 p-4 max-w-lg mx-auto w-full pb-24">
        {/* Hero Balance Card */}
        <section className="flex flex-col gap-4">
          <div className="relative overflow-hidden rounded-2xl bg-surface-dark border border-surface-border p-6 shadow-lg">
            {/* Abstract Pattern Background */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"></div>
            <div className="relative z-10 flex flex-col items-center justify-center gap-1 text-center">
              <span className="text-sm font-medium text-slate-400 dark:text-slate-400 uppercase tracking-wider">Saldo Disponível</span>
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-2">R$ 15,50</h2>
              <div className="mt-4 flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1">
                <TrendingUp className="text-primary text-sm" />
                <p className="text-xs font-semibold text-primary">Você está economizando muito!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-surface-border p-4 shadow-sm">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Percent size={20} />
              <span className="text-xs font-bold uppercase tracking-wider">Por Pedido</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">5%</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Cashback garantido em todas as compras</p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-surface-border p-4 shadow-sm">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Wallet size={20} />
              <span className="text-xs font-bold uppercase tracking-wider">Total Acumulado</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">R$ 150,00</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Desde o início da sua jornada</p>
          </div>
        </section>

        {/* Redemption Progress */}
        <section className="flex flex-col gap-3 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-surface-border p-5 shadow-sm">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Meta de Resgate</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Faltam <span className="text-primary font-bold">R$ 4,50</span> para liberar o resgate</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block mb-1">Mínimo</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">R$ 20,00</span>
            </div>
          </div>
          <div className="relative h-3 w-full rounded-full bg-gray-100 dark:bg-black/40 overflow-hidden mt-2">
            <div className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all duration-500 ease-out" style={{ width: '77.5%' }}></div>
          </div>
          {/* Redeem Button (Disabled State) */}
          <button className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 font-bold py-3 px-4 cursor-not-allowed transition-colors hover:bg-gray-300 dark:hover:bg-gray-600 opacity-80" disabled>
            <Lock size={20} />
            <span>Solicitar Resgate</span>
          </button>
          <p className="text-xs text-center text-slate-400 mt-1">O botão será ativado ao atingir R$ 20,00</p>
        </section>

        {/* Transaction History */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Histórico</h3>
            <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              <Eye size={16} className="inline mr-1" />
              Ver tudo
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {/* Transaction Item 1 */}
            <div className="group flex items-center justify-between p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-surface-border hover:border-primary/50 transition-colors shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                  <Plus size={20} />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Compra #1234</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Geladinho Ninho c/ Nutella</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-500">+ R$ 0,50</p>
                <p className="text-xs text-slate-400">12 Out</p>
              </div>
            </div>

            {/* Transaction Item 2 */}
            <div className="group flex items-center justify-between p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-surface-border hover:border-primary/50 transition-colors shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                  <Plus size={20} />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Compra #1230</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Kit Gourmet 10un</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-500">+ R$ 1,20</p>
                <p className="text-xs text-slate-400">10 Out</p>
              </div>
            </div>

            {/* Transaction Item 3 (Redemption) */}
            <div className="group flex items-center justify-between p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-surface-border hover:border-primary/50 transition-colors shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ArrowDown size={20} />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Resgate de Saldo</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Transferência PIX</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 dark:text-white">- R$ 10,00</p>
                <p className="text-xs text-slate-400">01 Out</p>
              </div>
            </div>

            {/* Transaction Item 4 */}
            <div className="group flex items-center justify-between p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-surface-border hover:border-primary/50 transition-colors shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                  <Plus size={20} />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Compra #1215</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Geladinho Paçoca</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-500">+ R$ 0,35</p>
                <p className="text-xs text-slate-400">28 Set</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white/90 dark:bg-surface-dark/90 backdrop-blur-lg pb-safe pt-2">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
          <Link to="/" className="flex flex-col items-center gap-1 w-full text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors">
            <Home size={24} />
            <span className="text-[10px] font-medium">Início</span>
          </Link>
          <button className="flex flex-col items-center gap-1 w-full text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors">
            <Search size={24} />
            <span className="text-[10px] font-medium">Buscar</span>
          </button>
          <Link to="/cashback" className="flex flex-col items-center gap-1 w-full text-primary">
            <DollarSign size={24} />
            <span className="text-[10px] font-medium">Cashback</span>
          </Link>
          <button className="flex flex-col items-center gap-1 w-full text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors">
            <User size={24} />
            <span className="text-[10px] font-medium">Perfil</span>
          </button>
        </div>
      </nav>