import { ArrowLeft, CreditCard, Truck, MapPin, User, Smartphone, Banknote, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

const Checkout = () => {
  const { items, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("credit");

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 5.00;
  const total = subtotal + delivery;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle payment processing
    alert("Pagamento processado com sucesso!");
    clearCart();
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-text-primary min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto lg:max-w-7xl lg:px-6 w-full">
          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="p-1 -ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-surface-dark transition-colors"
            >
              <ArrowLeft className="text-gray-500 dark:text-gray-400" size={24} />
            </Link>
            <h2 className="text-xl font-bold leading-tight tracking-tight">Pagamento</h2>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-md mx-auto lg:max-w-7xl p-4 lg:px-6 pb-32 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck size={20} />
                Resumo do Pedido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 bg-center bg-no-repeat bg-cover rounded-lg shadow-inner"
                    style={{
                      backgroundImage: `url("${item.image}")`,
                    }}
                  ></div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Quantidade: {item.quantity} × R$ {item.price.toFixed(2)}
                    </p>
                  </div>
                  <span className="font-bold">R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Entrega</span>
                  <span className="text-green-500">R$ {delivery.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User size={20} />
                Informações do Cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nome</Label>
                  <Input id="firstName" placeholder="João" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <Input id="lastName" placeholder="Silva" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="joao@email.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" placeholder="(11) 99999-9999" required />
              </div>
            </CardContent>
          </Card>

          {/* Delivery Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin size={20} />
                Endereço de Entrega
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" placeholder="Rua das Flores, 123" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" placeholder="São Paulo" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input id="zipCode" placeholder="01234-567" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="complement">Complemento (opcional)</Label>
                <Input id="complement" placeholder="Apto 45, bloco B" />
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard size={20} />
                Forma de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <div className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-surface-dark/50 transition-colors">
                  <RadioGroupItem value="credit" id="credit" />
                  <label htmlFor="credit" className="flex items-center gap-3 cursor-pointer flex-1">
                    <CreditCard size={20} className="text-primary" />
                    <div>
                      <div className="font-medium">Cartão de Crédito</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Até 12x sem juros</div>
                    </div>
                  </label>
                </div>
                <div className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-surface-dark/50 transition-colors">
                  <RadioGroupItem value="debit" id="debit" />
                  <label htmlFor="debit" className="flex items-center gap-3 cursor-pointer flex-1">
                    <CreditCard size={20} className="text-blue-500" />
                    <div>
                      <div className="font-medium">Cartão de Débito</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Pagamento à vista</div>
                    </div>
                  </label>
                </div>
                <div className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-surface-dark/50 transition-colors">
                  <RadioGroupItem value="pix" id="pix" />
                  <label htmlFor="pix" className="flex items-center gap-3 cursor-pointer flex-1">
                    <Smartphone size={20} className="text-green-500" />
                    <div>
                      <div className="font-medium">PIX</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Pagamento instantâneo</div>
                    </div>
                  </label>
                </div>
                <div className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-surface-dark/50 transition-colors">
                  <RadioGroupItem value="cash" id="cash" />
                  <label htmlFor="cash" className="flex items-center gap-3 cursor-pointer flex-1">
                    <Banknote size={20} className="text-yellow-500" />
                    <div>
                      <div className="font-medium">Dinheiro</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Pagamento na entrega</div>
                    </div>
                  </label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button type="submit" className="w-full h-14 text-lg font-bold">
            Finalizar Pedido - R$ {total.toFixed(2)}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Checkout;