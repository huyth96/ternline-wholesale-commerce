# Image Generation Record

Mode: built-in `imagegen` tool. Generated UI is a visual reference only; every interface element was rebuilt with Next.js, semantic HTML, SVG icons, and CSS.

## Anchor reference

Final project path: `docs/references/ternline-catalog-anchor.png`

Prompt:

```text
Use case: ui-mockup
Asset type: high-fidelity desktop website reference for a B2B wholesale catalog
Primary request: a shippable, data-aware catalog screen for Ternline, an original wholesale workplace-systems supplier. The page should let professional buyers scan products, search by product name or SKU, filter category and availability, compare MOQ, lead time, and tier pricing, choose a quantity, and add items to an order draft.
Style/medium: realistic product UI, not concept art, not a presentation slide
Composition/framing: 1440px desktop browser viewport; full-width application shell; a very slim dark harbor-navy trade utility bar; compact white header with a restrained typographic Ternline wordmark, Catalog active, and an Order draft control; below it a left-aligned catalog heading and concise operational subtitle; then a dense toolbar with wide search, result count, sort, and grid/list toggle; persistent narrow filter rail on the left; three-column product catalog field on the right showing six cards above the fold. Cards use consistent warm-gray studio product photography and expose product name, SKU, stock status, MOQ, lead time, three concise price breaks, a practical quantity stepper, and a navy Add to order button. Include one low-stock amber label and one made-to-order status.
Color palette: chalk #F4F2EC, paper #FBFAF7, carbon #17211E, slate #5A6560, harbor navy #173B4C, signal amber #D98A35, fine mineral-gray borders
Typography: crisp neutral sans-serif, compact uppercase operational labels, deliberate hierarchy, readable small data
Geometry: edge-to-edge shell with 32px desktop side padding, limited 2–4px corner radii, one-pixel borders, tight 8px-based spacing, product media around 4:3, no centered landing-page max-width composition
Constraints: practical implementable layout; realistic information density; clear focus and selected states; all visible controls purposeful; original fictional brand; no trademarks; no watermark; no unreadable filler copy; no fake analytics charts
Avoid: glassmorphism, gradients, purple, decorative blobs, bento layout, excessive rounded cards, oversized hero typography, floating 3D icons, excessive shadows, ecommerce lifestyle-store styling
```

Implementation corrections from the reference:

- Replaced invented 342-result/tooling data with the locked 12-product Ternline manifest.
- Removed unsupported navigation and price-range controls.
- Kept all visible controls functional and used the approved geometry, density, borders, and color direction.

## Web direction V2 — 16:9 reference

Final project path: `docs/references/ternline-web-v2-16x9.png`

Framing rule: website references are native 16:9 desktop viewports (target 1440×810), never tall full-page posters. The top/catalog state and bottom/footer state must be represented as separate 16:9 frames when both are needed.

Prompt:

```text
Recompose the Ternline wholesale catalog as one native desktop browser viewport in an exact 16:9 landscape frame, with a 1440 by 810 appearance. This is a real website screenshot, not a tall full-page capture, browser-device mockup, or presentation board.

Preserve the friendly, credible B2B catalog direction: slim harbor-navy operational utility bar; white primary header with original Ternline wordmark, four category navigation controls, and terracotta Order draft action; compact pale-celadon trade catalog opening with breadcrumb, controlled title, concise factual description, only three small facts (12 active SKUs, 4 product groups, revision 26.2), and clean workplace-furniture line art; one unified search/filter/sort/grid toolbar; then the beginning of a left filter rail and dense three-column product grid with SKU, MOQ, lead time, tier prices, quantity, and Add to draft.

Crop naturally at the bottom of the viewport after the first product row begins, as a real above-the-fold desktop page would. Use warm chalk, paper white, carbon, harbor navy, friendly terracotta, pale celadon, and small butter accents. Use square or 2px corners, one-pixel borders, and compact operational labels. Every visible element must be purposeful.

Avoid fake product totals, favorites, invented contact details, legal links, newsletter, social icons, huge hero copy, floating metric cards, bento grids, glassmorphism, gradients, decorative blobs, purple, excessive rounding, filler text, and watermarks.
```

The product photography remains unchanged; this reference governs website composition only.

## Ternline logo reference

Final project path: `docs/references/ternline-logo-reference.png`

The generated PNG is a transparent, 3:1 visual reference. The production header/footer logo is rebuilt as a code-native SVG mark plus live typographic wordmark; the raster file is not embedded in the interface.

Prompt:

```text
Use case: logo-brand
Asset type: primary horizontal website logo reference for Ternline, a fictional B2B wholesale workplace-systems supplier
Primary request: create one original, compact horizontal logo lockup combining a distinctive geometric symbol and the exact wordmark TERNLINE. The symbol should abstract modular shelving, ordered product lines, and a routing point: three precise horizontal rails, deliberately unequal in length, with one small solid circular node integrated into the middle rail. Make the construction feel balanced, useful, industrial, and friendly rather than tech-startup-like.
Style/medium: vector-friendly flat logo, crisp geometric construction, contemporary grotesk wordmark, restrained and timeless
Composition/framing: one horizontal lockup only, symbol on the left and wordmark on the right, optically balanced baseline, generous clear space, wide landscape canvas
Color palette: harbor navy #123849 for mark and letters, restrained terracotta #D86B45 only for the circular node
Text (verbatim): "TERNLINE"
Background: genuinely transparent background with preserved alpha
Constraints: render TERNLINE exactly once with correct spelling; strong silhouette at 24px header height; original fictional brand; flat colors; usable in monochrome; no additional tagline; no border; no watermark
Avoid: logo presentation board, multiple variants, mockups, paper texture, 3D, gradients, shadows, furniture illustration, house/leaf/globe/cart icons, generic AI sparkles, rounded app badge, extra text, trademark symbols
```

