import db from "../config/db";

class JobController {
    // 🔹 Serialización: Convierte un objeto de la aplicación a formato SQL
    serialize(job: any) {
        return {
            id: job.id,
            companyId: job.companyId,
            jobTitle: job.jobTitle,
            description: job.description,
            location: job.location,
            experienceRequired: job.experienceRequired,
            skillsRequired: job.skillsRequired,
            educationRequired: job.educationRequired,
            salaryRange: job.salaryRange,
            createdAt: job.createdAt ? job.createdAt.toISOString() : null,
            updatedAt: job.updatedAt ? job.updatedAt.toISOString() : null,
        };
    }

    // 🔹 Deserialización: Convierte una fila de la DB a objeto de la aplicación
    deserialize(row: any) {
        return {
            id: row.id,
            companyId: row.company_id,
            jobTitle: row.job_title,
            description: row.description,
            location: row.location,
            experienceRequired: row.experience_required,
            skillsRequired: row.skills_required,
            educationRequired: row.education_required,
            salaryRange: row.salary_range,
            createdAt: row.created_at ? new Date(row.created_at) : null,
            updatedAt: row.updated_at ? new Date(row.updated_at) : null,
        };
    }

    // 🔹 Obtener todos los trabajos
    async getAllJobs() {
        const query = "SELECT * FROM jobs";
        const { rows } = await db.query(query);
        return rows.map(this.deserialize);
    }

    // 🔹 Obtener un trabajo por ID
    async getJobById(id: any) {
        const query = "SELECT * FROM jobs WHERE id = $1";
        const { rows } = await db.query(query, [id]);
        return rows.length > 0 ? this.deserialize(rows[0]) : null;
    }

    // 🔹 Crear un nuevo trabajo
    async createJob(job: any) {
        const serializedJob = this.serialize(job);
        const query = `
            INSERT INTO jobs (id, company_id, job_title, description, location, experience_required, skills_required, education_required, salary_range, created_at) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()) RETURNING *`;
        const { rows } = await db.query(query, [
            serializedJob.id,
            serializedJob.companyId,
            serializedJob.jobTitle,
            serializedJob.description,
            serializedJob.location,
            serializedJob.experienceRequired,
            serializedJob.skillsRequired,
            serializedJob.educationRequired,
            serializedJob.salaryRange,
        ]);
        return rows[0];
    }

    // 🔹 Actualizar un trabajo
    async updateJob(id: any, job: any) {
        const serializedJob = this.serialize(job);
        const query = `
            UPDATE jobs SET 
            company_id = COALESCE($1, company_id), 
            job_title = COALESCE($2, job_title), 
            description = COALESCE($3, description), 
            location = COALESCE($4, location), 
            experience_required = COALESCE($5, experience_required), 
            skills_required = COALESCE($6, skills_required), 
            education_required = COALESCE($7, education_required), 
            salary_range = COALESCE($8, salary_range), 
            updated_at = NOW() 
            WHERE id = $9 RETURNING *`;
        const { rows } = await db.query(query, [
            serializedJob.companyId,
            serializedJob.jobTitle,
            serializedJob.description,
            serializedJob.location,
            serializedJob.experienceRequired,
            serializedJob.skillsRequired,
            serializedJob.educationRequired,
            serializedJob.salaryRange,
            id,
        ]);
        return rows[0];
    }

    // 🔹 Eliminar un trabajo
    async deleteJob(id: any) {
        const query = "DELETE FROM jobs WHERE id = $1";
        await db.query(query, [id]);
    }

    // 🔹 Añadir descripción de trabajo
    async addJobDescription(jobDescription: any) {
        return await this.createJob(jobDescription);
    }
}

// Exportamos la instancia del controlador
export const jobController = new JobController();
