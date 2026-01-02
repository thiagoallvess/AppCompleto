import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
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
import { MarketplacesProvider } from './contexts/MarketplacesContext';

// Pages
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import ProductDetails from './pages/ProductDetails';
import Perfil from './pages/Perfil';
import Enderecos from './pages/Enderecos';
import MeusPedidos from './pages/MeusPedidos';
import DetalhesPedidoCliente from './pages/DetalhesPedidoCliente';
import Cashback from './pages/Cashback';
import Indicacao from './pages/Indicacao';

// Admin Pages
import VisaoGeral from './pages/VisaoGeral';
import GestaoPedidos from './pages/GestaoPedidos';
import GestaoProdutos from './pages/GestaoProdutos';
import GestaoEstoque from './pages/GestaoEstoque';
import Relatorios from './pages/Relatorios';
import DetalhesPedido from './pages/DetalhesPedido';
import DetalhesInsumo from './pages/DetalhesInsumo';
import AddInsumo from './pages/AddInsumo';
import EditInsumo from './pages/EditInsumo';
import AddProduto from './pages/AddProduto';
import GestaoReceitas from './pages/GestaoReceitas';
import AddReceita from './pages/AddReceita';
import EditReceita from './pages/EditReceita';
import DetalhesReceita from './pages/DetalhesReceita';
import GestaoProducao from './pages/GestaoProducao';
import AddProducao from './pages/AddProducao';
import DetalhesLote from './pages/DetalhesLote';
import Clientes from './pages/Clientes';
import DetalhesCliente from './pages/DetalhesCliente';
import GestaoEntregadores from './pages/GestaoEntregadores';
import Monitoramento from './pages/Monitoramento';
import RelatoriosEntregadores from './pages/RelatoriosEntregadores';
import ConfiguracoesAdmin from './pages/ConfiguracoesAdmin';
import ConfiguracoesEntrega from './pages/ConfiguracoesEntrega';
import GestaoEquipamentos from './pages/GestaoEquipamentos';
import GestaoPromocoes from './pages/GestaoPromocoes';
import GestaoMarketplaces from './pages/GestaoMarketplaces';
import DRECompleta from './pages/DRECompleta';
import VendaManual from './pages/VendaManual';
import CurvaABC from './pages/CurvaABC';
import GiroEstoque from './pages/GiroEstoque';
import RelatoriosEstoque from './pages/RelatoriosEstoque';
import PrevisaoProducao from './pages/PrevisaoProducao';
import EstoqueCritico from './pages/EstoqueCritico';
import ListaCompras from './pages/ListaCompras';
import Vinculos from './pages/Vinculos';
import PainelRepasses from './pages/PainelRepasses';
import GestaoDespesas from './pages/GestaoDespesas';

// Motoboy Pages
import PedidosEntrega from './pages/PedidosEntrega';
import PerfilMotoboy from './pages/PerfilMotoboy';
import CarteiraMotoboy from './pages/CarteiraMotoboy';
import HistoricoEntregas from './pages/HistoricoEntregas';
import DetalhesSaque from './pages/DetalhesSaque';
import EntregaAndamento from './pages/EntregaAndamento';

