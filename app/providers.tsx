// app/providers.tsx
"use client";

import { ChakraProvider, theme } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import CartProvider from "./contexts/CartContext";
import CustomerContextProvider from "./contexts/CustomerContext";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ChakraProvider theme={theme}>
      {/* <AdminProvider> */}
      <CartProvider>
        <CustomerContextProvider>{children}</CustomerContextProvider>
      </CartProvider>
      {/* </AdminProvider> */}
    </ChakraProvider>
  );
}
