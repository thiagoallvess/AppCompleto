"use client";

import { ArrowLeft, MoreVertical, Navigation, MapPin, Info, PersonStanding, Phone, MessageCircle, ShoppingBag, CheckCircle, Map as MapIcon } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useOrders } from "@/contexts/OrdersContext";
import { showSuccess } from "@/utils/toast";
import { useState, useMemo } from "react";

const EntregaAndamento = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderIdParam = searchParams.get('id');
  const { getOrderById, updateOrder } = useOrders();
  const [arrived, setArrived] = useState(false);

  const decodedId = orderIdParam ? decodeURIComponent(orderIdParam) : '';
  const cleanId = decodedId.startsWith('#') ? decodedId : `#${decodedId}`;
  const order = getOrderById(cleanId);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background-light dark:bg-background-dark">
        <p className="text-slate-500 mb-4">Pedido não encontrado.</p>
        <Link to="/pedidos-entrega" className="text-primary font-bold">Voltar para Pedidos</Link>
      </div>
    );
  }

  const handleArrived = () => {
    setArrived(true);
    showSuccess("Status atualizado: Você chegou ao local!");
  };

  const handleFinishDelivery = () => {
    updateOrder(order.id, {
      status: "Entregue",
      statusColor: "green",
      statusIcon: "check_circle",
      section: "finished",
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    });
    showSuccess("Entrega finalizada com sucesso!");
    navigate("/pedidos-entrega");
  };

  const handleOpenMap = () => {
    const address = "Av. Paulista, 1578, São Paulo - SP";
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col mx-auto max-w-md bg-background-light dark:bg-background-dark shadow-xl overflow-hidden font-display antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-5 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-white/5">
        <Link
          to="/pedidos-entrega"
          className="flex size-10 items-center justify-center rounded-full bg-white dark:bg-surface-dark text-gray-900 dark:text-white shadow-sm hover:bg-gray-100 dark:hover:bg-primary/20 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Em Rota</span>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Pedido {order.id}</h1>
        </div>
        <button className="flex size-10 items-center justify-center rounded-full bg-white dark:bg-surface-dark text-gray-900 dark:text-white shadow-sm hover:bg-gray-100 dark:hover:bg-primary/20 transition-colors">
          <MoreVertical size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto pb-40">
        {/* Map Preview Section */}
        <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-lg group">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCfpeFOIVNieu1xqOrBMBYWRByOLLzeKeYmE8slSkDyJytYCC5Vesyjzo_g0phgQa3eoDugYdBoQ636sHs25VyHueUcBnd4j2l_UyWVUPIihqam2dD4GAWjG-tRhoWXl3Z_vZxH7ep85WspZ5LsNxlGqrcojL7_4SB3TplxWRzMkiQQUUt4IwRXOkNfWsTabxEEIiZCtJqXHOgJftaBm1_E2GGciY3SZDcM94je8Pz82lq8V8yjqCwvxy24elBL3MXZ2GTLyyOGzg")' }}
          ></div>
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all"></div>
          <button 
            onClick={handleOpenMap}
            className="absolute bottom-4 right-4 bg-primary text-background-dark px-5 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all"
          >
            <Navigation size={18} />
            <span>Navegar</span>
          </button>
        </div>

        {/* Destination Card */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider pl-1">
            <MapPin size={14} />
            <span>Endereço de Entrega</span>
          </div>
          <div className="bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight mb-1">Av. Paulista, 1578</h2>
            <p className="text-gray-500 dark:text-gray-400 text-base">Bela Vista, São Paulo - SP</p>
            <div className="mt-4 flex items-center gap-2 p-3 bg-background-light dark:bg-black/20 rounded-xl border border-dashed border-gray-300 dark:border-white/10">
              <Info className="text-gray-400" size={16} />
              <span className="text-sm text-gray-600 dark:text-gray-300">Complemento: Apto 42, Bloco B</span>
            </div>
          </div>
        </section>

        {/* Customer Info */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider pl-1">
            <PersonStanding size={14} />
            <span>Dados do Cliente</span>
          </div>
          <div className="bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                {order.customer[0]}
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">{order.customer}</h3>
                <p className="text-xs text-primary font-medium">Cliente Fiel</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="size-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                <Phone size={20} />
              </button>
              <button className="size-10 flex items-center justify-center rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors">
                <MessageCircle size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Order Summary */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider pl-1">
            <ShoppingBag size={14} />
            <span>Resumo do Pedido</span>
          </div>
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-white/5">
            <div className="flex flex-col gap-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-gray-100 dark:border-white/5 last:border-0 pb-2 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary font-bold w-8 h-8 rounded-lg flex items-center justify-center text-sm">{item.quantity}x</div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium text-sm">{item.name}</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="pt-2 mt-1 border-t border-gray-100 dark:border-white/5 flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Total a cobrar</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">R$ {order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-0 w-full max-w-md bg-white dark:bg-[#15201b] border-t border-gray-100 dark:border-white/5 p-4 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.2)] z-50 rounded-t-3xl">
        <div className="flex flex-col gap-3">
          {!arrived ? (
            <button 
              onClick={handleArrived}
              className="w-full py-4 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-bold text-sm hover:bg-gray-200 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <MapPin size={18} />
              Cheguei ao Local
            </button>
          ) : (
            <div className="w-full py-2 text-center">
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Você está no local</span>
            </div>
          )}

          {/* Swipe to Finish (Simulated with a button for better UX in web) */}
          <button 
            onClick={handleFinishDelivery}
            className="relative h-14 w-full bg-slate-900 dark:bg-black rounded-full overflow-hidden flex items-center justify-center group shadow-inner transition-all active:scale-[0.98]"
          >
            <div className="absolute left-1 h-12 w-16 bg-primary rounded-full flex items-center justify-center shadow-lg z-10">
              <CheckCircle className="text-background-dark" size={24} />
            </div>
            <span className="text-white text-sm font-bold tracking-wide pl-8">Finalizar Entrega</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntregaAndamento;