import { integer, uuid, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

import { Application } from "./applications";

const CandidateFeedback = pgTable("candidate_feedbacks", {
    id: uuid("id").defaultRandom().primaryKey(),
    applicationId: uuid("application_id").references(() => Application.id),
    feedback: varchar("feedback", {length: 255}),
    rating: integer("rating"),
    createdAt: timestamp("created_at").defaultNow(),
  });
  
  
  


export { CandidateFeedback };
