{/* Product List */}
      <div className="flex-1 flex flex-col gap-1 px-4 py-2 pb-24">
        {/* List Header Stats */}
        <div className="flex items-center justify-between py-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>Total: {filteredProducts.length} produtos</span>
          <button className="flex items-center gap-1 cursor-pointer hover:text-primary">
            <span>Ordenar</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>

        {/* Product Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`group relative flex flex-col sm:flex-row gap-3 bg-white dark:bg-surface-dark p-3 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all ${
                product.status === "Esgotado" ? "opacity-75 grayscale-[50%]" : ""
              }`}
            >
              <div className="flex gap-3">
                <div
                  className="shrink-0 w-20 h-20 bg-gray-200 dark:bg-slate-800 rounded-lg bg-cover bg-center overflow-hidden relative"
                  style={{
                    backgroundImage: `url("${product.image}")`,
                  }}
                >
                  {product.status === "Esgotado" && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-1 min-w-0 justify-center">
                  <div className="flex items-start justify-between">
                    <h3 className={`text-base font-bold truncate pr-2 ${
                      product.status === "Esgotado" ? "text-slate-400 dark:text-slate-500" : "text-slate-800 dark:text-slate-100"
                    }`}>
                      {product.name}
                    </h3>
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 -mr-2 -mt-2">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className={`text-sm font-bold ${
                      product.status === "Esgotado" ? "text-slate-400 dark:text-slate-500" : "text-primary dark:text-blue-400"
                    }`}>
                      R$ {product.price.toFixed(2)}
                    </span>
                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${getStatusColor(product.statusColor)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(product.statusColor)}`}></span>
                      {product.stock} un.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>