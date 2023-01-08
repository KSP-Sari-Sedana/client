import { createContext, useContext } from "react";

import submAPI from "../api/submAPI";

const submContext = createContext();

function useSubmContext() {
  return useContext(submContext);
}

function SubmProvider({ children }) {
  async function getByUser() {
    let res = await submAPI.getByUser();
    return res.data.subm;
  }

  async function getSubmById(id, type) {
    let res = await submAPI.getSubmById(id, type);
    return res.data.subm;
  }

  const submCtx = { getByUser, getSubmById };
  const submContextValue = { submCtx };

  return <submContext.Provider value={submContextValue}>{children}</submContext.Provider>;
}

export { useSubmContext };
export default SubmProvider;
