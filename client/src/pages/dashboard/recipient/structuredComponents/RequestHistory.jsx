import { CalendarDays, Droplets, MapPin, Phone, UserRound } from "lucide-react";

const statusStyles = {
  pending: "bg-amber-50 text-amber-700",
  accepted: "bg-emerald-50 text-emerald-700",
  completed: "bg-blue-50 text-blue-700",
  cancelled: "bg-gray-100 text-gray-600",
};

const formatDate = (value) => {
  if (!value) {
    return "N/A";
  }

  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const RequestHistory = ({ requests }) => {
  return (
    <div className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Request History</h2>
          <p className="mt-1 text-sm text-gray-500">
            Recent blood requests created from your account.
          </p>
        </div>

        <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
          {requests.length} records
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {requests.length === 0 ? (
          <div className="rounded-3xl bg-gray-50 px-5 py-8 text-center text-sm text-gray-500">
            No blood requests created yet.
          </div>
        ) : (
          requests.map((request) => (
            <div
              key={request._id}
              className="rounded-3xl border border-gray-100 p-5 transition hover:border-red-100 hover:bg-red-50/40"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {request.patientName}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {request.hospital}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                    statusStyles[request.status] || statusStyles.pending
                  }`}
                >
                  {request.status}
                </span>
              </div>

              <div className="mt-4 grid gap-3 text-sm text-gray-600 md:grid-cols-4">
                <span className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-red-500" />
                  {request.bloodGroup}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  {request.city}
                </span>
                <span className="capitalize">
                  {request.urgency} urgency
                </span>
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-blue-500" />
                  {formatDate(request.createdAt)}
                </span>
              </div>

              {request.acceptedBy && (
                <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <UserRound className="h-4 w-4 text-emerald-700" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {request.acceptedBy.fullName}
                        </p>
                        <p className="text-xs text-gray-600">
                          {request.acceptedBy.bloodGroup} donor in{" "}
                          {request.acceptedBy.city || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          request.acceptedBy.available
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {request.acceptedBy.available
                          ? "Available"
                          : "Busy with request"}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-medium text-gray-600">
                        <Phone className="h-3.5 w-3.5" />
                        {request.acceptedBy.phone}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RequestHistory;
