import { candidateFeedbackController } from "../controllers/candidateFeedbackController";
const resolversCandidateFeedback = {
    Query: {
        getAllFeedbacks: async () => {
            return await candidateFeedbackController.getAllFeedbacks();
        },
        getFeedbackById: async (_, { id }) => {
            return await candidateFeedbackController.getFeedbackById(id);
        },
    },
    Mutation: {
        createFeedback: async (_, { input }) => {
            const newFeedback = await candidateFeedbackController.createFeedback(input);
            return newFeedback;
        },
        updateFeedback: async (_, { id, input }) => {
            const updatedFeedback = await candidateFeedbackController.updateFeedback(id, input);
            return updatedFeedback;
        },
        deleteFeedback: async (_, { id }) => {
            await candidateFeedbackController.deleteFeedback(id);
            return true;
        },
    },
};
export default resolversCandidateFeedback;
