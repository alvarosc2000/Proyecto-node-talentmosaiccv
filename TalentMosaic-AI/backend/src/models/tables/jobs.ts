import { integer, uuid, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

import { User } from "./users";
import { boolean } from "drizzle-orm/pg-core";


const Job = pgTable("jobs", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => User.id),
    jobTitle: varchar("job_title", { length: 255 }),
    companyName: varchar("company_name",{length: 255}),
    description: t.text("description"),
    location: varchar("location", { length: 255 }),
    experienceRequired: integer("experience_required"),
    skillsRequired: t.text("skills_required"),
    educationRequired: t.text("education_required"),
    salaryRange: varchar("salary_range", { length: 255 }),
    status: boolean("status").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).$onUpdate(() => new Date()),
});
  
  
  


export { Job };
