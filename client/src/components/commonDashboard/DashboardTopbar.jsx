import { Bell, User } from "lucide-react";

const DashboardTopbar = ({
  user,
  fallbackName,
  subtitle,
  meta,
}) => {
  return (
    <div className="flex flex-col gap-4 rounded-[28px] border border-gray-100 bg-white px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-500">
          Welcome,{" "}
          <span className="text-red-700">{user?.fullName || fallbackName}</span>
        </h1>

        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 transition hover:bg-red-50"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-gray-700" />
          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500" />
        </button>

        <div className="flex cursor-pointer items-center gap-3 rounded-2xl bg-gray-100 px-3 py-2 transition hover:bg-gray-200">
          <User className="h-5 w-5 text-gray-700" />

          <div className="hidden lg:block">
            <h3 className="text-sm font-semibold text-gray-900">
              {user?.fullName || fallbackName}
            </h3>
            <p className="text-xs text-gray-500">{meta}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopbar;
