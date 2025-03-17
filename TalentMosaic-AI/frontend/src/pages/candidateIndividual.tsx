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
      className="min-h-screen bg-gradient-to-bl from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-6 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="container mx-auto max-w-5xl bg-gray-800 p-12 rounded-3xl shadow-2xl border border-gray-700 transform transition-all duration-500"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
      >
        {/* 🔹 Header con animación */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-indigo-400">
            {candidate.firstName} {candidate.lastName} 📋
          </h1>
          <p className="text-gray-400 text-lg mt-2">Detalles completos del candidato</p>
        </motion.div>

        {/* 🔹 Información del Candidato */}
        <div className="mb-6 space-y-6">
          <motion.p className="text-lg"><strong>Email:</strong> {candidate.email}</motion.p>
          <motion.p className="text-lg"><strong>Experiencia:</strong> {candidate.experience}</motion.p>

          {/* 🔹 Nueva Barra de Compatibilidad */}
          <motion.div className="mt-4">
            <strong className="text-lg">Puntaje de compatibilidad:</strong>
            <div className="relative w-full bg-gray-700 h-8 rounded-full mt-2 overflow-hidden shadow-lg border-2 border-gray-600">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${candidate.score}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <p className="absolute top-0 left-1/2 transform -translate-x-1/2 text-white font-bold text-lg">
                {candidate.score}%
              </p>
            </div>
          </motion.div>

          {/* 🔹 Habilidades del Candidato */}
          <motion.div className="mt-4">
            <strong className="text-lg">Habilidades clave:</strong>
            <div className="flex flex-wrap gap-3 mt-2">
              {candidate.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-md font-medium shadow-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 🔹 Motivo del Ranking */}
        <motion.div className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-400">📊 ¿Por qué fue clasificado así?</h2>
          <p className="text-gray-300 mt-2 text-lg leading-relaxed">{candidate.rankingReason}</p>
        </motion.div>

        {/* 🔹 Explicación de la IA */}
        <motion.div className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-400">🤖 Explicación de la IA</h2>
          <p className="text-gray-300 mt-2 text-lg leading-relaxed">{candidate.explanation}</p>
        </motion.div>

        {/* 🔹 Botones de Acción */}
        <div className="mt-10 flex justify-center gap-6">
          <motion.button
            onClick={() => router.back()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔙 Volver a la lista
          </motion.button>

          <motion.button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ✅ Aprobar Candidato
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
