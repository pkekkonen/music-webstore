import ProductBrowse from "./ProductBrowse";
import { Route, Routes } from "react-router-dom";
import ViewProduct from "./ViewProduct";
import SignUp from "./SignUp";

function Body() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductBrowse />} />
        <Route path="/products/:id" element={<ViewProduct />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}
export default Body;
