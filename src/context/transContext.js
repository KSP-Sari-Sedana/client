import { createContext, useContext } from "react";

import transAPI from "../api/transAPI";

const transContext = createContext();

function useTransContext() {
  return useContext(transContext);
}

function TransProvider({ children }) {
  async function create(accId, type, data) {
    let res = await transAPI.create(accId, type, data);
    return res?.data;
  }

  async function get(limit) {
    let res = await transAPI.get(limit);
    return res?.data?.trans;
  }

  const transCtx = { create, get };
  const transContextValue = { transCtx };
  return <transContext.Provider value={transContextValue}>{children}</transContext.Provider>;
}

export { useTransContext };
export default TransProvider;
