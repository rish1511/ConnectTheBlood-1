import { useNavigate } from "react-router-dom";
import Navbar from "../components/sharedComponets/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-8 py-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-red-600">Dashboard</p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              Welcome, {user.fullName || "User"}
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Manage your blood donor profile and requests from one place.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            Logout
          </button>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Role</p>
            <p className="mt-2 text-xl font-semibold capitalize text-gray-900">
              {user.role || "Not set"}
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Blood Group</p>
            <p className="mt-2 text-xl font-semibold text-gray-900">
              {user.bloodGroup || "Not set"}
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Location</p>
            <p className="mt-2 text-xl font-semibold text-gray-900">
              {user.location || "Not set"}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
