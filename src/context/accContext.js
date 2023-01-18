import { createContext, useContext, useState, useEffect } from "react";
import accAPI from "../api/accAPI";

const accContext = createContext();

function useAccContext() {
  return useContext(accContext);
}

function AccProvider({ children }) {
  async function setStatus(type, id, status) {
    let res = await accAPI.setStatus(type, id, status);
    return res;
  }

  const accCtx = { setStatus };
  const accContextValue = { accCtx };

  return <accContext.Provider value={accContextValue}>{children}</accContext.Provider>;
}

export { useAccContext };
export default AccProvider;
