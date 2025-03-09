export function JobCard({ title, company, location }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition">
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-500">{company}</p>
      <p className="text-gray-400 text-sm">{location}</p>
    </div>
  );
}
