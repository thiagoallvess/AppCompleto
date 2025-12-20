{/* Products Grid */}
      <main className="flex-1 px-4 pb-24">
        <div className="grid grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md transition-shadow"
            >
              <Link to={`/product-details?id=${product.id}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-primary">
                      R$ {product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="px-4 pb-4">
                <Button
                  onClick={() => handleAddToCart(product)}
                  className={`w-full h-10 rounded-lg font-semibold text-sm transition-all duration-300 ${
                    addedItems.has(product.id)
                      ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30'
                      : 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {addedItems.has(product.id) ? (
                      <>
                        <span className="text-green-100">✓</span>
                        <span>Adicionado</span>
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        <span>Adicionar</span>
                      </>
                    )}
                  </div>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>