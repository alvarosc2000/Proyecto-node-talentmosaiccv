import { companyController } from "../controllers/companyController"; // El controlador con las funciones CRUD
const resolversCompany = {
    Query: {
        getAllCompanies: async () => {
            return await companyController.getAllCompanies();
        },
        getCompany: async (_: any, { id }: { id: string }) => {
            return await companyController.getCompanyById(id);
        },
    },
    Mutation: {
        createCompany: async (_: any, { input }: { input: any }) => {
            const newUser = await companyController.createCompany(input);
            return newUser;
        },
        updateCompany: async (_: any, { id, input }: { id: string, input: any }) => {
            const updatedUser = await companyController.updateCompany(id, input);
            return updatedUser;
        },
        deleteCompany: async (_: any, { id }: { id: string }) => {
            await companyController.deleteCompany(id);
            return true;
        },
    },
};
export default resolversCompany;
