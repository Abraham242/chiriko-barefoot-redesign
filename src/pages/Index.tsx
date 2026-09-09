import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustMicroBar from "@/components/TrustMicroBar";
import BestSellers from "@/components/BestSellers";
import EducationSection from "@/components/EducationSection";
import LifestyleSection from "@/components/LifestyleSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <>
      <SEO
        title="Calzado Barefoot Venezuela | Chiriko Studio Caracas"
        description="Calzado barefoot Venezuela y zapatos respetuosos Venezuela en Chiriko Studio, Caracas. Más espacio para tus dedos, sensación de movimiento natural y transición responsable."
        path="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Chiriko Studio",
            url: "https://chirikostudio.com/",
            inLanguage: "es-VE",
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Chiriko Studio",
            url: "https://chirikostudio.com/",
            logo: "https://chirikostudio.com/logo-black.svg",
            sameAs: ["https://www.instagram.com/chiriko.studio"],
            areaServed: "Venezuela",
            description:
              "Calzado barefoot y respetuoso en Venezuela con preventa asistida y asesoría personalizada por WhatsApp.",
          },
        ]}
      />

      <div className="min-h-screen bg-background">
        <Navbar />

        <main>
          <HeroSection />

          <section id="shop" className="scroll-mt-28" aria-label="Collection">
            <BestSellers />
          </section>

          <TrustMicroBar />

          <section id="learn" className="scroll-mt-28" aria-label="Barefoot philosophy">
            <EducationSection />
          </section>

          <section aria-label="Lifestyle">
            <LifestyleSection />
          </section>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
