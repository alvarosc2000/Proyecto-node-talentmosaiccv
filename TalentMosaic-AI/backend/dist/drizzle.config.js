// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
export default defineConfig({
    dialect: "postgresql",
    out: "../migrations", // Carpeta donde se encuentran tus migraciones
    schema: "../src/models", // Carpeta donde están definidos tus modelos
    dbCredentials: {
        url: "postgresql://admin:admin@localhost:5432/talentmosaic"
    },
});
