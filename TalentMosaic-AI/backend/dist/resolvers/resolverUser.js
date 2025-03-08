import { userController } from "../controllers/userController"; // El controlador con las funciones CRUD
const resolversUser = {
    Query: {
        getAllUsers: async () => {
            const users = await userController.getAllUsers();
            console.log("Usuarios obtenidos:", users);
            return users;
        },
        getUserById: async (_, { id }) => {
            return await userController.getUserById(id);
        },
    },
    Mutation: {
        createUser: async (_, { input }) => {
            const newUser = await userController.createUser(input);
            return newUser;
        },
        updateUser: async (_, { id, input }) => {
            const updatedUser = await userController.updateUser(id, input);
            return updatedUser;
        },
        deleteUser: async (_, { id }) => {
            await userController.deleteUser(id);
            return true;
        },
    },
};
export default resolversUser;
