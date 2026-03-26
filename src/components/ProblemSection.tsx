const ProblemSection = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-light text-foreground mb-8 leading-tight">
            Your shoes are changing the way you move
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            Most shoes compress your toes, elevate your heel, and restrict your natural movement. Over time, this leads to discomfort, poor posture, and fatigue.
          </p>
          <a
            href="#education"
            className="inline-flex items-center justify-center px-10 py-4 border border-foreground text-foreground font-body text-sm tracking-widest uppercase hover:bg-foreground hover:text-primary-foreground transition-colors"
          >
            Discover barefoot
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
