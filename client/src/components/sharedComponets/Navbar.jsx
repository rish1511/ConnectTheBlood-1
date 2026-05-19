import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getDashboardRoute, getStoredUser } from "../../utils/authRoute";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Real auth
  const token =
    localStorage.getItem("token");

  const user = getStoredUser();
  const userRoles = user?.roles?.length ? user.roles : [user?.role];

  const handleLogout = () => {
    // Clear auth
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logout successful");

    navigate("/");
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left Side */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-red-600">
            🩸
          </span>

          <h1 className="text-sm font-semibold text-gray-900">
            Connect The Blood
          </h1>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-md border border-gray-200 p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8 text-sm">
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
        <div className="hidden md:flex items-center gap-3">

          {token ? (
            <>
              {/* Dashboard Button */}
              <Link
                to={getDashboardRoute(userRoles)}
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

      {/* Mobile Menu */}
      <div className={`${menuOpen ? "block" : "hidden"} md:hidden border-t border-gray-200 bg-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
          <Link
            to="/"
            className="block rounded-xl px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/how-it-works"
            className="block rounded-xl px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => setMenuOpen(false)}
          >
            How It Works
          </Link>
          <Link
            to="/about"
            className="block rounded-xl px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/blogs"
            className="block rounded-xl px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => setMenuOpen(false)}
          >
            Blogs
          </Link>

          <div className="pt-3 border-t border-gray-200 space-y-2">
            {token ? (
              <>
                <Link
                  to={getDashboardRoute(userRoles)}
                  className="block rounded-xl border border-red-300 px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full rounded-xl bg-red-600 px-3 py-2 text-base font-medium text-white hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block rounded-xl bg-red-600 px-3 py-2 text-base font-medium text-white hover:bg-red-700"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block rounded-xl border border-red-300 px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