## Product image shared prompt

Every product used a separate generation request. The following shared specification was appended to each distinct primary request:

```text
Use case: product-mockup
Asset type: B2B wholesale catalog product image
Scene/backdrop: warm light-gray seamless studio surface matching an industrial workplace catalog
Style/medium: realistic premium commercial product photography
Composition/framing: one product only, centered three-quarter view, complete silhouette, consistent 4:3 landscape crop with generous edge clearance
Lighting/mood: soft large-source studio lighting, neutral daylight balance, restrained floor shadow
Constraints: no people; no props; no embedded text; no logos; no trademarks; no watermark; no cropped edges; physically plausible manufacturing details
Avoid: dramatic reflections, saturated colors, luxury lifestyle styling, clutter
```

For the carafe set and dry-erase kit, “one product only” was expanded to “one clearly unified product set only,” and “no props” to “no extra props.”

## Distinct product prompts and final files

| Product / final path | Distinct prompt used before the shared specification |
|---|---|
| `public/products/ridge-letter-tray.webp` | `Primary request: Ridge Letter Tray, a low-profile stackable office document tray made from folded powder-coated graphite steel, subtly chamfered front edge, small replaceable cork feet. Practical and minimal, sized for US letter paper.` `Materials/textures: fine matte graphite powder coat, thin folded steel, natural cork feet` |
| `public/products/current-cable-dock.webp` | `Primary request: Current Cable Dock, a compact recycled-aluminum desktop cable organizer with six softly machined channels, rounded rectangular footprint, slate anodized finish, non-slip dark base.` `Materials/textures: bead-blasted recycled aluminum, slate anodized finish, matte rubber underside` |
| `public/products/field-tool-cup.webp` | `Primary request: Field Tool Cup, a clean cylindrical spun-steel pen and tool cup in a muted moss-green powder coat, weighted base, subtle vertical seam, no contents.` `Materials/textures: fine matte moss powder coat, spun steel, dark cork base` |
| `public/products/span-monitor-shelf.webp` | `Primary request: Span Monitor Shelf, a wide shallow desktop monitor riser with a natural ash-veneer top and two slim graphite folded-steel end supports, clean cable clearance below, no monitor.` `Materials/textures: pale natural ash grain, fine matte graphite powder-coated steel` |
| `public/products/fold-meeting-caddy.webp` | `Primary request: Fold Meeting Caddy, a compact rectangular carry caddy for meeting-room supplies, made from folded powder-coated steel in deep muted harbor navy, central divider and one minimal arched handle, empty.` `Materials/textures: fine matte harbor-navy powder coat, folded steel, dark cork feet` |
| `public/products/grid-felt-pinboard.webp` | `Primary request: Grid Felt Pinboard, a single frameless rectangular acoustic pinboard panel made from thick recycled PET felt in warm oatmeal, subtle precise grid of shallow horizontal and vertical score lines, slim depth.` `Materials/textures: dense heathered recycled PET felt, oatmeal tone` |
| `public/products/line-dry-erase-kit.webp` | `Primary request: Line Dry-Erase Kit, a neatly organized nine-piece meeting-room kit shown together as one product set: four minimal black dry-erase markers, rectangular felt eraser, magnetic slim aluminum storage rail, and four small round magnets. No writing or labels.` `Materials/textures: matte charcoal aluminum, black polymer, dark recycled felt` |
| `public/products/harbor-serving-tray.webp` | `Primary request: Harbor Serving Tray, a low wide hospitality serving tray made from warm sand-colored molded fiber with gently raised straight sides and integrated oval grip openings, thin dark cork base, empty.` `Materials/textures: fine natural molded-fiber texture, warm sand color, dark cork` |
| `public/products/still-carafe-set.webp` | `Primary request: Still Carafe Set, one unified hospitality set consisting of a simple one-liter borosilicate glass water carafe and two matching low tumblers, each with a restrained smoke-gray silicone base sleeve. Empty and arranged closely as a catalog set.` `Materials/textures: clear borosilicate glass, translucent smoke-gray matte silicone` |
| `public/products/mesa-waste-sorter.webp` | `Primary request: Mesa Waste Sorter, a compact two-compartment workplace recycling station made from warm-gray powder-coated sheet steel, two clean top openings with removable inner bins, straight architectural sides, no labels or symbols.` `Materials/textures: fine matte warm-gray powder-coated steel, black interior bin edges` |
| `public/products/stack-utility-bin.webp` | `Primary request: Stack Utility Bin, one sturdy open-front stackable storage bin made from recycled polypropylene in dark graphite, practical reinforced rim, subtle molded side handholds, empty.` `Materials/textures: lightly textured recycled polypropylene, dark graphite` |
| `public/products/route-archive-crate.webp` | `Primary request: Route Archive Crate, a rectangular office archive crate with natural birch plywood side panels, slim graphite powder-coated steel frame, open top, integrated handhold slots, empty and stackable.` `Materials/textures: pale birch ply with visible grain, fine matte graphite steel` |

## Inspection and optimization

- Each output was visually checked for silhouette, material consistency, extra objects, embedded text, marks, cropping, and watermarks.
- No generated asset contained customer identity, external brand, or publication mark.
- Selected PNG outputs were copied into the project, resized to 960×720, converted to WebP at quality 82, and referenced locally.
- The twelve final WebP files total approximately 249 KB. The unoptimized project copies were removed only after all twelve optimized files were verified.
