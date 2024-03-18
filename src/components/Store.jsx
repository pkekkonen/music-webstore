import { createContext, useEffect, useState } from "react";
import Header from "./Header";
import Body from "./Body"
import dummyUsers from "../../dummy-data/users";
import dummyProducts from "../../dummy-data/products";

const UserContext = createContext();
const ProductContext = createContext();
const CartContext = createContext();

function Store() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({});

  function fetchProducts() {
    setProducts(dummyProducts);
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
      <UserContext.Provider value={{ user }}>
        <CartContext.Provider value={{ cart }}>
          <ProductContext.Provider value={{ products }}>
            <Header />
            <Body />
          </ProductContext.Provider>
        </CartContext.Provider>
      </UserContext.Provider>
    </>
  );
}
export  {Store, ProductContext};
