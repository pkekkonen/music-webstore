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
        setCartForSignedInUser(responseData);
        navigate("/");
      });
  }

  function setCartForSignedInUser(user) {
    console.log("ccccccccccccccc   ");
    console.log(user);
    fetch(baseUrl + "/users/" + user.id + "/currentOrder", {})
      .then((response) => {
        if (response.status === 400) {
          console.log("HJBDSHHBHJBDSHSDHHDBSHBSD");
          // if the user that signs in doesnt have an open cart
          fetch(baseUrl + "/users/" + user.id + "/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          })
            .then((response) => {
              return response.json();
            })
            .then((responseData) => {
              console.log("lklljjjjjj   ");
              console.log(responseData);
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
    console.log("AAAAAAAAAA    ");
    console.log(cart);
    let updatedCart;
    if (cart.orderLine.filter((p) => p.product.id == product.id).length) {
      updatedCart = {
        ...cart,
        orderLine: cart.orderLine.map((p) => {
          if (p.product.id == product.id) {
            return { ...p, quantity: p.quantity + 1 };
          }
          return p;
        }),
      };
      setCart(updatedCart);
    } else {
      console.log("Hiiii ");
      updatedCart = {
        ...cart,
        orderLine: [
          ...cart.orderLine,
          { product: { id: product.id, title: product.title }, quantity: 1 },
        ],
      };
      setCart(updatedCart);
      console.log({
        ...cart,
        orderLine: [
          ...cart.orderLine,
          { product: { id: product.id, title: product.title }, quantity: 1 },
        ],
      });
    }
    console.log("LALALLA  ");
    console.log(cart);

    console.log(typeof user);

    if (user.role === "USER") {
      updateDatabaseCart(updatedCart);
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  useEffect(() => {
    console.log("CART  ");
    console.log(cart);
  }, [cart]);

  function updateDatabaseCart(updatedCart) {
    console.log("HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE   ");
    console.log(user);
    console.log(updatedCart);
    fetch(baseUrl + "/users/" + user.id + "/orders/" + updatedCart.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderLine: updatedCart.orderLine.map((p) => ({
          product: p.product.id,
          quantity: p.quantity,
        })),
      }),
    })
      .then((response) => {
        console.log(
          "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA  "
        );
        console.log(response);
      })
      .then((responseData) => {});
  }

  function removeFromCart(id) {
    console.log("DIDDIDIIDIDIDIDIID    ")
    console.log(id)
    const updatedCart = {...cart, orderLine: cart.orderLine.filter((p) => p.product.id != id)};
    console.log(updatedCart)
    setCart(updatedCart);
    if (user.role === "USER") {
      updateDatabaseCart(updatedCart);
    }
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
  }

  function fetchCart() {
    console.log(user);
    if (user.role !== "USER") {
      if (localStorage.getItem("cart") === null) {
        setCart({ orderLine: [] });
        console.log("JHSJJSDHASHJDJDHJHJASDHJSDHJHAJSDJHSDJHDJHADHJSDJDJSH");
      } else {
        const savedCart = localStorage.getItem("cart");
        console.log(savedCart)
        if(typeof savedCart === JSON) {
          setCart(savedCart)
        } else {
          setCart(JSON.parse(savedCart))
        }

      }
    } else {
      fetch(baseUrl + "/users/" + user.id + "/currentOrder", {})
        .then((response) => {
          console.log("HDHJhsd");
          console.log(response);

          if (response.status === 400) {
            createNewCartForUser();
            return null;
          } else if (!response.ok) {
            throw new Error("Something went wrong");
          }
          return response.json();
        })
        .then((responseData) => {
          if (responseData) {
            setCart(responseData.data);
            localStorage.setItem("cart", responseData.data);
          }
        });
    }
  }

  function createNewCartForUser() {
    fetch(baseUrl + "/users/" + user.id + "/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date: null }),
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
    localStorage.setItem("user", JSON.stringify(dummyUsers[0]));
  }

  useEffect(() => {
    let savedUser = localStorage.getItem("user");
    if (savedUser) {
      if (typeof savedUser === JSON) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(savedUser);
      }
    } else {
      setGuestUser();
    }
    fetchProducts();
    fetchCart();
  }, []);

  useEffect(() => {
    fetchCart();
  }, [user]);

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
