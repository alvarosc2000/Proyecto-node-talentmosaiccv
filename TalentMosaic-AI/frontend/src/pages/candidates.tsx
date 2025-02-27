import { CandidateCard } from '@/components/CandidateCard';
import { candidates } from '@/utils/mockData';

export default function CandidatesPage() {
  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Candidates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            firstName={candidate.firstName}
            lastName={candidate.lastName}
            email={candidate.email}
          />
        ))}
      </div>
    </div>
  );
}