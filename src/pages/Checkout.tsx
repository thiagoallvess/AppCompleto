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
    <div className="checkout-page font-display antialiased min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#161F2A]/95 backdrop-blur-md border-b border-[#2B323C]">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto lg:max-w-7xl lg:px-6 w-full">
          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="p-1 -ml-2 rounded-full hover:bg-[#2B323C] transition-colors"
            >
              <ArrowLeft className="text-[#A0A0A0]" size={24} />
            </Link>
            <h2 className="text-xl font-bold leading-tight tracking-tight text-[#FFFFFF]">Pagamento</h2>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-md mx-auto lg:max-w-7xl p-4 lg:px-6 pb-32 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order Summary */}
          <Card className="card-background border-[#2B323C]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#FFFFFF]">
                <Truck size={20} className="text-[#A0A0A0]" />
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
                    <h3 className="font-medium text-[#FFFFFF]">{item.name}</h3>
                    <p className="text-sm text-[#A0A0A0]">
                      Quantidade: {item.quantity} × R$ {item.price.toFixed(2)}
                    </p>
                  </div>
                  <span className="font-bold text-[#FFFFFF]">R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <Separator className="bg-[#2B323C]" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#A0A0A0]">Subtotal</span>
                  <span className="text-[#FFFFFF]">R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A0A0A0]">Entrega</span>
                  <span className="text-green-500">R$ {delivery.toFixed(2)}</span>
                </div>
                <Separator className="bg-[#2B323C]" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-[#FFFFFF]">Total</span>
                  <span className="text-[#FFFFFF]">R$ {total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card className="card-background border-[#2B323C]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#FFFFFF]">
                <User size={20} className="text-[#A0A0A0]" />
                Informações do Cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[#FFFFFF]">Nome</Label>
                  <Input id="firstName" placeholder="João" required className="bg-[#2B323C] border-[#2B323C] text-[#FFFFFF] placeholder-[#A0A0A0]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[#FFFFFF]">Sobrenome</Label>
                  <Input id="lastName" placeholder="Silva" required className="bg-[#2B323C] border-[#2B323C] text-[#FFFFFF] placeholder-[#A0A0A0]" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#FFFFFF]">E-mail</Label>
                <Input id="email" type="email" placeholder="joao@email.com" required className="bg-[#2B323C] border-[#2B323C] text-[#FFFFFF] placeholder-[#A0A0A0]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#FFFFFF]">Telefone</Label>
                <Input id="phone" placeholder="(11) 99999-9999" required className="bg-[#2B323C] border-[#2B323C] text-[#FFFFFF] placeholder-[#A0A0A0]" />
              </div>
            </CardContent>
          </Card>

          {/* Delivery Address */}
          <Card className="card-background border-[#2B323C]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#FFFFFF]">
                <MapPin size={20} className="text-[#A0A0A0]" />
                Endereço de Entrega
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-[#FFFFFF]">Endereço</Label>
                <Input id="address" placeholder="Rua das Flores, 123" required className="bg-[#2B323C] border-[#2B323C] text-[#FFFFFF] placeholder-[#A0A0A0]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-[#FFFFFF]">Cidade</Label>
                  <Input id="city" placeholder="São Paulo" required className="bg-[#2B323C] border-[#2B323C] text-[#FFFFFF] placeholder-[#A0A0A0]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode" className="text-[#FFFFFF]">CEP</Label>
                  <Input id="zipCode" placeholder="01234-567" required className="bg-[#2B323C] border-[#2B323C] text-[#FFFFFF] placeholder-[#A0A0A0]" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="complement" className="text-[#FFFFFF]">Complemento (opcional)</Label>
                <Input id="complement" placeholder="Apto 45, bloco B" className="bg-[#2B323C] border-[#2B323C] text-[#FFFFFF] placeholder-[#A0A0A0]" />
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="card-background border-[#2B323C]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#FFFFFF]">
                <CreditCard size={20} className="text-[#A0A0A0]" />
                Forma de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <div className="flex items-center space-x-3 p-4 border border-[#2B323C] rounded-lg hover:bg-[#283645] transition-colors bg-[#2B323C]">
                  <RadioGroupItem value="credit" id="credit" className="border-[#A0A0A0]" />
                  <label htmlFor="credit" className="flex items-center gap-3 cursor-pointer flex-1">
                    <CreditCard size={20} className="text-primary" />
                    <div>
                      <div className="font-medium text-[#FFFFFF]">Cartão de Crédito</div>
                      <div className="text-sm text-[#A0A0A0]">Até 12x sem juros</div>
                    </div>
                  </label>
                </div>
                <div className="flex items-center space-x-3 p-4 border border-[#2B323C] rounded-lg hover:bg-[#283645] transition-colors bg-[#2B323C]">
                  <RadioGroupItem value="debit" id="debit" className="border-[#A0A0A0]" />
                  <label htmlFor="debit" className="flex items-center gap-3 cursor-pointer flex-1">
                    <CreditCard size={20} className="text-blue-500" />
                    <div>
                      <div className="font-medium text-[#FFFFFF]">Cartão de Débito</div>
                      <div className="text-sm text-[#A0A0A0]">Pagamento à vista</div>
                    </div>
                  </label>
                </div>
                <div className="flex items-center space-x-3 p-4 border border-[#2B323C] rounded-lg hover:bg-[#283645] transition-colors bg-[#2B323C]">
                  <RadioGroupItem value="pix" id="pix" className="border-[#A0A0A0]" />
                  <label htmlFor="pix" className="flex items-center gap-3 cursor-pointer flex-1">
                    <Smartphone size={20} className="text-green-500" />
                    <div>
                      <div className="font-medium text-[#FFFFFF]">PIX</div>
                      <div className="text-sm text-[#A0A0A0]">Pagamento instantâneo</div>
                    </div>
                  </label>
                </div>
                <div className="flex items-center space-x-3 p-4 border border-[#2B323C] rounded-lg hover:bg-[#283645] transition-colors bg-[#2B323C]">
                  <RadioGroupItem value="cash" id="cash" className="border-[#A0A0A0]" />
                  <label htmlFor="cash" className="flex items-center gap-3 cursor-pointer flex-1">
                    <Banknote size={20} className="text-yellow-500" />
                    <div>
                      <div className="font-medium text-[#FFFFFF]">Dinheiro</div>
                      <div className="text-sm text-[#A0A0A0]">Pagamento na entrega</div>
                    </div>
                  </label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button type="submit" className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90">
            Finalizar Pedido - R$ {total.toFixed(2)}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Checkout;