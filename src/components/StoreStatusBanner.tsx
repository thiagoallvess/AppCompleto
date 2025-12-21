import { Store, Clock } from "lucide-react";
import { useStore } from "../contexts/StoreContext";

const StoreStatusBanner = () => {
  const { storeOpen, getCurrentDayHours } = useStore();
  const dayHours = getCurrentDayHours();

  if (!storeOpen) {
    return (
      <div className="mx-4 mt-4 mb-2 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-full bg-red-100 dark:bg-red-800/30 text-red-600 dark:text-red-400 shrink-0">
            <Store size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-red-900 dark:text-red-300">Loja Fechada</p>
            <p className="text-xs text-red-700 dark:text-red-400 mt-0.5">
              Não estamos aceitando pedidos no momento
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-4 mt-4 mb-2 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center size-10 rounded-full bg-green-100 dark:bg-green-800/30 text-green-600 dark:text-green-400 shrink-0">
          <Store size={20} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-green-900 dark:text-green-300">Loja Aberta!</p>
          {dayHours && (
            <p className="text-xs text-green-700 dark:text-green-400 mt-0.5 flex items-center gap-1">
              <Clock size={12} />
              Hoje (Domingo): {dayHours.open} - {dayHours.close}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreStatusBanner;