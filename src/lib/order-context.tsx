"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useOrderDraft } from "@/lib/use-order-draft";

type OrderDraftContextValue = ReturnType<typeof useOrderDraft>;

const OrderDraftContext = createContext<OrderDraftContextValue | null>(null);

export function OrderDraftProvider({ children }: { children: ReactNode }) {
  const draft = useOrderDraft();

  return (
    <OrderDraftContext.Provider value={draft}>
      {children}
    </OrderDraftContext.Provider>
  );
}

export function useOrderDraftContext() {
  const context = useContext(OrderDraftContext);
  if (!context) {
    throw new Error("useOrderDraftContext must be used within OrderDraftProvider.");
  }
  return context;
}
