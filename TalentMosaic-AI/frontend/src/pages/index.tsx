import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.3 } },
  };

  const plans = [
    {
      name: 'Básico',
      limit: '50 CVs/mes',
      features: 'No ranking IA',
      monthlyPrice: '$49/mes',
      annualPrice: '$499/año',
      emoji: '📄',
      description: 'Plan ideal para quienes necesitan un servicio básico y limitados CVs mensuales.',
    },
    {
      name: 'Pro',
      limit: '500 CVs/mes',
      features: 'IA + Ajustes',
      monthlyPrice: '$99/mes',
      annualPrice: '$999/año',
      emoji: '🚀',
      description: 'Plan avanzado con inteligencia artificial y ajustes personalizados para tu perfil.',
    },
    {
      name: 'Enterprise',
      limit: 'Ilimitado',
      features: 'IA Avanzada + Soporte',
      monthlyPrice: '$499/mes',
      annualPrice: '$4999/año',
      emoji: '🏢',
      description: 'Plan ideal para empresas con un alto volumen de CVs, IA avanzada y soporte dedicado.',
    },
  ];

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 text-white"
      initial="hidden"
      animate="visible"
    >
      {/* Encabezado */}
      <section className="text-center px-6 py-20">
        <motion.h1 variants={titleVariants} className="text-5xl font-bold">
          TalentMosaic AI
        </motion.h1>
        <motion.p variants={subtitleVariants} className="text-lg mt-4 max-w-lg mx-auto">
          Encuentra el candidato ideal con IA avanzada. Contrata sin sesgos y con eficiencia.
        </motion.p>

        <Link href="/login">
          <motion.button
            className="mt-6 px-6 py-3 border border-white text-white text-lg font-semibold rounded-full hover:bg-white hover:text-indigo-800 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start now
          </motion.button>
        </Link>
      </section>

      {/* Planes de Suscripción */}
      <section className="w-full py-20 bg-gradient-to-r from-indigo-700 to-purple-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            variants={titleVariants}
            className="text-4xl font-bold mb-16 text-indigo-400"
          >
            Planes de Suscripción <span role="img" aria-label="rocket">🚀</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
                style={{ cursor: 'pointer' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Emoji y Título del Plan */}
                <div className="text-center mb-4">
                  <span className="text-6xl">{plan.emoji}</span>
                  <h3 className="text-2xl font-bold mt-2">{plan.name}</h3>
                </div>

                {/* Descripción del Plan */}
                <p className="text-center text-gray-300 mb-4">{plan.description}</p>

                {/* Detalles del Plan */}
                <ul className="text-center mb-4">
                  <li><strong>Límite:</strong> {plan.limit}</li>
                  <li><strong>Funciones:</strong> {plan.features}</li>
                </ul>

                {/* Precios Mensual y Anual */}
                <div className="text-center mb-4">
                  <p className="text-4xl font-bold text-indigo-500">{plan.monthlyPrice}</p>
                  <p className="text-sm text-gray-400 line-through">{plan.annualPrice}</p>
                  <p className="text-sm text-green-400">Ahorras un {Math.round(((parseFloat(plan.monthlyPrice.slice(1)) * 12 - parseFloat(plan.annualPrice.slice(1))) / (parseFloat(plan.monthlyPrice.slice(1)) * 12)) * 100)}% con el pago anual</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Características Destacadas */}
      <section className="bg-white w-full py-16 text-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Características Destacadas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[{ 
              title: "Automatización", 
              icon: "⚙️", 
              desc: "Procesos sin esfuerzo con IA avanzada. Ahorra tiempo y elimina tareas repetitivas.", 
              details: "Nuestra inteligencia artificial automatiza tareas como la clasificación y el prefiltrado de currículos, permitiéndote centrarte en lo que realmente importa." 
            },
            { 
              title: "Precisión en Selección", 
              icon: "🤖", 
              desc: "Filtrado inteligente según experiencia. Encuentra candidatos más cualificados rápidamente.", 
              details: "Gracias a nuestra IA, los candidatos son evaluados de manera justa y precisa, alineándose con las necesidades específicas de tu empresa." 
            },
            { 
              title: "Búsqueda Avanzada", 
              icon: "🔍", 
              desc: "Encuentra talentos con los mejores filtros. Personaliza las búsquedas según tu estrategia.", 
              details: "Nuestra plataforma ofrece filtros avanzados para que encuentres a los mejores candidatos según habilidades, experiencia, ubicación y más." 
            },
            { 
              title: "Reducción de Sesgos", 
              icon: "🚫", 
              desc: "Elimina sesgos en el proceso de selección para una contratación más inclusiva.", 
              details: "TalentMosaic AI minimiza el impacto de prejuicios inconscientes, promoviendo la diversidad y la equidad en tu proceso de selección." 
            },
            { 
              title: "Análisis Predictivo", 
              icon: "📊", 
              desc: "Obtén insights y predicciones sobre el desempeño de los candidatos.", 
              details: "Utilizamos análisis avanzados para ayudarte a predecir el desempeño y la retención de los candidatos basándonos en datos históricos." 
            },
            { 
              title: "Integraciones Sencillas", 
              icon: "🔗", 
              desc: "Conecta tu plataforma de contratación favorita con facilidad.", 
              details: "Integra TalentMosaic AI con tus sistemas actuales y mejora la experiencia de reclutamiento sin cambiar tu flujo de trabajo." 
            }]
              .map((feature, idx) => (
                <div key={idx} className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition-all">
                  <div className="text-5xl">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
                  <p className="text-gray-600 mt-2">{feature.desc}</p>
                  <p className="text-gray-500 mt-2 text-sm">{feature.details}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Impacto */}
      <section className="w-full py-16 bg-gradient-to-r from-indigo-700 to-purple-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">El Impacto de TalentMosaic AI</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{ stat: "25%", desc: "Menos tiempo de contratación" },
              { stat: "95%", desc: "Precisión en recomendaciones" },
              { stat: "50%", desc: "Reducción de sesgos" }].map((impact, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-5xl font-bold text-yellow-300">{impact.stat}</p>
                  <p className="text-lg">{impact.desc}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-300 py-6">
        © 2025 TalentMosaic AI. Todos los derechos reservados.
      </footer>
    </motion.div>
  );
}
