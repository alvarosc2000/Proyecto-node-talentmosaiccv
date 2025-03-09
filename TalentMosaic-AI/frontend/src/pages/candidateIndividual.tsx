import { useRouter } from 'next/router';

export default function CandidateDetail() {
  const router = useRouter();
  const { candidateId } = router.query;

  // Datos simulados del candidato seleccionado
  const candidate = {
    id: candidateId,
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan@example.com',
    experience: '5 años',
    score: 95,
    skills: ['React', 'Node.js', 'MongoDB'],
    explanation: 'Juan tiene una fuerte experiencia en React y Node.js, que son tecnologías clave para el rol. Su experiencia previa en MongoDB y desarrollo backend lo hacen un excelente candidato.',
    rankingReason: 'Fue clasificado en primer lugar debido a su experiencia directa en las tecnologías requeridas y su desempeño en proyectos similares.',
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-6">
      <div className="container mx-auto max-w-4xl bg-gray-800 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold text-indigo-400 text-center mb-6">Perfil de {candidate.firstName} {candidate.lastName} 📋</h1>

        <div className="mb-6">
          <p className="text-lg"><strong>Email:</strong> {candidate.email}</p>
          <p className="text-lg"><strong>Experiencia:</strong> {candidate.experience}</p>
          <p className="text-lg"><strong>Puntaje de compatibilidad:</strong> {candidate.score}/100</p>
          <p className="text-lg"><strong>Habilidades clave:</strong> {candidate.skills.join(', ')}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-indigo-400">📊 ¿Por qué fue clasificado así?</h2>
          <p className="text-gray-300 mt-2">{candidate.rankingReason}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-indigo-400">🤖 Explicación de la IA</h2>
          <p className="text-gray-300 mt-2">{candidate.explanation}</p>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.back()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            Volver a la lista de candidatos
          </button>
        </div>
      </div>
    </div>
  );
}
