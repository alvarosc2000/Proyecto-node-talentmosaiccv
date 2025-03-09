import { useState } from 'react';
import { useRouter } from 'next/router';
import { CandidateCard } from '@/components/CandidateCard';

export default function CandidatesPage() {
  const router = useRouter();
  const { jobId } = router.query; // Obtén el ID de la vacante seleccionada desde la URL

  // Datos simulados de vacante
  const jobDetails = {
    id: jobId,
    title: 'Software Engineer',
    company: 'TechCorp',
    location: 'Remoto',
    description: 'Buscamos un ingeniero de software con experiencia en React, Node.js y desarrollo backend.',
  };

  // Datos simulados de candidatos con su estado
  const [candidates, setCandidates] = useState([
    { id: 1, firstName: 'Juan', lastName: 'Pérez', email: 'juan@example.com', experience: '5 años', score: 95, skills: ['React', 'Node.js', 'MongoDB'], status: 'En proceso' },
    { id: 2, firstName: 'Ana', lastName: 'Gómez', email: 'ana@example.com', experience: '3 años', score: 89, skills: ['Python', 'Data Science', 'TensorFlow'], status: 'Contratada' },
    { id: 3, firstName: 'Carlos', lastName: 'López', email: 'carlos@example.com', experience: '7 años', score: 97, skills: ['UX/UI', 'Figma', 'Adobe XD'], status: 'No seleccionada' },
  ]);

  const [pdfFile, setPdfFile] = useState(null);

  const handleFileUpload = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleStatusChange = (id, newStatus) => {
    // Actualiza el estado del candidato con el nuevo valor
    setCandidates((prevCandidates) =>
      prevCandidates.map((candidate) =>
        candidate.id === id ? { ...candidate, status: newStatus } : candidate
      )
    );
  };

  // Función para obtener el color de estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'Contratada':
        return 'bg-green-500 text-white';
      case 'En proceso':
        return 'bg-blue-500 text-white';
      case 'No seleccionada':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-gray-900 text-white py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Detalles de la Vacante */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl mb-10">
          <h2 className="text-4xl font-bold text-center mb-4 text-indigo-400">{jobDetails.title} 🚀</h2>
          <p className="text-lg text-center mb-2"><strong>Empresa:</strong> {jobDetails.company}</p>
          <p className="text-lg text-center mb-4"><strong>Ubicación:</strong> {jobDetails.location}</p>
          <p className="text-lg text-center text-gray-300">{jobDetails.description}</p>
        </div>

        {/* Subir PDF */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl mb-10">
          <h3 className="text-2xl font-bold text-center mb-6">Sube tu CV 📄</h3>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500 bg-gray-700 border border-gray-600 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-white file:bg-indigo-500 hover:file:bg-indigo-600"
          />
          {pdfFile && (
            <p className="text-center mt-4 text-green-400">¡Archivo subido con éxito! ✅ {pdfFile.name}</p>
          )}
        </div>

        {/* Ranking de Candidatos */}
        <div>
          <h2 className="text-3xl font-semibold text-center mb-8 text-indigo-400">🏆 Ranking de Candidatos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {candidates
              .sort((a, b) => b.score - a.score) // Ordenar por puntaje
              .map((candidate, index) => (
                <div key={candidate.id} className="bg-gray-800 p-6 rounded-2xl shadow-2xl">
                  <CandidateCard
                    firstName={candidate.firstName}
                    lastName={candidate.lastName}
                    email={candidate.email}
                    experience={candidate.experience}
                    score={candidate.score}
                    rank={index + 1}
                    skills={candidate.skills}
                  />
                  {/* Desplegable para cambiar estado */}
                  <div className="mt-2">
                    <label className="block text-gray-300">Selecciona el estado:</label>
                    <select
                      value={candidate.status}
                      onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
                      className="w-full p-2 mt-1 bg-gray-700 text-white rounded-lg"
                    >
                      <option value="En proceso">En proceso</option>
                      <option value="Contratada">Contratada</option>
                      <option value="No seleccionada">No seleccionada</option>
                    </select>
                  </div>
                  {/* Estado con color dinámico */}
                  <p className={`mt-2 text-center py-1 px-4 rounded-full ${getStatusColor(candidate.status)}`}>
                    <strong>Estado: </strong>{candidate.status}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
