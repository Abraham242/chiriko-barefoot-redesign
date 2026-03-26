import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValueProps from "@/components/ValueProps";
import BestSellers from "@/components/BestSellers";
import EducationSection from "@/components/EducationSection";
import LifestyleSection from "@/components/LifestyleSection";
import SocialProof from "@/components/SocialProof";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ValueProps />
      <BestSellers />
      <EducationSection />
      <LifestyleSection />
      <SocialProof />
      <FinalCTA />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
