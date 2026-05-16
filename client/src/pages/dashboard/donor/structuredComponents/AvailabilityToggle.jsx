import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

const AvailabilityToggle = () => {
  const [isAvailable, setIsAvailable] =
    useState(true);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm">

      {/* Top */}
      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Donation Availability
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Update your blood donation status.
          </p>
        </div>

        {/* Toggle */}
        <button
          onClick={() =>
            setIsAvailable(!isAvailable)
          }
          className={`relative w-16 h-9 rounded-full transition-all duration-300 ${
            isAvailable
              ? "bg-green-500"
              : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-7 h-7 bg-white rounded-full shadow-md transition-all duration-300 ${
              isAvailable
                ? "translate-x-7"
                : ""
            }`}
          />
        </button>
      </div>

      {/* Status Card */}
      <div
        className={`mt-5 rounded-2xl p-4 border ${
          isAvailable
            ? "bg-green-50 border-green-100"
            : "bg-red-50 border-red-100"
        }`}
      >
        <div className="flex items-center gap-3">

          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isAvailable
                ? "bg-green-100"
                : "bg-red-100"
            }`}
          >
            {isAvailable ? (
              <CheckCircle className="text-green-600 w-6 h-6" />
            ) : (
              <XCircle className="text-red-600 w-6 h-6" />
            )}
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              {isAvailable
                ? "Available to Donate"
                : "Currently Unavailable"}
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