/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function ProductListItem({ product }) {
  return (
    <>
      <Link to={`/products/${product.id}`}>{product.title}</Link>
    </>
  );
}
