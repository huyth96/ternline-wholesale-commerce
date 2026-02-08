"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  availabilityLabels,
  categories,
  products,
  type AvailabilityId,
  type CategoryId,
  type SortOption,
} from "@/data/catalog";
import {
  CatalogSceneIcon,
  ChevronDownIcon,
  CloseIcon,
  FilterIcon,
  GridIcon,
  ListIcon,
  SearchIcon,
} from "@/components/icons";
import { FilterControls, MobileFilterDrawer } from "@/components/filter-panel";
import { ProductCard } from "@/components/product-card";
import { filterProducts, sortProducts } from "@/lib/catalog";
import { normalizeQuantity } from "@/lib/pricing";
import { useOrderDraftContext } from "@/lib/order-context";
import { useCommerceUi } from "@/components/commerce-shell";

type ViewMode = "grid" | "list";

const INITIAL_VISIBLE_COUNT = 6;

const initialQuantities = Object.fromEntries(
  products.map((product) => [product.id, product.minimumOrder]),
) as Record<string, number>;

const categoryCounts = Object.fromEntries(
  categories.map((category) => [
    category.id,
    products.filter((product) => product.categoryId === category.id).length,
  ]),
) as Record<CategoryId, number>;

const availabilityCounts = Object.fromEntries(
  (Object.keys(availabilityLabels) as AvailabilityId[]).map((availability) => [
    availability,
    products.filter((product) => product.availability === availability).length,
  ]),
) as Record<AvailabilityId, number>;

function toggleValue<T>(current: readonly T[], value: T): T[] {
  return current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];
}

