import ProductList from "./ProductList";
import "../styles/Product.css";
import { useState } from "react";
export default function BrowseBody() {
  const [sort, setSort] = useState("");
  const handleSortSelection = (event) => {
    setSort(event.target.value);
  };

  return (
    <div className="browse">
      <div className="sort">
        <select id="sort-by" onChange={handleSortSelection}>
          <option value="most-popular">Most popular</option>
          <option value="release-date">Latest released</option>
          <option value="title-alphabetically">Title, alphabetically</option>
          <option value="title-reverese-alphabetically">
            Title, reversed alphabetically
          </option>
          <option value="price-low-to-high">Price, low to high</option>
          <option value="price-high-to-low">Price, high to low</option>
        </select>
      </div>
      <ProductList sort={sort} />
    </div>
  );
}
