import { ArrowLeft, Phone, MessageCircle, Mail, ShoppingCart } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const DetalhesCliente = () => {
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get('id');

  // Mock data for different customers - in a real app, this would come from an API
  const customersData = {
    "1": {
      id: "1",
      name: "Maria Silva",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuATnOgwjdatv2PuCBwYZ9_8wozN9Vb8eVEMG9uQMv3p_AyJjWvZ9MJw2-d04bcBFq4Y_4188BM6tgO0H5wM3uqdyLguoJw5_sStCNK1q6t3ufbIQxiR-cYLqZtGmfsUTomFqe2XfiSspGzCVa3_APTZ9rVah6UXJXhcF-Zhnmyh4TKXCPKaNvMUc4fPrE3gceUwe46m-D_GY3AXbc7vEs1Evt_Q_271UyaypBKvfRdnICSdNb3iTzcadPG9-3ZnvxgJuIIEmLQmew",
      status: "VIP",
      statusColor: "yellow",
      registered: "Out/2023",
      email: "maria.silva@email.com",
      phone: "(11) 98765-4321",
      favoriteFlavor: "Ninho com Nutella",
      totalSpent: 450.00,
      ordersCount: 12,
      cashback: 15.50,
      referrals: 3,
      isOnline: true,
      orders: [
        {
          id: "#4829",
          status: "Entregue",
          date: "Hoje, 14:30",
          items: 5,
          total: 45.00
        },
        {
          id: "#4810",
          status: "Entregue",
          date: "10/10",
          items: 12,
          total: 108.00
        }
      ]
    },
    "2": {
      id: "2",
      name: "João Souza",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCO87rE_qgFksEKiShqMAZbbtrOWc3LOlkRp420n15KoVRr7SpctX9clA8IPagAq2rRDKsosshOEDqPZnsGuesHKwjc6-mdqB31_DcGL5jDNkcPQ403xwYQDjLr6F3lBS5eZoDLH95dZUzMkyPrJc8nOVGKkHK3m-wRqj2GeENu79sqzqofFsKKHmTiIE7dXm2rT4rKHZrCVUMm2qSJfR0KjrnvrO_6msa2L7C-WQ95C0LYhQ043xCRmpKYEvyuspov50AjnSGatw",
      status: "Pendente",
      statusColor: "red",
      registered: "Set/2023",
      email: "joao.souza@email.com",
      phone: "(11) 99876-5432",
      favoriteFlavor: "Morango Gourmet",
      totalSpent: 120.00,
      ordersCount: 5,
      cashback: 8.00,
      referrals: 1,
      isOnline: false,
      orders: [
        {
          id: "#4805",
          status: "Entregue",
          date: "Ontem, 09:15",
          items: 3,
          total: 22.50
        }
      ]
    },
    "3": {
      id: "3",
      name: "Bruno Ferreira",
      initials: "BF",
      status: "Novo",
      statusColor: "blue",
      registered: "15/10/2023",
      email: "bruno.ferreira@email.com",
      phone: "(11) 98765-1234",
      favoriteFlavor: "Coco com Doce de Leite",
      totalSpent: 25.00,
      ordersCount: 1,
      cashback: 2.50,
      referrals: 0,
      isOnline: true,
      orders: [
        {
          id: "#4830",
          status: "Entregue",
          date: "15/10/2023",
          items: 2,
          total: 25.00
        }
      ]
    },
    "4": {
      id: "4",
      name: "Carla Dias",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfzIKUXhxlSfDjxkFpISPVb6bsmspsBeD8OV4scHNq8pWTxXnZ6kjE_14EaoddytcaMtDq3g01fBMbuZFNz7LEAgwJ0VgbDIwSqrmF2nAodzjcL59djAIKgtNl_RcLT93rclnnDIrU7bDoEC4cxRyZUXtkoFUn8Fr5NZOpWQfZ8tTnh3RRHIWB2DBev-_CjBXk40wPTD8e0G5JPtDiRMf-eJJWr3lK-XxTfl5Q8BHQzKEyyMq_Aiht-DphW3dfntXgakQSoPaZ-Q",
      status: null,
      registered: "Ago/2023",
      email: "carla.dias@email.com",
      phone: "(11) 97654-3210",
      favoriteFlavor: "Trufa Belga",
      totalSpent: 180.00,
      ordersCount: 8,
      cashback: 12.00,
      referrals: 2,
      isOnline: false,
      orders: [
        {
          id: "#4790",
          status: "Entregue",
          date: "12/10",
          items: 4,
          total: 60.00
        }
      ]
    }
  };

  const customer = customersData[customerId as keyof typeof customersData] || customersData["1"];

  const getStatusColor = (color: string) => {
    switch (color) {
      case "yellow": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "red": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "blue": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      default: return "";
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-6 min-h-screen">
      {/* Header */}
      <header className="flex-none bg-background-light dark:bg-background-dark px-4 pt-4 pb-2 z-10 border-b border-slate-200 dark:border-white/5">
        <div className="flex items-center justify-between h-14">
          <Link
            to="/clientes"
            className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="text-slate-900 dark:text-white" size={24} />
          </Link>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Detalhes do Cliente</h1>
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-primary font-medium text-sm">
            Editar
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark scroll-smooth pb-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center justify-center pt-8 pb-6 bg-white dark:bg-surface-dark border-b border-slate-100 dark:border-white/5 shadow-sm">
          <div className="relative">
            {customer.avatar ? (
              <img
                alt="Profile Picture"
                className="size-28 rounded-full object-cover border-4 border-slate-50 dark:border-white/5 shadow-lg"
                src={customer.avatar}
              />
            ) : (
              <div className="size-28 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 font-bold text-2xl flex items-center justify-center border-4 border-slate-50 dark:border-white/5 shadow-lg">
                {customer.initials}
              </div>
            )}
            {customer.isOnline && (
              <div className="absolute bottom-1 right-1 bg-green-500 size-5 rounded-full border-4 border-white dark:border-surface-dark"></div>
            )}
          </div>
          <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{customer.name}</h2>
          <div className="flex items-center gap-2 mt-1 mb-6">
            {customer.status && (
              <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${getStatusColor(customer.statusColor)}`}>
                {customer.status}
              </span>
            )}
            <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">calendar_month</span>
              Cliente desde {customer.registered}
            </span>
          </div>
          <div className="flex gap-6 w-full px-8 justify-center">
            <button className="flex flex-col items-center gap-1.5 group">
              <div className="flex items-center justify-center size-12 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 group-hover:bg-green-100 group-hover:text-green-600 dark:group-hover:bg-green-900/30 dark:group-hover:text-green-400 transition-colors shadow-sm">
                <Phone size={18} />
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Ligar</span>
            </button>
            <button className="flex flex-col items-center gap-1.5 group">
              <div className="flex flex-col items-center gap-1.5 group">
                <div className="flex items-center justify-center size-12 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 group-hover:bg-green-100 group-hover:text-green-600 dark:group-hover:bg-green-900/30 dark:group-hover:text-green-400 transition-colors shadow-sm">
                  <MessageCircle size={18} />
                </div>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">WhatsApp</span>
              </div>
            </button>
            <button className="flex flex-col items-center gap-1.5 group">
              <div className="flex items-center justify-center size-12 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 group-hover:bg-primary/10 group-hover:text-primary dark:group-hover:bg-primary/20 dark:group-hover:text-primary transition-colors shadow-sm">
                <Mail size={18} />
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Email</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 p-4">
          <div className="p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-white/5 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-slate-400 text-[18px]">payments</span>
              <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Total Gasto</span>
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">R$ {customer.totalSpent.toFixed(2)}</div>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-white/5 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-slate-400 text-[18px]">shopping_bag</span>
              <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Pedidos</span>
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">{customer.ordersCount}</div>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-white/5 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-slate-400 text-[18px]">savings</span>
              <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Cashback</span>
            </div>
            <div className="text-lg font-bold text-green-600 dark:text-green-400">R$ {customer.cashback.toFixed(2)}</div>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-white/5 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-slate-400 text-[18px]">group_add</span>
              <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Indicações</span>
            </div>
            <div className="text-lg font-bold text-primary">{customer.referrals}</div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="px-4 space-y-4">
          <div className="rounded-2xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Informações Pessoais</h3>
            </div>
            <div className="p-4 space-y-5">
              <div className="flex items-start gap-3">
                <div className="size-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center flex-none">
                  <Mail size={18} className="text-slate-500" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-slate-500 dark:text-slate-400">E-mail</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{customer.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="size-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center flex-none">
                  <span className="material-symbols-outlined text-slate-500 text-[18px]">phone_iphone</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Telefone</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{customer.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="size-8 rounded-full bg-pink-50 dark:bg-pink-900/20 flex items-center justify-center flex-none">
                  <span className="material-symbols-filled text-pink-500 dark:text-pink-400 text-[18px]">favorite</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Sabor Favorito</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{customer.favoriteFlavor}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent History */}
          <div className="rounded-2xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex justify-between items-center">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Histórico Recente</h3>
              <button className="text-xs font-medium text-primary hover:text-primary/80">Ver tudo</button>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-white/5">
              {customer.orders.map((order) => (
                <div key={order.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-lg bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400">
                      <span className="material-symbols-outlined">receipt_long</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{order.id}</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 uppercase">Entregue</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{order.date} • {order.items} itens</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">R$ {order.total.toFixed(2)}</span>
                    <span className="material-symbols-outlined text-slate-300 text-[16px] mt-1">chevron_right</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-20">
        <button className="flex items-center justify-center size-14 rounded-full bg-primary text-white shadow-xl hover:bg-primary/90 hover:scale-105 transition-all">
          <ShoppingCart size={28} />
        </button>
      </div>
    </div>
  );
};

export default DetalhesCliente;