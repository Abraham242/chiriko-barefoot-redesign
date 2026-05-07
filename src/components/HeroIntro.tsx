const HeroIntro = () => {
  return (
    <section className="py-14 lg:py-20 border-b border-border bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <p className="font-heading text-2xl md:text-4xl font-light leading-snug text-foreground max-w-4xl mx-auto text-center">
          Zapatos barefoot y modelos de transición seleccionados para darle más
          espacio, alineación y libertad a tus pies. Te ayudamos a elegir la
          talla correcta y el modelo adecuado para tu forma de moverte.
        </p>
        <p className="font-body text-sm text-muted-foreground mt-5 text-center">
          Una selección curada para caminar con más comodidad, sin perder
          estética.
        </p>
      </div>
    </section>
  );
};

export default HeroIntro;
