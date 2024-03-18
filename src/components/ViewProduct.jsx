import { useContext, useEffect, useState } from "react";
import { ProductContext } from "./Store";
import { useParams } from "react-router-dom";
import BuyProduct from "./BuyProduct";
import ProductFacts from "./ProductFacts";

function ViewProduct() {
  const productsContext = useContext(ProductContext);
  const { id } = useParams();
  const { products } = productsContext;
  const [product, setProduct] = useState({});
  useEffect(() => {
    setProduct(products.find((p) => p.id == id));
  }, [products, id]);
  if (product) {
    return (
      <>
        <BuyProduct product={product} />
        <hr/>
        <ProductFacts product={product} />
      </>
    );
  }
  return <>Loading...</>;
}
export default ViewProduct;
