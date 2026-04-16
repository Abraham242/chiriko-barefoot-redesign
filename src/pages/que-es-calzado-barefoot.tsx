import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { ChevronLeft, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// ─── Schema JSON-LD para Google ─────────────────────────────────────────────
// Esto le dice a Google que es un artículo de blog con autor y fecha.
// Mejora drásticamente el ranking en búsquedas informacionales.
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "¿Qué es el calzado barefoot? Guía completa para Venezuela",
  description:
    "Descubre qué es el calzado barefoot o minimalista, sus beneficios para la postura y salud del pie, y cómo elegir tu primer par en Venezuela.",
  author: {
    "@type": "Organization",
    name: "Chiriko Studio",
  },
  publisher: {
    "@type": "Organization",
    name: "Chiriko Studio",
    url: "https://chirikostudio.com",
  },
  datePublished: "2025-01-01",
  dateModified: "2025-01-01",
  mainEntityOfPage: "https://chirikostudio.com/aprende/que-es-calzado-barefoot",
};

// ─── Datos de las secciones de beneficios ───────────────────────────────────
const benefits = [
  {
    title: "Drop cero",
    description:
      "El talón y la punta están a la misma altura. Esto elimina la inclinación artificial que obliga a tu cuerpo a compensar con la postura, generando tensión en rodillas, cadera y espalda baja.",
    icon: (
      <svg width="36" height="28" viewBox="0 0 40 24" fill="none" className="text-foreground">
        <line x1="0" y1="22" x2="40" y2="22" stroke="currentColor" strokeWidth="1.5" />
        <text x="20" y="14" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="DM Sans">0°</text>
      </svg>
    ),
  },
  {
    title: "Caja de dedos ancha",
    description:
      "Los zapatos convencionales comprimen los dedos hacia un punto. El barefoot los libera, permitiendo que se expandan y funcionen como la base de estabilidad que son. Previene juanetes y fascitis plantar.",
    icon: (
      <svg width="32" height="36" viewBox="0 0 32 36" fill="none" className="text-foreground">
        <path d="M6 30 C6 30 8 6 16 4 C24 6 26 30 26 30" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <line x1="6" y1="30" x2="26" y2="30" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Suela delgada y flexible",
    description:
      "Una suela de 3 a 6mm permite que el pie sienta el suelo — lo que los científicos llaman propiocepción. Tu cerebro recibe información real sobre cada superficie, mejorando el equilibrio y activando músculos que el zapato tradicional tiene 'apagados'.",
    icon: (
      <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="text-foreground">
        <rect x="0" y="14" width="40" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M4 14 C4 14 8 4 20 4 C32 4 36 14 36 14" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    title: "Sin soporte artificial",
    description:
      "Los arcos de soporte que traen la mayoría de los zapatos debilitan los músculos del pie con el tiempo. El barefoot trabaja al revés: fortalece progresivamente la musculatura intrínseca, igual que caminar descalzo pero con protección.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-foreground">
        <path d="M6 28 C6 20 10 10 18 8 C26 10 30 20 30 28" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <line x1="10" y1="28" x2="26" y2="28" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

// ─── Preguntas frecuentes ────────────────────────────────────────────────────
const faqs = [
  {
    q: "¿Me van a doler los pies si nunca he usado barefoot?",
    a: "Es posible sentir algo de fatiga los primeros días, especialmente en el arco y el talón de Aquiles. Es completamente normal: son músculos que no estaban siendo usados. La clave es la transición gradual — empieza usando el calzado barefoot 1-2 horas al día y auméntalo semana a semana.",
  },
  {
    q: "¿Sirve para fascitis plantar o juanetes?",
    a: "Muchos usuarios reportan mejoría significativa en fascitis plantar y dolor de juanetes después de varios meses de transición. Sin embargo, si tienes una condición diagnosticada, consulta siempre con un especialista antes de cambiar tu calzado.",
  },
  {
    q: "¿Cuánto tiempo tarda la transición?",
    a: "Depende de la persona y del uso previo de calzado. En promedio, entre 4 y 12 semanas para adaptar la musculatura. Durante ese período, alterna entre tu calzado habitual y el barefoot.",
  },
  {
    q: "¿Los niños pueden usar barefoot?",
    a: "Sí, y muchos podólogos lo recomiendan activamente. Los pies de los niños están en desarrollo y el barefoot permite que esa formación ocurra de manera natural, sin deformar la estructura del pie.",
  },
  {
    q: "¿Dónde puedo conseguir calzado barefoot en Venezuela?",
    a: "En Chiriko Studio ofrecemos modelos barefoot premium con asesoría personalizada. Puedes ver la colección directamente en nuestra web y contactarnos por WhatsApp para elegir tu talla ideal.",
  },
];

// ─── Componente principal ────────────────────────────────────────────────────
const QueEsCalzadoBarefoot = () => {
  return (
    <>
      <SEO
        title="¿Qué es el calzado barefoot? Guía completa"
        description="Descubre qué es el calzado barefoot o minimalista, sus beneficios para la postura y salud del pie, y cómo elegir tu primer par en Venezuela. Guía completa de Chiriko Studio."
        path="/aprende/que-es-calzado-barefoot"
      />

      {/* Schema JSON-LD inyectado en el <head> */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="pt-20 lg:pt-24">

          {/* ── HERO DEL ARTÍCULO ── */}
          <div className="container mx-auto px-6 lg:px-12 py-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ChevronLeft size={16} />
              Volver al inicio
            </Link>

            {/* Breadcrumb semántico para SEO */}
            <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-4">
              Chiriko Studio · Aprende
            </p>

            <div className="max-w-3xl mb-12">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight mb-6">
                ¿Qué es el calzado barefoot?
              </h1>
              <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Una guía completa para entender el calzado minimalista, sus beneficios
                reales para la postura y la salud del pie, y cómo hacer la transición
                de manera inteligente.
              </p>

              {/* Meta info del artículo */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border">
                <p className="font-body text-xs text-muted-foreground">Por Chiriko Studio</p>
                <span className="text-border">·</span>
                <p className="font-body text-xs text-muted-foreground">8 min de lectura</p>
                <span className="text-border">·</span>
                <p className="font-body text-xs text-muted-foreground">Guía para principiantes</p>
              </div>
            </div>
          </div>

          {/* ── SECCIÓN 1: LA DEFINICIÓN ── */}
          <section className="container mx-auto px-6 lg:px-12 mb-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-6">
                La definición simple
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                El calzado barefoot — también llamado calzado minimalista o{" "}
                <em>calzado respetuoso</em> — es un tipo de zapato diseñado para
                interferir lo menos posible con el movimiento natural del pie.
              </p>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                La palabra <em>barefoot</em> significa literalmente "pie descalzo" en inglés.
                Y eso resume perfectamente la filosofía: que tu pie se comporte como si
                estuvieras descalzo, pero con la protección necesaria para el asfalto, el
                calor y el día a día urbano.
              </p>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                No es una moda de gym ni un capricho de runners. Es una respuesta a décadas
                de calzado diseñado en función de la estética, no de la biomecánica humana.
              </p>

              {/* Cita destacada */}
              <blockquote className="border-l-2 border-secondary pl-6 my-10">
                <p className="font-heading text-xl md:text-2xl font-light text-foreground italic leading-relaxed">
                  "El pie humano es una obra maestra de ingeniería y una obra de arte."
                </p>
                <cite className="font-body text-xs text-muted-foreground mt-3 block not-italic">
                  — Leonardo da Vinci
                </cite>
              </blockquote>
            </div>
          </section>

          {/* ── SECCIÓN 2: EL PROBLEMA DEL ZAPATO CONVENCIONAL ── */}
          <section className="bg-secondary/30 py-16 lg:py-20 mb-16">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-6">
                  El problema que nadie te explicó
                </h2>
                <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
                  El zapato convencional moderno, con independencia de su precio o marca,
                  comparte tres características que van en contra de la mecánica del pie:
                </p>

                <div className="space-y-6">
                  {[
                    {
                      num: "01",
                      title: "Talón elevado (heel drop)",
                      text: "La mayoría de los zapatos tienen el talón 10 a 15mm más alto que la punta. Esto inclina el cuerpo hacia adelante, acortando el tendón de Aquiles y desalineando rodillas, cadera y columna.",
                    },
                    {
                      num: "02",
                      title: "Caja de dedos estrecha",
                      text: "Los zapatos con punta estrecha o redondeada comprimen los dedos, deformando progresivamente su posición natural. Con el tiempo esto genera juanetes (hallux valgus) y dedos en martillo.",
                    },
                    {
                      num: "03",
                      title: "Amortiguación excesiva",
                      text: "La suela gruesa aisla el pie de la información del suelo. El cerebro deja de recibir señales propioceptivas, los músculos del pie se debilitan y el cuerpo pierde capacidad de equilibrio natural.",
                    },
                  ].map((item) => (
                    <div key={item.num} className="flex gap-6">
                      <span className="font-heading text-3xl font-light text-secondary flex-shrink-0 leading-none mt-1">
                        {item.num}
                      </span>
                      <div>
                        <h3 className="font-heading text-lg text-foreground mb-1">{item.title}</h3>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── SECCIÓN 3: LOS 4 PILARES BAREFOOT ── */}
          <section className="container mx-auto px-6 lg:px-12 mb-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-3">
                Las 4 características del calzado barefoot
              </h2>
              <p className="font-body text-sm text-muted-foreground mb-12">
                Un zapato verdaderamente barefoot cumple con estos cuatro principios.
                Si falta uno, no es barefoot.
              </p>

              <div className="grid md:grid-cols-2 gap-10">
                {benefits.map((b) => (
                  <div key={b.title} className="flex gap-5">
                    <div className="flex-shrink-0 w-14 h-14 bg-secondary/40 flex items-center justify-center">
                      {b.icon}
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-foreground mb-2">{b.title}</h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SECCIÓN 4: BENEFICIOS REALES ── */}
          <section className="bg-muted/30 py-16 lg:py-20 mb-16">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-6">
                  ¿Qué beneficios reales tiene?
                </h2>
                <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">
                  Los beneficios no son inmediatos — requieren una transición. Pero los
                  usuarios que completan el proceso reportan cambios que van mucho más
                  allá de los pies:
                </p>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                  {[
                    "Reducción del dolor en talones y arco plantar",
                    "Mejora de la postura y alineación de columna",
                    "Mayor equilibrio y coordinación",
                    "Fortalecimiento de músculos del pie y pantorrilla",
                    "Disminución de dolor lumbar en muchos casos",
                    "Mejor amortiguación natural (la que da tu propio cuerpo)",
                    "Prevención de juanetes y deformidades progresivas",
                    "Mayor conciencia corporal al caminar",
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <span className="text-foreground mt-0.5 flex-shrink-0">—</span>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-background border border-border p-6 mt-10 rounded-sm">
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">Nota importante:</span>{" "}
                    si tienes una condición específica como fascitis plantar diagnosticada,
                    hallux valgus severo o neuromas, consulta con un podólogo antes de
                    iniciar la transición. El barefoot es una herramienta poderosa, pero
                    requiere proceso.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── SECCIÓN 5: CÓMO HACER LA TRANSICIÓN ── */}
          <section className="container mx-auto px-6 lg:px-12 mb-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-3">
                Cómo hacer la transición sin hacerte daño
              </h2>
              <p className="font-body text-sm text-muted-foreground mb-10">
                Este es el punto donde más personas cometen errores. La transición gradual
                no es opcional — es lo que determina si el proceso funciona o no.
              </p>

              <div className="space-y-8">
                {[
                  {
                    semana: "Semanas 1–2",
                    titulo: "Exposición gradual",
                    texto:
                      "Usa el calzado barefoot 1 a 2 horas diarias, preferiblemente caminando en superficies planas. Alterna con tu calzado habitual. Puede que sientas algo de fatiga en el arco — es normal.",
                  },
                  {
                    semana: "Semanas 3–4",
                    titulo: "Aumento progresivo",
                    texto:
                      "Aumenta a 3-4 horas diarias. Puedes empezar a usar el barefoot para actividades cotidianas: ir al mercado, una caminata corta. Evita largas caminatas todavía.",
                  },
                  {
                    semana: "Semanas 5–8",
                    titulo: "Integración",
                    texto:
                      "La musculatura ya empieza a adaptarse. Puedes usar el barefoot como calzado principal. Introduce actividad física ligera con ellos. El zapato convencional pasa a ser la excepción.",
                  },
                  {
                    semana: "A partir del mes 3",
                    titulo: "Uso completo",
                    texto:
                      "El pie ya trabaja como fue diseñado. La mayoría de los usuarios reporta en este punto que ya no quieren volver al calzado convencional.",
                  },
                ].map((step) => (
                  <div key={step.semana} className="flex gap-6 pb-8 border-b border-border/50 last:border-0 last:pb-0">
                    <div className="flex-shrink-0 w-24">
                      <p className="font-body text-xs text-muted-foreground/60 uppercase tracking-wider">{step.semana}</p>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-foreground mb-1">{step.titulo}</h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.texto}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SECCIÓN 6: FAQ ── */}
          <section className="bg-secondary/30 py-16 lg:py-20 mb-16">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-10">
                  Preguntas frecuentes
                </h2>

                <div className="space-y-8">
                  {faqs.map((faq) => (
                    <div key={faq.q} className="pb-8 border-b border-border/50 last:border-0 last:pb-0">
                      <h3 className="font-heading text-lg text-foreground mb-3">{faq.q}</h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── CTA FINAL ── */}
          <section className="pb-16 lg:pb-20">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="max-w-xl mx-auto text-center bg-secondary/50 p-10 lg:p-14">
                <MessageCircle size={28} strokeWidth={1.5} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-3">
                  ¿Listo para dar el primer paso?
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-6">
                  Cuéntanos tu medida de pie y te ayudamos a elegir el modelo ideal
                  para empezar tu transición barefoot.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://wa.me/584221798072?text=${encodeURIComponent(
                      "Hola, leí el artículo sobre calzado barefoot en su web y quiero saber más sobre cómo empezar."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-foreground/90 transition-colors"
                  >
                    Hablar por WhatsApp
                  </a>
                  <Link
                    to="/size-guide"
                    className="inline-flex items-center justify-center px-8 py-4 border border-foreground text-foreground font-body text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors"
                  >
                    Ver guía de tallas
                  </Link>
                </div>
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

export default que-es-calzado-barefoot;
