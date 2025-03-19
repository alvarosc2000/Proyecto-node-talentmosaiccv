import fs from "fs";
import pdfParse from "pdf-parse";
import path from "path";
import { fileURLToPath } from "url";

// 🏗️ Obtener __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📂 Asegurar que la carpeta "uploads/" existe
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 📄 Función para extraer texto de un archivo PDF
export const extractTextFromPDF = async (pdfPath: string): Promise<string> => {
  try {
    // 🔍 Verificar que el archivo existe antes de leerlo
    if (!fs.existsSync(pdfPath)) {
      throw new Error(`❌ Archivo no encontrado: ${pdfPath}`);
    }

    // 📄 Leer el archivo PDF de manera asíncrona
    const dataBuffer = await fs.promises.readFile(pdfPath);

    // 📝 Extraer el texto utilizando pdf-parse
    const data = await pdfParse(dataBuffer);

    // 📤 Retornar el texto extraído del PDF
    return data.text;
  } catch (error) {
    console.error("❌ Error al extraer texto del PDF:", error);
    throw new Error("No se pudo extraer texto del PDF");
  }
};
