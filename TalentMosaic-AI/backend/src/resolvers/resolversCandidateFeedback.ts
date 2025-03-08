import { candidateFeedbackController } from "../controllers/candidateFeedbackController";
const resolversCandidateFeedback = {
    Query: {
        getAllFeedbacks: async () => {
            return await candidateFeedbackController.getAllFeedbacks();
        },
        getFeedbackById: async (_: any, { id }: { id: string }) => {
            return await candidateFeedbackController.getFeedbackById(id);
        },
    },
    Mutation: {
        createFeedback: async (_: any, { input }: { input: any }) => {
            const newFeedback = await candidateFeedbackController.createFeedback(input);
            return newFeedback;
        },
        updateFeedback: async (_: any, { id, input }: { id: string, input: any }) => {
            const updatedFeedback = await candidateFeedbackController.updateFeedback(id, input);
            return updatedFeedback;
        },
        deleteFeedback: async (_: any, { id }: { id: string }) => {
            await candidateFeedbackController.deleteFeedback(id);
            return true;
        },
    },
};
export default resolversCandidateFeedback;
