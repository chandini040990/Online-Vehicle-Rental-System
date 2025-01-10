import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from "react-hot-toast";
import Menu from "./components/nav/Menu";
import Footer from "./components/nav/Footer";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UserDashboard from "./pages/user/Dashboard";
import OwnerDashboard from "./pages/owner/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCategory from "./pages/admin/Category";
import AdminProduct from "./pages/admin/Product";
import AdminProducts from "./pages/admin/Products";
import AdminProductUpdate from "./pages/admin/ProductUpdate";
import UserBookings from "./pages/user/Bookings";
import UserProfile from "./pages/user/Profile";
import OwnerBookings from "./pages/owner/Bookings";
import OwnerProfile from "./pages/owner/Profile";
import Cars from "./pages/Cars";
import Search from "./pages/Search";
import ProductView from "./pages/ProductView";
import PrivateRoute from "./components/routes/PrivateRoute";
import OwnerRoute from "./components/routes/OwnerRoute";
import AdminRoute from "./components/routes/AdminRoute";
import CategoriesList from "./pages/CategoriesList";
import CategoryView from "./pages/CategoryView";
import Cart from "./pages/Cart";
import AdminBookings from "./pages/admin/Bookings";
import AboutUs from "./components/nav/AboutUs";
import ReviewForm from "./pages/ReviewForm";
import Testimonials from "./pages/Testimonials";
// import BookingForm from "./components/forms/BookingForm";

const PageNotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      404 | Page not found
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/category/:slug" element={<CategoryView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/bookings" element={<UserBookings />} />
          <Route path="user/feedback" element={<ReviewForm />} />
        </Route>
        <Route path="/dashboard" element={<OwnerRoute />}>
          <Route path="owner" element={<OwnerDashboard />} />
          <Route path="owner/profile" element={<OwnerProfile />} />
          <Route path="owner/bookings" element={<OwnerBookings />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/category" element={<AdminCategory />} />
          <Route path="admin/product" element={<AdminProduct />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route
            path="admin/product/update/:slug"
            element={<AdminProductUpdate />}
          />
          <Route path="admin/bookings" element={<AdminBookings />} />
        </Route>
        <Route path="*" element={<PageNotFound />} replace />
        {/* <Route path="/update/product" element={<BookingForm />} /> */}
      </Routes>

      <Testimonials />
      <AboutUs />
      <Footer />
    </BrowserRouter>
  );
}