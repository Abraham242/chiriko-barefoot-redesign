import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

type SizeChartModalProps = {
  open: boolean;
  onClose: () => void;
};

const womenSizes = [
  { eu: 36, cm: "22.5", us: "5.5" },
  { eu: 37, cm: "23.0", us: "6" },
  { eu: 38, cm: "23.5", us: "7" },
  { eu: 39, cm: "24.5", us: "8" },
  { eu: 40, cm: "25.0", us: "8.5" },
  { eu: 41, cm: "26.0", us: "9.5" },
  { eu: 42, cm: "26.5", us: "10" },
  { eu: 43, cm: "27.5", us: "11" },
  { eu: 44, cm: "28.0", us: "11.5" },
  { eu: 45, cm: "29.0", us: "12.5" },
];

const menSizes = [
  { eu: 36, cm: "22.5", us: "4" },
  { eu: 37, cm: "23.0", us: "4.5" },
  { eu: 38, cm: "23.5", us: "5.5" },
  { eu: 39, cm: "24.5", us: "6.5" },
  { eu: 40, cm: "25.0", us: "7" },
  { eu: 41, cm: "26.0", us: "8" },
  { eu: 42, cm: "26.5", us: "8.5" },
  { eu: 43, cm: "27.5", us: "9.5" },
  { eu: 44, cm: "28.0", us: "10" },
  { eu: 45, cm: "29.0", us: "11" },
];

const SizeChartModal = ({ open, onClose }: SizeChartModalProps) => {
  const [gender, setGender] = useState<"women" | "men">("women");

  if (!open) return null;

  const rows = gender === "women" ? womenSizes : menSizes;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 p-4 flex items-center justify-center">
      <div className="w-full max-w-xl bg-background border border-border max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-border flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading text-3xl font-light text-foreground">
              Guía rápida de tallas
            </h3>
            <p className="mt-2 font-body text-sm text-muted-foreground">
              Usa la medida de tu pie en centímetros como referencia.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-10 w-10 flex items-center justify-center border border-border text-foreground hover:border-foreground transition-colors"
            aria-label="Cerrar guía de tallas"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setGender("women")}
              className={`px-5 py-2 border font-body text-sm tracking-[0.12em] uppercase transition-colors ${
                gender === "women"
                  ? "bg-foreground text-primary-foreground border-foreground"
                  : "border-border text-foreground hover:border-foreground"
              }`}
            >
              Mujer
            </button>
            <button
              type="button"
              onClick={() => setGender("men")}
              className={`px-5 py-2 border font-body text-sm tracking-[0.12em] uppercase transition-colors ${
                gender === "men"
                  ? "bg-foreground text-primary-foreground border-foreground"
                  : "border-border text-foreground hover:border-foreground"
              }`}
            >
              Hombre
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 font-body text-xs tracking-[0.16em] uppercase text-muted-foreground">EU</th>
                  <th className="text-left py-3 font-body text-xs tracking-[0.16em] uppercase text-muted-foreground">CM</th>
                  <th className="text-left py-3 font-body text-xs tracking-[0.16em] uppercase text-muted-foreground">US</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((size) => (
                  <tr key={size.eu} className="border-b border-border/60">
                    <td className="py-3 font-body text-sm text-foreground">{size.eu}</td>
                    <td className="py-3 font-body text-sm text-muted-foreground">{size.cm}</td>
                    <td className="py-3 font-body text-sm text-muted-foreground">{size.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5 font-body text-xs text-muted-foreground">
            La talla final puede variar según el modelo y la forma de tu pie.
          </p>

          <Link
            to="/size-guide"
            onClick={onClose}
            className="mt-4 inline-block font-body text-sm text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            Ver guía completa de tallas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SizeChartModal;
