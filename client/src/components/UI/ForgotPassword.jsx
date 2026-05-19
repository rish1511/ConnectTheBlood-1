import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import AuthLeftPage from "../structuredComponent/AuthLeftPage";
import { resetPassword } from "../../Api/authApi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setSubmitting(true);

    try {
      await resetPassword({
        phone: form.phone.trim(),
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      toast.success("Password reset successful");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to reset password. Please check your phone number",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AuthLeftPage />

      <div className="flex flex-1 items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">Reset your password</h2>
          <p className="mt-2 text-sm text-gray-500">
            Enter the phone number linked to your account and choose a new password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 mt-8">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Phone number
              </label>
              <input
                type="tel"
                name="phone"
                maxLength={10}
                placeholder="0123456789"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                New password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter new password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-red-400"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Confirm new password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Repeat new password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Resetting password..." : "Reset password"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Remembered your password?{' '}
            <Link to="/login" className="font-semibold text-red-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
