import {
  HeartPulse,
  History,
  LayoutDashboard,
  User,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import BacktoHomeForDashboard from "../../../../components/structuredComponent/backToHomeForDashboard";
import Logout from "../../../../components/sharedComponets/Logout";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard/donor",
  },
  {
    title: "Requests",
    icon: HeartPulse,
    path: "/dashboard/donor/emergency-requests",
  },
  {
    title: "History",
    icon: History,
    path: "/dashboard/donor/donation-history",
  },
  {
    title: "Profile",
    icon: User,
    path: "/dashboard/donor/profile",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <aside className="hidden h-screen w-[280px] flex-col border-r border-gray-200 bg-white p-5 lg:flex">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-8">
          <div className="flex h-12 w-12 px-2 items-center justify-center rounded-xl bg-gray-100 text-xl font-bold text-red-600">
            CTB
          </div>

          <div>
            <h2 className="font-bold text-red-900">Connect The Blood</h2>
            <p className="text-sm text-yellow-500">Donor Panel</p>
          </div>
        </div>

        <div className="mt-8 flex-1 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left transition-all duration-300 ${
                  isActive(item.path)
                    ? "bg-red-50 text-green-500"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-500"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.title}</span>
              </button>
            );
          })}
        </div>

        <div className="space-y-3">
          <BacktoHomeForDashboard />
          <Logout />
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-4 border-t border-gray-200 bg-white px-2 py-2 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] lg:hidden">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-medium transition ${
                isActive(item.path)
                  ? "bg-red-50 text-red-500"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default Sidebar;
