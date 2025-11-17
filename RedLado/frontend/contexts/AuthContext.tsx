"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types/auth";
import * as authAPI from "@/lib/api/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (username: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        // In a real app, you might want to validate the token here
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);
    } catch (error) {
      // Re-throw error so UI can handle it
      throw error;
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await authAPI.logout();
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      const response = await authAPI.signup(username, email, password);
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);
    } catch (error) {
      // Re-throw error so UI can handle it
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

