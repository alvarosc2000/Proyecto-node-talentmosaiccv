import { integer, uuid, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { User } from "./users";

const Company = pgTable("companies", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => User.id),
    name: varchar("name", { length: 255 }),
    industry: varchar("industry", { length: 255 }),
    size: integer("size"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).$onUpdate(() => new Date()),
});
  


export { Company };
