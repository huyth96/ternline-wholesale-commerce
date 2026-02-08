"use client";

import Image from "next/image";
import Link from "next/link";
import {
  availabilityLabels,
  categories,
  type Product,
} from "@/data/catalog";
import { MinusIcon, PlusIcon } from "@/components/icons";
import { formatCurrency, getUnitPrice } from "@/lib/pricing";

interface ProductCardProps {
  product: Product;
  quantity: number;
  viewMode: "grid" | "list";
  alreadyInDraft: boolean;
  onQuantityChange: (quantity: number) => void;
  onAdd: () => void;
}

export function ProductCard({
  product,
  quantity,
  viewMode,
  alreadyInDraft,
  onQuantityChange,
  onAdd,
}: ProductCardProps) {
  const category = categories.find((item) => item.id === product.categoryId)!;
  const activeTier = [...product.priceTiers]
    .reverse()
    .find((tier) => quantity >= tier.minimumQuantity)!;
  const unitPrice = getUnitPrice(product, quantity);

  return (
    <article
      className={`product-card ${
        viewMode === "list" ? "product-card--list" : ""
      }`}
    >
      <Link className="product-card__media" href={`/catalog/${product.slug}`}>
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          loading="eager"
          quality={82}
          sizes={
            viewMode === "list"
              ? "(max-width: 760px) 100vw, 300px"
              : "(max-width: 760px) 100vw, (max-width: 1120px) 50vw, 33vw"
          }
          className="product-card__image"
        />
        <span className={`stock-badge stock-badge--${product.availability}`}>
          <span aria-hidden="true" />
          {availabilityLabels[product.availability]}
        </span>
      </Link>

      <div className="product-card__content">
        <div className="product-card__identity">
          <span className="product-card__category">{category.label}</span>
          <h2><Link href={`/catalog/${product.slug}`}>{product.name}</Link></h2>
          <p className="product-card__sku">{product.sku}</p>
          <p className="product-card__description">{product.description}</p>
        </div>

        <dl className="product-facts">
          <div>
            <dt>MOQ</dt>
            <dd>{product.minimumOrder} units</dd>
          </div>
          <div>
            <dt>Lead time</dt>
            <dd>{product.leadTime}</dd>
          </div>
          <div className="product-facts__material">
            <dt>Material</dt>
            <dd>{product.material}</dd>
          </div>
        </dl>

        <div className="tier-pricing" aria-label={`Volume pricing for ${product.name}`}>
          <div className="tier-pricing__label">
            <span>Unit pricing</span>
            <span>{formatCurrency(unitPrice)} selected</span>
          </div>
          <div className="tier-pricing__grid">
            {product.priceTiers.map((tier, index) => (
              <div
                className={
                  tier.minimumQuantity === activeTier.minimumQuantity
                    ? "tier-pricing__tier tier-pricing__tier--active"
                    : "tier-pricing__tier"
                }
                key={tier.minimumQuantity}
              >
                <span>{index === 2 ? `${tier.minimumQuantity}+` : tier.minimumQuantity}</span>
                <strong>{formatCurrency(tier.unitPrice)}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="product-card__order-row">
          <div className="quantity-control" aria-label={`Quantity for ${product.name}`}>
            <button
              type="button"
              onClick={() =>
                onQuantityChange(quantity - product.orderIncrement)
              }
              disabled={quantity <= product.minimumOrder}
              aria-label={`Decrease ${product.name} quantity by ${product.orderIncrement}`}
            >
              <MinusIcon />
            </button>
            <output aria-live="polite">
              <strong>{quantity}</strong>
              <span>units</span>
            </output>
            <button
              type="button"
              onClick={() =>
                onQuantityChange(quantity + product.orderIncrement)
              }
              aria-label={`Increase ${product.name} quantity by ${product.orderIncrement}`}
            >
              <PlusIcon />
            </button>
          </div>
          <button className="button button--primary add-button" type="button" onClick={onAdd}>
            {alreadyInDraft ? "Update order" : "Add to order"}
          </button>
        </div>
      </div>
    </article>
  );
}
