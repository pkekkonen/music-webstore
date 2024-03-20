import { Link } from "react-router-dom";
import HeaderIcons from "./HeaderIcons";
import HeaderSearch from "./HeaderSearch";
import "../styles/Header.css";
function Header() {
  return (
    <div className="header">
   
        <Link to="/">
          <div>Bobs Bangers</div>
        </Link>
        <HeaderSearch />
        <HeaderIcons />

    </div>
  );
}
export default Header;
