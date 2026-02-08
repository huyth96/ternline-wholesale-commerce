"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main className="flow-page request-missing"><span className="request-status-mark">!</span><span className="eyebrow">Application error</span><h1>This page could not be loaded.</h1><p>Your browser-local order draft has not been cleared.</p><button className="button button--primary" type="button" onClick={() => reset()}>Try again</button></main>;
}
