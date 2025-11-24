import Hero from "./ui/components/Hero";
import FeaturesSection from "./ui/organisms/FeaturesSection";
import CalculatorSection from "./ui/organisms/CalculatorSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturesSection />
      <CalculatorSection />
    </main>
  );
}
