import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

const MyComponent = () => {
  const contextValue = useContext(MyContext);

  return (
    <div>
      <p>El valor del contexto es: {contextValue}</p>
    </div>
  );
};

const App = () => {
  const [value, setValue] = useState("Hola, soy un valor del contexto!");

  return (
    <MyContext.Provider value={value}>
      <div>
        <h1>Mi Aplicación</h1>
        <MyComponent />
        <button onClick={() => setValue("¡Nuevo valor del contexto!")}>Cambiar Valor</button>
      </div>
    </MyContext.Provider>
  );
};

export default App;
