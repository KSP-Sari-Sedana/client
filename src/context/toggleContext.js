import { createContext, useContext, useState } from "react";

const toggleContext = createContext();

function useToggleContext() {
  return useContext(toggleContext);
}

function ToggleProvider({ children }) {
  const [isPopupNotif, setIsPopupNotif] = useState(false);

  function togglePopupNotif() {
    setIsPopupNotif(!isPopupNotif);
  }

  const toggleContextValue = { isPopupNotif, togglePopupNotif };

  return <toggleContext.Provider value={toggleContextValue}>{children}</toggleContext.Provider>;
}

export { useToggleContext };
export default ToggleProvider;
