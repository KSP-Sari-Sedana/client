import { createContext, useContext, useState } from "react";

const toggleContext = createContext();

function useToggleContext() {
  return useContext(toggleContext);
}

function ToggleProvider({ children }) {
  const [isPopupAvatar, setIsPopupAvatar] = useState(false);
  const [isPopupNotif, setIsPopupNotif] = useState(false);

  function togglePopupAvatar() {
    setIsPopupAvatar(!isPopupAvatar);
    setIsPopupNotif(false);
  }

  function togglePopupNotif() {
    setIsPopupNotif(!isPopupNotif);
    setIsPopupAvatar(false);
  }

  const toggleContextValue = { isPopupAvatar, togglePopupAvatar, isPopupNotif, togglePopupNotif };

  return <toggleContext.Provider value={toggleContextValue}>{children}</toggleContext.Provider>;
}

export { useToggleContext };
export default ToggleProvider;
