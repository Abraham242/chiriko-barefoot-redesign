import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-32 lg:py-40 bg-primary">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-light text-primary-foreground mb-6 leading-tight">
          Start moving naturally today
        </h2>
        <p className="font-body text-primary-foreground/70 text-sm tracking-wide mb-10 max-w-md mx-auto">
          Your feet were made to feel the world. Let them.
        </p>
        <Link
          to="/product/terra-slip"
          className="inline-flex items-center justify-center px-12 py-4 bg-primary-foreground text-primary font-body text-sm tracking-widest uppercase hover:bg-primary-foreground/90 transition-colors"
        >
          Shop now
        </Link>
      </div>
    </section>
  );
};

export default FinalCTA;
