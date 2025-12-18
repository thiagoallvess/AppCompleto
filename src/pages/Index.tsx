{/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md transition-colors duration-300">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto lg:max-w-none lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <button className="text-slate-900 dark:text-text-primary flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
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
                    to="/cashback"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <DollarSign size={20} />
                    <span>Meu Cashback</span>
                  </Link>
                  <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
                    <Search size={20} />
                    <span>Buscar</span>
                  </button>
                  <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
                    <Heart size={20} />
                    <span>Favoritos</span>
                  </button>
                  <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
                    <User size={20} />
                    <span>Perfil</span>
                  </button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-slate-900 dark:text-text-primary text-lg font-bold leading-tight tracking-tight flex-1 text-center">
            Geladinhos Gourmet
          </h1>
          <Link to="/cart" className="flex size-10 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors relative">
            <ShoppingCart className="text-slate-900 dark:text-text-primary" size={24} />
            {totalItems > 0 && (
              <span className="absolute top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm ring-2 ring-background-light dark:ring-background-dark">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </header>
      <main className="max-w-md mx-auto lg:max-w-7xl flex flex-col gap-6 p-4">
        {/* Categories (Chips) */}
        <section className="w-full overflow-hidden">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {/* Active Chip */}
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary px-5 shadow-sm shadow-primary/25 transition-transform active:scale-95">
              <span className="text-white text-sm font-semibold">Todos</span>
            </button>
            {/* Inactive Chips */}
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 px-5 transition-transform active:scale-95 hover:bg-gray-50 dark:hover:bg-gray-800">
              <span className="text-slate-600 dark:text-text-secondary text-sm font-medium">Cremosos</span>
            </button>
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 px-5 transition-transform active:scale-95 hover:bg-gray-50 dark:hover:bg-gray-800">
              <span className="text-slate-600 dark:text-text-secondary text-sm font-medium">Frutas</span>
            </button>
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 px-5 transition-transform active:scale-95 hover:bg-gray-50 dark:hover:bg-gray-800">
              <span className="text-slate-600 dark:text-text-secondary text-sm font-medium">Detox</span>
            </button>
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 px-5 transition-transform active:scale-95 hover:bg-gray-50 dark:hover:bg-gray-800">
              <span className="text-slate-600 dark:text-text-secondary text-sm font-medium">Alcoólicos</span>
            </button>
          </div>
        </section>
        {/* Product List */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product-details?id=${product.id}`}
              className="block"
            >
              <div className="@container">
                <div className="flex flex-col sm:flex-row items-stretch rounded-xl bg-white dark:bg-surface-dark shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md cursor-pointer">
                  <div
                    className="w-full sm:w-32 h-40 sm:h-auto bg-center bg-no-repeat bg-cover shrink-0 relative"
                    style={{
                      backgroundImage: `url("${product.image}")`,
                    }}
                  >
                    {/* Badge on image for mobile view */}
                    {product.badge && (
                      <div className={`absolute top-2 left-2 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-white sm:hidden ${
                        product.badge === '+18' ? 'bg-purple-600/80' : 'bg-black/60'
                      }`}>
                        {product.badge}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-between p-4 grow">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-slate-900 dark:text-text-primary text-lg font-bold leading-tight">{product.name}</h3>
                      </div>
                      <p className="text-slate-500 dark:text-text-secondary text-sm font-medium leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-slate-900 dark:text-text-primary text-lg font-bold">R$ {product.price.toFixed(2)}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className={`flex items-center justify-center h-9 px-4 rounded-lg text-white text-sm font-bold shadow-sm transition-all active:scale-95 ${
                          addedProducts.has(product.id)
                            ? 'bg-green-500 hover:bg-green-600 shadow-green-500/30'
                            : 'bg-primary hover:bg-primary/90 shadow-primary/30'
                        }`}
                      >
                        {addedProducts.has(product.id) ? (
                          <>
                            <span>✓</span>
                            Adicionado
                          </>
                        ) : (
                          'Adicionar'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </main>
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg pb-safe">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto lg:max-w-none lg:px-6">
          <button className="flex flex-col items-center justify-center w-full h-full text-primary space-y-1">
            <Home size={24} />
            <span className="text-[10px] font-medium">Início</span>
          </button>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <Search size={24} />
            <span className="text-[10px] font-medium">Buscar</span>
          </button>
          <Link to="/cashback" className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <DollarSign size={24} />
            <span className="text-[10px] font-medium">Cashback</span>
          </Link>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <User size={24} />
            <span className="text-[10px] font-medium">Perfil</span>
          </button>
        </div>
      </nav>