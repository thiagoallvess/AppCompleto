import { ArrowLeft, TrendingUp, Calendar, Package, AlertTriangle, BarChart3, RefreshCw, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/contexts/OrdersContext";
import { useRecipes } from "@/contexts/RecipesContext";
import { useProducts } from "@/contexts/ProductsContext";
import { useStock } from "@/contexts/StockContext";
import { showSuccess } from "@/utils/toast";

const PrevisaoProducao = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const { orders } = useOrders();
  const { recipes } = useRecipes();
  const { products } = useProducts();
  const { ingredients, packagingItems } = useStock();

  // Análise histórica de vendas por receita
  const salesHistory = useMemo(() => {
    const now = new Date();
    const periodDays = selectedPeriod === "week" ? 7 : selectedPeriod === "month" ? 30 : 90;
    const periodStart = new Date(now.getTime() - (periodDays * 24 * 60 * 60 * 1000));

    const productSales = orders
      .filter(order => {
        const orderDate = new Date(order.date);
        return orderDate >= periodStart && !order.cancelled;
      })
      .reduce((acc, order) => {
        order.items.forEach(item => {
          // Vincular item vendido a receita via produto
          const product = products.find(p => p.name === item.name);
          if (product?.recipeId) {
            acc[product.recipeId] = (acc[product.recipeId] || 0) + item.quantity;
          }
        });
        return acc;
      }, {} as Record<string, number>);

    return productSales;
  }, [orders, products, selectedPeriod]);

  // Sugestões de produção baseadas no histórico
  const productionSuggestions = useMemo(() => {
    return Object.entries(salesHistory).map(([recipeId, totalSold]) => {
      const recipe = recipes.find(r => r.id === recipeId);
      if (!recipe) return null;

      const periodDays = selectedPeriod === "week" ? 7 : selectedPeriod === "month" ? 30 : 90;
      const avgDaily = totalSold / periodDays;
      const suggestedProduction = Math.ceil(avgDaily * 1.2); // +20% buffer para demanda variável
      const batchesNeeded = Math.ceil(suggestedProduction / recipe.quantity);

      // Calcular insumos necessários
      const requiredIngredients = recipe.ingredientsList?.map(ing => ({
        name: ing.name,
        required: ing.quantity * batchesNeeded,
        unit: ing.unit
      })) || [];

      const requiredPackaging = recipe.packagingList?.map(pack => ({
        name: pack.name,
        required: pack.quantity * batchesNeeded,
        unit: pack.unit
      })) || [];

      return {
        recipeId,
        recipeName: recipe.name,
        recipeImage: recipe.image,
        totalSold,
        avgDaily,
        suggestedProduction,
        batchesNeeded,
        requiredIngredients,
        requiredPackaging,
        unitCost: recipe.cost || 0,
        totalCost: (recipe.cost || 0) * suggestedProduction
      };
    }).filter(Boolean).sort((a, b) => b.suggestedProduction - a.suggestedProduction);
  }, [salesHistory, recipes, selectedPeriod]);

  // Verificar alertas de estoque para as sugestões
  const stockAlerts = useMemo(() => {
    const alerts = [];

    productionSuggestions.forEach(suggestion => {
      // Verificar ingredientes
      suggestion.requiredIngredients.forEach(ing => {
        const stockItem = ingredients.find(i => i.name === ing.name);
        if (stockItem && ing.required > stockItem.quantity) {
          alerts.push({
            type: 'ingredient',
            name: ing.name,
            required: ing.required,
            available: stockItem.quantity,
            deficit: ing.required - stockItem.quantity,
            recipe: suggestion.recipeName
          });
        }
      });

      // Verificar embalagens
      suggestion.requiredPackaging.forEach(pack => {
        const stockItem = packagingItems.find(p => p.name === pack.name);
        if (stockItem && pack.required > stockItem.quantity) {
          alerts.push({
            type: 'packaging',
            name: pack.name,
            required: pack.required,
            available: stockItem.quantity,
            deficit: pack.required - stockItem.quantity,
            recipe: suggestion.recipeName
          });
        }
      });
    });

    return alerts;
  }, [productionSuggestions, ingredients, packagingItems]);

  const handleRecalculate = () => {
    // Simular recálculo com dados atualizados
    showSuccess("Previsões recalculadas com base nos dados mais recentes!");
  };

  const totalSuggestedProduction = productionSuggestions.reduce((sum, s) => sum + s.suggestedProduction, 0);
  const totalEstimatedCost = productionSuggestions.reduce((sum, s) => sum + s.totalCost, 0);
  const totalAlerts = stockAlerts.length;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            to="/visao-geral"
            className="flex items-center justify-center size-10 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Produção</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Previsão de Produção</h1>
          </div>
        </div>
      </header>

      {/* Period Selector */}
      <div className="px-4 py-6">
        <div className="flex h-12 w-full items-center justify-center rounded-xl bg-gray-200 dark:bg-surface-dark p-1">
          <label className="group flex cursor-pointer h-full flex-1 items-center justify-center rounded-lg px-2 transition-all has-[:checked]:bg-gray-100 dark:has-[:checked]:bg-gray-800 has-[:checked]:shadow-sm has-[:checked]:text-primary">
            <span className="text-sm font-semibold leading-normal">Próxima Semana</span>
            <input className="invisible w-0 h-0 absolute" name="period-filter" type="radio" value="week" checked={selectedPeriod === "week"} onChange={() => setSelectedPeriod("week")} />
          </label>
          <label className="group flex cursor-pointer h-full flex-1 items-center justify-center rounded-lg px-2 transition-all has-[:checked]:bg-gray-100 dark:has-[:checked]:bg-gray-800 has-[:checked]:shadow-sm has-[:checked]:text-primary">
            <span className="text-sm font-semibold leading-normal">Próximo Mês</span>
            <input checked={selectedPeriod === "month"} className="invisible w-0 h-0 absolute" name="period-filter" type="radio" value="month" onChange={() => setSelectedPeriod("month")} />
          </label>
          <label className="group flex cursor-pointer h-full flex-1 items-center justify-center rounded-lg px-2 transition-all has-[:checked]:bg-gray-100 dark:has-[:checked]:bg-gray-800 has-[:checked]:shadow-sm has-[:checked]:text-primary">
            <span className="text-sm font-semibold leading-normal">Próximo Trimestre</span>
            <input checked={selectedPeriod === "quarter"} className="invisible w-0 h-0 absolute" name="period-filter" type="radio" value="quarter" onChange={() => setSelectedPeriod("quarter")} />
          </label>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-3 rounded-xl p-5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm<dyad-write path="src/App.tsx">
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