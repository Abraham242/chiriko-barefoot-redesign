import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const phoneNumber = "584221798072";

const whatsappMessage = `Hola, vengo de chirikostudio.com 👋
Quiero consultar una duda sobre reservas, cambios o devoluciones.`;

const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
  whatsappMessage
)}`;

const reservationSteps = [
  "Eliges el modelo que te interesa.",
  "Nos escribes por WhatsApp.",
  "Revisamos contigo talla habitual, medida del pie, modelo, color y disponibilidad.",
  "Confirmamos contigo los detalles de la reserva.",
  "Una vez confirmada la reserva, gestionamos el pedido.",
  "Te mantenemos informado/a sobre el avance del proceso.",
];

const sizeChangeConditions = [
  "El producto no haya sido usado.",
  "Esté limpio y en perfecto estado.",
  "Conserve su empaque original.",
  "Nos contactes dentro de las primeras 48 horas después de recibirlo.",
  "Exista disponibilidad de la talla solicitada.",
];

const returnCases = [
  "Producto recibido con defecto de fabricación.",
  "Producto recibido distinto al modelo, color o talla confirmada.",
  "Error comprobable atribuible a Chiriko Studio.",
];

const nonReturnCases = [
  "El producto fue usado.",
  "El producto presenta desgaste, manchas, marcas, olores o daños por uso.",
  "La talla fue elegida sin enviar la medida del pie en centímetros a Chiriko Studio antes de confirmar la reserva.",
  "El cliente cambió de opinión después de confirmado y gestionado el pedido.",
  "El producto corresponde al modelo, color y talla confirmados por WhatsApp.",
  "La solicitud se realiza fuera del plazo indicado.",
];

const refundCases = [
  "Chiriko Studio no pueda gestionar el producto reservado.",
  "Exista un error atribuible a Chiriko Studio.",
  "El producto llegue con un defecto comprobado y no sea posible reemplazarlo.",
  "Se acuerde expresamente por WhatsApp.",
];

const PoliciesPage = () => {
  return (
    <>
      <SEO
        title="Políticas de compra, reservas y devoluciones | Chiriko Studio"
        description="Consulta las políticas de reserva, preventa asistida, cambios, devoluciones y reembolsos de Chiriko Studio. Calzado barefoot y respetuoso en Venezuela."
        path="/politicas"
      />

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-28 lg:pt-36">
          <div className="container mx-auto px-6 lg:px-12 pb-20 lg:pb-28">
            <div className="max-w-4xl mx-auto">
              <Link
                to="/collection"
                className="font-body text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
              >
                Volver a la colección
              </Link>

              <header className="pt-10 pb-14 lg:pb-20">
                <p className="font-body text-xs uppercase tracking-[0.22em] text-muted-foreground mb-5">
                  Última actualización: junio de 2026
                </p>
                <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-light text-foreground leading-tight mb-8">
                  Políticas de compra, reservas y devoluciones
                </h1>
                <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                  En Chiriko Studio trabajamos con preventa asistida para que no
                  compres a ciegas. Antes de reservar, te ayudamos por WhatsApp
                  a revisar modelo, color, talla habitual y medida del pie en
                  centímetros.
                </p>
              </header>

              <div className="space-y-0">
                <section className="border-t border-border py-10 lg:py-12">
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-6">
                    1. Preventa asistida
                  </h2>
                  <div className="space-y-5 font-body text-base text-muted-foreground leading-relaxed">
                    <p>
                      En Chiriko Studio trabajamos bajo un modelo de preventa
                      asistida. Esto significa que antes de reservar te
                      acompañamos personalmente por WhatsApp para revisar modelo,
                      color, talla habitual y medida del pie en centímetros.
                    </p>
                    <p>
                      Nuestro objetivo es que elijas con claridad y no compres a
                      ciegas.
                    </p>
                  </div>
                </section>

                <section className="border-t border-border py-10 lg:py-12">
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-6">
                    2. Cómo funciona la reserva
                  </h2>
                  <ol className="space-y-3 font-body text-base text-muted-foreground leading-relaxed list-decimal list-outside pl-5 mb-6">
                    {reservationSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <div className="space-y-5 font-body text-base text-muted-foreground leading-relaxed">
                    <p>
                      Para activar la reserva se solicita un pago inicial del 50%
                      del valor del producto, salvo que se acuerde otra condición
                      por WhatsApp. Este monto se descuenta del total final.
                    </p>
                    <p>
                      La reserva se considera activa cuando el pago o monto de
                      reserva acordado por WhatsApp haya sido confirmado por
                      Chiriko Studio.
                    </p>
                  </div>
                </section>

                <section className="border-t border-border py-10 lg:py-12">
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-6">
                    3. Tiempo estimado de entrega
                  </h2>
                  <div className="space-y-5 font-body text-base text-muted-foreground leading-relaxed">
                    <p>
                      La entrega estimada es de 3 a 4 semanas desde la
                      confirmación de la reserva.
                    </p>
                    <p>
                      Este plazo puede variar por disponibilidad del proveedor,
                      transporte internacional, aduana, temporadas altas o causas
                      externas a Chiriko Studio.
                    </p>
                    <p>
                      Si el pedido llega antes, mejor. Si ocurre cualquier
                      novedad logística, te informaremos por WhatsApp con la
                      mayor transparencia posible.
                    </p>
                  </div>
                </section>

                <section className="border-t border-border py-10 lg:py-12">
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-6">
                    4. Cambios antes de confirmar la reserva
                  </h2>
                  <div className="space-y-5 font-body text-base text-muted-foreground leading-relaxed">
                    <p>
                      Antes de confirmar tu reserva puedes cambiar modelo, color,
                      talla, datos de entrega o método de pago.
                    </p>
                    <p>Queremos que estés seguro/a antes de avanzar.</p>
                  </div>
                </section>

                <section className="border-t border-border py-10 lg:py-12">
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-6">
                    5. Cambios después de confirmar la reserva
                  </h2>
                  <div className="space-y-5 font-body text-base text-muted-foreground leading-relaxed">
                    <p>
                      Una vez confirmada la reserva y gestionado el pedido, los
                      cambios de modelo, color o talla dependerán de la
                      disponibilidad del proveedor, el estado del pedido y si el
                      producto ya fue apartado o enviado.
                    </p>
                    <p>
                      Si todavía es posible hacer el cambio, te ayudaremos a
                      gestionarlo. Si el pedido ya fue procesado o enviado,
                      puede que no sea posible modificarlo.
                    </p>
                  </div>
                </section>

                <section className="border-t border-border py-10 lg:py-12">
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-6">
                    6. Cambios por talla
                  </h2>
                  <div className="space-y-5 font-body text-base text-muted-foreground leading-relaxed">
                    <p>
                      Como trabajamos con preventa asistida, revisamos la talla
                      contigo antes de reservar. Por eso es importante que nos
                      envíes la medida correcta de tu pie en centímetros siguiendo
                      nuestra guía de tallas.
                    </p>
                    <p>
                      Si al recibir el producto necesitas un cambio de talla,
                      podremos evaluarlo siempre que:
                    </p>
                    <ul className="space-y-2 list-disc list-outside pl-5">
                      {sizeChangeConditions.map((condition) => (
                        <li key={condition}>{condition}</li>
                      ))}
                    </ul>
                    <p>
                      Los costos de envío asociados al cambio de talla correrán
                      por cuenta del cliente, salvo que el error haya sido
                      responsabilidad de Chiriko Studio.
                    </p>
                  </div>
                </section>

                <section className="border-t border-border py-10 lg:py-12">
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-6">
                    7. Devoluciones
                  </h2>
                  <div className="space-y-5 font-body text-base text-muted-foreground leading-relaxed">
                    <p>Aceptamos solicitudes de devolución únicamente en estos casos:</p>
                    <ul className="space-y-2 list-disc list-outside pl-5">
                      {returnCases.map((returnCase) => (
                        <li key={returnCase}>{returnCase}</li>
                      ))}
                    </ul>
                    <p>
                      Para solicitar una devolución, debes contactarnos por
                      WhatsApp dentro de las primeras 48 horas después de recibir
                      el producto y enviar fotos claras del caso.
                    </p>
                    <p>
                      El producto debe mantenerse sin uso, limpio, con etiquetas
                      y empaque original.
                    </p>
                  </div>
                </section>

                <section className="border-t border-border py-10 lg:py-12">
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-6">
                    8. Casos en los que no aplican devoluciones
                  </h2>
                  <div className="space-y-5 font-body text-base text-muted-foreground leading-relaxed">
                    <p>No aplican devoluciones cuando:</p>
                    <ul className="space-y-2 list-disc list-outside pl-5">
                      {nonReturnCases.map((nonReturnCase) => (
                        <li key={nonReturnCase}>{nonReturnCase}</li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section className="border-t border-border py-10 lg:py-12">
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-6">
                    9. Reembolsos
                  </h2>
                  <div className="space-y-5 font-body text-base text-muted-foreground leading-relaxed">
                    <p>Los reembolsos aplican únicamente cuando:</p>
                    <ul className="space-y-2 list-disc list-outside pl-5">
                      {refundCases.map((refundCase) => (
                        <li key={refundCase}>{refundCase}</li>
                      ))}
                    </ul>
                    <p>
                      Una vez aprobado el reembolso, se realizará por el mismo
                      método de pago utilizado o por el método acordado con el
                      cliente.
                    </p>
                    <p>
                      Los tiempos de procesamiento pueden variar según banco,
                      plataforma de pago o método utilizado.
                    </p>
                  </div>
                </section>

                <section className="border-t border-border py-10 lg:py-12">
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-6">
                    10. Cancelación de reserva
                  </h2>
                  <div className="space-y-5 font-body text-base text-muted-foreground leading-relaxed">
                    <p>
                      Si deseas cancelar una reserva, debes escribirnos lo antes
                      posible por WhatsApp.
                    </p>
                    <p>
                      Si el pedido aún no ha sido procesado con el proveedor,
                      podremos evaluar la cancelación y el reembolso total o
                      parcial.
                    </p>
                    <p>
                      Si el pedido ya fue procesado, apartado o enviado, la
                      reserva no podrá cancelarse como una compra regular, ya que
                      el producto fue solicitado especialmente para ti.
                    </p>
                    <p>
                      En ese caso, evaluaremos alternativas como cambio por otro
                      modelo disponible, nota de crédito o una solución
                      personalizada.
                    </p>
                  </div>
                </section>

                <section className="border-t border-border py-10 lg:py-12">
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-6">
                    11. Nota importante
                  </h2>
                  <p className="font-body text-base text-muted-foreground leading-relaxed">
                    Estas políticas aplican al proceso comercial de Chiriko
                    Studio y no limitan los derechos que correspondan al cliente
                    según la normativa vigente aplicable.
                  </p>
                </section>

                <section className="border-t border-border py-10 lg:py-12">
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-6">
                    12. Contacto
                  </h2>
                  <div className="space-y-7 font-body text-base text-muted-foreground leading-relaxed">
                    <p>
                      Para dudas, seguimiento de pedido, cambios, devoluciones o
                      reembolsos, escríbenos por WhatsApp.
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center justify-center bg-foreground px-7 py-3 font-body text-xs uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-foreground/90"
                    >
                      Escribir por WhatsApp
                    </a>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PoliciesPage;
