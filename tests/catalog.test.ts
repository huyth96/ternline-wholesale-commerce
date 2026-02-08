import { describe, expect, it } from "vitest";
import { products } from "../src/data/catalog";
import { filterProducts, sortProducts } from "../src/lib/catalog";

describe("catalog search and filters", () => {
  it("searches by partial product name or SKU", () => {
    const byName = filterProducts(products, {
      query: "carafe",
      categories: [],
      availability: [],
    });
    const bySku = filterProducts(products, {
      query: "ST-422",
      categories: [],
      availability: [],
    });

    expect(byName.map((product) => product.id)).toEqual(["still-carafe-set"]);
    expect(bySku.map((product) => product.id)).toEqual(["route-archive-crate"]);
  });

  it("combines category and availability filters", () => {
    const result = filterProducts(products, {
      query: "",
      categories: ["desk-systems"],
      availability: ["made-to-order"],
    });

    expect(result.map((product) => product.id)).toEqual(["span-monitor-shelf"]);
  });

  it("sorts by opening wholesale price", () => {
    const sorted = sortProducts(products, "price");
    expect(sorted[0].id).toBe("current-cable-dock");
    expect(sorted.at(-1)?.id).toBe("mesa-waste-sorter");
  });
});
