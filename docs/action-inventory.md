# Action Inventory

| Control | Location | Expected behavior | Important states |
|---|---|---|---|
| Wordmark | Header/footer | Opens `/`, then redirects to Desk systems | Focus-visible |
| Category links | Header/footer | Open `/catalog?category=…` with matching filter | Desktop/mobile |
| Order draft | Header/footer | Opens global drawer with current lines | Empty/populated count |
| Mobile menu | Header | Opens/closes all route/category links | Expanded/collapsed |
| Search and clear | Catalog | Filter by partial name/SKU and reset query | Busy/no match |
| Sort | Catalog | Featured, name, price, or lead-time ordering | Default/focus |
| Grid/list | Catalog | Switch presentation without losing refinements | Pressed |
| Filters / clear all | Catalog | Toggle category/availability and reset refinements | Desktop/mobile/disabled |
| Product media/title | Catalog/related | Open correct product route | Hover/focus |
| Quantity controls | Cards/detail/drawer/tables | Move by case increment without crossing MOQ | Disabled at MOQ |
| Add/update order | Catalog/detail | Create or update one shared draft line | Success toast |
| Load all | Catalog | Reveal remaining filtered products | Hidden when complete |
| Copy list | Drawer | Copy SKU/quantity/pricing summary | Success/error/disabled |
| Clear draft | Drawer | Ask for confirmation then remove all lines | Confirm/cancel |
| Review order | Drawer/navigation | Open `/order` | Empty/populated |
| Company form | Order | Update required/optional fields | Valid/invalid/focus |
| Prepare request | Order | Client validate, POST `/api/requests`, save local record, navigate | Disabled/loading/error/success |
| Print | Footer/request | Open browser print dialog with print CSS | Focus |
| Back to top | Footer | Smooth-scroll to page top | Reduced motion respected |
| Request next actions | Result | Return to catalog or begin another order | Focus |
