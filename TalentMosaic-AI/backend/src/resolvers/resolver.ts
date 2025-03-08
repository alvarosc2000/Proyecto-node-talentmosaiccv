import resolversUser from "./resolverUser";
import resolversCandidate from "./resolverCandidate";
import resolversCompany from "./resolverCompany";
import resolversJob from "./resolverJob";
import resolversApplication from "./resolversApplication";
import resolversCandidateFeedback from "./resolversCandidateFeedback";
import resolversCandidateRanking from "./resolversCandidateRanking";

// Unificar todos los resolvers en un solo objeto
export const mergedResolvers = {
  Query: {
    ...resolversUser.Query,
    ...resolversCandidate.Query,
    ...resolversCompany.Query,
    ...resolversJob.Query,
    ...resolversApplication.Query,
    ...resolversCandidateFeedback.Query,
    ...resolversCandidateRanking.Query,
  },
  Mutation: {
    ...resolversUser.Mutation,
    ...resolversCandidate.Mutation,
    ...resolversCompany.Mutation,
    ...resolversJob.Mutation,
    ...resolversApplication.Mutation,
    ...resolversCandidateFeedback.Mutation,
    ...resolversCandidateRanking.Mutation,
  },
};
