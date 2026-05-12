import { Link } from "react-router-dom";
import Navbar from "../components/sharedComponets/Navbar";
import Footer from "../components/sharedComponets/Footer";

const donorSteps = [
  {
    title: "Create Account",
    desc: "Sign up as a donor and add your blood group, location and contact details.",
  },
  {
    title: "Stay Available",
    desc: "Keep your profile active so nearby recipients can find you during emergencies.",
  },
  {
    title: "Receive Requests",
    desc: "Get notified when someone nearby needs your blood group.",
  },
  {
    title: "Save a Life",
    desc: "Coordinate with the patient or hospital and donate blood safely.",
  },
];

const recipientSteps = [
  {
    title: "Create Account",
    desc: "Sign up as a recipient and complete your profile.",
  },
  {
    title: "Search Blood Donors",
    desc: "Find nearby donors based on blood group and location.",
  },
  {
    title: "Send Blood Request",
    desc: "Request blood during emergencies and contact matching donors quickly.",
  },
  {
    title: "Get Help Fast",
    desc: "Connect with donors and hospitals to receive blood on time.",
  },
];

const HowItWorks = () => {
  return (
    <>
    <div className="min-h-screen bg-[#f7f7f7]">
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 py-10">

        {/* Hero Section */}
        <div className="bg-white rounded-[32px] p-8 lg:p-12 border border-gray-100 shadow-sm text-center">

          <span className="inline-flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2 rounded-full text-sm font-medium mb-5">
            🩸 How Connect The Blood Works
          </span>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Fast, trusted and simple
            blood connection system
          </h1>

          <p className="text-gray-600 mt-5 max-w-3xl mx-auto leading-8">
            Connect The Blood helps donors and recipients
            find each other quickly during emergencies.
            Whether you want to donate blood or request it,
            the process is simple, fast and secure.
          </p>
        </div>

             {/* Recipient Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            For Recipients
          </h2>

          <p className="text-gray-600 mb-8">
            Need blood? Follow these steps.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {recipientSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg mb-4">
                  {index + 1}
                </div>

                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-gray-600 leading-6">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Donor Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            For Blood Donors
          </h2>

          <p className="text-gray-600 mb-8">
            Follow these simple steps to help save lives.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {donorSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-lg mb-4">
                  {index + 1}
                </div>

                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-gray-600 leading-6">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

   

        {/* Safety Section */}
        <div className="mt-16 bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 lg:p-10">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Safety & Trust
          </h2>

          <p className="text-gray-600 text-center max-w-2xl mx-auto mt-4">
            We focus on safe communication, nearby donor
            matching and verified profiles to help users
            during critical emergencies.
          </p>

          <div className="grid md:grid-cols-3 gap-5 mt-10">

            <div className="bg-red-50 rounded-3xl p-6">
              <h3 className="font-semibold mb-2">
                Verified Profiles
              </h3>

              <p className="text-sm text-gray-600">
                Users provide blood group and location
                details for trusted matching.
              </p>
            </div>

            <div className="bg-blue-50 rounded-3xl p-6">
              <h3 className="font-semibold mb-2">
                Fast Matching
              </h3>

              <p className="text-sm text-gray-600">
                Quickly find nearby donors during
                emergencies.
              </p>
            </div>

            <div className="bg-green-50 rounded-3xl p-6">
              <h3 className="font-semibold mb-2">
                Emergency Ready
              </h3>

              <p className="text-sm text-gray-600">
                Built for urgent blood donation needs.
              </p>
            </div>

          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-red-500 to-rose-500 rounded-[32px] p-10 text-center text-white">

          <h2 className="text-3xl font-bold">
            Ready to Save Lives?
          </h2>

          <p className="mt-3 text-red-100">
            Join Connect The Blood today and help
            people during emergencies.
          </p>

          <div className="flex justify-center gap-4 mt-7">
            <Link
              to="/signup"
              className="bg-white text-red-500 px-6 py-3 rounded-xl font-medium"
            >
              Become a Donor
            </Link>

            <Link
              to="/signup"
              className="bg-red-600 px-6 py-3 rounded-xl font-medium border border-red-300"
            >
              Request Blood
            </Link>
          </div>
        </div>

      </section>
        <Footer />
    </div>
    </>
    
  );
};

export default HowItWorks;