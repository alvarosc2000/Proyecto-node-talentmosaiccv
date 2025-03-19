import express from "express";
import { uploadCV } from "../controllers/cvController";
import { upload } from "../middleware/upload";

const router = express.Router();

// ✅ Ruta para subir CVs con Multer
router.post("/upload-cv", upload.single("cv"), uploadCV);

export default router;
