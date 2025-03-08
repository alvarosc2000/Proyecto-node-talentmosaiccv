import { applicationController } from "../controllers/applicationController";
const resolversApplication = {
    Query: {
        getAllApplications: async () => {
            return await applicationController.getAllApplications();
        },
        getApplicationById:  async (_: any, { id }: { id: string }) => {
            return await applicationController.getApplicationById(id);
        },
    },
    Mutation: {
        createApplication: async (_: any, { input }: { input: any }) => {
            const newApplication = await applicationController.createApplication(input);
            return newApplication;
        },
        updateApplication: async (_: any, { id, input }: { id: string, input: any }) => {
            const updatedApplication = await applicationController.updateApplication(id, input);
            return updatedApplication;
        },
        deleteApplication: async (_: any, { id }: { id: string }) => {
            await applicationController.deleteApplication(id);
            return true;
        },
    },
};
export default resolversApplication;
