import { integer, uuid, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

const Users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});

export { Users };
