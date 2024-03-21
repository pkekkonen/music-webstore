import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./Store";

function HeaderIcons() {
  const userContext = useContext(UserContext);
  const { setGuestUser } = userContext;

  const navigate = useNavigate();
  function onSignOut() {
    setGuestUser();
    console.log("signOut");
  }
  return (
    <>
      <div className="header-icons">
        <button onClick={onSignOut}>Sign out</button>
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
export default HeaderIcons;
