export type CategoryId =
  | "desk-systems"
  | "meeting-tools"
  | "shared-spaces"
  | "storage-transit";

export type AvailabilityId = "in-stock" | "low-stock" | "made-to-order";

export type SortOption = "featured" | "name" | "price" | "lead-time";

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
}

export interface PriceTier {
  minimumQuantity: number;
  unitPrice: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  categoryId: CategoryId;
  description: string;
  material: string;
  dimensions: string;
  finish: string;
  minimumOrder: number;
  orderIncrement: number;
  priceTiers: readonly PriceTier[];
  availability: AvailabilityId;
  leadTime: string;
  leadTimeDays: number;
  image: string;
  imageAlt: string;
  featuredRank: number;
}

export const categories: readonly Category[] = [
  {
    id: "desk-systems",
    label: "Desk systems",
    description: "Durable tools for individual workpoints",
  },
  {
    id: "meeting-tools",
    label: "Meeting tools",
    description: "Shared presentation and workshop equipment",
  },
  {
    id: "shared-spaces",
    label: "Shared spaces",
    description: "Service pieces for kitchens, lounges, and reception",
  },
  {
    id: "storage-transit",
    label: "Storage & transit",
    description: "Stackable organization for supplies and records",
  },
] as const;

export const availabilityLabels: Record<AvailabilityId, string> = {
  "in-stock": "In stock",
  "low-stock": "Low stock",
  "made-to-order": "Made to order",
};

