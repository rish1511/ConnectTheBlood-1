import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../components/UI/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";
import HowItWorks from "../pages/HowItsWorks";
import About from "../pages/About";
import Blogs from "../pages/Blogs";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/how-it-works" element={<HowItWorks />} />

      <Route path="/about" element={<About />} />

      <Route path="/blogs" element={<Blogs />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
