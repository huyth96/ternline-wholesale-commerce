import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { products } from "@/data/catalog";

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) {
    return { title: "Product not found" };
  }
  return {
    title: product.name,
    description: `${product.description} SKU ${product.sku}. MOQ ${product.minimumOrder} units.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) {
    notFound();
  }

  const sameCategory = products.filter((item) => item.categoryId === product.categoryId && item.id !== product.id);
  const related = [...sameCategory, ...products.filter((item) => item.id !== product.id && item.categoryId !== product.categoryId)].slice(0, 3);
  return <ProductDetail product={product} related={related} />;
}
