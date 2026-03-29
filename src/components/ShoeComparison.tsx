const ShoeComparison = () => {
  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground">
            Calzado tradicional vs. barefoot
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="bg-background p-8 lg:p-10 text-center">
            <div className="mb-6 flex justify-center">
              <svg
                width="120"
                height="60"
                viewBox="0 0 120 60"
                fill="none"
                className="text-muted-foreground"
              >
                <path
                  d="M20 50 L20 20 Q20 15 30 15 L70 25 Q90 28 100 35 L100 50 Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.5"
                />
                <line
                  x1="15"
                  y1="50"
                  x2="105"
                  y2="50"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <line
                  x1="20"
                  y1="50"
                  x2="20"
                  y2="20"
                  stroke="hsl(0 60% 50%)"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  opacity="0.6"
                />
                <text
                  x="10"
                  y="36"
                  fill="hsl(0 60% 50%)"
                  fontSize="7"
                  fontFamily="DM Sans"
                  opacity="0.7"
                >
                  30mm
                </text>
              </svg>
            </div>

            <h3 className="font-heading text-xl font-medium text-foreground mb-3">
              Calzado tradicional
            </h3>

            <ul className="font-body text-sm text-muted-foreground space-y-2">
              <li>✕ Talón elevado</li>
              <li>✕ Punta estrecha</li>
              <li>✕ Suela rígida</li>
              <li>✕ Limita el movimiento</li>
            </ul>
          </div>

          <div className="bg-background p-8 lg:p-10 text-center border border-accent/30">
            <div className="mb-6 flex justify-center">
              <svg
                width="120"
                height="60"
                viewBox="0 0 120 60"
                fill="none"
                className="text-foreground"
              >
                <path
                  d="M15 45 Q15 40 25 38 L50 36 Q80 34 100 38 Q110 40 110 45 Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <line
                  x1="10"
                  y1="48"
                  x2="115"
                  y2="48"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text
                  x="55"
                  y="30"
                  textAnchor="middle"
                  fill="hsl(82 25% 35%)"
                  fontSize="7"
                  fontFamily="DM Sans"
                >
                  Drop cero
                </text>
              </svg>
            </div>

            <h3 className="font-heading text-xl font-medium text-foreground mb-3">
              Barefoot
            </h3>

            <ul className="font-body text-sm text-muted-foreground space-y-2">
              <li className="text-foreground">✓ Drop cero</li>
              <li className="text-foreground">✓ Horma anatómica</li>
              <li className="text-foreground">✓ Suela flexible</li>
              <li className="text-foreground">✓ Movimiento natural</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoeComparison;
