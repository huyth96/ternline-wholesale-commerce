"use client";

import Link from "next/link";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { categories } from "@/data/catalog";
import { formatCurrency } from "@/lib/pricing";
import { useOrderDraftContext } from "@/lib/order-context";
import {
  ArrowUpIcon,
  MenuIcon,
  OrderIcon,
  PrintIcon,
  TernlineMark,
} from "@/components/icons";
import { OrderDrawer } from "@/components/order-drawer";

interface ToastState {
  message: string;
  tone: "success" | "error";
}

interface CommerceUiContextValue {
  openDraft: () => void;
  notify: (message: string, tone?: "success" | "error") => void;
}

const CommerceUiContext = createContext<CommerceUiContextValue | null>(null);

export function useCommerceUi() {
  const context = useContext(CommerceUiContext);
  if (!context) {
    throw new Error("useCommerceUi must be used within CommerceShell.");
  }
  return context;
}

export function CommerceShell({ children }: { children: ReactNode }) {
  const draft = useOrderDraftContext();
  const [draftOpen, setDraftOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const notify = (
    message: string,
    tone: "success" | "error" = "success",
  ) => setToast({ message, tone });

  useEffect(() => {
    if (!draftOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDraftOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [draftOpen]);

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timeout = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  return (
    <CommerceUiContext.Provider value={{ openDraft: () => setDraftOpen(true), notify }}>
      <div className="commerce-shell" id="page-top">
        <div className="commerce-utility" aria-label="Trade service information">
          <span>Trade program · Wholesale pricing</span>
          <span>Delivery · Contiguous United States</span>
          <span>USD · Mon–Fri 08:30–17:00 CT</span>
        </div>

        <header className="commerce-header">
          <Link className="wordmark commerce-wordmark" href="/" aria-label="Ternline home">
            <TernlineMark />
            <span>TERNLINE</span>
          </Link>

          <nav className="commerce-category-nav" aria-label="Product categories">
            {categories.map((category) => (
              <Link
                href={`/catalog?category=${category.id}`}
                key={category.id}
              >
                {category.label}
              </Link>
            ))}
          </nav>

          <div className="commerce-header__actions">
            <button
              className="order-trigger order-trigger--accent"
              type="button"
              onClick={() => setDraftOpen(true)}
              aria-haspopup="dialog"
            >
              <OrderIcon />
              <span className="order-trigger__label">Order draft</span>
              <span className="order-trigger__count" aria-label={`${draft.lines.length} lines`}>
                {draft.lines.length}
              </span>
              <strong>{formatCurrency(draft.subtotal)}</strong>
            </button>
            <button
              className="mobile-nav-trigger"
              type="button"
              onClick={() => setMobileNavOpen((current) => !current)}
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-commerce-nav"
              aria-label="Toggle navigation"
            >
              <MenuIcon />
            </button>
          </div>
        </header>

        <nav
          className={mobileNavOpen ? "mobile-commerce-nav mobile-commerce-nav--open" : "mobile-commerce-nav"}
          id="mobile-commerce-nav"
          aria-label="Mobile navigation"
        >
          <Link href="/catalog" onClick={() => setMobileNavOpen(false)}>All products</Link>
          {categories.map((category) => (
            <Link href={`/catalog?category=${category.id}`} key={category.id} onClick={() => setMobileNavOpen(false)}>
              {category.label}
            </Link>
          ))}
          <Link href="/order" onClick={() => setMobileNavOpen(false)}>Review order</Link>
        </nav>

        <div className="commerce-page">{children}</div>

        <footer className="commerce-footer">
          <div className="commerce-footer__main">
            <section className="commerce-footer__brand" aria-labelledby="footer-brand-title">
              <div className="wordmark wordmark--footer" id="footer-brand-title">
                <TernlineMark />
                <span>TERNLINE</span>
              </div>
              <p>
                Durable workplace systems with clear case quantities, volume pricing,
                and lead times for repeat orders.
              </p>
              <dl className="footer-facts">
                <div><dt>Region</dt><dd>Contiguous US</dd></div>
                <div><dt>Currency</dt><dd>USD</dd></div>
                <div><dt>Service</dt><dd>Mon–Fri, CT</dd></div>
              </dl>
            </section>

            <nav className="footer-link-group" aria-label="Catalog links">
              <h2>Catalog</h2>
              <Link href="/catalog">All products</Link>
              {categories.map((category) => (
                <Link href={`/catalog?category=${category.id}`} key={category.id}>
                  {category.label}
                </Link>
              ))}
            </nav>

            <nav className="footer-link-group" aria-label="Ordering links">
              <h2>Ordering</h2>
              <Link href="/order">Review order</Link>
              <button type="button" onClick={() => setDraftOpen(true)}>Open order draft</button>
              <p>MOQ and volume breaks are applied by product line.</p>
            </nav>

            <section className="footer-link-group" aria-labelledby="trade-service-title">
              <h2 id="trade-service-title">Trade service</h2>
              <p>Planning response: within one business day.</p>
              <p>Freight is quoted after destination and quantities are reviewed.</p>
              <p>Drafts remain in this browser until cleared.</p>
            </section>
          </div>

          <div className="commerce-footer__actions">
            <button type="button" onClick={() => window.print()}>
              <PrintIcon />
              <span><strong>Print catalog</strong><small>Print the current page</small></span>
            </button>
            <button className="commerce-footer__action--accent" type="button" onClick={() => setDraftOpen(true)}>
              <OrderIcon />
              <span><strong>Open order draft ({draft.lines.length})</strong><small>Review locally saved lines</small></span>
            </button>
            <button
              type="button"
              onClick={() => document.getElementById("page-top")?.scrollIntoView({ behavior: "smooth" })}
            >
              <ArrowUpIcon />
              <span><strong>Back to top</strong><small>Return to page navigation</small></span>
            </button>
          </div>

          <div className="commerce-footer__legal">
            <span>Prices in USD. Tax and freight excluded.</span>
            <span>Copying or saving a draft does not submit a purchase request.</span>
            <span>© 2026 Ternline Workplace Systems</span>
          </div>
        </footer>

        <OrderDrawer
          open={draftOpen}
          lines={draft.lines}
          subtotal={draft.subtotal}
          hasHydrated={draft.hasHydrated}
          restoreError={draft.restoreError}
          onClose={() => setDraftOpen(false)}
          onUpdateQuantity={draft.updateQuantity}
          onRemove={(productId) => {
            draft.remove(productId);
            notify("Line removed from the order draft.");
          }}
          onClear={draft.clear}
          onNotify={notify}
        />

        <a
          className="portfolio-demo-badge"
          href="https://github.com/huyth96/ternline-wholesale-commerce"
          target="_blank"
          rel="noreferrer"
          aria-label="Portfolio demo by Huy Trương — open project repository"
        >
          Portfolio demo · By Huy Trương <span aria-hidden="true">↗</span>
        </a>

        {toast ? (
          <div
            className={`toast toast--${toast.tone}`}
            role={toast.tone === "error" ? "alert" : "status"}
            aria-live={toast.tone === "error" ? "assertive" : "polite"}
          >
            <span aria-hidden="true" />
            {toast.message}
          </div>
        ) : null}
      </div>
    </CommerceUiContext.Provider>
  );
}
