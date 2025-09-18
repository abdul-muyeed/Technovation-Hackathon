import { pgTable, varchar } from 'drizzle-orm/pg-core';

export const userSchema = pgTable('users', {
  email: varchar('email').notNull().unique(),
  password: varchar('password').notNull(),
});
