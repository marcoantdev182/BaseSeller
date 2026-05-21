"use client";

import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>{children}</CartProvider>
        </ProductProvider>
      </AuthProvider>
    </SmoothScrollProvider>
  );
}

