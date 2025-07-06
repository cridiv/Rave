import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import FeatureSection from "./components/FeatureSection";
import HowToUse from "./components/HowToUse";
import FAQsSection from "./components/FAQsSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="p-8 pt-28">
      <NavBar />
      <Hero />
      <FeatureSection />
      <HowToUse />
      <FAQsSection />
      <Footer />
    </div>
  );
}
// completed the landing page feature
