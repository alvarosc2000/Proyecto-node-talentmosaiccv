import db from "../config/db";
class ApplicationController {
    serialize(application) {
        return {
            id: application.id,
            candidateId: application.candidateId,
            jobId: application.jobId,
            status: application.status,
            score: application.score,
            compatibility: application.compatibility,
            createdAt: application.createdAt ? application.createdAt.toISOString() : null,
            updatedAt: application.updatedAt ? application.updatedAt.toISOString() : null,
        };
    }
    deserialize(row) {
        return {
            id: row.id,
            candidateId: row.candidate_id,
            jobId: row.job_id,
            status: row.status,
            score: row.score,
            compatibility: row.compatibility,
            createdAt: row.created_at ? new Date(row.created_at) : null,
            updatedAt: row.updated_at ? new Date(row.updated_at) : null,
        };
    }
    async getAllApplications() {
        const query = "SELECT * FROM applications";
        const { rows } = await db.query(query);
        return rows.map(this.deserialize);
    }
    async getApplicationById(id) {
        const query = "SELECT * FROM applications WHERE id = $1";
        const { rows } = await db.query(query, [id]);
        return rows.length > 0 ? this.deserialize(rows[0]) : null;
    }
    async createApplication(application) {
        const serializedApplication = this.serialize(application);
        const query = `
      INSERT INTO applications (id, candidate_id, job_id, status, score, compatibility, created_at) 
      VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *`;
        const result = await db.query(query, [
            serializedApplication.id,
            serializedApplication.candidateId,
            serializedApplication.jobId,
            serializedApplication.status,
            serializedApplication.score,
            serializedApplication.compatibility,
        ]);
        return result.rows[0];
    }
    async updateApplication(id, application) {
        const serializedApplication = this.serialize(application);
        const query = `
      UPDATE applications SET 
        candidate_id = COALESCE($1, candidate_id), 
        job_id = COALESCE($2, job_id), 
        status = COALESCE($3, status), 
        score = COALESCE($4, score), 
        compatibility = COALESCE($5, compatibility),
        updated_at = NOW()
      WHERE id = $6 RETURNING *`;
        const { rows } = await db.query(query, [
            serializedApplication.candidateId,
            serializedApplication.jobId,
            serializedApplication.status,
            serializedApplication.score,
            serializedApplication.compatibility,
            id,
        ]);
        return rows[0];
    }
    async deleteApplication(id) {
        const query = "DELETE FROM applications WHERE id = $1";
        await db.query(query, [id]);
    }
}
export const applicationController = new ApplicationController();
