import { useEffect, useState } from "react";

import { getRecipientDashboard } from "../../../Api/recipientApi";
import RequestHistory from "./structuredComponents/RequestHistory";
import Sidebar from "./structuredComponents/Sidebar";
import Topbar from "./structuredComponents/Topbar";

const RecipientRequestHistory = () => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getRecipientDashboard();
      const dashboard = response?.data || {};

      setUser(dashboard.recipient || null);
      setRequests(Array.isArray(dashboard.requests) ? dashboard.requests : []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load request history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    queueMicrotask(() => {
      fetchHistory();
    });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg font-medium text-gray-700">
        Loading request history...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-y-auto p-6 pb-40 lg:pb-6">
        <Topbar user={user} />

        {error && (
          <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <div className="mt-6">
          <RequestHistory requests={requests} />
        </div>
      </div>
    </div>
  );
};

export default RecipientRequestHistory;
