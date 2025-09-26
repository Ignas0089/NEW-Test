import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './apps/web/src/lib/db/schema.ts',
  out: './apps/web/drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'file:./local.db'
  }
});
