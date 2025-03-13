import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function PaymentPage() {
  const router = useRouter();

  const plans = [
    {
      name: "Básico",
      limit: "50 CVs/mes",
      features: "No ranking IA",
      monthlyPrice: "$49/mes",
      annualPrice: "$499/año",
      emoji: "📄",
      description: "Plan ideal para quienes necesitan un servicio básico y limitado.",
    },
    {
      name: "Pro ⭐",
      limit: "500 CVs/mes",
      features: "IA + Ajustes",
      monthlyPrice: "$99/mes",
      annualPrice: "$999/año",
      emoji: "🚀",
      description: "Plan avanzado con inteligencia artificial y ajustes personalizados.",
      popular: true,
    },
    {
      name: "Enterprise",
      limit: "Ilimitado",
      features: "IA Avanzada + Soporte",
      monthlyPrice: "$499/mes",
      annualPrice: "$4999/año",
      emoji: "🏢",
      description: "Plan para empresas con IA avanzada y soporte dedicado.",
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isAnnual, setIsAnnual] = useState(false);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan.name === selectedPlan?.name ? null : plan);
  };

  const handleProceedToPayment = () => {
    if (!selectedPlan) {
      alert("Por favor, selecciona un plan.");
      return;
    }
    alert(`Procediendo con el pago del plan ${selectedPlan.name}`);
  };

  const calculateAnnualSavings = (monthlyPrice, annualPrice) => {
    const monthly = parseFloat(monthlyPrice.slice(1));
    const annual = parseFloat(annualPrice.slice(1));
    return Math.round(((monthly * 12 - annual) / (monthly * 12)) * 100);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-900 to-gray-900 text-white py-20 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto max-w-7xl">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-indigo-400"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Planes de Suscripción 🚀
        </motion.h2>

        {/* Toggle Switch para cambiar entre Mensual y Anual */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800 p-2 rounded-full flex items-center w-64">
            <motion.button
              onClick={() => setIsAnnual(false)}
              className={`w-1/2 py-2 text-center rounded-full transition-all duration-300 ${
                !isAnnual ? "bg-indigo-500 text-white" : "text-gray-300"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              Mensual
            </motion.button>
            <motion.button
              onClick={() => setIsAnnual(true)}
              className={`w-1/2 py-2 text-center rounded-full transition-all duration-300 ${
                isAnnual ? "bg-indigo-500 text-white" : "text-gray-300"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              Anual
            </motion.button>
          </div>
        </div>

        {/* Tarjetas de Planes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`bg-gray-800 p-8 rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform cursor-pointer relative ${
                selectedPlan?.name === plan.name
                  ? "border-4 border-green-500 scale-105 shadow-green-500/50"
                  : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {plan.popular && (
                <motion.span
                  className="absolute top-2 right-2 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  Más Popular ⭐
                </motion.span>
              )}
              <div className="text-center mb-4">
                <span className="text-6xl">{plan.emoji}</span>
                <h3 className="text-2xl font-bold mt-2">{plan.name}</h3>
              </div>

              <p className="text-center text-gray-300 mb-4">{plan.description}</p>

              <ul className="text-center mb-4">
                <li>
                  <strong>Límite:</strong> {plan.limit}
                </li>
                <li>
                  <strong>Funciones:</strong> {plan.features}
                </li>
              </ul>

              <div className="text-center">
                <p className="text-4xl font-bold text-indigo-500">
                  {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                </p>
                {isAnnual && (
                  <p className="text-sm text-green-400">
                    Ahorras {calculateAnnualSavings(plan.monthlyPrice, plan.annualPrice)}% con el pago anual
                  </p>
                )}
              </div>

              {/* Botón para seleccionar o deseleccionar el plan */}
              <div className="text-center mt-4">
                <motion.button
                  onClick={() => handleSelectPlan(plan)}
                  className={`text-white font-bold py-2 px-6 rounded-lg transition-all duration-200 text-lg shadow-lg transform ${
                    selectedPlan?.name === plan.name
                      ? "bg-green-500 scale-105"
                      : "bg-indigo-500 hover:bg-indigo-600"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {selectedPlan?.name === plan.name ? "Plan Seleccionado ✅" : "Seleccionar Plan"}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Botón para proceder al pago */}
        <div className="text-center mt-12">
          <motion.button
            onClick={handleProceedToPayment}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 text-lg shadow-lg"
            disabled={!selectedPlan} // Deshabilita si no hay plan seleccionado
            whileHover={!selectedPlan ? {} : { scale: 1.05 }}
            whileTap={!selectedPlan ? {} : { scale: 0.95 }}
          >
            {selectedPlan ? `Pagar ${selectedPlan.name} 💳` : "Selecciona un plan"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
