import { Star } from "lucide-react";

const reviews = [
  {
    name: "María G.",
    location: "Caracas",
    text: "Nunca me había sentido tan conectada con el suelo. Después de dos semanas, la diferencia en mi comodidad diaria se nota muchísimo.",
    rating: 5,
  },
  {
    name: "Carlos R.",
    location: "Valencia",
    text: "Por fin barefoot de verdad en Venezuela. La calidad está al nivel de marcas internacionales y la experiencia se siente premium.",
    rating: 5,
  },
  {
    name: "Ana L.",
    location: "Mérida",
    text: "El modelo Terra Slip es increíblemente cómodo. Lo uso para trabajar, caminar y moverme todo el día sin sentir rigidez.",
    rating: 5,
  },
];

const SocialProof = () => {
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-light text-foreground mb-3">
            Lo que dice nuestra comunidad
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <div key={i} className="text-center">
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={16}
                    className="fill-terracotta text-terracotta"
                  />
                ))}
              </div>

              <p className="font-body text-sm text-foreground leading-relaxed mb-4 italic">
                "{review.text}"
              </p>

              <p className="font-body text-xs text-muted-foreground tracking-wider uppercase">
                {review.name} — {review.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
