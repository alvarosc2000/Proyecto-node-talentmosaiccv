import express from "express";
import multer from "multer";
import { candidateController } from "../controllers/candidateController";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload-cv", upload.single("cv"), async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: "No se envió ningún archivo" });
      return;
    }

    // Procesar el CV usando el controlador de candidatos
    const candidate = await candidateController.processCandidateCV(file.buffer);

    res.json({ message: "CV procesado exitosamente", candidate });
  } catch (error) {
    console.error("❌ Error al procesar el CV:", error);
    next(error); // Pasamos el error al middleware de Express
  }
});

export default router;
