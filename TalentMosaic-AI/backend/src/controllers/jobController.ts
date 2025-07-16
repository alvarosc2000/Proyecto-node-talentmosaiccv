import db from "../config/db";

class JobController {
    serialize(job: any) {
        return {
            userId: job.userId || null,
            jobTitle: job.jobTitle || null,
            companyName: job.companyName || null,
            description: job.description || null,
            location: job.location || null,
            experienceRequired: job.experienceRequired || null,
            skillsRequired: job.skillsRequired || null,
            educationRequired: job.educationRequired || null,
            salaryRange: job.salaryRange || null,
            status: job.status ||null,
        };
    }

    deserialize(row: any) {
        return {
            id: row.id,
            userId: row.user_id,
            jobTitle: row.job_title,
            companyName: row.company_name,
            description: row.description,
            location: row.location,
            experienceRequired: row.experience_required,
            skillsRequired: row.skills_required,
            educationRequired: row.education_required,
            salaryRange: row.salary_range,
            status: row.status,
            createdAt: row.created_at ? new Date(row.created_at) : null,
            updatedAt: row.updated_at ? new Date(row.updated_at) : null,
        };
    }

    async getAllJobs() {
        const query = "SELECT * FROM jobs";
        const { rows } = await db.query(query);
        return rows.map(this.deserialize);
    }

    async getJobById(id: any) {
        const query = "SELECT * FROM jobs WHERE id = $1";
        const { rows } = await db.query(query, [id]);
        return rows.length > 0 ? this.deserialize(rows[0]) : null;
    }

    async createJob(job: any) {
        const serializedJob = this.serialize(job);
        const query = `
            INSERT INTO jobs (user_id, job_title, company_name, description, location, experience_required, skills_required, education_required, salary_range,status, created_at) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()) 
            RETURNING *`;

        const { rows } = await db.query(query, [
            serializedJob.userId,
            serializedJob.jobTitle,
            serializedJob.companyName,
            serializedJob.description,
            serializedJob.location,
            serializedJob.experienceRequired,
            serializedJob.skillsRequired,
            serializedJob.educationRequired,
            serializedJob.salaryRange,
            serializedJob.status,
        ]);
        return this.deserialize(rows[0]);
    }


    async deleteJob(id: any) {
        const query = "DELETE FROM jobs WHERE id = $1";
        await db.query(query, [id]);
    }


    async closeJob(id: string) {
        const query = "UPDATE jobs SET status = false WHERE id = $1 RETURNING *";
        const { rows } = await db.query(query, [id]);
        return rows.map(this.deserialize);
    }
    
    async openJob(id: string) {
        const query = "UPDATE jobs SET status = true WHERE id = $1 RETURNING *";
        const { rows } = await db.query(query, [id]);
        return rows.map(this.deserialize);
    }
    


    async updateJob(id: string, job: any) {
        const fields: string[] = [];
        const values: any[] = [];
        let idx = 1;
      
        for (const [key, value] of Object.entries(job)) {
          if (value === null || value === undefined) continue;
      
          // Convertimos camelCase a snake_case
          const column = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
          fields.push(`${column} = $${idx}`);
          values.push(value);
          idx++;
        }
      
        if (fields.length === 0) {
          throw new Error("No se proporcionaron campos válidos para actualizar.");
        }
      
        // Actualizamos el campo updated_at también
        fields.push(`updated_at = NOW()`);
      
        const query = `UPDATE jobs SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
        values.push(id);
      
        const { rows } = await db.query(query, values);
      
        if (rows.length === 0) {
          throw new Error("Trabajo no encontrado o no actualizado.");
        }
      
        return this.deserialize(rows[0]);
      }
      
}

export const jobController = new JobController();
