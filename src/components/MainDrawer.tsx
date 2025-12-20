import { Menu, X, Home, ShoppingBag, Users, Settings, BarChart, Package, FileText, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const MainDrawer = () => {
  const menuItems = [
    { icon: Home, label: "Início", path: "/" },
    { icon: ShoppingBag, label: "Meus Pedidos", path: "/meus-pedidos" },
    { icon: Users, label: "Indicação", path: "/indicacao" },
    { icon: Package, label: "Gestão de Produtos", path: "/gestao-produtos" },
    { icon: FileText, label: "Gestão de Receitas", path: "/gestao-receitas" },
    { icon: BarChart, label: "Visão Geral Admin", path: "/visao-geral" },
    { icon: Settings, label: "Configurações", path: "/configuracoes-admin" },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
          <Menu className="text-slate-900 dark:text-white" size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] bg-white dark:bg-surface-dark border-r border-gray-200 dark:border-gray-800">
        <SheetHeader className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <SheetTitle className="text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div>
                <p className="text-base font-bold text-slate-900 dark:text-white">Geladinhos Gourmet</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-normal">Menu Principal</p>
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>
        
        <nav className="flex flex-col gap-2 mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
              >
                <Icon className="text-gray-600 dark:text-gray-400 group-hover:text-primary" size={20} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-0 right-0 px-4">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group w-full">
            <LogOut className="text-gray-600 dark:text-gray-400 group-hover:text-red-500" size={20} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-red-500">
              Sair
            </span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MainDrawer;