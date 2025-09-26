# Finance Insights Workspace

This repository hosts a pnpm-powered monorepo for a personal finance web application. The initial skeleton focuses on developer ergonomics so future features can be delivered quickly and confidently.

## Project structure

```
.
├── apps/
│   └── web/                # Vite + React + TypeScript application
├── packages/
│   └── ui/                 # Shared UI primitives (shadcn/ui inspired)
├── pnpm-workspace.yaml     # Workspace definition
├── tsconfig.base.json      # Shared TypeScript configuration
└── drizzle.config.ts       # Drizzle ORM configuration
```

## Getting started

1. **Install pnpm** (v8 or newer):

   ```bash
   corepack enable
   corepack prepare pnpm@latest --activate
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Run the web app in development mode**:

   ```bash
   pnpm dev
   ```

   The Vite dev server runs at [http://localhost:5173](http://localhost:5173).

4. **Run quality checks**:

   ```bash
   pnpm lint       # ESLint
   pnpm test       # Vitest unit/integration suite
   pnpm test:ui    # Vitest UI runner
   pnpm test:e2e   # Playwright end-to-end suite
   ```

5. **Generate Drizzle artifacts** (optional during local schema work):

   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

## Tooling highlights

- **Vite + React + TypeScript** for a fast, typed frontend workflow.
- **Tailwind CSS + shadcn/ui** for composable design primitives.
- **Vitest + Testing Library + Playwright** for unit, integration, and e2e coverage.
- **Drizzle ORM + SQLite (WASM/OPFS)** for a fully client-side persistence layer.
- **pnpm workspaces** with a shared UI package, enabling incremental feature delivery.

## Continuous integration

GitHub Actions workflows (see `.github/workflows/`) automate linting and testing on pull requests to ensure every change keeps the workspace healthy.
