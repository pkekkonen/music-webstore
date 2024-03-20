/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "../styles/Product.css"

export default function ProductListItem({ product }) {
  return (
    <div className="item">
      <Link to={`/products/${product.id}`}>{product.title}</Link>
    </div>
  );
}
