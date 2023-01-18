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

  async function get(status, role) {
    let result = await userAPI.get(status, role);
    return result?.data?.users || [];
  }

  async function register() {
    let result = await userAPI.register(username, email, firstName, lastName, password);
    setAPIMessage(result.message);
    if (result.status !== "OK") {
      return;
    }
    navigate("/login");
    window.location.reload();
  }

  async function update(payload) {
    let result = await userAPI.update(payload);
    setAPIMessage(result.message);
    getMyProfile();
    return result;
  }

  async function getMyProfile() {
    let result = await userAPI.getMyProfile();
    setMe(result.data.user);
  }

  async function getByUsername(username) {
    let result = await userAPI.getByUsername(username);
    return result?.data?.user || {};
  }

  async function setStatusAndRole(username, status, role) {
    let result = await userAPI.setStatusAndRole(username, status, role);
    if (result.status !== "OK") {
      return;
    }
    return result;
  }

  const userCtx = {
    username,
    email,
    firstName,
    lastName,
    password,
    APIMessage,
    me,
    get,
    setUsername,
    setEmail,
    setFirstName,
    setLastName,
    setPassword,
    register,
    update,
    getMyProfile,
    getByUsername,
    setStatusAndRole,
  };

  const userContextValue = { userCtx };

  return <userContext.Provider value={userContextValue}>{children}</userContext.Provider>;
}

export { useUserContext };
export default UserProvider;
