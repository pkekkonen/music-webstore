import ProductBrowse from "./ProductBrowse";
import { Route, Routes } from "react-router-dom";
import ViewProduct from "./ViewProduct";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Cart from "./Cart";

function Body() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductBrowse />} />
        <Route path="/products/:id" element={<ViewProduct />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}
export default Body;
