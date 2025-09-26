# Finance Insights Monorepo

This repository contains the groundwork for a personal finance analytics platform. The codebase uses a pnpm-powered workspace with a Vite + React + TypeScript front-end, shared UI primitives, and a Drizzle ORM layer backed by SQLite WASM/OPFS for offline-first data persistence.

## Project structure

```
.
├── apps
│   └── web              # Vite React application
├── packages
│   └── ui               # Shared design system primitives
├── pnpm-workspace.yaml  # Workspace manifest
└── package.json         # Root scripts for common workflows
```

The `apps/web` project is organized around feature folders that align with the product roadmap:

- `features/import`
- `features/transactions`
- `features/categories`
- `features/budgets`
- `features/insights`

Each feature exports an initial UI scaffold so future iterations can focus on domain logic without restructuring the project.

## Getting started

1. **Install pnpm** (if needed): follow the [pnpm installation guide](https://pnpm.io/installation).
2. **Install dependencies** from the repository root:

   ```bash
   pnpm install
   ```

3. **Start the development server**:

   ```bash
   pnpm dev
   ```

   This runs `apps/web` on [http://localhost:5173](http://localhost:5173) with hot-module replacement.

4. **Run checks**:

   ```bash
   pnpm lint        # ESLint with TypeScript + Tailwind rules
   pnpm test        # Vitest unit tests (jsdom environment)
   pnpm playwright  # Playwright end-to-end smoke tests
   pnpm build       # Type-check and build the production bundle
   ```

## Tooling highlights

- **TailwindCSS** configured with shadcn/ui-inspired tokens and utilities.
- **Shared UI library** under `packages/ui` with Theme context + Provider.
- **Drizzle ORM** + `@sqlite.org/sqlite-wasm` bootstrap for browser-based SQLite storage using OPFS.
- **Testing** stack including Vitest, React Testing Library, and Playwright.
- **ESLint** (flat config) and **Prettier** with Tailwind class sorting support.

## Continuous integration

GitHub Actions workflows under `.github/workflows/` run linting, tests, and build steps on pull requests to keep the skeleton healthy as features are implemented.

## Next steps

- Connect the Drizzle client to real schema migrations and seed data.
- Flesh out feature directories with domain logic, hooks, and API integrations.
- Expand the shared UI package with typography, forms, dialogs, and charts as needed.
