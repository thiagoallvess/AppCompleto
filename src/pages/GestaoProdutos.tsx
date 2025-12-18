{/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-background-dark/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 pb-safe z-40">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto px-4">
          <Link to="/" className="flex flex-col items-center justify-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors">
            <Home size={24} />
            <span className="text-[10px] font-medium">Início</span>
          </Link>
          <button className="flex flex-col items-center justify-center gap-1 text-primary dark:text-primary transition-colors">
            <IceCream size={24} />
            <span className="text-[10px] font-bold">Produtos</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors">
            <Receipt size={24} />
            <span className="text-[10px] font-medium">Pedidos</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors">
            <Settings size={24} />
            <span className="text-[10px] font-medium">Ajustes</span>
          </button>
        </div>
      </nav>