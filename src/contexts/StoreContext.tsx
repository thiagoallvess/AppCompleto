import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface BusinessHours {
  monday: { open: string; close: string };
  tuesday: { open: string; close: string };
  wednesday: { open: string; close: string };
  thursday: { open: string; close: string };
  friday: { open: string; close: string };
  saturday: { open: string; close: string };
  sunday: { open: string; close: string };
}

interface StoreContextType {
  storeOpen: boolean;
  setStoreOpen: (open: boolean) => void;
  businessHours: BusinessHours;
  setBusinessHours: (hours: BusinessHours) => void;
  getCurrentDayHours: () => { open: string; close: string } | null;
  isWithinBusinessHours: () => boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [storeOpen, setStoreOpenState] = useState<boolean>(() => {
    const saved = localStorage.getItem('storeOpen');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [businessHours, setBusinessHoursState] = useState<BusinessHours>(() => {
    const saved = localStorage.getItem('businessHours');
    return saved ? JSON.parse(saved) : {
      monday: { open: "09:00", close: "18:00" },
      tuesday: { open: "09:00", close: "18:00" },
      wednesday: { open: "09:00", close: "18:00" },
      thursday: { open: "09:00", close: "18:00" },
      friday: { open: "09:00", close: "20:00" },
      saturday: { open: "10:00", close: "22:00" },
      sunday: { open: "10:00", close: "18:00" }
    };
  });

  const setStoreOpen = (open: boolean) => {
    setStoreOpenState(open);
    localStorage.setItem('storeOpen', JSON.stringify(open));
  };

  const setBusinessHours = (hours: BusinessHours) => {
    setBusinessHoursState(hours);
    localStorage.setItem('businessHours', JSON.stringify(hours));
  };

  const getCurrentDayHours = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()];
    return businessHours[today as keyof BusinessHours];
  };

  const isWithinBusinessHours = () => {
    const dayHours = getCurrentDayHours();
    if (!dayHours) return false;

    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    return currentTime >= dayHours.open && currentTime <= dayHours.close;
  };

  return (
    <StoreContext.Provider value={{
      storeOpen,
      setStoreOpen,
      businessHours,
      setBusinessHours,
      getCurrentDayHours,
      isWithinBusinessHours
    }}>
      {children}
    </StoreContext.Provider>
  );
};