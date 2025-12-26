"use client";

import { ArrowLeft, Filter, TrendingUp, TrendingDown, Star, Clock, Truck, Search, Calendar, ChevronRight, BarChart3, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDrivers } from "@/contexts/DriversContext";
import { Button } from "@/components/ui/button";

const RelatoriosEntregadores = () => {
  const { drivers } = useDrivers();
  const [selectedPeriod, setSelectedPeriod] = useState("Hoje");
  const [searchTerm, setSearchTerm] = useState("");

  const periods = ["Hoje", "Esta Semana", "Este Mês", "Outros"];

  // Mock stats for demonstration
  const stats = [
    { label: "Entregas", value: "1.240", trend: "+12%", icon: Truck, trendUp: true },
    { label: "Tempo Médio", value: "22 min", trend: "-2%", icon: Clock, trendUp: false },
    { label: "Nota Geral", value: "4.8", trend: "Estável", icon: Star, trendUp: null },
  ];

  const filteredDrivers = drivers.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).map(d => ({
    ...d,
    // Add mock reporting data to context drivers
    deliveries: d.deliveriesToday * 5, // Simulated historical data
    rating: (4.5 + Math.random() * 0.5).toFixed(1),
    avgTime: "18 min"
  })).sort((a, b) => b.deliveries - a.deliveries);

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-white font-display antialiased">
      <div className="max-w-4xl mx-auto w-full flex flex-col min-h-screen border-x border-neutral-800/20 dark:border-neutral-800">
        
        {/* Header */}
        <header className="sticky top-0 z-50 flex items-center justify-between p-4 pb-2 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-neutral-800/10 dark:border-neutral-800/50">
          <Link
            to="/visao-geral"
            className="flex size-10 items-center justify-center rounded-full hover:bg-neutral-200 dark:hover:bg-white/5 transition-all active:scale-95"
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">Desempenho da Frota</h1>
          <button className="flex size-10 items-center justify-center rounded-full hover:bg-neutral-200 dark:hover:bg-white/5 transition-colors">
            <Filter size={24} />
          </button>
        </header>

        {/* Date Filters */}
        <div className="flex gap-3 p-4 overflow-x-auto no-scrollbar">
          {periods.map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`flex h-9 shrink-0 items-center justify-center px-5 rounded-full transition-all active:scale-95 text-sm font-bold ${
                selectedPeriod === period 
                ? "bg-slate-900 dark:bg-white text-white dark:text-background-dark" 
                : "bg-slate-200 dark:bg-surface-highlight text-slate-600 dark:text-neutral-300"
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* KPI Grid */}
        <div className="px-4 pb-2">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex min-w-[140px] flex-1 flex-col gap-3 rounded-xl p-5 bg-white dark:bg-surface-dark border border-neutral-800/10 dark:border-neutral-800 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-slate-100 dark:bg-neutral-700/50 rounded-md">
                    <stat.icon className="text-slate-500 dark:text-neutral-300" size={18} />
                  </div>
                  <p className="text-slate-500 dark:text-neutral-400 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {stat.trendUp === true && <TrendingUp size={14} className="text-emerald-500" />}
                    {stat.trendUp === false && <TrendingDown size={14} className="text-emerald-500" />}
                    <p className={`text-[10px] font-bold ${stat.trendUp !== null ? 'text-emerald-500' : 'text-slate-400'}`}>
                      {stat.trend} {stat.trendUp !== null && "vs. ontem"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Section */}
        <div className="px-4 py-2">
          <div className="flex flex-col gap-2 rounded-xl bg-white dark:bg-surface-dark p-5 border border-neutral-800/10 dark:border-neutral-800 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col">
                <p className="text-slate-500 dark:text-neutral-400 text-sm font-bold uppercase tracking-wider">Tendência de Volume</p>
                <p className="text-2xl font-bold mt-1">124 Entregas</p>
              </div>
              <div className="bg-slate-100 dark:bg-neutral-800 px-2 py-1 rounded text-[10px] font-bold text-slate-500 dark:text-neutral-300">Últimas 24h</div>
            </div>
            
            {/* SVG Chart Simulation */}
            <div className="w-full h-[120px] relative overflow-hidden mt-4">
              <svg fill="none" height="100%" preserveAspectRatio="none" viewBox="0 0 478 150" width="100%">
                <defs>
                  <linearGradient id="chart_grad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#137fec" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#137fec" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 109 C50 109 50 40 100 40 C150 40 150 90 200 90 C250 90 250 30 300 30 C350 30 350 70 400 70 C440 70 440 20 478 20 V150 H0 V109 Z" fill="url(#chart_grad)" />
                <path d="M0 109 C50 109 50 40 100 40 C150 40 150 90 200 90 C250 90 250 30 300 30 C350 30 350 70 400 70 C440 70 440 20 478 20" fill="none" stroke="#137fec" strokeLinecap="round" strokeWidth="3" />
              </svg>
            </div>
            <div className="flex justify-between px-1 pt-4 border-t border-neutral-800/10 dark:border-neutral-700/50 mt-2">
              {["08:00", "12:00", "16:00", "20:00"].map(t => (
                <p key={t} className="text-slate-400 dark:text-neutral-500 text-[10px] font-bold uppercase tracking-wider">{t}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Drivers List Header & Search */}
        <div className="mt-6 px-4">
          <h2 className="text-xl font-bold leading-tight mb-4">Ranking de Entregadores</h2>
          <div className="relative w-full mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <Search size={18} />
            </div>
            <input 
              className="block w-full p-3 pl-10 text-sm bg-white dark:bg-surface-dark border border-neutral-800/10 dark:border-neutral-800 rounded-xl focus:ring-1 focus:ring-primary outline-none placeholder-slate-400 transition-all shadow-sm" 
              placeholder="Buscar por nome..." 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Driver List */}
        <div className="flex flex-col gap-3 px-4 pb-32">
          {filteredDrivers.map((driver, idx) => (
            <div key={driver.id} className="group flex items-center justify-between rounded-xl bg-white dark:bg-surface-dark p-4 border border-neutral-800/10 dark:border-neutral-800 active:scale-[0.99] transition-all shadow-sm cursor-pointer hover:border-primary/50">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="size-12 rounded-full bg-slate-200 dark:bg-neutral-800 flex items-center justify-center overflow-hidden border border-neutral-700">
                    <img src={driver.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  {idx === 0 && (
                    <div className="absolute -top-1 -right-1 bg-yellow-500 text-white rounded-full p-0.5 shadow-sm">
                      <TrendingUp size={12} />
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="font-bold text-base">{driver.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center text-yellow-500">
                      <Star size={12} className="fill-current" />
                      <span className="ml-1 text-xs font-bold">{driver.rating}</span>
                    </div>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-neutral-600"></span>
                    <span className="text-slate-500 dark:text-neutral-400 text-xs">{driver.avgTime} méd.</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg leading-none">{driver.deliveries}</p>
                <p className="text-slate-400 dark:text-neutral-500 text-[10px] font-bold uppercase tracking-wider mt-1">Entregas</p>
              </div>
            </div>
          ))}

          {filteredDrivers.length === 0 && (
            <div className="text-center py-10 opacity-50">
              <p>Nenhum entregador encontrado.</p>
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-t border-neutral-800/10 dark:border-neutral-800 z-50">
          <div className="max-w-4xl mx-auto flex gap-3">
             <Button className="flex-1 h-12 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-background-dark font-bold gap-2">
                <Download size={18} />
                Exportar PDF
             </Button>
             <Button variant="outline" className="size-12 rounded-xl p-0 border-neutral-800/20 dark:border-neutral-800">
                <BarChart3 size={20} />
             </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RelatoriosEntregadores;