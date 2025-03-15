import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import CookieConsent from "../components/CookieConsent";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const plans = [
    {
      name: "Básico",
      limit: "50 CVs/mes",
      features: "No ranking IA",
      monthlyPrice: "$49/mes",
      annualPrice: "$499/año",
      emoji: "📄",
      description: "Plan ideal para quienes necesitan un servicio básico y limitados CVs mensuales.",
    },
    {
      name: "Pro ⭐",
      limit: "500 CVs/mes",
      features: "IA + Ajustes",
      monthlyPrice: "$99/mes",
      annualPrice: "$999/año",
      emoji: "🚀",
      description: "Plan avanzado con inteligencia artificial y ajustes personalizados para tu perfil.",
    },
    {
      name: "Enterprise",
      limit: "Ilimitado",
      features: "IA Avanzada + Soporte",
      monthlyPrice: "$499/mes",
      annualPrice: "$4999/año",
      emoji: "🏢",
      description: "Plan ideal para empresas con un alto volumen de CVs, IA avanzada y soporte dedicado.",
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* 🔹 Pantalla de Inicio Ampliada */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-8xl font-extrabold tracking-wide"
        >
          TalentMosaic AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl mt-6 max-w-xl text-gray-300"
        >
          Encuentra al candidato ideal con inteligencia artificial. Sin sesgos. Sin complicaciones.
        </motion.p>
        <motion.div
          className="absolute bottom-12 text-gray-400 animate-bounce"
          animate={{ opacity: scrollY < 50 ? 1 : 0 }}
        >
          Desliza para descubrir más ↓
        </motion.div>

        {/* Botón de "Probar Ahora" colocado en la parte superior */}
        <Link href="/login">
          <button className="mt-8 px-8 py-4 bg-blue-800 rounded-full text-lg font-semibold hover:bg-blue-900 transition">
            Probar Ahora
          </button>
        </Link>
      </section>

      {/* 🔹 Sección: ¿Qué hace TalentMosaic AI? */}
      <section className="py-20 px-6 bg-gradient-to-b from-blue-900 to-gray-800">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">🚀 ¿Qué hace TalentMosaic AI?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[{
            title: "🔍 Análisis Inteligente",
            desc: "Nuestra IA analiza CVs y perfiles de LinkedIn para encontrar la mejor coincidencia.",
          }, {
            title: "🤖 Eliminación de Sesgos",
            desc: "Nos enfocamos en habilidades y experiencia, reduciendo discriminación involuntaria.",
          }, {
            title: "📊 Dashboard Interactivo",
            desc: "Interfaz intuitiva para gestionar procesos de selección con datos en tiempo real.",
          }, {
            title: "🔒 Seguridad Avanzada",
            desc: "Toda la información está encriptada y cumpliendo con regulaciones como GDPR.",
          }, {
            title: "📈 Análisis Predictivo",
            desc: "La IA predice el rendimiento de los candidatos con base en datos históricos.",
          }, {
            title: "🌐 Integración Global",
            desc: "TalentMosaic AI es compatible con plataformas globales y fácil de integrar.",
          }].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-6 rounded-xl shadow-lg text-center"
            >
              <h3 className="text-2xl font-bold">{feature.title}</h3>
              <p className="text-gray-300 mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔹 Sección: Beneficios de usar TalentMosaic AI */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-900 to-gray-800">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">📊 Beneficios de usar TalentMosaic AI</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[{
            title: "⏳ Ahorro de Tiempo",
            desc: "Reduce un 70% el tiempo de revisión de CVs gracias a nuestra IA.",
          }, {
            title: "🎯 Mejor Precisión",
            desc: "Incrementa en un 85% la precisión al encontrar candidatos ideales.",
          }, {
            title: "💰 Menos Costos",
            desc: "Disminuye los costos de contratación en un 50% gracias a la automatización.",
          }].map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-900 p-8 rounded-xl shadow-lg text-center"
            >
              <h3 className="text-2xl font-bold text-white">{benefit.title}</h3>
              <p className="text-gray-300 mt-2">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔹 Sección: Planes de Suscripción */}
      <section className="py-20 px-6 bg-gradient-to-t from-blue-900 to-gray-800">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">💰 Planes de Suscripción</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.3 }}
              viewport={{ once: true }}
              className={`bg-gray-900 p-8 rounded-xl shadow-lg text-center ${plan.name === "Pro ⭐" ? "border-4 border-blue-700" : ""}`}
            >
              <p className="text-6xl">{plan.emoji}</p>
              <h3 className="text-3xl font-bold mt-4 text-white">{plan.name}</h3>
              <p className="text-2xl font-semibold text-blue-400 mt-2">{plan.monthlyPrice}</p>
              <p className="text-gray-400 mt-2">{plan.features}</p>
              <p className="text-gray-300 mt-4">{plan.description}</p>
              {plan.name === "Pro ⭐" && (
                <div className="mt-4 text-xl text-blue-400 font-semibold">
                  <span>¡Más Popular!</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔹 Sección: Testimonios */}
      <section className="py-20 px-6 bg-gradient-to-t from-gray-900 to-black">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">🌟 Lo que dicen nuestros usuarios</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[{
            name: "Juan Pérez",
            role: "Gerente de RRHH",
            company: "TechCorp",
            testimonial: "TalentMosaic AI ha transformado nuestra forma de contratar. Los resultados fueron rápidos y la calidad de los candidatos ha mejorado enormemente."
          }, {
            name: "Ana Gómez",
            role: "Directora de Talento",
            company: "HealthPartners",
            testimonial: "El uso de IA ha reducido el sesgo en nuestras contrataciones. Ahora podemos enfocarnos en lo que realmente importa: la habilidad del candidato."
          }, {
            name: "Carlos López",
            role: "CEO",
            company: "FinTechX",
            testimonial: "La integración de TalentMosaic AI fue rápida y fácil. Nos ahorró tiempo y nos permitió encontrar candidatos más cualificados para puestos clave."
          }].map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.3 }}
              className="bg-gray-800 p-8 rounded-xl shadow-lg text-center"
            >
              <p className="text-lg text-gray-300">"{testimonial.testimonial}"</p>
              <p className="font-bold text-xl text-blue-400 mt-4">{testimonial.name}</p>
              <p className="text-gray-400">{testimonial.role} - {testimonial.company}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔹 Sección: Características Técnicas */}
      <section className="py-20 px-6 bg-gray-800">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">🔧 Características Técnicas</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[{
            title: "Seguridad de Datos",
            desc: "Toda la información está encriptada y cumplimos con regulaciones como GDPR.",
          }, {
            title: "Machine Learning Avanzado",
            desc: "Nuestro algoritmo de IA aprende y mejora constantemente.",
          }, {
            title: "Análisis Predictivo",
            desc: "TalentMosaic AI realiza un análisis predictivo sobre el desempeño futuro del candidato.",
          }].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-900 p-8 rounded-xl shadow-lg text-center"
            >
              <h3 className="text-2xl font-bold">{feature.title}</h3>
              <p className="text-gray-300 mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔹 Sección: Preguntas Frecuentes */}
      <section className="py-20 px-6 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">❓ Preguntas Frecuentes</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {[{
            question: "¿TalentMosaic AI es seguro?",
            answer: "Sí, usamos cifrado de datos y cumplimos con regulaciones como GDPR para proteger la información.",
          }, {
            question: "¿Cómo funciona el ranking de candidatos?",
            answer: "Nuestra IA analiza la experiencia y habilidades de cada candidato para sugerir los mejores perfiles.",
          }, {
            question: "¿Puedo cancelar mi suscripción en cualquier momento?",
            answer: "Sí, puedes cancelar tu plan en cualquier momento sin penalización.",
          }, {
            question: "¿TalentMosaic AI se integra con otras plataformas?",
            answer: "Sí, TalentMosaic AI es compatible con plataformas globales y puede integrarse fácilmente con tu sistema de contratación.",
          }].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-blue-400">{item.question}</h3>
              <p className="text-gray-300 mt-2">{item.answer}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔹 Consentimiento de Cookies */}
      <CookieConsent />
    </div>
  );
}
