import { createContext, useContext, useState } from "react";
import productAPI from "../api/productAPI";

const productContext = createContext();

function useProductContext() {
  return useContext(productContext);
}

function ProductProvider({ children }) {
  const [tenor, setTenor] = useState(12);
  const [installment, setInstallment] = useState(0);
  const [interestType, setInterestType] = useState("Menurun");
  const [loanFund, setLoanFund] = useState(6000000);

  const [calculation, setCalculation] = useState({});

  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);

  async function getProducts() {
    let result = await productAPI.get();
    if (result.status !== "OK") {
      return;
    }
    setProducts(result.data.products || []);
  }

  async function getById(id) {
    let result = await productAPI.getById(id);
    if (result.status !== "OK") {
      return;
    }
    setProduct(result.data.product || {});
    setTenor(result.data.product.tenor[0]);
    setInstallment(result.data.product.installment[0]);
  }

  async function calculate(id) {
    let result = await productAPI.calculate(id, { tenor, installment, loanFund, interestType });
    if (result.status !== "OK") {
      setCalculation({});
      return;
    }
    setCalculation(result.data || {});
  }

  const productContexts = {
    product,
    products,
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
    calculate,
  };

  const productContextValue = { productContexts };

  return <productContext.Provider value={productContextValue}>{children}</productContext.Provider>;
}

export { useProductContext };
export default ProductProvider;
