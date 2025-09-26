import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  driver: "better-sqlite",
  dbCredentials: {
    url: "file:local.db"
  },
  verbose: true,
  strict: true,
  migrations: {
    table: "__drizzle_migrations"
  }
});
