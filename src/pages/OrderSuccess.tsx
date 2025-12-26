"use client";

import { CheckCircle, Package, ArrowRight, Home, Receipt } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id') || "#0000";

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        <div className="size-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
          <CheckCircle className="text-emerald-600 dark:text-emerald-400" size={48} />
        </div>
        
        <h1 className="text-3xl font-black tracking-tight mb-2">Pedido Realizado!</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Obrigado! Seu pedido <span className="font-bold text-slate-900 dark:text-white">{orderId}</span> foi recebido e já está sendo processado.
        </p>

        <div className="w-full bg-white dark:bg-surface-dark rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Package size={24} />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">Acompanhe seu pedido</p>
              <p className="text-xs text-slate-500">Você receberá atualizações em tempo real.</p>
            </div>
          </div>
          <Link to={`/detalhes-pedido-cliente?id=${orderId.replace('#', '')}`}>
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
              Ver Detalhes do Pedido
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <Link to="/meus-pedidos">
            <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/20">
              <Receipt className="mr-2" size={20} />
              Meus Pedidos
            </Button>
          </Link>
          <Link to="/">
            <Button variant="ghost" className="w-full text-slate-500 hover:text-slate-900">
              <Home className="mr-2" size={18} />
              Voltar para o Início
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;