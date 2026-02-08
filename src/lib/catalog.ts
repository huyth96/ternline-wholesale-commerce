import type {
  AvailabilityId,
  CategoryId,
  Product,
  SortOption,
} from "@/data/catalog";

export interface CatalogFilters {
  query: string;
  categories: readonly CategoryId[];
  availability: readonly AvailabilityId[];
}
export function filterProducts(
  source: readonly Product[],
  filters: CatalogFilters,
): Product[] {
  const normalizedQuery = filters.query.trim().toLocaleLowerCase("en-US");

  return source.filter((product) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      product.name.toLocaleLowerCase("en-US").includes(normalizedQuery) ||
      product.sku.toLocaleLowerCase("en-US").includes(normalizedQuery);

    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.categoryId);

    const matchesAvailability =
      filters.availability.length === 0 ||
      filters.availability.includes(product.availability);

    return matchesQuery && matchesCategory && matchesAvailability;
  });
}

export function sortProducts(
  source: readonly Product[],
  sort: SortOption,
): Product[] {
  const result = [...source];

  result.sort((left, right) => {
    switch (sort) {
      case "name":
        return left.name.localeCompare(right.name, "en-US");
      case "price":
        return left.priceTiers[0].unitPrice - right.priceTiers[0].unitPrice;
      case "lead-time":
        return left.leadTimeDays - right.leadTimeDays;
      case "featured":
      default:
        return left.featuredRank - right.featuredRank;
    }
  });

  return result;
}
