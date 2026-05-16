import { Bell, Search } from "lucide-react";

const Topbar = () => {
  return (
    <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm px-6 py-5 flex items-center justify-between">

      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome Back 👋
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Here’s what’s happening with your donations today.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-2xl px-4 py-3 w-[260px]">

          <Search className="w-4 h-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
          />
        </div>

        {/* Notification */}
        <button className="relative w-12 h-12 rounded-2xl bg-gray-100 hover:bg-red-50 flex items-center justify-center transition">

          <Bell className="w-5 h-5 text-gray-700" />

          {/* Red dot */}
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-3 py-2 cursor-pointer hover:bg-gray-200 transition">

          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-11 h-11 rounded-xl object-cover"
          />

          <div className="hidden lg:block">
            <h3 className="text-sm font-semibold text-gray-900">
              Rish
            </h3>

            <p className="text-xs text-gray-500">
              Blood Donor
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Topbar;