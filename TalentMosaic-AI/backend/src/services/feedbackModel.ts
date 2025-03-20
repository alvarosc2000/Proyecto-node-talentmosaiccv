import db from "../config/db";

export const saveFeedback = async (candidateId: number, feedback: number): Promise<void> => {
  try {
    await db.query(
      "INSERT INTO feedback_log (candidate_id, feedback, timestamp) VALUES ($1, $2, NOW())",
      [candidateId, feedback]
    );
  } catch (error) {
    console.error("❌ Error al guardar feedback:", error);
    throw error;
  }
};
