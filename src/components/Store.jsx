import { createContext, useEffect, useState } from "react";
import Header from "./Header";
import Body from "./Body";
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

      body: JSON.stringify({ ...user, role: "ROLE_USER" }),
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
        console.log(responseData);
        setUser(responseData);
        setCartForSignedInUser(responseData);
        navigate("/");
      });
  }

  function setCartForSignedInUser(user) {
    fetch(baseUrl + "/users/" + user.id + "/currentOrder", {})
      .then((response) => {
        if (response.status === 400) {
          // if the user that signs in doesnt have an open cart
          fetch(baseUrl + "/users/" + user.id + "/orders", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
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
    setSearch(text);
  }
  function addToCart(product) {
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
      updatedCart = {
        ...cart,
        orderLine: [
          ...cart.orderLine,
          { product: { id: product.id, title: product.title }, quantity: 1 },
        ],
      };
      setCart(updatedCart);
    }

    if (user.role === "ROLE_USER") {
      updateDatabaseCart(updatedCart);
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  useEffect(() => {}, [cart]);

  function updateDatabaseCart(updatedCart) {
    console.log(updatedCart);
    console.log(updatedCart);
    fetch(baseUrl + "/users/" + user.id + "/orders/" + updatedCart.id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderLine: updatedCart.orderLine.map((p) => ({
          product: p.product.id,
          quantity: p.quantity,
        })),
      }),
    }).then((response) => {
      console.log(
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA  "
      );
      console.log(response);
    });
  }

  function removeFromCart(id) {
    const updatedCart = {
      ...cart,
      orderLine: cart.orderLine.filter((p) => p.product.id != id),
    };
    setCart(updatedCart);
    console.log(updatedCart);
    console.log(typeof user);
    console.log(updatedCart);
    console.log(typeof user);
    if (user.role === "ROLE_USER") {
      console.log("dgshh");
      console.log("dgshh");
      updateDatabaseCart(updatedCart);
    }
  }
  function checkoutCart() {
    if (user.role != "GUEST") {
      fetch(baseUrl + "/users/" + user.id + "/currentOrder/checkout", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      })
        .then((response) => {
          if (!response.ok) {
            console.log(response)
            throw new Error("Something went wrong");
          }
          return response.json();
        })
        .then(() => {
          fetchCart();
        })
        .catch((error) => {
          console.error("Error checking out cart:", error);
        });
    } else {
      const currentDateTime = new Date(); // Get the current date and time
      const offsetMinutes = currentDateTime.getTimezoneOffset(); // Get the offset in minutes
      const offsetDateTime = new Date(
        currentDateTime.getTime() - offsetMinutes * 60000
      ); // Apply offset to get UTC time

      fetch(baseUrl + "/users/" + user.id + "/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: offsetDateTime,
          orderLine: cart.orderLine.map((p) => ({
            product: p.product.id,
            quantity: p.quantity,
          })),
        }),
      }).then((response) => {
        setCart({ orderLine: [] });
        localStorage.removeItem("cart");
        console.log(
          "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA  "
        );
        console.log(response);
      });
    }
  }

  function fetchProducts() {
    fetch(baseUrl + "/products", {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    })
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
  function removeProduct(id) {
    console.log(user);

    fetch(baseUrl + `/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData.data);
        setProducts(products.filter((p) => p.id != responseData.data.id));
        navigate("/");
      })
      .catch((error) => {
        console.error("Error fetching current cart:", error);
      });
  }

  function fetchCart() {

    if (user.role !== "ROLE_USER") {
      if (localStorage.getItem("cart") === null) {
        setCart({ orderLine: [] });
      } else {
        const savedCart = localStorage.getItem("cart");
        if (typeof savedCart === JSON) {
          setCart(savedCart);
        } else {
          setCart(JSON.parse(savedCart));
        }
      }
    } else {
      fetch(baseUrl + "/users/" + user.id + "/currentOrder", {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 400) {
            console.log("HHHHHHHHH")
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
            localStorage.setItem("cart", JSON.stringify(responseData.data));
          }
        });
    }
  }

  function createNewCartForUser() {
    fetch(baseUrl + "/users/" + user.id + "/orders", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
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
    if (localStorage.getItem("guestUser")) {
      setUser(JSON.parse(localStorage.getItem("guestUser")));
      localStorage.setItem("user", localStorage.getItem("guestUser"));
    } else {
      fetch(baseUrl + "/users/guest")
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          setUser(responseData.data);
          console.log(responseData.data);
          localStorage.setItem("guestUser", JSON.stringify(responseData.data));
          localStorage.setItem("user", responseData.data);
        });
    }
  }

  useEffect(() => {
    let savedUser = localStorage.getItem("user");
    if (savedUser) {
      if (typeof savedUser === JSON) {
        setUser(savedUser);
      } else {
        console.log(savedUser);
        setUser(JSON.parse(savedUser));
      }
    } else {
      setGuestUser();
    }
    fetchProducts();
    fetchCart();
  }, []);

  useEffect(() => {
    fetchCart();
    console.log(user);
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
          <ProductContext.Provider value={{ products, removeProduct }}>
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
