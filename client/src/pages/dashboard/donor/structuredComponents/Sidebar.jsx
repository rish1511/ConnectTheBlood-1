import {
  HeartPulse,
  History,
  LayoutDashboard,
  User,
} from "lucide-react";
import DashboardSidebar from "../../../../components/commonDashboard/DashboardSidebar";

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
  return <DashboardSidebar menuItems={menuItems} panelLabel="Donor Workspace" />;
};

export default Sidebar;
