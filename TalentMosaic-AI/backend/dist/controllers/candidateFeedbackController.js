import db from "../config/db";
class CandidateFeedbackController {
    serialize(feedback) {
        return {
            id: feedback.id,
            applicationId: feedback.applicationId,
            feedback: feedback.feedback,
            rating: feedback.rating,
            createdAt: feedback.createdAt ? feedback.createdAt.toISOString() : null,
        };
    }
    deserialize(row) {
        return {
            id: row.id,
            applicationId: row.application_id,
            feedback: row.feedback,
            rating: row.rating,
            createdAt: row.created_at ? new Date(row.created_at) : null,
        };
    }
    async getAllFeedbacks() {
        const query = "SELECT * FROM candidate_feedbacks";
        const { rows } = await db.query(query);
        return rows.map(this.deserialize);
    }
    async getFeedbackById(id) {
        const query = "SELECT * FROM candidate_feedbacks WHERE id = $1";
        const { rows } = await db.query(query, [id]);
        return rows.length > 0 ? this.deserialize(rows[0]) : null;
    }
    async createFeedback(feedback) {
        const serializedFeedback = this.serialize(feedback);
        const query = `
      INSERT INTO candidate_feedbacks (id, application_id, feedback, rating, created_at) 
      VALUES ($1, $2, $3, $4, NOW()) RETURNING *`;
        const result = await db.query(query, [
            serializedFeedback.id,
            serializedFeedback.applicationId,
            serializedFeedback.feedback,
            serializedFeedback.rating,
        ]);
        return result.rows[0];
    }
    async updateFeedback(id, feedback) {
        const serializedFeedback = this.serialize(feedback);
        const query = `
      UPDATE candidate_feedbacks SET 
        application_id = COALESCE($1, application_id), 
        feedback = COALESCE($2, feedback), 
        rating = COALESCE($3, rating)
      WHERE id = $4 RETURNING *`;
        const { rows } = await db.query(query, [
            serializedFeedback.applicationId,
            serializedFeedback.feedback,
            serializedFeedback.rating,
            id,
        ]);
        return rows[0];
    }
    async deleteFeedback(id) {
        const query = "DELETE FROM candidate_feedbacks WHERE id = $1";
        await db.query(query, [id]);
    }
}
export const candidateFeedbackController = new CandidateFeedbackController();
