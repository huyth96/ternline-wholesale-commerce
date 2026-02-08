import type { Product } from "@/data/catalog";

export interface DraftLine {
  productId: string;
  quantity: number;
}
export function getUnitPrice(product: Product, quantity: number): number {
  const matchingTier = [...product.priceTiers]
    .reverse()
    .find((tier) => quantity >= tier.minimumQuantity);

  return matchingTier?.unitPrice ?? product.priceTiers[0].unitPrice;
}

export function normalizeQuantity(product: Product, quantity: number): number {
  if (!Number.isFinite(quantity) || quantity <= product.minimumOrder) {
    return product.minimumOrder;
  }

  const incrementsAboveMinimum = Math.ceil(
    (quantity - product.minimumOrder) / product.orderIncrement,
  );

  return product.minimumOrder + incrementsAboveMinimum * product.orderIncrement;
}

export function getLineTotal(product: Product, quantity: number): number {
  return getUnitPrice(product, quantity) * quantity;
}

export function getDraftSubtotal(
  lines: readonly DraftLine[],
  catalog: readonly Product[],
): number {
  return lines.reduce((subtotal, line) => {
    const product = catalog.find((item) => item.id === line.productId);
    return product
      ? subtotal + getLineTotal(product, normalizeQuantity(product, line.quantity))
      : subtotal;
  }, 0);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}
