import ProductBrowse from "./ProductBrowse";
import { Route, Routes } from "react-router-dom";
import ViewProduct from "./ViewProduct";

function Body() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductBrowse />} />
        <Route path="/products/:id" element={<ViewProduct />} />
      </Routes>
    </>
  );
}
export default Body;
