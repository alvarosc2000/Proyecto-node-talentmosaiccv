import db from "../config/db";
class CandidateController {
    serialize(candidate:any) {
        return {
            id: candidate.id,
            companyId: candidate.companyId,
            source: candidate.source,
            linkedinProfile: candidate.linkedinProfile,
            resume: candidate.resume,
            skills: candidate.skills,
            experience: candidate.experience,
            education: candidate.education,
            location: candidate.location,
            createdAt: candidate.createdAt ? candidate.createdAt.toISOString() : null,
            updatedAt: candidate.updatedAt ? candidate.updatedAt.toISOString() : null,
        };
    }
    deserialize(row:any) {
        return {
            id: row.id,
            companyId: row.company_id,
            source: row.source,
            linkedinProfile: row.linkedin_profile,
            resume: row.resume,
            skills: row.skills,
            experience: row.experience,
            education: row.education,
            location: row.location,
            createdAt: row.created_at ? new Date(row.created_at) : null,
            updatedAt: row.updated_at ? new Date(row.updated_at) : null,
        };
    }
    async getAllCandidates() {
        const query = "SELECT * FROM candidates";
        const { rows } = await db.query(query);
        return rows.map(this.deserialize);
    }
    async getCandidateById(id: any) {
        const query = "SELECT * FROM candidates WHERE id = $1";
        const { rows } = await db.query(query, [id]);
        return rows.length > 0 ? this.deserialize(rows[0]) : null;
    }
    async createCandidate(candidate: any) {
        const serializedCandidate = this.serialize(candidate);
        const query = `
      INSERT INTO candidates (id, company_id, source, linkedin_profile, resume, skills, experience, education, location, created_at) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()) RETURNING *`;
        const result = await db.query(query, [
            serializedCandidate.id,
            serializedCandidate.companyId,
            serializedCandidate.source,
            serializedCandidate.linkedinProfile,
            serializedCandidate.resume,
            serializedCandidate.skills,
            serializedCandidate.experience,
            serializedCandidate.education,
            serializedCandidate.location,
        ]);
        return result.rows[0];
    }
    async updateCandidate(id: any, candidate: any) {
        const serializedCandidate = this.serialize(candidate);
        const query = `
      UPDATE candidates SET 
        company_id = COALESCE($1, company_id), 
        source = COALESCE($2, source), 
        linkedin_profile = COALESCE($3, linkedin_profile), 
        resume = COALESCE($4, resume), 
        skills = COALESCE($5, skills), 
        experience = COALESCE($6, experience), 
        education = COALESCE($7, education), 
        location = COALESCE($8, location), 
        updated_at = NOW()
      WHERE id = $9 RETURNING *`;
        const { rows } = await db.query(query, [
            serializedCandidate.companyId,
            serializedCandidate.source,
            serializedCandidate.linkedinProfile,
            serializedCandidate.resume,
            serializedCandidate.skills,
            serializedCandidate.experience,
            serializedCandidate.education,
            serializedCandidate.location,
            id,
        ]);
        return rows[0];
    }
    async deleteCandidate(id: any) {
        const query = "DELETE FROM candidates WHERE id = $1";
        await db.query(query, [id]);
    }
}
export const candidateController = new CandidateController();
