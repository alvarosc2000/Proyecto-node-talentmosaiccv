import { JobCard } from '@/components/JobCard';
import { jobs } from '@/utils/mockData';

export default function JobsPage() {
  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} title={job.title} company={job.company} />
        ))}
      </div>
    </div>
  );
}