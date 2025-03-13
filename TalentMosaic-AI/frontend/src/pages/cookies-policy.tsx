import React from "react";

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full sm:w-3/4 lg:w-2/3 text-gray-900">
        <h1 className="text-4xl font-extrabold text-center text-indigo-400 mb-6">Política de Cookies</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-500">¿Qué son las cookies?</h2>
          <p className="text-gray-600 mt-2">
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, teléfono móvil u otro dispositivo) cuando visitas un sitio web. Se utilizan para mejorar la experiencia de navegación, ofrecer contenido personalizado y analizar el tráfico web.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-500">¿Por qué usamos cookies?</h2>
          <p className="text-gray-600 mt-2">
            Usamos cookies para proporcionar una experiencia más eficiente y personalizada en nuestro sitio web. Nos permiten recordar tus preferencias y realizar un seguimiento de tu actividad, de manera que podamos mejorar continuamente nuestros servicios.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-500">Tipos de cookies que utilizamos</h2>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            <li><strong>Cookies necesarias:</strong> Son esenciales para el funcionamiento del sitio web y no pueden desactivarse.</li>
            <li><strong>Cookies de rendimiento:</strong> Nos permiten conocer cómo interactúan los usuarios con nuestro sitio para mejorar la funcionalidad.</li>
            <li><strong>Cookies de funcionalidad:</strong> Ayudan a personalizar tu experiencia en el sitio, recordando tus preferencias y elecciones.</li>
            <li><strong>Cookies publicitarias:</strong> Permiten mostrar anuncios más relevantes basados en tus intereses.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-500">¿Cómo controlar las cookies?</h2>
          <p className="text-gray-600 mt-2">
            Puedes gestionar tus preferencias de cookies a través de la configuración de tu navegador. Aunque puedes bloquear algunas cookies, es posible que algunas características del sitio no funcionen correctamente si lo haces.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-500">Actualizaciones a esta política</h2>
          <p className="text-gray-600 mt-2">
            Podemos actualizar esta política ocasionalmente para reflejar cambios en nuestras prácticas. Los cambios serán comunicados a través de nuestro sitio web.
          </p>
        </section>

        <div className="text-center mt-6">
          <a href="/" className="text-indigo-400 hover:text-indigo-600 transition-all duration-200">Volver a la página principal</a>
        </div>
      </div>
    </div>
  );
};

export default CookiesPolicy;
