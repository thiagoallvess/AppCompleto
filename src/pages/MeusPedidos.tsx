import { ArrowLeft, Receipt, Clock, CheckCircle, XCircle, Star, RotateCcw, HelpCircle, Home, Search, User } from "lucide-react";
import { Link } from "react-router-dom";

const MeusPedidos = () => {
  const orders = [
    {
      id: "1234",
      status: "A Caminho",
      statusColor: "blue",
      date: "Hoje, 14:30",
      items: "2x Ninho com Nutella, 1x Morango Gourmet, 1x Maracujá",
      itemCount: 4,
      total: 32.00,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCM6J9kuR4cOh8UXIW26pv-fPK3cG9jQCzURHy7AV7t8Arw9q1NoBye9wKKB8WXufd8tzM4G1BAZ9JvwhrwDX9YLZolz40iRUA9AzzFuIaZSbYsO6Vmo9xMOil91XsmiJaxBoFlaD1iQ9JVIfHkUNsbsdoRyqW82u5BLzsgxfxTtDTMmZSfAbz7KzFJGKROwBtkcrp8pvM0jqSfYcv8pKpx4xRgAVi5VHAM-MtKHIV_WCsKjLr2rHnMeUX4m_HOr7kgJC5OA2ZUEA",
      eta: "Chega em 15-20 min",
      action: "Rastrear",
      isActive: true
    },
    {
      id: "1102",
      status: "Entregue",
      statusColor: "gray",
      date: "10/10/2023",
      items: "3x Limão Siciliano, 2x Chocolate Belga",
      itemCount: 5,
      total: 38.50,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCP_m7KaKD21V6E1B_c0sItWR_KDl4JSnIrE-BScmbxUcOukdTbHnQw405xnMAWitsksiODcGE5o-Dr8wXMGrcoToHYwgMvGjYm0xtxT5ICWvbPgHMwC1vUeWP2Aq2EMlJ54eg83m4USThEj7DyaN5ooKvNnAn_wND5tt192FTxsb5-cFQ0vR7i2DivW_VlDhPFMEnWH2Lktl9T7r9kBv5Da5WVPomxWnlhtEnbkuY33lb9b82h18mLt9buFArHNWEL96mJkKuRqQ",
      action: "Pedir novamente",
      rating: null
    },
    {
      id: "0988",
      status: "Entregue",
      statusColor: "gray",
      date: "25/09/2023",
      items: "1x Coco com Doce de Leite, 1x Paçoca",
      itemCount: 2,
      total: 16.00,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG7Uj02VQJ-qhcbTCnesEG4gD3UInDA4rNayZup2RLN2_bQCfTnVNR_l-DTdXOBvhL9WAaX87UftAK2U7sB2U6JTa7r8wpWfiDPIEbAtGGvQ-5CrecYaZuuD9l1b4s01XjoNpc5t9qaYh4dzSCTxZXGQq2UVC2yLgyUnmioy-w9jEP6S31faZwIlo68d951DTN_-oos0ZbKhyHyEGxSHXFfW4gxKyg2e9ICHwtS3Beq_3-2wSvZVjYKvOLPZI2_nP6TbsWYvi__Q",
      action: "Pedir novamente",
      rating: 4.8
    },
    {
      id: "0845",
      status: "Cancelado",
      statusColor: "red",
      date: "12/08/2023",
      items: "4x Morango com Leite Condensado",
      itemCount: 4,
      total: 28.00,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKSeegtc1WHv61uN6BonhkxNT-hRmAzqvIXa7Pljzqpy4ynTe3sU9afaW15RbEgEqXnUaxh_hQ-vzORiim_pyLBLNaLcDpFYpajhWwGrwd0nobdJcQAqUZfwzXpNeuxTfAi6K6aCK1WtILpgK_E4JxjfjhoHvH4yb6emo8hN1v2hMvj12_DsLgMEuLKy7lh0A5ydsxj0EQsJHrLlehbqmwo3NsiWl5vq7may3QA6nBZ8xQPvCuR_UwfI4VmSorxXwazg08m7hZAg",
      action: "Ajuda",
      cancelled: true
    }
  ];

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
          <h1 className="text-slate-900 dark:text-text-primary text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">
            Meus Pedidos
          </h1>
        </div>
      </header>

      {/* Filter Chips */}
      <div className="sticky top-[60px] z-40 w-full overflow-x-auto bg-background-light dark:bg-background-dark py-4 px-4 no-scrollbar border-b border-transparent dark:border-gray-800">
        <div className="flex gap-3 min-w-max">
          {/* Active Chip */}
          <button className="flex h-9 items-center justify-center rounded-full bg-primary px-5 shadow-lg shadow-primary/20 transition-transform active:scale-95">
            <span className="text-sm font-medium text-white">Todos</span>
          </button>
          {/* Inactive Chips */}
          <button className="flex h-9 items-center justify-center rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 px-5 transition-transform active:scale-95 hover:bg-gray-50 dark:hover:bg-gray-800">
            <span className="text-sm font-medium text-gray-600 dark:text-text-secondary">Em Preparo</span>
          </button>
          <button className="flex h-9 items-center justify-center rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 px-5 transition-transform active:scale-95 hover:bg-gray-50 dark:hover:bg-gray-800">
            <span className="text-sm font-medium text-gray-600 dark:text-text-secondary">A Caminho</span>
          </button>
          <button className="flex h-9 items-center justify-center rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 px-5 transition-transform active:scale-95 hover:bg-gray-50 dark:hover:bg-gray-800">
            <span className="text-sm font-medium text-gray-600 dark:text-text-secondary">Entregue</span>
          </button>
        </div>
      </div>

      {/* Orders List */}
      <main className="flex-1 px-4 pb-24 pt-2 max-w-md mx-auto lg:max-w-7xl">
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              to="/detalhes-pedido"
              className="block"
            >
              <article
                className={`group relative overflow-hidden rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 p-4 transition-all hover:border-primary/50 dark:hover:border-primary/50 cursor-pointer ${
                  order.cancelled ? 'opacity-75 hover:opacity-100' : ''
                }`}
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      order.statusColor === 'blue' ? 'bg-blue-100 dark:bg-primary/20 text-primary dark:text-blue-200' :
                      order.statusColor === 'red' ? 'bg-red-100 dark:bg-red-900/20 text-red-500 dark:text-red-400' :
                      'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}>
                      {order.status === 'A Caminho' && <div className="h-1.5 w-1.5 rounded-full bg-primary dark:bg-blue-400 animate-pulse"></div>}
                      {order.status}
                    </span>
                    <p className="mt-2 text-xs font-medium text-gray-500 dark:text-text-secondary">Pedido #{order.id} • {order.date}</p>
                  </div>
                  <ArrowLeft className="text-gray-400 dark:text-text-secondary rotate-180" size={20} />
                </div>
                <div className="flex gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                    <img
                      src={order.image}
                      alt={order.items}
                      className={`h-full w-full object-cover ${order.cancelled ? 'grayscale opacity-50' : ''}`}
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-0.5">
                    <div>
                      <h3 className={`line-clamp-2 text-sm font-medium leading-snug ${
                        order.cancelled ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
                      }`}>
                        {order.items}
                      </h3>
                    </div>
                    <div className="flex items-end justify-between">
                      <p className="text-sm text-gray-500 dark:text-text-secondary">{order.itemCount} itens</p>
                      <p className={`text-base font-bold ${order.cancelled ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                        R$ {order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-3 flex justify-between items-center">
                  <span className="text-xs text-gray-500 dark:text-text-secondary flex items-center gap-1">
                    {order.isActive && <Clock size={14} />}
                    {order.rating && <Star size={14} className="text-yellow-500 fill-current" />}
                    {order.cancelled && "Cancelado pelo usuário"}
                    {order.eta && order.eta}
                    {order.rating && `${order.rating}`}
                  </span>
                  <button className={`text-sm font-semibold ${
                    order.cancelled ? 'text-gray-600 dark:text-gray-300 hover:text-primary' :
                    order.isActive ? 'text-primary hover:text-primary/80' :
                    'text-gray-600 dark:text-gray-300 hover:text-primary'
                  }`}>
                    {order.action}
                  </button>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg pb-safe">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto lg:max-w-none lg:px-6">
          <Link to="/" className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <Home size={24} />
            <span className="text-[10px] font-medium">Início</span>
          </Link>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <Search size={24} />
            <span className="text-[10px] font-medium">Buscar</span>
          </button>
          <button className="flex flex-col items-center justify-center w-full h-full text-primary space-y-1">
            <Receipt size={24} />
            <span className="text-[10px] font-medium">Pedidos</span>
          </button>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <Heart size={24} />
            <span className="text-[10px] font-medium">Favoritos</span>
          </button>
          <Link to="/perfil" className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <User size={24} />
            <span className="text-[10px] font-medium">Perfil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MeusPedidos;