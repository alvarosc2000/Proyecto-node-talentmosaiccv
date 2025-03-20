import { Request, Response } from "express";
import db from "../config/db";

export const getFeedbackLogs = async (req: Request, res: Response) => {
  try {
    const logs = await db.query("SELECT * FROM feedback_log ORDER BY created_at DESC");
    res.json(logs.rows);
  } catch (error) {
    console.error("Error obteniendo feedback logs:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const addFeedbackLog = async (req: Request, res: Response) => {
  try {
    const { candidate_id, user_id, score_change } = req.body;
    const query = `
      INSERT INTO feedback_log (candidate_id, user_id, score_change, created_at)
      VALUES ($1, $2, $3, NOW()) RETURNING *`;
    const result = await db.query(query, [candidate_id, user_id, score_change]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al agregar feedback log:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
