import { useEffect, useState } from "react";

import { getRecipientDashboard } from "../../../Api/recipientApi";
import NearbyDonors from "./structuredComponents/NearbyDonors";
import Sidebar from "./structuredComponents/Sidebar";
import Topbar from "./structuredComponents/Topbar";

const RecipientNearbyDonors = () => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNearbyDonors = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getRecipientDashboard();
      const dashboard = response?.data || {};

      setUser(dashboard.recipient || null);
      setRequests(Array.isArray(dashboard.requests) ? dashboard.requests : []);
      setDonors(
        Array.isArray(dashboard.nearbyDonors) ? dashboard.nearbyDonors : [],
      );
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load nearby donors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    queueMicrotask(() => {
      fetchNearbyDonors();
    });
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-medium text-gray-700">
        Loading nearby donors...
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-y-auto p-6 pb-24 lg:pb-6">
        <Topbar user={user} />

        {error && (
          <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <div className="mt-6">
          <NearbyDonors user={user} requests={requests} donors={donors} />
        </div>
      </div>
    </div>
  );
};

export default RecipientNearbyDonors;
