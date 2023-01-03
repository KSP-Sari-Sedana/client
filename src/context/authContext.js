import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authAPI from "../api/authAPI";

const authContext = createContext();

function useAuthContext() {
  return useContext(authContext);
}

function AuthProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [APIMessage, setAPIMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    isTokenValid();
  }, []);

  async function isTokenValid() {
    let isToken = await authAPI.isTokenValid();
    if (isToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }

  async function login() {
    let result = await authAPI.login(email, password);
    setAPIMessage(result.message);
    if (result.status !== "OK") {
      return;
    }
    localStorage.setItem("token", result.data.token);
    setIsLoggedIn(true);
    navigate("/dashboard");
    window.location.reload();
  }

  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  }

  const authCtx = {
    email,
    password,
    isLoggedIn,
    APIMessage,
    setEmail,
    setPassword,
    login,
    logout,
  };

  const authContextValue = { authCtx };

  return <authContext.Provider value={authContextValue}>{children}</authContext.Provider>;
}

export { useAuthContext };
export default AuthProvider;
