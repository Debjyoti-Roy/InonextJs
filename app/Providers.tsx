"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/Redux/store/store";
import { AuthProvider } from "@/auth/AuthContext";
import { Toaster } from "react-hot-toast";
import { PrimeReactProvider } from "primereact/api";

// Import PrimeReact styles
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <PrimeReactProvider>
          {children}
          <Toaster position="top-center" />
        </PrimeReactProvider>
      </AuthProvider>
    </Provider>
  );
}