import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const EditEndereco = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-gray-200 dark:border-gray-800">
        <Link
          to="/enderecos"
          className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] text-center">Editar Endereço</h2>
        <div className="size-10"></div> {/* Spacer for alignment */}
      </header>

      {/* Map Preview Section */}
      <div className="relative w-full h-40 bg-surface-dark overflow-hidden">
        <img
          alt="Dark stylized map background showing city streets"
          className="w-full h-full object-cover opacity-60"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAs3GVMe-vpjssf9JFsZSVsMYvKw3Af86FMyvYIIkZhR_al6fQm6m_AD-BC4IldOKLeWzvMYraq4LhW0k26iJfLb4cA1CyBgYZR0x7WoKzSMkwbsMSc3ZCdeXAWTyQmJGloXYwnJdbUsotEd_iPCnGs515uumajynfp86pnIgXAtb8ZyZDL7lxjTC_dH2prmBvHdv3bOAdo5cwGuz9p-6t5czwInXJ4i-39ipbIdOvQR8_pSQqTz_iHRHL1fvQK3bITIkobunXtcQ"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-primary/90 text-white p-2 rounded-full shadow-lg border-2 border-white dark:border-background-dark">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        </div>
        <button className="absolute bottom-3 right-4 bg-surface-dark/80 backdrop-blur text-white text-xs font-medium px-3 py-1.5 rounded-full border border-border-dark flex items-center gap-1 hover:bg-surface-dark transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Ajustar Pin
        </button>
      </div>

      {/* Main Content Form */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-6 pb-24">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* CEP Field */}
          <div className="space-y-2">
            <label className="text-slate-900 dark:text-white text-base font-medium" htmlFor="cep">CEP</label>
            <div className="relative flex w-full items-stretch rounded-lg group">
              <input
                className="form-input block w-full rounded-lg border-gray-300 dark:border-border-dark bg-white dark:bg-surface-dark text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-12 sm:h-14 px-4 text-base placeholder:text-gray-400 dark:placeholder:text-text-secondary"
                id="cep"
                inputMode="numeric"
                placeholder="00000-000"
                type="text"
                defaultValue="01310-100"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-text-secondary pointer-events-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Street and Number Row */}
          <div className="flex gap-4">
            <div className="space-y-2 flex-[2]">
              <label className="text-slate-900 dark:text-white text-base font-medium" htmlFor="street">Rua</label>
              <input
                className="form-input block w-full rounded-lg border-gray-300 dark:border-border-dark bg-white dark:bg-surface-dark text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-12 sm:h-14 px-4 text-base placeholder:text-gray-400 dark:placeholder:text-text-secondary"
                id="street"
                type="text"
                defaultValue="Av. Paulista"
              />
            </div>
            <div className="space-y-2 flex-1 min-w-[100px]">
              <label className="text-slate-900 dark:text-white text-base font-medium" htmlFor="number">Número</label>
              <input
                className="form-input block w-full rounded-lg border-gray-300 dark:border-border-dark bg-white dark:bg-surface-dark text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-12 sm:h-14 px-4 text-base placeholder:text-gray-400 dark:placeholder:text-text-secondary"
                id="number"
                inputMode="numeric"
                type="text"
                defaultValue="1578"
              />
            </div>
          </div>

          {/* Complement */}
          <div className="space-y-2">
            <label className="text-slate-900 dark:text-white text-base font-medium" htmlFor="complement">
              Complemento <span className="text-sm font-normal text-gray-500 dark:text-text-secondary">(Opcional)</span>
            </label>
            <input
              className="form-input block w-full rounded-lg border-gray-300 dark:border-border-dark bg-white dark:bg-surface-dark text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-12 sm:h-14 px-4 text-base placeholder:text-gray-400 dark:placeholder:text-text-secondary"
              id="complement"
              type="text"
              defaultValue="Apto 42, Bloco B"
            />
          </div>

          {/* Neighborhood */}
          <div className="space-y-2">
            <label className="text-slate-900 dark:text-white text-base font-medium" htmlFor="neighborhood">Bairro</label>
            <input
              className="form-input block w-full rounded-lg border-gray-300 dark:border-border-dark bg-white dark:bg-surface-dark text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-12 sm:h-14 px-4 text-base placeholder:text-gray-400 dark:placeholder:text-text-secondary"
              id="neighborhood"
              type="text"
              defaultValue="Bela Vista"
            />
          </div>

          {/* City and State Row */}
          <div className="flex gap-4">
            <div className="space-y-2 flex-[2]">
              <label className="text-slate-900 dark:text-white text-base font-medium" htmlFor="city">Cidade</label>
              <input
                className="form-input block w-full rounded-lg border-gray-300 dark:border-border-dark bg-gray-100 dark:bg-background-dark text-gray-500 dark:text-text-secondary focus:border-gray-300 focus:ring-0 h-12 sm:h-14 px-4 text-base cursor-not-allowed"
                id="city"
                readOnly
                type="text"
                defaultValue="São Paulo"
              />
            </div>
            <div className="space-y-2 flex-1 min-w-[80px]">
              <label className="text-slate-900 dark:text-white text-base font-medium" htmlFor="state">UF</label>
              <input
                className="form-input block w-full rounded-lg border-gray-300 dark:border-border-dark bg-gray-100 dark:bg-background-dark text-gray-500 dark:text-text-secondary focus:border-gray-300 focus:ring-0 h-12 sm:h-14 px-4 text-base cursor-not-allowed text-center"
                id="state"
                readOnly
                type="text"
                defaultValue="SP"
              />
            </div>
          </div>

          {/* Delete Address Option */}
          <div className="pt-4 flex justify-center">
            <button className="text-red-500 hover:text-red-400 text-sm font-medium flex items-center gap-2 transition-colors" type="button">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Excluir este endereço
            </button>
          </div>
        </form>
      </main>

      {/* Floating/Fixed Footer Actions */}
      <footer className="fixed bottom-0 left-0 w-full bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-800 p-4 pb-6 z-20 max-w-md mx-auto">
        <div className="flex flex-col gap-3">
          <button className="w-full bg-primary hover:bg-blue-700 text-white font-bold h-12 sm:h-14 rounded-lg shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
            Salvar Alterações
          </button>
          <button className="w-full bg-transparent hover:bg-gray-100 dark:hover:bg-surface-dark text-gray-600 dark:text-text-secondary font-medium h-12 sm:h-14 rounded-lg border border-gray-300 dark:border-border-dark transition-colors active:scale-[0.98]">
            Cancelar
          </button>
        </div>
      </footer>
    </div>
  );
};

export default EditEndereco;