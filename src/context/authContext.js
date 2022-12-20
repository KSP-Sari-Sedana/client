import { createContext, useContext, useState, useEffect } from "react";

const authContext = createContext();

function useAuthContext() {
  return useContext(authContext);
}

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuth(true);
    }
  }, []);

  const authContextValue = { isAuth };

  return <authContext.Provider value={authContextValue}>{children}</authContext.Provider>;
}

export { useAuthContext };
export default AuthProvider;
