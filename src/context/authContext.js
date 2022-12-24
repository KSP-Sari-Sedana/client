import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    let result = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
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

  const authContexts = {
    isAuth,
    email,
    password,
    APIResponse,
    isLoading,
    login,
    setEmail,
    setPassword,
  };

  const authContextValue = { authContexts };

  return <authContext.Provider value={authContextValue}>{children}</authContext.Provider>;
}

export { useAuthContext };
export default AuthProvider;
