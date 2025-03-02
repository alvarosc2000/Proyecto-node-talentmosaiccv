import { userController } from "../../controllers/userController"; // Importamos el controlador de usuarios
const resolvers = {
    Query: {
        // Resolver para obtener un usuario por ID
        getUserById: async (_, { id }) => {
            const user = await userController.getUserById(id);
            return user;
        },
        // Resolver para obtener todos los usuarios
        getAllUsers: async () => {
            const users = await userController.getAllUsers();
            return users;
        }
    },
    Mutation: {
        // Resolver para crear un usuario
        createUser: async (_, { input }) => {
            const newUser = await userController.createUser(input);
            return {
                user: newUser,
                message: "User created successfully",
            };
        },
        // Resolver para actualizar un usuario
        updateUser: async (_, { input }) => {
            const updatedUser = await userController.updateUser(input.id, input);
            return updatedUser;
        },
        // Resolver para eliminar un usuario
        deleteUser: async (_, { id }) => {
            await userController.deleteUser(id);
            return true; // Retornamos true si la eliminación es exitosa
        },
    }
};
export default resolvers;
