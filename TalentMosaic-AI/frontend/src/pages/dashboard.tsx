import { useState } from 'react';
import { useRouter } from 'next/router';
import { JobCard } from '@/components/JobCard';
import { CandidateCard } from '@/components/CandidateCard';

export default function Dashboard() {
  const router = useRouter();

  const [jobs, setJobs] = useState([
    { id: 1, title: 'Software Engineer', company: 'TechCorp', location: 'Remoto', status: 'open', description: 'Buscamos un desarrollador con experiencia en React y Node.js.' },
    { id: 2, title: 'Data Scientist', company: 'AI Labs', location: 'San Francisco, CA', status: 'open', description: 'Experiencia en Machine Learning, Python y análisis de datos.' },
  ]);

  const [candidates] = useState([
    { id: 1, firstName: 'Juan', lastName: 'Pérez', email: 'juan@example.com', experience: '5 años', score: 95 },
    { id: 2, firstName: 'Ana', lastName: 'Gómez', email: 'ana@example.com', experience: '3 años', score: 89 },
    { id: 3, firstName: 'Carlos', lastName: 'López', email: 'carlos@example.com', experience: '7 años', score: 97 },
  ]);

  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    experience: '',
    education: '',
    salary: '',
    skills: '',
    description: '',
  });

  const handleAddJob = () => {
    const { title, company, location, description } = newJob;
    if (title && company && location && description) {
      setJobs([...jobs, { ...newJob, id: jobs.length + 1, status: 'open' }]);
      setNewJob({ title: '', company: '', location: '', experience: '', education: '', salary: '', skills: '', description: '' });
    }
  };

  const handleCloseJob = (id: number) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, status: 'closed' } : job));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-5xl font-extrabold text-center mb-12">📊 Dashboard</h1>

        {/* 🔹 Formulario para Añadir Vacantes */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full mb-10">
          <h2 className="text-2xl font-bold text-center mb-4">➕ Añadir Nueva Vacante</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Título del Puesto"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
              className="p-3 rounded-lg border bg-gray-700 text-white w-full"
            />
            <input
              type="text"
              placeholder="Empresa"
              value={newJob.company}
              onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
              className="p-3 rounded-lg border bg-gray-700 text-white w-full"
            />
            <input
              type="text"
              placeholder="Ubicación"
              value={newJob.location}
              onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
              className="p-3 rounded-lg border bg-gray-700 text-white w-full"
            />
            <input
              type="text"
              placeholder="Experiencia requerida"
              value={newJob.experience}
              onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
              className="p-3 rounded-lg border bg-gray-700 text-white w-full"
            />
            <input
              type="text"
              placeholder="Estudios"
              value={newJob.education}
              onChange={(e) => setNewJob({ ...newJob, education: e.target.value })}
              className="p-3 rounded-lg border bg-gray-700 text-white w-full"
            />
            <input
              type="text"
              placeholder="Salario"
              value={newJob.salary}
              onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
              className="p-3 rounded-lg border bg-gray-700 text-white w-full"
            />
            <input
              type="text"
              placeholder="Skills"
              value={newJob.skills}
              onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })}
              className="p-3 rounded-lg border bg-gray-700 text-white w-full"
            />
          </div>

          <textarea
            placeholder="Descripción y requisitos del candidato..."
            value={newJob.description}
            onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
            className="mt-4 p-3 rounded-lg border bg-gray-700 text-white w-full h-28"
          />
          <button
            onClick={handleAddJob}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full mt-4"
          >
            Agregar
          </button>
        </div>

        {/* 🔹 Lista de Vacantes Abiertas */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-6">📝 Vacantes Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.filter(job => job.status === 'open').map((job) => (
              <div 
                key={job.id} 
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition transform duration-300 cursor-pointer"
                onClick={() => router.push(`/candidates?jobId=${job.id}`)}
              >
                <JobCard
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  description={job.description} experience={''} educationRequired={''} skillsRequired={''}                />
                <p className="text-sm text-gray-400 mt-2">{job.description}</p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseJob(job.id);
                  }} 
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
                >
                  Cerrar Vacante
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Lista de Vacantes Cubiertas */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-6">✅ Vacantes Cubiertas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.filter(job => job.status === 'closed').map((job) => (
              <div key={job.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <JobCard title={job.title} company={job.company} location={job.location} description={''} experience={''} educationRequired={''} skillsRequired={''} />
                <p className="text-sm text-gray-400 mt-2">{job.description}</p>
                <p className="text-green-400 font-semibold mt-4">📌 Vacante cerrada</p>
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Ranking de Candidatos */}
        <div>
          <h2 className="text-3xl font-semibold text-center mb-6">🏆 Últimos candidatos analizados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates
              .sort((a, b) => b.score - a.score)
              .map((candidate, index) => (
                <div 
                  key={candidate.id} 
                  className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition transform duration-300 cursor-pointer"
                  onClick={() => router.push(`/candidateIndividual?id=${candidate.id}`)}
                >
                  <CandidateCard
                    firstName={candidate.firstName}
                    lastName={candidate.lastName}
                    email={candidate.email}
                    experience={candidate.experience}
                    score={candidate.score}
                    rank={index + 1}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
