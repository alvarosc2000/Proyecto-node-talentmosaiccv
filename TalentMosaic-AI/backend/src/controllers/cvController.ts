import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📂 Carpeta donde se guardan los archivos
const uploadDir = path.join(__dirname, "..", "..", "uploads");

// 📌 Controlador para subir CVs
export const uploadCV = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No se proporcionó un archivo PDF" });
      return;
    }

    const filePath = path.join(uploadDir, req.file.filename);

    // 📝 Verificar que el archivo subido es un PDF
    if (!filePath.endsWith(".pdf")) {
      fs.unlinkSync(filePath); // 🗑️ Eliminar el archivo si no es PDF
      res.status(400).json({ error: "El archivo no es un PDF válido" });
      return;
    }

    res.status(200).json({ message: "CV subido con éxito", filePath });
  } catch (error) {
    console.error("❌ Error al subir el CV:", error);
    res.status(500).json({ error: "Error al procesar el CV" });
  }
};
