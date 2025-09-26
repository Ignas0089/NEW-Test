export default function InsightsPage(): JSX.Element {
  return (
    <section className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Insights</h1>
        <p className="text-muted-foreground">
          Keep a pulse on cash flow, savings velocity, and financial health with
          curated dashboards.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-medium">Cash flow</h2>
          <p className="text-sm text-muted-foreground">
            Replace this placeholder with charts sourced from SQLite-backed
            queries and React Query loaders.
          </p>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-medium">Spending patterns</h2>
          <p className="text-sm text-muted-foreground">
            Highlight categories that drive spend, monthly deltas, and upcoming
            obligations.
          </p>
        </div>
      </div>
    </section>
  );
}