export const products: readonly Product[] = [
  {
    id: "ridge-letter-tray",
    slug: "ridge-letter-tray",
    name: "Ridge Letter Tray",
    sku: "TL-DS-101",
    categoryId: "desk-systems",
    description: "Stackable steel tray with a lowered front edge for active paperwork.",
    material: "Powder-coated steel",
    dimensions: "13 × 9.5 × 2.5 in",
    finish: "Graphite",
    minimumOrder: 12,
    orderIncrement: 12,
    priceTiers: [
      { minimumQuantity: 12, unitPrice: 24 },
      { minimumQuantity: 48, unitPrice: 21.5 },
      { minimumQuantity: 96, unitPrice: 19.8 },
    ],
    availability: "in-stock",
    leadTime: "2–3 business days",
    leadTimeDays: 3,
    image: "/products/ridge-letter-tray.webp",
    imageAlt: "Graphite folded-steel Ridge Letter Tray on a warm gray studio surface",
    featuredRank: 1,
  },
  {
    id: "fold-meeting-caddy",
    slug: "fold-meeting-caddy",
    name: "Fold Meeting Caddy",
    sku: "TL-MT-205",
    categoryId: "meeting-tools",
    description: "Divided carry caddy that keeps workshop tools ready between rooms.",
    material: "Powder-coated steel",
    dimensions: "12 × 7 × 6 in",
    finish: "Harbor navy",
    minimumOrder: 6,
    orderIncrement: 6,
    priceTiers: [
      { minimumQuantity: 6, unitPrice: 42 },
      { minimumQuantity: 24, unitPrice: 38.5 },
      { minimumQuantity: 48, unitPrice: 35.7 },
    ],
    availability: "in-stock",
    leadTime: "3–4 business days",
    leadTimeDays: 4,
    image: "/products/fold-meeting-caddy.webp",
    imageAlt: "Harbor-navy folded-steel Fold Meeting Caddy on a warm gray studio surface",
    featuredRank: 2,
  },
  {
    id: "span-monitor-shelf",
    slug: "span-monitor-shelf",
    name: "Span Monitor Shelf",
    sku: "TL-DS-138",
    categoryId: "desk-systems",
    description: "Wide ash shelf that clears equipment while preserving desk depth.",
    material: "Ash veneer and steel",
    dimensions: "38 × 9 × 4 in",
    finish: "Natural ash",
    minimumOrder: 6,
    orderIncrement: 6,
    priceTiers: [
      { minimumQuantity: 6, unitPrice: 68 },
      { minimumQuantity: 18, unitPrice: 62 },
      { minimumQuantity: 36, unitPrice: 57.8 },
    ],
    availability: "made-to-order",
    leadTime: "10–12 business days",
    leadTimeDays: 12,
    image: "/products/span-monitor-shelf.webp",
    imageAlt: "Natural ash and graphite steel Span Monitor Shelf on a warm gray studio surface",
    featuredRank: 3,
  },
  {
    id: "current-cable-dock",
    slug: "current-cable-dock",
    name: "Current Cable Dock",
    sku: "TL-DS-112",
    categoryId: "desk-systems",
    description: "Weighted six-channel dock for repeatable power and data routing.",
    material: "Recycled aluminum",
    dimensions: "7 × 2 × 1.25 in",
    finish: "Slate anodized",
    minimumOrder: 24,
    orderIncrement: 24,
    priceTiers: [
      { minimumQuantity: 24, unitPrice: 16 },
      { minimumQuantity: 72, unitPrice: 14.25 },
      { minimumQuantity: 144, unitPrice: 13.1 },
    ],
    availability: "low-stock",
    leadTime: "5–7 business days",
    leadTimeDays: 7,
    image: "/products/current-cable-dock.webp",
    imageAlt: "Slate recycled-aluminum Current Cable Dock on a warm gray studio surface",
    featuredRank: 4,
  },
  {
    id: "grid-felt-pinboard",
    slug: "grid-felt-pinboard",
    name: "Grid Felt Pinboard",
    sku: "TL-MT-218",
    categoryId: "meeting-tools",
    description: "Frameless acoustic panel with a scored grid for project planning.",
    material: "Recycled PET felt",
    dimensions: "24 × 36 × 0.5 in",
    finish: "Oatmeal",
    minimumOrder: 4,
    orderIncrement: 4,
    priceTiers: [
      { minimumQuantity: 4, unitPrice: 86 },
      { minimumQuantity: 12, unitPrice: 79 },
      { minimumQuantity: 24, unitPrice: 72.5 },
    ],
    availability: "made-to-order",
    leadTime: "12–15 business days",
    leadTimeDays: 15,
    image: "/products/grid-felt-pinboard.webp",
    imageAlt: "Oatmeal recycled-felt Grid Pinboard on a warm gray studio surface",
    featuredRank: 5,
  },
  {
    id: "harbor-serving-tray",
    slug: "harbor-serving-tray",
    name: "Harbor Serving Tray",
    sku: "TL-SS-304",
    categoryId: "shared-spaces",
    description: "Molded-fiber tray with cork footing for shared kitchens and lounges.",
    material: "Molded fiber and cork",
    dimensions: "18 × 12 × 1.5 in",
    finish: "Sand",
    minimumOrder: 8,
    orderIncrement: 8,
    priceTiers: [
      { minimumQuantity: 8, unitPrice: 48 },
      { minimumQuantity: 24, unitPrice: 44 },
      { minimumQuantity: 48, unitPrice: 40.5 },
    ],
    availability: "in-stock",
    leadTime: "3–4 business days",
    leadTimeDays: 4,
    image: "/products/harbor-serving-tray.webp",
    imageAlt: "Sand-colored molded-fiber Harbor Serving Tray on a warm gray studio surface",
    featuredRank: 6,
  },
  {
    id: "field-tool-cup",
    slug: "field-tool-cup",
    name: "Field Tool Cup",
    sku: "TL-DS-124",
    categoryId: "desk-systems",
    description: "Weighted spun-steel cup for pens, shears, and shared desk tools.",
    material: "Spun steel and cork",
    dimensions: "3.5 × 3.5 × 4.75 in",
    finish: "Moss",
    minimumOrder: 12,
    orderIncrement: 12,
    priceTiers: [
      { minimumQuantity: 12, unitPrice: 18.5 },
      { minimumQuantity: 48, unitPrice: 16.65 },
      { minimumQuantity: 96, unitPrice: 15.3 },
    ],
    availability: "in-stock",
    leadTime: "2–3 business days",
    leadTimeDays: 3,
    image: "/products/field-tool-cup.webp",
    imageAlt: "Moss-green spun-steel Field Tool Cup on a warm gray studio surface",
    featuredRank: 7,
  },
  {
    id: "line-dry-erase-kit",
    slug: "line-dry-erase-kit",
    name: "Line Dry-Erase Kit",
    sku: "TL-MT-233",
    categoryId: "meeting-tools",
    description: "Nine-piece rail, marker, magnet, and felt-eraser room kit.",
    material: "Aluminum, felt, and ink",
    dimensions: "9-piece kit",
    finish: "Charcoal",
    minimumOrder: 12,
    orderIncrement: 12,
    priceTiers: [
      { minimumQuantity: 12, unitPrice: 32 },
      { minimumQuantity: 36, unitPrice: 29.5 },
      { minimumQuantity: 72, unitPrice: 27.2 },
    ],
    availability: "in-stock",
    leadTime: "2–3 business days",
    leadTimeDays: 3,
    image: "/products/line-dry-erase-kit.webp",
    imageAlt: "Charcoal Line Dry-Erase Kit arranged on a warm gray studio surface",
    featuredRank: 8,
  },
  {
    id: "still-carafe-set",
    slug: "still-carafe-set",
    name: "Still Carafe Set",
    sku: "TL-SS-319",
    categoryId: "shared-spaces",
    description: "One-liter glass carafe and two tumblers with protective silicone bases.",
    material: "Borosilicate glass and silicone",
    dimensions: "1 L carafe + 2 cups",
    finish: "Smoke",
    minimumOrder: 12,
    orderIncrement: 12,
    priceTiers: [
      { minimumQuantity: 12, unitPrice: 36 },
      { minimumQuantity: 48, unitPrice: 32.5 },
      { minimumQuantity: 96, unitPrice: 29.8 },
    ],
    availability: "low-stock",
    leadTime: "6–8 business days",
    leadTimeDays: 8,
    image: "/products/still-carafe-set.webp",
    imageAlt: "Clear glass Still Carafe Set with smoke silicone bases on a warm gray studio surface",
    featuredRank: 9,
  },
  {
    id: "stack-utility-bin",
    slug: "stack-utility-bin",
    name: "Stack Utility Bin",
    sku: "TL-ST-406",
    categoryId: "storage-transit",
    description: "Open-front recycled bin that remains accessible when stacked.",
    material: "Recycled polypropylene",
    dimensions: "16 × 11 × 7 in",
    finish: "Graphite",
    minimumOrder: 18,
    orderIncrement: 18,
    priceTiers: [
      { minimumQuantity: 18, unitPrice: 22 },
      { minimumQuantity: 54, unitPrice: 19.8 },
      { minimumQuantity: 108, unitPrice: 18.25 },
    ],
    availability: "in-stock",
    leadTime: "2–3 business days",
    leadTimeDays: 3,
    image: "/products/stack-utility-bin.webp",
    imageAlt: "Graphite recycled-polypropylene Stack Utility Bin on a warm gray studio surface",
    featuredRank: 10,
  },
  {
    id: "route-archive-crate",
    slug: "route-archive-crate",
    name: "Route Archive Crate",
    sku: "TL-ST-422",
    categoryId: "storage-transit",
    description: "Birch and steel crate sized for files, supplies, and internal moves.",
    material: "Birch ply and steel",
    dimensions: "17 × 13 × 11 in",
    finish: "Natural birch",
    minimumOrder: 12,
    orderIncrement: 12,
    priceTiers: [
      { minimumQuantity: 12, unitPrice: 34 },
      { minimumQuantity: 36, unitPrice: 31 },
      { minimumQuantity: 72, unitPrice: 28.6 },
    ],
    availability: "in-stock",
    leadTime: "4–5 business days",
    leadTimeDays: 5,
    image: "/products/route-archive-crate.webp",
    imageAlt: "Natural birch and graphite-steel Route Archive Crate on a warm gray studio surface",
    featuredRank: 11,
  },
  {
    id: "mesa-waste-sorter",
    slug: "mesa-waste-sorter",
    name: "Mesa Waste Sorter",
    sku: "TL-SS-341",
    categoryId: "shared-spaces",
    description: "Compact two-stream station with removable liners for shared spaces.",
    material: "Powder-coated steel",
    dimensions: "28 × 14 × 24 in",
    finish: "Warm gray",
    minimumOrder: 4,
    orderIncrement: 4,
    priceTiers: [
      { minimumQuantity: 4, unitPrice: 124 },
      { minimumQuantity: 12, unitPrice: 115 },
      { minimumQuantity: 24, unitPrice: 106 },
    ],
    availability: "made-to-order",
    leadTime: "15–18 business days",
    leadTimeDays: 18,
    image: "/products/mesa-waste-sorter.webp",
    imageAlt: "Warm-gray steel Mesa Waste Sorter on a warm gray studio surface",
    featuredRank: 12,
  },
] as const;
