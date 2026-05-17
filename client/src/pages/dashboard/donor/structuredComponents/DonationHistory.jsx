import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, History } from "lucide-react";
import {
  completeEmergencyRequest,
  getAcceptedRequests,
  getDonationHistory,
} from "../../../../Api/donorApi";

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
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completingId, setCompletingId] = useState("");

  const normalizeList = (response) => {
    return Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response)
        ? response
        : [];
  };

  const fetchDonationData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [acceptedResponse, historyResponse] = await Promise.all([
        getAcceptedRequests(),
        getDonationHistory(),
      ]);

      setAcceptedRequests(normalizeList(acceptedResponse));
      setDonations(normalizeList(historyResponse));
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to fetch donation history",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      fetchDonationData();
    });
  }, [fetchDonationData]);

  const handleComplete = async (requestId) => {
    try {
      setCompletingId(requestId);
      setError("");

      await completeEmergencyRequest(requestId);
      await fetchDonationData();
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to mark donation completed",
      );
    } finally {
      setCompletingId("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Accepted Requests
            </h2>

            <p className="text-sm text-gray-500">
              Mark done after donation is completed.
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
        </div>

        <div className="space-y-4">
          {loading && (
            <div className="rounded-2xl border border-gray-100 p-5 text-sm text-gray-500">
              Loading accepted requests...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-sm text-red-600">
              {error}
            </div>
          )}

          {!loading && !error && acceptedRequests.length === 0 && (
            <div className="rounded-2xl border border-gray-100 p-5 text-sm text-gray-500">
              No accepted requests waiting right now.
            </div>
          )}

          {!loading &&
            !error &&
            acceptedRequests.map((request) => {
              const requestId = request._id || request.id;
              const isCompleting = completingId === requestId;

              return (
                <div
                  key={requestId}
                  className="flex flex-col gap-4 rounded-2xl border border-gray-100 p-4 transition hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {request.patientName}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {request.hospital} - {request.city}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Accepted on {formatDate(request.updatedAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">
                      {request.status}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleComplete(requestId)}
                      disabled={isCompleting}
                      className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-300"
                    >
                      {isCompleting ? "Saving..." : "Done"}
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Donation History
          </h2>

          <p className="text-sm text-gray-500">
            Your previous blood donations.
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
          <History className="h-6 w-6 text-blue-600" />
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
            No completed donations yet.
          </div>
        )}

        {!loading &&
          !error &&
          donations.map((donation) => (
            <div
              key={donation._id || donation.id}
              className="flex items-center justify-between rounded-2xl border border-gray-100 p-4 transition hover:shadow-sm"
            >
              <div>
                <h3 className="font-semibold text-gray-900">
                  {donation.hospital}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {formatDate(donation.updatedAt || donation.createdAt)}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-red-500">
                  {donation.bloodGroup || donation.blood}
                </p>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                  {donation.status}
                </span>
              </div>
            </div>
          ))}
      </div>
      </div>
    </div>
  );
};

export default DonationHistory;
