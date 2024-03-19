import { Link } from "react-router-dom";
import HeaderIcons from "./HeaderIcons";
import HeaderSearch from "./HeaderSearch";

function Header() {
  return (
    <><Link to="/">
    <div>Bobs Bangers</div>
    </Link>
      <div>
        <HeaderSearch />
        <HeaderIcons/>
      </div>
    </>
  );
}
export default Header;
