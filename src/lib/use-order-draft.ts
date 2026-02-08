"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { products } from "@/data/catalog";
import {
  getDraftSubtotal,
  normalizeQuantity,
  type DraftLine,
} from "@/lib/pricing";

const STORAGE_KEY = "ternline-order-draft-v1";

function isDraftLine(value: unknown): value is DraftLine {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<DraftLine>;
  return (
    typeof candidate.productId === "string" &&
    typeof candidate.quantity === "number" &&
    Number.isFinite(candidate.quantity)
  );
}

export function useOrderDraft() {
  const [lines, setLines] = useState<DraftLine[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [restoreError, setRestoreError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let restored: DraftLine[] = [];
    let failed = false;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (!Array.isArray(parsed)) {
          throw new Error("Stored draft is not a list.");
        }

        restored = parsed.flatMap((line) => {
          if (!isDraftLine(line)) {
            return [];
          }
          const product = products.find((item) => item.id === line.productId);
          return product
            ? [
                {
                  productId: product.id,
                  quantity: normalizeQuantity(product, line.quantity),
                },
              ]
            : [];
        });
      }
    } catch {
      failed = true;
    }

    queueMicrotask(() => {
      if (cancelled) {
        return;
      }
      setLines(restored);
      setRestoreError(failed);
      setHasHydrated(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [hasHydrated, lines]);

  const addOrUpdate = useCallback((productId: string, quantity: number) => {
    const product = products.find((item) => item.id === productId);
    if (!product) {
      return;
    }
    const normalized = normalizeQuantity(product, quantity);
    setLines((current) => {
      const existing = current.find((line) => line.productId === productId);
      return existing
        ? current.map((line) =>
            line.productId === productId
              ? { ...line, quantity: normalized }
              : line,
          )
        : [...current, { productId, quantity: normalized }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const product = products.find((item) => item.id === productId);
    if (!product) {
      return;
    }
    const normalized = normalizeQuantity(product, quantity);
    setLines((current) =>
      current.map((line) =>
        line.productId === productId
          ? { ...line, quantity: normalized }
          : line,
      ),
    );
  }, []);

  const remove = useCallback((productId: string) => {
    setLines((current) =>
      current.filter((line) => line.productId !== productId),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const subtotal = useMemo(
    () => getDraftSubtotal(lines, products),
    [lines],
  );

  return {
    lines,
    subtotal,
    hasHydrated,
    restoreError,
    addOrUpdate,
    updateQuantity,
    remove,
    clear,
  };
}
