import { jobController } from "../controllers/jobController"; // El controlador con las funciones CRUD
const resolversJob = {
    Query: {
        getAllJobs: async () => {
            return await jobController.getAllJobs();
        },
        getJobById: async (_, { id }) => {
            return await jobController.getJobById(id);
        },
    },
    Mutation: {
        createJob: async (_, { input }) => {
            const newJob = await jobController.createJob(input);
            return newJob;
        },
        updateJob: async (_, { id, input }) => {
            const updatedJob = await jobController.updateJob(id, input);
            return updatedJob;
        },
        deleteJob: async (_, { id }) => {
            await jobController.deleteJob(id);
            return true;
        },
    },
};
export default resolversJob;
