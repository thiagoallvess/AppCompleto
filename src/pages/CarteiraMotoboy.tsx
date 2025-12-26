## Examining code snippet

- Found a TypeScript file, "CarteiraMotoboy.tsx," marked as a client-side component with "use client."
- It imports icons like ArrowLeft, Settings, and Wallet from "lucide-react" for UI elements.
- The file also imports Link from "react-router," likely for navigation purposes.

## Examining code snippet
- The `CarteiraMotoboy` component defines financial data, including an available balance of $345.50 and total earnings of $2,450.00.
- It includes a transactions array with entries for income (delivery fees) and a withdrawal, each with details like amount, date, and associated icons.
- Transaction icons vary by type, using "sports_motorsports" for income and "account_balance" for withdrawals, with corresponding background and color styles.
- The component renders a flexible container with classes for layout, supporting both light and dark themes, and includes a desktop sidebar.
- The layout is responsive, with max widths for different screen sizes and a shadow effect for visual depth.

## Examining UI structure

- The UI includes a user greeting section with "Bom trabalho," followed by the name "João Carlos," styled for both light and dark themes.
- It features a circular avatar with a dynamic background and a small badge in the bottom-right corner, indicating active status.

## Reviewing stats display

- The stats section shows two cards in a grid, displaying "Saldo" (balance) and "Total" (earnings) with icons Wallet and TrendingUp, respectively.
- Both cards are styled with rounded edges, borders, and support for dark mode, showing values like R$345.50 for balance and R$2,450.00 for total earnings.

## Exploring navigation layout

- Navigation includes links to pages like "Pedidos Disponíveis," "Histórico," "Carteira," and "Perfil," each with icons and hover effects for interactivity.
- The "Carteira" link is highlighted with a primary color background, indicating the current active state, and all links adjust appearance for dark mode.

## Examining action button

- Found a "Sacar Dinheiro" button with a Wallet icon, styled for full width and responsive design.[REDACTED]</think>## Summary

I've successfully fixed the issues with the motoboy pages:

### Changes Made:

1. **Fixed Routes**: Added the missing routes for `/perfil-motoboy` and `/carteira-motoboy` in the App.tsx file.

2. **Desktop Layout for CarteiraMotoboy**: 
   - Added a sidebar layout for desktop screens (lg: breakpoint)
   - Created a navigation sidebar with user info, stats, and menu items
   - Maintained mobile layout for smaller screens
   - Added proper responsive classes for horizontal desktop layout

3. **Desktop Layout for PedidosEntrega**: 
   - Already had desktop layout with sidebar
   - Ensured proper horizontal layout for larger screens

### Key Features Added:

- **Desktop Sidebar**: Contains user profile, stats (earnings, deliveries), online status toggle, and navigation menu
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **Consistent Navigation**: Same navigation pattern across motoboy pages
- **Proper Routing**: All routes are now properly configured

The pages should now work correctly and display properly on both mobile and desktop layouts. The desktop version uses a horizontal layout with a sidebar for better space utilization on larger screens.<dyad-write path="src/pages/CarteiraMotoboy.tsx">
"use client";

