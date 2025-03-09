import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminPanel() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Tech Corp",
      email: "tech@corp.com",
      vacancies: [
        { id: 1, title: "Desarrollador Backend", status: "Pendiente", location: "Madrid" },
        { id: 2, title: "Diseñador UX/UI", status: "Aprobada", location: "Barcelona" },
      ],
    },
    {
      id: 2,
      name: "Creative Agency",
      email: "contact@creative.com",
      vacancies: [
        { id: 3, title: "Community Manager", status: "Pendiente", location: "Valencia" },
      ],
    },
  ]);

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
  };

  const handleUpdateVacancyStatus = (companyId, vacancyId, status) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === companyId
          ? {
              ...company,
              vacancies: company.vacancies.map((vacancy) =>
                vacancy.id === vacancyId ? { ...vacancy, status } : vacancy
              ),
            }
          : company
      )
    );
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.3 } },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-900 to-gray-900 text-white py-12 px-6"
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Título de la página */}
        <motion.h2
          variants={titleVariants}
          className="text-4xl font-bold text-center mb-8 text-indigo-400"
        >
          Panel de Administración <span role="img" aria-label="admin">👨‍💻</span>
        </motion.h2>

        {/* Lista de Empresas */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-center mb-4 text-indigo-400">Empresas Registradas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.map((company) => (
              <motion.div
                key={company.id}
                className="bg-gray-800 p-6 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform cursor-pointer"
                onClick={() => handleSelectCompany(company)}
              >
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold">{company.name}</h3>
                  <p className="text-lg text-gray-300">{company.email}</p>
                  <p className="text-sm text-gray-400">Vacantes: {company.vacancies.length}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detalles de la empresa seleccionada */}
        {selectedCompany && (
          <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-semibold text-center mb-6 text-indigo-400">{selectedCompany.name}</h3>
            <h4 className="text-xl font-semibold text-center text-gray-300 mb-4">Vacantes</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {selectedCompany.vacancies.map((vacancy) => (
                <motion.div
                  key={vacancy.id}
                  className="bg-gray-700 p-6 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
                >
                  <div className="text-center mb-4">
                    <h5 className="text-xl font-bold text-indigo-400">{vacancy.title}</h5>
                    <p className="text-sm text-gray-300">Ubicación: {vacancy.location}</p>
                    <p className={`text-sm ${vacancy.status === 'Aprobada' ? 'text-green-500' : 'text-yellow-500'}`}>{vacancy.status}</p>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => handleUpdateVacancyStatus(selectedCompany.id, vacancy.id, 'Aprobada')}
                      className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all duration-200 mb-2"
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => handleUpdateVacancyStatus(selectedCompany.id, vacancy.id, 'Rechazada')}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-200"
                    >
                      Rechazar
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
