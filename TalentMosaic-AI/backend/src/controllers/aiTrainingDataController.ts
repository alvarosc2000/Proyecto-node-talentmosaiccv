import { Request, Response } from "express";
import db from "../config/db";

export const getTrainingData = async (req: Request, res: Response) => {
  try {
    const data = await db.query("SELECT * FROM ai_training_data ORDER BY created_at DESC");
    res.json(data.rows);
  } catch (error) {
    console.error("Error obteniendo datos de entrenamiento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const addTrainingData = async (req: Request, res: Response) => {
  try {
    const { candidate_id, job_id, features, score } = req.body;
    const query = `
      INSERT INTO ai_training_data (candidate_id, job_id, features, score, created_at)
      VALUES ($1, $2, $3, $4, NOW()) RETURNING *`;
    const result = await db.query(query, [candidate_id, job_id, features, score]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al agregar datos de entrenamiento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
