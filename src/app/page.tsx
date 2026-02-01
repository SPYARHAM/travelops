import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero";
import { ProblemSection } from "@/components/sections/problem";
import { SolutionSection } from "@/components/sections/solution";
import { FeaturesSection } from "@/components/sections/features";
import { ProcessSection } from "@/components/sections/process";
// import { InvestmentSection } from "@/components/sections/investment";
import { FinalCTASection } from "@/components/sections/final-cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden bg-white">
      <Header />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <ProcessSection />
      {/* <AudienceSection /> */}
      {/* <InvestmentSection /> */}
      <FinalCTASection />
      <Footer />
    </main>
  );
}
