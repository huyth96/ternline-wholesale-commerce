export default function Loading() {
  return (
    <main className="route-loading" aria-label="Loading page">
      <span className="loading-line" />
      <span className="loading-line loading-line--short" />
      <div className="route-loading__grid"><span /><span /><span /></div>
    </main>
  );
}
