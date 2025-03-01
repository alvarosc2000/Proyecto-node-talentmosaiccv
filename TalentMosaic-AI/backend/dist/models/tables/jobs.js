import { integer, uuid, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { Company } from "./company";
const Job = pgTable("jobs", {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id").references(() => Company.id),
    jobTitle: varchar("job_title", { length: 255 }),
    description: t.text("description"),
    location: varchar("location", { length: 255 }),
    experienceRequired: integer("experience_required"),
    skillsRequired: t.text("skills_required"),
    educationRequired: t.text("education_required"),
    salaryRange: varchar("salary_range", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).$onUpdate(() => new Date()),
});
export { Job };
