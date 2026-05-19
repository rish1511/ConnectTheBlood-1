import { Navigate, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import AdminUsersPage from "../pages/dashboard/admin/AdminUsersPage";
import AdminAnalyticsPage from "../pages/dashboard/admin/AdminAnalyticsPage";
import AdminUserViewPage from "../pages/dashboard/admin/AdminUserViewPage";
import DonorDashboard from "../pages/dashboard/donor/DonorDashboard";
import DonorEmergencyRequests from "../pages/dashboard/donor/DonorEmergencyRequests";
import DonorDonationHistory from "../pages/dashboard/donor/DonorDonationHistory";
import RecipientDashboard from "../pages/dashboard/recipient/RecipientDashboard";
import RecipientNearbyDonors from "../pages/dashboard/recipient/RecipientNearbyDonors";
import RecipientNewRequest from "../pages/dashboard/recipient/RecipientNewRequest";
import RecipientRequestHistory from "../pages/dashboard/recipient/RecipientRequestHistory";
import BloodBankDashboard from "../pages/dashboard/bloodBank/BloodBankDashboard";
import ForgotPassword from "../components/UI/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";
import HowItWorks from "../pages/HowItsWorks";
import About from "../pages/About";
import Blogs from "../pages/Blogs";
import DonorProfile from "../pages/dashboard/donor/DonorProfile";

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
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/admin/users" element={<AdminUsersPage />} />
        <Route path="/dashboard/admin/users/:id" element={<AdminUserViewPage />} />
        <Route path="/dashboard/admin/analytics" element={<AdminAnalyticsPage />} />
        <Route path="/dashboard/donor" element={<DonorDashboard />} />
        <Route path="/dashboard/donor/profile" element={<DonorProfile />} />
        <Route
          path="/dashboard/donor/emergency-requests"
          element={<DonorEmergencyRequests />}
        />
        <Route
          path="/dashboard/donor/donation-history"
          element={<DonorDonationHistory />}
        />
        <Route
          path="/dashboard"
          element={<Navigate to="/dashboard/donor" replace />}
        />
        <Route path="/dashboard/recipient" element={<RecipientDashboard />} />
        <Route
          path="/dashboard/recipient/new-request"
          element={<RecipientNewRequest />}
        />
        <Route
          path="/dashboard/recipient/request-history"
          element={<RecipientRequestHistory />}
        />
        <Route
          path="/dashboard/recipient/nearby-donors"
          element={<RecipientNearbyDonors />}
        />
        <Route path="/dashboard/blood-bank" element={<BloodBankDashboard />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
