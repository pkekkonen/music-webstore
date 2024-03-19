import { Link, useNavigate } from "react-router-dom";

function HeaderIcons() {
const navigate = useNavigate()
  function onSignOut(){
    console.log('signOut')
  }
    return (
    <>
      <div>
        <button onClick={onSignOut}>Sign out</button>
        <button onClick={()=>{navigate("/signup")}}>Sign Up</button>
        <button onClick={()=>{navigate("/signin")}}>Sign In</button>

        <Link to="/cart">
          <div>cart</div>
        </Link>
      </div>
    </>
  );
}
export default HeaderIcons;
