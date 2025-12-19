import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Cashback from "./pages/Cashback";
import Indicacao from "./pages/Indicacao";
import MeusPedidos from "./pages/MeusPedidos";
import DetalhesPedido from "./pages/DetalhesPedido";
import DetalhesPedidoCliente from "./pages/DetalhesPedidoCliente";
import Perfil from "./pages/Perfil";
import Enderecos from "./pages/Enderecos";
import AddEndereco from "./pages/AddEndereco";
import EditEndereco from "./pages/EditEndereco";
import GestaoInsumos from "./pages/GestaoInsumos";
import AddInsumo from "./pages/AddInsumo";
import GestaoProdutos from "./pages/GestaoProdutos";
import AddProduto from "./pages/AddProduto";
import ConfiguracoesAdmin from "./pages/ConfiguracoesAdmin";
import GestaoPedidos from "./pages/GestaoPedidos";
import Relatorios from "./pages/Relatorios";
import Clientes from "./pages/Clientes";
import DetalhesCliente from "./pages/DetalhesCliente";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./contexts/CartContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cashback" element={<Cashback />} />
            <Route path="/indicacao" element={<Indicacao />} />
            <Route path="/meus-pedidos" element={<MeusPedidos />} />
            <Route path="/detalhes-pedido" element={<DetalhesPedido />} />
            <Route path="/detalhes-pedido-cliente" element={<DetalhesPedidoCliente />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/enderecos" element={<Enderecos />} />
            <Route path="/add-endereco" element={<AddEndereco />} />
            <Route path="/edit-endereco" element={<EditEndereco />} />
            <Route path="/gestao-insumos" element={<GestaoInsumos />} />
            <Route path="/add-insumo" element={<AddInsumo />} />
            <Route path="/gestao-produtos" element={<GestaoProdutos />} />
            <Route path="/add-produto" element={<AddProduto />} />
            <Route path="/configuracoes-admin" element={<ConfiguracoesAdmin />} />
            <Route path="/gestao-pedidos" element={<GestaoPedidos />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/detalhes-cliente" element={<DetalhesCliente />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;