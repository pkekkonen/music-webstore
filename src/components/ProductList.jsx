import { useContext} from "react";
import { ProductContext } from "./Store";
import ProductListItem from "./ProductListItem";

export default function ProductList() {
  const products = useContext(ProductContext).products;

  return (
    <>
      {products && products.map((product, index) => (
        <ProductListItem key={index} product={product} />
      ))}
    </>
  );
}
