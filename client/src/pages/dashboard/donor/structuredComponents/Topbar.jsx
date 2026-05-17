import { Bell, MenuIcon, Search ,User } from "lucide-react";

const Topbar = ({ donor }) => {
  return (
    <div className="flex items-center justify-between rounded-[28px] border border-gray-100 bg-white px-6 py-5 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-500">
          Welcome , <span className="text-red-700">{donor?.fullName || "Donor"}</span>
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening with your donations today.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden w-[260px] items-center gap-2 rounded-2xl bg-gray-100 px-4 py-3 md:flex">
          <Search className="h-4 w-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </div>

        <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 transition hover:bg-red-50">
          <Bell className="h-5 w-5 text-gray-700" />

          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500" />
        </button>

        <div className="flex cursor-pointer items-center gap-3 rounded-2xl bg-gray-100 px-3 py-2 transition hover:bg-gray-200">
          <User className="h-5 w-5 text-gray-700" />

          <div className="hidden lg:block">
            <h3 className="text-sm font-semibold text-gray-900">
              {donor?.fullName || "Donor"}
            </h3>

            <p className="text-xs text-gray-500">
              {donor?.bloodGroup || "N/A"} Blood Donor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
