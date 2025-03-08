import db from "../config/db";
class CandidateRankingController {
    serialize(ranking) {
        return {
            id: ranking.id,
            applicationId: ranking.applicationId,
            score: ranking.score,
            ranking: ranking.ranking,
            createdAt: ranking.createdAt ? ranking.createdAt.toISOString() : null,
        };
    }
    deserialize(row) {
        return {
            id: row.id,
            applicationId: row.application_id,
            score: row.score,
            ranking: row.ranking,
            createdAt: row.created_at ? new Date(row.created_at) : null,
        };
    }
    async getAllRankings() {
        const query = "SELECT * FROM candidate_rankings";
        const { rows } = await db.query(query);
        return rows.map(this.deserialize);
    }
    async getRankingById(id) {
        const query = "SELECT * FROM candidate_rankings WHERE id = $1";
        const { rows } = await db.query(query, [id]);
        return rows.length > 0 ? this.deserialize(rows[0]) : null;
    }
    async createRanking(ranking) {
        const serializedRanking = this.serialize(ranking);
        const query = `
      INSERT INTO candidate_rankings (id, application_id, score, ranking, created_at) 
      VALUES ($1, $2, $3, $4, NOW()) RETURNING *`;
        const result = await db.query(query, [
            serializedRanking.id,
            serializedRanking.applicationId,
            serializedRanking.score,
            serializedRanking.ranking,
        ]);
        return result.rows[0];
    }
    async updateRanking(id, ranking) {
        const serializedRanking = this.serialize(ranking);
        const query = `
      UPDATE candidate_rankings SET 
        application_id = COALESCE($1, application_id), 
        score = COALESCE($2, score), 
        ranking = COALESCE($3, ranking)
      WHERE id = $4 RETURNING *`;
        const { rows } = await db.query(query, [
            serializedRanking.applicationId,
            serializedRanking.score,
            serializedRanking.ranking,
            id,
        ]);
        return rows[0];
    }
    async deleteRanking(id) {
        const query = "DELETE FROM candidate_rankings WHERE id = $1";
        await db.query(query, [id]);
    }
}
export const candidateRankingController = new CandidateRankingController();
