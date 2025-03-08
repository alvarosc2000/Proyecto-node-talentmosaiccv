import { userController } from "../controllers/userController"; // El controlador con las funciones CRUD

const resolversUser = {
  Query: {
    getAllUsers: async () => {
      const users = await userController.getAllUsers();
      console.log("Usuarios obtenidos:", users);
      return users;
    },
    
    getUserById: async (_: any, { id }: { id: string }) => {
      return await userController.getUserById(id);
    },
  },
  Mutation: {
    createUser: async (_: any, { input }: { input: any }) => {
      const newUser = await userController.createUser(input);
      return newUser;
    },
    updateUser: async (_: any, { id, input }: { id: string, input: any }) => {
      const updatedUser = await userController.updateUser(id, input);
      return updatedUser;
    },
    deleteUser: async (_: any, { id }: { id: string }) => {
      await userController.deleteUser(id);
      return true;
    },
  },
};

export default resolversUser;
