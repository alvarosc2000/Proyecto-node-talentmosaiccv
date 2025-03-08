import { applicationController } from "../controllers/applicationController";
const resolversApplication = {
    Query: {
        getAllApplications: async () => {
            return await applicationController.getAllApplications();
        },
        getApplicationById: async (_, { id }) => {
            return await applicationController.getApplicationById(id);
        },
    },
    Mutation: {
        createApplication: async (_, { input }) => {
            const newApplication = await applicationController.createApplication(input);
            return newApplication;
        },
        updateApplication: async (_, { id, input }) => {
            const updatedApplication = await applicationController.updateApplication(id, input);
            return updatedApplication;
        },
        deleteApplication: async (_, { id }) => {
            await applicationController.deleteApplication(id);
            return true;
        },
    },
};
export default resolversApplication;
