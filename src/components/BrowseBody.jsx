import ProductList from "./ProductList";

export default function BrowseBody() {
  const handleSortSelection = (event) => {
    console.log(event.target.value);
  };

  return (
    <>
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
      <ProductList />
    </>
  );
}
