import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";

const LifestyleSection = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={lifestyle1}
              alt="People walking through tropical nature trail in barefoot shoes"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="font-heading text-2xl lg:text-3xl font-light text-primary-foreground leading-tight">
                Every path is yours to feel
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={lifestyle2}
              alt="Person sitting on concrete steps in urban setting wearing barefoot shoes"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="font-heading text-2xl lg:text-3xl font-light text-primary-foreground leading-tight">
                Urban ground, natural movement
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleSection;
