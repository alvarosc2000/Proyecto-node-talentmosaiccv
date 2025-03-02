import express, { Application } from "express"; // Importa Application desde express
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { ApolloServer } from "@apollo/server"; // Cambiar importación de ApolloServer
import { expressMiddleware } from "@apollo/server/express4"; // Importa el middleware de Express de Apollo
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url"; // Importar fileURLToPath para resolver __dirname
import resolvers from "./resolvers/user/resolver.js"; // Asegúrate de agregar `.js` si usas ES Modules

dotenv.config();

// Definir __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Especificamos que 'app' es de tipo 'Application'
const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Cargar el esquema de GraphQL desde el archivo .gql
const typeDefs = readFileSync(path.join(__dirname, "graphql", "userSchema.gql"), "utf-8");

// Configuración de Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Inicializa Apollo Server
await server.start();

// Usar el middleware de Apollo Server con Express
app.use("/graphql", expressMiddleware(server));

app.get("/", (req, res) => {
  res.send("TalentMosaicCV AI Backend Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
