import db from "../config/db";
import { v4 as uuidv4 } from 'uuid';

class CompanyController {
    // Serializa el objeto company
    serialize(company: any) {
        return {
            id: company.id,
            userId: company.userId,
            name: company.name,
            industry: company.industry,
            size: company.size,
            createdAt: company.createdAt,
            updatedAt: company.updatedAt
        };
    }

    // Deserializa la fila de la base de datos
    deserialize(row: any) {
        return {
            id: row.id,
            userId: row.user_id,
            name: row.name,
            industry: row.industry,
            size: row.size,
            createdAt: row.created_at,
            updatedAt: row.updated_at
        };
    }

    // Obtener todas las compañías
    async getAllCompanies() {
        const query = "SELECT * FROM companies";
        const { rows } = await db.query(query);
        return rows.map(this.deserialize);
    }

    // Obtener una compañía por ID
    async getCompanyById(userId: any) {
        const query = "SELECT * FROM companies WHERE user_id = $1";
        const { rows } = await db.query(query, [userId]);
        return rows.map(row => this.deserialize(row));
    }

    // Crear una nueva compañía
    async createCompany(company: any) {
        const serializedCompany = this.serialize(company);
        const query = `
            INSERT INTO companies (id, user_id, name, industry, size, created_at)
            VALUES ($1, $2, $3, $4, $5, NOW())
            RETURNING *`;
        
        const result = await db.query(query, [
            uuidv4(), // Genera el UUID aquí
            serializedCompany.userId,
            serializedCompany.name,
            serializedCompany.industry,
            serializedCompany.size,
        ]);
        
        return this.deserialize(result.rows[0]);
    }
    
    
    
    // Eliminar una compañía
    async deleteCompany(id: any) {
        const query = "DELETE FROM companies WHERE id = $1";
        await db.query(query, [id]);
    }

    // Actualizar una compañía
    async updateCompany(id: any, company: any) {
        const fields: string[] = [];
        const values: any[] = [];
        let idx = 1;

        for (const [key, value] of Object.entries(company)) {
            if (value === null || value === undefined) continue;

            // Convertir de camelCase a snake_case
            const column = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
            fields.push(`${column} = $${idx}`);
            values.push(value);
            idx++;
        }

        if (fields.length === 0) {
            throw new Error("No se proporcionaron campos válidos para actualizar.");
        }

        fields.push(`updated_at = NOW()`); // Actualiza el campo updated_at
        const query = `UPDATE companies SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
        values.push(id);

        const { rows } = await db.query(query, values);
        return rows.length > 0 ? this.deserialize(rows[0]) : null; // Retornar el resultado deserializado
    }
}

export const companyController = new CompanyController();
