import {
  LayoutDashboard,
  HeartPulse,
  MapPin,
  History,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BacktoHome from "../../../../components/structuredComponent/BacktoHome";
import BacktoHomeForDashboard from "../../../../components/structuredComponent/backToHomeForDashboard";
import Logout from "../../../../components/sharedComponets/Logout";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard/donor",
  },
  {
    title: "Emergency Requests",
    icon: HeartPulse,
    path: "/dashboard/donor/emergency-requests",
  },
  // {
  //   title: "Nearby Recipients",
  //   icon: MapPin,
  // },
  {
    title: "Donation History",
    icon: History,
    path: "/dashboard/donor/donation-history",
  },
  // {
  //   title: "Profile",
  //   icon: User,
  // },
  // {
  //   title: "Settings",
  //   icon: Settings,
  // },
];

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-[280px] bg-white border-r border-gray-200 h-screen p-5 hidden lg:flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 pb-8 border-b border-gray-100">
        <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-xl">
          🩸
        </div>

        <div>
          <h2 className="font-bold text-gray-900">Connect The Blood</h2>

          <p className="text-sm text-gray-500">Donor Panel</p>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 mt-8 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={index}
              onClick={() => item.path && navigate(item.path)}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-700 hover:bg-red-50 hover:text-red-500 transition-all duration-300"
            >
              <Icon className="w-5 h-5" />

              <span className="font-medium text-sm">{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="space-y-3">
        <BacktoHomeForDashboard/>

        {/* Logout */}
       <Logout/>
      </div>
    </aside>
  );
};

export default Sidebar;
