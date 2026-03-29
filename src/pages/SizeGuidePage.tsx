import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { ChevronLeft, Footprints, Ruler, PenLine, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const sizeChart = [
  { eu: 36, cm: 22.5, us_m: "4", us_w: "5.5" },
  { eu: 37, cm: 23.0, us_m: "4.5", us_w: "6" },
  { eu: 38, cm: 23.5, us_m: "5.5", us_w: "7" },
  { eu: 39, cm: 24.5, us_m: "6.5", us_w: "8" },
  { eu: 40, cm: 25.0, us_m: "7", us_w: "8.5" },
  { eu: 41, cm: 26.0, us_m: "8", us_w: "9.5" },
  { eu: 42, cm: 26.5, us_m: "8.5", us_w: "10" },
  { eu: 43, cm: 27.5, us_m: "9.5", us_w: "11" },
  { eu: 44, cm: 28.0, us_m: "10", us_w: "11.5" },
  { eu: 45, cm: 29.0, us_m: "11", us_w: "12.5" },
];

const steps = [
  {
    number: 1,
    icon: PenLine,
    title: "Prepara lo necesario",
    description:
      "Coloca una hoja en un piso firme y plano. Ten a mano un lápiz o bolígrafo y una regla.",
  },
  {
    number: 2,
    icon: Footprints,
    title: "Traza tu pie",
    description:
      "Párate sobre la hoja con tu peso distribuido de forma natural. Traza el contorno manteniendo el lápiz vertical y cerca del pie.",
  },
  {
    number: 3,
    icon: Ruler,
    title: "Mide el largo",
    description:
      "Mide desde el talón hasta la punta de tu dedo más largo en centímetros. Repite en ambos pies y usa la medida mayor.",
  },
  {
    number: 4,
    icon: Ruler,
    title: "Mide el ancho",
    description:
      "Mide la parte más ancha del trazado, a la altura del metatarso. Esto nos ayuda a confirmar un ajuste cómodo en la horma anatómica.",
  },
];

const SizeGuidePage = () => {
  return (
    <>
      <SEO
        title="Guía de Tallas Barefoot"
        description="Aprende a medir tu pie y encontrar tu talla ideal en zapatos barefoot. Guía simple, tabla de medidas y asesoría personalizada por WhatsApp en Venezuela."
        path="/size-guide"
      />

      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="pt-20 lg:pt-24">
          <div className="container mx-auto px-6 lg:px-12 py-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ChevronLeft size={16} />
              Volver a la colección
            </Link>

            <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4">
                Encuentra tu talla ideal
              </h1>

              <p className="font-body text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                El calzado barefoot requiere un ajuste diferente. Queremos que
                experimentes libertad desde el primer paso. Sigue esta guía para
                encontrar tu medida exacta o escríbenos por WhatsApp para una
                asesoría personalizada.
              </p>
            </div>
          </div>

          <section className="container mx-auto px-6 lg:px-12 mb-16 lg:mb-24">
            <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground text-center mb-12">
              Cómo medir tu pie
            </h2>

            <div className="max-w-3xl mx-auto">
              <div className="bg-secondary/50 p-8 md:p-12 mb-12 flex justify-center">
                <svg
                  viewBox="0 0 400 300"
                  className="w-full max-w-md text-foreground"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Diagrama para medir largo y ancho del pie"
                >
                  <rect
                    x="50"
                    y="20"
                    width="300"
                    height="260"
                    rx="2"
                    fill="hsl(var(--secondary))"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="6 3"
                  />

                  <path
                    d="M200 250 C180 250, 150 230, 140 200 C130 170, 132 140, 140 120 C148 100, 155 80, 160 65 C163 55, 168 48, 175 45 C180 43, 185 48, 185 55 C185 50, 190 42, 197 40 C204 38, 208 45, 206 55 C208 47, 215 40, 222 42 C229 44, 228 53, 225 60 C230 52, 238 50, 242 55 C246 60, 242 70, 238 78 C250 90, 260 120, 260 150 C260 180, 250 220, 230 240 C220 248, 210 250, 200 250Z"
                    fill="hsl(var(--muted))"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />

                  <line
                    x1="290"
                    y1="45"
                    x2="290"
                    y2="250"
                    stroke="hsl(var(--accent))"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="284"
                    y1="45"
                    x2="296"
                    y2="45"
                    stroke="hsl(var(--accent))"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="284"
                    y1="250"
                    x2="296"
                    y2="250"
                    stroke="hsl(var(--accent))"
                    strokeWidth="1.5"
                  />
                  <text
                    x="310"
                    y="150"
                    fill="hsl(var(--accent))"
                    fontSize="12"
                    fontFamily="DM Sans"
                    transform="rotate(90, 310, 150)"
                  >
                    Largo (cm)
                  </text>

                  <line
                    x1="135"
                    y1="275"
                    x2="265"
                    y2="275"
                    stroke="hsl(var(--terracotta))"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="135"
                    y1="269"
                    x2="135"
                    y2="281"
                    stroke="hsl(var(--terracotta))"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="265"
                    y1="269"
                    x2="265"
                    y2="281"
                    stroke="hsl(var(--terracotta))"
                    strokeWidth="1.5"
                  />
                  <text
                    x="185"
                    y="293"
                    fill="hsl(var(--terracotta))"
                    fontSize="12"
                    fontFamily="DM Sans"
                  >
                    Ancho (cm)
                  </text>
                </svg>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {steps.map((step) => (
                  <div key={step.number} className="flex gap-5">
                    <div className="flex-shrink-0 w-10 h-10 bg-secondary flex items-center justify-center">
                      <span className="font-heading text-lg text-foreground">
                        {step.number}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-heading text-lg text-foreground mb-1">
                        {step.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-secondary/30 py-16 lg:py-20">
            <div className="container mx-auto px-6 lg:px-12">
              <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground text-center mb-10">
                Tabla de tallas
              </h2>

              <div className="max-w-2xl mx-auto overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="font-body text-xs tracking-wider uppercase text-muted-foreground text-left py-3 pr-4">
                        EU
                      </th>
                      <th className="font-body text-xs tracking-wider uppercase text-muted-foreground text-left py-3 px-4">
                        Largo del pie
                      </th>
                      <th className="font-body text-xs tracking-wider uppercase text-muted-foreground text-left py-3 px-4">
                        US Hombre
                      </th>
                      <th className="font-body text-xs tracking-wider uppercase text-muted-foreground text-left py-3 pl-4">
                        US Mujer
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeChart.map((row) => (
                      <tr key={row.eu} className="border-b border-border/50">
                        <td className="font-body text-sm text-foreground font-medium py-3 pr-4">
                          {row.eu}
                        </td>
                        <td className="font-body text-sm text-muted-foreground py-3 px-4">
                          {row.cm} cm
                        </td>
                        <td className="font-body text-sm text-muted-foreground py-3 px-4">
                          {row.us_m}
                        </td>
                        <td className="font-body text-sm text-muted-foreground py-3 pl-4">
                          {row.us_w}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="py-16 lg:py-20">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground text-center mb-10">
                  Recomendaciones de fitting
                </h2>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <p className="font-heading text-lg text-foreground mb-2">
                      Mide en la tarde
                    </p>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      Tus pies pueden expandirse ligeramente durante el día.
                      Medirlos en la tarde ayuda a lograr un ajuste más real.
                    </p>
                  </div>

                  <div>
                    <p className="font-heading text-lg text-foreground mb-2">
                      ¿Entre dos tallas?
                    </p>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      Elige la mayor. El barefoot debe dejar espacio para que
                      los dedos se expandan de forma natural.
                    </p>
                  </div>

                  <div>
                    <p className="font-heading text-lg text-foreground mb-2">
                      ¿Aún no estás seguro?
                    </p>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      Escríbenos por WhatsApp con tus medidas y te ayudamos a
                      elegir la talla correcta.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-16 lg:pb-20">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="max-w-xl mx-auto text-center bg-secondary/50 p-10 lg:p-14">
                <MessageCircle
                  size={28}
                  strokeWidth={1.5}
                  className="mx-auto mb-4 text-muted-foreground"
                />

                <h3 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-3">
                  ¿Necesitas ayuda personalizada?
                </h3>

                <p className="font-body text-sm text-muted-foreground mb-8">
                  Envíanos la medida de tu pie por WhatsApp y te ayudamos a
                  elegir la talla correcta.
                </p>

                <a
                  href="https://wa.me/584221798072?text=Hola%2C%20vengo%20de%20chirikostudio.com%20y%20quiero%20ayuda%20para%20elegir%20mi%20talla."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-foreground/90 transition-colors"
                >
                  Hablar por WhatsApp
                </a>
              </div>
            </div>
          </section>
        </div>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default SizeGuidePage;
