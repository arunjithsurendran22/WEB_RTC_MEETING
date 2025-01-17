// context/UserContext.tsx
'use client'
import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  name: string;
  email: string;
  picture: string;
  sub: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Retrieve and set the user immediately after the component mounts
  useEffect(() => {
    const token = localStorage.getItem("google_token");

    if (token) {
      try {
        // Decode the JWT token to extract user data
        const decoded: any = jwtDecode(token);
        setUser(decoded); // Set the user data immediately
      } catch (error) {
        console.error("Error decoding the token", error);
      }
    }
  }, []); // This ensures the effect runs only once when the component mounts

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
