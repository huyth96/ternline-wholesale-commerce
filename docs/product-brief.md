# Ternline Wholesale Commerce — Product Brief

## Positioning

Ternline is a fictional US wholesale supplier of durable workplace organization products for facilities teams, hospitality operators, and interior studios. Its ordering experience exposes case quantities, availability, lead time, and volume pricing before a buyer prepares a request.

## Target customer

- Facilities and workplace managers ordering for 20–200 person teams.
- Hospitality operations leads standardizing shared-space supplies.
- Interior studios specifying repeatable accessories across locations.

## Primary journey

A buyer enters `/` and is redirected to the Desk systems view of `/catalog`, searches or filters the catalog, reviews a product route, adds compliant quantities, reviews tier-aware totals in `/order`, supplies company/contact details, and prepares a stable `/request/[reference]` summary stored in the same browser.

## Route list

| Route | Goal | Status |
|---|---|---|
| `/` | Redirect directly to the Desk systems catalog filter | Implemented |
| `/catalog` | Search, filter, sort, compare, and add lines | Implemented |
| `/catalog/[slug]` | Review product specifications and pricing | 12 routes implemented |
| `/order` | Review lines and validate procurement details | Implemented |
| `/request/[reference]` | Reopen a browser-local request summary | Implemented |
| `/api/requests` | Validate and issue a reference without persistence | Implemented |

## Required data and states

- Twelve products, four categories, three availability states, MOQ/case increment, three tiers, and lead time.
- Default, hover, focus, pressed, disabled, loading, empty, filtered, no-result, validation error, network error, success, persistence warning, missing-reference, and not-found states.

## Exclusions

- Payment, cards, checkout, authentication, admin tooling, email, CRM, database persistence, tax calculation, and freight quotation.
- Claims that an external order or message was created.
- A standalone marketing homepage and Quick Order route, removed by user direction.

## Definition of done

- Every defined route loads directly and through navigation.
- Search, filters, MOQ, tier pricing, draft persistence, validation, and request reference work end to end.
- Every visible control is functional and keyboard focus is visible.
- Responsive layouts pass at 390, 768, 1440, and 1920px without horizontal page overflow.
- Lint, typecheck, tests, production build, and browser QA pass.
