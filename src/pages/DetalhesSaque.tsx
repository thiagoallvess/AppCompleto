"use client";

import { ArrowLeft, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const DetalhesSaque = () => {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-2xl">
      {/* TopAppBar */}
      <header className="flex items-center px-4 py-4 justify-between sticky top-0 z-10 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md">
        <Link
          to="/carteira-motoboy"
          className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-700 dark:text-white"
        >
          <ArrowLeft size={24} />
        </Link>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">
          Detalhes do Saque
        </h2>
      </header>

      <main className="flex-1 flex flex-col gap-6 p-4">
        {/* Status Section */}
        <section className="flex flex-col gap-4 items-center justify-center py-6">
          <div className="size-16 rounded-full bg-orange-500/10 flex items-center justify-center mb-2">
            <span className="material-symbols-outlined text-orange-500 text-3xl icon-filled">hourglass_top</span>
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
              Pendente
            </h1>
            <p className="text-slate-500 dark:text-text-secondary text-base font-normal leading-relaxed max-w-[280px] mx-auto">
              A solicitação foi recebida e está sendo processada pelo setor financeiro.
            </p>
          </div>
        </section>

        {/* Financial Details Card */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-white/5">
          {/* Info Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-slate-500 dark:text-text-secondary text-xs font-medium uppercase tracking-wider mb-1">ID do Saque</p>
              <div className="flex items-center gap-2">
                <span className="text-slate-900 dark:text-white font-medium">#948392</span>
                <button className="text-primary hover:text-primary/80 transition-colors">
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-slate-500 dark:text-text-secondary text-xs font-medium uppercase tracking-wider mb-1">Data</p>
              <span className="text-slate-900 dark:text-white font-medium">20 Out, 14:30</span>
            </div>
          </div>
          <div className="h-px w-full bg-slate-200 dark:bg-white/10 my-4"></div>
          {/* Values */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <p className="text-slate-600 dark:text-text-secondary text-sm font-normal">Valor Solicitado</p>
              <p className="text-slate-900 dark:text-white text-sm font-medium">R$ 200,00</p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <p className="text-slate-600 dark:text-text-secondary text-sm font-normal">Taxa de Serviço</p>
                <span className="text-xs bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-text-secondary px-1.5 py-0.5 rounded">1,99%</span>
              </div>
              <p className="text-red-500/80 dark:text-red-400 text-sm font-medium">- R$ 3,98</p>
            </div>
            <div className="h-px w-full bg-slate-200 dark:bg-white/10 my-2"></div>
            <div className="flex justify-between items-end pt-1">
              <p className="text-slate-900 dark:text-white text-base font-bold">Valor Líquido</p>
              <p className="text-primary text-xl font-extrabold tracking-tight">R$ 196,02</p>
            </div>
          </div>
        </section>

        {/* Destination Account */}
        <section>
          <h3 className="text-slate-900 dark:text-white text-sm font-bold leading-tight tracking-wide uppercase px-1 pb-3 pt-2 opacity-80">
            Conta de Destino
          </h3>
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-white/5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center rounded-xl bg-purple-600 shrink-0 size-12 text-white shadow-lg shadow-purple-900/20">
                <span className="material-symbols-outlined text-[24px]">account_balance</span>
              </div>
              <div className="flex flex-col justify-center gap-0.5">
                <p className="text-slate-900 dark:text-white text-base font-bold leading-tight">Nubank</p>
                <p className="text-slate-500 dark:text-text-secondary text-sm font-normal leading-tight">Ag: 0001 • Conta: 123456-7</p>
              </div>
            </div>
            <div className="shrink-0 text-slate-400 dark:text-slate-600">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-500 text-center px-4">
            O valor será creditado nesta conta bancária. Verifique se os dados estão corretos.
          </p>
        </section>
      </main>

      {/* Footer / Support Action */}
      <footer className="p-6 mt-auto">
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-slate-500 dark:text-text-secondary hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
          <HelpCircle size={18} />
          Preciso de ajuda com este saque
        </button>
      </footer>
      <div className="h-5"></div>
    </div>
  );
};

export default DetalhesSaque;