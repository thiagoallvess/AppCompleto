"use client";

import { useState, useMemo } from "react";
import { ArrowLeft, Plus, Minus, Search, ShoppingCart, Calendar, CreditCard, Banknote, QrCode, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProducts } from "@/contexts/ProductsContext";
import { useMarketplaces } from "@/contexts/MarketplacesContext";
import { useOrders } from "@/contexts/OrdersContext";
import { showSuccess, showError } from "@/utils/toast";

interface SaleItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const VendaManual = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { marketplaces } = useMarketplaces();
  const { addOrder } = useOrders();

  const [selectedOrigin, setSelectedOrigin] = useState("Venda Direta");
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [saleDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const origins = useMemo(() => ["Venda Direta", ...marketplaces.map(m => m.name), "iFood", "WhatsApp", "Evento"], [marketplaces]);

  const filteredProducts = products.filter(p => 
    p.isActive && p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addItem = (product: any) => {
    setSaleItems(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item => 
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { 
        productId: product.id, 
        name: product.name, 
        price: product.price, 
        quantity: 1,
        image: product.image
      }];
    });
    setIsSearching(false);
    setSearchTerm("");
  };

  const updateQuantity = (productId: string, delta: number) => {
    setSaleItems(prev => prev.map(item => {
      if (item.productId === productId) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const total = saleItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleRegisterSale = () => {
    if (saleItems.length === 0) {
      showError("Adicione pelo menos um item à venda.");
      return;
    }

    const orderId = `#M${Math.floor(1000 + Math.random() * 9000)}`;
    
    const newOrder = {
      id: orderId,
      // Salvamos a origem no nome do cliente para a DRE identificar a comissão
      customer: `Venda Manual (${selectedOrigin})`,
      status: "Entregue",
      statusColor: "green",
      statusIcon: "check_circle",
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      total: total,
      items: saleItems.map(item => ({
        quantity: item.quantity,
        name: item.name,
        description: "Venda Manual",
        price: item.price
      })),
      isNew: false,
      section: 'finished' as const,
      date: new Date(saleDate).toLocaleDateString('pt-BR'),
      history: [{ 
        status: "Venda Registrada Manualmente", 
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), 
        date: new Date(saleDate).toLocaleDateString('pt-BR') 
      }]
    };

    addOrder(newOrder);
    showSuccess("Venda registrada com sucesso!");
    navigate("/gestao-pedidos");
  };

  const handleClear = () => {
    setSaleItems([]);
    setSelectedOrigin("Venda Direta");
    setPaymentMethod("pix");
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto w-full">
          <Link to="/visao-geral" className="p-2 -ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-surface-dark transition-colors">
            <X size={24} />
          </Link>
          <h2 className="text-lg font-bold">Nova Venda</h2>
          <button onClick={handleClear} className="text-primary text-sm font-bold hover:opacity-80">
            Limpar
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-32 max-w-4xl mx-auto w-full">
        <section className="p-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Origem da Venda</h3>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {origins.map(origin => (
              <button
                key={origin}
                onClick={() => setSelectedOrigin(origin)}
                className={`flex h-9 shrink-0 items-center justify-center px-4 rounded-full text-sm font-bold transition-all ${
                  selectedOrigin === origin
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
                }`}
              >
                {origin}
              </button>
            ))}
          </div>
        </section>

        <div className="h-px bg-slate-200 dark:bg-slate-800 mx-4"></div>

        <section className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Itens</h3>
            <Button variant="ghost" size="sm" className="text-primary font-bold" onClick={() => setIsSearching(true)}>
              <Plus size={16} className="mr-1" /> Adicionar
            </Button>
          </div>

          <div className="space-y-3">
            {saleItems.map((item) => (
              <div key={item.productId} className="flex items-center gap-4 bg-white dark:bg-surface-dark p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <img src={item.image} alt={item.name} className="size-14 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{item.name}</p>
                  <p className="text-xs text-slate-500">R$ {item.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-3 bg-slate-100 dark:bg-background-dark rounded-full p-1">
                    <button onClick={() => updateQuantity(item.productId, -1)} className="size-7 flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-slate-800 transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, 1)} className="size-7 bg-white dark:bg-slate-700 flex items-center justify-center rounded-full shadow-sm">
                      <Plus size={14} className="text-primary dark:text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {saleItems.length === 0 && !isSearching && (
              <button onClick={() => setIsSearching(true)} className="w-full py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-primary/50 hover:text-primary transition-all">
                <ShoppingCart size={32} />
                <span className="text-sm font-medium">Nenhum item adicionado</span>
                <span className="text-xs font-bold uppercase text-primary">Toque para buscar</span>
              </button>
            )}
          </div>

          {isSearching && (
            <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input autoFocus placeholder="Buscar sabor..." className="pl-10 h-12" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button onClick={() => setIsSearching(false)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <X size={18} />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto no-scrollbar">
                {filteredProducts.map(product => (
                  <button key={product.id} onClick={() => addItem(product)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-left transition-colors">
                    <img src={product.image} className="size-10 rounded object-cover" alt="" />
                    <div className="flex-1">
                      <p className="text-sm font-bold">{product.name}</p>
                      <p className="text-xs text-slate-500">R$ {product.price.toFixed(2)}</p>
                    </div>
                    <Plus size={18} className="text-primary" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        <div className="h-px bg-slate-200 dark:bg-slate-800 mx-4"></div>

        <section className="p-4 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Pagamento e Data</h3>
          <div className="grid grid-cols-3 gap-3">
            {['pix', 'cash', 'card'].map(method => (
              <button key={method} onClick={() => setPaymentMethod(method)} className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${paymentMethod === method ? "bg-primary/10 border-primary text-primary" : "bg-white dark:bg-surface-dark border-transparent text-slate-500"}`}>
                <span className="text-xs font-bold uppercase">{method}</span>
              </button>
            ))}
          </div>
          <Input type="date" className="h-12" value={saleDate} onChange={(e) => setStartDate(e.target.value)} />
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 p-4 pb-8 z-50">
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <p className="text-slate-500 text-sm font-medium">Total da Venda</p>
            <p className="text-2xl font-black">R$ {total.toFixed(2)}</p>
          </div>
          <Button onClick={handleRegisterSale} disabled={saleItems.length === 0} className="w-full h-14 bg-primary hover:bg-blue-600 text-white font-bold text-lg rounded-2xl shadow-lg">
            Registrar Venda
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default VendaManual;