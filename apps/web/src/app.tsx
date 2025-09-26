import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Dashboard } from "@/routes/dashboard";
import { ImportFeature } from "@/features/import";
import { TransactionsFeature } from "@/features/transactions";
import { CategoriesFeature } from "@/features/categories";
import { BudgetsFeature } from "@/features/budgets";
import { InsightsFeature } from "@/features/insights";
import { DatabaseProvider } from "@/db/provider";

function NotFound() {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground">Select a page from the navigation to continue.</p>
    </div>
  );
}

export default function App() {
  return (
    <DatabaseProvider>
      <Layout>
        <Suspense fallback={<div className="p-6 text-muted-foreground">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/import" element={<ImportFeature />} />
            <Route path="/transactions" element={<TransactionsFeature />} />
            <Route path="/categories" element={<CategoriesFeature />} />
            <Route path="/budgets" element={<BudgetsFeature />} />
            <Route path="/insights" element={<InsightsFeature />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </DatabaseProvider>
  );
}
