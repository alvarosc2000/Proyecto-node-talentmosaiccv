import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📂 Definir carpeta de almacenamiento
const uploadDir = path.join(__dirname, "..", "..", "uploads");

// Asegurar que la carpeta "uploads" existe
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ⚙️ Configurar almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// 📌 Filtro para permitir solo archivos PDF
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("❌ Solo se permiten archivos PDF"), false);
  }
};

// 📤 Middleware Multer
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Máximo 5MB
});
