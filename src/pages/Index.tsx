import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext";

const Index = () => {
  const { addItem } = useCart();

  const products = [
    {
      id: 'morango-nordeste',
      name: 'Morango do Nordeste',
      price: 5.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQJMZDkn5s2Q1Rhu7VTT0wSbpu0Zs2136hUamFu3BKQVuVxBYqmKfH536oC5A6GdhLNWW4d1969s1kG6Ls7kvpSWoUspr5Fuj8dyZGJ4PD7EMMXpJ_PPxtQh65cra50RKLF_NdMNiXBiDXDJnu0grwaF4pBkZGWF6nJi1cxo0vD9NzqnzvF4uofppwoWVyz0YP8VYPnbnueXZdTm401ZQF_B-qNF4fCtm7TQHb-fMOHEiGp-FoBNbKl2Lnst7IIgnMCMOoitX7Bw',
      rating: 4.8,
      reviews: 120
    },
    {
      id: 'trufa-belga',
      name: 'Trufa Belga',
      price: 7.50,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBus_8lGRett6zFf-4fJSGldJ0STWFEBw_SZekfBqNyynVNaF4_WfGunFT5v6pWRrj9Pzhsd61_G02tUFdYTkYIFdLW6PC2p5u4tRg33ImZbPqGATzcYXfZBaf3LSZFAWMLZYzu7yPTQFP4_fpbq7jajeIOqhencVB0NOcy9h5Wj5iitogBDGF1VM5gVdeVIfeSEcCQiScnF4HZBGdQkaeTxGTJYQgHSGDMTK02POz4eov40OlLEWZxBYwCvktcnawn6WXisLBeQ',
      rating: 4.9,
      reviews: 85
    },
    {
      id: 'coco-puro',
      name: 'Coco Puro',
      price: 6.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYiu7ZJdFq90OvDRaoPkf5fEtK5ccvx5kSeRWpJRtIUqya8o6rgneU4E7-AXsnmk9hbopLSGiKYvUGig4LbbrLXjBBF44tQDuacjFT6Tj2AWl5i1cFRcAyGDXlOoITqEZGyBmUlmwu-7VOAilZSUw_jZFDFafa3DlQGenUdVsh120uhLW8CjBPrzXV2uofK17BsO1UcH7cZFsimmzRJRbXdntZgdmO52bxy8TA00MudEggA9q5bcEEhW6BbSNNGOvnUtD0rUeshA',
      rating: 4.7,
      reviews: 95
    },
    {
      id: 'caipirinha-limao',
      name: 'Caipirinha de Limão',
      price: 8.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBok8yIrORTI6Lo3PMIFfA8VyYPJJbpOBOGlPKTfImRR7lXWzt1dF7QTX5rloeO_onQ_0PjKst-vOmUW9HAfoY2hEfU4H9X5EmpCsvH5JjcsZo7P_siNi6s9-sYHONHRpV9Ce7wa0KMeJpXssUSp6JObGbp4Nr5c6cYQ8l29CkiYpYGC0cF7l1o6-rcUJPldtRh2ZqkOetma7OIWV6r-jEbcEfv7xhvi1A6nwwRhZBgvLCoFN5FAcvjgyM6PV_ue3onI8bp--iOYg',
      rating: 4.6,
      reviews: 78
    }
  ];

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between p-4 max-w-md mx-auto lg:max-w-7xl lg:px-6 w-full">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Geladinhos Gourmet</h1>
          </div>
          <Link
            to="/cart"
            className="flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <ShoppingCart className="text-slate-900 dark:text-white" size={24} />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto lg:max-w-7xl p-4 lg:px-6 pb-24">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="text-center py-8">
            <h2 className="text-3xl font-bold mb-4">Bem-vindo ao Geladinhos Gourmet</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Descubra nossos deliciosos geladinhos artesanais feitos com ingredientes frescos e naturais.
              Cada mordida é uma experiência única de sabor e qualidade.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-md transition-shadow">
              <Link to={`/product-details?id=${product.id}`}>
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">{product.name}</h3>
                  <span className="text-lg font-bold text-primary ml-2">R$ {product.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="text-yellow-500 fill-current" size={16} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{product.rating}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">({product.reviews} avaliações)</span>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>&copy; 2024 Geladinhos Gourmet. Todos os direitos reservados.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;