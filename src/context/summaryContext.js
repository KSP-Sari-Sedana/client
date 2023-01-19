import { createContext, useContext } from "react";
import summaryAPI from "../api/summaryAPI";

const summaryContext = createContext();

function useSummaryContext() {
  return useContext(summaryContext);
}

function SummaryProvider({ children }) {
  async function getSummary() {
    let res = await summaryAPI.getSummary();
    return res?.data;
  }

  const summCtx = {
    getSummary,
  };
  const summContextValue = { summCtx };

  return <summaryContext.Provider value={summContextValue}>{children}</summaryContext.Provider>;
}

export { useSummaryContext };
export default SummaryProvider;
