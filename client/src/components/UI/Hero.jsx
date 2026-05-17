import React from "react";
import { Link } from "react-router-dom";
import { getAuthAwareRoute } from "../../utils/authRoute";

const Hero = () => {
  const donorRoute = getAuthAwareRoute("/signup");
  const requestRoute = getAuthAwareRoute("/login");

  return (
    <>
      <section className="max-w-6xl h-[calc(100vh-72px)] mx-auto px-3 lg:px-6 py-4 flex items-center">
        <div className="grid lg:grid-cols-2 gap-5 items-center bg-white rounded-[32px] border border-gray-100 shadow-sm w-full overflow-hidden">
          {/* Left Content */}
          <div className="px-6 lg:px-10 py-8 lg:py-10">
            <span className="inline-flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2 rounded-full text-sm font-medium mb-4">
              🩸 Blood donation saves lives
            </span>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5">
              Save lives by donating blood
            </h1>

            <p className="text-gray-600 leading-8 text-[15px] max-w-lg mb-8">
              Connect blood donors and recipients instantly during emergencies
              with a secure and trusted platform built for hospitals, volunteers
              and individuals.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to={donorRoute}
                className="bg-red-500 hover:bg-red-600 transition-all duration-300 text-white px-7 py-3 rounded-xl font-medium shadow-md shadow-red-200"
              >
                {donorRoute === "/signup"
                  ? "Become a Donor"
                  : "Go to Dashboard"}
              </Link>
              {requestRoute === "/login" ? (
                <Link
                  to={requestRoute}
                  className="border border-gray-200 bg-white hover:bg-gray-50 transition px-7 py-3 rounded-xl font-medium text-gray-700 shadow-sm"
                >
                  {requestRoute === "/login"
                    ? "Request Blood"
                    : "Open Dashboard"}
                </Link>
              ) : (
                <Link
                  to={requestRoute}
                  className="border hidden border-gray-200 bg-white hover:bg-gray-50 transition px-7 py-3 rounded-xl font-medium text-gray-700 shadow-sm"
                >
                  {requestRoute === "/login"
                    ? "Request Blood"
                    : "Open Dashboard"}
                </Link>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="relative h-full min-h-[500px] bg-gradient-to-br from-red-100 via-rose-100 to-red-200 flex items-center justify-center">
            {/* Background blur */}
            <div className="absolute top-10 right-10 w-44 h-44 bg-red-300/20 rounded-full blur-3xl"></div>

            <div className="absolute bottom-10 left-10 w-40 h-40 bg-pink-300/20 rounded-full blur-3xl"></div>

            {/* Doctor image */}
            <img
              src="/images/heroPageImage.jpg"
              alt="Doctor"
              className="relative z-10 h-full object-cover"
            />

            {/* Bottom floating mini badge */}
            <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md rounded-2xl px-5 py-4 shadow-lg border border-white z-20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Emergency Ready
                  </h3>

                  <p className="text-sm text-gray-500">
                    Fast donor matching system
                  </p>
                </div>

                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Trusted
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
