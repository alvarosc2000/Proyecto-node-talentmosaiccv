import { candidateController } from "../controllers/candidateController";
const resolversCandidate = {
    Query: {
        getAllCandidates: async () => {
            return await candidateController.getAllCandidates();
        },
        getCandidateById: async (_: any, { id }: { id: string }) => {
            return await candidateController.getCandidateById(id);
        },
    },
    Mutation: {
        createCandidate:  async (_: any, { input }: { input: any }) => {
            const newCandidate = await candidateController.createCandidate(input);
            return newCandidate;
        },
        updateCandidate: async (_: any, { id, input }: { id: string, input: any }) => {
            const updatedCandidate = await candidateController.updateCandidate(id, input);
            return updatedCandidate;
        },
        deleteCandidate: async (_: any, { id }: { id: string }) => {
            await candidateController.deleteCandidate(id);
            return true;
        },
    },
};
export default resolversCandidate;
