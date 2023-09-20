import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  return useContext(AppContext);
}

// eslint-disable-next-line react/prop-types
export function AppContextProvider({ children }) {
  const [state, setState] = useState({});
  const token = localStorage.getItem("sb-xranypgachpyeenmfzfv-auth-token");
  const isAuthentication = Boolean(token);

  useEffect(() => {
    // You can perform additional setup or data loading logic here if needed
  }, []);

  function updateState(newState) {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  }

  const contextValue = {
    state,
    updateState,
    isAuthentication,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
