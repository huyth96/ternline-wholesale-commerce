"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { MinusIcon, PlusIcon } from "@/components/icons";
import { products } from "@/data/catalog";
import { useOrderDraftContext } from "@/lib/order-context";
import { formatCurrency, getLineTotal, getUnitPrice } from "@/lib/pricing";
import {
  deliveryRegions,
  validateRequest,
  type CompanyDetails,
  type RequestErrors,
  type RequestRecord,
} from "@/lib/request";
import { saveRequestRecord } from "@/lib/request-storage";

const initialCompany: CompanyDetails = {
  companyName: "",
  contactName: "",
  workEmail: "",
  phone: "",
  deliveryRegion: "",
  purchaseOrder: "",
  notes: "",
};

export function OrderScreen() {
  const router = useRouter();
  const draft = useOrderDraftContext();
  const [company, setCompany] = useState<CompanyDetails>(initialCompany);
  const [errors, setErrors] = useState<RequestErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const rows = draft.lines.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId);
    return product ? [{ line, product }] : [];
  });

  const setField = (field: keyof CompanyDetails, value: string) => {
    setCompany((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submitRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateRequest(company, draft.lines);
    setErrors(nextErrors);
    setSubmitError("");
    if (Object.keys(nextErrors).length > 0) {
      document.getElementById("order-form-heading")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, lines: draft.lines, subtotal: draft.subtotal }),
      });
      const result = await response.json() as {
        reference?: string;
        createdAt?: string;
        message?: string;
        errors?: RequestErrors;
      };

      if (!response.ok || !result.reference || !result.createdAt) {
        if (result.errors) {
          setErrors(result.errors);
        }
        setSubmitError(result.message ?? "The request summary could not be prepared. Try again.");
        return;
      }

      const record: RequestRecord = {
        reference: result.reference,
        createdAt: result.createdAt,
        company,
        lines: [...draft.lines],
        subtotal: draft.subtotal,
      };
      saveRequestRecord(record);
      draft.clear();
      router.push(`/request/${result.reference}`);
    } catch {
      setSubmitError("The request service is unavailable. Your order draft is still saved in this browser.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!draft.hasHydrated) {
    return <main className="flow-page"><div className="route-loading" role="status">Restoring order draft…</div></main>;
  }

  return (
    <main className="flow-page order-page">
      <section className="flow-heading flow-heading--compact">
        <div><span className="eyebrow">Draft review · No payment collected</span><h1>Prepare request</h1><p>Confirm product quantities, add procurement details, and create a reference saved in this browser.</p></div>
        <div className="flow-heading__step">Step 2 of 2</div>
      </section>

      <div className="order-layout">
        <form className="company-form" onSubmit={submitRequest} noValidate>
          <div className="form-section-heading" id="order-form-heading"><span>01</span><div><h2>Company and contact</h2><p>Required fields are marked below.</p></div></div>

          {errors.lines ? <div className="form-alert" role="alert">{errors.lines} <Link href="/catalog">Browse catalog</Link></div> : null}

          <div className="form-grid">
            <label className={errors.companyName ? "form-field form-field--error" : "form-field"}><span>Company name *</span><input type="text" value={company.companyName} onChange={(event) => setField("companyName", event.target.value)} autoComplete="organization" aria-invalid={!!errors.companyName} aria-describedby={errors.companyName ? "companyName-error" : undefined} />{errors.companyName ? <small id="companyName-error">{errors.companyName}</small> : null}</label>
            <label className={errors.contactName ? "form-field form-field--error" : "form-field"}><span>Contact name *</span><input type="text" value={company.contactName} onChange={(event) => setField("contactName", event.target.value)} autoComplete="name" aria-invalid={!!errors.contactName} aria-describedby={errors.contactName ? "contactName-error" : undefined} />{errors.contactName ? <small id="contactName-error">{errors.contactName}</small> : null}</label>
            <label className={errors.workEmail ? "form-field form-field--error" : "form-field"}><span>Work email *</span><input type="email" value={company.workEmail} onChange={(event) => setField("workEmail", event.target.value)} autoComplete="email" aria-invalid={!!errors.workEmail} aria-describedby={errors.workEmail ? "workEmail-error" : undefined} />{errors.workEmail ? <small id="workEmail-error">{errors.workEmail}</small> : null}</label>
            <label className={errors.phone ? "form-field form-field--error" : "form-field"}><span>Phone <em>Optional</em></span><input type="tel" value={company.phone} onChange={(event) => setField("phone", event.target.value)} autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />{errors.phone ? <small id="phone-error">{errors.phone}</small> : null}</label>
            <label className={errors.deliveryRegion ? "form-field form-field--error" : "form-field"}><span>Delivery region *</span><select value={company.deliveryRegion} onChange={(event) => setField("deliveryRegion", event.target.value)} aria-invalid={!!errors.deliveryRegion} aria-describedby={errors.deliveryRegion ? "deliveryRegion-error" : undefined}><option value="">Select region</option>{deliveryRegions.map((region) => <option value={region} key={region}>{region}</option>)}</select>{errors.deliveryRegion ? <small id="deliveryRegion-error">{errors.deliveryRegion}</small> : null}</label>
            <label className="form-field"><span>PO or project reference <em>Optional</em></span><input type="text" value={company.purchaseOrder} onChange={(event) => setField("purchaseOrder", event.target.value)} /></label>
            <label className="form-field form-field--full"><span>Planning notes <em>Optional</em></span><textarea value={company.notes} onChange={(event) => setField("notes", event.target.value)} rows={4} placeholder="Destination city, floor access, receiving constraints, or preferred delivery window" /></label>
          </div>

          <div className="request-boundary-note"><strong>What happens next</strong><p>This action creates a reference and saves the summary in this browser. It does not send email, create an external sales record, or collect payment.</p></div>
          {submitError ? <div className="form-alert form-alert--error" role="alert">{submitError}</div> : null}
          <button className="button button--accent form-submit" type="submit" disabled={submitting || rows.length === 0}>{submitting ? "Preparing request…" : "Prepare request summary"}</button>
        </form>

        <aside className="order-review" aria-labelledby="review-heading">
          <div className="form-section-heading"><span>02</span><div><h2 id="review-heading">Order review</h2><p>{rows.length} {rows.length === 1 ? "line" : "lines"} in this browser</p></div></div>
          {rows.length === 0 ? (
            <div className="order-review__empty"><h3>Your draft is empty.</h3><p>Add products before preparing a request.</p><Link className="button button--primary" href="/catalog">Browse catalog</Link></div>
          ) : (
            <ul className="review-lines">{rows.map(({ line, product }) => (
              <li key={product.id}>
                <Image src={product.image} alt="" width={76} height={60} />
                <div className="review-line__content"><Link href={`/catalog/${product.slug}`}>{product.name}</Link><span>{product.sku} · {formatCurrency(getUnitPrice(product, line.quantity))} each</span><div className="review-line__actions"><div className="quantity-control quantity-control--compact"><button type="button" disabled={line.quantity <= product.minimumOrder} onClick={() => draft.updateQuantity(product.id, line.quantity - product.orderIncrement)} aria-label={`Decrease ${product.name}`}><MinusIcon /></button><output>{line.quantity}</output><button type="button" onClick={() => draft.updateQuantity(product.id, line.quantity + product.orderIncrement)} aria-label={`Increase ${product.name}`}><PlusIcon /></button></div><button className="text-button text-button--danger" type="button" onClick={() => draft.remove(product.id)}>Remove</button></div></div>
                <strong>{formatCurrency(getLineTotal(product, line.quantity))}</strong>
              </li>
            ))}</ul>
          )}
          <div className="order-review__totals"><div><span>Product subtotal</span><strong>{formatCurrency(draft.subtotal)}</strong></div><p>Tax and freight will be reviewed separately.</p></div>
          <Link className="text-link" href="/catalog?category=desk-systems">← Return to Desk systems</Link>
        </aside>
      </div>
    </main>
  );
}
