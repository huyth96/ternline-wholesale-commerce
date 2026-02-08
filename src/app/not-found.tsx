import Link from "next/link";

export default function NotFound() {
  return <main className="flow-page request-missing"><span className="request-status-mark">404</span><span className="eyebrow">Page not found</span><h1>That catalog page is not available.</h1><p>Return to Desk systems or browse the complete trade catalog.</p><div><Link className="button button--primary" href="/catalog?category=desk-systems">Desk systems</Link><Link className="button button--secondary" href="/catalog">All products</Link></div></main>;
}
