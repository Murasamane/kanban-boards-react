/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

function DarkModeContextProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));

    return () => {};
  }, [isDark]);
  return (
    <DarkModeContext.Provider
      value={{
        isDark,
        setIsDark,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

const useDarkMode = () => {
  const context = useContext(DarkModeContext);

  if (!context)
    throw new Error("Dark mode context being used outside of the provider");

  return context;
};

export { DarkModeContextProvider, useDarkMode };
