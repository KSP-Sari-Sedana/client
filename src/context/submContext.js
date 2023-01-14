import { createContext, useContext } from "react";

import submAPI from "../api/submAPI";

const submContext = createContext();

function useSubmContext() {
  return useContext(submContext);
}

function SubmProvider({ children }) {
  async function create(type, data) {
    let res = await submAPI.create(type, data);
    return res?.data?.subm || {};
  }

  async function get(type) {
    let res = await submAPI.get(type);
    return res.data.subms;
  }

  async function getByUser() {
    let res = await submAPI.getByUser();
    return res.data.subm;
  }

  async function getSubmById(id, type) {
    let res = await submAPI.getSubmById(id, type);
    return res.data.subm;
  }

  async function cancelSubm(id, type) {
    let res = await submAPI.cancelSubm(id, type);
    return res.data.subm;
  }

  const submCtx = { create, get, getByUser, getSubmById, cancelSubm };
  const submContextValue = { submCtx };

  return <submContext.Provider value={submContextValue}>{children}</submContext.Provider>;
}

export { useSubmContext };
export default SubmProvider;