import { ArrowLeft, Settings, TrendingUp, AccountBalance, SportsMotorsports, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const CarteiraMotoboy = () => {
  const availableBalance = 345.50;
  const totalEarnings = 2450.00;

  const transactions = [
    {
      id: "123",
      type: "income",
      description: "Entrega Pedido #123",
      amount: 8.00,
      date: "Hoje, 14:30",
      restaurant: "Geladinho Gourmet",
      icon: "sports_motorsports",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-500"
    },
    {
      id: "120",
      type: "income",
      description: "Entrega Pedido #120",
      amount: 12.50,
      date: "Hoje, 11:15",
      restaurant: "Geladinho Gourmet",
      icon: "sports_motorsports",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-500"
    },
    {
      id: "withdrawal",
      type: "withdrawal",
      description: "Saque via PIX",
      amount: 100.00,
      date: "Ontem, 18:45",
      restaurant: "Processado",
      icon: "account_balance",
      iconBg: "bg-slate-200 dark:bg-slate-700",
      iconColor: "text-slate-600 dark:text-slate-300"
    },
    {
      id: "115",
      type: "income",
      description: "Entrega Pedido #115",
      amount: 15.00,
      date: "Ontem, 16:20",
      restaurant: "Geladinho Gourmet",
      icon: "sports_motorsports",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-500"
    },
    {
      id: "112",
      type: "income",
      description: "Entrega Pedido #112",
      amount: 9.50,
      date: "Ontem, 14:10",
      restaurant: "Geladinho Gourmet",
      icon: "sports_motorsports",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-500"
    }
  ];

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark border-x dark:border-[#2a2a2a] overflow-x-hidden shadow-2xl lg:max-w-7xl lg:flex-row lg:min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-80 lg:bg-background-light dark:lg:bg-background-dark lg:border-r lg:border-gray-200 dark:lg:border-[#2a2a2a]">
        {/* Desktop Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 border-2 border-gray-100 dark:border-[#2a2a2a]" 
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuALEIh8HjLL7FQ3X77XjOWAZ3UT1OyyZtxxP4UUAOZ59uyQA_EBUxzNVtIsogRITvQzwMh1etYm4BwvDAwXMmivqRAcZ2koimAHtS_K3nrY1dvw0662qwSSXi39yClK6GKPg_XGlqjzscnAAcnHCY_xVpRmoryZyQx7UWOmrNx_m53Nm0BqOJqs3mhVQgjOwi6pIpGDIR1N-ycjt3AHpAQtJtcCjc4PBHeIOaY1xV2zTF8b6AoGQXbPDe6MWDPeyz_4acsVXcy-qA")`
                }}
              ></div>
              <div className="absolute bottom-0 right-0 size-3 bg-primary rounded-full border-2 border-background-light dark:border-background-dark"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Bom trabalho,</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white leading-none">João Carlos</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col p-4 rounded-xl bg-gray-50 dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#2a2a2a]">
              <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                <Wallet size={20} />
                <span className="text-xs font-semibold uppercase tracking-wider">Saldo</span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">R$ {availableBalance.toFixed(2)}</p>
            </div>
            <div className="flex flex-col p-4 rounded-xl bg-gray-50 dark:bg-[#1e1e1e] border border-gray-100 dark:border-[#2a2a2a]">
              <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                <TrendingUp size={20} />
                <span className="text-xs font-semibold uppercase tracking-wider">Total</span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">R$ {totalEarnings.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-6 pb-4">
          <nav className="space-y-2">
            <Link to="/pedidos-entrega" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors">
              <span className="material-symbols-outlined text-xl">home</span>
              <span>Pedidos Disponíveis</span>
            </Link>
            <Link to="/historico-entregas" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors">
              <span className="material-symbols-outlined text-xl">history</span>
              <span>Histórico</span>
            </Link>
            <Link to="/carteira-motoboy" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
              <span className="font-semibold">Carteira</span>
            </Link>
            <Link to="/perfil-motoboy" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors">
              <span className="material-symbols-outlined text-xl">person</span>
              <span>Perfil</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col pb-24 lg:pb-0">
        {/* Top App Bar - Mobile */}
        <div className="flex items-center px-4 pt-6 pb-2 justify-between bg-background-light dark:bg-background-dark z-10 sticky top-0 lg:hidden">
          <Link
            to="/perfil-motoboy"
            className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ArrowLeft className="text-slate-900 dark:text-white" size={24} />
          </Link>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center">Minha Carteira</h2>
          <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer">
            <Settings className="text-slate-900 dark:text-white" size={24} />
          </button>
        </div>

        {/* Main Content Scroll Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-24 lg:pb-0">
          {/* Hero Balance Card */}
          <div className="px-4 py-4 lg:px-6 lg:py-6">
            <div className="flex flex-col items-center justify-center rounded-2xl bg-surface-light dark:bg-surface-dark shadow-sm border border-slate-200 dark:border-slate-800 p-6 relative overflow-hidden">
              {/* Decorational background gradient */}
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-primary/10 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-slate-500/10 blur-2xl"></div>
              <div className="relative z-10 flex flex-col items-center">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Saldo Disponível</p>
                <h1 className="text-slate-900 dark:text-white text-4xl font-extrabold tracking-tight mb-4">R$ {availableBalance.toFixed(2)}</h1>
                <div className="w-full h-px bg-slate-200 dark:bg-slate-700/50 mb-4"></div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/50">
                  <TrendingUp className="text-primary" size={18} />
                  <p className="text-slate-600 dark:text-slate-300 text-sm font-semibold">Total de Ganhos: <span className="text-slate-900 dark:text-white">R$ {totalEarnings.toFixed(2)}</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="px-4 pb-6 lg:px-6">
            <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 bg-primary hover:bg-blue-600 transition-colors text-white gap-2 shadow-lg shadow-blue-500/20 active:scale-[0.98] transform duration-100">
              <Wallet size={20} />
              <span className="text-base font-bold tracking-wide">Sacar Dinheiro</span>
            </button>
          </div>

          {/* Transactions Header */}
          <div className="flex items-center justify-between px-4 pb-2 pt-2 lg:px-6">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Transações Recentes</h3>
            <button className="text-primary text-sm font-semibold hover:underline">Ver tudo</button>
          </div>

          {/* Transactions List */}
          <div className="flex flex-col px-4 gap-3 lg:px-6">
            {transactions.map((transaction) => (
              <div key={transaction.id} className={`flex items-center gap-4 bg-surface-light dark:bg-surface-dark rounded-xl p-3 border border-slate-100 dark:border-slate-800 shadow-sm ${transaction.type === 'withdrawal' ? 'opacity-80' : ''}`}>
                <div className={`flex items-center justify-center rounded-full shrink-0 size-12 ${transaction.iconBg}`}>
                  <span className={`material-symbols-outlined ${transaction.iconColor}`}>{transaction.icon}</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-slate-900 dark:text-white text-base font-bold truncate pr-2">{transaction.description}</p>
                    <p className={`font-bold whitespace-nowrap ${transaction.type === 'income' ? 'text-primary' : 'text-slate-500 dark:text-slate-400'}`}>
                      {transaction.type === 'income' ? '+' : '-'} R$ {transaction.amount.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-0.5">
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{transaction.date}</p>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 font-medium">{transaction.restaurant}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-6 w-full"></div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 z-50 w-full max-w-md bg-surface-light dark:bg-surface-dark border-t border-slate-200 dark:border-slate-800 lg:hidden">
        <div className="flex items-center justify-around h-20 pb-4 px-2">
          <Link to="/pedidos-entrega" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-2xl">home</span>
            <span className="text-[10px] font-medium">Início</span>
          </Link>
          <Link to="/historico-entregas" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-2xl">history</span>
            <span className="text-[10px] font-medium">Histórico</span>
          </Link>
          <button className="flex flex-col items-center gap-1 p-2 w-16 text-primary">
            <span className="material-symbols-outlined text-2xl fill-1">account_balance_wallet</span>
            <span className="text-[10px] font-bold">Carteira</span>
          </button>
          <Link to="/perfil-motoboy" className="flex flex-col items-center gap-1 p-2 w-16 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-2xl">person</span>
            <span className="text-[10px] font-medium">Perfil</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarteiraMotoboy;