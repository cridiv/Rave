import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import FeatureSection from "./components/FeatureSection";
import HowToUse from "./components/HowToUse";

export default function Home() {
  return (
    <div className="p-8 pt-28">
      <NavBar />
      <Hero />
      <FeatureSection />
      <HowToUse />
    </div>
  );
}
