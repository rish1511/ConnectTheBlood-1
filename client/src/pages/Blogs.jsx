import Navbar from "../components/sharedComponets/Navbar";
import Footer from "../components/sharedComponets/Footer";

const blogPosts = [
  {
    id: 1,
    title: "Why Blood Donation Matters",
    description:
      "Understand how one donation can save multiple lives and support emergency care.",
    date: "12 May 2026",
    category: "Awareness",
  },
  {
    id: 2,
    title: "Who Can Donate Blood?",
    description:
      "Basic eligibility criteria every donor should know before donating blood.",
    date: "08 May 2026",
    category: "Guide",
  },
  {
    id: 3,
    title: "Emergency Blood Requests Explained",
    description:
      "How our platform helps connect donors and recipients quickly during emergencies.",
    date: "01 May 2026",
    category: "Platform",
  },
];

const Blogs = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 via-white to-pink-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <span className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-5">
            📝 Blood Awareness Articles
          </span>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Learn, Explore & Stay Updated
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto leading-8">
            Read articles about blood donation, emergency response,
            donor awareness, and updates from{" "}
            <span className="font-semibold text-red-500">
              Connect The Blood
            </span>
            .
          </p>
        </div>
      </section>

      {/* Blog Cards */}
      <section className="max-w-6xl mx-auto px-6 py-16 flex-1">
       

        {/* Empty State for future */}
        <div className="mt-20 text-center bg-white rounded-[32px] border border-dashed border-gray-300 p-10">
          <div className="text-5xl mb-4">📚</div>

          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            More Blogs Coming Soon
          </h3>

          <p className="text-gray-500 max-w-xl mx-auto">
            We’ll regularly publish awareness content,
            donation tips, emergency response guides,
            and updates to help donors and recipients.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blogs;