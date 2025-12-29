import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { ProductsProvider } from './contexts/ProductsContext';
import { RecipesProvider } from './contexts/RecipesContext';
import { StockProvider } from './contexts/StockContext';
import { OrdersProvider } from './contexts/OrdersContext';
import { ClientsProvider } from './contexts/ClientsContext';
import { DriversProvider } from './contexts/DriversContext';
import { ExpensesProvider } from './contexts/ExpensesProvider';
import { EquipmentProvider } from './contexts/EquipmentContext';
import { StoreProvider } from './contexts/StoreContext';
import { UserProvider } from './contexts/UserContext';
import { PromotionsProvider } from './contexts/PromotionsContext';

// Pages
import Index from './pages/Index';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import ProductDetails from './pages/ProductDetails';
import Perfil from './pages/Perfil';
import Enderecos from './pages/Enderecos';
import AddEndereco from './pages/AddEndereco';
import EditEndereco from './pages/EditEndereco';
import MeusPedidos from './pages/MeusPedidos';
import DetalhesPedidoCliente from './pages/DetalhesPedidoCliente';
import Cashback from './pages/Cashback';
import Indicacao from './pages/Indicacao';
import VisaoGeral from './pages/VisaoGeral';
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
import EditInsumo from './pages/EditInsumo';
import DetalhesInsumo from './pages/DetalhesInsumo';
import EstoqueCritico from './pages/EstoqueCritico';
import ListaCompras from './pages/ListaCompras';
import GiroEstoque from './pages/GiroEstoque';
import RelatoriosEstoque from './pages/RelatoriosEstoque';
import GestaoDespesas from './pages/GestaoDespesas';
import AddDespesa from './pages/AddDespesa';
import GestaoEquipamentos from './pages/GestaoEquipamentos';
import GestaoClientes from './pages/Clientes';
import DetalhesCliente from './pages/DetalhesCliente';
import Relatorios from './pages/Relatorios';
import DRECompleta from './pages/DRECompleta';
import RelatoriosEntregadores from './pages/RelatoriosEntregadores';
import ConfiguracoesEntrega from './pages/ConfiguracoesEntrega';
import ConfiguracoesAdmin from './pages/ConfiguracoesAdmin';
import PedidosEntrega from './pages/PedidosEntrega';
import HistoricoEntregas from './pages/HistoricoEntregas';
import PrevisaoProducao from './pages/PrevisaoProducao';
import Vinculos from './pages/Vinculos';
import Monitoramento from './pages/Monitoramento';
import PerfilMotoboy from './pages/PerfilMotoboy';
import CarteiraMotoboy from './pages/CarteiraMotoboy';
import PainelRepasses from './pages/PainelRepasses';
import GestaoEntregadores from './pages/GestaoEntregadores';
import GestaoPromocoes from './pages/GestaoPromocoes';
import GestaoMarketplaces from './pages/GestaoMarketplaces';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <StoreProvider>
        <UserProvider>
          <CartProvider>
            <ProductsProvider>
              <RecipesProvider>
                <StockProvider>
                  <OrdersProvider>
                    <ClientsProvider>
                      <DriversProvider>
                        <ExpensesProvider>
                          <EquipmentProvider>
                            <PromotionsProvider>
                              <Routes>
                                <Route path="/" element={<Index />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/checkout" element={<Checkout />} />
                                <Route path="/order-success" element={<OrderSuccess />} />
                                <Route path="/product-details" element={<ProductDetails />} />
                                <Route path="/perfil" element={<Perfil />} />
                                <Route path="/enderecos" element={<Enderecos />} />
                                <Route path="/add-endereco" element={<AddEndereco />} />
                                <Route path="/edit-endereco" element={<EditEndereco />} />
                                <Route path="/meus-pedidos" element={<MeusPedidos />} />
                                <Route path="/detalhes-pedido-cliente" element={<DetalhesPedidoCliente />} />
                                <Route path="/cashback" element={<Cashback />} />
                                <Route path="/indicacao" element={<Indicacao />} />
                                <Route path="/visao-geral" element={<VisaoGeral />} />
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
                                <Route path="/edit-insumo" element={<EditInsumo />} />
                                <Route path="/detalhes-insumo" element={<DetalhesInsumo />} />
                                <Route path="/estoque-critico" element={<EstoqueCritico />} />
                                <Route path="/lista-compras" element={<ListaCompras />} />
                                <Route path="/giro-estoque" element={<GiroEstoque />} />
                                <Route path="/relatorios-estoque" element={<RelatoriosEstoque />} />
                                <Route path="/gestao-despesas" element={<GestaoDespesas />} />
                                <Route path="/add-despesa" element={<AddDespesa />} />
                                <Route path="/gestao-equipamentos" element={<GestaoEquipamentos />} />
                                <Route path="/clientes" element={<GestaoClientes />} />
                                <Route path="/detalhes-cliente" element={<DetalhesCliente />} />
                                <Route path="/relatorios" element={<Relatorios />} />
                                <Route path="/dre-completa" element={<DRECompleta />} />
                                <Route path="/relatorios-entregadores" element={<RelatoriosEntregadores />} />
                                <Route path="/configuracoes-entrega" element={<ConfiguracoesEntrega />} />
                                <Route path="/configuracoes-admin" element={<ConfiguracoesAdmin />} />
                                <Route path="/pedidos-entrega" element={<PedidosEntrega />} />
                                <Route path="/historico-entregas" element={<HistoricoEntregas />} />
                                <Route path="/previsao-producao" element={<PrevisaoProducao />} />
                                <Route path="/vinculos" element={<Vinculos />} />
                                <Route path="/monitoramento" element={<Monitoramento />} />
                                <Route path="/perfil-motoboy" element={<PerfilMotoboy />} />
                                <Route path="/carteira-motoboy" element={<CarteiraMotoboy />} />
                                <Route path="/painel-repasses" element={<PainelRepasses />} />
                                <Route path="/gestao-entregadores" element={<GestaoEntregadores />} />
                                <Route path="/gestao-promocoes" element={<GestaoPromocoes />} />
                                <Route path="/gestao-marketplaces" element={<GestaoMarketplaces />} />
                                <Route path="*" element={<NotFound />} />
                              </Routes>
                            </PromotionsProvider>
                          </EquipmentProvider>
                        </ExpensesProvider>
                      </DriversProvider>
                    </ClientsProvider>
                  </OrdersProvider>
                </StockProvider>
              </RecipesProvider>
            </ProductsProvider>
          </CartProvider>
        </UserProvider>
      </StoreProvider>
    </Router>
  );
}

export default App;