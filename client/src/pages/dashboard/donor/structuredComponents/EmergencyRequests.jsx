import { Siren } from "lucide-react";

const requests = [
  {
    id: 1,
    name: "Rahul Sharma",
    blood: "O+",
    hospital: "City Hospital",
    location: "Bhopal",
    urgency: "Urgent",
  },
  {
    id: 2,
    name: "Priya Verma",
    blood: "B+",
    hospital: "Care Hospital",
    location: "Indore",
    urgency: "Critical",
  },
];

const EmergencyRequests = () => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm">
      {/* Header */}
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

      {/* Requests */}
      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="border border-gray-100 rounded-2xl p-4 hover:shadow-sm transition"
          >
            <div className="flex items-center justify-between">

              <div>
                <h3 className="font-semibold text-gray-900">
                  {request.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {request.hospital} • {request.location}
                </p>
              </div>

              <span className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full font-medium">
                {request.blood}
              </span>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                {request.urgency}
              </span>

              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm transition">
                Donate Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyRequests;