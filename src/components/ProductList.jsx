/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "./Store";
import ProductListItem from "./ProductListItem";
import "../styles/Product.css";

export default function ProductList({ sort }) {
  const products = useContext(ProductContext).products;
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    function sortProducts() {
      switch (sort) {
        case "most-popular":
          setSortedProducts([...products]);
          break;
        case "release-date":
          setSortedProducts(
            [...products].sort((a, b) => b.release_year - a.release_year)
          );
          break;
        case "title-alphabetically":
          setSortedProducts(
            [...products].sort((a, b) => a.title.localeCompare(b.title))
          );
          break;
        case "title-reverese-alphabetically":
          setSortedProducts(
            [...products].sort((a, b) => b.title.localeCompare(a.title))
          );
          break;
        case "price-low-to-high":
          setSortedProducts([...products].sort((a, b) => a.price - b.price));
          break;
        case "price-high-to-low":
          setSortedProducts([...products].sort((a, b) => b.price - a.price));
          break;
        default:
          setSortedProducts([...products]);
      }
    }

    sortProducts();
  }, [sort, products]);
  useEffect(() => {
    sortedProducts.map((p) => console.log(p.title));
    console.log("---------");
  }, [sortedProducts]);
  return (
    <div className="list">
      {sortedProducts.map((product, index) => (
        <ProductListItem key={index} product={product} />
      ))}
    </div>
  );
}
