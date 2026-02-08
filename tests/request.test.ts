import { describe, expect, it } from "vitest";
import { products } from "../src/data/catalog";
import { validateRequest, type CompanyDetails } from "../src/lib/request";

const validCompany: CompanyDetails = {
  companyName: "Northline Workplace Group",
  contactName: "Morgan Lee",
  workEmail: "morgan@northline.example",
  phone: "",
  deliveryRegion: "Midwest",
  purchaseOrder: "NW-2608",
  notes: "",
};

describe("request validation", () => {
  it("accepts complete company details and compliant order lines", () => {
    const product = products[0];
    expect(
      validateRequest(validCompany, [
        { productId: product.id, quantity: product.minimumOrder },
      ]),
    ).toEqual({});
  });

  it("reports missing identity, invalid email, region, and order lines", () => {
    expect(
      validateRequest(
        {
          ...validCompany,
          companyName: "",
          contactName: "",
          workEmail: "not-an-email",
          deliveryRegion: "",
        },
        [],
      ),
    ).toMatchObject({
      companyName: expect.any(String),
      contactName: expect.any(String),
      workEmail: expect.any(String),
      deliveryRegion: expect.any(String),
      lines: expect.any(String),
    });
  });

  it("rejects a quantity that does not follow MOQ and case increments", () => {
    const product = products[0];
    expect(
      validateRequest(validCompany, [
        { productId: product.id, quantity: product.minimumOrder + 1 },
      ]).lines,
    ).toBeTruthy();
  });
});
