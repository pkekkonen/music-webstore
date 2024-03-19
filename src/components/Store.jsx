import { createContext, useEffect, useState } from "react";
import Header from "./Header";
import Body from "./Body";
import dummyUsers from "../../dummy-data/users";
import dummyProducts from "../../dummy-data/products";

const UserContext = createContext();
const ProductContext = createContext();
const CartContext = createContext();
const SearchContext = createContext();
const FilterContext = createContext()

function Store() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({});
  const [search, setSearch] = useState("");
  const [filters, setFilters]= useState([]);

function onSetFilters(newFilters)
{setFilters(newFilters)}

  function onSearch(text){
    setSearch(text)
  }
  function fetchProducts() {
    setProducts(dummyProducts);
  }
  function setGuestUser() {
    setUser(dummyUsers[0]);
  }
  function updateCart() {
    setCart({});
  }
  useEffect(() => {
    fetchProducts();
    setGuestUser();
  }, []);
  useEffect(() => {
    updateCart();
  }, [user]);
  return (
    <>
      <UserContext.Provider value={{ user }}>
        <CartContext.Provider value={{ cart }}>
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
export {Store, UserContext, CartContext,ProductContext,SearchContext};
