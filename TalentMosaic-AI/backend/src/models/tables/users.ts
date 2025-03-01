import { pgEnum, uuid, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

import { Company } from "./company";

export const rolesEnum = pgEnum("role", ["admin", "recruiter", "manager"]);

const User = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").references(() => Company.id),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
  password: varchar("password", { length: 255 }),
  role: rolesEnum("role"),
  linkedInToken: t.text("linkedin_token"), // Token de LinkedIn (si usa integración)
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).$onUpdate(() => new Date()),
});



export { User };
