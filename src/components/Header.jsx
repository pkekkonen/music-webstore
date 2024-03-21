import { Link } from "react-router-dom";
import HeaderIcons from "./HeaderIcons";
import HeaderSearch from "./HeaderSearch";
import "../styles/Header.css";
import banner from "../../assets/banner.png"
function Header() {
  return (
    <div className="header">
   
        <Link to="/">
          <div className="banner"><img src={banner}/></div>
        </Link>
        <HeaderSearch />
        <HeaderIcons />

    </div>
  );
}
export default Header;
