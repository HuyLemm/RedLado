"use client";

import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from "./ThemeContext";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}

