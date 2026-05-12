import Footer from "../components/sharedComponets/Footer";
import Navbar from "../components/sharedComponets/Navbar";
import Hero from "../components/UI/Hero";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <Navbar />
      <Hero/>
      <Footer/>
    </div>
  );
};

export default Home;