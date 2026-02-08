"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { products } from "@/data/catalog";
import { CloseIcon, CopyIcon, MinusIcon, PlusIcon } from "@/components/icons";
import {
  formatCurrency,
  getLineTotal,
  getUnitPrice,
  type DraftLine,
} from "@/lib/pricing";

interface OrderDrawerProps {
  open: boolean;
  lines: readonly DraftLine[];
  subtotal: number;
  hasHydrated: boolean;
  restoreError: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onClear: () => void;
  onNotify: (message: string, tone?: "success" | "error") => void;
}

async function copyToClipboard(value: string) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) {
    throw new Error("Clipboard copy failed.");
  }
}

export function OrderDrawer({
  open,
  lines,
  subtotal,
  hasHydrated,
  restoreError,
  onClose,
  onUpdateQuantity,
  onRemove,
  onClear,
  onNotify,
}: OrderDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const draftProducts = lines.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId);
    return product ? [{ line, product }] : [];
  });

  const handleCopy = async () => {
    const summary = [
      "TERNLINE ORDER DRAFT",
      "",
      ...draftProducts.map(({ line, product }) => {
        const lineTotal = getLineTotal(product, line.quantity);
        return `${product.sku} | ${product.name} | ${line.quantity} units | ${formatCurrency(
          getUnitPrice(product, line.quantity),
        )} each | ${formatCurrency(lineTotal)}`;
      }),
      "",
      `Subtotal before tax and freight: ${formatCurrency(subtotal)}`,
      "This copied list has not been submitted.",
    ].join("\n");

    try {
      await copyToClipboard(summary);
      onNotify("Order list copied. No request has been submitted.");
    } catch {
      onNotify("Could not copy the order list. Please try again.", "error");
    }
  };

  const handleClose = () => {
    setConfirmClear(false);
    onClose();
  };

  return (
    <div className="drawer-layer">
      <div className="drawer-backdrop" onMouseDown={handleClose} aria-hidden="true" />
      <aside
        className="order-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-drawer-title"
      >
        <div className="drawer-titlebar">
          <div>
            <span className="eyebrow">Browser-local list</span>
            <h2 id="order-drawer-title">Order draft</h2>
          </div>
          <button
            ref={closeButtonRef}
            className="icon-button"
            type="button"
            onClick={handleClose}
            aria-label="Close order draft"
          >
            <CloseIcon />
          </button>
        </div>

        {restoreError ? (
          <div className="inline-alert inline-alert--warning" role="alert">
            The previous draft could not be restored. A new local draft is active.
          </div>
        ) : null}

        <div className="order-drawer__body">
          {!hasHydrated ? (
            <div className="draft-loading" role="status">
              <span className="loading-line" />
              <span className="loading-line loading-line--short" />
              Restoring draft…
            </div>
          ) : draftProducts.length === 0 ? (
            <div className="empty-draft">
              <span className="empty-draft__mark" aria-hidden="true">
                TL
              </span>
              <h3>Your order draft is empty.</h3>
              <p>Add a compliant case quantity from the catalog to compare totals here.</p>
              <button className="button button--secondary" type="button" onClick={handleClose}>
                Browse catalog
              </button>
            </div>
          ) : (
            <ul className="draft-lines">
              {draftProducts.map(({ line, product }) => {
                const unitPrice = getUnitPrice(product, line.quantity);
                return (
                  <li className="draft-line" key={product.id}>
                    <div className="draft-line__media">
                      <Image
                        src={product.image}
                        alt=""
                        fill
                        sizes="88px"
                        className="draft-line__image"
                      />
                    </div>
                    <div className="draft-line__content">
                      <div className="draft-line__topline">
                        <div>
                          <h3>{product.name}</h3>
                          <p>{product.sku}</p>
                        </div>
                        <strong>{formatCurrency(getLineTotal(product, line.quantity))}</strong>
                      </div>
                      <p className="draft-line__price">
                        {formatCurrency(unitPrice)} each · case step {product.orderIncrement}
                      </p>
                      <div className="draft-line__actions">
                        <div className="quantity-control quantity-control--compact">
                          <button
                            type="button"
                            disabled={line.quantity <= product.minimumOrder}
                            onClick={() =>
                              onUpdateQuantity(
                                product.id,
                                line.quantity - product.orderIncrement,
                              )
                            }
                            aria-label={`Decrease ${product.name} quantity`}
                          >
                            <MinusIcon />
                          </button>
                          <output aria-live="polite">{line.quantity}</output>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(
                                product.id,
                                line.quantity + product.orderIncrement,
                              )
                            }
                            aria-label={`Increase ${product.name} quantity`}
                          >
                            <PlusIcon />
                          </button>
                        </div>
                        <button
                          className="text-button text-button--danger"
                          type="button"
                          onClick={() => onRemove(product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="order-drawer__footer">
          <div className="order-summary-row">
            <span>Draft subtotal</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          <p className="order-disclaimer">
            Draft prices exclude tax and freight. Copying this list does not submit a request.
          </p>

          {confirmClear ? (
            <div className="clear-confirm" role="group" aria-label="Confirm clear draft">
              <span>Remove every line?</span>
              <div>
                <button
                  className="text-button"
                  type="button"
                  onClick={() => setConfirmClear(false)}
                >
                  Cancel
                </button>
                <button
                  className="text-button text-button--danger"
                  type="button"
                  onClick={() => {
                    onClear();
                    setConfirmClear(false);
                    onNotify("Order draft cleared.");
                  }}
                >
                  Clear draft
                </button>
              </div>
            </div>
          ) : (
            <div className="order-drawer__buttons order-drawer__buttons--review">
              <button
                className="button button--secondary"
                type="button"
                disabled={lines.length === 0}
                onClick={() => setConfirmClear(true)}
              >
                Clear
              </button>
              <button
                className="button button--primary"
                type="button"
                disabled={lines.length === 0}
                onClick={handleCopy}
              >
                <CopyIcon />
                Copy list
              </button>
              <Link className="button button--primary" href="/order" onClick={handleClose}>
                Review order
              </Link>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
