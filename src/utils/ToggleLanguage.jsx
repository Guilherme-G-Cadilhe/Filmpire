
import React, { useState, createContext } from 'react';

export const LanguageContext = createContext();

const ToggleLanguage = ({ children }) => {
  const [currentLang, setCurrentLang] = useState('pt-BR');

  const toggleLanguage = () => {
    setCurrentLang((prevMode) => (prevMode === 'pt-BR' ? 'en' : 'pt-BR'));
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default ToggleLanguage;
