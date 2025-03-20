import {pgEnum,doublePrecision, integer, uuid, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

import { Candidate } from "./candidates ";
import { User } from "./users";


const FeedbackLog = pgTable("feedback_log", {
    id: uuid("id").defaultRandom().primaryKey(),
    candidateId: uuid("candidate_id").references(() => Candidate.id),
    userId: uuid("user_id").references(() => User.id),
    features: t.jsonb("features"), // Datos estructurados extraídos del CV
    scoreChange: doublePrecision("score_change"), // Puntuación del candidato según el algoritmo
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).$onUpdate(() => new Date()),
  });
  
  
  
  


export { FeedbackLog };
