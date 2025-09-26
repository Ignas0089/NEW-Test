export default function TransactionsPage(): JSX.Element {
  return (
    <section className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <p className="text-muted-foreground">
          Review, categorize, and annotate each transaction to keep your books
          tidy.
        </p>
      </header>
      <div className="rounded-lg border p-6">
        <p className="text-sm text-muted-foreground">
          The transaction table will live here. Use this area to render virtual
          lists, filters, and bulk actions as the product evolves.
        </p>
      </div>
    </section>
  );
}
