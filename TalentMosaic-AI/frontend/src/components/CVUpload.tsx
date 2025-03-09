import { useState } from 'react';

export default function CVUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h3 className="text-xl font-semibold mb-4">📤 Subir CV en PDF</h3>
      <input 
        type="file" 
        accept=".pdf" 
        onChange={handleFileUpload} 
        className="p-2 rounded bg-gray-700 text-white"
      />
      {selectedFile && (
        <p className="mt-2 text-sm text-gray-400">Archivo seleccionado: {selectedFile.name}</p>
      )}
    </div>
  );
}
