import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { mergedResolvers } from "./resolvers/resolver";
import cvRouter from "./routes/cv";
import feedbackLogRoutes from "./routes/feedbackLogRoutes";
import aiTrainingDataRoutes from "./routes/aiTrainingDataRoutes";
import jobRoutes from "./routes/jobRoutes";
import candidateRankingRoutes from "./routes/candidateRankingRoutes";

dotenv.config();

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leer el esquema GraphQL
const typeDefs = readFileSync(path.join(__dirname, "graphql", "index.gql"), "utf-8");

// Función para iniciar Apollo Server y Express
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers: mergedResolvers,
  });

  await server.start();

  const app: Application = express();

  // Middlewares de seguridad y CORS
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json()); // Necesario para procesar JSON en Apollo Server

  // **💡 CORRECCIÓN: Asegurar que expressMiddleware se usa correctamente**
  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.authorization || "" }),
    })
  );

  // **💡 Mover las rutas REST después de Apollo**
  app.use("/api/cv", cvRouter);
  app.use("/api/feedback-logs", feedbackLogRoutes);
  app.use("/api/training-data", aiTrainingDataRoutes);
  app.use("/api/jobs", jobRoutes);
  app.use("/api/candidates/rankings", candidateRankingRoutes);
  
  // Ruta principal
  app.get("/", (req, res) => {
    res.send("TalentMosaicCV AI Backend Running...");
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// Iniciar el servidor
startServer().catch((err) => {
  console.error("Error starting the server:", err);
});
