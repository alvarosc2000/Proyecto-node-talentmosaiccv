import db from "../config/db";
import { PDFParser } from "../services/pdfParser";

class CandidateController {
    serialize(candidate: any) {
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

    deserialize(row: any) {
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

    async getCandidateById(id: string) {
        const query = "SELECT * FROM candidates WHERE id = $1";
        const { rows } = await db.query(query, [id]);
        return rows.length > 0 ? this.deserialize(rows[0]) : null;
    }

    async createCandidate(candidate: any) {
        const serializedCandidate = this.serialize(candidate);
        const query = `
            INSERT INTO candidates (company_id, source, linkedin_profile, resume, skills, experience, education, location, created_at) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) 
            RETURNING *`;
        const { rows } = await db.query(query, [
            serializedCandidate.companyId,
            serializedCandidate.source,
            serializedCandidate.linkedinProfile,
            serializedCandidate.resume,
            serializedCandidate.skills,
            serializedCandidate.experience,
            serializedCandidate.education,
            serializedCandidate.location,
        ]);
        return rows[0];
    }

    async updateCandidate(id: string, candidate: any) {
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
            WHERE id = $9 
            RETURNING *`;
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

    async deleteCandidate(id: string) {
        const query = "DELETE FROM candidates WHERE id = $1 RETURNING *";
        const { rows } = await db.query(query, [id]);
        return rows[0]; // Retorna el candidato eliminado
    }

    /** 📌 Proceso de CV sin almacenar el archivo **/
    async processCandidateCV(fileBuffer: Buffer) {
        try {
            // 📄 Extraer información del PDF con OpenAI
            const extractedData = await PDFParser.extractTextFromBuffer(fileBuffer);

            console.log("📌 Datos extraídos del CV:", extractedData);

            // ⛔ Validar datos mínimos antes de guardar
            if (!extractedData || !extractedData.skills || !extractedData.experience) {
                throw new Error("Datos extraídos incompletos");
            }

            // 📝 Crear el candidato en la BD
            const newCandidate = await db.query(
                `INSERT INTO candidates (company_id, source, linkedin_profile, resume, skills, experience, education, location, created_at)
                 VALUES (NULL, 'cv_upload', NULL, $1, $2, $3, $4, $5, NOW()) RETURNING *`,
                [
                    JSON.stringify(extractedData),
                    extractedData.skills.join(", "),
                    extractedData.experience,
                    extractedData.education,
                    extractedData.location ?? "No especificado",
                ]
            );

            console.log("✅ Candidato creado con éxito:", newCandidate.rows[0]);
            return newCandidate.rows[0];

        } catch (error) {
            console.error("❌ Error procesando el CV:", error);
            throw new Error("No se pudo procesar el CV");
        }
    }
}

export const candidateController = new CandidateController();
