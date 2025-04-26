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
        createCompany: async (_: any, { input }: { input: any }, context: any) => {
            // Asegúrate de que el usuario esté autenticado
            if (!context.user) {
                throw new Error('Usuario no autenticado');
            }
        
            const { userId } = context.user;  // Asumiendo que el `userId` está en el contexto
        
            // Agregar `userId` al `input`
            const newCompany = await companyController.createCompany({
                ...input,     // Spread del resto de la información del input (name, industry, size, etc.)
                userId,       // Agregar el `userId` desde el contexto
            });
        
            return newCompany;
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
