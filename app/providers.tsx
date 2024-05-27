// app/providers.tsx
"use client";

import { ChakraProvider, theme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import CartProvider from "./contexts/CartContext";
import CustomerContextProvider from "./contexts/CustomerContext";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider>
        <CartProvider>
          <CustomerContextProvider>{children}</CustomerContextProvider>
        </CartProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}
