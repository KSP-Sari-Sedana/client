import { createContext, useContext, useState } from "react";
import productAPI from "../api/productAPI";

const productContext = createContext();

function useProductContext() {
  return useContext(productContext);
}

function ProductProvider({ children }) {
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
  }

  const productContexts = {
    product,
    products,
    getProducts,
    getById,
  };

  const productContextValue = { productContexts };

  return <productContext.Provider value={productContextValue}>{children}</productContext.Provider>;
}

export { useProductContext };
export default ProductProvider;
