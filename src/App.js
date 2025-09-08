import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home/Home";
import About from "./Components/About/About/About";
import Menu from "./Components/menu/Menu/Menu";
import BreakFast from "./Components/menu/BreakFast/BreakFast";
import AllProducts from "./Components/menu/AllProducts/allProducts";
import Dishes from "./Components/menu/Dishes/Dishes";
import Drinks from "./Components/menu/Drinks/Drinks";
import Dessart from "./Components/menu/Dessart/Dessart";
import Pages from "./Components/Pages/Pages/Pages";
import NoPage from "./Components/NoPage/NoPage";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import PrivateRoute from "./Components/Auth/PrivateRoute";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import CreateProducts from "./Components/AdminPannel/CreateProducts";
import Users from "./Components/AdminPannel/Users";
import Products from "./Components/AdminPannel/Products";
import { Toaster } from "react-hot-toast";
import EditProduct from "./Components/AdminPannel/EditProduct";
import DashBord from "./Components/AdminPannel/DashBord";
import BookTable from "./Components/BookTable/BookTable";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Profile from "./Components/Profile/Profile";
function App() {
  useEffect((r) => {
    Aos.init({ duration: 800 });
  }, []);
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={true} />
      <NavBar />
      <Routes>
        {/* Here for all Compnent in NavBary */}
        <>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </>
        {/* Here for End all Compnent in NavBary */}

        {/* Here for OutLet to Menu */}
        <>
          <Route
            path="/menu"
            element={<Menu />}
            children={<Route path="/menu" element={<AllProducts />} />}
          />
          <Route
            path="menu"
            element={<Menu />}
            children={<Route path="/menu/breakfast" element={<BreakFast />} />}
          />
          <Route
            path="menu"
            element={<Menu />}
            children={<Route path="/menu/dishes" element={<Dishes />} />}
          />
          <Route
            path="menu"
            element={<Menu />}
            children={<Route path="/menu/drink" element={<Drinks />} />}
          />
          <Route
            path="menu"
            element={<Menu />}
            children={<Route path="/menu/dessart" element={<Dessart />} />}
          />
        </>
        {/* Here End for OutLet to Menu */}

        {/* Here For DashBord */}
        <>
          <Route
            path="/admin/dashbord"
            element={<DashBord />}
          />
          <Route
            path="/admin/dashbord"
            element={<DashBord />}
            children={
              <Route
                path="/admin/dashbord/create"
                element={<CreateProducts />}
              />
            }
          />
          <Route
            path="/admin/dashbord"
            element={<DashBord />}
            children={
              <Route path="/admin/dashbord/users" element={<Users />} />
            }
          />
          <Route
            path="/admin/dashbord"
            element={<DashBord />}
            children={
              <Route path="/admin/dashbord/products" element={<Products />} />
            }
          />
          <Route
            path="/admin/dashbord"
            element={<DashBord />}
            children={
              <Route
                path="/admin/dashbord/products/:id/edit"
                element={<EditProduct />}
              />
            }
          />
        </>
        {/* Here For End DashBord */}
        {/* Here for all Compnent in NavBary */}
        <>
          <Route path="pages" element={<Pages />} />
          <Route path="*" element={<NoPage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/booktable" element={<BookTable />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </>
        {/* Here for End all Compnent in NavBary */}
      </Routes>
      <Footer />
    </div>
  );
}
export default App;

