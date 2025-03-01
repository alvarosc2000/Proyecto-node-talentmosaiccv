import {pgEnum,doublePrecision, integer, uuid, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

import { Candidate } from "./candidates ";
import { Job } from "./jobs";

export const statusEnum = pgEnum("status", ["pending", "interview", "hired", "rejected"]);

const Application = pgTable("applications", {
    id: uuid("id").defaultRandom().primaryKey(),
    candidateId: uuid("candidate_id").references(() => Candidate.id),
    jobId: uuid("job_id").references(() => Job.id),
    status: statusEnum("status"),
    score: integer("score"), // Puntuación del candidato según el algoritmo
    compatibility: doublePrecision("compatibility"), // Porcentaje de compatibilidad
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).$onUpdate(() => new Date()),
  });
  
  
  
  


export { Application };
