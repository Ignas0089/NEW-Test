import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImportFeature } from "@/features/import";
import { TransactionsFeature } from "@/features/transactions";
import { CategoriesFeature } from "@/features/categories";
import { BudgetsFeature } from "@/features/budgets";
import { InsightsFeature } from "@/features/insights";

export function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground">
            Centralize your import workflow, review transactions, and monitor budgets in one place.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/import">Import data</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/insights">View insights</Link>
          </Button>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <ImportFeature />
          <TransactionsFeature />
        </div>
        <div className="space-y-6">
          <CategoriesFeature />
          <BudgetsFeature />
          <InsightsFeature />
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Next steps</CardTitle>
          <CardDescription>
            Future iterations will connect live data sources, automation rules, and machine learning based
            insights.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Use the navigation above to drill into each module and start building features incrementally.</p>
          <p>Drizzle ORM and the SQLite OPFS bootstrap are preconfigured for offline-first persistence.</p>
        </CardContent>
      </Card>
    </div>
  );
}
