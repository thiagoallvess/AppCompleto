import { ArrowLeft, Plus, Search, MoreVertical, IceCream, Receipt, Settings, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddProdutoModal from "@/components/AddProdutoModal";

const GestaoProdutos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filters = ["Todos", "Em estoque", "Esgotado", "Rascunhos"];

  const products = [
    {
      id: 1,
      name: "Ninho com Nutella",
      description: "Base cremosa de leite ninho com recheio de nutella generoso.",
     <dyad-write path="src/pages/GestaoProdutos.tsx" description="Adding sidebar drawer functionality to the products management page">
import { ArrowLeft, Plus, Search, MoreVertical, IceCream, Receipt, Settings, Home, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddProdutoModal from "@/components/AddProdutoModal";
import Sidebar from "@/components/Sidebar";

const GestaoProdutos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filters = ["Todos", "Em estoque", "Esgotado", "Rascunhos"];

  const products = [
    {
      id: 1,
      name: "Ninho com Nutella",
      description: "Base cremosa de leite ninho com recheio de nutella generoso.",
      price: 6.00,
      stock: 45,
      status: "Em estoque",
      statusColor: "emerald",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCM6J9kuR4cOh8UXIW26pv-fPK3cG9jQCzURHy7AV7t8Arw9q1NoBye9wKKB8WXufd8tzM4G1BAZ9JvwhrwDX9YLZolz40iRUA9AzzFuIaZSbYsO6Vmo9xMOil91XsmiJaxBoFlaD1iQ9JVIfHkUNsbsdoRyqW82u5BLzsgxfxTtDTMmZSfAbz7KzFJGKROwBtkcrp8pvM0jqSfYcv8pKpx4xRgAVi5VHAM-MtKHIV_WCsKjLr2rHnMeUX4m_HOr7kgJC5OA2ZUEA"
    },
    {
      id: 2,
      name: "Morango Gourmet",
      description: "Pedaços da fruta fresca com leite condensado cremoso.",
      price: 5.00,
      stock: 12,
      status: "Em estoque",
      statusColor: "amber",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALIN-0vBOujBRjsDYUBXhwtCV2D55pn4vbUcWkolFHJANKRu0hFOlmpzSgT4OwOnUFr9I2JK2jqC9HdADvivIFZY0anCP0_E13hoilTot4lV-ThjVDB65m0gRDtnZ2kVc26Pn4YQH-Lef1ebUWex2Vb2oBy0At4vPy8g4SaQux0I7FHbYkiJad2ePupyCTeeqoVGlIWNK7uTfrm8fgG8FzHUFOVoL5NlxQRlL9cGrAhwt_1gvPIB6x3o0pelrrAIa5ct4c6DT8cg"
    },
    {
      id: 3,
      name: "Maracujá Cremoso",
      description: "Mousse de maracujá com sementes crocantes.",
      price: 5.00,
      stock: 0,
      status: "Esgotado",
      statusColor: "red",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLIUMP1srFnkVqveLSMzwWTOjgyOR1yId15K0zodu97y-MNJqATjrPCxPb7IKMwPe0d4pzdKP8WnEl5dcJViZRcRaNI-yvkTAYx5kdjIln3Xv-z1kYZvbcEfCyLhYDXdWBoHWhl4rO3Uz2__MBPvK47qwxwLT5tRCW8zjNM_2aMWsq2CsyhVKi5UVLO1h9N6g0AB55-EpgAC0LDmtT0-QUhIxjcd6U1bW7S52mWCbxTi20IYyrQ6YKOAe01ZqgP_lwBm1zq_dpCA"
    },
    {
      id: 4,
      name: "Chocolate Belga",
      description: "Intenso e cremoso, feito com cacau 70%.",
      price: 7.50,
      stock: 20,
      status: "Em estoque",
      statusColor: "emerald",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyHTfVXkGcnCNVfZLJX8Jm_A-jZL88fUbJfYgKDMEliXRmFLx4QXNsKStjEs4MxFD9OiEAF5qTsBndX6OBVMOpKAfgqBLyJ4qqDZhP9mtNG1eIzr4kDzbzutNO_zTIQvhKhMZ4p8vGkqsQaNhhCcwtQShT4CGmCSyI7xSi1r1sKGEMMrrRhaD2BgFpucjLyNHtjwqviMjU5drEV3gBPZtAulgJEOEp4zKA4c9rDhNVzvHVDkWTFBvkXorzBH0sRgUYUsD3QVl5Vw"
    },
    {
      id: 5,
      name: "Coco com Doce de Leite",
      description: "Tradicional sabor de coco fresco com leite.",
      price: 4.50,
      stock: 58,
      status: "Em estoque",
      statusColor: "emerald",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeVtLOwl0ATHwAcr5evKM61DHAzUInDA4rNayZup2RLN2_bQCfTnVNR_l-DTdXOBvhL9WAaX87UftAK2U7sB2U6JTa7r8wpWfiDPIEbAtGGv-5CrecYaZuuD9l1b4s01XjoNpc5t9qaYh4dzSCTxZXGQq2UVC2yLgyUnmioy-w9jEP6S31faZwIlo68d951DTN_-oos0ZbKhyHyEGxSHXFfW4gxKyg2e9ICHwtS3Beq_3-2wSvZVjYKvOLPZI2_nP6TbsWYvi__Q"
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "Todos" ||
                         (activeFilter === "Em estoque" && product.status === "Em estoque") ||
                         (activeFilter === "Esgotado" && product.status === "Esgotado") ||
                         (activeFilter === "Rascunhos" && product.status === "Rascunho");
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "emerald":
        return "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
      case "amber":
        return "bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400";
      case "red":
        return "bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case "emerald":
        return "bg-emerald-500";
      case "amber":
        return "bg-amber-500";
      case "red":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center justify-center size-10 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Menu size={24} />
          </button>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Administração</span>
            <h1 className="text-xl font-bold leading-tight tracking-tight">Produtos</h1>
          </div>
        </div>
        <div className="flex items-center justify-end pr-4">
          <Button
            size="sm"
            className="size-10 rounded-full p-0 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={24} />
          </Button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-4 w-full">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <Input
            className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl text-sm font-medium bg-gray-100 dark:bg-surface-dark text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
            placeholder="Buscar por sabor, ID ou categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="w-full overflow-x-auto no-scrollbar pb-2 pl-4 pr-4">
        <div className="flex gap-3 min-w-max">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              className={`h-9 px-4 rounded-full ${
                activeFilter === filter
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                  : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
              } transition-transform active:scale-95`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="flex-1 px-4 pb-20 space-y-3">
        {/* List Header Stats */}
        <div className="flex items-center justify-between py-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>Total: {filteredProducts.length} produtos</span>
          <button className="flex items-center gap-1 cursor-pointer hover:text-primary">
            <span>Ordenar</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>

        {/* Product Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`group relative flex flex-col gap-3 bg-white dark:bg-surface-dark p-3 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all ${
                product.status === "Esgotado" ? "opacity-75 grayscale-[50%]" : ""
              }`}
            >
              <div className="flex gap-3">
                <div className="relative shrink-0 w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg bg-cover bg-center overflow-hidden">
                  <img
                    alt={product.name}
                    className="h-full w-full object-cover"
                    src={product.image}
                  />
                </div>
                <div className="flex flex-col flex-1 min-w-0 justify-center">
                  <div className="flex items-start justify-between">
                    <h3 className={`text-base font-semibold truncate pr-2 ${
                      product.status === "Esgotado" ? "text-slate-400 dark:text-slate-500" : "text-slate-800 dark:text-slate-100"
                    }`}>
                      {product.name}
                    </h3>
                    <button className="text-gray-400 hover:text-primary transition-colors p-1 -m-1 -mt-2">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className={`text-sm font-bold ${
                      product.status === "Esgotado" ? "text-slate-400 dark:text-slate-500" : "text-primary dark:text-blue-400"
                    }`}>
                      R$ {product.price.toFixed(2)}
                    </span>
                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${getStatusColor(product.statusColor)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(product.statusColor)}`}></span>
                      {product.stock} un.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg pb-safe">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto lg:max-w-none lg:px-6">
          <Link to="/" className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <Home size={24} />
            <span className="text-[10px] font-medium">Início</span>
          </Link>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <Search size={24} />
            <span className="text-[10px] font-medium">Buscar</span>
          </button>
          <button className="flex flex-col items-center justify-center w-full h-full text-primary space-y-1">
            <IceCream size={24} />
            <span className="text-[10px] font-medium">Produtos</span>
          </button>
          <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <Receipt size={24} />
            <span className="text-[10px] font-medium">Pedidos</span>
          </button>
          <Link to="/perfil" className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-text-secondary hover:text-slate-900 dark:hover:text-text-primary transition-colors space-y-1">
            <User size={24} />
            <span className="text-[10px] font-medium">Perfil</span>
          </Link>
        </div>
      </nav>
      {/* Safe area spacer for bottom nav */}
      <div className="h-6 w-full bg-white dark:bg-background-dark"></div>

      {/* Add Product Modal */}
      <AddProdutoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
};

export default GestaoProdutos;