// import React, { createContext, useContext, useState } from 'react';

// const LanguageContext = createContext();

// export const useLanguage = () => useContext(LanguageContext);

// export const LanguageProvider = ({ children }) => {
//   const [language, setLanguage] = useState('en'); // Default language is English

//   const changeLanguage = (newLanguage) => {
//     setLanguage(newLanguage);
//   };

//   return (
//     <LanguageContext.Provider value={{ language, changeLanguage }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };