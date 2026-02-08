# Case Study — Ternline Wholesale Commerce

## Problem

Wholesale buyers need to compare operational product facts and prepare repeat orders without translating a consumer storefront into procurement language. The interface had to make SKU, MOQ, case increments, availability, lead time, and volume breaks visible while avoiding a false checkout or submission claim.

## Approach

I created Ternline as an independent portfolio brand with a deterministic twelve-product workplace catalog. The product model centralizes every pricing and quantity rule. One shared browser-persisted draft serves catalog cards, product pages, the order form, header count, and drawer. A small route handler validates request-shaped data and returns a reference; the client explicitly stores the result locally.

The approved visual direction uses edge-to-edge procurement geometry, harbor navy, pale celadon, terracotta actions, one-pixel borders, compact operational labels, and a complete functional footer. Generated website and logo images were reference material only; production UI and logo are semantic React, CSS, and SVG.

## Implementation

- Next.js 16 App Router, React 19, TypeScript, and project-native CSS.
- Root redirect to the Desk systems catalog, order form, metadata, and twelve statically generated product routes.
- Dynamic query-aware catalog and browser-local request result route.
- Search/filter/sort utilities, MOQ normalization, tier-aware pricing, subtotal calculation, draft context, validation, request storage, and POST route handler.
- Responsive navigation, filter/draft drawers, empty/loading/error/success states, print styling, focus visibility, and reduced-motion support.
- Local optimized WebP assets with documented prompts and no remote hotlinks.

## Outcome

The complete buyer journey works from direct Desk systems entry to a refresh-stable request reference without payment or external integration claims. Lint, strict type checking, nine unit tests, production build, and automated browser QA at 390, 768, 1440, and 1920px pass. Browser QA also executes catalog add-to-order, local persistence, field validation, API reference creation, result reload, console/network monitoring, and overflow checks.

## Portfolio disclosure

Ternline, its catalog, content, visual system, product imagery, and business rules were created for an independent portfolio project.
