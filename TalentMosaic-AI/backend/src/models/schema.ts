import { Application, statusEnum } from "./tables/applications";
import { CandidateRanking } from "./tables/candidate_rankings";
import { Candidate, sourceEnum } from "./tables/candidates ";
import { Company } from "./tables/company";
import { Job } from "./tables/jobs";
import { User, rolesEnum } from "./tables/users";
import { CandidateFeedback } from "./tables/candidate_feedback";
import { FeedbackLog } from "./tables/feedback_log";
import { AiTrainingData } from "./tables/ai_training_data";

export{
    Application,
    statusEnum,
    CandidateRanking,
    Candidate,
    sourceEnum,
    Company,
    Job,
    User,
    rolesEnum,
    CandidateFeedback,
    FeedbackLog,
    AiTrainingData
}