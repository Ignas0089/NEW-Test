import type { PropsWithChildren } from "react";
import { NavLink, type NavLinkProps } from "react-router-dom";
import { ThemeProvider } from "@new-test/ui";
import { cn } from "@/lib/cn";

const links: Array<NavLinkProps["to"]> = [
  "/",
  "/import",
  "/transactions",
  "/categories",
  "/budgets",
  "/insights"
];

const linkLabels: Record<string, string> = {
  "/": "Dashboard",
  "/import": "Import",
  "/transactions": "Transactions",
  "/categories": "Categories",
  "/budgets": "Budgets",
  "/insights": "Insights"
};

export function Layout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <header className="border-b bg-card/60 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
            <div className="text-lg font-semibold tracking-tight">Finance Insights</div>
            <nav className="flex items-center gap-4 text-sm font-medium">
              {links.map((to) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "rounded-md px-3 py-2 transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )
                  }
                >
                  {linkLabels[to as string]}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1">
          <div className="mx-auto w-full max-w-6xl px-6 py-10">{children}</div>
        </main>
        <footer className="border-t py-6 text-center text-sm text-muted-foreground">
          Built with React, TailwindCSS, and Drizzle ORM.
        </footer>
      </div>
    </ThemeProvider>
  );
}
