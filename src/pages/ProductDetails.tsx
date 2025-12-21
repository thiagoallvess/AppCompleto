import { ArrowLeft, Heart, Star, Minus, Plus, Info } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../contexts/ProductsContext";
import { useState } from "react";

const ProductDetails = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id');
  const { addItem } = useCart();
  const { getProductById } = useProducts();
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(productId || '') || getProductById('morango-nordeste'); // fallback to first product

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Produto não encontrado</h1>
          <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

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
            {['Morango', 'Água de Coco', 'Açúcar'].map((ingredient, index) => (
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
            <p className="text-sm text-slate-500 dark:text-text-secondary">Contém lactose e frutas. Pode conter traços de amendoim.</p>
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