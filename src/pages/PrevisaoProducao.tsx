<div className={`flex h-8 w-8 items-center justify-center rounded ${
                    item.status === "ok" ? "bg-gray-100 dark:bg-white/5" : "bg-amber-500/20"
                  }`}>
                    {item.status === "ok" ? (
                      <CheckCircle size={16} className="text-gray-500" />
                    ) : (
                      <AlertTriangle size={16} className="text-amber-500" />
                    )}
                  </div>