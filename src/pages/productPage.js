import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Navbar } from "../components/interface/Navbar";
import { Product } from "../components/interface/Product";
import { Calculator } from "../components/interface/Calculator";
import { Installment } from "../components/interface/Installment";
import { useProductContext } from "../context/productContext";

function ProductPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { productContexts } = useProductContext();
  const { id } = useParams();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    productContexts.getById(id);
  }, [id]);

  return (
    <div>
      <Navbar />
      <Installment isOpen={isOpen} closeModal={closeModal} installment={productContexts.calculation.installment}/>
      <div className="mt-28 w-5/6 mx-auto">
        <p className="font-sourcecodepro font-bold text-3xl mb-4">{productContexts.product.name}</p>
        <div className="flex space-x-6">
          <div>
            <Product product={productContexts.product} />
          </div>
          <div className="grow">
            <Calculator id={id} product={productContexts.product} installment={openModal}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProductPage };
