import { useContext } from "react";
import { CartContext } from "./Store";

/* eslint-disable react/prop-types */
function BuyProduct({ product }) {
  const cartContext = useContext(CartContext);
  const { addToCart } = cartContext;
  function onBuy() {
    addToCart(product);
  }
  if (product) {
    return (
      <>
        <>
          <div>album here</div>
          <div>
            <h2>{product.artist + " - " + product.title}</h2>
            <h4>{product.artist}</h4>
            <div>{product.price}</div>
            <button onClick={onBuy}>Add to Cart</button>
          </div>
        </>
      </>
    );
  }
}
export default BuyProduct;
