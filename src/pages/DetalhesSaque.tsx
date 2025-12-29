"use client";

import { ArrowLeft, HelpCircle, Copy, Calendar, CreditCard, Info } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { showSuccess } from "@/utils/toast";

const DetalhesSaque = () => {
  const [searchParams] = useSearchParams();
  const saqueId = searchParams.get('id') || "948392";
  const [copied, setCopied] = useState(false);

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(`#${saqueId}`);
      setCopied(true);
      showSuccess("ID copiado!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Dados simulados baseados no ID
  const isProcessed = saqueId === "948391";
  const status = isProcessed ? "Concluído" : "Pendente";
  const statusColor = isProcessed ? "text-emerald-500" : "text-orange-500";
  const statusBg = isProcessed ? "bg-emerald-500/10" : "bg-orange-500/10";
  const statusIcon = isProcessed ? "check_circle" : "hourglass_top";

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-2xl">
      {/* Header */}
      <header className="flex items-center px-4 py-4 justify-between sticky top-0 z-10 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-white/5">
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
        <section className="flex flex-col gap-4 items-center justify-center py-8">
          <div className={`size-20 rounded-full ${statusBg} flex items-center justify-center mb-2 shadow-inner`}>
            <span className={`material-symbols-outlined ${statusColor} text-4xl icon-filled`}>{statusIcon}</span>
          </div>
          <div className="text-center space-y-1">
            <h1 className={`text-3xl font-black leading-tight ${statusColor}`}>
              {status}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              {isProcessed ? "O dinheiro já foi enviado para sua conta." : "Aguardando processamento financeiro."}
            </p>
          </div>
        </section>

        {/* Financial Details Card */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-white/5 space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">ID do Saque</p>
              <div className="flex items-center gap-2">
                <span className="text-slate-900 dark:text-white font-mono font-bold">#{saqueId}</span>
                <button onClick={handleCopyId} className="text-primary hover:opacity-70 transition-opacity">
                  <Copy size={16} />
                </button>
              </div>
            </div>
            <div className="text-right space-y-1">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Data da Solicitação</p>
              <div className="flex items-center justify-end gap-1.5 text-slate-900 dark:text-white font-bold text-sm">
                <Calendar size={14} className="text-slate-400" />
                <span>20 Out, 14:30</span>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-slate-100 dark:bg-white/5"></div>

          {/* Values Breakdown */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400 text-sm">Valor Solicitado</span>
              <span className="text-slate-900 dark:text-white font-bold">R$ 200,00</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-600 dark:text-slate-400 text-sm">Taxa Aplicada</span>
                <span className="text-[10px] font-black bg-red-500/10 text-red-500 px-1.5 py-0.5 rounded">1,99%</span>
              </div>
              <span className="text-red-500 font-bold">- R$ 3,98</span>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex justify-between items-end">
              <span className="text-slate-900 dark:text-white font-black uppercase text-xs tracking-wider">Valor Líquido</span>
              <span className="text-primary text-3xl font-black tracking-tighter">R$ 196,02</span>
            </div>
          </div>
        </section>

        {/* Destination Account */}
        <section className="space-y-3">
          <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest px-1">Conta de Destino</h3>
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-white/5 flex items-center gap-4">
            <div className="flex items-center justify-center rounded-xl bg-purple-600 size-12 text-white shadow-lg shadow-purple-900/20">
              <Landmark size={24} />
            </div>
            <div className="flex flex-col flex-1">
              <p className="text-slate-900 dark:text-white font-bold">Nubank</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs">Ag: 0001 • Conta: 123456-7</p>
            </div>
            <div className="text-emerald-500">
              <span className="material-symbols-outlined">verified</span>
            </div>
          </div>
        </section>

        {/* Help Note */}
        <div className="flex gap-3 bg-blue-50 dark:bg-primary/10 p-4 rounded-2xl items-start border border-blue-100 dark:border-primary/20">
          <Info size={20} className="text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            O prazo para compensação bancária é de até 24h úteis após o status mudar para <strong>Processado</strong>.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 mt-auto border-t border-slate-100 dark:border-white/5">
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-slate-500 hover:text-primary transition-colors">
          <HelpCircle size={18} />
          Preciso de ajuda com este saque
        </button>
      </footer>
    </div>
  );
};

import { Landmark } from "lucide-react";
export default DetalhesSaque;