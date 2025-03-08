import { jobController } from "../controllers/jobController"; // El controlador con las funciones CRUD
const resolversJob = {
    Query: {
        getAllJobs: async () => {
            return await jobController.getAllJobs();
        },
        getJobById: async (_: any, { id }: { id: string }) => {
            return await jobController.getJobById(id);
        },
    },
    Mutation: {
        createJob:async (_: any, { input }: { input: any }) => {
            const newJob = await jobController.createJob(input);
            return newJob;
        },
        updateJob: async (_: any, { id, input }: { id: string, input: any }) => {
            const updatedJob = await jobController.updateJob(id, input);
            return updatedJob;
        },
        deleteJob: async (_: any, { id }: { id: string }) => {
            await jobController.deleteJob(id);
            return true;
        },
    },
};
export default resolversJob;
