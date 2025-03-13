import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function CandidateDetail() {
  const router = useRouter();
  const { candidateId } = router.query;

  // Datos simulados del candidato seleccionado
  const candidate = {
    id: candidateId,
    firstName: "Juan",
    lastName: "Pérez",
    email: "juan@example.com",
    experience: "5 años",
    score: 95,
    skills: ["React", "Node.js", "MongoDB"],
    explanation: "Juan tiene una fuerte experiencia en React y Node.js, que son tecnologías clave para el rol.",
    rankingReason: "Fue clasificado en primer lugar debido a su experiencia directa en las tecnologías requeridas.",
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-6 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="container mx-auto max-w-4xl bg-gray-800 p-8 rounded-2xl shadow-2xl transform transition-all duration-500"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
      >
        <h1 className="text-4xl font-bold text-indigo-400 text-center mb-6">
          Perfil de {candidate.firstName} {candidate.lastName} 📋
        </h1>

        <div className="mb-6 space-y-4">
          <motion.p
            className="text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <strong>Email:</strong> {candidate.email}
          </motion.p>
          <motion.p
            className="text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <strong>Experiencia:</strong> {candidate.experience}
          </motion.p>
          <motion.p
            className="text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <strong>Puntaje de compatibilidad:</strong> {candidate.score}/100
          </motion.p>
          <motion.p
            className="text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <strong>Habilidades clave:</strong> {candidate.skills.join(", ")}
          </motion.p>
        </div>

        <div className="mb-6">
          <motion.h2
            className="text-2xl font-semibold text-indigo-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            📊 ¿Por qué fue clasificado así?
          </motion.h2>
          <motion.p
            className="text-gray-300 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {candidate.rankingReason}
          </motion.p>
        </div>

        <div>
          <motion.h2
            className="text-2xl font-semibold text-indigo-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            🤖 Explicación de la IA
          </motion.h2>
          <motion.p
            className="text-gray-300 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {candidate.explanation}
          </motion.p>
        </div>

        <div className="mt-8 text-center">
          <motion.button
            onClick={() => router.back()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Volver a la lista de candidatos
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
