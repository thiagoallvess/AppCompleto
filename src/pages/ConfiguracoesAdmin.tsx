{/* Configurações de Gás */}
        <div className="mt-8">
          <h3 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider px-4 pb-2 opacity-80">
            Configurações de Gás
          </h3>
          <div className="bg-white dark:bg-surface-dark border-y border-slate-200 dark:border-slate-700 px-4 py-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-slate-900 dark:text-white text-sm font-medium leading-normal pb-1.5">
                  Peso Botijão
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    value={gasWeight}
                    onChange={(e) => setGasWeight(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700 pr-12"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                    kg
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-slate-900 dark:text-white text-sm font-medium leading-normal pb-1.5">
                  Preço Botijão
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                    R$
                  </span>
                  <Input
                    type="number"
                    step="0.01"
                    value={gasPrice}
                    onChange={(e) => setGasPrice(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700 pl-9"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-slate-900 dark:text-white text-sm font-medium leading-normal pb-2">
                Consumo (kg/h)
              </label>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col">
                  <label className="text-slate-900 dark:text-white text-xs font-medium leading-normal pb-1">
                    Baixo
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="0.5"
                    className="w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-slate-900 dark:text-white text-xs font-medium leading-normal pb-1">
                    Médio
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="1.0"
                    className="w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-slate-900 dark:text-white text-xs font-medium leading-normal pb-1">
                    Alto
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="1.5"
                    className="w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>