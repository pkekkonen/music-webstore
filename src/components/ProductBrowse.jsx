import BrowseBody from "./BrowseBody";
import Sidebar from "./Sidebar";
import "../styles/Product.css"

function ProductBrowse() {
  return (
    <div className="product-body">
      <Sidebar />
      <BrowseBody />
    </div>
  );
}
export default ProductBrowse;
