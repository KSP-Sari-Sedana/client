import { createContext, useContext } from "react";

const helperContext = createContext();

function useHelperContext() {
  return useContext(helperContext);
}

function HelperProvider({ children }) {
  function getDay(date, type) {
    return new Date(date).toLocaleString("id-ID", { weekday: type });
  }

  function getDate(date, type) {
    return new Date(date).toLocaleString("id-ID", { day: type });
  }

  function getMonth(date, type) {
    return new Date(date).toLocaleString("id-ID", { month: type });
  }

  function getFullDate(date) {
    return `${new Date(date).toLocaleString("id-ID", { dateStyle: "full" })}`;
  }

  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function formatAccNumber(accNumber) {
    let formatedAccNumber = "";
    for (let i = 0; i < accNumber?.toString().length; i++) {
      if (i > 0 && (i + 1) % 3 === 0) {
        formatedAccNumber += " ";
      }
      formatedAccNumber += accNumber?.toString()[i];
    }
    return formatedAccNumber;
  }

  function formatRupiah(amount) {
    return `Rp. ${amount?.toLocaleString("ID-id")}`;
  }

  const helpCtx = {
    getDay,
    getDate,
    getMonth,
    getFullDate,
    addDays,
    formatAccNumber,
    formatRupiah,
  };
  const helperContextValue = { helpCtx };

  return <helperContext.Provider value={helperContextValue}>{children}</helperContext.Provider>;
}

export { useHelperContext };
export default HelperProvider;
