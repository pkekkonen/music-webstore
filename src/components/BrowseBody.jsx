import { useContext } from "react";
import { ProductContext } from "./Store";
import ProductList from "./ProductList";

export default function BrowseBody() {
  return <ProductList />;
}
