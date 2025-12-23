"use client";

import { ArrowLeft, Link as LinkIcon, Unlink, CheckCircle2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useRecipes } from "@/contexts/RecipesContext";
import { useProducts } from "@/contexts/ProductsContext";
import { Button } from "@/components/ui/button";

const Vinculos = () => {
  const { recipes } = useRecipes();
  const { products } = useProducts();

  // Mapeamento de Receita -> Produto
  const recipeLinks = recipes.map(recipe => {
    const linkedProduct = products.find(p => p.recipeId === recipe.id.toString());
    return {
      recipe,
      product: linkedProduct,
      isLinked: !!linkedProduct
    };
  });

  // Mapeamento de Produto -> Receita
  const productLinks = products.map(product => {
    const linkedRecipe = recipes.find(r => r.id.toString() === product.recipeId);
    return {
      product,
      recipe: linkedRecipe,
      isLinked: !!linkedRecipe
    };
  });

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            to="/visao-geral"
            className="flex items-center justify-center size-10 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Administração</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Vínculos do Sistema</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 space-y-10">
        {/* Seção: Receitas -> Produtos */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <LinkIcon className="text-primary" size={20} />
            <h2 className="text-lg font-bold">Vínculos de Receitas</h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 px-1">
            Verifique quais receitas estão configuradas para atualizar o estoque de um produto automaticamente.
          </p>
          
          <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="px-4 py-3 text-xs font-bold uppercase text-slate-500">Receita</th>
                    <th className="px-4 py-3 text-xs font-bold uppercase text-slate-500">Produto Vinculado</th>
                    <th className="px-4 py-3 text-xs font-bold uppercase text-slate-500 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {recipeLinks.map(({ recipe, product, isLinked }) => (
                    <tr key={recipe.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img src={recipe.image} className="size-8 rounded object-cover" alt="" />
                          <span className="font-medium text-sm">{recipe.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {isLinked ? (
                          <span className="text-sm text-slate-600 dark:text-slate-300">{product?.name}</span>
                        ) : (
                          <span className="text-sm text-slate-400 italic">Nenhum vínculo</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center">
                          {isLinked ? (
                            <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-bold bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                              <CheckCircle2 size={14} /> ATIVO
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 text-xs font-bold bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full">
                              <AlertCircle size={14} /> PENDENTE
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {recipeLinks.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-slate-400 text-sm italic">Nenhuma receita cadastrada.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Seção: Produtos -> Receitas */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Package className="text-primary" size={20} />
            <h2 className="text-lg font-bold">Vínculos de Produtos</h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 px-1">
            Verifique quais produtos do catálogo possuem uma receita base associada.
          </p>
          
          <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="px-4 py-3 text-xs font-bold uppercase text-slate-500">Produto</th>
                    <th className="px-4 py-3 text-xs font-bold uppercase text-slate-500">Receita Vinculada</th>
                    <th className="px-4 py-3 text-xs font-bold uppercase text-slate-500 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {productLinks.map(({ product, recipe, isLinked }) => (
                    <tr key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img src={product.image} className="size-8 rounded object-cover" alt="" />
                          <span className="font-medium text-sm">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {isLinked ? (
                          <span className="text-sm text-slate-600 dark:text-slate-300">{recipe?.name}</span>
                        ) : (
                          <span className="text-sm text-slate-400 italic">Sem receita</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center">
                          {isLinked ? (
                            <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-xs font-bold bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full">
                              <LinkIcon size={14} /> VINCULADO
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-slate-400 text-xs font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                              <Unlink size={14} /> AVULSO
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {productLinks.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-slate-400 text-sm italic">Nenhum produto cadastrado.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div className="pt-4 flex justify-center">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/gestao-produtos">Ir para Gestão de Produtos para ajustar vínculos</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

import { Package } from "lucide-react";
export default Vinculos;