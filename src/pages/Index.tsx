<SheetContent side="left" className="w-80 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
          <div className="flex flex-col gap-6 mt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div>
                <h2 className="font-bold text-lg">Geladinhos Gourmet</h2>
                <p className="text-sm text-muted-foreground">Bem-vindo de volta!</p>
              </div>
            </div>
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <Home size={20} />
                <span>Início</span>
              </Link>
              <Link
                to="/meus-pedidos"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <Receipt size={20} />
                <span>Meus Pedidos</span>
              </Link>
              <Link
                to="/cashback"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <DollarSign size={20} />
                <span>Meu Cashback</span>
              </Link>
              <Link
                to="/indicacao"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <Heart size={20} />
                <span>Indicação</span>
              </Link>
              <Link
                to="/perfil"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <User size={20} />
                <span>Meu Perfil</span>
              </Link>
              <div className="border-t border-border my-2"></div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-1">
                Administração
              </div>
              <Link
                to="/gestao-pedidos"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <Receipt size={20} />
                <span>Gestão de Pedidos</span>
              </Link>
              <Link
                to="/gestao-insumos"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="material-symbols-outlined">inventory</div>
                <span>Gestão de Insumos</span>
              </Link>
              <Link
                to="/gestao-produtos"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="material-symbols-outlined">icecream</div>
                <span>Gestão de Produtos</span>
              </Link>
              <Link
                to="/configuracoes-admin"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="material-symbols-outlined">settings</div>
                <span>Configurações Admin</span>
              </Link>
            </nav>
          </div>
        </SheetContent>