// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
export default defineConfig({
    dialect: "postgresql",
    out: "../backend/migrations", // Carpeta donde se encuentran tus migraciones
    schema: "../backend/src/models", // Carpeta donde están definidos tus modelos
    dbCredentials: {
        url: "postgresql://DB_USER:DB_PASSWORD@DB_HOST:DB_PORT/DB_NAME"
    },
});
