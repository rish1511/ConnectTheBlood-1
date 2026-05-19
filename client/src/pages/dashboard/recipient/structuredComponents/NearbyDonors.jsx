import { MapPin, Phone, UserRound } from "lucide-react";
import DonorMap from "./DonorMap";

const NearbyDonors = ({ user, requests, donors = [], availableDonors = [] }) => {
  const latestRequest = requests?.[0];
  const bloodGroup = latestRequest?.bloodGroup || user?.bloodGroup || "N/A";
  const city = latestRequest?.city || user?.city || "your city";

  const donorTips = [
    "Matching donors use same blood group and city.",
    "Critical requests should keep contact number active.",
    "Accepted status means a donor has responded.",
  ];

  return (
    <div className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Nearby Donors</h2>
          <p className="mt-1 text-sm text-gray-500">
            Based on your latest request details.
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
          <MapPin className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-6 rounded-3xl bg-gray-50 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
            <UserRound className="h-6 w-6" />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              {bloodGroup} donor match
            </h3>
            <p className="text-sm text-gray-500">{city}</p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-gray-600">
          <Phone className="h-4 w-4 text-green-600" />
          Donor contact appears after request acceptance.
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {donors.length > 0
          ? donors.map((donor) => (
              <div
                key={donor._id}
                className="rounded-2xl border border-gray-100 px-4 py-3"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {donor.fullName}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {donor.bloodGroup} donor in {donor.city}
                    </p>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    Available
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4 text-green-600" />
                  {donor.phone}
                </div>
              </div>
            ))
          : donorTips.map((tip) => (
              <div
                key={tip}
                className="rounded-2xl border border-gray-100 px-4 py-3 text-sm text-gray-600"
              >
                {tip}
              </div>
            ))}
      </div>

      <DonorMap donors={availableDonors.length ? availableDonors : donors} />
    </div>
  );
};

export default NearbyDonors;
