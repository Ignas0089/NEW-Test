import { drizzle } from 'drizzle-orm/sqlite-proxy';
import { createClient as createSQLite } from '../sqlite/wasmClient';
import * as schema from './schema';

export async function createDatabase() {
  const sqlite = (await createSQLite()) as Parameters<typeof drizzle>[0];
  return drizzle(sqlite, { schema });
}

export type Database = Awaited<ReturnType<typeof createDatabase>>;
