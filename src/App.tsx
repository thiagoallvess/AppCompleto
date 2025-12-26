import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { ProductsProvider } from "./contexts/ProductsContext";
import { RecipesProvider } from "./contexts/RecipesContext";
import { StockProvider } from "./contexts/StockContext";
import { ClientsProvider } from "./contexts/ClientsContext";
import { OrdersProvider } from "./contexts/OrdersContext";
import { StoreProvider } from "./contexts/StoreContext";
import { UserProvider } from "./contexts/UserContext";
import { EquipmentProvider } from "./contexts/EquipmentContext";
import { ExpensesProvider } from "./contexts/ExpensesProvider";

// Pages
import Index from "./pages/Index";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Perfil from "./pages/Perfil";
import Cashback from "./pages/Cashback";
import MeusPedidos from "./pages/MeusPedidos";
import DetalhesPedidoCliente from "./pages/DetalhesPedidoCliente";
import Indicacao from "./pages/Indicacao";
import VisaoGeral from "./pages/VisaoGeral";
import GestaoPedidos from "./pages/GestaoPedidos";
import DetalhesPedido from "./pages/DetalhesPedido";
import GestaoProdutos from "./pages/GestaoProdutos";
import AddProduto from "./pages/AddProduto";
import GestaoReceitas from "./pages/GestaoReceitas";
import AddReceita from "./pages/AddReceita";
import EditReceita from "./pages/EditReceita";
import GestaoProducao from "./pages/GestaoProducao";
import AddProducao from "./pages/AddProducao";
import DetalhesLote from "./pages/DetalhesLote";
import GestaoEstoque from "./pages/GestaoEstoque";
import GestaoEquipamentos from "./pages/GestaoEquipamentos";
import GestaoDespesas from "./pages/GestaoDespesas";
import AddDespesa from "./pages/AddDespesa";
import GestaoEntregadores from "./pages/GestaoEntregadores";
import Monitoramento from "./pages/Monitoramento";
import RelatoriosEntregadores from "./pages/RelatoriosEntregadores";
import PedidosEntrega from "./pages/PedidosEntrega";
import ConfiguracoesEntrega from "./pages/ConfiguracoesEntrega";
import ConfiguracoesAdmin from "./pages/ConfiguracoesAdmin";
import RelatoriosEstoque from "./pages/RelatoriosEstoque";
import GiroEstoque from "./pages/GiroEstoque";
import ListaCompras from "./pages/ListaCompras";
import AlertasReposicao from "./pages/AlertasReposicao";
import EstoqueCritico from "./pages/EstoqueCritico";
import DetalhesInsumo from "./pages/DetalhesInsumo";
import AddInsumo from "./pages/AddInsumo";
import EditInsumo from "./pages/EditInsumo";
import DetalhesProduto from "./pages/ProductDetails";
import DetalhesCliente from "./pages/DetalhesCliente";
import Clientes from "./pages/Clientes";
import DetalhesReceita from "./pages/DetalhesReceita";
import Vinculos from "./pages/Vinculos";
import CurvaABC from "./pages/CurvaABC";
import PrevisaoProducao from "./pages/PrevisaoProducao";
import Relatorios from "./pages/Relatorios";
import NotFound from "./pages/NotFound";
import Enderecos from "./pages/Enderecos";
import AddEndereco from "./pages/AddEndereco";
import EditEndereco from "./pages/EditEndereco";

function App() {
  return (
    <Router>
      <StoreProvider>
        <UserProvider>
          <CartProvider>
            <ProductsProvider>
              <RecipesProvider>
                <StockProvider>
                  <ClientsProvider>
                    <OrdersProvider>
                      <EquipmentProvider>
                        <ExpensesProvider>
                          <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/order-success" element={<OrderSuccess />} />
                            <Route path="/perfil" element={<Perfil />} />
                            <Route path="/cashback" element={<Cashback />} />
                            <Route path="/meus-pedidos" element={<MeusPedidos />} />
                            <Route path="/detalhes-pedido-cliente" element={<DetalhesPedidoCliente />} />
                            <Route path="/indicacao" element={<Indicacao />} />
                            <Route path="/visao-geral" element={<VisaoGeral />} />
                            <Route path="/gestao-pedidos" element={<GestaoPedidos />} />
                            <Route path="/detalhes-pedido" element={<DetalhesPedido />} />
                            <Route path="/gestao-produtos" element={<GestaoProdutos />} />
                            <Route path="/add-produto" element={<AddProduto />} />
                            <Route path="/gestao-receitas" element={<GestaoReceitas />} />
                            <Route path="/add-receita" element={<AddReceita />} />
                            <Route path="/edit-receita" element={<EditReceita />} />
                            <Route path="/gestao-producao" element={<GestaoProducao />} />
                            <Route path="/add-producao" element={<AddProducao />} />
                            <Route path="/detalhes-lote" element={<DetalhesLote />} />
                            <Route path="/gestao-estoque" element={<GestaoEstoque />} />
                            <Route path="/gestao-equipamentos" element={<GestaoEquipamentos />} />
                            <Route path="/gestao-despesas" element={<GestaoDespesas />} />
                            <Route path="/add-despesa" element={<AddDespesa />} />
                            <Route path="/gestao-entregadores" element={<GestaoEntregadores />} />
                            <Route path="/monitoramento" element={<Monitoramento />} />
                            <Route path="/relatorios-entregadores" element={<RelatoriosEntregadores />} />
                            <Route path="/pedidos-entrega" element={<PedidosEntrega />} />
                            <Route path="/configuracoes-entrega" element={<ConfiguracoesEntrega />} />
                            <Route path="/configuracoes-admin" element={<ConfiguracoesAdmin />} />
                            <Route path="/relatorios-estoque" element={<RelatoriosEstoque />} />
                            <Route path="/giro-estoque" element={<GiroEstoque />} />
                            <Route path="/lista-compras" element={<ListaCompras />} />
                            <Route path="/alertas-reposicao" element={<AlertasReposicao />} />
                            <Route path="/estoque-critico" element={<EstoqueCritico />} />
                            <Route path="/detalhes-insumo" element={<DetalhesInsumo />} />
                            <Route path="/add-insumo" element={<AddInsumo />} />
                            <Route path="/edit-insumo" element={<EditInsumo />} />
                            <Route path="/product-details" element={<DetalhesProduto />} />
                            <Route path="/detalhes-cliente" element={<DetalhesCliente />} />
                            <Route path="/clientes" element={<Clientes />} />
                            <Route path="/detalhes-receita" element={<DetalhesReceita />} />
                            <Route path="/vinculos" element={<Vinculos />} />
                            <Route path="/curva-abc" element={<CurvaABC />} />
                            <Route path="/previsao-producao" element={<PrevisaoProducao />} />
                            <Route path="/relatorios" element={<Relatorios />} />
                            <Route path="/enderecos" element={<Enderecos />} />
                            <Route path="/add-endereco" element={<AddEndereco />} />
                            <Route path="/edit-endereco" element={<EditEndereco />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </ExpensesProvider>
                      </EquipmentProvider>
                    </OrdersProvider>
                  </ClientsProvider>
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