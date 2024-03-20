import { useContext} from "react";
import { ProductContext } from "./Store";
import ProductListItem from "./ProductListItem";
import "../styles/Product.css"

export default function ProductList() {
  const products = useContext(ProductContext).products;

  return (
    <div className="list">
      {products && products.map((product, index) => (
        <ProductListItem key={index} product={product} />
      ))}
    </div>
  );
}
