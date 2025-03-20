import db from "../config/db";
import { saveFeedback } from "./feedbackModel";

export const updateCandidateScore = async (candidateId: number, feedback: number): Promise<void> => {
  try {
    // Guardar feedback en la base de datos
    await saveFeedback(candidateId, feedback);

    // Obtener promedio de feedback del candidato
    const feedbackData = await db.query(
      "SELECT AVG(feedback) as avg_feedback FROM feedback_log WHERE candidate_id = $1",
      [candidateId]
    );

    const avgFeedback = feedbackData.rows[0].avg_feedback || 0;

    // Obtener puntaje actual del candidato
    const candidate = await db.query("SELECT score FROM candidates WHERE id = $1", [candidateId]);

    if (candidate.rows.length === 0) {
      throw new Error("Candidato no encontrado");
    }

    const currentScore = candidate.rows[0].score;

    // Ajustar el puntaje con regresión simple: score = score * (1 + avgFeedback * 0.1)
    const newScore = currentScore * (1 + avgFeedback * 0.1);

    // Guardar el nuevo puntaje en la base de datos
    await db.query("UPDATE candidates SET score = $1 WHERE id = $2", [newScore, candidateId]);
  } catch (error) {
    console.error("❌ Error al actualizar el modelo de ranking:", error);
    throw error;
  }
};
