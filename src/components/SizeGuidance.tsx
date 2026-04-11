import React from "react";
// Si estás usando react-router-dom: import { Link } from "react-router-dom";

const SizeGuidance = () => {
  return (
    <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto bg-[#FAFAFA] text-[#1A1A18] font-sans">
      
      {/* Título */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight" style={{ fontFamily: "Cormorant Garamond, serif" }}>
          Guía de Tallas
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-lg">
          La forma correcta de elegir tu talla es midiendo tu pie en centímetros.
          Te guiamos paso a paso.
        </p>
      </div>

      {/* Grid de 4 Pasos Visuales (Reemplaza la lista simple) */}
      <div className="grid md:grid-cols-2 gap-6 mb-20">
        
        {/* Paso 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5E0D8] flex flex-col sm:flex-row gap-6 items-center">
          <div className="w-full sm:w-1/2 aspect-[4/3] bg-[#F7F5F0] rounded-xl flex items-center justify-center overflow-hidden border border-[#E5E0D8]">
            {/* Aquí puedes colocar tu etiqueta <img src="..." /> */}
            <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">Imagen Paso 1</span>
          </div>
          <div className="w-full sm:w-1/2">
            <h3 className="font-semibold text-lg mb-2">1. PREPARA LO NECESARIO</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Coloca una hoja en un piso firme y plano y pega la hoja y el pie a la pared. Ten a mano un lápiz o bolígrafo y una regla.
            </p>
          </div>
        </div>

        {/* Paso 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5E0D8] flex flex-col sm:flex-row gap-6 items-center">
          <div className="w-full sm:w-1/2 aspect-[4/3] bg-[#F7F5F0] rounded-xl flex items-center justify-center overflow-hidden border border-[#E5E0D8]">
            {/* Aquí puedes colocar tu etiqueta <img src="..." /> */}
            <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">Imagen Paso 2</span>
          </div>
          <div className="w-full sm:w-1/2">
            <h3 className="font-semibold text-lg mb-2">2. TRAZA TU PIE</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Párate con el talón tocando la pared, sobre la hoja. Traza el contorno del antepie y los lados, manteniendo el lápiz vertical y cerca del pie.
            </p>
          </div>
        </div>

        {/* Paso 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5E0D8] flex flex-col sm:flex-row gap-6 items-center">
          <div className="w-full sm:w-1/2 aspect-[4/3] bg-[#F7F5F0] rounded-xl flex items-center justify-center overflow-hidden border border-[#E5E0D8]">
            {/* Aquí puedes colocar tu etiqueta <img src="..." /> */}
            <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">Imagen Paso 3</span>
          </div>
          <div className="w-full sm:w-1/2">
            <h3 className="font-semibold text-lg mb-2">3. MIDE EL LARGO</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Mide desde el talón hasta la punta de tu dedo más largo en centímetros. Repite en ambos pies y usa la medida mayor.
            </p>
          </div>
        </div>

        {/* Paso 4 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5E0D8] flex flex-col sm:flex-row gap-6 items-center">
          <div className="w-full sm:w-1/2 aspect-[4/3] bg-[#F7F5F0] rounded-xl flex items-center justify-center overflow-hidden border border-[#E5E0D8]">
            {/* Aquí puedes colocar tu etiqueta <img src="..." /> */}
            <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">Imagen Paso 4</span>
          </div>
          <div className="w-full sm:w-1/2">
            <h3 className="font-semibold text-lg mb-2">4. MIDE EL ANCHO</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Mide la parte más ancha del trazado, a la altura del metatarso. Esto nos ayuda a confirmar un ajuste cómodo en la horma anatómica.
            </p>
          </div>
        </div>

      </div>

      {/* Tablas */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* MUJER */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5E0D8]">
          <h4 className="text-xl font-semibold mb-6 text-center" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            Mujer
          </h4>
          <div className="overflow-hidden rounded-xl border border-[#E5E0D8]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F7F5F0] text-[#1A1A18]">
                  <th className="p-4 text-left font-medium">CM</th>
                  <th className="p-4 font-medium">EU</th>
                  <th className="p-4 font-medium">US</th>
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
                  <tr key={i} className="border-t border-[#E5E0D8] hover:bg-[#FAF9F7] transition-colors">
                    <td className="p-3 text-left pl-4 text-gray-600">{row[0]}</td>
                    <td className="p-3 text-center font-medium">{row[1]}</td>
                    <td className="p-3 text-center text-gray-600">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* HOMBRE */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5E0D8]">
          <h4 className="text-xl font-semibold mb-6 text-center" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            Hombre
          </h4>
          <div className="overflow-hidden rounded-xl border border-[#E5E0D8]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F7F5F0] text-[#1A1A18]">
                  <th className="p-4 text-left font-medium">CM</th>
                  <th className="p-4 font-medium">EU</th>
                  <th className="p-4 font-medium">US</th>
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
                  <tr key={i} className="border-t border-[#E5E0D8] hover:bg-[#FAF9F7] transition-colors">
                    <td className="p-3 text-left pl-4 text-gray-600">{row[0]}</td>
                    <td className="p-3 text-center font-medium">{row[1]}</td>
                    <td className="p-3 text-center text-gray-600">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <p className="mb-6 text-gray-600 text-lg">
          ¿No estás seguro de tu talla?
        </p>

        <a
          href="https://wa.me/584XXXXXXXXX?text=Hola%20quiero%20ayuda%20con%20mi%20talla"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#1A1A18] text-white px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-black transition-all shadow-md hover:shadow-lg"
        >
          Escríbenos por WhatsApp
        </a>
      </div>
    </section>
  );
};

export default SizeGuidance;
