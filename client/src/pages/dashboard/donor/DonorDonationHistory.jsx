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
      <div className="flex-1 overflow-y-auto p-6">
        {/* Topbar */}
        <Topbar />

        {/* Back Button */}
        <div className="mt-6">
          <button
            onClick={() => navigate('/dashboard/donor')}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>

        {/* Donation History */}
        <div className="mt-6">
          <DonationHistory />
        </div>
      </div>
    </div>
  );
};

export default DonorDonationHistory;