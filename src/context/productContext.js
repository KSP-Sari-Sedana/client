import { createContext, useContext, useState } from "react";
import productAPI from "../api/productAPI";

const productContext = createContext();

function useProductContext() {
  return useContext(productContext);
}

function ProductProvider({ children }) {
  const [tenor, setTenor] = useState(0);
  const [installment, setInstallment] = useState(0);
  const [interestType, setInterestType] = useState("Menurun");
  const [loanFund, setLoanFund] = useState(6000000);
  const [calculation, setCalculation] = useState({});

  async function getProducts() {
    let result = await productAPI.get();
    if (result.status !== "OK") {
      return;
    }
    return result.data.products;
  }

  async function getById(id) {
    let result = await productAPI.getById(id);
    if (result.status !== "OK") {
      return;
    }
    setTenor(result.data.product.tenor[0]);
    setInstallment(result.data.product.installment[0]);
    return result.data.product || {};
  }

  async function calculate(id) {
    let result = await productAPI.calculate(id, { tenor, installment, loanFund, interestType });
    if (result.status !== "OK") {
      setCalculation({});
      return;
    }
    setCalculation(result.data || {});
  }

  async function getConsumedProducts(type) {
    let result = await productAPI.getConsumedProducts(type);
    if (result.status !== "OK") {
      return [];
    }
    return result.data.consumedProducts || [];
  }

  const prodCtx = {
    tenor,
    installment,
    calculation,
    interestType,
    loanFund,
    setLoanFund,
    setInterestType,
    setInstallment,
    setTenor,
    getProducts,
    getById,
    getConsumedProducts,
    calculate,
  };

  const productContextValue = { prodCtx };

  return <productContext.Provider value={productContextValue}>{children}</productContext.Provider>;
}

export { useProductContext };
export default ProductProvider;
