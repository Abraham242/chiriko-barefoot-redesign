import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { ChevronLeft, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// ─── Schema JSON-LD para Google ─────────────────────────────────────────────
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "¿Qué es el calzado barefoot? Guía para Venezuela",
  description:
    "Descubre qué es el calzado barefoot y el calzado respetuoso, sus características y cómo hacer una transición responsable en Venezuela.",
  author: {
    "@type": "Organization",
    name: "Chiriko Studio",
  },
  publisher: {
    "@type": "Organization",
    name: "Chiriko Studio",
    url: "https://chirikostudio.com",
  },
  mainEntityOfPage: "https://chirikostudio.com/que-es-calzado-barefoot",
  inLanguage: "es-VE",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: "https://chirikostudio.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Aprende",
      item: "https://chirikostudio.com/que-es-calzado-barefoot",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Qué es el calzado barefoot",
      item: "https://chirikostudio.com/que-es-calzado-barefoot",
    },
  ],
};

// ─── Datos de las secciones de beneficios ───────────────────────────────────
const benefits = [
  {
    title: "Drop cero",
    description:
      "El talón y la punta están a la misma altura, una geometría pensada para ofrecer una sensación de apoyo más plana.",
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
      "Los zapatos convencionales comprimen los dedos hacia un punto. El barefoot los libera, permitiendo que se expandan y funcionen como la base de estabilidad que son. Puede ayudar a que los dedos tengan más espacio y se muevan con mayor libertad.",
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
      "Una suela delgada y flexible permite percibir mejor la superficie y acompaña el movimiento del pie con menos rigidez.",
    icon: (
      <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="text-foreground">
        <rect x="0" y="14" width="40" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M4 14 C4 14 8 4 20 4 C32 4 36 14 36 14" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    title: "Estructura mínima",
    description:
      "El diseño reduce elementos rígidos para acercarse a una sensación de movimiento natural, sin dejar de proteger el pie del entorno.",
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
    a: "El cambio puede sentirse diferente al principio. Empieza con períodos cortos, alterna con tu calzado habitual y aumenta el uso poco a poco según cómo te sientas.",
  },
  {
    q: "¿Puedo usarlo si tengo una condición diagnosticada?",
    a: "El calzado barefoot ofrece más espacio para los dedos y una sensación de pisada diferente. Si tienes dolor o una condición diagnosticada, consulta con un profesional de salud antes de cambiar de calzado.",
  },
  {
    q: "¿Cuánto tiempo tarda la transición?",
    a: "Depende de cada persona y del calzado que usa habitualmente. Lo importante es hacer la transición de forma gradual, alternando ambos tipos de calzado y atendiendo a cómo te sientes.",
  },
  {
    q: "¿Los niños pueden usar barefoot?",
    a: "Puede ser una opción si el modelo corresponde a su etapa y la talla es adecuada. Busca una horma que respete el espacio y el movimiento natural del pie y, ante cualquier duda, consulta con un profesional.",
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
        title="¿Qué es el calzado barefoot? | Guía en Venezuela"
        description="Descubre qué es el calzado barefoot y el calzado respetuoso, sus características y cómo hacer una transición responsable en Venezuela con Chiriko Studio."
        path="/que-es-calzado-barefoot"
        jsonLd={[articleSchema, breadcrumbSchema]}
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
                Una guía para entender el calzado minimalista, sus características
                y cómo hacer una transición gradual y responsable.
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
                      text: "Los zapatos con punta estrecha o redondeada pueden comprimir los dedos y limitar el espacio disponible para que se muevan.",
                    },
                    {
                      num: "03",
                      title: "Amortiguación excesiva",
                      text: "Una suela gruesa ofrece una sensación más aislada del suelo. Una suela delgada busca una experiencia más cercana a la superficie.",
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

          {/* ── SECCIÓN 4: EXPERIENCIA DE USO ── */}
          <section className="bg-muted/30 py-16 lg:py-20 mb-16">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-6">
                  ¿Qué cambia en la experiencia de uso?
                </h2>
                <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">
                  El cambio de un calzado estructurado a uno barefoot puede sentirse
                  diferente. Estas son sus características prácticas:
                </p>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                  {[
                    "Más espacio para que los dedos se muevan",
                    "Una base plana, sin talón elevado",
                    "Mayor percepción de la superficie al caminar",
                    "Materiales que acompañan el movimiento del pie",
                    "Menos estructura y rigidez en el calzado",
                    "Una sensación de pisada más cercana al suelo",
                    "Opciones para una transición gradual",
                    "Asesoría para elegir modelo y talla",
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
                    iniciar la transición. Es una opción que requiere adaptación
                    progresiva.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── SECCIÓN 5: CÓMO HACER LA TRANSICIÓN ── */}
          <section className="container mx-auto px-6 lg:px-12 mb-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-3">
                Cómo hacer una transición gradual
              </h2>
              <p className="font-body text-sm text-muted-foreground mb-10">
                Cada persona se adapta a un ritmo distinto. Empieza poco a poco,
                alterna con tu calzado habitual y presta atención a cómo te sientes.
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
                      "Si te sientes cómodo, amplía el tiempo de uso en actividades cotidianas. Mantén la alternancia siempre que la necesites.",
                  },
                  {
                    semana: "A partir del mes 3",
                    titulo: "Uso completo",
                    texto:
                      "Valora cómo ha sido tu experiencia y decide cuándo ampliar el uso. No hay un plazo único ni es necesario abandonar por completo tu calzado habitual.",
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

export default QueEsCalzadoBarefoot;
