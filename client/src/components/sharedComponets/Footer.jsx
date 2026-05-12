import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo + About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-red-600 text-xl">
                🩸
              </span>

              <h2 className="font-bold text-lg text-gray-900">
                Connect The Blood
              </h2>
            </div>

            <p className="text-sm text-gray-600 leading-7">
              Connecting blood donors and recipients
              quickly during emergencies with a secure
              and trusted platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link
                to="/"
                className="text-gray-600 hover:text-red-500 transition"
              >
                Home
              </Link>

              <Link
                to="/how-it-works"
                className="text-gray-600 hover:text-red-500 transition"
              >
                How It Works
              </Link>

              <Link
                to="/about"
                className="text-gray-600 hover:text-red-500 transition"
              >
                About
              </Link>

              <Link
                to="/blogs"
                className="text-gray-600 hover:text-red-500 transition"
              >
                Blogs
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Services
            </h3>

            <div className="flex flex-col gap-3 text-sm text-gray-600">
              <p>Blood Donation</p>
              <p>Emergency Requests</p>
              <p>Nearby Donor Search</p>
              <p>Hospital Support</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Contact
            </h3>

            <div className="space-y-3 text-sm text-gray-600">
              <p>📍 India</p>
              <p>📧 support@connecttheblood.com</p>
              <p>📞 +91 9876543210</p>
            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-500">
            © 2026 Connect The Blood.
            All rights reserved.
          </p>

          <div className="flex gap-5 text-sm text-gray-500">
            <Link
              to="/privacy-policy"
              className="hover:text-red-500 transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="hover:text-red-500 transition"
            >
              Terms
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;