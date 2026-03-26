import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-lifestyle.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end pb-20 lg:pb-32">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Person walking naturally in barefoot shoes on Caracas streets"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
      </div>

      <div className="relative container mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-light text-primary-foreground leading-tight mb-4">
            Move the way you were meant to
          </h1>
          <p className="font-body text-lg md:text-xl text-primary-foreground/80 font-light mb-2 tracking-wide">
            Barefoot shoes designed in Caracas, Venezuela
          </p>
          <p className="font-body text-sm text-primary-foreground/60 font-light mb-10 tracking-wide">
            Designed to restore your natural movement. Shipping in Venezuela.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/product/terra-slip"
              className="inline-flex items-center justify-center px-10 py-4 bg-primary-foreground text-primary font-body text-sm tracking-widest uppercase hover:bg-primary-foreground/90 transition-colors"
            >
              Shop now
            </Link>
            <a
              href="#education"
              className="inline-flex items-center justify-center px-10 py-4 border border-primary-foreground/50 text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-primary-foreground/10 transition-colors"
            >
              Discover barefoot
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
