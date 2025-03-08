import { companyController } from "../controllers/companyController"; // El controlador con las funciones CRUD
const resolversCompany = {
    Query: {
        getAllCompanies: async () => {
            return await companyController.getAllCompanies();
        },
        getCompany: async (_, { id }) => {
            return await companyController.getCompanyById(id);
        },
    },
    Mutation: {
        createCompany: async (_, { input }) => {
            const newUser = await companyController.createCompany(input);
            return newUser;
        },
        updateCompany: async (_, { id, input }) => {
            const updatedUser = await companyController.updateCompany(id, input);
            return updatedUser;
        },
        deleteCompany: async (_, { id }) => {
            await companyController.deleteCompany(id);
            return true;
        },
    },
};
export default resolversCompany;
