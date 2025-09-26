export default function BudgetsPage(): JSX.Element {
  return (
    <section className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Budgets</h1>
        <p className="text-muted-foreground">
          Plan future spending, track performance, and monitor progress across
          envelopes.
        </p>
      </header>
      <div className="rounded-lg border p-6">
        <p className="text-sm text-muted-foreground">
          This is the staging area for budget plan visualizations, guardrails,
          and alerts. Wire up charts, tables, and forecast widgets as the
          product matures.
        </p>
      </div>
    </section>
  );
}
