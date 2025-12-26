"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ReferralUse {
  name: string;
  date: string;
  status: string;
}

interface UserProfile {
  name: string;
  email: string;
  referralCode: string;
  referralHistory: ReferralUse[];
  balance: number;
}

interface UserContextType {
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  addReferralUse: (referral: ReferralUse) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('user_profile');
    if (saved) return JSON.parse(saved);
    
    return {
      name: "João Silva",
      email: "joao.silva@email.com",
      referralCode: "GELA-" + Math.random().toString(36).substring(2, 7).toUpperCase(),
      balance: 0,
      referralHistory: []
    };
  });

  useEffect(() => {
    localStorage.setItem('user_profile', JSON.stringify(user));
  }, [user]);

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const addReferralUse = (referral: ReferralUse) => {
    setUser(prev => ({
      ...prev,
      referralHistory: [referral, ...prev.referralHistory]
    }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser, addReferralUse }}>
      {children}
    </UserContext.Provider>
  );
};