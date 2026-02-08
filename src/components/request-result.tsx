"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { products } from "@/data/catalog";
import { formatCurrency, getLineTotal, getUnitPrice } from "@/lib/pricing";
import { loadRequestRecord } from "@/lib/request-storage";
import type { RequestRecord } from "@/lib/request";
import { PrintIcon } from "@/components/icons";

export function RequestResult({ reference }: { reference: string }) {
  const [record, setRecord] = useState<RequestRecord | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) {
        setRecord(loadRequestRecord(reference));
        setLoaded(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [reference]);

  if (!loaded) {
    return <main className="flow-page"><div className="route-loading" role="status">Loading request summary…</div></main>;
  }

  if (!record) {
    return (
      <main className="flow-page request-missing">
        <span className="request-status-mark">?</span>
        <span className="eyebrow">Reference unavailable</span>
        <h1>This request is not stored in this browser.</h1>
        <p>Check the reference or return to the catalog to prepare a new order.</p>
        <div><Link className="button button--primary" href="/catalog?category=desk-systems">Browse Desk systems</Link></div>
      </main>
    );
  }

  const rows = record.lines.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId);
    return product ? [{ line, product }] : [];
  });

  return (
    <main className="flow-page request-result-page">
      <section className="request-success">
        <span className="request-status-mark">✓</span>
        <div><span className="eyebrow">Browser-local request prepared</span><h1>Reference {record.reference}</h1><p>The summary below is saved on this device. No email or external sales record has been created.</p></div>
        <button className="button button--secondary" type="button" onClick={() => window.print()}><PrintIcon /> Print summary</button>
      </section>

      <div className="request-result-layout">
        <section className="request-summary" aria-labelledby="request-lines-heading">
          <div className="request-section-heading"><span>Order lines</span><h2 id="request-lines-heading">{rows.length} {rows.length === 1 ? "product" : "products"}</h2></div>
          <div className="request-table-wrap"><table className="request-table"><thead><tr><th>SKU / product</th><th>Qty</th><th>Unit</th><th>Total</th></tr></thead><tbody>{rows.map(({ line, product }) => <tr key={product.id}><td><strong>{product.sku}</strong><span>{product.name}</span></td><td>{line.quantity}</td><td>{formatCurrency(getUnitPrice(product, line.quantity))}</td><td><strong>{formatCurrency(getLineTotal(product, line.quantity))}</strong></td></tr>)}</tbody><tfoot><tr><td colSpan={3}>Product subtotal</td><td>{formatCurrency(record.subtotal)}</td></tr></tfoot></table></div>
          <p className="request-summary__disclosure">Pricing excludes tax and freight. Freight requires destination review.</p>
        </section>

        <aside className="request-details" aria-labelledby="request-details-heading">
          <div className="request-section-heading"><span>Request details</span><h2 id="request-details-heading">Procurement contact</h2></div>
          <dl>
            <div><dt>Company</dt><dd>{record.company.companyName}</dd></div>
            <div><dt>Contact</dt><dd>{record.company.contactName}</dd></div>
            <div><dt>Work email</dt><dd>{record.company.workEmail}</dd></div>
            {record.company.phone ? <div><dt>Phone</dt><dd>{record.company.phone}</dd></div> : null}
            <div><dt>Delivery region</dt><dd>{record.company.deliveryRegion}</dd></div>
            {record.company.purchaseOrder ? <div><dt>PO / project</dt><dd>{record.company.purchaseOrder}</dd></div> : null}
            <div><dt>Prepared</dt><dd>{new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/Chicago", timeZoneName: "short" }).format(new Date(record.createdAt))}</dd></div>
          </dl>
          {record.company.notes ? <div className="request-notes"><span>Planning notes</span><p>{record.company.notes}</p></div> : null}
        </aside>
      </div>

      <section className="request-next-actions"><div><span className="eyebrow">Continue working</span><h2>Keep the reference for your records.</h2><p>Because this project has no external sales integration, follow-up happens outside this application.</p></div><div><Link className="button button--primary" href="/catalog?category=desk-systems">Return to Desk systems</Link><Link className="button button--secondary" href="/catalog">Browse all products</Link></div></section>
    </main>
  );
}
