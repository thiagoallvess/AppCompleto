import { Menu, Home, ShoppingBag, Users, Settings, BarChart, Package, FileText, LogOut, DollarSign, User, Grid3X3, Receipt, ChefHat, Factory, HelpCircle, Link as LinkIcon, Wallet, AlertTriangle as AlertTriangleIcon, ShoppingCart, Calendar, RefreshCw, Truck, Map, Gift, Bike, TrendingUp, History, UserPlus, Ticket, Store, PlusCircle } from "lucide-react";
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
    { icon: PlusCircle, label: "Venda Manual", path: "/venda-manual" },
    { icon: Map, label: "Monitoramento", path: "/monitoramento" },
    { icon: Receipt, label: "Pedidos", path: "/gestao-pedidos" },
    { icon: Package, label: "Produtos", path: "/gestao-produtos" },
    { icon: ChefHat, label: "Receitas", path: "/gestao-receitas" },
    { icon: Factory, label: "Produção", path: "/gestao-producao" },
    { icon: Package, label: "Estoque/Insumos", path: "/gestao-estoque" },
    { icon: AlertTriangleIcon, label: "Estoque Crítico", path: "/estoque-critico" },
    { icon: ShoppingCart, label: "Lista de Compras", path: "/lista-compras" },
    { icon: TrendingUp, label: "Giro de Estoque", path: "/giro-estoque" },
    { icon: FileText, label: "Relatórios Estoque", path: "/relatorios-estoque" },
    { icon: Ticket, label: "Promoções/Cupons", path: "/gestao-promocoes" },
    { icon: Store, label: "Marketplaces", path: "/gestao-marketplaces" },
    { icon: DollarSign, label: "Despesas", path: "/gestao-despesas" },
    { icon: Factory, label: "Equipamentos", path: "/gestao-equipamentos" },
    { icon: Users, label: "Clientes", path: "/clientes" },
    { icon: UserPlus, label: "Gestão de Entregadores", path: "/gestao-entregadores" },
    { icon: BarChart, label: "Curva ABC", path: "/curva-abc" },
    { icon: FileText, label: "Relatórios", path: "/relatorios" },
    { icon: FileText, label: "DRE Completa", path: "/dre-completa" },
    { icon: Truck, label: "Relatórios Entregadores", path: "/relatorios-entregadores" },
    { icon: Map, label: "Configurações Entrega", path: "/configuracoes-entrega" },
    { icon: Settings, label: "Configurações", path: "/configuracoes-admin" },
    { icon: LinkIcon, label: "Vínculos", path: "/vinculos" },
    { icon: Wallet, label: "Painel Repasses", path: "/painel-repasses" },
  ];

  const deliveryMenuItems = [
    { icon: Bike, label: "Pedidos Disponíveis", path: "/pedidos-entrega" },
    { icon: History, label: "Histórico Entregas", path: "/historico-entregas" },
    { icon: Wallet, label: "Carteira", path: "/carteira-motoboy" },
    { icon: User, label: "Perfil", path: "/perfil-motoboy" },
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
                <p className="text-base font-bold text-gray-900 dark:text-white">Menu</p>
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

          {/* Delivery Section */}
          <div className="px-4 pt-4 pb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Entregador</p>
            <nav className="flex flex-col gap-1">
              {deliveryMenuItems.map((item) => {
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