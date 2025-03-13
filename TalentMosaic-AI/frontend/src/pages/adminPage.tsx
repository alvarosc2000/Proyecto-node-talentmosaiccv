import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminPage() {
  const [jobs, setJobs] = useState([
    { id: 1, title: "Software Engineer", company: "TechCorp", location: "Remoto", status: "open" },
    { id: 2, title: "Data Scientist", company: "AI Labs", location: "San Francisco, CA", status: "closed" },
  ]);

  const [candidates, setCandidates] = useState([
    { id: 1, name: "Juan Pérez", email: "juan@example.com", status: "En revisión" },
    { id: 2, name: "Ana Gómez", email: "ana@example.com", status: "Entrevista agendada" },
  ]);

  const handleDeleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const handleDeleteCandidate = (id) => {
    setCandidates(candidates.filter((candidate) => candidate.id !== id));
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-5xl font-extrabold text-center mb-12">⚙️ Panel de Administración</h1>

        {/* Sección de Administración de Vacantes */}
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg mb-10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-6">📌 Administrar Vacantes</h2>
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              className="bg-gray-700 p-4 rounded-lg mb-4 flex justify-between items-center hover:scale-105 transition duration-300"
            >
              <div>
                <p className="text-lg font-semibold">
                  {job.title} - {job.company}
                </p>
                <p className="text-gray-400">
                  {job.location} | Estado: {job.status}
                </p>
              </div>
              <motion.button
                onClick={() => handleDeleteJob(job.id)}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Eliminar
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Sección de Administración de Candidatos */}
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-6">👥 Administrar Candidatos</h2>
          {candidates.map((candidate) => (
            <motion.div
              key={candidate.id}
              className="bg-gray-700 p-4 rounded-lg mb-4 flex justify-between items-center hover:scale-105 transition duration-300"
            >
              <div>
                <p className="text-lg font-semibold">{candidate.name}</p>
                <p className="text-gray-400">
                  {candidate.email} | Estado: {candidate.status}
                </p>
              </div>
              <motion.button
                onClick={() => handleDeleteCandidate(candidate.id)}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Eliminar
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
