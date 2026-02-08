import type { Metadata } from "next";
import { CatalogScreen } from "@/components/catalog-screen";
import { categories, type CategoryId } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Wholesale Catalog",
  description:
    "Compare Ternline workplace products by SKU, availability, MOQ, lead time, and wholesale volume pricing.",
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const rawCategory = (await searchParams).category;
  const category =
    typeof rawCategory === "string" &&
    categories.some((item) => item.id === rawCategory)
      ? (rawCategory as CategoryId)
      : undefined;

  return <CatalogScreen key={category ?? "all-products"} initialCategory={category} />;
}
