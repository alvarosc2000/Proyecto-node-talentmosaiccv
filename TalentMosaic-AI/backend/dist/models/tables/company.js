import { integer, uuid, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
const Company = pgTable("companies", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }),
    industry: varchar("industry", { length: 255 }), // Sector de la empresa
    size: integer("size"), // Tamaño de la empresa
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).$onUpdate(() => new Date()),
});
export { Company };
