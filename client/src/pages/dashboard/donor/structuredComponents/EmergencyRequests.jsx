import { Siren } from "lucide-react";

const EmergencyRequests = ({
  requests = [],
  loading = false,
  error = "",
  acceptingId = "",
  onAccept,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Emergency Requests
          </h2>

          <p className="text-sm text-gray-500">
            Urgent blood requests near you.
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
          <Siren className="w-6 h-6 text-red-500" />
        </div>
      </div>

      <div className="space-y-4">
        {loading && (
          <div className="rounded-2xl border border-gray-100 p-5 text-sm text-gray-500">
            Loading emergency requests...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-sm text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && requests.length === 0 && (
          <div className="rounded-2xl border border-gray-100 p-5 text-sm text-gray-500">
            No emergency requests found right now.
          </div>
        )}

        {!loading &&
          !error &&
          requests.map((request) => {
            const requestId = request._id || request.id;
            const name = request.patientName || request.name || "Unknown";
            const blood = request.bloodGroup || request.blood || "N/A";
            const location = request.city || request.location || "N/A";
            const urgency = request.urgency || "medium";
            const isAccepting = acceptingId === requestId;

            return (
              <div
                key={requestId}
                className="border border-gray-100 rounded-2xl p-4 hover:shadow-sm transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {request.hospital} - {location}
                    </p>
                  </div>

                  <span className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full font-medium">
                    {blood}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs capitalize text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                    {urgency}
                  </span>

                  <button
                    type="button"
                    onClick={() => onAccept?.(requestId)}
                    disabled={isAccepting}
                    className="rounded-xl bg-red-500 px-4 py-2 text-sm text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isAccepting ? "Accepting..." : "Donate Now"}
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default EmergencyRequests;
