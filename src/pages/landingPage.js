import { useEffect, Fragment } from "react";

import { About } from "../components/interface/About";
import { Footer } from "../components/interface/Footer";
import { Intro } from "../components/interface/Intro";
import { Location } from "../components/interface/Location";
import { Navbar } from "../components/interface/Navbar";
import { Product } from "../components/interface/Product";
import { Heading } from "../components/interface/Heading";
import { useProductContext } from "../context/productContext";

function LandingPage() {
  const { productContexts } = useProductContext();

  useEffect(() => {
    productContexts.getProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <Intro />
      <Heading text="Produk" id="product" />
      <div className="grid grid-cols-3 mx-20">
        {productContexts.products.map((product) => {
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
