import {
  ClipboardList,
  LayoutDashboard,
  MapPin,
} from "lucide-react";
import DashboardSidebar from "../../../../components/commonDashboard/DashboardSidebar";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard/recipient",
  },
  {
    title: "New Request",
    icon: ClipboardList,
    path: "/dashboard/recipient/new-request",
  },
  // {
  //   title: "History",
  //   icon: History,
  //   path: "/dashboard/recipient/request-history",
  // },
  {
    title: "Nearby",
    icon: MapPin,
    path: "/dashboard/recipient/nearby-donors",
  },
];

const Sidebar = () => {
  return (
    <DashboardSidebar menuItems={menuItems} panelLabel="Recipient Workspace" />
  );
};

export default Sidebar;
