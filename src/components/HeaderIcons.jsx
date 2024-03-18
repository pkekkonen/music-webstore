import { Link } from "react-router-dom";

function HeaderIcons() {
  function onSignOut(){
    console.log('signOut')
  }
    return (
    <>
      <div>
        <button onClick={onSignOut}>Sign out</button>
        <Link to="/cart">
          <div>cart</div>
        </Link>
      </div>
    </>
  );
}
export default HeaderIcons;
