import { createContext, useContext } from "react";
import notifApi from "../api/notifApi";

const notifContext = createContext();

function useNotifContext() {
  return useContext(notifContext);
}

function NotifProvider({ children }) {
  async function getByUser() {
    const result = await notifApi.getByUser();
    return result.data.notifications;
  }

  const notifCtx = { getByUser };
  const notifContextValue = { notifCtx };

  return <notifContext.Provider value={notifContextValue}>{children}</notifContext.Provider>;
}

export { useNotifContext };
export default NotifProvider;
