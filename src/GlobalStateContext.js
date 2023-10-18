import React, { createContext, useContext, useState } from 'react';

// Crea un contexto global
const GlobalStateContext = createContext();

// Crea un componente proveedor para envolver tu aplicación
export const GlobalStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState([]);

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Un hook personalizado para acceder al contexto global
export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};