export function CatalogScreen({ initialCategory }: { initialCategory?: CategoryId }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>(
    initialCategory ? [initialCategory] : [],
  );
  const [selectedAvailability, setSelectedAvailability] = useState<AvailabilityId[]>([]);
  const [sort, setSort] = useState<SortOption>("featured");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showAll, setShowAll] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>(initialQuantities);
  const draft = useOrderDraftContext();
  const { notify } = useCommerceUi();

  useEffect(() => {
    if (!filtersOpen) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFiltersOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [filtersOpen]);

  const filteredProducts = useMemo(
    () => filterProducts(products, {
      query: deferredQuery,
      categories: selectedCategories,
      availability: selectedAvailability,
    }),
    [deferredQuery, selectedAvailability, selectedCategories],
  );

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, sort),
    [filteredProducts, sort],
  );

  const visibleProducts = showAll
    ? sortedProducts
    : sortedProducts.slice(0, INITIAL_VISIBLE_COUNT);
  const isSearching = query !== deferredQuery;
  const filterCount = selectedCategories.length + selectedAvailability.length;
  const hasActiveRefinements = query.length > 0 || filterCount > 0 || sort !== "featured";

  const clearRefinements = () => {
    setQuery("");
    setSelectedCategories([]);
    setSelectedAvailability([]);
    setSort("featured");
    setShowAll(false);
  };

  const filterProps = {
    selectedCategories,
    selectedAvailability,
    categoryCounts,
    availabilityCounts,
    hasActiveFilters: hasActiveRefinements,
    onToggleCategory: (category: CategoryId) => {
      setSelectedCategories((current) => toggleValue(current, category));
      setShowAll(false);
    },
    onToggleAvailability: (availability: AvailabilityId) => {
      setSelectedAvailability((current) => toggleValue(current, availability));
      setShowAll(false);
    },
    onClear: clearRefinements,
  };

  return (
    <main className="catalog-page">
      <section className="catalog-opening" aria-labelledby="catalog-title">
        <div className="catalog-opening__copy">
          <p className="breadcrumb-line">Home / Catalog · Revision 26.2</p>
          <h1 id="catalog-title">Trade catalog</h1>
          <p className="catalog-opening__description">
            Case-packed desk, meeting, shared-space, and storage products for repeat
            workplace orders.
          </p>
          <dl className="catalog-opening__facts">
            <div><dt>12</dt><dd>Active SKUs</dd></div>
            <div><dt>4</dt><dd>Product groups</dd></div>
            <div><dt>26.2</dt><dd>Catalog revision</dd></div>
          </dl>
        </div>
        <CatalogSceneIcon className="catalog-opening__scene" />
      </section>

      <section className="catalog-toolbar" aria-label="Catalog search and display">
        <div className="search-control">
          <SearchIcon />
          <label className="sr-only" htmlFor="catalog-search">Search product or SKU</label>
          <input
            id="catalog-search"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShowAll(false);
            }}
            placeholder="Search by product name or SKU"
            autoComplete="off"
          />
          {query ? (
            <button
              className="search-control__clear"
              type="button"
              onClick={() => {
                setQuery("");
                setShowAll(false);
              }}
              aria-label="Clear catalog search"
            >
              <CloseIcon />
            </button>
          ) : null}
        </div>

        <button
          className="mobile-filter-trigger button button--secondary"
          type="button"
          onClick={() => setFiltersOpen(true)}
        >
          <FilterIcon />
          Filters
          {filterCount > 0 ? <span>{filterCount}</span> : null}
        </button>

        <div className="sort-control">
          <label htmlFor="catalog-sort">Sort by</label>
          <select
            id="catalog-sort"
            value={sort}
            onChange={(event) => {
              setSort(event.target.value as SortOption);
              setShowAll(false);
            }}
          >
            <option value="featured">Featured</option>
            <option value="name">Name A–Z</option>
            <option value="price">Lowest unit price</option>
            <option value="lead-time">Shortest lead time</option>
          </select>
          <ChevronDownIcon />
        </div>

        <div className="view-toggle" role="group" aria-label="Catalog view">
          <button
            className={viewMode === "grid" ? "view-toggle__active" : ""}
            type="button"
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
            aria-pressed={viewMode === "grid"}
          ><GridIcon /></button>
          <button
            className={viewMode === "list" ? "view-toggle__active" : ""}
            type="button"
            onClick={() => setViewMode("list")}
            aria-label="List view"
            aria-pressed={viewMode === "list"}
          ><ListIcon /></button>
        </div>
      </section>

      <div className="catalog-workspace" id="catalog-products">
        <aside className="desktop-filter-rail" aria-label="Catalog filters">
          <FilterControls idPrefix="desktop-filter" {...filterProps} />
        </aside>

        <section className="catalog-results" aria-labelledby="results-heading" aria-busy={isSearching}>
          <div className="results-meta">
            <div>
              <h2 id="results-heading">
                {sortedProducts.length} {sortedProducts.length === 1 ? "product" : "products"}
              </h2>
              <p>
                Showing {visibleProducts.length} of {sortedProducts.length}
                {filterCount > 0 ? ` · ${filterCount} active filters` : ""}
              </p>
            </div>
            {isSearching ? <span className="results-busy">Updating results…</span> : null}
          </div>

          {sortedProducts.length === 0 ? (
            <div className="empty-results">
              <span className="empty-results__code">0 / 12</span>
              <h2>No products match those details.</h2>
              <p>Clear one or more filters, or try a shorter SKU.</p>
              <button className="button button--primary" type="button" onClick={clearRefinements}>
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className={`product-grid ${viewMode === "list" ? "product-grid--list" : ""} ${isSearching ? "product-grid--busy" : ""}`}>
                {visibleProducts.map((product) => {
                  const quantity = quantities[product.id] ?? product.minimumOrder;
                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      quantity={quantity}
                      viewMode={viewMode}
                      alreadyInDraft={draft.lines.some((line) => line.productId === product.id)}
                      onQuantityChange={(nextQuantity) =>
                        setQuantities((current) => ({
                          ...current,
                          [product.id]: normalizeQuantity(product, nextQuantity),
                        }))
                      }
                      onAdd={() => {
                        draft.addOrUpdate(product.id, quantity);
                        notify(`${product.name} added at ${quantity} units. Draft pricing updated.`);
                      }}
                    />
                  );
                })}
              </div>

              {!showAll && sortedProducts.length > INITIAL_VISIBLE_COUNT ? (
                <div className="load-more">
                  <p>{sortedProducts.length - INITIAL_VISIBLE_COUNT} more products match this view.</p>
                  <button className="button button--secondary" type="button" onClick={() => setShowAll(true)}>
                    Load all products
                  </button>
                </div>
              ) : null}
            </>
          )}
        </section>
      </div>

      <MobileFilterDrawer
        open={filtersOpen}
        resultCount={sortedProducts.length}
        onClose={() => setFiltersOpen(false)}
        {...filterProps}
      />
    </main>
  );
}
