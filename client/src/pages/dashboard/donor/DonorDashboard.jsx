import { useEffect, useState } from "react";

import Sidebar from "./structuredComponents/Sidebar";
import Topbar from "./structuredComponents/Topbar";
import StatsCards from "./structuredComponents/StatsCards";
import QuickActions from "./structuredComponents/QuickActions";
import AvailabilityToggle from "./structuredComponents/AvailabilityToggle";

import { getDonorDashboard } from "../../../Api/donorApi";

const DonorDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const response = await getDonorDashboard();

      setDashboardData(response.data);
    } catch (error) {
      console.log("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-medium">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-24 lg:pb-6">
        {/* Topbar */}
        <Topbar donor={dashboardData?.donor} />

        {/* Stats */}
        <div className="mt-6">
          <StatsCards
            stats={dashboardData?.stats}
            donor={dashboardData?.donor}
          />
        </div>

        {/* Quick Actions + Availability */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <QuickActions />
          </div>

          <AvailabilityToggle
            donor={dashboardData?.donor}
            onUpdate={fetchDashboard}
          />
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
