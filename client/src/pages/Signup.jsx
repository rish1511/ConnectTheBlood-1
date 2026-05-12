import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLeftPage from "../components/structuredComponent/AuthLeftPage";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    bloodGroup: "",
    location: "",
  });

  const bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (form.password.length < 8) {
    alert("Password must be at least 8 characters");
    return;
  }

  // Get existing users
  const existingUsers =
    JSON.parse(localStorage.getItem("users")) || [];

  // Check if email already exists
  const userExists = existingUsers.some(
    (user) => user.email === form.email
  );

  if (userExists) {
    alert("Email already exists");
    return;
  }

  // Create new user
  const newUser = {
    id: Date.now(),
    ...form,
  };

  // Save all users
  const updatedUsers = [
    ...existingUsers,
    newUser,
  ];

  localStorage.setItem(
    "users",
    JSON.stringify(updatedUsers)
  );

  alert("Signup successful");

  navigate("/login");
};

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Side */}
      <AuthLeftPage />

      {/* Right Form */}
      <div className="flex flex-1 items-center justify-center px-8 py-8">
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
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Minimum 8 characters"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-red-400"
                required
              />
            </div>

            {/* Blood Group + Location */}
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

              {/* Location */}
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  placeholder="Bhopal, MP"
                  value={form.location}
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

          <p className="mt-6 text-center text-sm text-gray-500">
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