{/* Segmented Control */}
        <div className="px-4 pb-6">
          <div className="flex h-12 w-full items-center justify-center rounded-xl bg-gray-200 dark:bg-surface-dark p-1">
            <label className="flex-1 cursor-pointer h-full relative flex items-center justify-center">
              <input
                checked={viewMode === "billing"}
                className="peer sr-only"
                name="view-mode"
                type="radio"
                value="billing"
                onChange={() => setViewMode("billing")}
              />
              <div className="absolute inset-0 rounded-lg bg-gray-300 dark:bg-surface-dark-highlight shadow-sm opacity-0 peer-checked:opacity-100 transition-all duration-200"></div>
              <span className="relative z-10 text-xs sm:text-sm font-medium text-slate-500 dark:text-gray-400 peer-checked:text-slate-900 dark:peer-checked:text-white transition-colors">
                Por Faturamento
              </span>
            </label>
            <label className="flex-1 cursor-pointer h-full relative flex items-center justify-center">
              <input
                checked={viewMode === "profitability"}
                className="peer sr-only"
                name="view-mode"
                type="radio"
                value="profitability"
                onChange={() => setViewMode("profitability")}
              />
              <div className="absolute inset-0 rounded-lg bg-gray-300 dark:bg-surface-dark-highlight shadow-sm opacity-0 peer-checked:opacity-100 transition-all duration-200"></div>
              <span className="relative z-10 text-xs sm:text-sm font-medium text-slate-500 dark:text-gray-400 peer-checked:text-slate-900 dark:peer-checked:text-white transition-colors">
                Por Lucratividade
              </span>
            </label>
          </div>
        </div>