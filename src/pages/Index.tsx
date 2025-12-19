{/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <Link to={`/product-details?id=${product.id}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{product.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{product.rating}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">({product.reviews})</span>
                  </div>
                  <span className="text-xl font-bold text-primary">R$ {product.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Plus size={20} />
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>