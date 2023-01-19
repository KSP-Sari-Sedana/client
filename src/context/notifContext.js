import { createContext, useContext, useState } from "react";
import notifApi from "../api/notifApi";

const notifContext = createContext();

function useNotifContext() {
  return useContext(notifContext);
}

function NotifProvider({ children }) {
  const [notifs, setNotifs] = useState([]);

  async function getByUser() {
    const result = await notifApi.getByUser();
    setNotifs(result.data.notifications);
    return result.data.notifications;
  }

  async function markAsRead(id) {
    await notifApi.markAsRead(id);
  }

  const notifCtx = { notifs, getByUser, markAsRead };
  const notifContextValue = { notifCtx };

  return <notifContext.Provider value={notifContextValue}>{children}</notifContext.Provider>;
}

export { useNotifContext };
export default NotifProvider;
