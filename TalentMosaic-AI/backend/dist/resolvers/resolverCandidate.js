import { candidateController } from "../controllers/candidateController";
const resolversCandidate = {
    Query: {
        getAllCandidates: async () => {
            return await candidateController.getAllCandidates();
        },
        getCandidateById: async (_, { id }) => {
            return await candidateController.getCandidateById(id);
        },
    },
    Mutation: {
        createCandidate: async (_, { input }) => {
            const newCandidate = await candidateController.createCandidate(input);
            return newCandidate;
        },
        updateCandidate: async (_, { id, input }) => {
            const updatedCandidate = await candidateController.updateCandidate(id, input);
            return updatedCandidate;
        },
        deleteCandidate: async (_, { id }) => {
            await candidateController.deleteCandidate(id);
            return true;
        },
    },
};
export default resolversCandidate;
