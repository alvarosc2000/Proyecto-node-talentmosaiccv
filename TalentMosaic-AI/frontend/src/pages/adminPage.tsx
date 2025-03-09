import { useState } from 'react';

export default function AdminPage() {
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Software Engineer', company: 'TechCorp', location: 'Remoto', status: 'open' },
    { id: 2, title: 'Data Scientist', company: 'AI Labs', location: 'San Francisco, CA', status: 'closed' },
  ]);

  const [candidates, setCandidates] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', status: 'En revisión' },
    { id: 2, name: 'Ana Gómez', email: 'ana@example.com', status: 'Entrevista agendada' },
  ]);

  const handleDeleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const handleDeleteCandidate = (id) => {
    setCandidates(candidates.filter(candidate => candidate.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-5xl font-extrabold text-center mb-12">⚙️ Panel de Administración</h1>

        {/* Sección de Administración de Vacantes */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
          <h2 className="text-3xl font-bold text-center mb-6">📌 Administrar Vacantes</h2>
          {jobs.map((job) => (
            <div key={job.id} className="bg-gray-700 p-4 rounded-lg mb-4 flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{job.title} - {job.company}</p>
                <p className="text-gray-400">{job.location} | Estado: {job.status}</p>
              </div>
              <button 
                onClick={() => handleDeleteJob(job.id)} 
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        {/* Sección de Administración de Candidatos */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">👥 Administrar Candidatos</h2>
          {candidates.map((candidate) => (
            <div key={candidate.id} className="bg-gray-700 p-4 rounded-lg mb-4 flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{candidate.name}</p>
                <p className="text-gray-400">{candidate.email} | Estado: {candidate.status}</p>
              </div>
              <button 
                onClick={() => handleDeleteCandidate(candidate.id)} 
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
