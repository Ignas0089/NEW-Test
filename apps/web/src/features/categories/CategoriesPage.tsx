export default function CategoriesPage(): JSX.Element {
  return (
    <section className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Categories</h1>
        <p className="text-muted-foreground">
          Define the taxonomy that powers reports and budgets across your
          workspace.
        </p>
      </header>
      <div className="rounded-lg border p-6">
        <p className="text-sm text-muted-foreground">
          Manage category groups, create custom rules, and organize spending
          patterns. This placeholder highlights where category management tools
          will appear.
        </p>
      </div>
    </section>
  );
}
