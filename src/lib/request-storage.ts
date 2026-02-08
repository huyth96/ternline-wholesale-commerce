"use client";

import type { RequestRecord } from "@/lib/request";

const REQUEST_PREFIX = "ternline-request-v1:";
const LATEST_REQUEST_KEY = "ternline-latest-request-v1";

export function saveRequestRecord(record: RequestRecord) {
  window.localStorage.setItem(`${REQUEST_PREFIX}${record.reference}`, JSON.stringify(record));
  window.localStorage.setItem(LATEST_REQUEST_KEY, record.reference);
}

export function loadRequestRecord(reference: string): RequestRecord | null {
  try {
    const stored = window.localStorage.getItem(`${REQUEST_PREFIX}${reference}`);
    if (!stored) {
      return null;
    }
    const parsed = JSON.parse(stored) as Partial<RequestRecord>;
    return parsed.reference === reference && Array.isArray(parsed.lines)
      ? (parsed as RequestRecord)
      : null;
  } catch {
    return null;
  }
}
