import { ArrowLeft, Gift, Tag, Users, Copy, Share } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Indicacao = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "GELA-GOURMET-92";

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Geladinhos Gourmet',
      text: `Use meu código ${referralCode} e ganhe 5% OFF na primeira compra! Baixe o app: [link]`,
      url: window.location.origin
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('Link copiado para compartilhar!');
      } catch (err) {
        alert('Compartilhe manualmente: ' + shareData.text);
      }
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-text-primary pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center p-4 pb-2 justify-between max-w-md mx-auto lg:max-w-7xl lg:px-6 w-full">
          <Link
            to="/"
            className="flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="text-slate-900 dark:text-text-primary" size={24} />
          </Link>
          <h2 className="text-slate-900 dark:text-text-primary text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">
            Indicação
          </h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto lg:max-w-7xl flex flex-col gap-6 p-4">
        {/* Hero Section */}
        <div className="flex flex-col gap-3">
          <h1 className="text-slate-900 dark:text-text-primary tracking-tight text-[28px] font-extrabold leading-tight max-w-[720px]">
            Indique e Ganhe
          </h1>
          <p className="text-slate-500 dark:text-text-secondary text-base font-normal leading-relaxed max-w-[720px]">
            Aumente seu nível gourmet. Seus amigos ganham desconto na primeira compra e você no seu próximo pedido.
          </p>
        </div>

        {/* Reward Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Card 1 */}
          <div className="flex flex-1 gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark p-4 flex-col shadow-sm">
            <div className="text-primary flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              <Gift size={20} />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-slate-900 dark:text-text-primary text-base font-bold leading-tight">Para você</h2>
              <p className="text-slate-500 dark:text-text-secondary text-sm font-medium leading-normal">10% OFF</p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="flex flex-1 gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark p-4 flex-col shadow-sm">
            <div className="text-slate-500 dark:text-text-primary flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700">
              <Tag size={20} />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-slate-900 dark:text-text-primary text-base font-bold leading-tight">Para eles</h2>
              <p className="text-slate-500 dark:text-text-secondary text-sm font-medium leading-normal">5% OFF</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col gap-3">
          <div className="flex w-full flex-col gap-2 rounded-xl p-5 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-slate-500 dark:text-text-secondary text-sm font-medium uppercase tracking-wider">Total de indicações</p>
              <Users className="text-primary" size={20} />
            </div>
            <div className="flex items-end gap-3">
              <p className="text-slate-900 dark:text-text-primary tracking-tight text-4xl font-black leading-none">12</p>
              <p className="text-green-500 text-sm font-bold leading-normal mb-1 bg-green-500/10 px-2 py-0.5 rounded-full">+2 novas</p>
            </div>
          </div>
        </div>

        {/* Referral Code Input */}
        <div className="flex flex-col gap-2">
          <label className="flex flex-col w-full">
            <p className="text-slate-900 dark:text-text-primary text-base font-bold leading-normal pb-2">Seu código exclusivo</p>
            <div className="group flex w-full flex-1 items-stretch rounded-xl overflow-hidden shadow-sm">
              <input
                className="flex w-full min-w-0 flex-1 resize-none rounded-l-xl text-slate-900 dark:text-text-primary focus:outline-0 focus:ring-2 focus:ring-primary border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-surface-dark h-14 placeholder:text-gray-400 dark:placeholder:text-text-secondary p-[15px] border-r-0 pr-2 text-lg font-mono font-medium leading-normal tracking-wide"
                readOnly
                value={referralCode}
              />
              <button
                onClick={handleCopyCode}
                className="cursor-pointer text-primary hover:text-white hover:bg-primary transition-all flex border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-surface-dark items-center justify-center px-5 rounded-r-xl border-l-0"
              >
                <Copy size={20} />
              </button>
            </div>
            <p className="text-slate-500 dark:text-text-secondary text-xs mt-2">
              {copied ? "Código copiado!" : "Toque no ícone para copiar seu código."}
            </p>
          </label>
        </div>
      </main>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={handleShare}
          className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/20"
        >
          <Share size={20} />
          <span className="truncate">Compartilhar Código</span>
        </button>
      </div>
    </div>
  );
};

export default Indicacao;