import { ArrowLeft, Heart, Star, Minus, Plus, Info } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";

const ProductDetails = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id');
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const products = [
    {
      id: 'morango-nordeste',
      name: 'Morango do Nordeste',
      price: 5.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQJMZDkn5s2Q1Rhu7VTT0wSbpu0Zs2136hUamFu3BKQVuVxBYqmKfH536oC5A6GdhLNWW4d1969s1kG6Ls7kvpSWoUspr5Fuj8dyZGJ4PD7EMMXpJ_PPxtQh65cra50RKLF_NdMNiXBiDXDJnu0grwaF4pBkZGWF6nJi1cxo0vD9NzqnzvF4uofppwoWVyz0YP8VYPnbnueXZdTm401ZQF_B-qNF4fCtm7TQHb-fMOHEiGp-FoBNbKl2Lnst7IIgnMCMOoitX7Bw',
      description: 'Uma combinação cremosa de pedaços reais de morango do nordeste com água de coco fresca. Refrescante e natural, feito com frutas selecionadas.',
      ingredients: ['Morango', 'Água de Coco', 'Açúcar'],
      rating: 4.8,
      reviews: 120,
      warnings: 'Contém lactose e frutas. Pode conter traços de amendoim.'
    },
    {
      id: 'trufa-belga',
      name: 'Trufa Belga',
      price: 7.50,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBus_8lGRett6zFf-4fJSGldJ0STWFEBw_SZekfBqNyynVNaF4_WfGunFT5v6pWRrj9Pzhsd61_G02tUFdYTkYIFdLW6PC2p5u4tRg33ImZbPqGATzcYXfZBaf3LSZFAWMLZYzu7yPTQFP4_fpbq7jajeIOqhencVB0NOcy9h5Wj5iitogBDGF1VM5gVdeVIfeSEcCQiScnF4HZBGdQkaeTxGTJYQgHSGDMTK02POz4eov40OlLEWZxBYwCvktcnawn6WXisLBeQ',
      description: 'Chocolate belga 70% cacau com um recheio de ganache cremoso. Intenso e sofisticado, perfeito para os amantes de chocolate.',
      ingredients: ['Chocolate 70%', 'Ganache', 'Creme de Leite'],
      rating: 4.9,
      reviews: 85,
      warnings: 'Contém lactose e cacau. Pode conter traços de amendoim.'
    },
    {
      id: 'coco-puro',
      name: 'Coco Puro',
      price: 6.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYiu7ZJdFq90OvDRaoPkf5fEtK5ccvx5kSeRWpJRtIUqya8o6rgneU4E7-AXsnmk9hbopLSGiKYvUGig4LbbrLXjBBF44tQDuacjFT6Tj2AWl5i1cFRcAyGDXlOoITqEZGyBmUlmwu-7VOAilZSUw_jZFDFafa3DlQGenUdVsh120uhLW8CjBPrzXV2uofK17BsO1UcH7cZFsimmzRJRbXdntZgdmO52bxy8TA00MudEggA9q5bcEEhW6BbSNNGOvnUtD0rUeshA',
      description: 'Receita tradicional cremosa feita com leite de coco fresco artesanal. O equilíbrio perfeito entre o doce e o sabor marcante.',
      ingredients: ['Leite de Coco', 'Creme de Leite', 'Açúcar'],
      rating: 4.7,
      reviews: 95,
      warnings: 'Contém lactose. Pode conter traços de amendoim.'
    },
    {
      id: 'caipirinha-limao',
      name: 'Caipirinha de Limão',
      price: 8.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBok8yIrORTI6Lo3PMIFfA8VyYPJJbpOBOGlPKTfImRR7lXWzt1dF7QTX5rloeO_onQ_0PjKst-vOmUW9HAfoY2hEfU4H9X5EmpCsvH5JjcsZo7P_siNi6s9-sYHONHRpV9Ce7wa0KMeJpXssUSp6JObGbp4Nr5c6cYQ8l29CkiYpYGC0cF7l1o6-rcUJPldtRh2ZqkOetma7OIWV6r-jEbcEfv7xhvi1A6nwwRhZBgvLCoFN5FAcvjgyM6PV_ue3onI8bp--iOYg',
      description: 'O clássico brasileiro em forma de geladinho. Cachaça, limão taiti e açúcar na medida certa para refrescar seu dia.',
      ingredients: ['Cachaça', 'Limão Taiti', 'Açúcar', 'Gelo'],
      rating: 4.6,
      reviews: 78,
      warnings: 'Contém álcool. Não recomendado para menores de 18 anos. Contém lactose.'
    }
  ];

  const product = products.find(p => p.id === productId) || products[0]; // fallback to first product

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-24 bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-text-primary antialiased">
      {/* Hero Section with Transparent Header Overlay */}
      <div className="relative w-full h-[45vh] shrink-0">
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 pt-10 lg:pt-6">
          <Link
            to="/"
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-black/20 backdrop-blur-md transition-all hover:bg-black/40 active:scale-95"
          >
            <ArrowLeft className="text-white" size={24} />
          </Link>
          <button className="group flex h-10 w-10 items-center justify-center rounded-full bg-black/20 backdrop-blur-md transition-all hover:bg-black/40 active:scale-95">
            <Heart className="text-white" size={24} />
          </button>
        </div>
        {/* Hero Image */}
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url('${product.image}')`,
          }}
        ></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
      </div>
      {/* Content Sheet */}
      <div className="relative z-10 -mt-10 flex flex-1 flex-col rounded-t-3xl bg-background-light dark:bg-background-dark px-6 pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
        {/* Handle bar */}
        <div className="mx-auto mb-6 mt-3 h-1.5 w-12 rounded-full bg-slate-300 dark:bg-slate-700 opacity-50"></div>
        {/* Header Info */}
        <div className="flex flex-col gap-1 pb-4">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-[28px] font-bold leading-tight tracking-tight text-slate-900 dark:text-text-primary">
              {product.name}
            </h1>
            <div className="flex shrink-0 items-center rounded-lg bg-primary/10 px-3 py-1">
              <span className="text-xl font-bold text-primary">R$ {product.price.toFixed(2)}</span>
            </div>
          </div>
          {/* Ratings */}
          <div className="flex items-center gap-1.5 pt-1">
            <Star className="text-yellow-500 fill-current" size={20} />
            <span className="text-sm font-semibold text-slate-800 dark:text-text-secondary">{product.rating}</span>
            <span className="text-sm text-slate-500 dark:text-text-secondary">({product.reviews} avaliações)</span>
          </div>
        </div>
        {/* Description */}
        <div className="py-2">
          <p className="text-base leading-relaxed text-slate-600 dark:text-text-secondary">
            {product.description}
          </p>
        </div>
        {/* Divider */}
        <div className="my-6 h-px w-full bg-slate-200 dark:bg-slate-800"></div>
        {/* Ingredients */}
        <div className="mb-6">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-text-secondary">Ingredientes</h3>
          <div className="flex flex-wrap gap-2">
            {product.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center justify-center rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-900/5 dark:bg-surface-dark dark:text-text-primary dark:ring-slate-700">
                {ingredient}
              </div>
            ))}
          </div>
        </div>
        {/* Quantity Stepper */}
        <div className="mb-6 flex items-center justify-between rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-900/5 dark:bg-surface-dark/50 dark:ring-slate-800">
          <span className="font-bold text-slate-900 dark:text-text-primary">Quantidade</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-700 dark:text-text-secondary dark:hover:bg-slate-600"
            >
              <Minus size={20} />
            </button>
            <span className="min-w-[20px] text-center text-lg font-bold text-slate-900 dark:text-text-primary">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white transition hover:bg-primary/90"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
        {/* Additional Details */}
        <div className="mb-8 rounded-xl bg-slate-50 p-4 dark:bg-surface-dark/30">
          <div className="flex items-center gap-3">
            <Info className="text-slate-400" size={20} />
            <p className="text-sm text-slate-500 dark:text-text-secondary">{product.warnings}</p>
          </div>
        </div>
        {/* Spacer */}
        <div className="h-8 w-full"></div>
      </div>
      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-background-light/80 px-4 py-4 backdrop-blur-md dark:border-slate-800 dark:bg-background-dark/90">
        <button
          onClick={handleAddToCart}
          className="flex h-14 w-full cursor-pointer items-center justify-between rounded-xl bg-primary px-6 text-base font-bold text-white shadow-lg shadow-primary/25 transition-transform active:scale-[0.98]"
        >
          <span>Adicionar ao Carrinho</span>
          <span>R$ {(product.price * quantity).toFixed(2)}</span>
        </button>
        {/* Safe area */}
        <div className="h-2 w-full"></div>
      </div>
    </div>
  );
};

export default ProductDetails;