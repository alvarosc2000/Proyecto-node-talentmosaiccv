import { userController } from "../controllers/userController";
import { User } from "../models/schema"; // Ajusta la ruta según tu proyecto

const resolversUser = {
  Query: {
    // 🔹 Obtener todos los usuarios
    getAllUsers: async () => {
      try {
        const users = await userController.getAllUsers();
        console.log("Usuarios obtenidos:", users);
        return users;
      } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        throw new Error("No se pudieron obtener los usuarios.");
      }
    },

    // 🔹 Obtener usuario por ID
    getUserById: async (_: any, { id }: { id: string }) => {
      try {
        return await userController.getUserById(id);
      } catch (error) {
        console.error("Error obteniendo usuario por ID:", error);
        throw new Error("No se pudo obtener el usuario.");
      }
    },
  },

  Mutation: {
    // 🔹 Crear un nuevo usuario
    createUser: async (_: any, { input }: { input: any }) => {
      try {
        return await userController.createUser(input);
      } catch (error) {
        console.error("Error creando usuario:", error);
        throw new Error("No se pudo crear el usuario.");
      }
    },

    // 🔹 Actualizar un usuario existente
    updateUser: async (_: any, { id, input }: { id: string; input: any }) => {
      try {
        return await userController.updateUser(id, input);
      } catch (error) {
        console.error("Error actualizando usuario:", error);
        throw new Error("No se pudo actualizar el usuario.");
      }
    },

    // 🔹 Eliminar un usuario
    deleteUser: async (_: any, { id }: { id: string }): Promise<boolean> => {
      try {
        await userController.deleteUser(id);
        return true;
      } catch (error) {
        console.error("Error eliminando usuario:", error);
        throw new Error("No se pudo eliminar el usuario.");
      }
    },

    // 🔹 Registro de usuario
    register: async (_: any, { input }: { input: any }) => {
      try {
        return await userController.register(input);
      } catch (error) {
        console.error("Error en registro:", error);
        throw new Error( "No se pudo registrar el usuario.");
      }
    },

    // 🔹 Inicio de sesión
    login: async (_: any, { input }: { input: { email: string; password: string } }) => {
      try {
        const { email, password } = input;
        return await userController.login(email, password);
      } catch (error) {
        console.error("Error en login:", error);
        throw new Error("Credenciales incorrectas o usuario no encontrado.");
      }
    },
  },
};

export default resolversUser;
