import { describe, expect, it } from "vitest";
import { products } from "../src/data/catalog";
import {
  getDraftSubtotal,
  getUnitPrice,
  normalizeQuantity,
} from "../src/lib/pricing";

const ridgeTray = products.find((product) => product.id === "ridge-letter-tray")!;

describe("wholesale pricing", () => {
  it("uses the best reached quantity tier", () => {
    expect(getUnitPrice(ridgeTray, 12)).toBe(24);
    expect(getUnitPrice(ridgeTray, 48)).toBe(21.5);
    expect(getUnitPrice(ridgeTray, 120)).toBe(19.8);
  });

  it("normalizes quantities to MOQ and case increments", () => {
    expect(normalizeQuantity(ridgeTray, 1)).toBe(12);
    expect(normalizeQuantity(ridgeTray, 13)).toBe(24);
    expect(normalizeQuantity(ridgeTray, 48)).toBe(48);
  });

  it("calculates a tier-aware subtotal and ignores unknown products", () => {
    expect(
      getDraftSubtotal(
        [
          { productId: ridgeTray.id, quantity: 48 },
          { productId: "unknown", quantity: 999 },
        ],
        products,
      ),
    ).toBe(1032);
  });
});
