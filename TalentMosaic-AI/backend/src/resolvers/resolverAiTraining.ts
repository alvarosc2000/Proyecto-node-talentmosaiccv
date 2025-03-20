import db from "../config/db";

export const resolvers = {
  Query: {
    getFeedbackLogs: async () => {
      const result = await db.query("SELECT * FROM feedback_log ORDER BY created_at DESC");
      return result.rows;
    },
    getTrainingData: async () => {
      const result = await db.query("SELECT * FROM ai_training_data ORDER BY created_at DESC");
      return result.rows;
    },
  },
  Mutation: {
    addFeedbackLog: async (_: any, { candidate_id, user_id, score_change }: any) => {
      const query = `
        INSERT INTO feedback_log (candidate_id, user_id, score_change, created_at)
        VALUES ($1, $2, $3, NOW()) RETURNING *`;
      const result = await db.query(query, [candidate_id, user_id, score_change]);
      return result.rows[0];
    },
    addTrainingData: async (_: any, { candidate_id, job_id, features, score }: any) => {
      const query = `
        INSERT INTO ai_training_data (candidate_id, job_id, features, score, created_at)
        VALUES ($1, $2, $3, $4, NOW()) RETURNING *`;
      const result = await db.query(query, [candidate_id, job_id, features, score]);
      return result.rows[0];
    },
  },
};
