{days.map((day) => {
                const dayData = businessHours[day.key as keyof typeof businessHours];
                return (
                  <div key={day.key} className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 lg:border-r lg:border-slate-100 dark:lg:border-slate-700 lg:last:border-r-0">
                    <p className={`text-slate-900 dark:text-white text-base font-medium min-w-24`}>
                      {day.label}
                    </p>
                    <div className="flex gap-3 flex-1">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-3 flex items-center text-slate-400 dark:text-slate-500 pointer-events-none">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12,6 12,12 16,14"></polyline>
                          </svg>
                        </div>
                        <Input
                          type="time"
                          value={dayData.open}
                          onChange={(e) => updateBusinessHour(day.key, 'open', e.target.value)}
                          className={`w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700 pl-9`}
                        />
                      </div>
                      <span className="self-center text-slate-400 dark:text-slate-500">-</span>
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-3 flex items-center text-slate-400 dark:text-slate-500 pointer-events-none">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12,6 12,12 16,14"></polyline>
                          </svg>
                        </div>
                        <Input
                          type="time"
                          value={dayData.close}
                          onChange={(e) => updateBusinessHour(day.key, 'close', e.target.value)}
                          className={`w-full bg-slate-50 dark:bg-background-dark border-slate-200 dark:border-slate-700 pl-9`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}