import { ArrowLeft, Save, MapPin, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { showSuccess, showError } from "@/utils/toast";

const ConfiguracoesEntrega = () => {
  const [deliveryConfigs, setDeliveryConfigs] = useState([
    { radius: 0.5, time: 30, fee: 4.99 }, { radius: 1, time: 33, fee: 4.99 },
    { radius: 1.5, time: 35, fee: 5.99 }, { radius: 2, time: 36, fee: 6.99 },
    { radius: 2.5, time: 38, fee: 7.99 }, { radius: 3, time: 39, fee: 7.99 },
    { radius: 3.5, time: 41, fee: 8.99 }, { radius: 4, time: 42, fee: 8.99 },
    { radius: 4.5, time: 43, fee: 10.99 }, { radius: 5, time: 44, fee: 10.99 },
    { radius: 5.5, time: 45, fee: 11.99 }, { radius: 6, time: 47, fee: 12.99 },
    { radius: 6.5, time: 48, fee: 13.99 }, { radius: 7, time: 49, fee: 14.99 },
    { radius: 7.5, time: 50, fee: 15.99 }, { radius: 8, time: 51, fee: 15.99 },
    { radius: 8.5, time: 53, fee: 16.99 }, { radius: 9, time: 54, fee: 16.99 },
    { radius: 9.5, time: 55, fee: 17.99 }, { radius: 10, time: 56, fee: 17.99 },
    { radius: 10.5, time: 57, fee: 18.99 }, { radius: 11, time: 59, fee: 18.99 },
    { radius: 11.5, time: 60, fee: 19.99 }, { radius: 12, time: 61, fee: 22.99 },
    { radius: 12.5, time: 63, fee: 22.99 }, { radius: 13, time: 64, fee: 24.99 },
    { radius: 13.5, time: 65, fee: 24.99 }, { radius: 14, time: 67, fee: 24.99 },
    { radius: 14.5, time: 68, fee: 24.99 }, { radius: 15, time: 69, fee: 24.99 }
  ]);

  const [selectedRadius, setSelectedRadius] = useState(5);
  const [center, setCenter] = useState({ lat: -23.5505, lng: -46.6333 }); // São Paulo
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const circleRef = useRef<google.maps.Circle | null>(null);

  useEffect(() => {
    // Load Google Maps script
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setMapLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setMapLoaded(true);
      };
      script.onerror = () => {
        showError("Erro ao carregar o Google Maps. Verifique sua conexão.");
      };
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  useEffect(() => {
    if (mapLoaded && mapRef.current && !mapInstanceRef.current) {
      try {
        // Initialize map
        const map = new google.maps.Map(mapRef.current, {
          center: center,
          zoom: 13,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          styles: [
            {
              featureType: "all",
              elementType: "geometry",
              stylers: [{ color: "#242f3e" }]
            },
            {
              featureType: "all",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#242f3e" }]
            },
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: [{ color: "#746855" }]
            }
          ]
        });

        mapInstanceRef.current = map;

        // Add center marker
        new google.maps.Marker({
          position: center,
          map: map,
          title: 'Sua Loja',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#dc2626',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 3,
          }
        });

        // Add delivery radius circle
        const circle = new google.maps.Circle({
          strokeColor: '#1976d2',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#1976d2',
          fillOpacity: 0.15,
          map: map,
          center: center,
          radius: selectedRadius * 1000, // Convert km to meters
        });

        circleRef.current = circle;
      } catch (error) {
        console.error("Error initializing map:", error);
        showError("Erro ao inicializar o mapa");
      }
    }
  }, [mapLoaded, center, selectedRadius]);

  const handleTimeChange = (index: number, value: string) => {
    const newConfigs = [...deliveryConfigs];
    newConfigs[index].time = parseInt(value) || 0;
    setDeliveryConfigs(newConfigs);
  };

  const handleFeeChange = (index: number, value: string) => {
    const newConfigs = [...deliveryConfigs];
    newConfigs[index].fee = parseFloat(value) || 0;
    setDeliveryConfigs(newConfigs);
  };

  const handleRadiusChange = (radius: number) => {
    setSelectedRadius(radius);
    if (circleRef.current) {
      circleRef.current.setRadius(radius * 1000); // Convert km to meters
    }
  };

  const handleSave = () => {
    localStorage.setItem('deliveryConfigs', JSON.stringify(deliveryConfigs));
    localStorage.setItem('deliveryRadius', selectedRadius.toString());
    showSuccess("Configurações de entrega salvas com sucesso!");
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-slate-200 dark:border-slate-800">
        <Link
          to="/configuracoes-admin"
          className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Configurações de Entrega</h2>
      </header>

      {/* Main Content */}
      <div className="relative flex flex-col w-full max-w-4xl mx-auto overflow-x-hidden px-4">
        {/* Section 1: Tempo e Taxa */}
        <div className="pt-5">
          <h3 className="text-slate-900 dark:text-white tracking-tight text-xl font-bold leading-tight text-left pb-3">Tempo e Taxa</h3>
          <div className="p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 flex gap-4 items-start shadow-sm">
            <span className="material-symbols-outlined text-primary text-2xl shrink-0 mt-0.5">info</span>
            <div className="flex flex-col gap-1">
              <p className="text-slate-900 dark:text-white text-base font-bold leading-tight">Entrega Própria</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed">
                Configure o raio de entrega, tempo estimado e taxa para cada distância.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Map Configuration */}
        <div className="pt-8">
          <h3 className="text-slate-900 dark:text-white tracking-tight text-xl font-bold leading-tight text-left pb-3">Raio de Entrega</h3>
          
          {/* Map Container */}
          <div className="mb-4 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg">
            {!mapLoaded ? (
              <div className="w-full h-64 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Carregando mapa...</p>
                </div>
              </div>
            ) : (
              <div ref={mapRef} className="w-full h-64 bg-slate-100 dark:bg-slate-800" />
            )}
          </div>

          {/* Radius Slider */}
          <div className="mb-6 bg-white dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Raio de Entrega</label>
              <span className="text-slate-900 dark:text-white font-bold text-lg">{selectedRadius} km</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="15"
              step="0.5"
              value={selectedRadius}
              onChange={(e) => handleRadiusChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
              style={{
                background: `linear-gradient(to right, #1976d2 0%, #1976d2 ${((selectedRadius - 0.5) / 14.5) * 100}%, rgb(226 232 240) ${((selectedRadius - 0.5) / 14.5) * 100}%, rgb(226 232 240) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
              <span>0.5 km</span>
              <span>15 km</span>
            </div>
          </div>
        </div>

        {/* Section 3: Configuration Table */}
        <div className="pt-8 pb-32">
          <h3 className="text-slate-900 dark:text-white tracking-tight text-xl font-bold leading-tight text-left pb-3">Configurações por Raio</h3>
          
          {/* Configuration Table Header */}
          <div className="sticky top-[72px] z-10 grid grid-cols-[1fr_1.2fr_1.2fr] gap-2 bg-background-light dark:bg-background-dark py-3 border-b border-slate-200 dark:border-slate-800 mb-2 text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
            <div className="text-center">Raio (km)</div>
            <div className="text-center">Tempo (min)</div>
            <div className="text-center">Taxa (R$)</div>
          </div>

          {/* Configuration Table Body */}
          <div className="flex flex-col gap-2">
            {deliveryConfigs.map((config, index) => (
              <div key={index} className="grid grid-cols-[1fr_1.2fr_1.2fr] gap-2 items-center py-1">
                {/* Radius */}
                <div className="flex items-center justify-center h-10 rounded bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm">
                  {config.radius} km
                </div>
                
                {/* Time Input */}
                <div className="relative">
                  <Input 
                    type="number" 
                    className="w-full h-10 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 focus:border-primary rounded text-center text-slate-900 dark:text-white text-sm font-bold focus:ring-1 focus:ring-primary px-2" 
                    value={config.time}
                    onChange={(e) => handleTimeChange(index, e.target.value)}
                  />
                </div>
                
                {/* Fee Input */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 text-xs font-medium">R$</span>
                  <Input 
                    type="number" 
                    step="0.01" 
                    className="w-full h-10 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 focus:border-primary rounded text-right text-slate-900 dark:text-white text-sm font-bold focus:ring-1 focus:ring-primary pr-4 pl-8" 
                    value={config.fee.toFixed(2)}
                    onChange={(e) => handleFeeChange(index, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Footer Action */}
      <div className="fixed bottom-0 left-0 w-full bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 p-4 flex justify-center z-30">
        <Button 
          onClick={handleSave}
          className="w-full max-w-md bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
        >
          <Save size={20} />
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
};

export default ConfiguracoesEntrega;