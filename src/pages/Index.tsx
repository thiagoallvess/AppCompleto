import { Menu, ShoppingCart, Home, Search, Heart, User } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-text-primary pb-24 min-h-screen">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto lg:max-w-none lg:px-6">
          <button className="text-slate-900 dark:text-text-primary flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <Menu size={24} />
          </button>
          <h1 className="text-slate-900 dark:text-text-primary text-lg font-bold leading-tight tracking-tight flex-1 text-center">
            Geladinhos Gourmet
          </h1>
          <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors relative">
            <ShoppingCart className="text-slate-900 dark:text-text-primary" size={24} />
            <span className="absolute top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm ring-2 ring-background-light dark:ring-background-dark">
              2
            </span>
          </button>
        </div>
      </header>
      <main className="max-w-md mx-auto lg:max-w-7xl flex flex-col gap-6 p-4">
        {/* Hero / Featured Section */}
        <section>
          <div className="flex justify-between items-end mb-3 px-1">
            <h2 className="text-slate-900 dark:text-text-primary text-xl font-bold">Destaque da Semana</h2>
          </div>
          <Link to="/product-details" className="block">
            <div className="relative w-full aspect-[4:3] rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC8xLdHh8o1pcib7E6RzpmF3XeFF__7JDmT_XGETuf9LJGGuaLVo5vOj1J3CJox3ZSdV8RA4MPNgF5GBfziazn0p8iKqMyVyPEblgLSp6RyQE9tW8LJrnQWSd2CqTYu5V0y6tR2soiiAMcrzFJuGP8RWncMRMFjR0iLcTuUPE2hLv1NSmzSNbz6W_Sb4N6CugHviK8L_QwVZEgvuflC805pFl-U2ByOhiMrB0aDXbToEztHUB_mfYO1BCmPNK-N2vfYcPxPREwaZg')`,
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-5 w-full">
                <span className="inline-block px-2 py-1 mb-2 text-xs font-bold text-white bg-primary rounded-md uppercase tracking-wider">
                  20% OFF
                </span>
                <h3 className="text-white text-2xl font-bold leading-tight">Ninho com Nutella</h3>
                <p className="text-gray-300 text-sm mt-1 line-clamp-1">O queridinho da galera com recheio extra.</p>
              </div>
            </div>
          </Link>
        </section>
        {/* Categories (Chips) */}
        <section className="w-full overflow-hidden">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {/* Active Chip */}
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary px-5 shadow-sm shadow-primary/25 transition-transform active:scale-95">
              <span className="text-white text-sm font-semibold">Todos</span>
            </button>
            {/* Inactive Chips */}
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 px-5 transition-transform active:scale-95 hover:bg-gray-50 dark:hover:bg-gray-800">
              <span className="text-slate-600 dark:text-text-secondary text-sm font-medium">Cremosos</span>
            </button>
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 px-5 transition-transform active:scale-95 hover:bg-gray-50 dark:hover:bg-gray-800">
              <span className="text-slate-600 dark:text-text-secondary text-sm font-medium">Frutas</span>
            </button>
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 px-5 transition-transform active:scale-95 hover:bg-gray-50 dark:hover:bg-gray-800">
              <span className="text-slate-600 dark:text-text-secondary text-sm font-medium">Detox</span>
            </button>
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 px-5 transition-transform active:scale-95 hover:bg-gray-50 dark:hover:bg-gray-800">
              <span className="text-slate-600 dark:text-text-secondary text-sm font-medium">Alcoólicos</span>
            </button>
          </div>
        </section>
        {/* Product List */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Item 1 */}
          <Link to="/product-details" className="block">
            <div className="@container">
              <div className="flex flex-col sm:flex-row items-stretch rounded-xl bg-white dark:bg-surface-dark shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md cursor-pointer">
                <div
                  className="w-full sm:w-32 h-40 sm:h-auto bg-center bg-no-repeat bg-cover shrink-0 relative"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBQJMZDkn5s2Q1Rhu7VTT0wSbpu0Zs2136hUamFu3BKQVuVxBYqmKfH536oC5A6GdhLNWW4d1969s1kG6Ls7kvpSWoUspr5Fuj8dyZGJ4PD7EMMXpJ_PPxtQh65cra50RKLF_NdMNiXBiDXDJnu0grwaF4pBkZGWF6nJi1cxo0vD9NzqnzvF4uofppwoWVyz0YP8VYPnbnueXZdTm401ZQF_B-qNF4fCtm7TQHb-fMOHEiGp-FoBNbKl2Lnst7IIgnMCMOoitX7Bw")`,
                  }}
                >
                  {/* Badge on image for mobile view */}
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-white sm:hidden">
                    FRUTA REAL
                  </div>
                </div>
                <div className="flex flex-col justify-between p-4 grow">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-slate-900 dark:text-text-primary text-lg font-bold leading-tight">Morango do Nordeste</h3>
                    </div>
                    <p className="text-slate-500 dark:text-text-secondary text-sm font-medium leading-relaxed line-clamp-2">
                      Feito com pedaços reais da fruta e água de coco. Refrescante e natural.
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-slate-900 dark:text-text-primary text-lg font-bold">R$ 5,00</span>
                    <button className="flex items-center justify-center h-9 px-4 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-sm shadow-primary/30 transition-transform active:scale-95">
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          {/* Item 2 */}
          <Link to="/product-details" className="block">
            <div className="@container">
              <div className="flex flex-col sm:flex-row items-stretch rounded-xl bg-white dark:bg-surface-dark shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md cursor-pointer">
                <div
                  className="w-full sm:w-32 h-40 sm:h-auto bg-center bg-no-repeat bg-cover shrink-0 relative"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDBus_8lGRett6zFf-4fJSGldJ0STWFEBw_SZekfBqNyynVNaF4_WfGunFT5v6pWRrj9Pzhsd61_G02tUFdYTkYIFdLW6PC2p5u4tRg33ImZbPqGATzcYXfZBaf3LSZFAWMLZYzu7yPTQFP4_fpbq7jajeIOqhencVB0NOcy9h5Wj5iitogBDGF1VM5gVdeVIfeSEcCQiScnF4HZBGdQkaeTxGTJYQgHSGDMTK02POz4eov40OlLEWZxBYwCvktcnawn6WXisLBeQ")`,
                  }}
                ></div>
                <div className="flex flex-col justify-between p-4 grow">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-slate-900 dark:text-text-primary text-lg font-bold leading-tight">Trufa Belga</h3>
                    </div>
                    <p className="text-slate-500 dark:text-text-secondary text-sm font-medium leading-relaxed line-clamp-2">
                      Chocolate 70% cacau com um recheio de ganache cremoso. Intenso e sofisticado.
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-slate-900 dark:text-text-primary text-lg font-bold">R$ 7,50</span>
                    <button className="flex items-center justify-center h-9 px-4 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-sm shadow-primary/30 transition-transform active:scale-95">
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          {/* Item 3 */}
          <Link to="/product-details" className="block">
            <div className="@container">
              <div className="flex flex-col sm:flex-row items-stretch rounded-xl bg-white dark:bg-surface-dark shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md cursor-pointer">
                <div
                  className="w-full sm:w-32 h-40 sm:h-auto bg-center bg-no-repeat bg-cover shrink-0 relative"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBYiu7ZJdFq90OvDRaoPkf5fEtK5ccvx5kSeRWpJRtIUqya8o6rgneU4E7-AXsnmk9hbopLSGiKYvUGig4LbbrLXjBBF44tQDuacjFT6Tj2AWl5i1cFRcAyGDXlOoITqEZGyBmUlmwu-7VOAilZSUw_jZFDFafa3DlQGenUdVsh120uhLW8CjBPrzXV2uofK17BsO1UcH7cZFsimmzRJRbXdntZgdmO52bxy8TA00MudEggA9q5bcEEhW6BbSNNGOvnUtD0rUeshA")`,
                  }}
                ></div>
                <div className="flex flex-col justify-between p-4 grow">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-slate-900 dark:text-text-primary text-lg font-bold leading-tight">Coco Puro</h3>
                    </div>
                    <p className="text-slate-500 dark:text-text-secondary text-sm font-medium leading-relaxed line-clamp-2">
                      Receita tradicional cremosa feita com leite de coco fresco artesanal.
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-slate-900 dark:text-text-primary text-lg font-bold">R$ 6,00</span>
                    <button className="flex items-center justify-center h-9 px-4 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-sm shadow-primary/30 transition-transform active:scale-95">
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          {/* Item 4 */}
          <Link to="/product-details" className="block">
            <div className="@container">
              <div className="flex flex-col sm:flex-row items-stretch rounded-xl bg-white dark:bg-surface-dark shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md cursor-pointer">
                <div
                  className="w-full sm:w-32 h-40 sm:h-auto bg-center bg-no-repeat bg-cover shrink-0 relative"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBok8yIrORTI6Lo3PMIFfA8VyYPJJbpOBOGlPKTfImRR7lXWzt1dF7QTX5rloeO_onQ_0PjKst-vOmUW9HAfoY2hEfU4H9X5EmpCsvH5JjcsZo7P_siNi6s9-sYHONHRpV9Ce7wa0KMeJpXssUSp6JObGbp4Nr5c6cYQ8l29CkiYpYGC0cF7l1o6-rcUJPldtRh2ZqkOetma7OIWV6r-jEbcEfv7xhvi1A6nwwRhZBgvLCoFN5FAcvjgyM6PV_ue3onI8bp--iOYg")`,
                  }}
                >
                  <div className="absolute top-2 left-2 bg-purple-600/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-white sm:hidden">
                    +18
                  </div>
                </div>
                <div className="flex flex-col justify-between p-4 grow">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-slate-900 dark:text-text-primary text-lg font-bold leading-tight">Caipirinha de Limão</h3>
                    </div>
                    <p className="text-slate-500 dark:text-text-secondary text-sm font-medium leading-relaxed line-clamp-2">
                      O clássico brasileiro em forma de geladinho. Cachaça, limão taiti e açúcar na medida.
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-slate-900 dark:text-text-primary text-lg font-bold">R$ 8,00</span>
                    <button className="flex items-center justify-center h-9 px-4 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-sm shadow-primary/30 transition-transform active:scale-95">
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      </main>
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 pb-safe">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto lg:max-w-none lg:px-6">
          <button className="flex flex-col items-center justify-center w-full h-full text-primary space-y-1">
            <Home size={24} />
            <span className="text-[10px] font-medium">Início</span>
          </button>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <Search size={24} />
            <span className="text-[10px] font-medium">Buscar</span>
          </button>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <Heart size={24} />
            <span className="text-[10px] font-medium">Favoritos</span>
          </button>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <User size={24} />
            <span className="text-[10px] font-medium">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;