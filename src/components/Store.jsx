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
const FilterContext = createContext();

function Store() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);
  const navigate = useNavigate();

  function createUser(user) {
    fetch("http://localhost:4000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ ...user, role: "USER" }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            console.log("Email already taken");
            throw new Error("Unauthorized"); // Throw error for unauthorized access
          } else {
            throw new Error("Network response was not ok");
          }
        }
        return response.json();
      })
      .then((responseData) => {
        signInUser(user);
        navigate("/");
      });
  }
  function signInUser(user) {
    fetch("http://localhost:4000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            console.log(" Wrong password or email");
            throw new Error("Unauthorized"); // Throw error for unauthorized access
          } else {
            throw new Error("Network response was not ok");
          }
        }
        return response.json();
      })
      .then((responseData) => {
        localStorage.setItem("user", JSON.stringify(responseData));
        setUser(responseData);
        navigate("/");
      });
  }

  function onSetFilters(newFilters) {
    setFilters(newFilters);
  }

  function onSearch(text) {
    console.log(user)
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
  function removeFromCart(id) {
    setCart(cart.filter((p) => p.id !== id));
  }
  function checkoutCart() {
    console.log(cart);
    navigate("/");
  }
  function fetchProducts() {
    setProducts(dummyProducts);
  }
  function setGuestUser() {
    setUser(dummyUsers[0]);
    localStorage.removeItem("user");
  }
  function updateCart() {}
  useEffect(() => {
    fetchProducts();
    let savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(savedUser);
    } else {
      setGuestUser();
    }
  }, []);
  useEffect(() => {
    updateCart();
  }, [user]);

  useEffect(() => {
    console.log(cart);
  }, [cart]);
  return (
    <>
      <UserContext.Provider
        value={{ user, setUser, setGuestUser, createUser, signInUser }}
      >
        <CartContext.Provider
          value={{ cart, addToCart, removeFromCart, checkoutCart }}
        >
          <ProductContext.Provider value={{ products }}>
            <SearchContext.Provider value={{ search, onSearch }}>
              <FilterContext.Provider value={{ filters, onSetFilters }}>
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
