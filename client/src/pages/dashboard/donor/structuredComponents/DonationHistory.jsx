import { useEffect, useState } from "react";
import { History } from "lucide-react";
import { getDonationHistory } from "../../../../Api/donorApi";

const formatDate = (date) => {
  if (!date) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonationHistory = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getDonationHistory();
        const history = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
            ? response
            : [];

        setDonations(history);
      } catch (err) {
        setError(
          err.response?.data?.message || "Unable to fetch donation history",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDonationHistory();
  }, []);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Donation History
          </h2>

          <p className="text-sm text-gray-500">
            Your previous blood donations.
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
          <History className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {loading && (
          <div className="rounded-2xl border border-gray-100 p-5 text-sm text-gray-500">
            Loading donation history...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-sm text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && donations.length === 0 && (
          <div className="rounded-2xl border border-gray-100 p-5 text-sm text-gray-500">
            No donations accepted yet.
          </div>
        )}

        {!loading && !error && donations.map((donation) => (
          <div
            key={donation._id || donation.id}
            className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 hover:shadow-sm transition"
          >
            <div>
              <h3 className="font-semibold text-gray-900">
                {donation.hospital}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {formatDate(donation.updatedAt || donation.createdAt)}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-red-500">
                {donation.bloodGroup || donation.blood}
              </p>

              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                {donation.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationHistory;
