import {pgEnum,doublePrecision, integer, uuid, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

import { Candidate } from "./candidates ";
import { Job } from "./jobs";


const AiTrainingData = pgTable("ai_training_data", {
    id: uuid("id").defaultRandom().primaryKey(),
    candidateId: uuid("candidate_id").references(() => Candidate.id),
    jobId: uuid("job_id").references(() => Job.id),
    features: t.jsonb("features"), // Datos estructurados extraídos del CV
    score: integer("score"), // Puntuación del candidato según el algoritmo
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).$onUpdate(() => new Date()),
  });
  
  
  
  


export { AiTrainingData };
