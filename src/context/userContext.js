import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import userAPI from "../api/userAPI";

const userContext = createContext();

function useUserContext() {
  return useContext(userContext);
}

function UserProvider({ children }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState({ register: false });
  const [APIResponse, setAPIResponse] = useState({});

  const navigate = useNavigate();

  async function register() {
    setIsLoading({ ...isLoading, register: true });
    let result = await userAPI.register(username, email, firstName, lastName, password);
    setAPIResponse(result);
    if (result.status !== "OK") {
      setIsLoading({ ...isLoading, register: false });
      return;
    }
    setIsLoading({ ...isLoading, register: false });
    navigate("/login");
    window.location.reload();
  }

  const userContexts = {
    username,
    email,
    firstName,
    lastName,
    password,
    APIResponse,
    isLoading,
    setUsername,
    setEmail,
    setFirstName,
    setLastName,
    setPassword,
    register,
  };

  const userContextValue = { userContexts };

  return <userContext.Provider value={userContextValue}>{children}</userContext.Provider>;
}

export { useUserContext };
export default UserProvider;
