import sqlite3InitModule from "@sqlite.org/sqlite-wasm";
import { drizzle } from "drizzle-orm/sqlite-proxy";
import * as schema from "./schema";

type QueryResult = {
  columns: string[];
  values: unknown[][];
};

type ProxyExecutor = (sql: string, params: unknown[]) => Promise<{ rows: unknown[][]; columns: string[] }>;

let sqlite3Promise: ReturnType<typeof sqlite3InitModule> | null = null;
let drizzlePromise: Promise<ReturnType<typeof createDrizzleClient>> | null = null;

async function getSqlite3() {
  if (!sqlite3Promise) {
    sqlite3Promise = sqlite3InitModule({
      print: () => {},
      printErr: (message) => console.warn(message)
    });
  }
  return sqlite3Promise;
}

async function getOpfsDb() {
  const sqlite3 = await getSqlite3();
  if (!sqlite3?.oo1?.OpfsDb) {
    throw new Error("OPFS is not supported in this browser environment");
  }
  return new sqlite3.oo1.OpfsDb("app.db");
}

async function createDrizzleClient() {
  const db = await getOpfsDb();
  const executor: ProxyExecutor = async (sql, params) => {
    const [result] = (db.exec({ sql, bind: params }) as QueryResult[]) ?? [];
    return {
      rows: result?.values ?? [],
      columns: result?.columns ?? []
    };
  };
  return drizzle(executor, { schema });
}

export async function getDrizzleClient() {
  if (!drizzlePromise) {
    drizzlePromise = createDrizzleClient();
  }

  return drizzlePromise;
}
