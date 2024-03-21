import { useContext, useState } from "react";
import { CartContext } from "./Store";
import placeholder from "../../assets/music-vinyl-placeholder.png";

function Cart() {
  const cartContext = useContext(CartContext);
  const { cart, checkoutCart, removeFromCart } = cartContext;
  const [checkedOut, setCheckedOut] = useState(false);

  function onCheckout() {
    console.log(cart);
    checkoutCart();
    console.log(cart);
    setCheckedOut(true)
  }
  function onRemove(event) {
    const id = event.target.value;
    removeFromCart(id);
  }

    if (checkedOut) {
      return <>Thank you for your purchase!</>;
    }
  if (cart) {
    return (
      <div className="cart">
        {cart.orderLine.map((product) => {
          return (
            <div className="cart-item" key={product.product.id}>
              <img src={placeholder} />
              <strong>{product.product.title}</strong>
              <span>{"x "+product.quantity}</span>
              <button value={product.product.id} onClick={onRemove}>
                Remove
              </button>
            </div>
          );
        })}

        {cart.orderLine && <button onClick={onCheckout}>Check out</button>}
      </>
    );
  } 

  return <>Loading...</>;
}
export default Cart;
