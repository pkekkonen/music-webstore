/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "../styles/Product.css";
import placeholder from "../../assets/music-vinyl-placeholder.png";

export default function ProductListItem({ product }) {
  return (
    <div className="item">
      <Link to={`/products/${product.id}`}>
        <img src={placeholder} />
        <div className="item-text">
          <h3 className="item-title">{product.artist+" - "+product.title}</h3>
          <h5>{product.artist}</h5>
          <p>{"$"+product.price}</p>
        </div>
      </Link>
    </div>
  );
}
