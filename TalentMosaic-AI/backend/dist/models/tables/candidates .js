import { pgEnum, integer, uuid, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { Company } from "./company";
export const sourceEnum = pgEnum("source", ["linkedin", "cv_upload"]);
const Candidate = pgTable("candidates", {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id").references(() => Company.id),
    source: sourceEnum("source"), // Indica si viene de LinkedIn o un CV
    linkedinProfile: varchar("linkedin_profile", { length: 255 }),
    resume: t.jsonb("resume"), // Datos estructurados extraídos del CV
    skills: t.text("skills"), // Habilidades extraídas
    experience: integer("experience"), // Años de experiencia
    education: t.text("education"), // Información educativa
    location: varchar("location", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).$onUpdate(() => new Date()),
});
export { Candidate };
