import assert from "node:assert/strict";
import path from "node:path";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:3100";
const edgePath =
  process.env.QA_BROWSER_PATH ??
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const screenshotDirectory = path.resolve("docs/screenshots");
const viewports = [
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1440", width: 1440, height: 810 },
  { name: "wide-1920", width: 1920, height: 1080 },
];

await mkdir(screenshotDirectory, { recursive: true });

const browser = await chromium.launch({ executablePath: edgePath, headless: true });
const failures = [];

function watchPage(page, label) {
  page.on("console", (message) => {
    if (message.type() === "error") {
      failures.push(`[${label}] console: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => failures.push(`[${label}] page error: ${error.message}`));
  page.on("response", (response) => {
    if (response.status() >= 400) {
      failures.push(`[${label}] response ${response.status()}: ${response.url()}`);
    }
  });
}

async function assertNoPageOverflow(page, label) {
  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );
  assert.equal(hasOverflow, false, `${label} has horizontal page overflow`);
}

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    watchPage(page, viewport.name);

    await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    const rootDestination = new URL(page.url());
    assert.equal(rootDestination.pathname, "/catalog");
    assert.equal(rootDestination.searchParams.get("category"), "desk-systems");
    await page.getByRole("heading", { level: 1, name: "Trade catalog" }).waitFor();
    assert.equal(await page.locator(".product-card").count(), 4);
    const portfolioBadge = page.getByRole("link", { name: /Portfolio demo by Huy Trương/ });
    await portfolioBadge.waitFor();
    assert.equal(
      await portfolioBadge.getAttribute("href"),
      "https://github.com/huyth96/ternline-wholesale-commerce",
    );
    assert.equal(await portfolioBadge.evaluate((element) => getComputedStyle(element).position), "fixed");
    await assertNoPageOverflow(page, `${viewport.name} desk systems`);
    await page.screenshot({ path: path.join(screenshotDirectory, `${viewport.name}-desk-systems.png`) });

    await page.goto(`${baseUrl}/catalog`, { waitUntil: "networkidle" });
    await page.getByRole("heading", { level: 1, name: "Trade catalog" }).waitFor();
    assert.equal(await page.locator(".product-card").count(), 6);
    await assertNoPageOverflow(page, `${viewport.name} catalog`);
    await page.screenshot({ path: path.join(screenshotDirectory, `${viewport.name}-catalog.png`) });

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.locator(".commerce-footer").waitFor();
    await page.screenshot({ path: path.join(screenshotDirectory, `${viewport.name}-footer.png`) });

    if (viewport.width <= 768) {
      await page.getByRole("button", { name: "Toggle navigation" }).click();
      await page.locator("#mobile-commerce-nav").getByRole("link", { name: "Review order" }).waitFor();
      await page.getByRole("button", { name: "Toggle navigation" }).click();
      await page.getByRole("button", { name: /Filters/ }).click();
      await page.getByRole("heading", { name: "Filter products" }).waitFor();
      await page.getByRole("button", { name: "View 12 products" }).click();
    }

    if (viewport.width === 1440) {
      await page.getByPlaceholder("Search by product name or SKU").fill("TL-ST-422");
      await page.getByText("Route Archive Crate", { exact: true }).waitFor();
      assert.equal(await page.locator(".product-card").count(), 1);
      await page.getByRole("button", { name: "Clear catalog search" }).click();

      await page.locator("#desktop-filter-meeting-tools").check();
      assert.equal(await page.locator(".product-card").count(), 3);
      await page.locator(".desktop-filter-rail").getByRole("button", { name: "Clear all" }).click();
      await page.getByRole("button", { name: "List view" }).click();
      assert.equal(await page.locator(".product-grid--list").count(), 1);
      await page.getByRole("button", { name: "Grid view" }).click();

      await page.goto(`${baseUrl}/catalog/ridge-letter-tray`, { waitUntil: "networkidle" });
      await page.getByRole("heading", { level: 1, name: "Ridge Letter Tray" }).waitFor();
      await assertNoPageOverflow(page, "desktop product detail");
    }

    await context.close();
  }

  const context = await browser.newContext({ viewport: { width: 1440, height: 810 } });
  const page = await context.newPage();
  watchPage(page, "end-to-end");
  await page.goto(`${baseUrl}/catalog?category=desk-systems`, { waitUntil: "networkidle" });
  await page.evaluate(() => window.localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
  await page.getByRole("heading", { level: 1, name: "Trade catalog" }).waitFor();
  const ridgeCard = page.locator(".product-card").filter({ hasText: "Ridge Letter Tray" });
  await ridgeCard.getByRole("button", { name: "Add to order" }).click();
  await page.getByText(/Ridge Letter Tray added at 12 units/).waitFor();
  await page.locator(".order-trigger").click();
  await page.getByRole("heading", { name: "Order draft" }).waitFor();
  assert.equal(await page.locator(".order-drawer__body .draft-line").count(), 1);
  await page.locator(".order-drawer").getByRole("link", { name: "Review order" }).click();
  await page.waitForURL(`${baseUrl}/order`);

  await page.getByRole("button", { name: "Prepare request summary" }).click();
  await page.getByText("Enter a company or organization name.").waitFor();
  await page.getByLabel("Company name *").fill("Northline Workplace Group");
  await page.getByLabel("Contact name *").fill("Morgan Lee");
  await page.getByLabel("Work email *").fill("morgan@northline.example");
  await page.getByLabel("Delivery region *").selectOption("Midwest");
  await page.getByLabel(/PO or project reference/).fill("NW-2608");
  await page.getByLabel(/Planning notes/).fill("Receiving dock available weekdays after 09:00 CT.");
  await page.getByRole("button", { name: "Prepare request summary" }).click();
  await page.waitForURL(/\/request\/TL-/);
  await page.getByText("Browser-local request prepared").waitFor();
  await page.getByText("Northline Workplace Group").waitFor();
  await assertNoPageOverflow(page, "desktop request result");

  const requestUrl = page.url();
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(page.url(), requestUrl);
  await page.getByText("Northline Workplace Group").waitFor();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(screenshotDirectory, "desktop-1440-request-result.png") });
  await context.close();
} finally {
  await browser.close();
}

assert.deepEqual(failures, [], failures.join("\n"));
console.log(`Browser QA passed at ${viewports.map((item) => item.name).join(", ")} plus end-to-end request flow.`);
