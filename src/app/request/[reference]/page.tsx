import type { Metadata } from "next";
import { RequestResult } from "@/components/request-result";

export const metadata: Metadata = {
  title: "Request Summary",
  description: "Review a locally saved Ternline wholesale request reference.",
};

export default async function RequestPage({ params }: { params: Promise<{ reference: string }> }) {
  const { reference } = await params;
  return <RequestResult reference={reference} />;
}
