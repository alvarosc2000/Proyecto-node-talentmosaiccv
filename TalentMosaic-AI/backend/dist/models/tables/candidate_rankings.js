import { integer, uuid, pgTable, timestamp } from "drizzle-orm/pg-core";
import { Application } from "./applications";
const CandidateRanking = pgTable("candidate_rankings", {
    id: uuid("id").defaultRandom().primaryKey(),
    applicationId: uuid("application_id").references(() => Application.id),
    score: integer("score"),
    ranking: integer("ranking"),
    createdAt: timestamp("created_at").defaultNow(),
});
export { CandidateRanking };
