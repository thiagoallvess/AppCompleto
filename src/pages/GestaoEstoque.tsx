{/* Inventory Items */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Itens em Estoque</h3>
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="flex items-center justify-center size-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                <Package className="text-slate-400 dark:text-slate-500" size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Nenhum item encontrado</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-xs mb-6">
                Adicione ingredientes e embalagens para gerenciar o estoque.
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30">
                <Link to="/add-insumo" className="flex items-center gap-2">
                  <Plus size={20} />
                  Adicionar Primeiro Item
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => {
                const quantity = parseFloat(item.quantity || "0");
                const unitCost = parseFloat(item.unitCost || "0");
                const totalValue = quantity * unitCost;
                const averageCost = unitCost;

                return (
                  <Link
                    key={item.id}
                    to={`/detalhes-insumo?id=${item.id}`}
                    className="block"
                  >
                    <div className="group relative rounded-2xl bg-gradient-to-br from-teal-700 to-teal-900 dark:from-teal-800 dark:to-teal-950 p-5 border-2 border-teal-600 dark:border-teal-700 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
                      {/* Header with Icon and Name */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{getIcon(item.icon)}</span>
                          <h3 className="text-white text-lg font-bold leading-tight">{item.name}</h3>
                        </div>
                        {(item.status === "Baixo" || item.status === "Crítico") && (
                          <div className="flex items-center justify-center size-8 rounded-full bg-red-500/20 border border-red-400">
                            <AlertTriangle className="text-red-300" size={16} />
                          </div>
                        )}
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        {/* Preço Total */}
                        <div className="bg-teal-800/50 dark:bg-teal-900/50 rounded-xl p-3 border border-teal-600/30">
                          <div className="flex items-center gap-1.5 mb-1">
                            <DollarSign className="text-yellow-400" size={14} />
                            <span className="text-yellow-400 text-[10px] font-bold uppercase tracking-wider">Preço Total</span>
                          </div>
                          <p className="text-emerald-300 text-lg font-bold">R$ {totalValue.toFixed(2)}</p>
                        </div>

                        {/* Custo Unidade */}
                        <div className="bg-amber-900/30 dark:bg-amber-950/30 rounded-xl p-3 border border-amber-700/30">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-red-400 text-lg">🔴</span>
                            <span className="text-red-400 text-[10px] font-bold uppercase tracking-wider">Custo Unidade</span>
                          </div>
                          <p className="text-yellow-300 text-lg font-bold">R$ {averageCost.toFixed(4)}</p>
                        </div>

                        {/* QTD */}
                        <div className="bg-indigo-900/30 dark:bg-indigo-950/30 rounded-xl p-3 border border-indigo-700/30">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Package className="text-amber-400" size={14} />
                            <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">QTD</span>
                          </div>
                          <p className="text-white text-lg font-bold">{quantity}</p>
                        </div>

                        {/* Unidade */}
                        <div className="bg-blue-900/30 dark:bg-blue-950/30 rounded-xl p-3 border border-blue-700/30">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-yellow-400 text-lg">⚡</span>
                            <span className="text-yellow-400 text-[10px] font-bold uppercase tracking-wider">Unidade</span>
                          </div>
                          <p className="text-blue-200 text-lg font-bold">{item.unit}</p>
                        </div>
                      </div>

                      {/* Custo Médio Badge */}
                      <div className="flex items-center justify-center">
                        <div className="bg-yellow-500/20 border border-yellow-400/40 rounded-full px-4 py-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-yellow-400 text-lg">🟡</span>
                            <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">Custo Médio</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>