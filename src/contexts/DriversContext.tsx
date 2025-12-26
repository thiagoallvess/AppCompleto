import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Driver {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'route' | 'offline';
  deliveriesToday: number;
  location?: string;
  lastLogin?: string;
}

interface DriversContextType {
  drivers: Driver[];
  addDriver: (driver: Driver) => void;
  updateDriver: (id: string, updates: Partial<Driver>) => void;
  removeDriver: (id: string) => void;
  getDriverById: (id: string) => Driver | undefined;
}

const DriversContext = createContext<DriversContextType | undefined>(undefined);

export const useDrivers = () => {
  const context = useContext(DriversContext);
  if (!context) {
    throw new Error('useDrivers must be used within a DriversProvider');
  }
  return context;
};

export const DriversProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [drivers, setDrivers] = useState<Driver[]>(() => {
    const saved = localStorage.getItem('drivers');
    if (saved) return JSON.parse(saved);
    
    return [
      {
        id: '1',
        name: 'Carlos Silva',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMbBG531iHyzQ2ieA7iCE7QwMoyNDxNUTps0n6bu9VAXZotEvwQacmERyeC7E25x3bnO8zwaPqsxHICd-qw7znP3aRdlO-IIUsFZzwNGqzH34u7jNZqHGCT1BneqFFgXYFYNMQV-V-FpL5qdGlLNTst0w1oWZQ5cTrxjrgGf-KOB8BhJ1WWrz0TtSoy2o7b3MhFxGxIlkPOZqAFiVrvD0p8nwjV9o0OP5CPbYMT68p5r_jkaza1F1oJG39YVccaU-0Oj1hNHvy6A',
        status: 'route',
        deliveriesToday: 14,
        location: 'Zona Norte'
      },
      {
        id: '2',
        name: 'Ana Souza',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADb_lbeqQjl3sZt5vNiRmOLqk5lvFUYZWgBfGU33o1lp9AaMHUazc7i1C-J-A2xCrtMD81tociArJ4bZUKQMvjMdThtDOTqO3r19p555QDJASZQ6ZnLZJ_sVsecN1g5PyTAJtScAm4oxHeq76QbW8HdAwZ3WQ1NRGNZkhwXw5xZ9SieJMActPt85QZ-PxIGHI-d-g-OXWQRz-lR7nZnb7_DA-SSHgiZyTtcjEyl6SW0HY_x_JtiWGcqelb1b0FO23ADPKD3TUWew',
        status: 'online',
        deliveriesToday: 8
      },
      {
        id: '3',
        name: 'João Pedro',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwJPGkSX66pk0KZDcT7wgLrcy-BNuP1YF6GzwJyLoqTZzj8PjkQLIARD-nVCeFrtf2gH776zBZfGgGrzolJ1lXhoWsoKS4cFPRlKs0a7l5kSrvGizpD6i_FxddrC8cp-6Zyr6uu9mdjB2ZCkJaMxxtDQAZwsRzLNWyMwOXhBRN2Rl1md9usSmfBI9S3vS8lU-wwGUZZSYH-e3kLkKk55JtsPHefm9x1u17Zt-wJ0IjLbVY34JpjKPxJbBXweyIrtO7BqPeLwQcRg',
        status: 'online',
        deliveriesToday: 5
      },
      {
        id: '4',
        name: 'Marcos Oliveira',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDow_Jw0aNI-H56mqBrYXlT7t7VB4P4nfyev0pVJe7SldP2qHC-c6lk2fqXzVpv2kgB3RYbX5uh-nhn73JTXALM-zDfawW7rR8VtzKIOfMRlf7rr6xXg6ePSIoP5Kjy_gbGUOQD0p4TbVzBuBEeHoVAJsmHNCj-QHT5utqR9M7EO2iHlwyn34DnPJszfTNoOFuFmGgf_6cvgxyXHQ8YfJ0-9wmF8RuJziuxfrq71xtlxMVeIPDYef9H7uJIrDmDHq2tGHRcsQpJnA',
        status: 'offline',
        deliveriesToday: 0,
        lastLogin: 'Hoje, 14:30'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('drivers', JSON.stringify(drivers));
  }, [drivers]);

  const addDriver = (driver: Driver) => setDrivers(prev => [...prev, driver]);
  
  const updateDriver = (id: string, updates: Partial<Driver>) => {
    setDrivers(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  const removeDriver = (id: string) => setDrivers(prev => prev.filter(d => d.id !== id));
  
  const getDriverById = (id: string) => drivers.find(d => d.id === id);

  return (
    <DriversContext.Provider value={{ drivers, addDriver, updateDriver, removeDriver, getDriverById }}>
      {children}
    </DriversContext.Provider>
  );
};