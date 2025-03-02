import  db  from "../config/db";
import { User } from "../models/schema";

// Clase para manejar operaciones de usuarios
class UserController {
  // 🔹 Serialización: Convierte un objeto de la aplicación a formato SQL
  private serialize(user: any) {
    return {
      id: user.id,
      companyId: user.companyId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: user.role,
      linkedInToken: user.linkedInToken,
      createdAt: user.createdAt ? user.createdAt.toISOString() : null,
      updatedAt: user.updatedAt ? user.updatedAt.toISOString() : null,
    };
  }

  // 🔹 Deserialización: Convierte una fila de la DB a objeto de la aplicación
  private deserialize(row: any) {
    return {
      id: row.id,  // Asegúrate de acceder directamente al valor de la columna
      companyId: row.company_id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      password: row.password,
      role: row.role,
      linkedInToken: row.linkedin_token,
      createdAt: row.created_at ? new Date(row.created_at) : null,
      updatedAt: row.updated_at ? new Date(row.updated_at) : null,
    };
  }

  // 🔹 Obtener todos los usuarios
  async getAllUsers() {
    const query = "SELECT * FROM users";
    const { rows } = await db.query(query);
    return rows.map(this.deserialize);  // Usamos deserialización para convertir filas
  }

  // 🔹 Obtener un usuario por ID
  async getUserById(id: string) {
    const query = "SELECT * FROM users WHERE id = $1";
    const { rows } = await db.query(query, [id]);
    return rows.length > 0 ? this.deserialize(rows[0]) : null;
  }

  // 🔹 Crear un nuevo usuario
  async createUser(user: any) {
    const serializedUser = this.serialize(user);
    const query = `INSERT INTO users (id, company_id, first_name, last_name, email, password, role, linkedin_token, created_at) 
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())`;
    const result = await db.query(query, [
      serializedUser.id,
      serializedUser.companyId,
      serializedUser.firstName,
      serializedUser.lastName,
      serializedUser.email,
      serializedUser.password,
      serializedUser.role,
      serializedUser.linkedInToken,
    ]);
    return result.rows[0];  // Devuelve el usuario recién creado
  }

  // 🔹 Actualizar un usuario
  async updateUser(id: string, user: any) {
    const serializedUser = this.serialize(user);
    const query = `UPDATE users SET 
                   company_id = COALESCE($1, company_id), 
                   first_name = COALESCE($2, first_name), 
                   last_name = COALESCE($3, last_name), 
                   email = COALESCE($4, email), 
                   password = COALESCE($5, password), 
                   role = COALESCE($6, role), 
                   linkedin_token = COALESCE($7, linkedin_token), 
                   updated_at = NOW() 
                   WHERE id = $8 RETURNING *`;
    const { rows } = await db.query(query, [
      serializedUser.companyId,
      serializedUser.firstName,
      serializedUser.lastName,
      serializedUser.email,
      serializedUser.password,
      serializedUser.role,
      serializedUser.linkedInToken,
      id,
    ]);
    return rows[0];  // Devuelve el usuario actualizado
  }

  // 🔹 Eliminar un usuario
  async deleteUser(id: string): Promise<void> {
    const query = "DELETE FROM users WHERE id = $1";
    await db.query(query, [id]);
  }
}

// Exportamos la instancia del controlador
export const userController = new UserController();
