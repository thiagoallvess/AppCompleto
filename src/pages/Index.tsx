{/* Drawer Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
          <div className="p-4">
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
                  to="/indicacao"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <Users size={20} />
                  <span>Indicação</span>
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
                  to="/visao-geral"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <BarChart size={20} />
                  <span>Visão Geral</span>
                </Link>
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
                  to="/gestao-receitas"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <div className="material-symbols-outlined">receipt_long</div>
                  <span>Receitas</span>
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
                  to="/clientes"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <Users size={20} />
                  <span>Clientes</span>
                </Link>
                <Link
                  to="/relatorios"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <BarChart size={20} />
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