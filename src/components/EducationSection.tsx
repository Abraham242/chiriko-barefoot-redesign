const EducationSection = () => {
  return (
    <section id="education" className="py-24 lg:py-32 bg-cream">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-light text-foreground mb-4">
            La filosofía barefoot
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed">
            El calzado barefoot está diseñado para permitir que tus pies
            funcionen como deberían: sin talón elevado, sin puntas estrechas y
            sin estructuras rígidas que limiten tu movimiento natural.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
                <svg
                  width="40"
                  height="24"
                  viewBox="0 0 40 24"
                  fill="none"
                  className="text-foreground"
                >
                  <line
                    x1="0"
                    y1="22"
                    x2="40"
                    y2="22"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="0"
                    y1="22"
                    x2="40"
                    y2="22"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                  <text
                    x="20"
                    y="14"
                    textAnchor="middle"
                    fill="currentColor"
                    fontSize="10"
                    fontFamily="DM Sans"
                  >
                    0°
                  </text>
                </svg>
              </div>
            </div>

            <h3 className="font-heading text-xl font-medium text-foreground mb-2">
              Drop cero
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Sin diferencia de altura entre talón y punta. Tu pie se mantiene
              plano y equilibrado, favoreciendo una alineación más natural.
            </p>
          </div>

          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
                <svg
                  width="32"
                  height="40"
                  viewBox="0 0 32 40"
                  fill="none"
                  className="text-foreground"
                >
                  <path
                    d="M16 2 C8 2 4 8 4 16 C4 24 8 32 10 36 C12 38 14 38 16 38 C18 38 20 38 22 36 C24 32 28 24 28 16 C28 8 24 2 16 2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

            <h3 className="font-heading text-xl font-medium text-foreground mb-2">
              Horma anatómica
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Un diseño que respeta la forma natural del pie y deja espacio real
              para que los dedos se expandan y estabilicen tu cuerpo.
            </p>
          </div>

          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  className="text-foreground"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M18 6 L18 18 L26 26"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <h3 className="font-heading text-xl font-medium text-foreground mb-2">
              Postura y comodidad
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Pies más fuertes, mejor equilibrio y una postura más alineada.
              Siente el suelo bajo ti en cada paso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
