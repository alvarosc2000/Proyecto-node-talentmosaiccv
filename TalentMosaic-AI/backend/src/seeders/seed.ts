import { drizzle } from "drizzle-orm/node-postgres";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; // Importar helper para obtener __dirname
import { Company, User, Candidate, Job, Application, CandidateRanking, CandidateFeedback, AiTrainingData, FeedbackLog } from "../models/schema";

// 📍 Definir __dirname manualmente en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🚀 Importación de 'pg' usando require (para evitar problemas con ESM)
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Client } = require("pg");

// Configuración de la base de datos
const client = new Client({
  connectionString: "postgresql://admin:admin@localhost:5432/talentmosaic", // Cambia esto si es necesario
});

const db = drizzle(client);

// Función para leer archivos JSON
const loadJson = (filename: string) => {
  const filepath = path.join(__dirname, "seeds", filename);
  const rawData = fs.readFileSync(filepath, "utf-8");
  return JSON.parse(rawData);
};

const seedDatabase = async () => {
  try {
    await client.connect();
    console.log("📥 Conectado a la base de datos");

    console.log("📂 Cargando datos JSON...");
    const companies = loadJson("./company.json");
    const users = loadJson("./users.json");
    const candidates = loadJson("./candidates.json");
    const jobs = loadJson("./jobs.json");
    const applications = loadJson("./applications.json");
    const candidateRankings = loadJson("./candidate_rankings.json");
    const candidateFeedbacks = loadJson("./candidate_feedback.json");
    const feedBack = loadJson("./feedback.json");
    const aiTraining = loadJson ("./ai_training.json");

    console.log("🚀 Insertando datos...");
    await db.insert(User).values(users);
    await db.insert(Company).values(companies);
    await db.insert(Candidate).values(candidates);
    await db.insert(Job).values(jobs);
    await db.insert(Application).values(applications);
    await db.insert(CandidateRanking).values(candidateRankings);
    await db.insert(CandidateFeedback).values(candidateFeedbacks);
    await db.insert(FeedbackLog).values(feedBack);
    await db.insert(AiTrainingData).values(aiTraining);

    console.log("✅ Seeding completado.");
  } catch (error) {
    console.error("❌ Error en el seeding:", error);
  } finally {
    await client.end();
  }
};

seedDatabase();
