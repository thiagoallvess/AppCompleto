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

// Motoboy Pages
import PedidosEntrega from './pages/PedidosEntrega';
import PerfilMotoboy from './pages/PerfilMotoboy';
import CarteiraMotoboy from './pages/CarteiraMotoboy';

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
                                    <Route path="/" element={<Index />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/product-details" element={<ProductDetails />} />

                                    {/* Cliente Routes */}
                                    <Route path="/cart" element={<ProtectedRoute allowedRoles={['cliente', 'admin']}><Cart /></ProtectedRoute>} />
                                    <Route path="/checkout" element={<ProtectedRoute allowedRoles={['cliente', 'admin']}><Checkout /></ProtectedRoute>} />
                                    <Route path="/order-success" element={<ProtectedRoute allowedRoles={['cliente', 'admin']}><OrderSuccess /></ProtectedRoute>} />
                                    <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
                                    <Route path="/meus-pedidos" element={<ProtectedRoute><MeusPedidos /></ProtectedRoute>} />
                                    <Route path="/detalhes-pedido-cliente" element={<ProtectedRoute><DetalhesPedidoCliente /></ProtectedRoute>} />
                                    <Route path="/cashback" element={<ProtectedRoute><Cashback /></ProtectedRoute>} />
                                    <Route path="/indicacao" element={<ProtectedRoute><Indicacao /></ProtectedRoute>} />

                                    {/* Admin Routes */}
                                    <Route path="/visao-geral" element={<ProtectedRoute allowedRoles={['admin']}><VisaoGeral /></ProtectedRoute>} />
                                    <Route path="/gestao-pedidos" element={<ProtectedRoute allowedRoles={['admin']}><GestaoPedidos /></ProtectedRoute>} />
                                    <Route path="/gestao-produtos" element={<ProtectedRoute allowedRoles={['admin']}><GestaoProdutos /></ProtectedRoute>} />
                                    <Route path="/gestao-estoque" element={<ProtectedRoute allowedRoles={['admin']}><GestaoEstoque /></ProtectedRoute>} />
                                    <Route path="/relatorios" element={<ProtectedRoute allowedRoles={['admin']}><Relatorios /></ProtectedRoute>} />

                                    {/* Motoboy Routes */}
                                    <Route path="/pedidos-entrega" element={<ProtectedRoute allowedRoles={['motoboy', 'admin']}><PedidosEntrega /></ProtectedRoute>} />
                                    <Route path="/perfil-motoboy" element={<ProtectedRoute allowedRoles={['motoboy', 'admin']}><PerfilMotoboy /></ProtectedRoute>} />
                                    <Route path="/carteira-motoboy" element={<ProtectedRoute allowedRoles={['motoboy', 'admin']}><CarteiraMotoboy /></ProtectedRoute>} />
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