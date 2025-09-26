import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/routes/layouts/AppLayout';

const ImportPage = lazy(() => import('@/features/import/ImportPage'));
const TransactionsPage = lazy(() => import('@/features/transactions/TransactionsPage'));
const CategoriesPage = lazy(() => import('@/features/categories/CategoriesPage'));
const BudgetsPage = lazy(() => import('@/features/budgets/BudgetsPage'));
const InsightsPage = lazy(() => import('@/features/insights/InsightsPage'));

export function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/insights" replace />} />
        <Route
          path="/import"
          element={
            <Suspense fallback={<div className="p-6">Loading import tools…</div>}>
              <ImportPage />
            </Suspense>
          }
        />
        <Route
          path="/transactions"
          element={
            <Suspense fallback={<div className="p-6">Loading transactions…</div>}>
              <TransactionsPage />
            </Suspense>
          }
        />
        <Route
          path="/categories"
          element={
            <Suspense fallback={<div className="p-6">Loading categories…</div>}>
              <CategoriesPage />
            </Suspense>
          }
        />
        <Route
          path="/budgets"
          element={
            <Suspense fallback={<div className="p-6">Loading budgets…</div>}>
              <BudgetsPage />
            </Suspense>
          }
        />
        <Route
          path="/insights"
          element={
            <Suspense fallback={<div className="p-6">Loading insights…</div>}>
              <InsightsPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
