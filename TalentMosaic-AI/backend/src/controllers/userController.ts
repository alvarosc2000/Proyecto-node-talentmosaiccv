import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from "../config/db";  // Asegúrate de que db esté correctamente configurado
import { User } from "../models/schema"; // Asegúrate de que esta ruta sea correcta
import dotenv from 'dotenv';
import { SignOptions } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';


dotenv.config();

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
      id: row.id,
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

  // 🔹 Obtener un usuario por correo electrónico
  async getUserByEmail(email: string) {
    const query = "SELECT * FROM users WHERE email = $1";
    const { rows } = await db.query(query, [email]);
    return rows.length > 0 ? this.deserialize(rows[0]) : null;
  }

  // 🔹 Crear un nuevo usuario
  async createUser(user: any) {
      try {
          console.log("📌 Insertando usuario en la base de datos:", user);
          
          const query = `INSERT INTO users (id, first_name, last_name, email, password, role, created_at) 
                        VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *`;

          const { rows } = await db.query(query, [
              user.id,
              user.firstName,
              user.lastName,
              user.email,
              user.password,
              user.role,
          ]);

          // Asegúrate de que se retorne correctamente el usuario
          if (rows.length === 0) {
              throw new Error("No se pudo crear el usuario en la base de datos.");
          }

          const createdUser = rows[0];  // Esto debería dar el primer (y único) resultado de la inserción
          console.log("✅ Usuario insertado en la base de datos:", createdUser);

          return createdUser;
      } catch (error) {
          console.error("❌ Error en createUser():", error);
          throw error;
      }
  }

  // 🔹 Actualizar un usuario
  async updateUser(id: string, user: any) {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;
  
    for (const [key, value] of Object.entries(user)) {
      if (value === null || value === undefined) continue;
  
      // Convertir camelCase a snake_case
      const column = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      fields.push(`${column} = $${idx}`);
      values.push(value);
      idx++;
    }
  
    if (fields.length === 0) {
      throw new Error("No se proporcionaron campos válidos para actualizar.");
    }
  
    // Siempre actualizar el campo updated_at
    fields.push(`updated_at = NOW()`);
  
    // Añadir la cláusula WHERE con el ID
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
    values.push(id);
  
    const { rows } = await db.query(query, values);
    
    if (rows.length === 0) {
      throw new Error("Usuario no encontrado o no actualizado.");
    }
  
    // ✅ Retornar los campos correctamente deserializados
    return this.deserialize(rows[0]);
  }
  

  // 🔹 Eliminar un usuario
  async deleteUser(id: string): Promise<void> {
    const query = "DELETE FROM users WHERE id = $1";
    await db.query(query, [id]);
  }

  // 🔹 Registrar un nuevo usuario
  async register(user: any) {
    try {
        console.log("📌 Intentando registrar usuario:", user);

        const existingUser = await this.getUserByEmail(user.email);
        if (existingUser) {
            throw new Error('❌ El correo electrónico ya está registrado');
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        console.log("🔑 Contraseña cifrada:", hashedPassword);

        const newUser = {
            id: uuidv4(),
            ...user,
            password: hashedPassword,
        };

        console.log("📌 Creando usuario en la base de datos:", newUser);

        const createdUser = await this.createUser(newUser);
        console.log("✅ Usuario creado con éxito:", createdUser);

        return createdUser;
    } catch (error) {
        console.error("❌ Error en register():", error);
        throw error;
    }
}



  // 🔹 Iniciar sesión de un usuario
    async login(email: string, password: string) {
      console.log("Intentando iniciar sesión con email:", email);

      // Verificar si el usuario existe
      const user = await this.getUserByEmail(email);
      if (!user) {
          console.error("❌ Usuario no encontrado en la base de datos");
          throw new Error('Usuario no encontrado');
      }

      console.log("✅ Usuario encontrado:", user);

      // Verificar la contraseña
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log("Resultado de la comparación de contraseña:", isPasswordValid);

      if (!isPasswordValid) {
          console.error("❌ Contraseña incorrecta");
          throw new Error('Contraseña incorrecta');
      }

      console.log("✅ Contraseña correcta, generando token...");

      // Crear un JWT para el usuario
      const token = this.generateAuthToken(user);
      console.log("✅ Token generado:", token);

      return { user, token };
  }


  // 🔹 Generar un token de autenticación (JWT)
  private generateAuthToken(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  
    const secretKey: string = process.env.SECRET_KEY || 'default-secret-key'; // Si no se encuentra, usar un valor por defecto
  
    // Definir explícitamente las opciones con el tipo `SignOptions`
    const options: SignOptions = {
      expiresIn: '1h', // Esto debería ser reconocido correctamente
    };
  
    // La firma del JWT
    return jwt.sign(payload, secretKey, options);
  }
}

// Exportamos la instancia del controlador
export const userController = new UserController();
