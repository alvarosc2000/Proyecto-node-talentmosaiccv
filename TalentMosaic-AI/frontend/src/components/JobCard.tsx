// Componente JobCard (por ejemplo, en 'JobCard.tsx')
interface JobCardProps {
  title: string;
  company: string;
  location: string; // Aquí añadimos la propiedad location
  description: string;
  experience: string; // Puedes ajustar las propiedades según tus necesidades
  educationRequired: string;
  skillsRequired: string;
}

export function JobCard({
  title,
  company,
  location,
  description,
  experience,
  educationRequired,
  skillsRequired,
}: JobCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition">
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-500">{company}</p>
      <p className="text-gray-400 text-sm">{description}</p>
      <p className="text-gray-400 text-sm">Ubicación: {location}</p> {/* Mostramos la ubicación */}
      <p className="text-gray-400 text-sm">Experiencia: {experience}</p>
      <p className="text-gray-400 text-sm">Educación: {educationRequired}</p>
      <p className="text-gray-400 text-sm">Habilidades: {skillsRequired}</p>
    </div>
  );
}
