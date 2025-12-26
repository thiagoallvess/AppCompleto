import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

// Context Providers
import { UserProvider } from './contexts/UserContext';
import { StoreProvider } from './contexts/StoreContext';
import { ProductsProvider } from './contexts/ProductsContext';
import { StockProvider } from './contexts/StockContext';
import { OrdersProvider } from './contexts/OrdersContext';
import { ClientsProvider } from './contexts/ClientsContext';
import { RecipesProvider } from './contexts/RecipesContext';
import { EquipmentProvider } from './contexts/EquipmentContext';
import { ExpensesProvider } from './contexts/ExpensesProvider';
import { DriversProvider } from './contexts/DriversContext';
import { CartProvider } from './contexts/CartContext';

// Pages
import Index from './pages/Index';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import MeusPedidos from './pages/MeusPedidos';
import DetalhesPedidoCliente from './pages/DetalhesPedidoCliente';
import Perfil from './pages/Perfil';
import Cashback from './pages/Cashback';
import Indicacao from './pages/Indicacao';
import VisaoGeral from './pages/VisaoGeral';
import Monitoramento from './pages/Monitoramento';
import GestaoPedidos from './pages/GestaoPedidos';
import DetalhesPedido from './pages/DetalhesPedido';
import GestaoProdutos from './pages/GestaoProdutos';
import AddProduto from './pages/AddProduto';
import GestaoReceitas from './pages/GestaoReceitas';
import AddReceita from './pages/AddReceita';
import EditReceita from './pages/EditReceita';
import DetalhesReceita from './pages/DetalhesReceita';
import GestaoProducao from './pages/GestaoProducao';
import AddProducao from './pages/AddProducao';
import DetalhesLote from './pages/DetalhesLote';
import GestaoEstoque from './pages/GestaoEstoque';
import AddInsumo from './pages/AddInsumo';
import DetalhesInsumo from './pages/DetalhesInsumo';
import EstoqueCritico from './pages/EstoqueCritico';
import ListaCompras from './pages/ListaCompras';
import GiroEstoque from './pages/GiroEstoque';
import RelatoriosEstoque from './pages/RelatoriosEstoque';
import GestaoDespesas from './pages/GestaoDespesas';
import AddDespesa from './pages/AddDespesa';
import GestaoEquipamentos from './pages/GestaoEquipamentos';
import Clientes from './pages/Clientes';
import DetalhesCliente from './pages/DetalhesCliente';
import GestaoEntregadores from './pages/GestaoEntregadores';
import RelatoriosEntregadores from './pages/RelatoriosEntregadores';
import CurvaABC from './pages/CurvaABC';
import PrevisaoProducao from './pages/PrevisaoProducao';
import Relatorios from './pages/Relatorios';
import ConfiguracoesAdmin from './pages/ConfiguracoesAdmin';
import Vinculos from './pages/Vinculos';
import Enderecos from './pages/Enderecos';
import AddEndereco from './pages/AddEndereco';
import EditEndereco from './pages/EditEndereco';
import ProductDetails from './pages/ProductDetails';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <StoreProvider>
          <ProductsProvider>
            <StockProvider>
              <OrdersProvider>
                <ClientsProvider>
                  <RecipesProvider>
                    <EquipmentProvider>
                      <ExpensesProvider>
                        <DriversProvider>
                          <CartProvider>
                            <TooltipProvider>
                              <Router>
                                <Routes>
                                  <Route path="/" element={<Index />} />
                                  <Route path="/cart" element={<Cart />} />
                                  <Route path="/checkout" element={<Checkout />} />
                                  <Route path="/order-success" element={<OrderSuccess />} />
                                  <Route path="/meus-pedidos" element={<MeusPedidos />} />
                                  <Route path="/detalhes-pedido-cliente" element={<DetalhesPedidoCliente />} />
                                  <Route path="/perfil" element={<Perfil />} />
                                  <Route path="/cashback" element={<Cashback />} />
                                  <Route path="/indicacao" element={<Indicacao />} />
                                  <Route path="/visao-geral" element={<VisaoGeral />} />
                                  <Route path="/monitoramento" element={<Monitoramento />} />
                                  <Route path="/gestao-pedidos" element={<GestaoPedidos />} />
                                  <Route path="/detalhes-pedido" element={<DetalhesPedido />} />
                                  <Route path="/gestao-produtos" element={<GestaoProdutos />} />
                                  <Route path="/add-produto" element={<AddProduto />} />
                                  <Route path="/gestao-receitas" element={<GestaoReceitas />} />
                                  <Route path="/add-receita" element={<AddReceita />} />
                                  <Route path="/edit-receita" element={<EditReceita />} />
                                  <Route path="/detalhes-receita" element={<DetalhesReceita />} />
                                  <Route path="/gestao-producao" element={<GestaoProducao />} />
                                  <Route path="/add-producao" element={<AddProducao />} />
                                  <Route path="/detalhes-lote" element={<DetalhesLote />} />
                                  <Route path="/gestao-estoque" element={<GestaoEstoque />} />
                                  <Route path="/add-insumo" element={<AddInsumo />} />
                                  <Route path="/detalhes-insumo" element={<DetalhesInsumo />} />
                                  <Route path="/estoque-critico" element={<EstoqueCritico />} />
                                  <Route path="/lista-compras" element={<ListaCompras />} />
                                  <Route path="/giro-estoque" element={<GiroEstoque />} />
                                  <Route path="/relatorios-estoque" element={<RelatoriosEstoque />} />
                                  <Route path="/gestao-despesas" element={<GestaoDespesas />} />
                                  <Route path="/add-despesa" element={<AddDespesa />} />
                                  <Route path="/gestao-equipamentos" element={<GestaoEquipamentos />} />
                                  <Route path="/clientes" element={<Clientes />} />
                                  <Route path="/detalhes-cliente" element={<DetalhesCliente />} />
                                  <Route path="/gestao-entregadores" element={<GestaoEntregadores />} />
                                  <Route path="/relatorios-entregadores" element={<RelatoriosEntregadores />} />
                                  <Route path="/curva-abc" element={<CurvaABC />} />
                                  <Route path="/previsao-producao" element={<PrevisaoProducao />} />
                                  <Route path="/relatorios" element={<Relatorios />} />
                                  <Route path="/configuracoes-admin" element={<ConfiguracoesAdmin />} />
                                  <Route path="/vinculos" element={<Vinculos />} />
                                  <Route path="/enderecos" element={<Enderecos />} />
                                  <Route path="/add-endereco" element={<AddEndereco />} />
                                  <Route path="/edit-endereco" element={<EditEndereco />} />
                                  <Route path="/product-details" element={<ProductDetails />} />
                                  <Route path="*" element={<NotFound />} />
                                </Routes>
                                <Toaster />
                              </Router>
                            </TooltipProvider>
                          </CartProvider>
                        </DriversProvider>
                      </ExpensesProvider>
                    </EquipmentProvider>
                  </RecipesProvider>
                </ClientsProvider>
              </OrdersProvider>
            </StockProvider>
          </ProductsProvider>
        </StoreProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;