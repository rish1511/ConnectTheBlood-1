import { History } from "lucide-react";

const donations = [
  {
    id: 1,
    date: "12 May 2026",
    hospital: "Apollo Hospital",
    blood: "O+",
    status: "Completed",
  },
  {
    id: 2,
    date: "20 Jan 2026",
    hospital: "City Care",
    blood: "O+",
    status: "Completed",
  },
];

const DonationHistory = () => {
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
        {donations.map((donation) => (
          <div
            key={donation.id}
            className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 hover:shadow-sm transition"
          >
            <div>
              <h3 className="font-semibold text-gray-900">
                {donation.hospital}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {donation.date}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-red-500">
                {donation.blood}
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