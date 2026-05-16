import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe } from "../api/authApi";

const ProtectedRoute = () => {
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getMe();

        console.log(response);

        const currentUser = response.user;

        // refresh user data
        localStorage.setItem("user", JSON.stringify(currentUser));

        setUser(currentUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);

        // invalid token
        localStorage.removeItem("token");

        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Role protection
  const currentPath = location.pathname;

  const roleRoutes = {
    donor: "/dashboard/donor",
    seeker: "/dashboard/recipient",
    bloodbank: "/dashboard/blood-bank",
    admin: "/dashboard/admin",
  };

  const allowedRoute = roleRoutes[user?.role];

  if (allowedRoute && !currentPath.startsWith(allowedRoute)) {
    return <Navigate to={allowedRoute} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
