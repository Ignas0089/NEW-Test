import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const transactions = sqliteTable('transactions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  description: text('description').notNull(),
  amount: real('amount').notNull(),
  categoryId: integer('category_id'),
  occurredAt: integer('occurred_at').notNull()
});

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  type: text('type').$type<'income' | 'expense'>().notNull()
});

export type Transaction = typeof transactions.$inferSelect;
export type Category = typeof categories.$inferSelect;
