import Sidebar from "./structuredComponents/Sidebar";
import Topbar from "./structuredComponents/Topbar";
import StatsCards from "./structuredComponents/StatsCards";
import QuickActions from "./structuredComponents/QuickActions";
import AvailabilityToggle from "./structuredComponents/AvailabilityToggle";

const DonorDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">

        {/* Topbar */}
        <Topbar />

        {/* Stats */}
        <div className="mt-6">
          <StatsCards />
        </div>

        {/* Quick Actions + Availability */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">

          <div className="lg:col-span-2">
            <QuickActions />
          </div>

          <AvailabilityToggle />
        </div>

      </div>
    </div>
  );
};

export default DonorDashboard;