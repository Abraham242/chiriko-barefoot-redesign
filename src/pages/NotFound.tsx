import SEO from "@/components/SEO";
const NotFound = () => {

  return (
    <>
      <SEO
        title="Página no encontrada"
        description="La página que buscas no existe."
        path="/404"
        noIndex
      />
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Página no encontrada</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Volver al inicio
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
