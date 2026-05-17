import { useEffect, useState } from "react";
import Sidebar from "./structuredComponents/Sidebar";
import Topbar from "./structuredComponents/Topbar";
import EmergencyRequests from "./structuredComponents/EmergencyRequests";
import {
  acceptEmergencyRequest,
  getEmergencyRequests,
} from "../../../Api/donorApi";

const DonorEmergencyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [acceptingId, setAcceptingId] = useState("");

  const fetchEmergencyRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getEmergencyRequests();
      const emergencyRequests = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response)
          ? response
          : [];

      setRequests(emergencyRequests);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to fetch emergency requests"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    queueMicrotask(() => {
      fetchEmergencyRequests();
    });
  }, []);

  const handleAccept = async (requestId) => {
    try {
      setAcceptingId(requestId);
      setError("");

      await acceptEmergencyRequest(requestId);

      setRequests((prev) =>
        prev.filter((request) => (request._id || request.id) !== requestId),
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to accept this emergency request"
      );
    } finally {
      setAcceptingId("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-24 lg:pb-6">
        {/* Topbar */}
        <Topbar />

        {/* Emergency Requests */}
        <div className="mt-6">
          <EmergencyRequests
            requests={requests}
            loading={loading}
            error={error}
            acceptingId={acceptingId}
            onAccept={handleAccept}
          />
        </div>
      </div>
    </div>
  );
};

export default DonorEmergencyRequests;
