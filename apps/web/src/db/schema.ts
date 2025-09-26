import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  color: text("color"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
});

export const transactions = sqliteTable("transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  externalId: text("external_id"),
  description: text("description").notNull(),
  amount: real("amount").notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  transactedAt: integer("transacted_at", { mode: "timestamp" }).notNull()
});

export const budgets = sqliteTable("budgets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  amount: real("amount").notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  startsOn: integer("starts_on", { mode: "timestamp" }).notNull(),
  endsOn: integer("ends_on", { mode: "timestamp" }).notNull()
});
