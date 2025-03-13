import React, { useState, useEffect } from "react";

const CookieConsent = () => {
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    // Verificamos si el usuario ya ha aceptado las cookies
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (cookiesAccepted) {
      setIsAccepted(true);
    }
  }, []);

  const handleAccept = () => {
    // Guardamos el consentimiento en el localStorage
    localStorage.setItem("cookiesAccepted", "true");
    setIsAccepted(true);
  };

  const handleReject = () => {
    // Puedes manejar el rechazo de cookies de diferentes maneras,
    // pero en este caso no hacemos nada específico.
    setIsAccepted(true);
  };

  if (isAccepted) return null; // Si ya aceptó las cookies, no mostramos el banner

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-indigo-700 text-white p-4">
      <div className="container mx-auto text-center flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm sm:text-base">
          Este sitio web utiliza cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra{" "}
          <a href="/cookies-policy" className="underline">Política de Cookies</a> y{" "}
          <a href="/privacy-policy" className="underline">Política de Privacidad</a>.
        </p>
        <div className="mt-4 sm:mt-0 sm:flex sm:items-center">
          <button
            onClick={handleAccept}
            className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition-all duration-200 sm:ml-4"
          >
            Aceptar
          </button>
          <button
            onClick={handleReject}
            className="bg-transparent text-white border border-white px-4 py-2 rounded-full hover:bg-white hover:text-indigo-700 transition-all duration-200 sm:ml-4 mt-2 sm:mt-0"
          >
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
