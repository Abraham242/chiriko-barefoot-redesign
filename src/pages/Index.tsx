import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HeroIntro from "@/components/HeroIntro";
import TrustMicroBar from "@/components/TrustMicroBar";
import ProblemSection from "@/components/ProblemSection";
import ShoeComparison from "@/components/ShoeComparison";
import ValueProps from "@/components/ValueProps";
import BestSellers from "@/components/BestSellers";
import EducationSection from "@/components/EducationSection";
import LifestyleSection from "@/components/LifestyleSection";
import SocialProof from "@/components/SocialProof";
import PreFooterTrust from "@/components/PreFooterTrust";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <>
      <SEO
        title="Calzado Barefoot Venezuela | Chiriko Studio Caracas"
        description="Calzado barefoot Venezuela y zapatos respetuosos Venezuela en Chiriko Studio, Caracas. Más espacio para tus dedos, sensación de movimiento natural y transición responsable."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Chiriko Studio",
          url: "https://chirikostudio.com/",
          inLanguage: "es-VE",
        }}
      />

      <div className="min-h-screen bg-background">
        <Navbar />

        <main>
          <HeroSection />
          <HeroIntro />

          <section aria-label="Trust signals">
            <TrustMicroBar />
          </section>

          <section id="why" className="scroll-mt-28" aria-label="Why Chiriko">
            <ProblemSection />
          </section>

          <section aria-label="Traditional vs barefoot comparison">
            <ShoeComparison />
          </section>

          <section aria-label="Value propositions">
            <ValueProps />
          </section>

          <section id="shop" className="scroll-mt-28" aria-label="Collection">
            <BestSellers />
          </section>

          <section id="learn" className="scroll-mt-28" aria-label="Barefoot philosophy">
            <EducationSection />
          </section>

          <section aria-label="Lifestyle">
            <LifestyleSection />
          </section>

          <section id="reviews" className="scroll-mt-28" aria-label="Reviews">
            <SocialProof />
          </section>

          <section aria-label="Pre-footer trust">
            <PreFooterTrust />
          </section>

          <section aria-label="Final call to action">
            <FinalCTA />
          </section>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
