import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./Store";

function HeaderIcons() {
  const userContext = useContext(UserContext);
  const { setGuestUser, user } = userContext;

  const navigate = useNavigate();
  function onSignOut() {
    setGuestUser();
    console.log("signOut");
  }
  if (user) {
    return (
      <>
        <div className="header-icons">
          {user.role != "GUEST" && (
            <>
              <span>{user.name}</span>
              <button onClick={onSignOut}>Sign out</button>
            </>
          )}
          {user.role === "GUEST" && (
            <>
              <button
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </button>
              <button
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Sign In
              </button>
            </>
          )}

          <button
            onClick={() => {
              navigate("/cart");
            }}
          >
            To cart
          </button>
        </div>
      </>
    );
  }
  return <>Loading...</>;
}
export default HeaderIcons;
