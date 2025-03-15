import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center py-12 px-6">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-full sm:w-3/4 lg:w-2/3 text-white">
        <h1 className="text-4xl font-extrabold text-center text-indigo-400 mb-6">Política de Privacidad</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-300">Introducción</h2>
          <p className="text-gray-400 mt-2">
            En esta política de privacidad, te explicamos cómo recopilamos, usamos, protegemos y compartimos tu información personal. Estamos comprometidos con tu privacidad y aseguramos que tu información esté segura.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-300">Información que recopilamos</h2>
          <ul className="list-disc list-inside text-gray-400 mt-2">
            <li><strong>Información personal:</strong> Nombre, dirección de correo electrónico, número de teléfono, etc.</li>
            <li><strong>Información no personal:</strong> Información sobre el navegador, la IP, y otros detalles de la interacción con nuestro sitio web.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-300">Cómo utilizamos tu información</h2>
          <p className="text-gray-400 mt-2">
            Utilizamos la información para mejorar nuestros servicios, ofrecer soporte, personalizar la experiencia del usuario y enviarte comunicaciones relacionadas con nuestros productos y servicios.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-300">Protección de tu información</h2>
          <p className="text-gray-400 mt-2">
            Implementamos medidas de seguridad físicas, electrónicas y administrativas para proteger tu información personal. Sin embargo, ten en cuenta que ningún sistema es 100% seguro.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-300">Tus derechos</h2>
          <p className="text-gray-400 mt-2">
            Tienes el derecho de acceder, corregir o eliminar tu información personal. Si deseas ejercer alguno de estos derechos, contáctanos a través de los canales disponibles en nuestro sitio web.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-300">Compartir tu información</h2>
          <p className="text-gray-400 mt-2">
            No compartiremos tu información personal con terceros, salvo en casos que lo exijan las leyes o normativas aplicables.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-300">Actualizaciones a esta política</h2>
          <p className="text-gray-400 mt-2">
            Esta política puede ser actualizada en el futuro. Cualquier cambio significativo será comunicado a través de nuestro sitio web.
          </p>
        </section>

        <div className="text-center mt-6">
          <a href="/" className="text-indigo-400 hover:text-indigo-600 transition-all duration-200">
            Volver a la página principal
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
