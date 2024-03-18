import { createContext, useEffect, useState } from "react";
import Header from "./Header";
import Body from "./Body"
import dummyUsers from "../../dummy-data/users";

const UserContext = createContext();
const ProductContext = createContext();
const CartContext = createContext();

function Store() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({});

  function fetchProducts() {
    setProducts([]);
  }
  function setGuestUser() {
    setUser(dummyUsers[0]);
  }
  function updateCart(){
    setCart({})
  }
  useEffect(() => {
    fetchProducts();
    setGuestUser();
  }, []);
  useEffect(()=>{
    updateCart()
  },[user])
  return (
    <>
      <UserContext value={{ user }}>
        <CartContext value={{ cart }}>
          <ProductContext value={{ products }}>
            <Header />
            <Body />
          </ProductContext>
        </CartContext>
      </UserContext>
    </>
  );
}
export default Store;
