import type { Metadata } from "next";
import { OrderScreen } from "@/components/order-screen";

export const metadata: Metadata = {
  title: "Prepare Order Request",
  description: "Review Ternline order lines and prepare a browser-local wholesale request summary.",
};

export default function OrderPage() {
  return <OrderScreen />;
}
