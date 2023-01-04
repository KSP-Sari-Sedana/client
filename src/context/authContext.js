import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authAPI from "../api/authAPI";

const authContext = createContext();

function useAuthContext() {
  return useContext(authContext);
}

let checkToken = undefined;

async function isTokenValid() {
  let isToken = await authAPI.isTokenValid();
  if (isToken) return true;
  return false;
}

function getPayload() {
  let token = localStorage.getItem("token");
  if (!token) return null;
  let payload = token.split(".")[1];
  let decodedPayload = JSON.parse(window.atob(payload));
  return decodedPayload;
}

function isTokenExpired() {
  let decodedPayload = getPayload();
  if (!decodedPayload) return false;
  let exp = decodedPayload.exp;
  let now = new Date().getTime() / 1000;
  if (exp < now) return true;
  return false;
}

function AuthProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [APIMessage, setAPIMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!!localStorage.getItem("token")) {
      async function validateToken() {
        setIsLoggedIn(await isTokenValid());
      }
      validateToken();
      checkToken = setInterval(() => {
        if (isTokenExpired()) {
          logout();
        }
      }, 1000);
    }
    return () => {
      clearInterval(checkToken);
    };
  }, []);

  async function login() {
    let result = await authAPI.login(email, password, isRemember);
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
    clearInterval(checkToken);
    setIsLoggedIn(false);
    navigate("/login");
  }

  const authCtx = {
    email,
    password,
    isRemember,
    isLoggedIn,
    APIMessage,
    setEmail,
    setPassword,
    setIsRemember,
    login,
    logout,
  };

  const authContextValue = { authCtx };

  return <authContext.Provider value={authContextValue}>{children}</authContext.Provider>;
}

export { useAuthContext };
export default AuthProvider;
