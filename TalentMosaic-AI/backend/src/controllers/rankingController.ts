import { Request, Response } from "express";
import { rankCandidates } from "../services/aiScoring";
import db from "../config/db";

export const getRankedCandidates = async (req: Request, res: Response): Promise<void> => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription) {
      res.status(400).json({ error: "La descripción del puesto es obligatoria" });
      return;
    }

    // Obtener candidatos con su puntaje ajustado por feedback
    const candidates = await db.query("SELECT * FROM candidates ORDER BY score DESC");

    // Aplicar ranking con IA
    const rankedCandidates = rankCandidates(jobDescription, candidates.rows);

    res.status(200).json({ rankedCandidates });
  } catch (error) {
    console.error("❌ Error al obtener ranking de candidatos:", error);
    res.status(500).json({ error: "Error al procesar el ranking de candidatos" });
  }
};
