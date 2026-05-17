import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

import { updateDonorAvailability } from "../../../../Api/donorApi";

const AvailabilityToggle = ({ donor, onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const isAvailable = donor?.available ?? false;
  const handleToggle = async () => {
    try {
      setIsLoading(true);

      await updateDonorAvailability(!isAvailable);
      // Dashboard refresh
      onUpdate();
    } catch (error) {
      console.log("Availability Error:", error);

      alert("Failed to update availability");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Top */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Donation Availability
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Update your blood donation status.
          </p>
        </div>

        {/* Toggle */}
        <button
          onClick={handleToggle}
          disabled={isLoading}
          className={`relative h-9 w-16 rounded-full transition-all duration-300 ${
            isAvailable ? "bg-green-500" : "bg-gray-300"
          } ${isLoading ? "cursor-not-allowed opacity-70" : ""}`}
        >
          <span
            className={`absolute left-1 top-1 h-7 w-7 rounded-full bg-white shadow-md transition-all duration-300 ${
              isAvailable ? "translate-x-7" : ""
            }`}
          />
        </button>
      </div>

      {/* Status Card */}
      <div
        className={`mt-5 rounded-2xl border p-4 ${
          isAvailable
            ? "border-green-100 bg-green-50"
            : "border-red-100 bg-red-50"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${
              isAvailable ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {isAvailable ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : (
              <XCircle className="h-6 w-6 text-red-600" />
            )}
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              {isAvailable ? "Available to Donate" : "Currently Unavailable"}
            </h3>

            <p className="text-sm text-gray-500">
              {isAvailable
                ? "You can now receive donation requests."
                : "You won’t receive donation requests."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityToggle;
