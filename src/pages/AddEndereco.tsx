import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AddEndereco = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-gray-200 dark:border-white/5">
        <Link
          to="/enderecos"
          className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] text-center">Novo Endereço</h2>
        <div className="size-10"></div> {/* Spacer for alignment */}
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6 pb-24">
        {/* CEP Field with Search Icon */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-700 dark:text-white text-sm font-medium leading-normal">CEP</label>
          <div className="flex w-full items-stretch rounded-lg shadow-sm">
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-1 focus:ring-primary border border-gray-300 dark:border-border-dark bg-white dark:bg-surface-dark focus:border-primary h-12 placeholder:text-gray-400 dark:placeholder:text-text-secondary px-4 text-base font-normal leading-normal transition-all"
              inputMode="numeric"
              placeholder="00000-000"
              type="text"
            />
            <button className="flex items-center justify-center px-4 rounded-r-lg border border-l-0 border-gray-300 dark:border-border-dark bg-gray-50 dark:bg-surface-dark hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group">
              <svg className="w-6 h-6 text-gray-500 dark:text-text-secondary group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Street Address */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-700 dark:text-white text-sm font-medium leading-normal">Rua / Avenida</label>
          <input
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-1 focus:ring-primary border border-gray-300 dark:border-border-dark bg-white dark:bg-surface-dark focus:border-primary h-12 placeholder:text-gray-400 dark:placeholder:text-text-secondary px-4 text-base font-normal leading-normal transition-all"
            placeholder="Ex: Av. Paulista"
            type="text"
          />
        </div>

        {/* Number and Complement Row */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 flex-[0.4]">
            <label className="text-slate-700 dark:text-white text-sm font-medium leading-normal">Número</label>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-1 focus:ring-primary border border-gray-300 dark:border-border-dark bg-white dark:bg-surface-dark focus:border-primary h-12 placeholder:text-gray-400 dark:placeholder:text-text-secondary px-4 text-base font-normal leading-normal transition-all"
              placeholder="123"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2 flex-[0.6]">
            <label className="text-slate-700 dark:text-white text-sm font-medium leading-normal">
              Complemento <span className="text-xs font-normal text-gray-500 dark:text-text-secondary">(Opcional)</span>
            </label>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-1 focus:ring-primary border border-gray-300 dark:border-border-dark bg-white dark:bg-surface-dark focus:border-primary h-12 placeholder:text-gray-400 dark:placeholder:text-text-secondary px-4 text-base font-normal leading-normal transition-all"
              placeholder="Apto, Bloco, etc"
              type="text"
            />
          </div>
        </div>

        {/* Neighborhood */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-700 dark:text-white text-sm font-medium leading-normal">Bairro</label>
          <input
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-1 focus:ring-primary border border-gray-300 dark:border-border-dark bg-white dark:bg-surface-dark focus:border-primary h-12 placeholder:text-gray-400 dark:placeholder:text-text-secondary px-4 text-base font-normal leading-normal transition-all"
            placeholder="Ex: Centro"
            type="text"
          />
        </div>

        {/* City and State Row */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 flex-[0.7]">
            <label className="text-slate-700 dark:text-white text-sm font-medium leading-normal">Cidade</label>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-1 focus:ring-primary border border-gray-300 dark:border-border-dark bg-white dark:bg-surface-dark focus:border-primary h-12 placeholder:text-gray-400 dark:placeholder:text-text-secondary px-4 text-base font-normal leading-normal transition-all"
              placeholder="São Paulo"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2 flex-[0.3]">
            <label className="text-slate-700 dark:text-white text-sm font-medium leading-normal">UF</label>
            <div className="relative">
              <select className="form-select flex w-full min-w-0 flex-1 appearance-none rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-1 focus:ring-primary border border-gray-300 dark:border-border-dark bg-white dark:bg-surface-dark focus:border-primary h-12 px-4 pr-8 text-base font-normal leading-normal transition-all">
                <option disabled selected value="">UF</option>
                <option value="SP">SP</option>
                <option value="RJ">RJ</option>
                <option value="MG">MG</option>
                {/* Add more states as needed */}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-text-secondary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Default Address Toggle */}
        <div className="flex items-center justify-between py-2">
          <div className="flex flex-col">
            <p className="text-slate-900 dark:text-white text-base font-medium">Endereço Principal</p>
            <p className="text-gray-500 dark:text-text-secondary text-sm">Usar este endereço para futuras entregas</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input defaultChecked className="sr-only peer" type="checkbox" value="" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/30 rounded-full peer dark:bg-surface-dark peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </main>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-t border-gray-200 dark:border-white/5 max-w-md mx-auto">
        <button className="flex w-full items-center justify-center rounded-lg bg-primary h-12 px-5 transition-transform active:scale-[0.98]">
          <span className="text-white text-base font-bold leading-normal">Salvar Endereço</span>
        </button>
      </div>
    </div>
  );
};

export default AddEndereco;