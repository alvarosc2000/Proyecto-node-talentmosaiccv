import db from "../config/db";
class CompanyController {
    serialize(company) {
        return {
            id: company.id,
            name: company.name,
            industry: company.industry,
            size: company.size,
            createdAt: company.createdAt,
            updatedAt: company.updatedAt
        };
    }
    deserialize(row) {
        return {
            id: row.id,
            name: row.name,
            industry: row.industry,
            size: row.size,
            createdAt: row.created_at,
            updatedAt: row.updated_at
        };
    }
    async getAllCompanies() {
        const query = "SELECT * FROM COMPANIES";
        const { rows } = await db.query(query);
        return rows.map(this.deserialize);
    }
    async getCompanyById(id) {
        const query = "SELECT * FROM COMPANIES WHERE id = $1";
        const { rows } = await db.query(query, [id]);
        return rows.length > 0 ? this.deserialize(rows[0]) : null;
    }
    async createCompany(company) {
        const serializedCompany = this.serialize(company);
        const query = `INSERT INTO companies (id, name, industry, size, created_at)
                       VALUES ($1, $2, $3, $4, NOW())`;
        const result = await db.query(query, [
            serializedCompany.id,
            serializedCompany.name,
            serializedCompany.industry,
            serializedCompany.size,
        ]);
        return result.rows[0];
    }
    async deleteCompany(id) {
        const query = "DELETE FROM companies WHERE id = $1";
        await db.query(query, [id]);
    }
    async updateCompany(id, company) {
        const serializedCompany = this.serialize(company);
        const query = ` UPDATE companies SET
                        name = COALESCE($1, name),
                        industry = COALESCE($2, industry)
                        size = COALESCE($3, size)
                        updated_at = NOW(),
                        WHERE id = $4 RETURNING *`;
        const { rows } = await db.query(query, [
            serializedCompany.name,
            serializedCompany.industry,
            serializedCompany.size,
            id,
        ]);
        return rows[0];
    }
}
export const companyController = new CompanyController();
