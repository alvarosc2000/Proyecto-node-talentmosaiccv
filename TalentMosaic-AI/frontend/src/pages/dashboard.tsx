import { JobCard } from '@/components/JobCard';
import { CandidateCard } from '@/components/CandidateCard';

export default function Dashboard() {
  // Datos dummy; en una implementación real, se consultaría a la API GraphQL.
  const jobs = [
    { title: 'Software Engineer', company: 'TechCorp' },
    { title: 'Data Scientist', company: 'AI Labs' },
  ];
  const candidates = [
    { firstName: 'Juan', lastName: 'Pérez', email: 'juan@example.com' },
    { firstName: 'Ana', lastName: 'Gómez', email: 'ana@example.com' },
  ];

  return (
    <div className="p-8 container mx-auto bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold text-center mb-10">Dashboard</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, idx) => (
            <JobCard key={idx} title={job.title} company={job.company} />
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold text-center mb-4">Candidates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate, idx) => (
            <CandidateCard
              key={idx}
              firstName={candidate.firstName}
              lastName={candidate.lastName}
              email={candidate.email}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
