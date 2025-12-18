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
          <button className="flex flex-col items-center gap-1 w-full text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors">
            <Heart size={24} />
            <span className="text-[10px] font-medium">Favoritos</span>
          </button>
          <button className="flex flex-col items-center gap-1 w-full text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors">
            <User size={24} />
            <span className="text-[10px] font-medium">Perfil</span>
          </button>
        </div>
      </nav>