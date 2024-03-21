import { useContext, useState } from "react";
import { SearchContext } from "./Store";

function HeaderSearch() {
  const searchContext = useContext(SearchContext);
  const { onSearch } = searchContext;
  const [search, setSearch] = useState("");
  function onSearchClick() {
    onSearch(search);
  }
  return (
    <div className="header-search">
      <input className="header-search-input"
        name="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="header-search-button" onClick={onSearchClick}>Search</button>
    </div>
  );
}
export default HeaderSearch;
