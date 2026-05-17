import Navbar from "../components/sharedComponets/Navbar";
import Footer from "../components/sharedComponets/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 py-10">

        {/* Hero Section */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 lg:p-12 text-center">

          <span className="inline-flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2 rounded-full text-sm font-medium mb-5">
            ❤️ About Connect The Blood
          </span>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Building a faster way
            to save lives
          </h1>

          <p className="text-gray-600 leading-8 mt-5 max-w-3xl mx-auto">
            Connect The Blood is built to connect blood
            donors and recipients quickly during emergencies.
            We believe no one should struggle to find blood
            when every second matters.
          </p>
        </div>

        {/* Mission + Vision */}
        <div className="grid lg:grid-cols-2 gap-6 mt-10">

          {/* Mission */}
          <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-8">

            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center text-2xl mb-5">
              🎯
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>

            <p className="text-gray-600 leading-8">
              Our mission is simple —
              make blood donation faster,
              easier and more accessible.
              We want to reduce delays during
              emergencies by helping people
              quickly connect with nearby donors.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-8">

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl mb-5">
              🚀
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Vision
            </h2>

            <p className="text-gray-600 leading-8">
              We aim to build one of the
              most trusted blood donor
              communities where hospitals,
              donors and recipients can
              connect instantly and save lives
              together.
            </p>
          </div>
        </div>

        {/* Why We Built This */}
        <div className="mt-10 bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 lg:p-10">

          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Why We Built This
          </h2>

          <p className="text-center text-gray-600 mt-4 max-w-3xl mx-auto leading-8">
            During emergencies, finding blood
            quickly can be difficult and stressful.
            Many families struggle to contact donors
            in time. Connect The Blood is designed
            to reduce this problem by creating
            a fast, simple and trusted platform.
          </p>

          <div className="grid md:grid-cols-3 gap-5 mt-10">

            <div className="bg-red-50 rounded-3xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                ⚡ Faster Response
              </h3>

              <p className="text-sm text-gray-600 leading-6">
                Quickly find nearby blood
                donors during emergencies.
              </p>
            </div>

            <div className="bg-blue-50 rounded-3xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                🛡️ Trusted Platform
              </h3>

              <p className="text-sm text-gray-600 leading-6">
                Safe and verified information
                for better trust and reliability.
              </p>
            </div>

            <div className="bg-green-50 rounded-3xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                ❤️ Save More Lives
              </h3>

              <p className="text-sm text-gray-600 leading-6">
                Helping communities support
                each other when it matters most.
              </p>
            </div>

          </div>
        </div>

        {/* CTA */}
        {/* <div className="mt-12 bg-gradient-to-r from-red-500 to-rose-500 rounded-[32px] p-10 text-center text-white">

          <h2 className="text-3xl font-bold">
            Be a Part of the Mission
          </h2>

          <p className="mt-3 text-red-100 max-w-xl mx-auto">
            Join Connect The Blood and help
            save lives by donating blood or
            helping people during emergencies.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-7">

            <Link
              to="/signup"
              className="bg-white text-red-500 px-6 py-3 rounded-xl font-medium"
            >
              Become a Donor
            </Link>

            <Link
              to="/signup"
              className="border border-white px-6 py-3 rounded-xl font-medium hover:bg-white hover:text-red-500 transition"
            >
              Join Now
            </Link>

          </div>
        </div> */}

      </section>

      <Footer />
    </div>
  );
};

export default About;
