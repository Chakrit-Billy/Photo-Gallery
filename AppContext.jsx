import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const [state, setState] = useState({});

  useEffect(() => {}, []);

  function updateState(newState) {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  }

  const contextValue = {
    state,
    updateState,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
