import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  onClick: () => void;
  text: string;
}

export const AnimatedButton = ({ onClick, text }: AnimatedButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
  >
    {text}
  </motion.button>
);
