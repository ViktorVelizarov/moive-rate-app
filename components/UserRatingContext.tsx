import React, { createContext, useContext, useState, ReactNode } from 'react';

const UserRatingContext = createContext<{
  userRating: number;
  setUserRating: (rating: number) => void;
} | undefined>(undefined);

export function useUserRating() {
  const context = useContext(UserRatingContext);
  if (!context) {
    throw new Error('useUserRating must be used within a UserRatingProvider');
  }
  return context;
}

interface UserRatingProviderProps {
  children: ReactNode;
}

export function UserRatingProvider({ children }: UserRatingProviderProps) {
  const [userRating, setUserRating] = useState(0);

  return (
    <UserRatingContext.Provider value={{ userRating, setUserRating }}>
      {children}
    </UserRatingContext.Provider>
  );
}
