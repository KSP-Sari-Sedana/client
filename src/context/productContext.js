import { createContext, useContext, useState } from "react";

const productContext = createContext();

function useProductContext() {
  return useContext(productContext);
}

function ProductProvider({ children }) {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);

  async function getProducts() {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
    result = await result.json();
    if (result.status !== "OK") {
      return;
    }
    setProducts(result.data.products);
  }

  async function getProductById(id) {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
    result = await result.json();
    if (result.status !== "OK") {
      return;
    }
    setProduct(result.data.product);
  }

  const productContexts = {
    product,
    products,
    getProducts,
    getProductById,
  };

  const productContextValue = { productContexts };

  return <productContext.Provider value={productContextValue}>{children}</productContext.Provider>;
}

export { useProductContext };
export default ProductProvider;
