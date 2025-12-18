import { Home, Search, Heart, User, DollarSign, Gift, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Cashback = () => {
  const cashbackBalance = 12.50;
  const cashbackHistory = [
    {
      id: 1,
      description: "Compra de Morango do Nordeste",
      amount: 0.50,
      date: "Hoje",
      type: "earned"
    },
    {
      id: 2,
      description: "Compra de Trufa Belga",
      amount: 0.75,
      date: "Ontem",
      type: "earned"
    },
    {
      id: 3,
      description: "Resgate de desconto",
      amount: -5.00,
      date: "3 dias atrás",
      type: "spent"
    },
    {
      id: 4,
      description: "Compra de Coco Puro",
      amount: 0.60,
      date: "1 semana atrás",
      type: "earned"
    }
  ];

  const rewards = [
    {
      id: 1,
      title: "Geladinho Grátis",
      description: "Resgate um geladinho de qualquer sabor",
      cost: 15.00,
      available: false
    },
    {
      id: 2,
      title: "Desconto 20%",
      description: "Aplique 20% de desconto na próxima compra",
      cost: 10.00,
      available: true
    },
    {
      id: 3,
      title: "Entrega Grátis",
      description: "Frete grátis na próxima entrega",
      cost: 8.00,
      available: true
    }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-text-primary pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md transition-colors duration-300">
        <div className="flex items-center p-4 justify-center max-w-md mx-auto lg:max-w-none lg:px-6">
          <h1 className="text-slate-900 dark:text-text-primary text-lg font-bold leading-tight tracking-tight">
            Meu Cashback
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto lg:max-w-7xl flex flex-col gap-6 p-4">
        {/* Cashback Balance Card */}
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Saldo Atual</p>
                <p className="text-3xl font-bold">R$ {cashbackBalance.toFixed(2)}</p>
              </div>
              <div className="bg-white/20 rounded-full p-3">
                <DollarSign size={32} className="text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-white/80" />
              <p className="text-white/80 text-sm">Ganhe 5% de cashback em cada compra</p>
            </div>
          </CardContent>
        </Card>

        {/* How to Earn More */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift size={20} />
              Como Ganhar Cashback
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
              <div className="bg-primary/10 rounded-full p-2">
                <DollarSign size={16} className="text-primary" />
              </div>
              <div>
                <p className="font-medium">Compras</p>
                <p className="text-sm text-muted-foreground">Ganhe 5% em cada pedido</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
              <div className="bg-primary/10 rounded-full p-2">
                <Heart size={16} className="text-primary" />
              </div>
              <div>
                <p className="font-medium">Indicações</p>
                <p className="text-sm text-muted-foreground">Ganhe R$ 2 por amigo indicado</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
              <div className="bg-primary/10 rounded-full p-2">
                <TrendingUp size={16} className="text-primary" />
              </div>
              <div>
                <p className="font-medium">Avaliações</p>
                <p className="text-sm text-muted-foreground">Ganhe R$ 0,50 por avaliação</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Rewards */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift size={20} />
              Recompensas Disponíveis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {rewards.map((reward) => (
              <div key={reward.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{reward.title}</p>
                  <p className="text-sm text-muted-foreground">{reward.description}</p>
                  <p className="text-sm font-medium text-primary mt-1">Custa R$ {reward.cost.toFixed(2)}</p>
                </div>
                <Button
                  disabled={!reward.available || cashbackBalance < reward.cost}
                  className="ml-3"
                  size="sm"
                >
                  {reward.available && cashbackBalance >= reward.cost ? "Resgatar" : "Indisponível"}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Cashback History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock size={20} />
              Histórico de Cashback
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {cashbackHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2">
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.description}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={item.type === 'earned' ? 'default' : 'secondary'} className="text-xs">
                    {item.type === 'earned' ? '+' : ''}R$ {item.amount.toFixed(2)}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white/90 dark:bg-surface-dark/90 backdrop-blur-lg pb-safe pt-2">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
          <Link to="/" className="flex flex-col items-center gap-1 w-full text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors">
            <Home size={24} />
            <span className="text-[10px] font-medium">Início</span>
          </Link>
          <button className="flex flex-col items-center gap-1 w-full text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors">
            <Search size={24} />
            <span className="text-[10px] font-medium">Buscar</span>
          </button>
          <button className="flex flex-col items-center gap-1 w-full text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors">
            <Heart size={24} />
            <span className="text-[10px] font-medium">Favoritos</span>
          </button>
          <button className="flex flex-col items-center gap-1 w-full text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors">
            <User size={24} />
            <span className="text-[10px] font-medium">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Cashback;