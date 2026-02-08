# Screen Map

| Screen | User goal | Sections | Actions | Data | States |
|---|---|---|---|---|---|
| Catalog | Find and compare products | Catalog opening, toolbar, filter rail/drawer, grid/list, load more | Search, filter, sort, change view, quantity, add, clear | 12 products, categories, availability, tiers | Default, filtered, busy, no results, add success |
| Product detail | Validate one line before ordering | Breadcrumb, gallery, identity, specs, tier table, order box, related lines | Change quantity, add/update, open draft, browse related | Product specs, MOQ, tiers, lead time | At MOQ, higher tier, already in draft |
| Order | Review lines and provide procurement details | Company form, line review, totals, boundary notice | Edit fields, update/remove lines, submit | Draft plus company/contact fields | Empty, validation errors, submitting, API error |
| Request result | Retain a stable local summary | Success header, line table, contact details, notes, next actions | Print, return to catalog, start another | Stored request record | Loading, found, missing reference |
| Shared shell/drawer/footer | Navigate and inspect draft globally | Utility facts, header, mobile nav, order drawer, operational footer | Category links, open/copy/clear/review draft, print, back to top | Draft count/subtotal, service facts | Mobile menu, empty/populated drawer, toast |
