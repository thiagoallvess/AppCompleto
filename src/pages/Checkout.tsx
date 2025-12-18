{/* Header */}
      <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center p-4 pb-2 justify-between max-w-md mx-auto lg:max-w-7xl lg:px-6 w-full">
          <Link
            to="/cart"
            className="flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="text-slate-900 dark:text-white" size={24} />
          </Link>
          <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">Finalizar Compra</h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col w-full max-w-md mx-auto lg:max-w-7xl p-4 lg:px-6 pb-32 space-y-4">