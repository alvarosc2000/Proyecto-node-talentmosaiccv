import { useState } from 'react';
import { useRouter } from 'next/router';

export default function PaymentPage() {
  const router = useRouter();

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
      name: 'Pro ⭐',
      limit: '500 CVs/mes',
      features: 'IA + Ajustes',
      monthlyPrice: '$99/mes',
      annualPrice: '$999/año',
      emoji: '🚀',
      description: 'Plan avanzado con inteligencia artificial y ajustes personalizados para tu perfil.',
      popular: true,
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

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isAnnual, setIsAnnual] = useState(false);

  const handleSelectPlan = (plan) => {
    // Si el plan seleccionado es el mismo que el actual, lo deseleccionamos
    if (selectedPlan === plan) {
      setSelectedPlan(null);
    } else {
      setSelectedPlan(plan); // Seleccionamos el nuevo plan
    }
  };

  const handleProceedToPayment = () => {
    if (!selectedPlan) {
      alert('Por favor, selecciona un plan.');
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-gray-900 text-white py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-indigo-400">
          Planes de Suscripción 🚀
        </h2>

        {/* Toggle Switch para cambiar entre Mensual y Anual */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800 p-2 rounded-full flex items-center w-64">
            <button
              onClick={() => setIsAnnual(false)}
              className={`w-1/2 py-2 text-center rounded-full transition-all duration-300 ${
                !isAnnual ? 'bg-indigo-500 text-white' : 'text-gray-300'
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`w-1/2 py-2 text-center rounded-full transition-all duration-300 ${
                isAnnual ? 'bg-indigo-500 text-white' : 'text-gray-300'
              }`}
            >
              Anual
            </button>
          </div>
        </div>

        {/* Tarjetas de Planes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-gray-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 ease-in-out transform ${
                selectedPlan === plan ? 'border-4 border-indigo-500 shadow-indigo-500/50' : ''
              } cursor-pointer relative`}
            >
              {plan.popular && (
                <span className="absolute top-2 right-2 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                  Más Popular ⭐
                </span>
              )}
              <div className="text-center mb-4">
                <span className="text-6xl">{plan.emoji}</span>
                <h3 className="text-2xl font-bold mt-2">{plan.name}</h3>
              </div>

              <p className="text-center text-gray-300 mb-4">{plan.description}</p>

              <ul className="text-center mb-4">
                <li><strong>Límite:</strong> {plan.limit}</li>
                <li><strong>Funciones:</strong> {plan.features}</li>
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
                <button
                  onClick={(e) => {
                    e.stopPropagation();  // Evita que el clic en el botón active la tarjeta
                    handleSelectPlan(plan);
                  }}
                  className={`bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-200 text-lg shadow-lg ${selectedPlan === plan ? 'bg-indigo-700' : ''}`}
                >
                  {selectedPlan === plan ? '¡Seleccionado!' : 'Seleccionar Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Botón para proceder al pago */}
        <div className="text-center mt-12">
          <button
            onClick={handleProceedToPayment}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 text-lg shadow-lg"
            disabled={!selectedPlan}  // El botón se deshabilita si no hay plan seleccionado
          >
            Proceder al Pago
          </button>
        </div>
      </div>
    </div>
  );
}
