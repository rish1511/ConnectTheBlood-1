import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getDashboardRoute, getStoredUser } from "../../utils/authRoute";

const Navbar = () => {
  const navigate = useNavigate();

  // Real auth
  const token =
    localStorage.getItem("token");

  const user = getStoredUser();

  const handleLogout = () => {
    // Clear auth
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logout successful");

    navigate("/");
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">

        {/* Left Side */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-red-600">
            🩸
          </span>

          <h1 className="text-sm font-semibold text-gray-900">
            Connect The Blood
          </h1>
        </div>

        {/* Center Links */}
        <div className="flex items-center gap-8 text-sm">
          <Link
            to="/"
            className="text-gray-800 transition hover:text-red-600"
          >
            Home
          </Link>

          <Link
            to="/how-it-works"
            className="text-gray-600 transition hover:text-red-600"
          >
            How It Works
          </Link>

          <Link
            to="/about"
            className="text-gray-600 transition hover:text-red-600"
          >
            About
          </Link>

          <Link
            to="/blogs"
            className="text-gray-600 transition hover:text-red-600"
          >
            Blogs
          </Link>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-3">

          {token ? (
            <>
              {/* Dashboard Button */}
              <Link
                to={getDashboardRoute(user?.role)}
                className="rounded-md border border-red-300 px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
              >
                Dashboard
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="rounded-md bg-red-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login Button */}
              <Link
                to="/login"
                className="rounded-md bg-red-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-red-700"
              >
                Login
              </Link>

              {/* Signup Button */}
              <Link
                to="/signup"
                className="rounded-md border border-red-300 px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
