import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/login_form/Login";
import Sign_up from "./components/sign_up_form/Sign_up";
import Products_Page from "./components/products/Products_Page";
import { useSelector } from "react-redux";
import Product_details from "./components/product_info/Product_details";
import Order_skeleton from "./components/orders/Order_skeleton";
import Confirmed_order from "./components/orders/Confirmed_order";
import Navbar from "./common/navbar/Navbar";
import Add_product from "./components/admin/Add_product";
import Modify_product from "./components/admin/Modify_product";
import Success from "./components/orders/Success";



function App() {

  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)

  return (
     <>
     <BrowserRouter>
     <Routes>

     <Route path="/" element={isAuthenticated ? <Products_Page /> : <Navigate to="/sign_in" />} />
      <Route path="/sign_in" element={<Login/>}></Route>
      <Route path="/sign_up" element={<Sign_up/>}></Route>
      <Route path="/Product_details/:id" element={<Product_details/>}></Route>
      <Route path="/order" element={<Order_skeleton/>}></Route>
      <Route path="/confirmed" element={<Confirmed_order/>}></Route>
      <Route path="/add_product" element={<Add_product/>}></Route>
      <Route path="/modify_product" element={<Modify_product/>}></Route>
      <Route path="/success" element={<Success/>}></Route>
      
     </Routes>
     </BrowserRouter>
     </>
  );
}

export default App;
