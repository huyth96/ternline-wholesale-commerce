import { products } from "@/data/catalog";
import { normalizeQuantity, type DraftLine } from "@/lib/pricing";

export const deliveryRegions = [
  "Midwest",
  "Northeast",
  "South",
  "West",
] as const;

export type DeliveryRegion = (typeof deliveryRegions)[number];

export interface CompanyDetails {
  companyName: string;
  contactName: string;
  workEmail: string;
  phone: string;
  deliveryRegion: string;
  purchaseOrder: string;
  notes: string;
}

export interface RequestInput {
  company: CompanyDetails;
  lines: DraftLine[];
  subtotal: number;
}

export interface RequestRecord extends RequestInput {
  reference: string;
  createdAt: string;
}

export type RequestField = keyof CompanyDetails | "lines";
export type RequestErrors = Partial<Record<RequestField, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRequest(
  company: CompanyDetails,
  lines: readonly DraftLine[],
): RequestErrors {
  const errors: RequestErrors = {};

  if (company.companyName.trim().length < 2) {
    errors.companyName = "Enter a company or organization name.";
  }
  if (company.contactName.trim().length < 2) {
    errors.contactName = "Enter the person responsible for this request.";
  }
  if (!emailPattern.test(company.workEmail.trim())) {
    errors.workEmail = "Enter a valid work email address.";
  }
  if (!deliveryRegions.includes(company.deliveryRegion as DeliveryRegion)) {
    errors.deliveryRegion = "Select a delivery region.";
  }
  if (company.phone.trim() && company.phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Enter a complete phone number or leave this field blank.";
  }
  if (lines.length === 0) {
    errors.lines = "Add at least one product before preparing a request.";
  } else if (
    lines.some((line) => {
      const product = products.find((item) => item.id === line.productId);
      return !product || normalizeQuantity(product, line.quantity) !== line.quantity;
    })
  ) {
    errors.lines = "One or more quantities do not follow the product MOQ and case step.";
  }

  return errors;
}

export function isRequestInput(value: unknown): value is RequestInput {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<RequestInput>;
  if (!candidate.company || !Array.isArray(candidate.lines) || typeof candidate.subtotal !== "number") {
    return false;
  }

  const company = candidate.company as Partial<CompanyDetails>;
  return [
    company.companyName,
    company.contactName,
    company.workEmail,
    company.phone,
    company.deliveryRegion,
    company.purchaseOrder,
    company.notes,
  ].every((field) => typeof field === "string") && candidate.lines.every(
    (line) =>
      !!line &&
      typeof line === "object" &&
      typeof (line as Partial<DraftLine>).productId === "string" &&
      typeof (line as Partial<DraftLine>).quantity === "number",
  );
}
