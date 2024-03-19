import { useContext,  } from "react";
import { CartContext } from "./Store";

function Cart() {
  const cartContext = useContext(CartContext);
  const { cart, checkoutCart,removeFromCart } = cartContext;
function onCheckout(){
    checkoutCart()
}
function onRemove(event){
const id = event.target.value
removeFromCart(id)}

  if (cart) {
    return (
      <>
        {cart.map((product) => {
          return (
            <div key={product.id}>
              <p>
                <span>{product.product_title}</span>
                <span>{product.quantity}</span>
                <button value={product.id} onClick={onRemove}>Remove</button>
              </p>
            </div>
          );
        })}
        <button onClick={onCheckout}>Check out</button>
      </>
    );
  }
  return <>Loading...</>;
}
export default Cart;
