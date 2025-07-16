import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CreateCompany() {
  const router = useRouter();

  const [token, setToken] = useState('');
  const [company, setCompany] = useState({ name: '', industry: '', size: '' });
  const [loading, setLoading] = useState(false);
  const [existingCompany, setExistingCompany] = useState<any>(null);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');

  // Cargar token desde localStorage al montar
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);

      // Decodificar y mostrar el ID del usuario
      try {
        const base64Payload = savedToken.split('.')[1];
        const payload = JSON.parse(atob(base64Payload));
        console.log('👤 ID del usuario:', payload.userId || payload.id || payload.sub);
      } catch (err) {
        console.error('❌ Error al decodificar el token:', err);
      }
    } else {
      setChecking(false);
    }
  }, []);

  // Verificar si ya existe una empresa
  useEffect(() => {
    const checkCompany = async () => {
      if (!token) return;

      try {
        const res = await fetch('http://localhost:5000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: `
              query {
                getMyCompany {
                  id
                  name
                  industry
                }
              }
            `,
          }),
        });

        const json = await res.json();
        if (json?.data?.getMyCompany) {
          setExistingCompany(json.data.getMyCompany);
        }
      } catch (err) {
        console.error('Error al verificar la empresa:', err);
        setError('Hubo un error al verificar la empresa.');
      } finally {
        setChecking(false);
      }
    };

    checkCompany();
  }, [token]);

  // Crear empresa
  const handleSubmit = async () => {
    if (!company.name || !company.industry || !company.size) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
            mutation CreateCompany($input: CreateCompanyInput!) {
              createCompany(input: $input) {
                id
                name
                industry
              }
            }
          `,
          variables: {
            input: {
              name: company.name,
              industry: company.industry,
              size: parseInt(company.size),
            },
          },
        }),
      });

      const json = await res.json();
      if (json.errors) {
        setError(json.errors[0]?.message || 'Error al crear la empresa.');
      } else if (json.data?.createCompany?.id) {
        router.push('/dashboard');
      } else {
        setError('No se pudo crear la empresa.');
      }
    } catch (err) {
      console.error('Error de red:', err);
      setError('Error de red al crear la empresa.');
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg">Comprobando empresa existente...</p>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <p className="text-lg mb-4">No estás autenticado, por favor inicia sesión.</p>
        <button
          onClick={() => router.push('/')}
          className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Ir a Iniciar Sesión
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-6 flex items-center justify-center">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-xl max-w-4xl w-full">
        {existingCompany ? (
          <>
            <h1 className="text-3xl font-bold text-center mb-6">✔️ Ya tienes una empresa registrada</h1>
            <div className="text-center mb-6">
              <p className="text-lg font-semibold">{existingCompany.name}</p>
              <p className="text-sm text-gray-400">{existingCompany.industry}</p>
            </div>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-bold text-white"
            >
              Ir al Dashboard
            </button>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-center mb-8">🏢 Crear Empresa</h1>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre de la empresa"
                value={company.name}
                onChange={(e) => setCompany({ ...company, name: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
              />
              <input
                type="text"
                placeholder="Industria"
                value={company.industry}
                onChange={(e) => setCompany({ ...company, industry: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
              />
              <input
                type="number"
                placeholder="Tamaño (número de empleados)"
                value={company.size}
                onChange={(e) => setCompany({ ...company, size: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
              />
            </div>
            {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full mt-6 py-3 rounded-lg font-bold text-white transition ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {loading ? 'Creando...' : 'Crear Empresa'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
