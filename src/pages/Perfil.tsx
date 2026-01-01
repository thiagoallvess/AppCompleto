import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { showSuccess, showError } from "@/utils/toast";
import { ArrowLeft, User, Bell, Shield, CreditCard, MapPin, HelpCircle, LogOut, Home, Search, Heart, DollarSign, ChevronRight } from "lucide-react";

const Perfil = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (confirm("Deseja realmente sair da sua conta?")) {
      try {
        await signOut();
        showSuccess("Sessão encerrada com sucesso.");
        navigate("/login");
      } catch (error: any) {
        console.error("Erro ao sair:", error);
        showError("Não foi possível encerrar a sessão.");
      }
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-text-primary pb-24 min-h-screen">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur border-b border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="flex justify-between p-4 items-center max-w-md mx-auto lg:max-w-none lg:px-6 w-full">
          <Link to="/" className="text-slate-900 dark:text-text-primary flex size-10 items-center justify-center rounded-full bg-transparent hover:bg-primary/10 dark:hover:bg-primary/20 transition-all cursor-pointer">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">Meu perfil</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto lg:max-w-7xl flex flex-col gap-6 pt-4 pb-6 px-4">
        {profile ? (
          <>
            <div className="rounded-xl p-6 bg-white shadow-md border border-gray-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  {profile.avatar_url ? (
                    <img src={profile.avatar_url} alt="Avatar" className="w-20 h-20 rounded-full" />
                  ) : (
                    <User size={48} className="text-gray-500" />
                  )}
                  <h2 className="text-xl font-bold dark:text-text-primary">{`${profile.first_name} ${profile.last_name || ''}`}</h2>
                </div>
                <div>
                  <LogOut size={24} className="text-red-500 cursor-pointer" onClick={handleLogout} />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Link to="/conta" className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all">
                  <User size={24} />
                  <span className="text-xl font-semibold dark:text-text-primary">Meu perfil</span>
                </Link>
                <Link to="/enderecos" className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all">
                  <MapPin size={24} />
                  <span className="text-xl font-semibold dark:text-text-primary">Meus endereços</span>
                </Link>
                <Link to="/pagamentos" className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all">
                  <CreditCard size={24} />
                  <span className="text-xl font-semibold dark:text-text-primary">Meus pagamentos</span>
                </Link>
                <Link to="/politica-privacidade" className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all">
                  <Shield size={24} />
                  <span className="text-xl font-semibold dark:text-text-primary">Política de privacidade</span>
                </Link>
                <Link to="/ajuda" className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all">
                  <HelpCircle size={24} />
                  <span className="text-xl font-semibold dark:text-text-primary">Ajuda</span>
                </Link>
              </div>
            </div>

            <Link to="/carrinho" className="flex items-center gap-4 bg-white rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 px-6 py-4 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all">
              <Bell size={24} className="text-gray-500" />
              <span className="text-lg font-semibold dark:text-text-primary">Notificações</span>
            </Link>

            <Link to="/cashback" className="flex items-center gap-4 bg-white rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 px-6 py-4 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all">
              <DollarSign size={24} className="text-gray-500" />
              <span className="text-lg font-semibold dark:text-text-primary">Cashback</span>
            </Link>

            <Link to="/favoritos" className="flex items-center gap-4 bg-white rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 px-6 py-4 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all">
              <Heart size={24} className="text-gray-500" />
              <span className="text-lg font-semibold dark:text-text-primary">Meus favoritos</span>
            </Link>

            <button onClick={handleLogout} className="flex items-center gap-4 bg-red-50 dark:bg-red-700/20 p-4 rounded-xl shadow-md border border-red-200 dark:border-red-700/30 hover:bg-red-100 dark:hover:bg-red-700/30 transition-colors">
              <LogOut size={24} />
              <span className="text-lg font-bold text-red-600 dark:text-red-400">Sair da conta</span>
            </button>
          </>
        ) : (
          <p className="text-center">Carregando...</p>
        )}
      </main>
    </div>
  );
};

export default Perfil;