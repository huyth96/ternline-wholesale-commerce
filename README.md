# Ternline Wholesale Commerce

Ternline is a complete B2B workplace-systems ordering application built with Next.js 16, React 19, TypeScript, and native CSS. Buyers enter directly through Desk systems, browse a deterministic twelve-product catalog, apply MOQ and tier-pricing rules, persist an order draft, validate procurement details, and create a stable request summary saved in the current browser.

## Live deployment

- Production: [ternline-wholesale-commerce.vercel.app](https://ternline-wholesale-commerce.vercel.app)
- Source: [GitHub — huyth96/ternline-wholesale-commerce](https://github.com/huyth96/ternline-wholesale-commerce)
- The production deployment retains `noindex, nofollow` because this is a portfolio application.

## Local development

Requirements: Node.js 20.9+ and npm 10+.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Routes

| Route | Purpose |
|---|---|
| `/` | Redirects directly to `/catalog?category=desk-systems` |
| `/catalog` | Searchable/filterable catalog with grid/list views |
| `/catalog/[slug]` | Product gallery, specifications, MOQ, tiers, and add-to-order |
| `/order` | Tier-aware review and validated company/contact form |
| `/request/[reference]` | Browser-local request result with stable reference |
| `/api/requests` | Validates request input and returns a reference; stores no server record |

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run strict TypeScript checks |
| `npm run test` | Run catalog, pricing, and request-validation tests |
| `npm run build` | Create the optimized production build |
| `npm run start` | Serve the production build |
| `npm run qa:browser` | Run Edge/Chromium QA against `QA_BASE_URL` (default port 3100) |

Production QA:

```bash
npm run build
npm run start -- -H 127.0.0.1 -p 3100
```

Then run `npm run qa:browser` in a second terminal. Set `QA_BROWSER_PATH` when Microsoft Edge is installed elsewhere.

## Implemented behavior

- Twelve seeded products across four categories with SKU, material, dimensions, finish, availability, lead time, MOQ, case increment, and three price tiers.
- Search, category/availability filters, sorting, desktop grid/list views, mobile filter drawer, and no-result recovery.
- Shared browser-persisted draft with add/update/remove/clear, compliant quantity normalization, tier-aware unit prices, line totals, subtotal, copy, and drawer review.
- Product-detail routes generated from catalog data with related lines.
- Company/contact validation on client and API route, understandable field errors, loading/error handling, and stable locally stored request references.
- Direct Desk systems entry, functional category navigation, operational footer actions, print styles, focus states, reduced motion, loading, not-found, and error states.
- `noindex, nofollow`, favicon, manifest, route metadata, and code-native Open Graph image.

The application does not process payment, send email, or create an external sales record. Request records are intentionally stored only in the current browser.

## Project structure

```text
src/app/                App Router pages, API route, metadata, and global CSS
src/components/         Shared shell, catalog, product, order, and request UI
src/data/catalog.ts     Deterministic catalog and product manifest
src/lib/                Search, pricing, draft state, validation, request storage
tests/                  Unit tests for catalog, pricing, and request validation
docs/                   Product/brand decisions, references, screenshots, handoff docs
public/products/        Twelve optimized generated WebP product images
scripts/                Browser QA and image optimization scripts
```

## Vercel deployment

The project is linked to Vercel as `ternline-wholesale-commerce`. No application environment variables are required.

```bash
npx vercel@latest deploy --prod --logs
QA_BASE_URL=https://ternline-wholesale-commerce.vercel.app npm run qa:browser
```

Keep `noindex, nofollow` until public indexing is explicitly approved.

## Asset provenance

The approved 16:9 web reference, transparent logo reference, and twelve product images were produced with the built-in image-generation path. Production UI and logo geometry are rebuilt with semantic React, CSS, and SVG. Prompts and final paths are recorded in `docs/image-prompts.md`; no remote images are hotlinked.
