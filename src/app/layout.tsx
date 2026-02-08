import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { CommerceShell } from "@/components/commerce-shell";
import { OrderDraftProvider } from "@/lib/order-context";
import "./globals.css";

const vercelHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const metadata: Metadata = {
  metadataBase: new URL(vercelHost ? `https://${vercelHost}` : "http://localhost:3000"),
  title: {
    default: "Ternline Wholesale Commerce",
    template: "%s · Ternline",
  },
  description:
    "Search Ternline workplace systems by name or SKU, compare MOQ and volume pricing, and build a browser-local wholesale order draft.",
  applicationName: "Ternline Wholesale Commerce",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Ternline Wholesale Commerce",
    description: "Case-packed workplace systems with visible MOQ, lead time, and volume pricing.",
    siteName: "Ternline",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#123849",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <OrderDraftProvider>
          <CommerceShell>{children}</CommerceShell>
        </OrderDraftProvider>
      </body>
    </html>
  );
}
