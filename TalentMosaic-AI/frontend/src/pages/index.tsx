import { motion } from 'framer-motion';

export default function Home() {
  // Variantes para animaciones
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-800 via-purple-800 to-cyan-700 text-white"
      initial="hidden"
      animate="visible"
    >
      {/* Fondo con imagen futurista */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1515361570135-8e8a64d67099?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjQ1OXwwfDF8c2VhcmNofDIyfHx3ZWJfY2FtcGVyYSUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNjg4MDA1MzI5&ixlib=rb-1.2.1&q=80&w=1080')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 text-center px-6 md:px-12 py-16">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 text-shadow-lg"
          variants={titleVariants}
        >
          Encuentra al Candidato Ideal
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 text-shadow-lg"
          variants={subtitleVariants}
        >
          Con TalentMosaic AI, elimina sesgos y optimiza tu proceso de contratación.
        </motion.p>

        {/* Botón de llamado a la acción */}
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="bg-blue-500 py-3 px-6 rounded-full shadow-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105"
        >
          Descubre Más
        </motion.button>
      </div>

      {/* Sección de Características sin animación de recarga */}
      <section className="py-12 w-full">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Características de TalentMosaic AI</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
              <div className="mb-4 text-blue-800">
                <i className="fas fa-cogs text-3xl"></i> {/* Ícono de engranaje */}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Optimización del Proceso</h3>
              <p className="text-black text-sm md:text-base">
                Automáticamente revisa, filtra y clasifica a los mejores candidatos, eliminando cualquier sesgo.
              </p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
              <div className="mb-4 text-blue-800">
                <i className="fas fa-robot text-3xl"></i> {/* Ícono de robot */}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Inteligencia Artificial</h3>
              <p className="text-black text-sm md:text-base">
                Nuestra IA aprende de cada interacción para mejorar constantemente la calidad de las recomendaciones.
              </p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
              <div className="mb-4 text-blue-800">
                <i className="fas fa-search-plus text-3xl"></i> {/* Ícono de lupa avanzada */}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Búsqueda Avanzada</h3>
              <p className="text-black text-sm md:text-base">
                Filtra candidatos por habilidades, experiencia y ubicación para encontrar el talento perfecto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Estadísticas sin fondo */}
      <section className="py-12 w-full">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Impacto de TalentMosaic AI</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-xl font-semibold">
              <p className="text-4xl">25%</p>
              <p className="text-lg">Reducción en el tiempo de contratación</p>
            </div>
            <div className="text-xl font-semibold">
              <p className="text-4xl">95%</p>
              <p className="text-lg">Precisión en la recomendación de candidatos</p>
            </div>
            <div className="text-xl font-semibold">
              <p className="text-4xl">50%</p>
              <p className="text-lg">Menos sesgos en el proceso de selección</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pie de página */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-sm text-gray-200 z-10">
        <p>© 2025 TalentMosaic AI</p>
      </div>
    </motion.div>
  );
}
