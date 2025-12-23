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
  referralRewardYou: string;
  setReferralRewardYou: (value: string) => void;
  referralRewardThem: string;
  setReferralRewardThem: (value: string) => void;
  getCurrentDayHours: () => { open: string; close: string } | null;
  isWithinBusinessHours: () => boolean;
  getNextOpenTime: () => { dayName: string; time: string } | null;
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

const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const dayNamesMap = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

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

  const [referralRewardYou, setReferralRewardYouState] = useState<string>(() => {
    return localStorage.getItem('referralRewardYou') || "10";
  });

  const [referralRewardThem, setReferralRewardThemState] = useState<string>(() => {
    return localStorage.getItem('referralRewardThem') || "5";
  });

  const setStoreOpen = (open: boolean) => {
    setStoreOpenState(open);
    localStorage.setItem('storeOpen', JSON.stringify(open));
  };

  const setBusinessHours = (hours: BusinessHours) => {
    setBusinessHoursState(hours);
    localStorage.setItem('businessHours', JSON.stringify(hours));
  };

  const setReferralRewardYou = (value: string) => {
    setReferralRewardYouState(value);
    localStorage.setItem('referralRewardYou', value);
  };

  const setReferralRewardThem = (value: string) => {
    setReferralRewardThemState(value);
    localStorage.setItem('referralRewardThem', value);
  };

  const getCurrentDayHours = () => {
    const todayIndex = new Date().getDay();
    const today = daysOfWeek[todayIndex];
    return businessHours[today as keyof BusinessHours];
  };

  const isWithinBusinessHours = () => {
    const dayHours = getCurrentDayHours();
    if (!dayHours) return false;

    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    return currentTime >= dayHours.open && currentTime <= dayHours.close;
  };

  const getNextOpenTime = () => {
    const now = new Date();
    const currentDayIndex = now.getDay();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const todayKey = daysOfWeek[currentDayIndex] as keyof BusinessHours;
    const todayHours = businessHours[todayKey];

    if (todayHours.open !== todayHours.close && todayHours.open > currentTime) {
      return { dayName: 'Hoje', time: todayHours.open };
    }

    for (let i = 1; i <= 7; i++) {
      const nextDayIndex = (currentDayIndex + i) % 7;
      const nextDayKey = daysOfWeek[nextDayIndex] as keyof BusinessHours;
      const nextDayHours = businessHours[nextDayKey];

      if (nextDayHours.open !== nextDayHours.close) {
        const dayName = i === 1 ? 'Amanhã' : dayNamesMap[nextDayIndex];
        return { dayName, time: nextDayHours.open };
      }
    }

    return null;
  };

  return (
    <StoreContext.Provider value={{
      storeOpen,
      setStoreOpen,
      businessHours,
      setBusinessHours,
      referralRewardYou,
      setReferralRewardYou,
      referralRewardThem,
      setReferralRewardThem,
      getCurrentDayHours,
      isWithinBusinessHours,
      getNextOpenTime
    }}>
      {children}
    </StoreContext.Provider>
  );
};