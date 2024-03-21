import { useContext, useState } from "react";
import { CartContext } from "./Store";

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
      <>
        {cart.orderLine.map((product) => {
          return (
            <div key={product.product.id}>
              <p>
                <span>{product.product.title}</span>
                <span>{product.quantity}</span>
                <button value={product.product.id} onClick={onRemove}>
                  Remove
                </button>
              </p>
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
