"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { availabilityLabels, categories, type Product } from "@/data/catalog";
import { MinusIcon, PlusIcon } from "@/components/icons";
import { useCommerceUi } from "@/components/commerce-shell";
import { useOrderDraftContext } from "@/lib/order-context";
import { formatCurrency, getLineTotal, getUnitPrice, normalizeQuantity } from "@/lib/pricing";

export function ProductDetail({ product, related }: { product: Product; related: readonly Product[] }) {
  const [quantity, setQuantity] = useState(product.minimumOrder);
  const draft = useOrderDraftContext();
  const { notify, openDraft } = useCommerceUi();
  const category = categories.find((item) => item.id === product.categoryId)!;
  const unitPrice = getUnitPrice(product, quantity);

  const addProduct = () => {
    draft.addOrUpdate(product.id, quantity);
    notify(`${product.name} added at ${quantity} units.`);
  };

  return (
    <main className="detail-page">
      <nav className="page-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span><Link href="/catalog">Catalog</Link><span>/</span><span>{product.name}</span>
      </nav>

      <section className="product-detail" aria-labelledby="product-title">
        <div className="product-gallery">
          <div className="product-gallery__main"><Image src={product.image} alt={product.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 55vw" /></div>
          <div className="product-gallery__detail"><Image src={product.image} alt="" fill sizes="25vw" /></div>
          <div className="product-gallery__detail product-gallery__detail--right"><Image src={product.image} alt="" fill sizes="25vw" /></div>
        </div>

        <div className="product-detail__panel">
          <div className="product-detail__topline">
            <span>{category.label}</span>
            <span className={`stock-badge stock-badge--${product.availability}`}><span aria-hidden="true" />{availabilityLabels[product.availability]}</span>
          </div>
          <h1 id="product-title">{product.name}</h1>
          <p className="product-detail__sku">{product.sku}</p>
          <p className="product-detail__description">{product.description}</p>

          <dl className="detail-spec-grid">
            <div><dt>Material</dt><dd>{product.material}</dd></div>
            <div><dt>Finish</dt><dd>{product.finish}</dd></div>
            <div><dt>Dimensions</dt><dd>{product.dimensions}</dd></div>
            <div><dt>Lead time</dt><dd>{product.leadTime}</dd></div>
          </dl>

          <div className="detail-pricing">
            <div className="detail-pricing__heading"><span>Volume pricing</span><strong>{formatCurrency(unitPrice)} selected</strong></div>
            <div className="detail-pricing__tiers">
              {product.priceTiers.map((tier, index) => (
                <div className={quantity >= tier.minimumQuantity && unitPrice === tier.unitPrice ? "detail-pricing__tier detail-pricing__tier--active" : "detail-pricing__tier"} key={tier.minimumQuantity}>
                  <span>{tier.minimumQuantity}{index === product.priceTiers.length - 1 ? "+" : ""} units</span>
                  <strong>{formatCurrency(tier.unitPrice)}</strong>
                  <small>per unit</small>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-order-box">
            <div>
              <span>Order quantity</span>
              <small>MOQ {product.minimumOrder} · case step {product.orderIncrement}</small>
            </div>
            <div className="detail-order-box__controls">
              <div className="quantity-control">
                <button type="button" disabled={quantity <= product.minimumOrder} onClick={() => setQuantity((current) => normalizeQuantity(product, current - product.orderIncrement))} aria-label="Decrease quantity"><MinusIcon /></button>
                <output><strong>{quantity}</strong><span>units</span></output>
                <button type="button" onClick={() => setQuantity((current) => current + product.orderIncrement)} aria-label="Increase quantity"><PlusIcon /></button>
              </div>
              <button className="button button--accent" type="button" onClick={addProduct}>Add · {formatCurrency(getLineTotal(product, quantity))}</button>
            </div>
            {draft.lines.some((line) => line.productId === product.id) ? (
              <button className="detail-order-box__draft-link" type="button" onClick={openDraft}>Already in draft · Review saved line</button>
            ) : null}
          </div>

          <p className="detail-disclosure">Prices exclude tax and freight. Final freight depends on destination and total shipment.</p>
        </div>
      </section>

      <section className="related-products" aria-labelledby="related-title">
        <div className="section-heading"><div><span className="eyebrow">Same product group</span><h2 id="related-title">Related lines</h2></div><Link className="text-link" href={`/catalog?category=${product.categoryId}`}>View category →</Link></div>
        <div className="related-products__grid">
          {related.map((item) => (
            <Link href={`/catalog/${item.slug}`} className="related-card" key={item.id}>
              <div><Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" /></div>
              <span>{item.sku}</span><h3>{item.name}</h3><p>MOQ {item.minimumOrder} · {formatCurrency(item.priceTiers[0].unitPrice)} / unit</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
