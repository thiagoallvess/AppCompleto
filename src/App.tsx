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
import GestaoProdutos from "./pages/GestaoProdutos";
import AddProduto from "./pages/AddProduto";
import ConfiguracoesAdmin from "./pages/ConfiguracoesAdmin";
import GestaoPedidos from "./pages/GestaoPedidos";
import Relatorios from "./pages/Relatorios";
import Clientes from "./pages/Clientes";
import DetalhesCliente from "./pages/DetalhesCliente";
import VisaoGeral from "./pages/VisaoGeral";
import GestaoReceitas from "./pages/GestaoReceitas";
import AddReceita from "./pages/AddReceita";
import EditReceita from "./pages/EditReceita";
import DetalhesReceita from "./pages/DetalhesReceita";
import GestaoProducao from "./pages/GestaoProducao";
import AddProducao from "./pages/AddProducao";
import DetalhesLote from "./pages/DetalhesLote";
import CurvaABC from "./pages/CurvaABC";
import GestaoEstoque from "./pages/GestaoEstoque";
import DetalhesInsumo from "./pages/DetalhesInsumo";
import AddInsumo from "./pages/AddInsumo";
import GestaoEquipamentos from "./pages/GestaoEquipamentos";
import GestaoDespesas from "./pages/GestaoDespesas";
import AddDespesa from "./pages/AddDespesa";
import Vinculos from "./pages/Vinculos";
import AlertasReposicao from "./pages/AlertasReposicao";
import ListaCompras from "./pages/ListaCompras";
import PrevisaoProducao from "./pages/PrevisaoProducao";
import EstoqueCritico from "./pages/EstoqueCritico";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./contexts/CartContext";
import { StoreProvider } from "./contexts/StoreContext";
import { ProductsProvider } from "./contexts/ProductsContext";
import { OrdersProvider } from "./contexts/OrdersContext";
import { ClientsProvider } from "./contexts/ClientsContext";
import { RecipesProvider } from "./contexts/RecipesContext";
import { StockProvider } from "./contexts/StockContext";
import { EquipmentProvider } from "./contexts/EquipmentContext";
import { ExpensesProvider } from "./contexts/ExpensesProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <StoreProvider>
      <ProductsProvider>
        <StockProvider>
          <OrdersProvider>
            <ClientsProvider>
              <RecipesProvider>
                <EquipmentProvider>
                  <ExpensesProvider>
                    <CartProvider>
                      <TooltipProvider>
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
                            <Route path="/gestao-estoque" element={<GestaoEstoque />} />
                            <Route path="/add-insumo" element={<AddInsumo />} />
                            <Route path="/detalhes-insumo" element={<DetalhesInsumo />} />
                            <Route path="/gestao-produtos" element={<GestaoProdutos />} />
                            <Route path="/add-produto" element={<AddProduto />} />
                            <Route path="/configuracoes-admin" element={<ConfiguracoesAdmin />} />
                            <Route path="/gestao-pedidos" element={<GestaoPedidos />} />
                            <Route path="/relatorios" element={<Relatorios />} />
                            <Route path="/clientes" element={<Clientes />} />
                            <Route path="/detalhes-cliente" element={<DetalhesCliente />} />
                            <Route path="/visao-geral" element={<VisaoGeral />} />
                            <Route path="/gestao-receitas" element={<GestaoReceitas />} />
                            <Route path="/add-receita" element={<AddReceita />} />
                            <Route path="/edit-receita" element={<EditReceita />} />
                            <Route path="/detalhes-receita" element={<DetalhesReceita />} />
                            <Route path="/gestao-producao" element={<GestaoProducao />} />
                            <Route path="/add-producao" element={<AddProducao />} />
                            <Route path="/detalhes-lote" element={<DetalhesLote />} />
                            <Route path="/curva-abc" element={<CurvaABC />} />
                            <Route path="/gestao-equipamentos" element={<GestaoEquipamentos />} />
                            <Route path="/gestao-despesas" element={<GestaoDespesas />} />
                            <Route path="/add-despesa" element={<AddDespesa />} />
                            <Route path="/vinculos" element={<Vinculos />} />
                            <Route path="/alertas-reposicao" element={<AlertasReposicao />} />
                            <Route path="/lista-compras" element={<ListaCompras />} />
                            <Route path="/previsao-producao" element={<PrevisaoProducao />} />
                            <Route path="/estoque-critico" element={<EstoqueCritico />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </BrowserRouter>
                        <Toaster />
                        <Sonner />
                      </TooltipProvider>
                    </CartProvider>
                  </ExpensesProvider>
                </EquipmentProvider>
              </RecipesProvider>
            </ClientsProvider>
          </OrdersProvider>
        </StockProvider>
      </ProductsProvider>
    </StoreProvider>
  </QueryClientProvider>
);

export default App;