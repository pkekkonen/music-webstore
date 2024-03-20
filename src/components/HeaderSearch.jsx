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
    <div>
      <input
        name="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={onSearchClick}>Search</button>
    </div>
  );
}
export default HeaderSearch;
