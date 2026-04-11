import { Link } from "react-router-dom";

const SizeGuidance = () => {
  return (
    <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
      
      {/* Título */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Guía de Tallas
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          La forma correcta de elegir tu talla es midiendo tu pie en centímetros.
          Te guiamos paso a paso.
        </p>
      </div>

      {/* Cómo medir */}
      <div className="mb-12">
        <h3 className="text-xl font-medium mb-4">Cómo medir tu pie</h3>
        <ol className="space-y-2 text-muted-foreground">
          <li>1. Coloca tu pie sobre una hoja contra la pared</li>
          <li>2. Marca desde el talón hasta el dedo más largo</li>
          <li>3. Mide la distancia en centímetros</li>
          <li>4. Usa la tabla para encontrar tu talla</li>
        </ol>
      </div>

      {/* Tablas */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* MUJER */}
        <div>
          <h4 className="text-lg font-semibold mb-4">
            Mujer
          </h4>

          <table className="w-full text-sm border border-border">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 text-left">CM</th>
                <th className="p-2">EU</th>
                <th className="p-2">US</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["21.2 - 22.1", "35", "4.5"],
                ["22.2 - 22.8", "36", "5"],
                ["22.9 - 23.5", "37", "6"],
                ["23.6 - 24.1", "38", "7"],
                ["24.2 - 24.8", "39", "8"],
                ["24.9 - 25.4", "40", "9"],
                ["25.5 - 26.1", "41", "10"],
                ["26.2 - 26.8", "42", "10.5"],
                ["26.9 - 27.4", "43", "11"],
              ].map((row, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{row[0]}</td>
                  <td className="p-2 text-center">{row[1]}</td>
                  <td className="p-2 text-center">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* HOMBRE */}
        <div>
          <h4 className="text-lg font-semibold mb-4">
            Hombre
          </h4>

          <table className="w-full text-sm border border-border">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 text-left">CM</th>
                <th className="p-2">EU</th>
                <th className="p-2">US</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["24.6 - 25.5", "40", "7"],
                ["25.6 - 26.2", "41", "8"],
                ["26.3 - 26.9", "42", "9"],
                ["27.0 - 27.5", "43", "10"],
                ["27.6 - 28.2", "44", "11"],
                ["28.3 - 28.9", "45", "12"],
                ["29.0 - 29.6", "46", "12.5"],
                ["29.7 - 30.3", "47", "13"],
                ["30.4 - 30.9", "48", "14"],
              ].map((row, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{row[0]}</td>
                  <td className="p-2 text-center">{row[1]}</td>
                  <td className="p-2 text-center">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <p className="mb-4 text-muted-foreground">
          ¿No estás seguro de tu talla?
        </p>

        <a
          href="https://wa.me/584XXXXXXXXX?text=Hola%20quiero%20ayuda%20con%20mi%20talla"
          target="_blank"
          className="inline-block bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
        >
          Escríbenos por WhatsApp
        </a>
      </div>
    </section>
  );
};

export default SizeGuidance;
