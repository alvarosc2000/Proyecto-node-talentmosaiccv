// app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { mergedResolvers } from "./resolvers/resolver";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
// Definir __dirname correctamente en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Cargar el esquema unificado
const typeDefs = readFileSync(path.join(__dirname, "graphql", "index.gql"), "utf-8");
dotenv.config(); // Cargar variables de entorno al inicio
// Inicializar Apollo Server de forma asíncrona
async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers: mergedResolvers, // Usar los resolvers combinados aquí
    });
    await server.start();
    // Crear una instancia de Express
    const app = express();
    // Usar middlewares básicos
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    // Usar el middleware de Apollo Server con Express
    app.use("/graphql", expressMiddleware(server));
    // Ruta principal para comprobar que el servidor está en funcionamiento
    app.get("/", (req, res) => {
        res.send("TalentMosaicCV AI Backend Running...");
    });
    // Configuración del puerto y inicio del servidor
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}
// Iniciar el servidor
startServer().catch((err) => {
    console.error("Error starting the server:", err);
});
