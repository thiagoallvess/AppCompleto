{/* Tabs */}
        <div className="px-4 lg:px-0 max-w-7xl mx-auto">
          <div className="flex justify-center gap-2 lg:gap-8">
            <button
              onClick={() => setActiveTab("Todos")}
              className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 flex-1 lg:flex-none lg:px-6 transition-colors ${
                activeTab === "Todos" ? "border-b-primary text-primary dark:text-primary" : "border-b-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">Todos</p>
            </button>
            <button
              onClick={() => setActiveTab("Insumos")}
              className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 flex-1 lg:flex-none lg:px-6 transition-colors ${
                activeTab === "Insumos" ? "border-b-primary text-primary dark:text-primary" : "border-b-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">Insumos</p>
            </button>
            <button
              onClick={() => setActiveTab("Produtos")}
              className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 flex-1 lg:flex-none lg:px-6 transition-colors ${
                activeTab === "Produtos" ? "border-b-primary text-primary dark:text-primary" : "border-b-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">Produtos</p>
            </button>
          </div>
        </div>