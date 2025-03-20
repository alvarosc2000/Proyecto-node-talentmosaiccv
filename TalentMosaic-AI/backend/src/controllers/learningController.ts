import { Request, Response } from "express";
import { updateCandidateScore } from "../services/learningService";

export const improveRanking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { candidateId, feedback } = req.body;

    if (!candidateId || feedback === undefined) {
      res.status(400).json({ error: "Faltan datos" });
      return;
    }

    // Guardar feedback y mejorar el ranking
    await updateCandidateScore(candidateId, feedback);
    
    res.status(200).json({ message: "Modelo actualizado con éxito" });
  } catch (error) {
    console.error("❌ Error en el aprendizaje automático:", error);
    res.status(500).json({ error: "Error al mejorar el ranking" });
  }
};
