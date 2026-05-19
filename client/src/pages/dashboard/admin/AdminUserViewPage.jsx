import { ArrowLeft, CalendarDays, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";

import AdminShell from "./structuredComponents/AdminShell";
import useAdminDashboardData from "./useAdminDashboardData";

const formatDate = (date) =>
  date
    ? new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(date))
    : "N/A";

const AdminUserViewPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { dashboard, loading, error } = useAdminDashboardData();

  const routedUser = location.state?.user;
  const user = routedUser || dashboard.users.find((item) => item._id === id);
  const userRoles = user?.roles?.length ? user.roles : [user?.role].filter(Boolean);

  return (
    <AdminShell loading={loading} error={error} loadingText="Loading user profile...">
      {user ? (
        <section className="mt-6 rounded-[28px] border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <Link
              to="/dashboard/admin/users"
              className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to users
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Full Name</p>
              <p className="mt-1 text-lg font-bold text-gray-900">{user.fullName || "N/A"}</p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Roles</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {userRoles.map((role) => (
                  <span
                    key={role}
                    className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold capitalize text-red-700"
                  >
                    {role === "seeker" ? "recipient" : role}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Contact</p>
              <p className="mt-2 inline-flex items-center gap-2 text-sm text-gray-700">
                <Mail className="h-4 w-4 text-gray-500" />
                {user.email || "N/A"}
              </p>
              <p className="mt-2 inline-flex items-center gap-2 text-sm text-gray-700">
                <Phone className="h-4 w-4 text-gray-500" />
                {user.phone || "N/A"}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Location & Blood</p>
              <p className="mt-2 inline-flex items-center gap-2 text-sm text-gray-700">
                <MapPin className="h-4 w-4 text-gray-500" />
                {user.city || "N/A"}
              </p>
              <p className="mt-2 text-sm font-semibold text-red-700">{user.bloodGroup || "N/A"} blood group</p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Verification</p>
              <p className="mt-2 inline-flex items-center gap-2 text-sm text-gray-700">
                <ShieldCheck className="h-4 w-4 text-gray-500" />
                {user.isVerified ? "Verified" : "Pending Verification"}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Created On</p>
              <p className="mt-2 inline-flex items-center gap-2 text-sm text-gray-700">
                <CalendarDays className="h-4 w-4 text-gray-500" />
                {formatDate(user.createdAt)}
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="mt-6 rounded-[28px] border border-gray-100 bg-white p-8 text-center text-sm font-semibold text-gray-500 shadow-sm">
          User not found.
        </section>
      )}
    </AdminShell>
  );
};

export default AdminUserViewPage;
