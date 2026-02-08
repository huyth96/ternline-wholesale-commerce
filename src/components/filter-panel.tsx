"use client";

import { useEffect, useRef } from "react";
import {
  availabilityLabels,
  categories,
  type AvailabilityId,
  type CategoryId,
} from "@/data/catalog";
import { CloseIcon } from "@/components/icons";

interface FilterControlsProps {
  idPrefix: string;
  selectedCategories: readonly CategoryId[];
  selectedAvailability: readonly AvailabilityId[];
  categoryCounts: Readonly<Record<CategoryId, number>>;
  availabilityCounts: Readonly<Record<AvailabilityId, number>>;
  hasActiveFilters: boolean;
  onToggleCategory: (category: CategoryId) => void;
  onToggleAvailability: (availability: AvailabilityId) => void;
  onClear: () => void;
}
export function FilterControls({
  idPrefix,
  selectedCategories,
  selectedAvailability,
  categoryCounts,
  availabilityCounts,
  hasActiveFilters,
  onToggleCategory,
  onToggleAvailability,
  onClear,
}: FilterControlsProps) {
  return (
    <div className="filter-controls">
      <div className="filter-controls__heading">
        <span>Filters</span>
        <button
          className="text-button"
          type="button"
          onClick={onClear}
          disabled={!hasActiveFilters}
        >
          Clear all
        </button>
      </div>

      <fieldset className="filter-group">
        <legend>Category</legend>
        <div className="filter-options">
          {categories.map((category) => {
            const id = `${idPrefix}-${category.id}`;
            return (
              <label className="check-row" htmlFor={id} key={category.id}>
                <input
                  id={id}
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => onToggleCategory(category.id)}
                />
                <span className="check-row__box" aria-hidden="true" />
                <span className="check-row__label">{category.label}</span>
                <span className="check-row__count">{categoryCounts[category.id]}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="filter-group">
        <legend>Availability</legend>
        <div className="filter-options">
          {(Object.keys(availabilityLabels) as AvailabilityId[]).map(
            (availability) => {
              const id = `${idPrefix}-${availability}`;
              return (
                <label className="check-row" htmlFor={id} key={availability}>
                  <input
                    id={id}
                    type="checkbox"
                    checked={selectedAvailability.includes(availability)}
                    onChange={() => onToggleAvailability(availability)}
                  />
                  <span className="check-row__box" aria-hidden="true" />
                  <span className="check-row__label">
                    {availabilityLabels[availability]}
                  </span>
                  <span className="check-row__count">
                    {availabilityCounts[availability]}
                  </span>
                </label>
              );
            },
          )}
        </div>
      </fieldset>

      <div className="filter-note">
        <span className="filter-note__label">Ordering rules</span>
        <p>Quantities begin at MOQ and move in each product&apos;s case increment.</p>
      </div>
    </div>
  );
}

interface MobileFilterDrawerProps
  extends Omit<FilterControlsProps, "idPrefix"> {
  open: boolean;
  resultCount: number;
  onClose: () => void;
}

export function MobileFilterDrawer({
  open,
  resultCount,
  onClose,
  ...filterProps
}: MobileFilterDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="drawer-layer drawer-layer--mobile-filter">
      <div className="drawer-backdrop" onMouseDown={onClose} aria-hidden="true" />
      <aside
        className="mobile-filter-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-filter-title"
      >
        <div className="drawer-titlebar">
          <div>
            <span className="eyebrow">Catalog controls</span>
            <h2 id="mobile-filter-title">Filter products</h2>
          </div>
          <button
            ref={closeButtonRef}
            className="icon-button"
            type="button"
            onClick={onClose}
            aria-label="Close filters"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="mobile-filter-drawer__body">
          <FilterControls idPrefix="mobile-filter" {...filterProps} />
        </div>

        <div className="mobile-filter-drawer__footer">
          <button className="button button--primary" type="button" onClick={onClose}>
            View {resultCount} {resultCount === 1 ? "product" : "products"}
          </button>
        </div>
      </aside>
    </div>
  );
}
