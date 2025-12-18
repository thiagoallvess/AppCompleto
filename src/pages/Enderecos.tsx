import { ArrowLeft, Search, Home, Work, MapPin, Edit, RadioButtonUnchecked, Delete, Plus, History } from "lucide-react";
import { Link } from "react-router-dom";

const Enderecos = () => {
  const addresses = [
    {
      id: 1,
      type: "home",
      name: "Casa",
      address: "Rua das Flores, 123",
      city: "Centro - São Paulo, SP",
      cep: "01001-000",
      isPrimary: true
    },
    {
      id: 2,
      type: "work",
      name: "Trabalho",
      address: "Av. Paulista, 1000, Sala 42",
      city: "Bela Vista - São Paulo, SP",
      cep: "01310-100",
      isPrimary: false
    },
    {
      id: 3,
      type: "location",
      name: "Casa da Praia",
      address: "Av. Litorânea, 500",
      city: "Boqueirão - Praia Grande, SP",
      cep: "",
      isPrimary: false
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "home":
        return Home;
      case "work":
        return Work;
      default:
        return MapPin;
    }
  };

  const getIconColor = (type: string) => {
    if (type === "home") return "text-primary bg-blue-50 dark:bg-blue-900/20";
    return "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800";
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-background-light dark:bg-background-dark p-4 pb-2 backdrop-blur-md bg-opacity-95 dark:bg-opacity-95 border-b border-gray-200 dark:border-gray-800">
        <Link
          to="/perfil"
          className="flex size-10 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-slate-900 dark:text-white"
        >
          <ArrowLeft size={24} />
        </Link>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Gerenciar Endereços</h2>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-slate-900 dark:text-white">
          <Search size={24} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col px-4 pt-4 gap-4">
        <div className="flex items-center justify-between pt-2">
          <h3 className="text-base font-bold text-slate-800 dark:text-white">Meus Locais</h3>
          <span className="text-xs font-medium text-primary cursor-pointer hover:underline">Ver no mapa</span>
        </div>

        {/* Address Cards */}
        {addresses.map((address) => {
          const IconComponent = getIcon(address.type);
          return (
            <div
              key={address.id}
              className={`group relative flex flex-col gap-4 rounded-xl bg-white dark:bg-surface-dark p-4 shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:border-primary/50 ${
                address.id === 3 ? 'opacity-80' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-4 items-start w-full">
                  <div className={`flex items-center justify-center rounded-lg shrink-0 size-12 ${getIconColor(address.type)}`}>
                    <IconComponent size={24} />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-base font-bold leading-tight truncate">{address.name}</p>
                      {address.isPrimary && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wide border border-primary/20">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                          Principal
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-text-secondary leading-relaxed truncate">{address.address}</p>
                    <p className="text-sm text-gray-500 dark:text-text-secondary leading-relaxed truncate">{address.city}</p>
                    {address.cep && (
                      <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">CEP: {address.cep}</p>
                    )}
                  </div>
                </div>
                <button className="text-gray-400 hover:text-primary transition-colors p-1">
                  <Edit size={20} />
                </button>
              </div>

              {/* Actions for non-primary addresses */}
              {!address.isPrimary && (
                <>
                  <div className="h-px w-full bg-gray-100 dark:bg-gray-700/50"></div>
                  <div className="flex items-center justify-between gap-4">
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-primary transition-colors group-hover:text-slate-600 dark:group-hover:text-slate-300">
                      <RadioButtonUnchecked size={18} />
                      Definir como principal
                    </button>
                    <button className="flex items-center gap-1 text-xs font-medium text-red-500/80 hover:text-red-500 transition-colors">
                      <Delete size={16} />
                      Remover
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}

        {/* History Note */}
        <div className="mt-8 flex flex-col items-center justify-center gap-2 opacity-50">
          <History size={40} className="text-gray-600" />
          <p className="text-sm text-gray-500 text-center max-w-[200px]">Histórico de endereços antigos é apagado automaticamente após 1 ano.</p>
        </div>
      </main>

      {/* Add New Address Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark pt-8">
        <button className="flex w-full cursor-pointer items-center justify-center rounded-xl h-14 bg-primary hover:bg-blue-700 active:scale-[0.98] transition-all text-white gap-2 shadow-lg shadow-primary/25">
          <Plus size={24} />
          <span className="text-base font-bold tracking-wide">Adicionar novo endereço</span>
        </button>
      </div>
    </div>
  );
};

export default Enderecos;