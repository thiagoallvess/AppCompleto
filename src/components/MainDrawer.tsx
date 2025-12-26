import { Menu, Home, ShoppingBag, Users, Settings, BarChart, Package, FileText, LogOut, DollarSign, User, Gift, Coins, TrendingUp, Plus, Receipt, ChefHat, Factory, HelpCircle, Link as LinkIcon, Wallet, AlertTriangle, ShoppingCart, Calendar, RefreshCw, Truck, Map } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const MainDrawer = () => {
  const clientMenuItems = [
    { icon: Home, label: "Início", path: "/" },
    { icon: ShoppingBag, label: "Meus Pedidos", path: "/meus-pedidos" },
    { icon: User, label: "Perfil", path: "/perfil" },
    { icon: Gift, label: "Indicação", path: "/indicacao" },
    { icon: DollarSign, label: "Cashback", path: "/cashback" },
  ];

  const adminMenuItems = [
    { icon: BarChart, label: "Visão Geral", path: "/visao-geral" },
    { icon: Map, label: "Monitoramento", path: "/monitoramento" },
    { icon: Receipt, label: "Pedidos", path: "/gestao-pedidos" },
    { icon: Package, label: "Produtos", path: "/gestao-produtos" },
    { icon: Truck, label: "Entregadores", path: "/gestao-entregadores" },
    { icon: BarChart, label: "Relatórios Entregas", path: "/relatorios-entregadores" },
    { icon: LinkIcon, label: "Vínculos", path: "/vinculos" },
    { icon: Plus, label: "Adicionar Produto", path: "/add-produto" },
    { icon: ChefHat, label: "Receitas", path: "/gestao-receitas" },
    { icon: Factory, label: "Produção", path: "/gestao-producao" },
    { icon: Calendar, label: "Previsão de Produção", path: "/previsao-producao" },
    { icon: Package, label: "Estoque/Insumos", path: "/gestao-estoque" },
    { icon: AlertTriangle, label: "Estoque Crítico", path: "/estoque-critico" },
    { icon: RefreshCw, label: "Giro de Estoque", path: "/giro-estoque" },
    { icon: ShoppingCart, label: "Lista de Compras", path: "/lista-compras" },
    { icon: Wallet, label: "Despesas", path: "/gestao-despesas" },
    { icon: Factory, label: "Equipamentos", path: "/gestao-equipamentos" },
    { icon: Users, label: "Clientes", path: "/clientes" },
    { icon: BarChart, label: "Curva ABC", path: "/curva-abc" },
    { icon: FileText, label: "Relatórios", path: "/relatorios" },
    { icon: FileText, label: "Relatórios Estoque", path: "/relatorios-estoque" },
    { icon: Settings, label: "Configurações", path: "/configuracoes-admin" },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
          <Menu className="text-slate-900 dark:text-white" size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] bg-white dark:bg-surface-dark border-r border-gray-200 dark:border-gray-800 p-0">
        <SheetHeader className="border-b border-gray-200 dark:border-gray-800 p-4">
          <SheetTitle className="text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div>
                <p className="text-base font-bold text-slate-900 dark:text-white">Menu</p>
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>
        
        <div className="overflow-y-auto h-[calc(100vh-140px)]">
          {/* Cliente Section */}
          <div className="px-4 pt-4 pb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Cliente</p>
            <nav className="flex flex-col gap-1">
              {clientMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <Icon className="text-gray-600 dark:text-gray-400 group-hover:text-primary" size={20} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Admin Section */}
          <div className="px-4 pt-4 pb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Admin</p>
            <nav className="flex flex-col gap-1">
              {adminMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <Icon className="text-gray-600 dark:text-gray-400 group-hover:text-primary" size={20} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-surface-dark">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group w-full">
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