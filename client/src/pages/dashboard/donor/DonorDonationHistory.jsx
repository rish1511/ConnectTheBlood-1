import Sidebar from "./structuredComponents/Sidebar";
import Topbar from "./structuredComponents/Topbar";
import DonationHistory from "./structuredComponents/DonationHistory";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const DonorDonationHistory = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-24 lg:pb-6">
        {/* Topbar */}
        <Topbar />

        {/* Donation History */}
        <div className="mt-6">
          <DonationHistory />
        </div>
      </div>
    </div>
  );
};

export default DonorDonationHistory;
