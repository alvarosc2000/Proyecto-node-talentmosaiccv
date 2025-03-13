import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
    setError('');

    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    if (!isLogin) {
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden.');
        return;
      }

      if (!firstName || !lastName || !companyName || !industry || companySize <= '0') {
        setError('Completa todos los datos de registro.');
        return;
      }
    }

    try {
      const response = await fetch(isLogin ? '/api/auth/login' : '/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          ...(isLogin ? {} : { confirmPassword, firstName, lastName, companyName, industry, companySize }),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          router.push('/dashboard');
        } else {
          setError('Se ha enviado un correo de confirmación. Revisa tu bandeja de entrada.');
        }
      } else {
        setError(data.error || 'Algo salió mal, inténtalo de nuevo.');
      }
    } catch {
      setError('Error de conexión, por favor intenta más tarde.');
    }
  };

  return (
    <motion.div
      className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="w-full max-w-lg bg-gray-800 p-8 rounded-2xl shadow-2xl text-center relative overflow-hidden"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-bold">{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
        <p className="text-gray-400 mt-2">{isLogin ? 'Accede a tu cuenta' : 'Regístrate en segundos'}</p>

        {error && (
          <motion.p
            className="text-red-400 bg-red-900 p-2 rounded-lg mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-700 border-2 border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-600 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-3 rounded-lg bg-gray-700 border-2 border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-600 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!isLogin && (
            <>
              <input
                type="password"
                placeholder="Confirmar Contraseña"
                className="w-full p-3 rounded-lg bg-gray-700 border-2 border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-600 text-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <input
                type="text"
                placeholder="Nombre"
                className="w-full p-3 rounded-lg bg-gray-700 border-2 border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-600 text-white"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Apellido"
                className="w-full p-3 rounded-lg bg-gray-700 border-2 border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-600 text-white"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Nombre de la empresa"
                className="w-full p-3 rounded-lg bg-gray-700 border-2 border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-600 text-white"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Industria"
                className="w-full p-3 rounded-lg bg-gray-700 border-2 border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-600 text-white"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
              <input
                type="number"
                placeholder="Tamaño de la empresa"
                className="w-full p-3 rounded-lg bg-gray-700 border-2 border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-600 text-white"
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                min="1"
              />
            </>
          )}

          <motion.button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-bold shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </motion.button>
        </form>

        <motion.button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-6 text-indigo-400 hover:text-indigo-300 transition-all"
          whileHover={{ scale: 1.05 }}
        >
          {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
