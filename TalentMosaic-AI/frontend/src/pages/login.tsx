import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de campos
    if (!email || !password || (!firstName && !isLogin) || !lastName) {
      setError('Por favor completa todos los campos.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Validación para el tamaño de la compañía: Asegurarse de que el tamaño sea un número mayor que 0
    if (!isLogin && (companySize <= 0 || isNaN(Number(companySize)))) {
      setError('El tamaño de la compañía debe ser un número mayor a 0.');
      return;
    }

    if (!isLogin && (!companyName || !industry || !companySize)) {
      setError('Por favor completa todos los campos de la empresa.');
      return;
    }

    try {
      console.log(`${isLogin ? "Login" : "Registro"} con:`, email, password, firstName, lastName, companyName, industry, companySize);

      // Hacer la solicitud al backend para login o registro
      const response = await fetch(isLogin ? '/api/auth/login' : '/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          confirmPassword: isLogin ? undefined : confirmPassword,
          firstName: isLogin ? undefined : firstName,
          lastName: isLogin ? undefined : lastName,
          role: 'recruiter', // El rol por defecto es "recruiter"
          companyName: isLogin ? undefined : companyName,
          industry: isLogin ? undefined : industry,
          companySize: isLogin ? undefined : companySize,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirigir según el rol del usuario
        if (data.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/user/dashboard');
        }
      } else {
        setError(data.error || 'Algo salió mal, inténtalo de nuevo.');
      }
    } catch {
      setError('Algo salió mal, inténtalo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-gray-900 text-white py-10 px-6">
      <div className="container mx-auto max-w-lg">
        <h2 className="text-4xl font-bold text-center mb-12 text-indigo-400">
          {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
        </h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tarjeta única para el formulario */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
            {/* Si es Login o Registro */}
            {isLogin ? (
              <>
                <div className="text-center mb-4">
                  <span className="text-6xl">📧</span>
                  <h3 className="text-2xl font-bold mt-2">Iniciar sesión</h3>
                </div>

                {/* Correo Electrónico */}
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200 mb-4 text-black"
                />

                {/* Contraseña */}
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200 mb-4 text-black"
                />
              </>
            ) : (
              <>
                <div className="text-center mb-4">
                  <span className="text-6xl">👤</span>
                  <h3 className="text-2xl font-bold mt-2">Datos del Usuario</h3>
                </div>

                {/* Correo Electrónico */}
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200 mb-4 text-black"
                />

                {/* Contraseña */}
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200 mb-4 text-black"
                />

                {/* Confirmación de Contraseña */}
                <input
                  type="password"
                  placeholder="Confirmar Contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200 mb-4 text-black"
                />

                {/* Nombre */}
                <input
                  type="text"
                  placeholder="Primer Nombre"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200 mb-4 text-black"
                />

                <input
                  type="text"
                  placeholder="Apellido"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200 mb-4 text-black"
                />

                {/* Datos de la Compañía */}
                <input
                  type="text"
                  placeholder="Nombre de la Compañía"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200 mb-4 text-black"
                />

                <input
                  type="text"
                  placeholder="Industria"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200 mb-4 text-black"
                />

                {/* Tamaño de la Compañía con validación */}
                <input
                  type="number"
                  placeholder="Tamaño de la Compañía (número > 0)"
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200 mb-4 text-black"
                  min="1"
                />
              </>
            )}
          </div>

          {/* Mensaje de Error */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Botón de Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white rounded-lg font-bold text-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          >
            {isLogin ? "Iniciar Sesión" : "Registrar"}
          </button>
        </form>

        {/* Texto de Cambio de Vista */}
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">
            {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
          </span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-indigo-400 hover:text-indigo-600 text-sm font-semibold"
          >
            {isLogin ? "Registrarse" : "Iniciar sesión"}
          </button>
        </div>
      </div>
    </div>
  );
}
