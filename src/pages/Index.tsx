import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustMicroBar from "@/components/TrustMicroBar";
import ProblemSection from "@/components/ProblemSection";
import ShoeComparison from "@/components/ShoeComparison";
import ValueProps from "@/components/ValueProps";
import BestSellers from "@/components/BestSellers";
import EducationSection from "@/components/EducationSection";
import SizeGuidance from "@/components/SizeGuidance";
import LifestyleSection from "@/components/LifestyleSection";
import SocialProof from "@/components/SocialProof";
import PreFooterTrust from "@/components/PreFooterTrust";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustMicroBar />
      <ProblemSection />
      <ShoeComparison />
      <ValueProps />
      <BestSellers />
      <EducationSection />
      <SizeGuidance />
      <LifestyleSection />
      <SocialProof />
      <PreFooterTrust />
      <FinalCTA />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
