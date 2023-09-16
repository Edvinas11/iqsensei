import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentMode, setCurrentMode] = useState('Light');

  const setMode = (newMode) => {
    setCurrentMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  return (
    <StateContext.Provider value={{ currentMode, setMode }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
