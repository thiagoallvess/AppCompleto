{/* Item: Endereços */}
        <Link
          to="/enderecos"
          className="flex items-center gap-4 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-surface-highlight p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors group"
        >
          <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-10 group-hover:scale-110 transition-transform">
            <MapPin size={20} />
          </div>
          <div className="flex flex-col items-start flex-1">
            <p className="text-base font-semibold leading-normal">Endereços</p>
            <p className="text-xs text-gray-400 dark:text-text-secondary">Gerenciar locais de entrega</p>
          </div>
          <div className="text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>