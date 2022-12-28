import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authAPI from "../api/authAPI";

const authContext = createContext();

function useAuthContext() {
  return useContext(authContext);
}

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState({ login: false });
  const [APIResponse, setAPIResponse] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuth(true);
    }
  }, []);

  async function login() {
    setIsLoading({ ...isLoading, login: true });
    let result = await authAPI.login(email, password);
    setAPIResponse(result);
    if (result.status !== "OK") {
      setIsLoading({ ...isLoading, login: false });
      return;
    }
    localStorage.setItem("token", result.data.token);
    setIsAuth(true);
    setIsLoading({ ...isLoading, login: false });
    navigate("/dashboard");
    window.location.reload();
  }

  function logout() {
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/login");
  }

  const authContexts = {
    isAuth,
    email,
    password,
    APIResponse,
    isLoading,
    login,
    setEmail,
    setPassword,
    logout,
  };

  const authContextValue = { authContexts };

  return <authContext.Provider value={authContextValue}>{children}</authContext.Provider>;
}

export { useAuthContext };
export default AuthProvider;
