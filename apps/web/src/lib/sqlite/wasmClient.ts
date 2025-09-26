let sqliteInstance: unknown | null = null;

type SqliteOpenOptions = {
  filename: string;
  vfs: 'opfs';
};

type SqliteModule = {
  default: () => Promise<{
    open: (options: SqliteOpenOptions) => Promise<unknown>;
  }>;
};

async function initSQLiteWasm(): Promise<unknown> {
  const sqliteModule = (await import('@sqlite.org/sqlite-wasm')) as SqliteModule;
  const worker = await sqliteModule.default();
  return worker.open({
    filename: 'finance.sqlite3',
    vfs: 'opfs'
  });
}

export async function createClient(): Promise<unknown> {
  if (sqliteInstance) {
    return sqliteInstance;
  }

  sqliteInstance = await initSQLiteWasm();
  return sqliteInstance;
}
