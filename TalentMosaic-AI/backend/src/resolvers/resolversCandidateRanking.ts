import { candidateRankingController } from "../controllers/candidateRankingController";
const resolversCandidateRanking = {
    Query: {
        getAllRankings: async () => {
            return await candidateRankingController.getAllRankings();
        },
        getRankingById: async (_: any, { id }: { id: string }) => {
            return await candidateRankingController.getRankingById(id);
        },
    },
    Mutation: {
        createRanking: async (_: any, { input }: { input: any }) => {
            const newRanking = await candidateRankingController.createRanking(input);
            return newRanking;
        },
        updateRanking: async (_: any, { id, input }: { id: string, input: any }) => {
            const updatedRanking = await candidateRankingController.updateRanking(id, input);
            return updatedRanking;
        },
        deleteRanking: async (_: any, { id }: { id: string }) => {
            await candidateRankingController.deleteRanking(id);
            return true;
        },
    },
};
export default resolversCandidateRanking;
