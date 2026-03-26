import { Star } from "lucide-react";

const reviews = [
  { name: "María G.", location: "Caracas", text: "I've never felt this connected to the ground. My back pain has noticeably improved after just two weeks.", rating: 5 },
  { name: "Carlos R.", location: "Valencia", text: "Finally, barefoot shoes available in Venezuela. The quality is on par with international brands.", rating: 5 },
  { name: "Ana L.", location: "Mérida", text: "The Terra Slip is incredibly comfortable. I wear them for everything — work, hikes, even yoga.", rating: 5 },
];

const SocialProof = () => {
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-light text-foreground mb-3">What our community says</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <div key={i} className="text-center">
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={16} className="fill-terracotta text-terracotta" />
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
