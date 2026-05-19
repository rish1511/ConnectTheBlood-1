import {
  BarChart3,
  LayoutDashboard,
  Users,
} from "lucide-react";
import DashboardSidebar from "../../../../components/commonDashboard/DashboardSidebar";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard/admin" },
  { title: "User Management", icon: Users, path: "/dashboard/admin/users" },
  { title: "Analytics", icon: BarChart3, path: "/dashboard/admin/analytics" },
];

const Sidebar = () => {
  return <DashboardSidebar menuItems={menuItems} panelLabel="Admin Workspace" />;
};

export default Sidebar;
