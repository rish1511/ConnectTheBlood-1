import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthLeftPage from "../components/structuredComponent/AuthLeftPage";
import { loginUser } from "../Api/authApi";
import { getDashboardRoute } from "../utils/authRoute";

const Login = () => {
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const auth = await loginUser({
      email: form.email,
      password: form.password,
    });

    const { user, token } = auth;

    // Save token
    localStorage.setItem(
      "token",
      token
    );

    // Save user
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    toast.success("Login successful");

    navigate(getDashboardRoute(user?.roles || user?.role));
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
        "Invalid email or password"
    );
  }
};

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-gray-50">
      {/* Left Illustration */}
      <AuthLeftPage />

      {/* Right Form */}
      <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md sm:max-w-lg">
          <h2 className="mb-1 text-2xl font-bold text-gray-900">
            Welcome back
          </h2>

          <p className="mb-5 text-sm text-gray-500">
            Login to access your account and
            manage blood donation requests.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Email or Phone */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email or Phone
              </label>

              <input
                type="text"
                name="email"
                placeholder="you@example.com or 9876543210"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-red-400"
                required
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-1">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
              </div>

              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 outline-none focus:ring-2 focus:ring-red-400"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPass(!showPass)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPass ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="accent-red-500"
              />

              <span className="text-sm text-gray-600">
                Remember me
              </span>
            </label>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-red-500 py-3 font-medium text-white transition hover:bg-red-600"
            >
              Login
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-red-500 hover:underline"
            >
              Sign Up
            </Link>
          </p>

          <p className="mt-3 text-center text-xs text-gray-400">
            Secure sign-in experience for
            donors, recipients and managers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
