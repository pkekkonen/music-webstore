import { useContext } from "react";
import { CartContext } from "./Store";
import placeholder from "../../assets/music-vinyl-placeholder.png";

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
        <div className="buy"> 
          <div className="buy-left">
            <img src={placeholder} />
          </div>
          <div className="buy-right">
            <h2>{product.artist + " - " + product.title}</h2>
            <h4>{product.artist}</h4>
            <div>{"$"+product.price}</div>
            <button onClick={onBuy}>Add to Cart</button>
          </div>
        </div>
      </>
    );
  }
}
export default BuyProduct;
