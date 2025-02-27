import { motion } from 'framer-motion';

interface CandidateCardProps {
  firstName: string;
  lastName: string;
  email: string;
}

export const CandidateCard = ({ firstName, lastName, email }: CandidateCardProps) => (
  <motion.div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
    <h3 className="text-xl font-semibold">{firstName} {lastName}</h3>
    <p className="text-gray-600">{email}</p>
  </motion.div>
);
