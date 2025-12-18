{/* Filter Chips */}
      <div className="sticky top-[60px] z-40 w-full overflow-x-auto bg-background-light dark:bg-background-dark py-4 px-4 no-scrollbar border-b border-transparent dark:border-gray-800">
        <div className="flex gap-3 min-w-max">
          {/* Active Chip */}
          <button className="flex h-9 items-center justify-center rounded-full bg-primary px-5 shadow-lg shadow-primary/20 transition-transform active:scale-95">
            <span className="text-sm font-medium text-white">Todos</span>
          </button>
          {/* Inactive Chips */}
          <button className="flex h-9 items-center justify-center rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 px-5 transition-transform active:scale-95 hover:bg-gray-50 dark:hover:bg-gray-800">
            <span className="text-sm font-medium text-gray-600 dark:text-text-secondary">Em Preparo</span>
          </button>
          <button className="flex h-9 items-center justify-center rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 px-5 transition-transform active:scale-95 hover:bg-gray-50 dark:hover:bg-gray-800">
            <span className="text-sm font-medium text-gray-600 dark:text-text-secondary">A Caminho</span>
          </button>
          <button className="flex h-9 items-center justify-center rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 px-5 transition-transform active:scale-95 hover:bg-gray-50 dark:hover:bg-gray-800">
            <span className="text-sm font-medium text-gray-600 dark:text-text-secondary">Entregue</span>
          </button>
        </div>
      </div>