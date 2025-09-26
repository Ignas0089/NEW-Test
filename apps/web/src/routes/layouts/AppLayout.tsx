import { NavLink, Outlet } from 'react-router-dom';
import { Button } from '@new-test/ui';

const links = [
  { to: '/insights', label: 'Insights' },
  { to: '/transactions', label: 'Transactions' },
  { to: '/categories', label: 'Categories' },
  { to: '/budgets', label: 'Budgets' },
  { to: '/import', label: 'Import' }
];

function NavButton({ to, label }: { to: string; label: string }): JSX.Element {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
      }
    >
      {({ isActive }) => (
        <Button variant={isActive ? 'secondary' : 'ghost'} size="sm">
          {label}
        </Button>
      )}
    </NavLink>
  );
}

export function AppLayout(): JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="font-semibold text-lg">Finance Insights</div>
          <nav className="flex gap-2">
            {links.map((link) => (
              <NavButton key={link.to} {...link} />
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto flex max-w-6xl flex-1 flex-col gap-4 px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
