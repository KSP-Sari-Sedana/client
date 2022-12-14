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
  const [APIMessage, setAPIMessage] = useState("");
  const [me, setMe] = useState({});

  const navigate = useNavigate();

  async function register() {
    let result = await userAPI.register(username, email, firstName, lastName, password);
    setAPIMessage(result.message);
    if (result.status !== "OK") {
      return;
    }
    navigate("/login");
    window.location.reload();
  }

  async function getMyProfile() {
    let result = await userAPI.getMyProfile();
    setMe(result.data.user);
  }

  const userCtx = {
    username,
    email,
    firstName,
    lastName,
    password,
    APIMessage,
    me,
    setUsername,
    setEmail,
    setFirstName,
    setLastName,
    setPassword,
    register,
    getMyProfile,
  };

  const userContextValue = { userCtx };

  return <userContext.Provider value={userContextValue}>{children}</userContext.Provider>;
}

export { useUserContext };
export default UserProvider;
