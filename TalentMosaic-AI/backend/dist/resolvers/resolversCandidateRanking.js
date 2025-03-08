import { candidateRankingController } from "../controllers/candidateRankingController";
const resolversCandidateRanking = {
    Query: {
        getAllRankings: async () => {
            return await candidateRankingController.getAllRankings();
        },
        getRankingById: async (_, { id }) => {
            return await candidateRankingController.getRankingById(id);
        },
    },
    Mutation: {
        createRanking: async (_, { input }) => {
            const newRanking = await candidateRankingController.createRanking(input);
            return newRanking;
        },
        updateRanking: async (_, { id, input }) => {
            const updatedRanking = await candidateRankingController.updateRanking(id, input);
            return updatedRanking;
        },
        deleteRanking: async (_, { id }) => {
            await candidateRankingController.deleteRanking(id);
            return true;
        },
    },
};
export default resolversCandidateRanking;
