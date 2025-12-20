import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Grid3X3,
  Receipt,
  Package,
  Inventory2,
  Settings,
  User,
  BarChart,
  ConveyorBelt,
  MenuBook,
  People,
  Analytics
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  const navigationItems = [
    {
      name: "Visão Geral",
      href: "/visao-geral",
      icon: Grid3X3,
      current: location.pathname === "/visao-geral"
    },
    {
      name: "Pedidos",
      href: "/gestao-pedidos",
      icon: Receipt,
      current: location.pathname === "/gestao-pedidos"
    },
    {
      name: "Produtos",
      href: "/gestao-produtos",
      icon: Package,
      current: location.pathname === "/gestao-produtos"
    },
    {
      name: "Estoque",
      href: "/gestao-insumos",
      icon: Inventory2,
      current: location.pathname === "/gestao-insumos"
    },
    {
      name: "Produção",
      href: "/gestao-producao",
      icon: ConveyorBelt,
      current: location.pathname === "/gestao-producao"
    },
    {
      name: "Receitas",
      href: "/gestao-receitas",
      icon: MenuBook,
      current: location.pathname === "/gestao-receitas"
    },
    {
      name: "Clientes",
      href: "/clientes",
      icon: People,
      current: location.pathname === "/clientes"
    },
    {
      name: "Relatórios",
      href: "/relatorios",
      icon: Analytics,
      current: location.pathname === "/relatorios"
    },
    {
      name: "Configurações",
      href: "/configuracoes-admin",
      icon: Settings,
      current: location.pathname === "/configuracoes-admin"
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0 bg-background-light dark:bg-background-dark">
        <SheetHeader className="p-6 border-b border-slate-200 dark:border-slate-800">
          <SheetTitle className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-slate-900 dark:text-white font-bold">Geladinhos Gourmet</span>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    item.current
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <IconComponent size={20} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
              <User size={16} className="text-slate-600 dark:text-slate-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">Admin</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">admin@gourmet.com</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;