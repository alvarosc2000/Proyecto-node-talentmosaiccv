import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CreateCompany() {
  const router = useRouter();
  
  // Estado para manejar el token
  const [token, setToken] = useState('');
  
  const [company, setCompany] = useState({ name: '', industry: '', size: '' });
  const [loading, setLoading] = useState(false);
  const [existingCompany, setExistingCompany] = useState<any>(null);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');

  // Cargar el token del localStorage cuando el componente se monta
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []); // Solo se ejecuta una vez, al montar el componente

  // Verificar si ya existe una empresa registrada
  useEffect(() => {
    const checkCompany = async () => {
      try {
        if (!token) {
          setError('No estás autenticado');
          setChecking(false);
          return;
        }

        const res = await fetch('http://localhost:5000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: `
              query {
                getCompany {
                  id
                  name
                  industry
                }
              }
            `,
          }),
        });

        const data = await res.json();
        if (data?.data?.getMyCompany) {
          setExistingCompany(data.data.getMyCompany);
        }
      } catch (err) {
        console.error('Error al comprobar la empresa:', err);
        setError('Hubo un error al verificar la empresa.');
      } finally {
        setChecking(false);
      }
    };

    checkCompany();
  }, [token]); // Dependemos de `token` para que se ejecute cuando cambia

  // Crear nueva empresa
  const handleSubmit = async () => {
    if (!company.name || !company.industry || !company.size) return;

    setLoading(true);
    setError('');

    try {
      if (!token) {
        setError('No estás autenticado.');
        setLoading(false);
        return;
      }

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
              size: Number(company.size),
            },
          },
        }),
      });

      const data = await res.json();

      if (data?.errors) {
        console.error('Errores de GraphQL:', data.errors);
        setError(data.errors[0].message);
        setLoading(false);
        return;
      }

      if (data?.data?.createCompany?.id) {
        router.push('/dashboard');
      } else {
        setError('Hubo un error al crear la empresa');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setError('Error de red al crear la empresa');
    } finally {
      setLoading(false);
    }
  };

  // Redirigir al dashboard
  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg">Comprobando empresa existente...</p>
      </div>
    );
  }

  // Si no hay token, redirigimos al login
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg">No estás autenticado, por favor inicia sesión.</p>
        <button onClick={() => router.push('/login')} className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg">
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
              onClick={handleGoToDashboard}
              className="w-full bg-green-600 hover:bg-green-700 transition py-3 rounded-lg font-bold text-white"
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
                required
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
              />
              <input
                type="text"
                placeholder="Industria"
                value={company.industry}
                onChange={(e) => setCompany({ ...company, industry: e.target.value })}
                required
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
              />
              <input
                type="number"
                placeholder="Tamaño (número de empleados)"
                value={company.size}
                onChange={(e) => setCompany({ ...company, size:"1" })}
                required
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
              />
            </div>
            {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
            <button
              onClick={handleSubmit}
              disabled={loading || !company.name || !company.industry || !company.size}
              className={`w-full mt-6 py-3 rounded-lg font-bold text-white transition ${loading || !company.name || !company.industry || !company.size
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? 'Creando...' : 'Crear Empresa'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
