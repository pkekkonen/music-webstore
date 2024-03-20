import { createContext, useEffect, useState } from "react";
import Header from "./Header";
import Body from "./Body";
import dummyUsers from "../../dummy-data/users";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();
const ProductContext = createContext();
const CartContext = createContext();
const SearchContext = createContext();
const FilterContext = createContext();
const baseUrl = "http://localhost:4000";

function Store() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);
  const navigate = useNavigate();

  function createUser(user) {
    fetch(baseUrl + "/auth/signup", {
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
      .then(() => {
        signInUser(user);
        navigate("/");
      });
  }
  function signInUser(user) {
    fetch(baseUrl + "/auth/signin", {
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
        setCartForSignedInUser();
        navigate("/");
      });
  }

  function setCartForSignedInUser() {
    fetch(baseUrl + "/" + user.id + "/currentOrder", {})
      .then((response) => {
        if (response.status === 400) {
          console.log("HJBDSHHBHJBDSHSDHHDBSHBSD")
          // if the user that signs in doesnt have an open cart
          fetch(baseUrl + user.id + "/orders", {
            method: "POST",
          })
            .then((response) => {
              return response.json();
            })
            .then((responseData) => {
              setCart({ ...cart, id: responseData.data.id });
            });
          return cart;
        } else {

          return response.json();
        }
      })
      .then((responseData) => {
        setCart(responseData.data);
      })
      .catch((error) => {
        console.error("Error fetching current cart:", error);
      });
  }

  function onSetFilters(newFilters) {
    setFilters(newFilters);
  }

  function onSearch(text) {
    console.log(user);
    console.log(cart);

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
    navigate("/");
  }

  function fetchProducts() {
    fetch(baseUrl + "/products", {})
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((responseData) => {
        setProducts(responseData.data);
      })
      .catch((error) => {
        console.error("Error fetching current cart:", error);
      });

    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function fetchCart() {
    console.log(user);
    if (user.role !== "USER") {
      if (localStorage.getItem("cart") === null) {
        setCart([]);
      }
    } else {
      fetch(baseUrl + "/" + user.id + "/currentOrder", {})
        .then((response) => {
          if (response.status === 400) {
            createNewCartForUser();
          } else if (!response.ok) {
            throw new Error("Something went wrong");
          }
          return response.json();
        })
        .then((responseData) => {
          setCart(responseData.data);
        })
        .catch((error) => {
          console.error("Error fetching current cart:", error);
        });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function createNewCartForUser() {
    fetch(baseUrl + user.id + "/orders", {
      method: "POST",
    })
      .then((response) => {
        if (response.status === 404) {
          console.log("User not found.");
        } else if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((responseData) => {
        setCart(responseData.data);
      })
      .catch((error) => {
        console.error("Error creating new cart:", error);
      });
  }

  function setGuestUser() {
    setUser(dummyUsers[0]);
    localStorage.removeItem("user");
  }

  function updateDatabaseCart() {
    fetch(baseUrl + "/" + user.id + "/orders/" + cart.id, {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart.orderLine),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((responseData) => {
        setUser(responseData);
      });
  }

  useEffect(() => {
    let savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(savedUser);
    } else {
      setGuestUser();
    }
    fetchProducts();
    fetchCart();
  }, []);

  // useEffect(() => {
  //   updateCart();
  // }, [user]);

  // useEffect(() => {
  //   console.log(cart);
  // }, [cart]);
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
