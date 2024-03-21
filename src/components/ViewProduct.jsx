import { useContext, useEffect, useState } from "react";
import { ProductContext, UserContext } from "./Store";
import { useParams } from "react-router-dom";
import BuyProduct from "./BuyProduct";
import ProductFacts from "./ProductFacts";

function ViewProduct() {
  const productsContext = useContext(ProductContext);
  const userContext = useContext(UserContext);
  const { id } = useParams();
  const { user } = userContext;
  const { products, removeProduct } = productsContext;
  const [product, setProduct] = useState({});

  function onRemove() {
    removeProduct(product.id);
  }

  useEffect(() => {
    setProduct(products.find((p) => p.id == id));
  }, [products, id]);
  if (product && user) {
    return (
      <>
        {user.role === "ADMIN" && <button onClick={onRemove}>Remove</button>}

        <BuyProduct product={product} />
        <hr />
        <ProductFacts product={product} />
      </>
    );
  }
  return <>Loading...</>;
}
export default ViewProduct;
