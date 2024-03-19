import { createContext, useEffect, useState } from "react";
import Header from "./Header";
import Body from "./Body";
import dummyUsers from "../../dummy-data/users";
import dummyProducts from "../../dummy-data/products";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();
const ProductContext = createContext();
const CartContext = createContext();
const SearchContext = createContext();
const FilterContext = createContext()

function Store() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters]= useState([]);
  const navigate = useNavigate()

function createUser(user){
  console.log(user)
  navigate("/")
}


function onSetFilters(newFilters)
{setFilters(newFilters)}

  function onSearch(text) {
    setSearch(text);
  }
  function addToCart(product) {
    if (cart.filter((p) => p.id == product.id).length) {
      setCart(
        cart.map((p) => {
          if (p.id == product.id) {
            return { ...p, quantity: p.quantity + 1 };
          }
          return p;
        })
      );
    } else {
      setCart([
        ...cart,
        { id: product.id, product_title: product.title, quantity: 1 },
      ]);
    }
  }
  function fetchProducts() {
    setProducts(dummyProducts);
  }
  function setGuestUser() {
    setUser(dummyUsers[0]);
  }
  function updateCart() {
    
  }
  useEffect(() => {
    fetchProducts();
    setGuestUser();
  }, []);
  useEffect(() => {
    updateCart();
  }, [user]);

  useEffect(() => {
    console.log(cart);
  }, [cart]);
  return (
    <>
      <UserContext.Provider value={{ user, createUser }}>
        <CartContext.Provider value={{ cart, addToCart }}>
          <ProductContext.Provider value={{ products }}>
            <SearchContext.Provider value={{ search, onSearch }}>
              <FilterContext.Provider value={{filters,onSetFilters}}>
              <Header />
              <Body />
              </FilterContext.Provider>
            </SearchContext.Provider>
          </ProductContext.Provider>
        </CartContext.Provider>
      </UserContext.Provider>
    </>
  );
}
export { Store, UserContext, CartContext, ProductContext, SearchContext };