function App() {
  return (
    <Router>
      <AuthProvider>
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
                                <MarketplacesProvider>
                                  <Routes>
                                    {/* Public Routes */}
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                      
                                    {/* Public Routes - Accessible without login */}
                                    <Route path="/" element={<ProtectedRoute allowedRoles={['cliente', 'admin', 'motoboy']}><Index /></ProtectedRoute>} />
                                    <Route path="/meus-pedidos" element={<ProtectedRoute allowedRoles={['cliente', 'admin', 'motoboy']}><MeusPedidos /></ProtectedRoute>} />
                                    <Route path="/perfil" element={<ProtectedRoute allowedRoles={['cliente', 'admin', 'motoboy']}><Perfil /></ProtectedRoute>} />
                                    <Route path="/indicacao" element={<ProtectedRoute allowedRoles={['cliente', 'admin', 'motoboy']}><Indicacao /></ProtectedRoute>} />
                                    <Route path="/cashback" element={<ProtectedRoute allowedRoles={['cliente', 'admin', 'motoboy']}><Cashback /></ProtectedRoute>} />
                                    <Route path="/cart" element={<ProtectedRoute allowedRoles={['cliente', 'admin']}><Cart /></ProtectedRoute>} />
                                    <Route path="/product-details" element={<ProtectedRoute allowedRoles={['cliente', 'admin', 'motoboy']}><ProductDetails /></ProtectedRoute>} />
                                    <Route path="/checkout" element={<ProtectedRoute allowedRoles={['cliente', 'admin']}><Checkout /></ProtectedRoute>} />
                                    <Route path="/order-success" element={<ProtectedRoute allowedRoles={['cliente', 'admin']}><OrderSuccess /></ProtectedRoute>} />
                                    <Route path="/enderecos" element={<ProtectedRoute allowedRoles={['cliente', 'admin']}><Enderecos /></ProtectedRoute>} />
                                    <Route path="/detalhes-pedido-cliente" element={<ProtectedRoute allowedRoles={['cliente', 'admin', 'motoboy']}><DetalhesPedidoCliente /></ProtectedRoute>} />

                                    {/* Admin Routes (Acessíveis APENAS por Admin) */}
                                    <Route path="/visao-geral" element={<ProtectedRoute allowedRoles={['admin']}><VisaoGeral /></ProtectedRoute>} />
                                    <Route path="/gestao-pedidos" element={<ProtectedRoute allowedRoles={['admin']}><GestaoPedidos /></ProtectedRoute>} />
                                    <Route path="/detalhes-pedido" element={<ProtectedRoute allowedRoles={['admin']}><DetalhesPedido /></ProtectedRoute>} />
                                    <Route path="/gestao-produtos" element={<ProtectedRoute allowedRoles={['admin']}><GestaoProdutos /></ProtectedRoute>} />
                                    <Route path="/add-produto" element={<ProtectedRoute allowedRoles={['admin']}><AddProduto /></ProtectedRoute>} />
                                    <Route path="/gestao-estoque" element={<ProtectedRoute allowedRoles={['admin']}><GestaoEstoque /></ProtectedRoute>} />
                                    <Route path="/detalhes-insumo" element={<ProtectedRoute allowedRoles={['admin']}><DetalhesInsumo /></ProtectedRoute>} />
                                    <Route path="/add-insumo" element={<ProtectedRoute allowedRoles={['admin']}><AddInsumo /></ProtectedRoute>} />
                                    <Route path="/edit-insumo" element={<ProtectedRoute allowedRoles={['admin']}><EditInsumo /></ProtectedRoute>} />
                                    <Route path="/gestao-receitas" element={<ProtectedRoute allowedRoles={['admin']}><GestaoReceitas /></ProtectedRoute>} />
                                    <Route path="/add-receita" element={<ProtectedRoute allowedRoles={['admin']}><AddReceita /></ProtectedRoute>} />
                                    <Route path="/edit-receita" element={<ProtectedRoute allowedRoles={['admin']}><EditReceita /></ProtectedRoute>} />
                                    <Route path="/detalhes-receita" element={<ProtectedRoute allowedRoles={['admin']}><DetalhesReceita /></ProtectedRoute>} />
                                    <Route path="/gestao-producao" element={<ProtectedRoute allowedRoles={['admin']}><GestaoProducao /></ProtectedRoute>} />
                                    <Route path="/add-producao" element={<ProtectedRoute allowedRoles={['admin']}><AddProducao /></ProtectedRoute>} />
                                    <Route path="/detalhes-lote" element={<ProtectedRoute allowedRoles={['admin']}><DetalhesLote /></ProtectedRoute>} />
                                    <Route path="/clientes" element={<ProtectedRoute allowedRoles={['admin']}><Clientes /></ProtectedRoute>} />
                                    <Route path="/detalhes-cliente" element={<ProtectedRoute allowedRoles={['admin']}><DetalhesCliente /></ProtectedRoute>} />
                                    <Route path="/gestao-entregadores" element={<ProtectedRoute allowedRoles={['admin']}><GestaoEntregadores /></ProtectedRoute>} />
                                    <Route path="/monitoramento" element={<ProtectedRoute allowedRoles={['admin']}><Monitoramento /></ProtectedRoute>} />
                                    <Route path="/relatorios" element={<ProtectedRoute allowedRoles={['admin']}><Relatorios /></ProtectedRoute>} />
                                    <Route path="/relatorios-entregadores" element={<ProtectedRoute allowedRoles={['admin']}><RelatoriosEntregadores /></ProtectedRoute>} />
                                    <Route path="/configuracoes-admin" element={<ProtectedRoute allowedRoles={['admin']}><ConfiguracoesAdmin /></ProtectedRoute>} />
                                    <Route path="/configuracoes-entrega" element={<ProtectedRoute allowedRoles={['admin']}><ConfiguracoesEntrega /></ProtectedRoute>} />
                                    <Route path="/gestao-equipamentos" element={<ProtectedRoute allowedRoles={['admin']}><GestaoEquipamentos /></ProtectedRoute>} />
                                    <Route path="/gestao-promocoes" element={<ProtectedRoute allowedRoles={['admin']}><GestaoPromocoes /></ProtectedRoute>} />
                                    <Route path="/gestao-marketplaces" element={<ProtectedRoute allowedRoles={['admin']}><GestaoMarketplaces /></ProtectedRoute>} />
                                    <Route path="/dre-completa" element={<ProtectedRoute allowedRoles={['admin']}><DRECompleta /></ProtectedRoute>} />
                                    <Route path="/venda-manual" element={<ProtectedRoute allowedRoles={['admin']}><VendaManual /></ProtectedRoute>} />
                                    <Route path="/curva-abc" element={<ProtectedRoute allowedRoles={['admin']}><CurvaABC /></ProtectedRoute>} />
                                    <Route path="/giro-estoque" element={<ProtectedRoute allowedRoles={['admin']}><GiroEstoque /></ProtectedRoute>} />
                                    <Route path="/relatorios-estoque" element={<ProtectedRoute allowedRoles={['admin']}><RelatoriosEstoque /></ProtectedRoute>} />
                                    <Route path="/previsao-producao" element={<ProtectedRoute allowedRoles={['admin']}><PrevisaoProducao /></ProtectedRoute>} />
                                    <Route path="/estoque-critico" element={<ProtectedRoute allowedRoles={['admin']}><EstoqueCritico /></ProtectedRoute>} />
                                    <Route path="/lista-compras" element={<ProtectedRoute allowedRoles={['admin']}><ListaCompras /></ProtectedRoute>} />
                                    <Route path="/vinculos" element={<ProtectedRoute allowedRoles={['admin']}><Vinculos /></ProtectedRoute>} />
                                    <Route path="/painel-repasses" element={<ProtectedRoute allowedRoles={['admin']}><PainelRepasses /></ProtectedRoute>} />

                                    {/* Motoboy Routes (Acessíveis por Motoboy e Admin) */}
                                    <Route path="/pedidos-entrega" element={<ProtectedRoute allowedRoles={['motoboy', 'admin']}><PedidosEntrega /></ProtectedRoute>} />
                                    <Route path="/perfil-motoboy" element={<ProtectedRoute allowedRoles={['motoboy', 'admin']}><PerfilMotoboy /></ProtectedRoute>} />
                                    <Route path="/carteira-motoboy" element={<ProtectedRoute allowedRoles={['motoboy', 'admin']}><CarteiraMotoboy /></ProtectedRoute>} />
                                    <Route path="/historico-entregas" element={<ProtectedRoute allowedRoles={['motoboy', 'admin']}><HistoricoEntregas /></ProtectedRoute>} />
                                    <Route path="/detalhes-saque" element={<ProtectedRoute allowedRoles={['motoboy', 'admin']}><DetalhesSaque /></ProtectedRoute>} />
                                    <Route path="/entrega-andamento" element={<ProtectedRoute allowedRoles={['motoboy', 'admin']}><EntregaAndamento /></ProtectedRoute>} />
                                    <Route path="/gestao-despesas" element={<ProtectedRoute allowedRoles={['admin']}><GestaoDespesas /></ProtectedRoute>} />
                                  </Routes>
                                </MarketplacesProvider>
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
      </AuthProvider>
    </Router>
  );
}

export default App;