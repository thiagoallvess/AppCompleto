"use client";

import { Link } from "react-router-dom";

const PainelRepasses = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Painel de Repasses</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Gerencie os repasses e pagamentos dos entregadores.
          </p>
          <Link to="/gestao-entregadores" className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-blue-600 transition-colors">
            Gestão de Entregadores
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PainelRepasses;