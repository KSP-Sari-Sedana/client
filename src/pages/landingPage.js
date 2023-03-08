import { useEffect, Fragment, useState } from "react";

import { About } from "../components/interface/About";
import { Footer } from "../components/interface/Footer";
import { Intro } from "../components/interface/Intro";
import { Location } from "../components/interface/Location";
import { Navbar } from "../components/interface/Navbar";
import { Product } from "../components/interface/Product";
import { Heading } from "../components/interface/Heading";
import { useProductContext } from "../context/productContext";

function LandingPage() {
  const [products, setProducts] = useState([]);
  const { prodCtx } = useProductContext();

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    setProducts(await prodCtx.getProducts("publik"));
  }

  return (
    <div>
      <Navbar />
      <Intro />
      <Heading text="Produk" id="product" />
      <div className="flex flex-col gap-y-5 sm:flex-row sm:gap-x-10 justify-center">
        {products.map((product) => {
          return (
            <Fragment key={product.id}>
              <Product product={product} isPreview={true} />
            </Fragment>
          );
        })}
      </div>
      <Heading text="Lokasi" id="location" />
      <Location />
      <Heading text="Tentang" id="about" />
      <About />
      <Footer />
    </div>
  );
}

export { LandingPage };
