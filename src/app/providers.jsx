"use client";

import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";

export function Providers({ children }) {
  return (
    <SessionProvider>
      <HeroUIProvider>
        <CartProvider>{children}</CartProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
}