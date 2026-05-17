import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AuthLeftPage from "../components/structuredComponent/AuthLeftPage";
import { registerUser } from "../Api/authApi";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  
  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    bloodGroup: "",
    city: "",
    phone: "",
    role: "seeker",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValue =
      name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;

    setForm((prev) => ({
      ...prev,
      [name]: nextValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (form.password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }

      if (!/^\d{10}$/.test(form.phone)) {
        toast.error("Phone number must be exactly 10 digits");
        return;
      }

      const response = await registerUser(form);

      // token save
      localStorage.setItem("token", response.data.token);

      // user save
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Signup successful");

      navigate("/login");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );

          const data = await response.json();

          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "";
          const state = data.address.state || "";

          setForm((prev) => ({
            ...prev,
             city: `${city}, ${state}`,
          }));
        } catch (error) {
          console.log("Location fetch failed", error);
        }
      },
      (error) => {
        console.log("Location permission denied", error);
      },
    );
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Side */}
      <AuthLeftPage />

      {/* Right Form */}
      <div className="flex flex-1 items-center justify-center px-8 py-6">
        <div className="w-full max-w-sm">
          <h2 className="mb-1 text-2xl font-bold text-gray-900">
            Create account
          </h2>

          <p className="mb-6 text-sm text-gray-500">
            Create your account and join our blood donation community.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                placeholder="Rishabh Sharma"
                value={form.fullName}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-red-400"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-red-400"
                required
              />
            </div>

            {/* Password */}
             <div>
              <div className="mb-1 flex items-center justify-between">
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
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="9876543210"
                value={form.phone}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={10}
                pattern="\d{10}"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-red-400"
                required
              />
            </div>

            <div className="flex gap-4">
              {/* Blood Group */}
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Blood Group
                </label>

                <select
                  name="bloodGroup"
                  value={form.bloodGroup}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-red-400"
                  required
                >
                  <option value="">Select</option>

                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  placeholder="Bhopal, MP"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-red-400"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-red-500 py-2 font-medium text-white transition hover:bg-red-600"
            >
              Create account
            </button>
          </form>

          <p className="mt-3 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-red-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
