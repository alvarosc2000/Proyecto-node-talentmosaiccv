import { motion } from 'framer-motion';

interface JobCardProps {
  title: string;
  company: string;
}

export const JobCard = ({ title, company }: JobCardProps) => (
  <motion.div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-gray-600">{company}</p>
  </motion.div>
);
