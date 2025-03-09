export function CandidateCard({ firstName, lastName, email, experience, score, rank }) {
  const getMedal = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '🏅';
  };

  return (
    <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-lg transform hover:scale-105 transition flex flex-col items-center">
      <h3 className="text-2xl font-bold flex items-center">
        {getMedal(rank)} {firstName} {lastName}
      </h3>
      <p className="text-gray-500">{email}</p>
      <p className="text-blue-600 font-medium mt-2">🛠 Experiencia: {experience}</p>
      <p className="text-green-600 font-bold text-lg">⭐ Score: {score}</p>
    </div>
  );
}
